
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/tilemap/CCTiledLayer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _valueTypes = require("../core/value-types");

var _materialVariant = _interopRequireDefault(require("../core/assets/material/material-variant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var RenderComponent = require('../core/components/CCRenderComponent');

var Material = require('../core/assets/material/CCMaterial');

var RenderFlow = require('../core/renderer/render-flow');

var _mat4_temp = cc.mat4();

var _vec2_temp = cc.v2();

var _vec2_temp2 = cc.v2();

var _vec2_temp3 = cc.v2();

var _tempRowCol = {
  row: 0,
  col: 0
};
var TiledUserNodeData = cc.Class({
  name: 'cc.TiledUserNodeData',
  "extends": cc.Component,
  ctor: function ctor() {
    this._index = -1;
    this._row = -1;
    this._col = -1;
    this._tiledLayer = null;
  }
});
/**
 * !#en Render the TMX layer.
 * !#zh 渲染 TMX layer。
 * @class TiledLayer
 * @extends Component
 */

var TiledLayer = cc.Class({
  name: 'cc.TiledLayer',
  // Inherits from the abstract class directly,
  // because TiledLayer not create or maintains the sgNode by itself.
  "extends": RenderComponent,
  editor: {
    inspector: 'packages://inspector/inspectors/comps/tiled-layer.js'
  },
  ctor: function ctor() {
    this._userNodeGrid = {}; // [row][col] = {count: 0, nodesList: []};

    this._userNodeMap = {}; // [id] = node;

    this._userNodeDirty = false; // store the layer tiles node, index is caculated by 'x + width * y', format likes '[0]=tileNode0,[1]=tileNode1, ...'

    this._tiledTiles = []; // store the layer tilesets index array

    this._tilesetIndexArr = []; // tileset index to array index

    this._tilesetIndexToArrIndex = {}; // texture id to material index

    this._texIdToMatIndex = {};
    this._viewPort = {
      x: -1,
      y: -1,
      width: -1,
      height: -1
    };
    this._cullingRect = {
      leftDown: {
        row: -1,
        col: -1
      },
      rightTop: {
        row: -1,
        col: -1
      }
    };
    this._cullingDirty = true;
    this._rightTop = {
      row: -1,
      col: -1
    };
    this._layerInfo = null;
    this._mapInfo = null; // record max or min tile texture offset, 
    // it will make culling rect more large, which insure culling rect correct.

    this._topOffset = 0;
    this._downOffset = 0;
    this._leftOffset = 0;
    this._rightOffset = 0; // store the layer tiles, index is caculated by 'x + width * y', format likes '[0]=gid0,[1]=gid1, ...'

    this._tiles = []; // vertex array

    this._vertices = []; // vertices dirty

    this._verticesDirty = true;
    this._layerName = '';
    this._layerOrientation = null; // store all layer gid corresponding texture info, index is gid, format likes '[gid0]=tex-info,[gid1]=tex-info, ...'

    this._texGrids = null; // store all tileset texture, index is tileset index, format likes '[0]=texture0, [1]=texture1, ...'

    this._textures = null;
    this._tilesets = null;
    this._leftDownToCenterX = 0;
    this._leftDownToCenterY = 0;
    this._hasTiledNodeGrid = false;
    this._hasAniGrid = false;
    this._animations = null; // switch of culling

    this._enableCulling = cc.macro.ENABLE_TILEDMAP_CULLING;
  },
  _hasTiledNode: function _hasTiledNode() {
    return this._hasTiledNodeGrid;
  },
  _hasAnimation: function _hasAnimation() {
    return this._hasAniGrid;
  },

  /**
   * !#en enable or disable culling
   * !#zh 开启或关闭裁剪。
   * @method enableCulling
   * @param value
   */
  enableCulling: function enableCulling(value) {
    if (this._enableCulling != value) {
      this._enableCulling = value;
      this._cullingDirty = true;
    }
  },

  /**
   * !#en Adds user's node into layer.
   * !#zh 添加用户节点。
   * @method addUserNode
   * @param {cc.Node} node
   * @return {Boolean}
   */
  addUserNode: function addUserNode(node) {
    var dataComp = node.getComponent(TiledUserNodeData);

    if (dataComp) {
      cc.warn("CCTiledLayer:addUserNode node has been added");
      return false;
    }

    dataComp = node.addComponent(TiledUserNodeData);
    node.parent = this.node;
    node._renderFlag |= RenderFlow.FLAG_BREAK_FLOW;
    this._userNodeMap[node._id] = dataComp;
    dataComp._row = -1;
    dataComp._col = -1;
    dataComp._tiledLayer = this;

    this._nodeLocalPosToLayerPos(node, _vec2_temp);

    this._positionToRowCol(_vec2_temp.x, _vec2_temp.y, _tempRowCol);

    this._addUserNodeToGrid(dataComp, _tempRowCol);

    this._updateCullingOffsetByUserNode(node);

    node.on(cc.Node.EventType.POSITION_CHANGED, this._userNodePosChange, dataComp);
    node.on(cc.Node.EventType.SIZE_CHANGED, this._userNodeSizeChange, dataComp);
    return true;
  },

  /**
   * !#en Removes user's node.
   * !#zh 移除用户节点。
   * @method removeUserNode
   * @param {cc.Node} node
   * @return {Boolean}
   */
  removeUserNode: function removeUserNode(node) {
    var dataComp = node.getComponent(TiledUserNodeData);

    if (!dataComp) {
      cc.warn("CCTiledLayer:removeUserNode node is not exist");
      return false;
    }

    node.off(cc.Node.EventType.POSITION_CHANGED, this._userNodePosChange, dataComp);
    node.off(cc.Node.EventType.SIZE_CHANGED, this._userNodeSizeChange, dataComp);

    this._removeUserNodeFromGrid(dataComp);

    delete this._userNodeMap[node._id];

    node._removeComponent(dataComp);

    dataComp.destroy();
    node.removeFromParent(true);
    node._renderFlag &= ~RenderFlow.FLAG_BREAK_FLOW;
    return true;
  },

  /**
   * !#en Destroy user's node.
   * !#zh 销毁用户节点。
   * @method destroyUserNode
   * @param {cc.Node} node
   */
  destroyUserNode: function destroyUserNode(node) {
    this.removeUserNode(node);
    node.destroy();
  },
  // acording layer anchor point to calculate node layer pos
  _nodeLocalPosToLayerPos: function _nodeLocalPosToLayerPos(nodePos, out) {
    out.x = nodePos.x + this._leftDownToCenterX;
    out.y = nodePos.y + this._leftDownToCenterY;
  },
  _getNodesByRowCol: function _getNodesByRowCol(row, col) {
    var rowData = this._userNodeGrid[row];
    if (!rowData) return null;
    return rowData[col];
  },
  _getNodesCountByRow: function _getNodesCountByRow(row) {
    var rowData = this._userNodeGrid[row];
    if (!rowData) return 0;
    return rowData.count;
  },
  _updateAllUserNode: function _updateAllUserNode() {
    this._userNodeGrid = {};

    for (var dataId in this._userNodeMap) {
      var dataComp = this._userNodeMap[dataId];

      this._nodeLocalPosToLayerPos(dataComp.node, _vec2_temp);

      this._positionToRowCol(_vec2_temp.x, _vec2_temp.y, _tempRowCol);

      this._addUserNodeToGrid(dataComp, _tempRowCol);

      this._updateCullingOffsetByUserNode(dataComp.node);
    }
  },
  _updateCullingOffsetByUserNode: function _updateCullingOffsetByUserNode(node) {
    if (this._topOffset < node.height) {
      this._topOffset = node.height;
    }

    if (this._downOffset < node.height) {
      this._downOffset = node.height;
    }

    if (this._leftOffset < node.width) {
      this._leftOffset = node.width;
    }

    if (this._rightOffset < node.width) {
      this._rightOffset = node.width;
    }
  },
  _userNodeSizeChange: function _userNodeSizeChange() {
    var dataComp = this;
    var node = dataComp.node;
    var self = dataComp._tiledLayer;

    self._updateCullingOffsetByUserNode(node);
  },
  _userNodePosChange: function _userNodePosChange() {
    var dataComp = this;
    var node = dataComp.node;
    var self = dataComp._tiledLayer;

    self._nodeLocalPosToLayerPos(node, _vec2_temp);

    self._positionToRowCol(_vec2_temp.x, _vec2_temp.y, _tempRowCol);

    self._limitInLayer(_tempRowCol); // users pos not change


    if (_tempRowCol.row === dataComp._row && _tempRowCol.col === dataComp._col) return;

    self._removeUserNodeFromGrid(dataComp);

    self._addUserNodeToGrid(dataComp, _tempRowCol);
  },
  _removeUserNodeFromGrid: function _removeUserNodeFromGrid(dataComp) {
    var row = dataComp._row;
    var col = dataComp._col;
    var index = dataComp._index;
    var rowData = this._userNodeGrid[row];
    var colData = rowData && rowData[col];

    if (colData) {
      rowData.count--;
      colData.count--;
      colData.list[index] = null;

      if (colData.count <= 0) {
        colData.list.length = 0;
        colData.count = 0;
      }
    }

    dataComp._row = -1;
    dataComp._col = -1;
    dataComp._index = -1;
    this._userNodeDirty = true;
  },
  _limitInLayer: function _limitInLayer(rowCol) {
    var row = rowCol.row;
    var col = rowCol.col;
    if (row < 0) rowCol.row = 0;
    if (row > this._rightTop.row) rowCol.row = this._rightTop.row;
    if (col < 0) rowCol.col = 0;
    if (col > this._rightTop.col) rowCol.col = this._rightTop.col;
  },
  _addUserNodeToGrid: function _addUserNodeToGrid(dataComp, tempRowCol) {
    var row = tempRowCol.row;
    var col = tempRowCol.col;
    var rowData = this._userNodeGrid[row] = this._userNodeGrid[row] || {
      count: 0
    };
    var colData = rowData[col] = rowData[col] || {
      count: 0,
      list: []
    };
    dataComp._row = row;
    dataComp._col = col;
    dataComp._index = colData.list.length;
    rowData.count++;
    colData.count++;
    colData.list.push(dataComp);
    this._userNodeDirty = true;
  },
  _isUserNodeDirty: function _isUserNodeDirty() {
    return this._userNodeDirty;
  },
  _setUserNodeDirty: function _setUserNodeDirty(value) {
    this._userNodeDirty = value;
  },
  onEnable: function onEnable() {
    this._super();

    this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this._syncAnchorPoint, this);

    this._activateMaterial();
  },
  onDisable: function onDisable() {
    this._super();

    this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this._syncAnchorPoint, this);
  },
  _syncAnchorPoint: function _syncAnchorPoint() {
    var node = this.node;
    this._leftDownToCenterX = node.width * node.anchorX * node.scaleX;
    this._leftDownToCenterY = node.height * node.anchorY * node.scaleY;
    this._cullingDirty = true;
  },
  onDestroy: function onDestroy() {
    this._super();

    if (this._buffer) {
      this._buffer.destroy();

      this._buffer = null;
    }

    this._renderDataList = null;
  },

  /**
   * !#en Gets the layer name.
   * !#zh 获取层的名称。
   * @method getLayerName
   * @return {String}
   * @example
   * let layerName = tiledLayer.getLayerName();
   * cc.log(layerName);
   */
  getLayerName: function getLayerName() {
    return this._layerName;
  },

  /**
   * !#en Set the layer name.
   * !#zh 设置层的名称
   * @method SetLayerName
   * @param {String} layerName
   * @example
   * tiledLayer.setLayerName("New Layer");
   */
  setLayerName: function setLayerName(layerName) {
    this._layerName = layerName;
  },

  /**
   * !#en Return the value for the specific property name.
   * !#zh 获取指定属性名的值。
   * @method getProperty
   * @param {String} propertyName
   * @return {*}
   * @example
   * let property = tiledLayer.getProperty("info");
   * cc.log(property);
   */
  getProperty: function getProperty(propertyName) {
    return this._properties[propertyName];
  },

  /**
   * !#en Returns the position in pixels of a given tile coordinate.
   * !#zh 获取指定 tile 的像素坐标。
   * @method getPositionAt
   * @param {Vec2|Number} pos position or x
   * @param {Number} [y]
   * @return {Vec2}
   * @example
   * let pos = tiledLayer.getPositionAt(cc.v2(0, 0));
   * cc.log("Pos: " + pos);
   * let pos = tiledLayer.getPositionAt(0, 0);
   * cc.log("Pos: " + pos);
   */
  getPositionAt: function getPositionAt(pos, y) {
    var x;

    if (y !== undefined) {
      x = Math.floor(pos);
      y = Math.floor(y);
    } else {
      x = Math.floor(pos.x);
      y = Math.floor(pos.y);
    }

    var ret;

    switch (this._layerOrientation) {
      case cc.TiledMap.Orientation.ORTHO:
        ret = this._positionForOrthoAt(x, y);
        break;

      case cc.TiledMap.Orientation.ISO:
        ret = this._positionForIsoAt(x, y);
        break;

      case cc.TiledMap.Orientation.HEX:
        ret = this._positionForHexAt(x, y);
        break;
    }

    return ret;
  },
  _isInvalidPosition: function _isInvalidPosition(x, y) {
    if (x && typeof x === 'object') {
      var pos = x;
      y = pos.y;
      x = pos.x;
    }

    return x >= this._layerSize.width || y >= this._layerSize.height || x < 0 || y < 0;
  },
  _positionForIsoAt: function _positionForIsoAt(x, y) {
    var offsetX = 0,
        offsetY = 0;

    var index = Math.floor(x) + Math.floor(y) * this._layerSize.width;

    var gidAndFlags = this._tiles[index];

    if (gidAndFlags) {
      var gid = (gidAndFlags & cc.TiledMap.TileFlag.FLIPPED_MASK) >>> 0;
      var tileset = this._texGrids[gid].tileset;
      var offset = tileset.tileOffset;
      offsetX = offset.x;
      offsetY = offset.y;
    }

    return cc.v2(this._mapTileSize.width * 0.5 * (this._layerSize.height + x - y - 1) + offsetX, this._mapTileSize.height * 0.5 * (this._layerSize.width - x + this._layerSize.height - y - 2) - offsetY);
  },
  _positionForOrthoAt: function _positionForOrthoAt(x, y) {
    var offsetX = 0,
        offsetY = 0;

    var index = Math.floor(x) + Math.floor(y) * this._layerSize.width;

    var gidAndFlags = this._tiles[index];

    if (gidAndFlags) {
      var gid = (gidAndFlags & cc.TiledMap.TileFlag.FLIPPED_MASK) >>> 0;
      var tileset = this._texGrids[gid].tileset;
      var offset = tileset.tileOffset;
      offsetX = offset.x;
      offsetY = offset.y;
    }

    return cc.v2(x * this._mapTileSize.width + offsetX, (this._layerSize.height - y - 1) * this._mapTileSize.height - offsetY);
  },
  _positionForHexAt: function _positionForHexAt(col, row) {
    var tileWidth = this._mapTileSize.width;
    var tileHeight = this._mapTileSize.height;
    var rows = this._layerSize.height;

    var index = Math.floor(col) + Math.floor(row) * this._layerSize.width;

    var gid = this._tiles[index];
    var tileset = this._texGrids[gid].tileset;
    var offset = tileset.tileOffset;
    var odd_even = this._staggerIndex === cc.TiledMap.StaggerIndex.STAGGERINDEX_ODD ? 1 : -1;
    var x = 0,
        y = 0;
    var diffX = 0;
    var diffY = 0;

    switch (this._staggerAxis) {
      case cc.TiledMap.StaggerAxis.STAGGERAXIS_Y:
        diffX = 0;

        if (row % 2 === 1) {
          diffX = tileWidth / 2 * odd_even;
        }

        x = col * tileWidth + diffX + offset.x;
        y = (rows - row - 1) * (tileHeight - (tileHeight - this._hexSideLength) / 2) - offset.y;
        break;

      case cc.TiledMap.StaggerAxis.STAGGERAXIS_X:
        diffY = 0;

        if (col % 2 === 1) {
          diffY = tileHeight / 2 * -odd_even;
        }

        x = col * (tileWidth - (tileWidth - this._hexSideLength) / 2) + offset.x;
        y = (rows - row - 1) * tileHeight + diffY - offset.y;
        break;
    }

    return cc.v2(x, y);
  },

  /**
   * !#en
   * Sets the tiles gid (gid = tile global id) at a given tiles rect.
   * !#zh
   * 设置给定区域的 tile 的 gid (gid = tile 全局 id)，
   * @method setTilesGIDAt
   * @param {Array} gids an array contains gid
   * @param {Number} beginCol begin col number
   * @param {Number} beginRow begin row number
   * @param {Number} totalCols count of column
   * @example
   * tiledLayer.setTilesGIDAt([1, 1, 1, 1], 10, 10, 2)
   */
  setTilesGIDAt: function setTilesGIDAt(gids, beginCol, beginRow, totalCols) {
    if (!gids || gids.length === 0 || totalCols <= 0) return;
    if (beginRow < 0) beginRow = 0;
    if (beginCol < 0) beginCol = 0;
    var gidsIdx = 0;
    var endCol = beginCol + totalCols;

    for (var row = beginRow;; row++) {
      for (var col = beginCol; col < endCol; col++) {
        if (gidsIdx >= gids.length) return;

        this._updateTileForGID(gids[gidsIdx], col, row);

        gidsIdx++;
      }
    }
  },

  /**
   * !#en
   * Sets the tile gid (gid = tile global id) at a given tile coordinate.<br />
   * The Tile GID can be obtained by using the method "tileGIDAt" or by using the TMX editor . Tileset Mgr +1.<br />
   * If a tile is already placed at that position, then it will be removed.
   * !#zh
   * 设置给定坐标的 tile 的 gid (gid = tile 全局 id)，
   * tile 的 GID 可以使用方法 “tileGIDAt” 来获得。<br />
   * 如果一个 tile 已经放在那个位置，那么它将被删除。
   * @method setTileGIDAt
   * @param {Number} gid
   * @param {Vec2|Number} posOrX position or x
   * @param {Number} flagsOrY flags or y
   * @param {Number} [flags]
   * @example
   * tiledLayer.setTileGIDAt(1001, 10, 10, 1)
   */
  setTileGIDAt: function setTileGIDAt(gid, posOrX, flagsOrY, flags) {
    if (posOrX === undefined) {
      throw new Error("cc.TiledLayer.setTileGIDAt(): pos should be non-null");
    }

    var pos;

    if (flags !== undefined || !(posOrX instanceof cc.Vec2)) {
      // four parameters or posOrX is not a Vec2 object
      _vec2_temp3.x = posOrX;
      _vec2_temp3.y = flagsOrY;
      pos = _vec2_temp3;
    } else {
      pos = posOrX;
      flags = flagsOrY;
    }

    var ugid = gid & cc.TiledMap.TileFlag.FLIPPED_MASK;
    pos.x = Math.floor(pos.x);
    pos.y = Math.floor(pos.y);

    if (this._isInvalidPosition(pos)) {
      throw new Error("cc.TiledLayer.setTileGIDAt(): invalid position");
    }

    if (!this._tiles || !this._tilesets || this._tilesets.length == 0) {
      cc.logID(7238);
      return;
    }

    if (ugid !== 0 && ugid < this._tilesets[0].firstGid) {
      cc.logID(7239, gid);
      return;
    }

    flags = flags || 0;

    this._updateTileForGID((gid | flags) >>> 0, pos.x, pos.y);
  },
  _updateTileForGID: function _updateTileForGID(gidAndFlags, x, y) {
    var idx = 0 | x + y * this._layerSize.width;
    if (idx >= this._tiles.length) return;
    var oldGIDAndFlags = this._tiles[idx];
    if (gidAndFlags === oldGIDAndFlags) return;
    var gid = (gidAndFlags & cc.TiledMap.TileFlag.FLIPPED_MASK) >>> 0;
    var grid = this._texGrids[gid];
    var tilesetIdx = grid && grid.texId;

    if (grid) {
      this._tiles[idx] = gidAndFlags;

      this._updateVertex(x, y);

      this._buildMaterial(tilesetIdx);
    } else {
      this._tiles[idx] = 0;
    }

    this._cullingDirty = true;
  },

  /**
   * !#en
   * Returns the tiles data.An array fill with GIDs. <br />
   * !#zh
   * 返回 tiles 数据. 由GID构成的一个数组. <br />
   * @method getTiles
   * @return {Number[]}
   */
  getTiles: function getTiles() {
    return this._tiles;
  },

  /**
   * !#en
   * Returns the tile gid at a given tile coordinate. <br />
   * if it returns 0, it means that the tile is empty. <br />
   * !#zh
   * 通过给定的 tile 坐标、flags（可选）返回 tile 的 GID. <br />
   * 如果它返回 0，则表示该 tile 为空。<br />
   * @method getTileGIDAt
   * @param {Vec2|Number} pos or x
   * @param {Number} [y]
   * @return {Number}
   * @example
   * let tileGid = tiledLayer.getTileGIDAt(0, 0);
   */
  getTileGIDAt: function getTileGIDAt(pos, y) {
    if (pos === undefined) {
      throw new Error("cc.TiledLayer.getTileGIDAt(): pos should be non-null");
    }

    var x = pos;

    if (y === undefined) {
      x = pos.x;
      y = pos.y;
    }

    if (this._isInvalidPosition(x, y)) {
      throw new Error("cc.TiledLayer.getTileGIDAt(): invalid position");
    }

    if (!this._tiles) {
      cc.logID(7237);
      return null;
    }

    var index = Math.floor(x) + Math.floor(y) * this._layerSize.width; // Bits on the far end of the 32-bit global tile ID are used for tile flags


    var tile = this._tiles[index];
    return (tile & cc.TiledMap.TileFlag.FLIPPED_MASK) >>> 0;
  },
  getTileFlagsAt: function getTileFlagsAt(pos, y) {
    if (!pos) {
      throw new Error("TiledLayer.getTileFlagsAt: pos should be non-null");
    }

    if (y !== undefined) {
      pos = cc.v2(pos, y);
    }

    if (this._isInvalidPosition(pos)) {
      throw new Error("TiledLayer.getTileFlagsAt: invalid position");
    }

    if (!this._tiles) {
      cc.logID(7240);
      return null;
    }

    var idx = Math.floor(pos.x) + Math.floor(pos.y) * this._layerSize.width; // Bits on the far end of the 32-bit global tile ID are used for tile flags


    var tile = this._tiles[idx];
    return (tile & cc.TiledMap.TileFlag.FLIPPED_ALL) >>> 0;
  },
  _setCullingDirty: function _setCullingDirty(value) {
    this._cullingDirty = value;
  },
  _isCullingDirty: function _isCullingDirty() {
    return this._cullingDirty;
  },
  // 'x, y' is the position of viewPort, which's anchor point is at the center of rect.
  // 'width, height' is the size of viewPort.
  _updateViewPort: function _updateViewPort(x, y, width, height) {
    if (this._viewPort.width === width && this._viewPort.height === height && this._viewPort.x === x && this._viewPort.y === y) {
      return;
    }

    this._viewPort.x = x;
    this._viewPort.y = y;
    this._viewPort.width = width;
    this._viewPort.height = height; // if map's type is iso, reserve bottom line is 2 to avoid show empty grid because of iso grid arithmetic

    var reserveLine = 1;

    if (this._layerOrientation === cc.TiledMap.Orientation.ISO) {
      reserveLine = 2;
    }

    var vpx = this._viewPort.x - this._offset.x + this._leftDownToCenterX;
    var vpy = this._viewPort.y - this._offset.y + this._leftDownToCenterY;
    var leftDownX = vpx - this._leftOffset;
    var leftDownY = vpy - this._downOffset;
    var rightTopX = vpx + width + this._rightOffset;
    var rightTopY = vpy + height + this._topOffset;
    var leftDown = this._cullingRect.leftDown;
    var rightTop = this._cullingRect.rightTop;
    if (leftDownX < 0) leftDownX = 0;
    if (leftDownY < 0) leftDownY = 0; // calc left down

    this._positionToRowCol(leftDownX, leftDownY, _tempRowCol); // make range large


    _tempRowCol.row -= reserveLine;
    _tempRowCol.col -= reserveLine; // insure left down row col greater than 0

    _tempRowCol.row = _tempRowCol.row > 0 ? _tempRowCol.row : 0;
    _tempRowCol.col = _tempRowCol.col > 0 ? _tempRowCol.col : 0;

    if (_tempRowCol.row !== leftDown.row || _tempRowCol.col !== leftDown.col) {
      leftDown.row = _tempRowCol.row;
      leftDown.col = _tempRowCol.col;
      this._cullingDirty = true;
    } // show nothing


    if (rightTopX < 0 || rightTopY < 0) {
      _tempRowCol.row = -1;
      _tempRowCol.col = -1;
    } else {
      // calc right top
      this._positionToRowCol(rightTopX, rightTopY, _tempRowCol); // make range large


      _tempRowCol.row++;
      _tempRowCol.col++;
    } // avoid range out of max rect


    if (_tempRowCol.row > this._rightTop.row) _tempRowCol.row = this._rightTop.row;
    if (_tempRowCol.col > this._rightTop.col) _tempRowCol.col = this._rightTop.col;

    if (_tempRowCol.row !== rightTop.row || _tempRowCol.col !== rightTop.col) {
      rightTop.row = _tempRowCol.row;
      rightTop.col = _tempRowCol.col;
      this._cullingDirty = true;
    }
  },
  // the result may not precise, but it dose't matter, it just uses to be got range
  _positionToRowCol: function _positionToRowCol(x, y, result) {
    var TiledMap = cc.TiledMap;
    var Orientation = TiledMap.Orientation;
    var StaggerAxis = TiledMap.StaggerAxis;
    var maptw = this._mapTileSize.width,
        mapth = this._mapTileSize.height,
        maptw2 = maptw * 0.5,
        mapth2 = mapth * 0.5;
    var row = 0,
        col = 0,
        diffX2 = 0,
        diffY2 = 0,
        axis = this._staggerAxis;
    var cols = this._layerSize.width;

    switch (this._layerOrientation) {
      // left top to right dowm
      case Orientation.ORTHO:
        col = Math.floor(x / maptw);
        row = Math.floor(y / mapth);
        break;
      // right top to left down
      // iso can be treat as special hex whose hex side length is 0

      case Orientation.ISO:
        col = Math.floor(x / maptw2);
        row = Math.floor(y / mapth2);
        break;
      // left top to right dowm

      case Orientation.HEX:
        if (axis === StaggerAxis.STAGGERAXIS_Y) {
          row = Math.floor(y / (mapth - this._diffY1));
          diffX2 = row % 2 === 1 ? maptw2 * this._odd_even : 0;
          col = Math.floor((x - diffX2) / maptw);
        } else {
          col = Math.floor(x / (maptw - this._diffX1));
          diffY2 = col % 2 === 1 ? mapth2 * -this._odd_even : 0;
          row = Math.floor((y - diffY2) / mapth);
        }

        break;
    }

    result.row = row;
    result.col = col;
    return result;
  },
  _updateCulling: function _updateCulling() {
    if (CC_EDITOR) {
      this.enableCulling(false);
    } else if (this._enableCulling) {
      this.node._updateWorldMatrix();

      _valueTypes.Mat4.invert(_mat4_temp, this.node._worldMatrix);

      var rect = cc.visibleRect;
      var camera = cc.Camera.findCamera(this.node);

      if (camera) {
        _vec2_temp.x = 0;
        _vec2_temp.y = 0;
        _vec2_temp2.x = _vec2_temp.x + rect.width;
        _vec2_temp2.y = _vec2_temp.y + rect.height;
        camera.getScreenToWorldPoint(_vec2_temp, _vec2_temp);
        camera.getScreenToWorldPoint(_vec2_temp2, _vec2_temp2);

        _valueTypes.Vec2.transformMat4(_vec2_temp, _vec2_temp, _mat4_temp);

        _valueTypes.Vec2.transformMat4(_vec2_temp2, _vec2_temp2, _mat4_temp);

        this._updateViewPort(_vec2_temp.x, _vec2_temp.y, _vec2_temp2.x - _vec2_temp.x, _vec2_temp2.y - _vec2_temp.y);
      }
    }
  },

  /**
   * !#en Layer orientation, which is the same as the map orientation.
   * !#zh 获取 Layer 方向(同地图方向)。
   * @method getLayerOrientation
   * @return {Number}
   * @example
   * let orientation = tiledLayer.getLayerOrientation();
   * cc.log("Layer Orientation: " + orientation);
   */
  getLayerOrientation: function getLayerOrientation() {
    return this._layerOrientation;
  },

  /**
   * !#en properties from the layer. They can be added using Tiled.
   * !#zh 获取 layer 的属性，可以使用 Tiled 编辑器添加属性。
   * @method getProperties
   * @return {Object}
   * @example
   * let properties = tiledLayer.getProperties();
   * cc.log("Properties: " + properties);
   */
  getProperties: function getProperties() {
    return this._properties;
  },
  _updateVertex: function _updateVertex(col, row) {
    var TiledMap = cc.TiledMap;
    var TileFlag = TiledMap.TileFlag;
    var FLIPPED_MASK = TileFlag.FLIPPED_MASK;
    var StaggerAxis = TiledMap.StaggerAxis;
    var Orientation = TiledMap.Orientation;
    var vertices = this._vertices;
    var layerOrientation = this._layerOrientation,
        tiles = this._tiles;

    if (!tiles) {
      return;
    }

    var rightTop = this._rightTop;
    var maptw = this._mapTileSize.width,
        mapth = this._mapTileSize.height,
        maptw2 = maptw * 0.5,
        mapth2 = mapth * 0.5,
        rows = this._layerSize.height,
        cols = this._layerSize.width,
        grids = this._texGrids;
    var gid, grid, left, bottom, axis, diffX1, diffY1, odd_even, diffX2, diffY2;

    if (layerOrientation === Orientation.HEX) {
      axis = this._staggerAxis;
      diffX1 = this._diffX1;
      diffY1 = this._diffY1;
      odd_even = this._odd_even;
    }

    var cullingCol = 0,
        cullingRow = 0;
    var tileOffset = null,
        gridGID = 0; // grid border

    var topBorder = 0,
        downBorder = 0,
        leftBorder = 0,
        rightBorder = 0;
    var index = row * cols + col;
    gid = tiles[index];
    gridGID = (gid & FLIPPED_MASK) >>> 0;
    grid = grids[gridGID];

    if (!grid) {
      return;
    } // if has animation, grid must be updated per frame


    if (this._animations[gridGID]) {
      this._hasAniGrid = this._hasAniGrid || true;
    }

    switch (layerOrientation) {
      // left top to right dowm
      case Orientation.ORTHO:
        cullingCol = col;
        cullingRow = rows - row - 1;
        left = cullingCol * maptw;
        bottom = cullingRow * mapth;
        break;
      // right top to left down

      case Orientation.ISO:
        // if not consider about col, then left is 'w/2 * (rows - row - 1)'
        // if consider about col then left must add 'w/2 * col'
        // so left is 'w/2 * (rows - row - 1) + w/2 * col'
        // combine expression is 'w/2 * (rows - row + col -1)'
        cullingCol = rows + col - row - 1; // if not consider about row, then bottom is 'h/2 * (cols - col -1)'
        // if consider about row then bottom must add 'h/2 * (rows - row - 1)'
        // so bottom is 'h/2 * (cols - col -1) + h/2 * (rows - row - 1)'
        // combine expressionn is 'h/2 * (rows + cols - col - row - 2)'

        cullingRow = rows + cols - col - row - 2;
        left = maptw2 * cullingCol;
        bottom = mapth2 * cullingRow;
        break;
      // left top to right dowm

      case Orientation.HEX:
        diffX2 = axis === StaggerAxis.STAGGERAXIS_Y && row % 2 === 1 ? maptw2 * odd_even : 0;
        diffY2 = axis === StaggerAxis.STAGGERAXIS_X && col % 2 === 1 ? mapth2 * -odd_even : 0;
        left = col * (maptw - diffX1) + diffX2;
        bottom = (rows - row - 1) * (mapth - diffY1) + diffY2;
        cullingCol = col;
        cullingRow = rows - row - 1;
        break;
    }

    var rowData = vertices[cullingRow] = vertices[cullingRow] || {
      minCol: 0,
      maxCol: 0
    };
    var colData = rowData[cullingCol] = rowData[cullingCol] || {}; // record each row range, it will faster when culling grid

    if (rowData.minCol > cullingCol) {
      rowData.minCol = cullingCol;
    }

    if (rowData.maxCol < cullingCol) {
      rowData.maxCol = cullingCol;
    } // record max rect, when viewPort is bigger than layer, can make it smaller


    if (rightTop.row < cullingRow) {
      rightTop.row = cullingRow;
    }

    if (rightTop.col < cullingCol) {
      rightTop.col = cullingCol;
    } // _offset is whole layer offset
    // tileOffset is tileset offset which is related to each grid
    // tileOffset coordinate system's y axis is opposite with engine's y axis.


    tileOffset = grid.tileset.tileOffset;
    left += this._offset.x + tileOffset.x;
    bottom += this._offset.y - tileOffset.y;
    topBorder = -tileOffset.y + grid.tileset._tileSize.height - mapth;
    topBorder = topBorder < 0 ? 0 : topBorder;
    downBorder = tileOffset.y < 0 ? 0 : tileOffset.y;
    leftBorder = -tileOffset.x < 0 ? 0 : -tileOffset.x;
    rightBorder = tileOffset.x + grid.tileset._tileSize.width - maptw;
    rightBorder = rightBorder < 0 ? 0 : rightBorder;

    if (this._rightOffset < leftBorder) {
      this._rightOffset = leftBorder;
    }

    if (this._leftOffset < rightBorder) {
      this._leftOffset = rightBorder;
    }

    if (this._topOffset < downBorder) {
      this._topOffset = downBorder;
    }

    if (this._downOffset < topBorder) {
      this._downOffset = topBorder;
    }

    colData.left = left;
    colData.bottom = bottom; // this index is tiledmap grid index

    colData.index = index;
    this._cullingDirty = true;
  },
  _updateVertices: function _updateVertices() {
    var vertices = this._vertices;
    vertices.length = 0;
    var tiles = this._tiles;

    if (!tiles) {
      return;
    }

    var rightTop = this._rightTop;
    rightTop.row = -1;
    rightTop.col = -1;
    var rows = this._layerSize.height,
        cols = this._layerSize.width;
    this._topOffset = 0;
    this._downOffset = 0;
    this._leftOffset = 0;
    this._rightOffset = 0;
    this._hasAniGrid = false;

    for (var row = 0; row < rows; ++row) {
      for (var col = 0; col < cols; ++col) {
        this._updateVertex(col, row);
      }
    }

    this._verticesDirty = false;
  },

  /**
   * !#en
   * Get the TiledTile with the tile coordinate.<br/>
   * If there is no tile in the specified coordinate and forceCreate parameter is true, <br/>
   * then will create a new TiledTile at the coordinate.
   * The renderer will render the tile with the rotation, scale, position and color property of the TiledTile.
   * !#zh
   * 通过指定的 tile 坐标获取对应的 TiledTile。 <br/>
   * 如果指定的坐标没有 tile，并且设置了 forceCreate 那么将会在指定的坐标创建一个新的 TiledTile 。<br/>
   * 在渲染这个 tile 的时候，将会使用 TiledTile 的节点的旋转、缩放、位移、颜色属性。<br/>
   * @method getTiledTileAt
   * @param {Integer} x
   * @param {Integer} y
   * @param {Boolean} forceCreate
   * @return {cc.TiledTile}
   * @example
   * let tile = tiledLayer.getTiledTileAt(100, 100, true);
   * cc.log(tile);
   */
  getTiledTileAt: function getTiledTileAt(x, y, forceCreate) {
    if (this._isInvalidPosition(x, y)) {
      throw new Error("TiledLayer.getTiledTileAt: invalid position");
    }

    if (!this._tiles) {
      cc.logID(7236);
      return null;
    }

    var index = Math.floor(x) + Math.floor(y) * this._layerSize.width;

    var tile = this._tiledTiles[index];

    if (!tile && forceCreate) {
      var node = new cc.Node();
      tile = node.addComponent(cc.TiledTile);
      tile._x = x;
      tile._y = y;
      tile._layer = this;

      tile._updateInfo();

      node.parent = this.node;
      return tile;
    }

    return tile;
  },

  /** 
   * !#en
   * Change tile to TiledTile at the specified coordinate.
   * !#zh
   * 将指定的 tile 坐标替换为指定的 TiledTile。
   * @method setTiledTileAt
   * @param {Integer} x
   * @param {Integer} y
   * @param {cc.TiledTile} tiledTile
   * @return {cc.TiledTile}
   */
  setTiledTileAt: function setTiledTileAt(x, y, tiledTile) {
    if (this._isInvalidPosition(x, y)) {
      throw new Error("TiledLayer.setTiledTileAt: invalid position");
    }

    if (!this._tiles) {
      cc.logID(7236);
      return null;
    }

    var index = Math.floor(x) + Math.floor(y) * this._layerSize.width;

    this._tiledTiles[index] = tiledTile;
    this._cullingDirty = true;

    if (tiledTile) {
      this._hasTiledNodeGrid = true;
    } else {
      this._hasTiledNodeGrid = this._tiledTiles.some(function (tiledNode, index) {
        return !!tiledNode;
      });
    }

    return tiledTile;
  },

  /**
   * !#en Return texture.
   * !#zh 获取纹理。
   * @method getTexture
   * @param index The index of textures
   * @return {Texture2D}
   */
  getTexture: function getTexture(index) {
    index = index || 0;

    if (this._textures && index >= 0 && this._textures.length > index) {
      return this._textures[index];
    }

    return null;
  },

  /**
   * !#en Return texture.
   * !#zh 获取纹理。
   * @method getTextures
   * @return {Texture2D}
   */
  getTextures: function getTextures() {
    return this._textures;
  },

  /**
   * !#en Set the texture.
   * !#zh 设置纹理。
   * @method setTexture
   * @param {Texture2D} texture
   */
  setTexture: function setTexture(texture) {
    this.setTextures([texture]);
  },

  /**
   * !#en Set the texture.
   * !#zh 设置纹理。
   * @method setTexture
   * @param {Texture2D} textures
   */
  setTextures: function setTextures(textures) {
    this._textures = textures;

    this._activateMaterial();
  },

  /**
   * !#en Gets layer size.
   * !#zh 获得层大小。
   * @method getLayerSize
   * @return {Size}
   * @example
   * let size = tiledLayer.getLayerSize();
   * cc.log("layer size: " + size);
   */
  getLayerSize: function getLayerSize() {
    return this._layerSize;
  },

  /**
   * !#en Size of the map's tile (could be different from the tile's size).
   * !#zh 获取 tile 的大小( tile 的大小可能会有所不同)。
   * @method getMapTileSize
   * @return {Size}
   * @example
   * let mapTileSize = tiledLayer.getMapTileSize();
   * cc.log("MapTile size: " + mapTileSize);
   */
  getMapTileSize: function getMapTileSize() {
    return this._mapTileSize;
  },

  /**
   * !#en Gets Tile set first information for the layer.
   * !#zh 获取 layer 索引位置为0的 Tileset 信息。
   * @method getTileSet
   * @param index The index of tilesets
   * @return {TMXTilesetInfo}
   */
  getTileSet: function getTileSet(index) {
    index = index || 0;

    if (this._tilesets && index >= 0 && this._tilesets.length > index) {
      return this._tilesets[index];
    }

    return null;
  },

  /**
   * !#en Gets tile set all information for the layer.
   * !#zh 获取 layer 所有的 Tileset 信息。
   * @method getTileSet
   * @return {TMXTilesetInfo}
   */
  getTileSets: function getTileSets() {
    return this._tilesets;
  },

  /**
   * !#en Sets tile set information for the layer.
   * !#zh 设置 layer 的 tileset 信息。
   * @method setTileSet
   * @param {TMXTilesetInfo} tileset
   */
  setTileSet: function setTileSet(tileset) {
    this.setTileSets([tileset]);
  },

  /**
   * !#en Sets Tile set information for the layer.
   * !#zh 设置 layer 的 Tileset 信息。
   * @method setTileSets
   * @param {TMXTilesetInfo} tilesets
   */
  setTileSets: function setTileSets(tilesets) {
    this._tilesets = tilesets;
    var textures = this._textures = [];
    var texGrids = this._texGrids = [];

    for (var i = 0; i < tilesets.length; i++) {
      var tileset = tilesets[i];

      if (tileset) {
        textures[i] = tileset.sourceImage;
      }
    }

    cc.TiledMap.loadAllTextures(textures, function () {
      for (var _i = 0, l = tilesets.length; _i < l; ++_i) {
        var tilesetInfo = tilesets[_i];
        if (!tilesetInfo) continue;
        cc.TiledMap.fillTextureGrids(tilesetInfo, texGrids, _i);
      }

      this._prepareToRender();
    }.bind(this));
  },
  _traverseAllGrid: function _traverseAllGrid() {
    var tiles = this._tiles;
    var texGrids = this._texGrids;
    var tilesetIndexArr = this._tilesetIndexArr;
    var tilesetIndexToArrIndex = this._tilesetIndexToArrIndex = {};
    var TiledMap = cc.TiledMap;
    var TileFlag = TiledMap.TileFlag;
    var FLIPPED_MASK = TileFlag.FLIPPED_MASK;
    tilesetIndexArr.length = 0;

    for (var i = 0; i < tiles.length; i++) {
      var gid = tiles[i];
      if (gid === 0) continue;
      gid = (gid & FLIPPED_MASK) >>> 0;
      var grid = texGrids[gid];

      if (!grid) {
        cc.error("CCTiledLayer:_traverseAllGrid grid is null, gid is:", gid);
        continue;
      }

      var tilesetIdx = grid.texId;
      if (tilesetIndexToArrIndex[tilesetIdx] !== undefined) continue;
      tilesetIndexToArrIndex[tilesetIdx] = tilesetIndexArr.length;
      tilesetIndexArr.push(tilesetIdx);
    }
  },
  _init: function _init(layerInfo, mapInfo, tilesets, textures, texGrids) {
    this._cullingDirty = true;
    this._layerInfo = layerInfo;
    this._mapInfo = mapInfo;
    var size = layerInfo._layerSize; // layerInfo

    this._layerName = layerInfo.name;
    this._tiles = layerInfo._tiles;
    this._properties = layerInfo.properties;
    this._layerSize = size;
    this._minGID = layerInfo._minGID;
    this._maxGID = layerInfo._maxGID;
    this._opacity = layerInfo._opacity;
    this._renderOrder = mapInfo.renderOrder;
    this._staggerAxis = mapInfo.getStaggerAxis();
    this._staggerIndex = mapInfo.getStaggerIndex();
    this._hexSideLength = mapInfo.getHexSideLength();
    this._animations = mapInfo.getTileAnimations(); // tilesets

    this._tilesets = tilesets; // textures

    this._textures = textures; // grid texture

    this._texGrids = texGrids; // mapInfo

    this._layerOrientation = mapInfo.orientation;
    this._mapTileSize = mapInfo.getTileSize();
    var maptw = this._mapTileSize.width;
    var mapth = this._mapTileSize.height;
    var layerW = this._layerSize.width;
    var layerH = this._layerSize.height;

    if (this._layerOrientation === cc.TiledMap.Orientation.HEX) {
      // handle hex map
      var TiledMap = cc.TiledMap;
      var StaggerAxis = TiledMap.StaggerAxis;
      var StaggerIndex = TiledMap.StaggerIndex;
      var width = 0,
          height = 0;
      this._odd_even = this._staggerIndex === StaggerIndex.STAGGERINDEX_ODD ? 1 : -1;

      if (this._staggerAxis === StaggerAxis.STAGGERAXIS_X) {
        this._diffX1 = (maptw - this._hexSideLength) / 2;
        this._diffY1 = 0;
        height = mapth * (layerH + 0.5);
        width = (maptw + this._hexSideLength) * Math.floor(layerW / 2) + maptw * (layerW % 2);
      } else {
        this._diffX1 = 0;
        this._diffY1 = (mapth - this._hexSideLength) / 2;
        width = maptw * (layerW + 0.5);
        height = (mapth + this._hexSideLength) * Math.floor(layerH / 2) + mapth * (layerH % 2);
      }

      this.node.setContentSize(width, height);
    } else if (this._layerOrientation === cc.TiledMap.Orientation.ISO) {
      var wh = layerW + layerH;
      this.node.setContentSize(maptw * 0.5 * wh, mapth * 0.5 * wh);
    } else {
      this.node.setContentSize(layerW * maptw, layerH * mapth);
    } // offset (after layer orientation is set);


    this._offset = cc.v2(layerInfo.offset.x, -layerInfo.offset.y);
    this._useAutomaticVertexZ = false;
    this._vertexZvalue = 0;

    this._syncAnchorPoint();

    this._prepareToRender();
  },
  _prepareToRender: function _prepareToRender() {
    this._updateVertices();

    this._traverseAllGrid();

    this._updateAllUserNode();

    this._activateMaterial();
  },
  _buildMaterial: function _buildMaterial(tilesetIdx) {
    var texIdMatIdx = this._texIdToMatIndex;

    if (texIdMatIdx[tilesetIdx] !== undefined) {
      return null;
    }

    var tilesetIndexArr = this._tilesetIndexArr;
    var tilesetIndexToArrIndex = this._tilesetIndexToArrIndex;
    var index = tilesetIndexToArrIndex[tilesetIdx];

    if (index === undefined) {
      tilesetIndexToArrIndex[tilesetIdx] = index = tilesetIndexArr.length;
      tilesetIndexArr.push(tilesetIdx);
    }

    var texture = this._textures[tilesetIdx];
    var material = this._materials[index];

    if (!material) {
      material = Material.getBuiltinMaterial('2d-sprite');
    }

    material = _materialVariant["default"].create(material, this);
    material.define('CC_USE_MODEL', true);
    material.setProperty('texture', texture);
    this._materials[index] = material;
    texIdMatIdx[tilesetIdx] = index;
    return material;
  },
  _activateMaterial: function _activateMaterial() {
    var tilesetIndexArr = this._tilesetIndexArr;

    if (tilesetIndexArr.length === 0) {
      this.disableRender();
      return;
    }

    var matLen = tilesetIndexArr.length;

    for (var i = 0; i < matLen; i++) {
      this._buildMaterial(tilesetIndexArr[i]);
    }

    this._materials.length = matLen;
    this.markForRender(true);
  }
});
cc.TiledLayer = module.exports = TiledLayer;
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_engine__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC90aWxlbWFwL0NDVGlsZWRMYXllci5qcyJdLCJuYW1lcyI6WyJSZW5kZXJDb21wb25lbnQiLCJyZXF1aXJlIiwiTWF0ZXJpYWwiLCJSZW5kZXJGbG93IiwiX21hdDRfdGVtcCIsImNjIiwibWF0NCIsIl92ZWMyX3RlbXAiLCJ2MiIsIl92ZWMyX3RlbXAyIiwiX3ZlYzJfdGVtcDMiLCJfdGVtcFJvd0NvbCIsInJvdyIsImNvbCIsIlRpbGVkVXNlck5vZGVEYXRhIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwiY3RvciIsIl9pbmRleCIsIl9yb3ciLCJfY29sIiwiX3RpbGVkTGF5ZXIiLCJUaWxlZExheWVyIiwiZWRpdG9yIiwiaW5zcGVjdG9yIiwiX3VzZXJOb2RlR3JpZCIsIl91c2VyTm9kZU1hcCIsIl91c2VyTm9kZURpcnR5IiwiX3RpbGVkVGlsZXMiLCJfdGlsZXNldEluZGV4QXJyIiwiX3RpbGVzZXRJbmRleFRvQXJySW5kZXgiLCJfdGV4SWRUb01hdEluZGV4IiwiX3ZpZXdQb3J0IiwieCIsInkiLCJ3aWR0aCIsImhlaWdodCIsIl9jdWxsaW5nUmVjdCIsImxlZnREb3duIiwicmlnaHRUb3AiLCJfY3VsbGluZ0RpcnR5IiwiX3JpZ2h0VG9wIiwiX2xheWVySW5mbyIsIl9tYXBJbmZvIiwiX3RvcE9mZnNldCIsIl9kb3duT2Zmc2V0IiwiX2xlZnRPZmZzZXQiLCJfcmlnaHRPZmZzZXQiLCJfdGlsZXMiLCJfdmVydGljZXMiLCJfdmVydGljZXNEaXJ0eSIsIl9sYXllck5hbWUiLCJfbGF5ZXJPcmllbnRhdGlvbiIsIl90ZXhHcmlkcyIsIl90ZXh0dXJlcyIsIl90aWxlc2V0cyIsIl9sZWZ0RG93blRvQ2VudGVyWCIsIl9sZWZ0RG93blRvQ2VudGVyWSIsIl9oYXNUaWxlZE5vZGVHcmlkIiwiX2hhc0FuaUdyaWQiLCJfYW5pbWF0aW9ucyIsIl9lbmFibGVDdWxsaW5nIiwibWFjcm8iLCJFTkFCTEVfVElMRURNQVBfQ1VMTElORyIsIl9oYXNUaWxlZE5vZGUiLCJfaGFzQW5pbWF0aW9uIiwiZW5hYmxlQ3VsbGluZyIsInZhbHVlIiwiYWRkVXNlck5vZGUiLCJub2RlIiwiZGF0YUNvbXAiLCJnZXRDb21wb25lbnQiLCJ3YXJuIiwiYWRkQ29tcG9uZW50IiwicGFyZW50IiwiX3JlbmRlckZsYWciLCJGTEFHX0JSRUFLX0ZMT1ciLCJfaWQiLCJfbm9kZUxvY2FsUG9zVG9MYXllclBvcyIsIl9wb3NpdGlvblRvUm93Q29sIiwiX2FkZFVzZXJOb2RlVG9HcmlkIiwiX3VwZGF0ZUN1bGxpbmdPZmZzZXRCeVVzZXJOb2RlIiwib24iLCJOb2RlIiwiRXZlbnRUeXBlIiwiUE9TSVRJT05fQ0hBTkdFRCIsIl91c2VyTm9kZVBvc0NoYW5nZSIsIlNJWkVfQ0hBTkdFRCIsIl91c2VyTm9kZVNpemVDaGFuZ2UiLCJyZW1vdmVVc2VyTm9kZSIsIm9mZiIsIl9yZW1vdmVVc2VyTm9kZUZyb21HcmlkIiwiX3JlbW92ZUNvbXBvbmVudCIsImRlc3Ryb3kiLCJyZW1vdmVGcm9tUGFyZW50IiwiZGVzdHJveVVzZXJOb2RlIiwibm9kZVBvcyIsIm91dCIsIl9nZXROb2Rlc0J5Um93Q29sIiwicm93RGF0YSIsIl9nZXROb2Rlc0NvdW50QnlSb3ciLCJjb3VudCIsIl91cGRhdGVBbGxVc2VyTm9kZSIsImRhdGFJZCIsInNlbGYiLCJfbGltaXRJbkxheWVyIiwiaW5kZXgiLCJjb2xEYXRhIiwibGlzdCIsImxlbmd0aCIsInJvd0NvbCIsInRlbXBSb3dDb2wiLCJwdXNoIiwiX2lzVXNlck5vZGVEaXJ0eSIsIl9zZXRVc2VyTm9kZURpcnR5Iiwib25FbmFibGUiLCJfc3VwZXIiLCJBTkNIT1JfQ0hBTkdFRCIsIl9zeW5jQW5jaG9yUG9pbnQiLCJfYWN0aXZhdGVNYXRlcmlhbCIsIm9uRGlzYWJsZSIsImFuY2hvclgiLCJzY2FsZVgiLCJhbmNob3JZIiwic2NhbGVZIiwib25EZXN0cm95IiwiX2J1ZmZlciIsIl9yZW5kZXJEYXRhTGlzdCIsImdldExheWVyTmFtZSIsInNldExheWVyTmFtZSIsImxheWVyTmFtZSIsImdldFByb3BlcnR5IiwicHJvcGVydHlOYW1lIiwiX3Byb3BlcnRpZXMiLCJnZXRQb3NpdGlvbkF0IiwicG9zIiwidW5kZWZpbmVkIiwiTWF0aCIsImZsb29yIiwicmV0IiwiVGlsZWRNYXAiLCJPcmllbnRhdGlvbiIsIk9SVEhPIiwiX3Bvc2l0aW9uRm9yT3J0aG9BdCIsIklTTyIsIl9wb3NpdGlvbkZvcklzb0F0IiwiSEVYIiwiX3Bvc2l0aW9uRm9ySGV4QXQiLCJfaXNJbnZhbGlkUG9zaXRpb24iLCJfbGF5ZXJTaXplIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJnaWRBbmRGbGFncyIsImdpZCIsIlRpbGVGbGFnIiwiRkxJUFBFRF9NQVNLIiwidGlsZXNldCIsIm9mZnNldCIsInRpbGVPZmZzZXQiLCJfbWFwVGlsZVNpemUiLCJ0aWxlV2lkdGgiLCJ0aWxlSGVpZ2h0Iiwicm93cyIsIm9kZF9ldmVuIiwiX3N0YWdnZXJJbmRleCIsIlN0YWdnZXJJbmRleCIsIlNUQUdHRVJJTkRFWF9PREQiLCJkaWZmWCIsImRpZmZZIiwiX3N0YWdnZXJBeGlzIiwiU3RhZ2dlckF4aXMiLCJTVEFHR0VSQVhJU19ZIiwiX2hleFNpZGVMZW5ndGgiLCJTVEFHR0VSQVhJU19YIiwic2V0VGlsZXNHSURBdCIsImdpZHMiLCJiZWdpbkNvbCIsImJlZ2luUm93IiwidG90YWxDb2xzIiwiZ2lkc0lkeCIsImVuZENvbCIsIl91cGRhdGVUaWxlRm9yR0lEIiwic2V0VGlsZUdJREF0IiwicG9zT3JYIiwiZmxhZ3NPclkiLCJmbGFncyIsIkVycm9yIiwiVmVjMiIsInVnaWQiLCJsb2dJRCIsImZpcnN0R2lkIiwiaWR4Iiwib2xkR0lEQW5kRmxhZ3MiLCJncmlkIiwidGlsZXNldElkeCIsInRleElkIiwiX3VwZGF0ZVZlcnRleCIsIl9idWlsZE1hdGVyaWFsIiwiZ2V0VGlsZXMiLCJnZXRUaWxlR0lEQXQiLCJ0aWxlIiwiZ2V0VGlsZUZsYWdzQXQiLCJGTElQUEVEX0FMTCIsIl9zZXRDdWxsaW5nRGlydHkiLCJfaXNDdWxsaW5nRGlydHkiLCJfdXBkYXRlVmlld1BvcnQiLCJyZXNlcnZlTGluZSIsInZweCIsIl9vZmZzZXQiLCJ2cHkiLCJsZWZ0RG93blgiLCJsZWZ0RG93blkiLCJyaWdodFRvcFgiLCJyaWdodFRvcFkiLCJyZXN1bHQiLCJtYXB0dyIsIm1hcHRoIiwibWFwdHcyIiwibWFwdGgyIiwiZGlmZlgyIiwiZGlmZlkyIiwiYXhpcyIsImNvbHMiLCJfZGlmZlkxIiwiX29kZF9ldmVuIiwiX2RpZmZYMSIsIl91cGRhdGVDdWxsaW5nIiwiQ0NfRURJVE9SIiwiX3VwZGF0ZVdvcmxkTWF0cml4IiwiTWF0NCIsImludmVydCIsIl93b3JsZE1hdHJpeCIsInJlY3QiLCJ2aXNpYmxlUmVjdCIsImNhbWVyYSIsIkNhbWVyYSIsImZpbmRDYW1lcmEiLCJnZXRTY3JlZW5Ub1dvcmxkUG9pbnQiLCJ0cmFuc2Zvcm1NYXQ0IiwiZ2V0TGF5ZXJPcmllbnRhdGlvbiIsImdldFByb3BlcnRpZXMiLCJ2ZXJ0aWNlcyIsImxheWVyT3JpZW50YXRpb24iLCJ0aWxlcyIsImdyaWRzIiwibGVmdCIsImJvdHRvbSIsImRpZmZYMSIsImRpZmZZMSIsImN1bGxpbmdDb2wiLCJjdWxsaW5nUm93IiwiZ3JpZEdJRCIsInRvcEJvcmRlciIsImRvd25Cb3JkZXIiLCJsZWZ0Qm9yZGVyIiwicmlnaHRCb3JkZXIiLCJtaW5Db2wiLCJtYXhDb2wiLCJfdGlsZVNpemUiLCJfdXBkYXRlVmVydGljZXMiLCJnZXRUaWxlZFRpbGVBdCIsImZvcmNlQ3JlYXRlIiwiVGlsZWRUaWxlIiwiX3giLCJfeSIsIl9sYXllciIsIl91cGRhdGVJbmZvIiwic2V0VGlsZWRUaWxlQXQiLCJ0aWxlZFRpbGUiLCJzb21lIiwidGlsZWROb2RlIiwiZ2V0VGV4dHVyZSIsImdldFRleHR1cmVzIiwic2V0VGV4dHVyZSIsInRleHR1cmUiLCJzZXRUZXh0dXJlcyIsInRleHR1cmVzIiwiZ2V0TGF5ZXJTaXplIiwiZ2V0TWFwVGlsZVNpemUiLCJnZXRUaWxlU2V0IiwiZ2V0VGlsZVNldHMiLCJzZXRUaWxlU2V0Iiwic2V0VGlsZVNldHMiLCJ0aWxlc2V0cyIsInRleEdyaWRzIiwiaSIsInNvdXJjZUltYWdlIiwibG9hZEFsbFRleHR1cmVzIiwibCIsInRpbGVzZXRJbmZvIiwiZmlsbFRleHR1cmVHcmlkcyIsIl9wcmVwYXJlVG9SZW5kZXIiLCJiaW5kIiwiX3RyYXZlcnNlQWxsR3JpZCIsInRpbGVzZXRJbmRleEFyciIsInRpbGVzZXRJbmRleFRvQXJySW5kZXgiLCJlcnJvciIsIl9pbml0IiwibGF5ZXJJbmZvIiwibWFwSW5mbyIsInNpemUiLCJwcm9wZXJ0aWVzIiwiX21pbkdJRCIsIl9tYXhHSUQiLCJfb3BhY2l0eSIsIl9yZW5kZXJPcmRlciIsInJlbmRlck9yZGVyIiwiZ2V0U3RhZ2dlckF4aXMiLCJnZXRTdGFnZ2VySW5kZXgiLCJnZXRIZXhTaWRlTGVuZ3RoIiwiZ2V0VGlsZUFuaW1hdGlvbnMiLCJvcmllbnRhdGlvbiIsImdldFRpbGVTaXplIiwibGF5ZXJXIiwibGF5ZXJIIiwic2V0Q29udGVudFNpemUiLCJ3aCIsIl91c2VBdXRvbWF0aWNWZXJ0ZXhaIiwiX3ZlcnRleFp2YWx1ZSIsInRleElkTWF0SWR4IiwibWF0ZXJpYWwiLCJfbWF0ZXJpYWxzIiwiZ2V0QnVpbHRpbk1hdGVyaWFsIiwiTWF0ZXJpYWxWYXJpYW50IiwiY3JlYXRlIiwiZGVmaW5lIiwic2V0UHJvcGVydHkiLCJkaXNhYmxlUmVuZGVyIiwibWF0TGVuIiwibWFya0ZvclJlbmRlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUE2QkE7O0FBQ0E7Ozs7QUE5QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBTUEsZUFBZSxHQUFHQyxPQUFPLENBQUMsc0NBQUQsQ0FBL0I7O0FBQ0EsSUFBTUMsUUFBUSxHQUFHRCxPQUFPLENBQUMsb0NBQUQsQ0FBeEI7O0FBQ0EsSUFBTUUsVUFBVSxHQUFHRixPQUFP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QixJQUFuQjtBQUNIO0FBajBDcUIsQ0FBVCxDQUFqQjtBQW8wQ0FyVSxFQUFFLENBQUNrQixVQUFILEdBQWdCb1QsTUFBTSxDQUFDQyxPQUFQLEdBQWlCclQsVUFBakMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jb25zdCBSZW5kZXJDb21wb25lbnQgPSByZXF1aXJlKCcuLi9jb3JlL2NvbXBvbmVudHMvQ0NSZW5kZXJDb21wb25lbnQnKTtcbmNvbnN0IE1hdGVyaWFsID0gcmVxdWlyZSgnLi4vY29yZS9hc3NldHMvbWF0ZXJpYWwvQ0NNYXRlcmlhbCcpO1xuY29uc3QgUmVuZGVyRmxvdyA9IHJlcXVpcmUoJy4uL2NvcmUvcmVuZGVyZXIvcmVuZGVyLWZsb3cnKTtcblxuaW1wb3J0IHsgTWF0NCwgVmVjMiB9IGZyb20gJy4uL2NvcmUvdmFsdWUtdHlwZXMnO1xuaW1wb3J0IE1hdGVyaWFsVmFyaWFudCBmcm9tICcuLi9jb3JlL2Fzc2V0cy9tYXRlcmlhbC9tYXRlcmlhbC12YXJpYW50JztcbmxldCBfbWF0NF90ZW1wID0gY2MubWF0NCgpO1xubGV0IF92ZWMyX3RlbXAgPSBjYy52MigpO1xubGV0IF92ZWMyX3RlbXAyID0gY2MudjIoKTtcbmxldCBfdmVjMl90ZW1wMyA9IGNjLnYyKCk7XG5sZXQgX3RlbXBSb3dDb2wgPSB7cm93OjAsIGNvbDowfTtcblxubGV0IFRpbGVkVXNlck5vZGVEYXRhID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5UaWxlZFVzZXJOb2RlRGF0YScsXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgY3RvciAoKSB7XG4gICAgICAgIHRoaXMuX2luZGV4ID0gLTE7XG4gICAgICAgIHRoaXMuX3JvdyA9IC0xO1xuICAgICAgICB0aGlzLl9jb2wgPSAtMTtcbiAgICAgICAgdGhpcy5fdGlsZWRMYXllciA9IG51bGw7XG4gICAgfVxuXG59KTtcblxuLyoqXG4gKiAhI2VuIFJlbmRlciB0aGUgVE1YIGxheWVyLlxuICogISN6aCDmuLLmn5MgVE1YIGxheWVy44CCXG4gKiBAY2xhc3MgVGlsZWRMYXllclxuICogQGV4dGVuZHMgQ29tcG9uZW50XG4gKi9cbmxldCBUaWxlZExheWVyID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5UaWxlZExheWVyJyxcblxuICAgIC8vIEluaGVyaXRzIGZyb20gdGhlIGFic3RyYWN0IGNsYXNzIGRpcmVjdGx5LFxuICAgIC8vIGJlY2F1c2UgVGlsZWRMYXllciBub3QgY3JlYXRlIG9yIG1haW50YWlucyB0aGUgc2dOb2RlIGJ5IGl0c2VsZi5cbiAgICBleHRlbmRzOiBSZW5kZXJDb21wb25lbnQsXG5cbiAgICBlZGl0b3I6IHtcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy90aWxlZC1sYXllci5qcycsXG4gICAgfSxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICB0aGlzLl91c2VyTm9kZUdyaWQgPSB7fTsvLyBbcm93XVtjb2xdID0ge2NvdW50OiAwLCBub2Rlc0xpc3Q6IFtdfTtcbiAgICAgICAgdGhpcy5fdXNlck5vZGVNYXAgPSB7fTsvLyBbaWRdID0gbm9kZTtcbiAgICAgICAgdGhpcy5fdXNlck5vZGVEaXJ0eSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBsYXllciB0aWxlcyBub2RlLCBpbmRleCBpcyBjYWN1bGF0ZWQgYnkgJ3ggKyB3aWR0aCAqIHknLCBmb3JtYXQgbGlrZXMgJ1swXT10aWxlTm9kZTAsWzFdPXRpbGVOb2RlMSwgLi4uJ1xuICAgICAgICB0aGlzLl90aWxlZFRpbGVzID0gW107XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIGxheWVyIHRpbGVzZXRzIGluZGV4IGFycmF5XG4gICAgICAgIHRoaXMuX3RpbGVzZXRJbmRleEFyciA9IFtdO1xuICAgICAgICAvLyB0aWxlc2V0IGluZGV4IHRvIGFycmF5IGluZGV4XG4gICAgICAgIHRoaXMuX3RpbGVzZXRJbmRleFRvQXJySW5kZXggPSB7fTtcbiAgICAgICAgLy8gdGV4dHVyZSBpZCB0byBtYXRlcmlhbCBpbmRleFxuICAgICAgICB0aGlzLl90ZXhJZFRvTWF0SW5kZXggPSB7fTtcblxuICAgICAgICB0aGlzLl92aWV3UG9ydCA9IHt4Oi0xLCB5Oi0xLCB3aWR0aDotMSwgaGVpZ2h0Oi0xfTtcbiAgICAgICAgdGhpcy5fY3VsbGluZ1JlY3QgPSB7XG4gICAgICAgICAgICBsZWZ0RG93bjp7cm93Oi0xLCBjb2w6LTF9LFxuICAgICAgICAgICAgcmlnaHRUb3A6e3JvdzotMSwgY29sOi0xfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9jdWxsaW5nRGlydHkgPSB0cnVlO1xuICAgICAgICB0aGlzLl9yaWdodFRvcCA9IHtyb3c6LTEsIGNvbDotMX07XG5cbiAgICAgICAgdGhpcy5fbGF5ZXJJbmZvID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbWFwSW5mbyA9IG51bGw7XG5cbiAgICAgICAgLy8gcmVjb3JkIG1heCBvciBtaW4gdGlsZSB0ZXh0dXJlIG9mZnNldCwgXG4gICAgICAgIC8vIGl0IHdpbGwgbWFrZSBjdWxsaW5nIHJlY3QgbW9yZSBsYXJnZSwgd2hpY2ggaW5zdXJlIGN1bGxpbmcgcmVjdCBjb3JyZWN0LlxuICAgICAgICB0aGlzLl90b3BPZmZzZXQgPSAwO1xuICAgICAgICB0aGlzLl9kb3duT2Zmc2V0ID0gMDtcbiAgICAgICAgdGhpcy5fbGVmdE9mZnNldCA9IDA7XG4gICAgICAgIHRoaXMuX3JpZ2h0T2Zmc2V0ID0gMDtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgbGF5ZXIgdGlsZXMsIGluZGV4IGlzIGNhY3VsYXRlZCBieSAneCArIHdpZHRoICogeScsIGZvcm1hdCBsaWtlcyAnWzBdPWdpZDAsWzFdPWdpZDEsIC4uLidcbiAgICAgICAgdGhpcy5fdGlsZXMgPSBbXTtcbiAgICAgICAgLy8gdmVydGV4IGFycmF5XG4gICAgICAgIHRoaXMuX3ZlcnRpY2VzID0gW107XG4gICAgICAgIC8vIHZlcnRpY2VzIGRpcnR5XG4gICAgICAgIHRoaXMuX3ZlcnRpY2VzRGlydHkgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX2xheWVyTmFtZSA9ICcnO1xuICAgICAgICB0aGlzLl9sYXllck9yaWVudGF0aW9uID0gbnVsbDtcblxuICAgICAgICAvLyBzdG9yZSBhbGwgbGF5ZXIgZ2lkIGNvcnJlc3BvbmRpbmcgdGV4dHVyZSBpbmZvLCBpbmRleCBpcyBnaWQsIGZvcm1hdCBsaWtlcyAnW2dpZDBdPXRleC1pbmZvLFtnaWQxXT10ZXgtaW5mbywgLi4uJ1xuICAgICAgICB0aGlzLl90ZXhHcmlkcyA9IG51bGw7XG4gICAgICAgIC8vIHN0b3JlIGFsbCB0aWxlc2V0IHRleHR1cmUsIGluZGV4IGlzIHRpbGVzZXQgaW5kZXgsIGZvcm1hdCBsaWtlcyAnWzBdPXRleHR1cmUwLCBbMV09dGV4dHVyZTEsIC4uLidcbiAgICAgICAgdGhpcy5fdGV4dHVyZXMgPSBudWxsO1xuICAgICAgICB0aGlzLl90aWxlc2V0cyA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fbGVmdERvd25Ub0NlbnRlclggPSAwO1xuICAgICAgICB0aGlzLl9sZWZ0RG93blRvQ2VudGVyWSA9IDA7XG5cbiAgICAgICAgdGhpcy5faGFzVGlsZWROb2RlR3JpZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9oYXNBbmlHcmlkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbnMgPSBudWxsO1xuXG4gICAgICAgIC8vIHN3aXRjaCBvZiBjdWxsaW5nXG4gICAgICAgIHRoaXMuX2VuYWJsZUN1bGxpbmcgPSBjYy5tYWNyby5FTkFCTEVfVElMRURNQVBfQ1VMTElORztcbiAgICB9LFxuXG4gICAgX2hhc1RpbGVkTm9kZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oYXNUaWxlZE5vZGVHcmlkO1xuICAgIH0sXG5cbiAgICBfaGFzQW5pbWF0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc0FuaUdyaWQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gZW5hYmxlIG9yIGRpc2FibGUgY3VsbGluZ1xuICAgICAqICEjemgg5byA5ZCv5oiW5YWz6Zet6KOB5Ymq44CCXG4gICAgICogQG1ldGhvZCBlbmFibGVDdWxsaW5nXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgZW5hYmxlQ3VsbGluZyAodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VuYWJsZUN1bGxpbmcgIT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2VuYWJsZUN1bGxpbmcgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX2N1bGxpbmdEaXJ0eSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBBZGRzIHVzZXIncyBub2RlIGludG8gbGF5ZXIuXG4gICAgICogISN6aCDmt7vliqDnlKjmiLfoioLngrnjgIJcbiAgICAgKiBAbWV0aG9kIGFkZFVzZXJOb2RlXG4gICAgICogQHBhcmFtIHtjYy5Ob2RlfSBub2RlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBhZGRVc2VyTm9kZSAobm9kZSkge1xuICAgICAgICBsZXQgZGF0YUNvbXAgPSBub2RlLmdldENvbXBvbmVudChUaWxlZFVzZXJOb2RlRGF0YSk7XG4gICAgICAgIGlmIChkYXRhQ29tcCkge1xuICAgICAgICAgICAgY2Mud2FybihcIkNDVGlsZWRMYXllcjphZGRVc2VyTm9kZSBub2RlIGhhcyBiZWVuIGFkZGVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YUNvbXAgPSBub2RlLmFkZENvbXBvbmVudChUaWxlZFVzZXJOb2RlRGF0YSk7XG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICBub2RlLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19CUkVBS19GTE9XO1xuICAgICAgICB0aGlzLl91c2VyTm9kZU1hcFtub2RlLl9pZF0gPSBkYXRhQ29tcDtcblxuICAgICAgICBkYXRhQ29tcC5fcm93ID0gLTE7XG4gICAgICAgIGRhdGFDb21wLl9jb2wgPSAtMTtcbiAgICAgICAgZGF0YUNvbXAuX3RpbGVkTGF5ZXIgPSB0aGlzO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fbm9kZUxvY2FsUG9zVG9MYXllclBvcyhub2RlLCBfdmVjMl90ZW1wKTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25Ub1Jvd0NvbChfdmVjMl90ZW1wLngsIF92ZWMyX3RlbXAueSwgX3RlbXBSb3dDb2wpO1xuICAgICAgICB0aGlzLl9hZGRVc2VyTm9kZVRvR3JpZChkYXRhQ29tcCwgX3RlbXBSb3dDb2wpO1xuICAgICAgICB0aGlzLl91cGRhdGVDdWxsaW5nT2Zmc2V0QnlVc2VyTm9kZShub2RlKTtcbiAgICAgICAgbm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELCB0aGlzLl91c2VyTm9kZVBvc0NoYW5nZSwgZGF0YUNvbXApO1xuICAgICAgICBub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCwgdGhpcy5fdXNlck5vZGVTaXplQ2hhbmdlLCBkYXRhQ29tcCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJlbW92ZXMgdXNlcidzIG5vZGUuXG4gICAgICogISN6aCDnp7vpmaTnlKjmiLfoioLngrnjgIJcbiAgICAgKiBAbWV0aG9kIHJlbW92ZVVzZXJOb2RlXG4gICAgICogQHBhcmFtIHtjYy5Ob2RlfSBub2RlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICByZW1vdmVVc2VyTm9kZSAobm9kZSkge1xuICAgICAgICBsZXQgZGF0YUNvbXAgPSBub2RlLmdldENvbXBvbmVudChUaWxlZFVzZXJOb2RlRGF0YSk7XG4gICAgICAgIGlmICghZGF0YUNvbXApIHtcbiAgICAgICAgICAgIGNjLndhcm4oXCJDQ1RpbGVkTGF5ZXI6cmVtb3ZlVXNlck5vZGUgbm9kZSBpcyBub3QgZXhpc3RcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcy5fdXNlck5vZGVQb3NDaGFuZ2UsIGRhdGFDb21wKTtcbiAgICAgICAgbm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0aGlzLl91c2VyTm9kZVNpemVDaGFuZ2UsIGRhdGFDb21wKTtcbiAgICAgICAgdGhpcy5fcmVtb3ZlVXNlck5vZGVGcm9tR3JpZChkYXRhQ29tcCk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl91c2VyTm9kZU1hcFtub2RlLl9pZF07XG4gICAgICAgIG5vZGUuX3JlbW92ZUNvbXBvbmVudChkYXRhQ29tcCk7XG4gICAgICAgIGRhdGFDb21wLmRlc3Ryb3koKTtcbiAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50KHRydWUpO1xuICAgICAgICBub2RlLl9yZW5kZXJGbGFnICY9IH5SZW5kZXJGbG93LkZMQUdfQlJFQUtfRkxPVztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gRGVzdHJveSB1c2VyJ3Mgbm9kZS5cbiAgICAgKiAhI3poIOmUgOavgeeUqOaIt+iKgueCueOAglxuICAgICAqIEBtZXRob2QgZGVzdHJveVVzZXJOb2RlXG4gICAgICogQHBhcmFtIHtjYy5Ob2RlfSBub2RlXG4gICAgICovXG4gICAgZGVzdHJveVVzZXJOb2RlIChub2RlKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlVXNlck5vZGUobm9kZSk7XG4gICAgICAgIG5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICAvLyBhY29yZGluZyBsYXllciBhbmNob3IgcG9pbnQgdG8gY2FsY3VsYXRlIG5vZGUgbGF5ZXIgcG9zXG4gICAgX25vZGVMb2NhbFBvc1RvTGF5ZXJQb3MgKG5vZGVQb3MsIG91dCkge1xuICAgICAgICBvdXQueCA9IG5vZGVQb3MueCArIHRoaXMuX2xlZnREb3duVG9DZW50ZXJYO1xuICAgICAgICBvdXQueSA9IG5vZGVQb3MueSArIHRoaXMuX2xlZnREb3duVG9DZW50ZXJZO1xuICAgIH0sXG5cbiAgICBfZ2V0Tm9kZXNCeVJvd0NvbCAocm93LCBjb2wpIHtcbiAgICAgICAgbGV0IHJvd0RhdGEgPSB0aGlzLl91c2VyTm9kZUdyaWRbcm93XTtcbiAgICAgICAgaWYgKCFyb3dEYXRhKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHJvd0RhdGFbY29sXTtcbiAgICB9LFxuXG4gICAgX2dldE5vZGVzQ291bnRCeVJvdyAocm93KSB7XG4gICAgICAgIGxldCByb3dEYXRhID0gdGhpcy5fdXNlck5vZGVHcmlkW3Jvd107XG4gICAgICAgIGlmICghcm93RGF0YSkgcmV0dXJuIDA7XG4gICAgICAgIHJldHVybiByb3dEYXRhLmNvdW50O1xuICAgIH0sXG5cbiAgICBfdXBkYXRlQWxsVXNlck5vZGUgKCkge1xuICAgICAgICB0aGlzLl91c2VyTm9kZUdyaWQgPSB7fTtcbiAgICAgICAgZm9yIChsZXQgZGF0YUlkIGluIHRoaXMuX3VzZXJOb2RlTWFwKSB7XG4gICAgICAgICAgICBsZXQgZGF0YUNvbXAgPSB0aGlzLl91c2VyTm9kZU1hcFtkYXRhSWRdO1xuICAgICAgICAgICAgdGhpcy5fbm9kZUxvY2FsUG9zVG9MYXllclBvcyhkYXRhQ29tcC5ub2RlLCBfdmVjMl90ZW1wKTtcbiAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uVG9Sb3dDb2woX3ZlYzJfdGVtcC54LCBfdmVjMl90ZW1wLnksIF90ZW1wUm93Q29sKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZFVzZXJOb2RlVG9HcmlkKGRhdGFDb21wLCBfdGVtcFJvd0NvbCk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDdWxsaW5nT2Zmc2V0QnlVc2VyTm9kZShkYXRhQ29tcC5ub2RlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdXBkYXRlQ3VsbGluZ09mZnNldEJ5VXNlck5vZGUgKG5vZGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RvcE9mZnNldCA8IG5vZGUuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLl90b3BPZmZzZXQgPSBub2RlLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZG93bk9mZnNldCA8IG5vZGUuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLl9kb3duT2Zmc2V0ID0gbm9kZS5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2xlZnRPZmZzZXQgPCBub2RlLndpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWZ0T2Zmc2V0ID0gbm9kZS53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcmlnaHRPZmZzZXQgPCBub2RlLndpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLl9yaWdodE9mZnNldCA9IG5vZGUud2lkdGg7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3VzZXJOb2RlU2l6ZUNoYW5nZSAoKSB7XG4gICAgICAgIGxldCBkYXRhQ29tcCA9IHRoaXM7XG4gICAgICAgIGxldCBub2RlID0gZGF0YUNvbXAubm9kZTtcbiAgICAgICAgbGV0IHNlbGYgPSBkYXRhQ29tcC5fdGlsZWRMYXllcjtcbiAgICAgICAgc2VsZi5fdXBkYXRlQ3VsbGluZ09mZnNldEJ5VXNlck5vZGUobm9kZSk7XG4gICAgfSxcblxuICAgIF91c2VyTm9kZVBvc0NoYW5nZSAoKSB7XG4gICAgICAgIGxldCBkYXRhQ29tcCA9IHRoaXM7XG4gICAgICAgIGxldCBub2RlID0gZGF0YUNvbXAubm9kZTtcbiAgICAgICAgbGV0IHNlbGYgPSBkYXRhQ29tcC5fdGlsZWRMYXllcjtcbiAgICAgICAgc2VsZi5fbm9kZUxvY2FsUG9zVG9MYXllclBvcyhub2RlLCBfdmVjMl90ZW1wKTtcbiAgICAgICAgc2VsZi5fcG9zaXRpb25Ub1Jvd0NvbChfdmVjMl90ZW1wLngsIF92ZWMyX3RlbXAueSwgX3RlbXBSb3dDb2wpO1xuICAgICAgICBzZWxmLl9saW1pdEluTGF5ZXIoX3RlbXBSb3dDb2wpO1xuICAgICAgICAvLyB1c2VycyBwb3Mgbm90IGNoYW5nZVxuICAgICAgICBpZiAoX3RlbXBSb3dDb2wucm93ID09PSBkYXRhQ29tcC5fcm93ICYmIF90ZW1wUm93Q29sLmNvbCA9PT0gZGF0YUNvbXAuX2NvbCkgcmV0dXJuO1xuXG4gICAgICAgIHNlbGYuX3JlbW92ZVVzZXJOb2RlRnJvbUdyaWQoZGF0YUNvbXApO1xuICAgICAgICBzZWxmLl9hZGRVc2VyTm9kZVRvR3JpZChkYXRhQ29tcCwgX3RlbXBSb3dDb2wpO1xuICAgIH0sXG5cbiAgICBfcmVtb3ZlVXNlck5vZGVGcm9tR3JpZCAoZGF0YUNvbXApIHtcbiAgICAgICAgbGV0IHJvdyA9IGRhdGFDb21wLl9yb3c7XG4gICAgICAgIGxldCBjb2wgPSBkYXRhQ29tcC5fY29sO1xuICAgICAgICBsZXQgaW5kZXggPSBkYXRhQ29tcC5faW5kZXg7XG5cbiAgICAgICAgbGV0IHJvd0RhdGEgPSB0aGlzLl91c2VyTm9kZUdyaWRbcm93XTtcbiAgICAgICAgbGV0IGNvbERhdGEgPSByb3dEYXRhICYmIHJvd0RhdGFbY29sXTtcbiAgICAgICAgaWYgKGNvbERhdGEpIHtcbiAgICAgICAgICAgIHJvd0RhdGEuY291bnQgLS07XG4gICAgICAgICAgICBjb2xEYXRhLmNvdW50IC0tO1xuICAgICAgICAgICAgY29sRGF0YS5saXN0W2luZGV4XSA9IG51bGw7XG4gICAgICAgICAgICBpZiAoY29sRGF0YS5jb3VudCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgY29sRGF0YS5saXN0Lmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgY29sRGF0YS5jb3VudCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBkYXRhQ29tcC5fcm93ID0gLTE7XG4gICAgICAgIGRhdGFDb21wLl9jb2wgPSAtMTtcbiAgICAgICAgZGF0YUNvbXAuX2luZGV4ID0gLTE7XG4gICAgICAgIHRoaXMuX3VzZXJOb2RlRGlydHkgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBfbGltaXRJbkxheWVyIChyb3dDb2wpIHtcbiAgICAgICAgbGV0IHJvdyA9IHJvd0NvbC5yb3c7XG4gICAgICAgIGxldCBjb2wgPSByb3dDb2wuY29sO1xuICAgICAgICBpZiAocm93IDwgMCkgcm93Q29sLnJvdyA9IDA7XG4gICAgICAgIGlmIChyb3cgPiB0aGlzLl9yaWdodFRvcC5yb3cpIHJvd0NvbC5yb3cgPSB0aGlzLl9yaWdodFRvcC5yb3c7XG4gICAgICAgIGlmIChjb2wgPCAwKSByb3dDb2wuY29sID0gMDtcbiAgICAgICAgaWYgKGNvbCA+IHRoaXMuX3JpZ2h0VG9wLmNvbCkgcm93Q29sLmNvbCA9IHRoaXMuX3JpZ2h0VG9wLmNvbDtcbiAgICB9LFxuXG4gICAgX2FkZFVzZXJOb2RlVG9HcmlkIChkYXRhQ29tcCwgdGVtcFJvd0NvbCkge1xuICAgICAgICBsZXQgcm93ID0gdGVtcFJvd0NvbC5yb3c7XG4gICAgICAgIGxldCBjb2wgPSB0ZW1wUm93Q29sLmNvbDtcbiAgICAgICAgbGV0IHJvd0RhdGEgPSB0aGlzLl91c2VyTm9kZUdyaWRbcm93XSA9IHRoaXMuX3VzZXJOb2RlR3JpZFtyb3ddIHx8IHtjb3VudCA6IDB9O1xuICAgICAgICBsZXQgY29sRGF0YSA9IHJvd0RhdGFbY29sXSA9IHJvd0RhdGFbY29sXSB8fCB7Y291bnQgOiAwLCBsaXN0OiBbXX07XG4gICAgICAgIGRhdGFDb21wLl9yb3cgPSByb3c7XG4gICAgICAgIGRhdGFDb21wLl9jb2wgPSBjb2w7XG4gICAgICAgIGRhdGFDb21wLl9pbmRleCA9IGNvbERhdGEubGlzdC5sZW5ndGg7XG4gICAgICAgIHJvd0RhdGEuY291bnQrKztcbiAgICAgICAgY29sRGF0YS5jb3VudCsrO1xuICAgICAgICBjb2xEYXRhLmxpc3QucHVzaChkYXRhQ29tcCk7XG4gICAgICAgIHRoaXMuX3VzZXJOb2RlRGlydHkgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBfaXNVc2VyTm9kZURpcnR5ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJOb2RlRGlydHk7XG4gICAgfSxcblxuICAgIF9zZXRVc2VyTm9kZURpcnR5ICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl91c2VyTm9kZURpcnR5ID0gdmFsdWU7XG4gICAgfSxcblxuICAgIG9uRW5hYmxlICgpIHtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLkFOQ0hPUl9DSEFOR0VELCB0aGlzLl9zeW5jQW5jaG9yUG9pbnQsIHRoaXMpO1xuICAgICAgICB0aGlzLl9hY3RpdmF0ZU1hdGVyaWFsKCk7XG4gICAgfSxcblxuICAgIG9uRGlzYWJsZSAoKSB7XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQsIHRoaXMuX3N5bmNBbmNob3JQb2ludCwgdGhpcyk7XG4gICAgfSxcblxuICAgIF9zeW5jQW5jaG9yUG9pbnQgKCkge1xuICAgICAgICBsZXQgbm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgdGhpcy5fbGVmdERvd25Ub0NlbnRlclggPSBub2RlLndpZHRoICogbm9kZS5hbmNob3JYICogbm9kZS5zY2FsZVg7XG4gICAgICAgIHRoaXMuX2xlZnREb3duVG9DZW50ZXJZID0gbm9kZS5oZWlnaHQgKiBub2RlLmFuY2hvclkgKiBub2RlLnNjYWxlWTtcbiAgICAgICAgdGhpcy5fY3VsbGluZ0RpcnR5ID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgb25EZXN0cm95ICgpIHtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICAgICAgaWYgKHRoaXMuX2J1ZmZlcikge1xuICAgICAgICAgICAgdGhpcy5fYnVmZmVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVuZGVyRGF0YUxpc3QgPSBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldHMgdGhlIGxheWVyIG5hbWUuXG4gICAgICogISN6aCDojrflj5blsYLnmoTlkI3np7DjgIJcbiAgICAgKiBAbWV0aG9kIGdldExheWVyTmFtZVxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBsYXllck5hbWUgPSB0aWxlZExheWVyLmdldExheWVyTmFtZSgpO1xuICAgICAqIGNjLmxvZyhsYXllck5hbWUpO1xuICAgICAqL1xuICAgIGdldExheWVyTmFtZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllck5hbWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHRoZSBsYXllciBuYW1lLlxuICAgICAqICEjemgg6K6+572u5bGC55qE5ZCN56ewXG4gICAgICogQG1ldGhvZCBTZXRMYXllck5hbWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbGF5ZXJOYW1lXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB0aWxlZExheWVyLnNldExheWVyTmFtZShcIk5ldyBMYXllclwiKTtcbiAgICAgKi9cbiAgICBzZXRMYXllck5hbWUgKGxheWVyTmFtZSkge1xuICAgICAgICB0aGlzLl9sYXllck5hbWUgPSBsYXllck5hbWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJuIHRoZSB2YWx1ZSBmb3IgdGhlIHNwZWNpZmljIHByb3BlcnR5IG5hbWUuXG4gICAgICogISN6aCDojrflj5bmjIflrprlsZ7mgKflkI3nmoTlgLzjgIJcbiAgICAgKiBAbWV0aG9kIGdldFByb3BlcnR5XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5TmFtZVxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBsZXQgcHJvcGVydHkgPSB0aWxlZExheWVyLmdldFByb3BlcnR5KFwiaW5mb1wiKTtcbiAgICAgKiBjYy5sb2cocHJvcGVydHkpO1xuICAgICAqL1xuICAgIGdldFByb3BlcnR5IChwcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXNbcHJvcGVydHlOYW1lXTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBwb3NpdGlvbiBpbiBwaXhlbHMgb2YgYSBnaXZlbiB0aWxlIGNvb3JkaW5hdGUuXG4gICAgICogISN6aCDojrflj5bmjIflrpogdGlsZSDnmoTlg4/ntKDlnZDmoIfjgIJcbiAgICAgKiBAbWV0aG9kIGdldFBvc2l0aW9uQXRcbiAgICAgKiBAcGFyYW0ge1ZlYzJ8TnVtYmVyfSBwb3MgcG9zaXRpb24gb3IgeFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeV1cbiAgICAgKiBAcmV0dXJuIHtWZWMyfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGV0IHBvcyA9IHRpbGVkTGF5ZXIuZ2V0UG9zaXRpb25BdChjYy52MigwLCAwKSk7XG4gICAgICogY2MubG9nKFwiUG9zOiBcIiArIHBvcyk7XG4gICAgICogbGV0IHBvcyA9IHRpbGVkTGF5ZXIuZ2V0UG9zaXRpb25BdCgwLCAwKTtcbiAgICAgKiBjYy5sb2coXCJQb3M6IFwiICsgcG9zKTtcbiAgICAgKi9cbiAgICBnZXRQb3NpdGlvbkF0IChwb3MsIHkpIHtcbiAgICAgICAgbGV0IHg7XG4gICAgICAgIGlmICh5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKHBvcyk7XG4gICAgICAgICAgICB5ID0gTWF0aC5mbG9vcih5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKHBvcy54KTtcbiAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKHBvcy55KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHJldDtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9sYXllck9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIGNjLlRpbGVkTWFwLk9yaWVudGF0aW9uLk9SVEhPOlxuICAgICAgICAgICAgICAgIHJldCA9IHRoaXMuX3Bvc2l0aW9uRm9yT3J0aG9BdCh4LCB5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY2MuVGlsZWRNYXAuT3JpZW50YXRpb24uSVNPOlxuICAgICAgICAgICAgICAgIHJldCA9IHRoaXMuX3Bvc2l0aW9uRm9ySXNvQXQoeCwgeSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNjLlRpbGVkTWFwLk9yaWVudGF0aW9uLkhFWDpcbiAgICAgICAgICAgICAgICByZXQgPSB0aGlzLl9wb3NpdGlvbkZvckhleEF0KHgsIHkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcblxuICAgIF9pc0ludmFsaWRQb3NpdGlvbiAoeCwgeSkge1xuICAgICAgICBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGxldCBwb3MgPSB4O1xuICAgICAgICAgICAgeSA9IHBvcy55O1xuICAgICAgICAgICAgeCA9IHBvcy54O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4ID49IHRoaXMuX2xheWVyU2l6ZS53aWR0aCB8fCB5ID49IHRoaXMuX2xheWVyU2l6ZS5oZWlnaHQgfHwgeCA8IDAgfHwgeSA8IDA7XG4gICAgfSxcblxuICAgIF9wb3NpdGlvbkZvcklzb0F0ICh4LCB5KSB7XG4gICAgICAgIGxldCBvZmZzZXRYID0gMCwgb2Zmc2V0WSA9IDA7XG4gICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoeCkgKyBNYXRoLmZsb29yKHkpICogdGhpcy5fbGF5ZXJTaXplLndpZHRoO1xuICAgICAgICBsZXQgZ2lkQW5kRmxhZ3MgPSB0aGlzLl90aWxlc1tpbmRleF07XG4gICAgICAgIGlmIChnaWRBbmRGbGFncykge1xuICAgICAgICAgICAgbGV0IGdpZCA9ICgoZ2lkQW5kRmxhZ3MgJiBjYy5UaWxlZE1hcC5UaWxlRmxhZy5GTElQUEVEX01BU0spID4+PiAwKTtcbiAgICAgICAgICAgIGxldCB0aWxlc2V0ID0gdGhpcy5fdGV4R3JpZHNbZ2lkXS50aWxlc2V0O1xuICAgICAgICAgICAgbGV0IG9mZnNldCA9IHRpbGVzZXQudGlsZU9mZnNldDtcbiAgICAgICAgICAgIG9mZnNldFggPSBvZmZzZXQueDtcbiAgICAgICAgICAgIG9mZnNldFkgPSBvZmZzZXQueTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjYy52MihcbiAgICAgICAgICAgIHRoaXMuX21hcFRpbGVTaXplLndpZHRoICogMC41ICogKHRoaXMuX2xheWVyU2l6ZS5oZWlnaHQgKyB4IC0geSAtIDEpICsgb2Zmc2V0WCxcbiAgICAgICAgICAgIHRoaXMuX21hcFRpbGVTaXplLmhlaWdodCAqIDAuNSAqICh0aGlzLl9sYXllclNpemUud2lkdGggLSB4ICsgdGhpcy5fbGF5ZXJTaXplLmhlaWdodCAtIHkgLSAyKSAtIG9mZnNldFlcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgX3Bvc2l0aW9uRm9yT3J0aG9BdCAoeCwgeSkge1xuICAgICAgICBsZXQgb2Zmc2V0WCA9IDAsIG9mZnNldFkgPSAwO1xuICAgICAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKHgpICsgTWF0aC5mbG9vcih5KSAqIHRoaXMuX2xheWVyU2l6ZS53aWR0aDtcbiAgICAgICAgbGV0IGdpZEFuZEZsYWdzID0gdGhpcy5fdGlsZXNbaW5kZXhdO1xuICAgICAgICBpZiAoZ2lkQW5kRmxhZ3MpIHtcbiAgICAgICAgICAgIGxldCBnaWQgPSAoKGdpZEFuZEZsYWdzICYgY2MuVGlsZWRNYXAuVGlsZUZsYWcuRkxJUFBFRF9NQVNLKSA+Pj4gMCk7XG4gICAgICAgICAgICBsZXQgdGlsZXNldCA9IHRoaXMuX3RleEdyaWRzW2dpZF0udGlsZXNldDtcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSB0aWxlc2V0LnRpbGVPZmZzZXQ7XG4gICAgICAgICAgICBvZmZzZXRYID0gb2Zmc2V0Lng7XG4gICAgICAgICAgICBvZmZzZXRZID0gb2Zmc2V0Lnk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2MudjIoXG4gICAgICAgICAgICB4ICogdGhpcy5fbWFwVGlsZVNpemUud2lkdGggKyBvZmZzZXRYLFxuICAgICAgICAgICAgKHRoaXMuX2xheWVyU2l6ZS5oZWlnaHQgLSB5IC0gMSkgKiB0aGlzLl9tYXBUaWxlU2l6ZS5oZWlnaHQgLSBvZmZzZXRZXG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIF9wb3NpdGlvbkZvckhleEF0IChjb2wsIHJvdykge1xuICAgICAgICBsZXQgdGlsZVdpZHRoID0gdGhpcy5fbWFwVGlsZVNpemUud2lkdGg7XG4gICAgICAgIGxldCB0aWxlSGVpZ2h0ID0gdGhpcy5fbWFwVGlsZVNpemUuaGVpZ2h0O1xuICAgICAgICBsZXQgcm93cyA9IHRoaXMuX2xheWVyU2l6ZS5oZWlnaHQ7XG5cbiAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcihjb2wpICsgTWF0aC5mbG9vcihyb3cpICogdGhpcy5fbGF5ZXJTaXplLndpZHRoO1xuICAgICAgICBsZXQgZ2lkID0gdGhpcy5fdGlsZXNbaW5kZXhdO1xuICAgICAgICBsZXQgdGlsZXNldCA9IHRoaXMuX3RleEdyaWRzW2dpZF0udGlsZXNldDtcbiAgICAgICAgbGV0IG9mZnNldCA9IHRpbGVzZXQudGlsZU9mZnNldDtcblxuICAgICAgICBsZXQgb2RkX2V2ZW4gPSAodGhpcy5fc3RhZ2dlckluZGV4ID09PSBjYy5UaWxlZE1hcC5TdGFnZ2VySW5kZXguU1RBR0dFUklOREVYX09ERCkgPyAxIDogLTE7XG4gICAgICAgIGxldCB4ID0gMCwgeSA9IDA7XG4gICAgICAgIGxldCBkaWZmWCA9IDA7XG4gICAgICAgIGxldCBkaWZmWSA9IDA7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fc3RhZ2dlckF4aXMpIHtcbiAgICAgICAgICAgIGNhc2UgY2MuVGlsZWRNYXAuU3RhZ2dlckF4aXMuU1RBR0dFUkFYSVNfWTpcbiAgICAgICAgICAgICAgICBkaWZmWCA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHJvdyAlIDIgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlmZlggPSB0aWxlV2lkdGggLyAyICogb2RkX2V2ZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHggPSBjb2wgKiB0aWxlV2lkdGggKyBkaWZmWCArIG9mZnNldC54O1xuICAgICAgICAgICAgICAgIHkgPSAocm93cyAtIHJvdyAtIDEpICogKHRpbGVIZWlnaHQgLSAodGlsZUhlaWdodCAtIHRoaXMuX2hleFNpZGVMZW5ndGgpIC8gMikgLSBvZmZzZXQueTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY2MuVGlsZWRNYXAuU3RhZ2dlckF4aXMuU1RBR0dFUkFYSVNfWDpcbiAgICAgICAgICAgICAgICBkaWZmWSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKGNvbCAlIDIgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlmZlkgPSB0aWxlSGVpZ2h0IC8gMiAqIC1vZGRfZXZlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgeCA9IGNvbCAqICh0aWxlV2lkdGggLSAodGlsZVdpZHRoIC0gdGhpcy5faGV4U2lkZUxlbmd0aCkgLyAyKSArIG9mZnNldC54O1xuICAgICAgICAgICAgICAgIHkgPSAocm93cyAtIHJvdyAtIDEpICogdGlsZUhlaWdodCArIGRpZmZZIC0gb2Zmc2V0Lnk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNjLnYyKHgsIHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU2V0cyB0aGUgdGlsZXMgZ2lkIChnaWQgPSB0aWxlIGdsb2JhbCBpZCkgYXQgYSBnaXZlbiB0aWxlcyByZWN0LlxuICAgICAqICEjemhcbiAgICAgKiDorr7nva7nu5nlrprljLrln5/nmoQgdGlsZSDnmoQgZ2lkIChnaWQgPSB0aWxlIOWFqOWxgCBpZCnvvIxcbiAgICAgKiBAbWV0aG9kIHNldFRpbGVzR0lEQXRcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBnaWRzIGFuIGFycmF5IGNvbnRhaW5zIGdpZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBiZWdpbkNvbCBiZWdpbiBjb2wgbnVtYmVyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGJlZ2luUm93IGJlZ2luIHJvdyBudW1iZXJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdG90YWxDb2xzIGNvdW50IG9mIGNvbHVtblxuICAgICAqIEBleGFtcGxlXG4gICAgICogdGlsZWRMYXllci5zZXRUaWxlc0dJREF0KFsxLCAxLCAxLCAxXSwgMTAsIDEwLCAyKVxuICAgICAqL1xuICAgIHNldFRpbGVzR0lEQXQgKGdpZHMsIGJlZ2luQ29sLCBiZWdpblJvdywgdG90YWxDb2xzKSB7XG4gICAgICAgIGlmICghZ2lkcyB8fCBnaWRzLmxlbmd0aCA9PT0gMCB8fCB0b3RhbENvbHMgPD0gMCkgcmV0dXJuO1xuICAgICAgICBpZiAoYmVnaW5Sb3cgPCAwKSBiZWdpblJvdyA9IDA7XG4gICAgICAgIGlmIChiZWdpbkNvbCA8IDApIGJlZ2luQ29sID0gMDtcbiAgICAgICAgbGV0IGdpZHNJZHggPSAwO1xuICAgICAgICBsZXQgZW5kQ29sID0gYmVnaW5Db2wgKyB0b3RhbENvbHM7XG4gICAgICAgIGZvciAobGV0IHJvdyA9IGJlZ2luUm93OyA7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSBiZWdpbkNvbDsgY29sIDwgZW5kQ29sOyBjb2wrKykge1xuICAgICAgICAgICAgICAgIGlmIChnaWRzSWR4ID49IGdpZHMubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlVGlsZUZvckdJRChnaWRzW2dpZHNJZHhdLCBjb2wsIHJvdyk7XG4gICAgICAgICAgICAgICAgZ2lkc0lkeCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXRzIHRoZSB0aWxlIGdpZCAoZ2lkID0gdGlsZSBnbG9iYWwgaWQpIGF0IGEgZ2l2ZW4gdGlsZSBjb29yZGluYXRlLjxiciAvPlxuICAgICAqIFRoZSBUaWxlIEdJRCBjYW4gYmUgb2J0YWluZWQgYnkgdXNpbmcgdGhlIG1ldGhvZCBcInRpbGVHSURBdFwiIG9yIGJ5IHVzaW5nIHRoZSBUTVggZWRpdG9yIC4gVGlsZXNldCBNZ3IgKzEuPGJyIC8+XG4gICAgICogSWYgYSB0aWxlIGlzIGFscmVhZHkgcGxhY2VkIGF0IHRoYXQgcG9zaXRpb24sIHRoZW4gaXQgd2lsbCBiZSByZW1vdmVkLlxuICAgICAqICEjemhcbiAgICAgKiDorr7nva7nu5nlrprlnZDmoIfnmoQgdGlsZSDnmoQgZ2lkIChnaWQgPSB0aWxlIOWFqOWxgCBpZCnvvIxcbiAgICAgKiB0aWxlIOeahCBHSUQg5Y+v5Lul5L2/55So5pa55rOVIOKAnHRpbGVHSURBdOKAnSDmnaXojrflvpfjgII8YnIgLz5cbiAgICAgKiDlpoLmnpzkuIDkuKogdGlsZSDlt7Lnu4/mlL7lnKjpgqPkuKrkvY3nva7vvIzpgqPkuYjlroPlsIbooqvliKDpmaTjgIJcbiAgICAgKiBAbWV0aG9kIHNldFRpbGVHSURBdFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBnaWRcbiAgICAgKiBAcGFyYW0ge1ZlYzJ8TnVtYmVyfSBwb3NPclggcG9zaXRpb24gb3IgeFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBmbGFnc09yWSBmbGFncyBvciB5XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtmbGFnc11cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHRpbGVkTGF5ZXIuc2V0VGlsZUdJREF0KDEwMDEsIDEwLCAxMCwgMSlcbiAgICAgKi9cbiAgICBzZXRUaWxlR0lEQXQgKGdpZCwgcG9zT3JYLCBmbGFnc09yWSwgZmxhZ3MpIHtcbiAgICAgICAgaWYgKHBvc09yWCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYy5UaWxlZExheWVyLnNldFRpbGVHSURBdCgpOiBwb3Mgc2hvdWxkIGJlIG5vbi1udWxsXCIpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwb3M7XG4gICAgICAgIGlmIChmbGFncyAhPT0gdW5kZWZpbmVkIHx8ICEocG9zT3JYIGluc3RhbmNlb2YgY2MuVmVjMikpIHtcbiAgICAgICAgICAgIC8vIGZvdXIgcGFyYW1ldGVycyBvciBwb3NPclggaXMgbm90IGEgVmVjMiBvYmplY3RcbiAgICAgICAgICAgIF92ZWMyX3RlbXAzLnggPSBwb3NPclg7XG4gICAgICAgICAgICBfdmVjMl90ZW1wMy55ID0gZmxhZ3NPclk7XG4gICAgICAgICAgICBwb3MgPSBfdmVjMl90ZW1wMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvcyA9IHBvc09yWDtcbiAgICAgICAgICAgIGZsYWdzID0gZmxhZ3NPclk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCB1Z2lkID0gZ2lkICYgY2MuVGlsZWRNYXAuVGlsZUZsYWcuRkxJUFBFRF9NQVNLO1xuXG4gICAgICAgIHBvcy54ID0gTWF0aC5mbG9vcihwb3MueCk7XG4gICAgICAgIHBvcy55ID0gTWF0aC5mbG9vcihwb3MueSk7XG4gICAgICAgIGlmICh0aGlzLl9pc0ludmFsaWRQb3NpdGlvbihwb3MpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYy5UaWxlZExheWVyLnNldFRpbGVHSURBdCgpOiBpbnZhbGlkIHBvc2l0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fdGlsZXMgfHwgIXRoaXMuX3RpbGVzZXRzIHx8IHRoaXMuX3RpbGVzZXRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBjYy5sb2dJRCg3MjM4KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodWdpZCAhPT0gMCAmJiB1Z2lkIDwgdGhpcy5fdGlsZXNldHNbMF0uZmlyc3RHaWQpIHtcbiAgICAgICAgICAgIGNjLmxvZ0lEKDcyMzksIGdpZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmbGFncyA9IGZsYWdzIHx8IDA7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVRpbGVGb3JHSUQoIChnaWQgfCBmbGFncykgPj4+IDAsIHBvcy54LCBwb3MueSk7XG4gICAgfSxcblxuICAgIF91cGRhdGVUaWxlRm9yR0lEIChnaWRBbmRGbGFncywgeCwgeSkge1xuICAgICAgICBsZXQgaWR4ID0gMCB8ICh4ICsgeSAqIHRoaXMuX2xheWVyU2l6ZS53aWR0aCk7XG4gICAgICAgIGlmIChpZHggPj0gdGhpcy5fdGlsZXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgbGV0IG9sZEdJREFuZEZsYWdzID0gdGhpcy5fdGlsZXNbaWR4XTtcbiAgICAgICAgaWYgKGdpZEFuZEZsYWdzID09PSBvbGRHSURBbmRGbGFncykgcmV0dXJuO1xuXG4gICAgICAgIGxldCBnaWQgPSAoKGdpZEFuZEZsYWdzICYgY2MuVGlsZWRNYXAuVGlsZUZsYWcuRkxJUFBFRF9NQVNLKSA+Pj4gMCk7XG4gICAgICAgIGxldCBncmlkID0gdGhpcy5fdGV4R3JpZHNbZ2lkXTtcbiAgICAgICAgbGV0IHRpbGVzZXRJZHggPSBncmlkICYmIGdyaWQudGV4SWQ7XG4gICAgICAgIFxuICAgICAgICBpZiAoZ3JpZCkge1xuICAgICAgICAgICAgdGhpcy5fdGlsZXNbaWR4XSA9IGdpZEFuZEZsYWdzO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmVydGV4KHgsIHkpO1xuICAgICAgICAgICAgdGhpcy5fYnVpbGRNYXRlcmlhbCh0aWxlc2V0SWR4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RpbGVzW2lkeF0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1bGxpbmdEaXJ0eSA9IHRydWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoZSB0aWxlcyBkYXRhLkFuIGFycmF5IGZpbGwgd2l0aCBHSURzLiA8YnIgLz5cbiAgICAgKiAhI3poXG4gICAgICog6L+U5ZueIHRpbGVzIOaVsOaNri4g55SxR0lE5p6E5oiQ55qE5LiA5Liq5pWw57uELiA8YnIgLz5cbiAgICAgKiBAbWV0aG9kIGdldFRpbGVzXG4gICAgICogQHJldHVybiB7TnVtYmVyW119XG4gICAgICovXG4gICAgZ2V0VGlsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aWxlcztcbiAgICB9LFxuICAgIFxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoZSB0aWxlIGdpZCBhdCBhIGdpdmVuIHRpbGUgY29vcmRpbmF0ZS4gPGJyIC8+XG4gICAgICogaWYgaXQgcmV0dXJucyAwLCBpdCBtZWFucyB0aGF0IHRoZSB0aWxlIGlzIGVtcHR5LiA8YnIgLz5cbiAgICAgKiAhI3poXG4gICAgICog6YCa6L+H57uZ5a6a55qEIHRpbGUg5Z2Q5qCH44CBZmxhZ3PvvIjlj6/pgInvvInov5Tlm54gdGlsZSDnmoQgR0lELiA8YnIgLz5cbiAgICAgKiDlpoLmnpzlroPov5Tlm54gMO+8jOWImeihqOekuuivpSB0aWxlIOS4uuepuuOAgjxiciAvPlxuICAgICAqIEBtZXRob2QgZ2V0VGlsZUdJREF0XG4gICAgICogQHBhcmFtIHtWZWMyfE51bWJlcn0gcG9zIG9yIHhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3ldXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGV0IHRpbGVHaWQgPSB0aWxlZExheWVyLmdldFRpbGVHSURBdCgwLCAwKTtcbiAgICAgKi9cbiAgICBnZXRUaWxlR0lEQXQgKHBvcywgeSkge1xuICAgICAgICBpZiAocG9zID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNjLlRpbGVkTGF5ZXIuZ2V0VGlsZUdJREF0KCk6IHBvcyBzaG91bGQgYmUgbm9uLW51bGxcIik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHggPSBwb3M7XG4gICAgICAgIGlmICh5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHggPSBwb3MueDtcbiAgICAgICAgICAgIHkgPSBwb3MueTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faXNJbnZhbGlkUG9zaXRpb24oeCwgeSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNjLlRpbGVkTGF5ZXIuZ2V0VGlsZUdJREF0KCk6IGludmFsaWQgcG9zaXRpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl90aWxlcykge1xuICAgICAgICAgICAgY2MubG9nSUQoNzIzNyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoeCkgKyBNYXRoLmZsb29yKHkpICogdGhpcy5fbGF5ZXJTaXplLndpZHRoO1xuICAgICAgICAvLyBCaXRzIG9uIHRoZSBmYXIgZW5kIG9mIHRoZSAzMi1iaXQgZ2xvYmFsIHRpbGUgSUQgYXJlIHVzZWQgZm9yIHRpbGUgZmxhZ3NcbiAgICAgICAgbGV0IHRpbGUgPSB0aGlzLl90aWxlc1tpbmRleF07XG5cbiAgICAgICAgcmV0dXJuICh0aWxlICYgY2MuVGlsZWRNYXAuVGlsZUZsYWcuRkxJUFBFRF9NQVNLKSA+Pj4gMDtcbiAgICB9LFxuXG4gICAgZ2V0VGlsZUZsYWdzQXQgKHBvcywgeSkge1xuICAgICAgICBpZiAoIXBvcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGlsZWRMYXllci5nZXRUaWxlRmxhZ3NBdDogcG9zIHNob3VsZCBiZSBub24tbnVsbFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwb3MgPSBjYy52Mihwb3MsIHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pc0ludmFsaWRQb3NpdGlvbihwb3MpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaWxlZExheWVyLmdldFRpbGVGbGFnc0F0OiBpbnZhbGlkIHBvc2l0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fdGlsZXMpIHtcbiAgICAgICAgICAgIGNjLmxvZ0lEKDcyNDApO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaWR4ID0gTWF0aC5mbG9vcihwb3MueCkgKyBNYXRoLmZsb29yKHBvcy55KSAqIHRoaXMuX2xheWVyU2l6ZS53aWR0aDtcbiAgICAgICAgLy8gQml0cyBvbiB0aGUgZmFyIGVuZCBvZiB0aGUgMzItYml0IGdsb2JhbCB0aWxlIElEIGFyZSB1c2VkIGZvciB0aWxlIGZsYWdzXG4gICAgICAgIGxldCB0aWxlID0gdGhpcy5fdGlsZXNbaWR4XTtcblxuICAgICAgICByZXR1cm4gKHRpbGUgJiBjYy5UaWxlZE1hcC5UaWxlRmxhZy5GTElQUEVEX0FMTCkgPj4+IDA7XG4gICAgfSxcblxuICAgIF9zZXRDdWxsaW5nRGlydHkgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2N1bGxpbmdEaXJ0eSA9IHZhbHVlO1xuICAgIH0sXG5cbiAgICBfaXNDdWxsaW5nRGlydHkgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VsbGluZ0RpcnR5O1xuICAgIH0sXG5cbiAgICAvLyAneCwgeScgaXMgdGhlIHBvc2l0aW9uIG9mIHZpZXdQb3J0LCB3aGljaCdzIGFuY2hvciBwb2ludCBpcyBhdCB0aGUgY2VudGVyIG9mIHJlY3QuXG4gICAgLy8gJ3dpZHRoLCBoZWlnaHQnIGlzIHRoZSBzaXplIG9mIHZpZXdQb3J0LlxuICAgIF91cGRhdGVWaWV3UG9ydCAoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAodGhpcy5fdmlld1BvcnQud2lkdGggPT09IHdpZHRoICYmIFxuICAgICAgICAgICAgdGhpcy5fdmlld1BvcnQuaGVpZ2h0ID09PSBoZWlnaHQgJiZcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdQb3J0LnggPT09IHggJiZcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdQb3J0LnkgPT09IHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92aWV3UG9ydC54ID0geDtcbiAgICAgICAgdGhpcy5fdmlld1BvcnQueSA9IHk7XG4gICAgICAgIHRoaXMuX3ZpZXdQb3J0LndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX3ZpZXdQb3J0LmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgICAvLyBpZiBtYXAncyB0eXBlIGlzIGlzbywgcmVzZXJ2ZSBib3R0b20gbGluZSBpcyAyIHRvIGF2b2lkIHNob3cgZW1wdHkgZ3JpZCBiZWNhdXNlIG9mIGlzbyBncmlkIGFyaXRobWV0aWNcbiAgICAgICAgbGV0IHJlc2VydmVMaW5lID0gMTtcbiAgICAgICAgaWYgKHRoaXMuX2xheWVyT3JpZW50YXRpb24gPT09IGNjLlRpbGVkTWFwLk9yaWVudGF0aW9uLklTTykge1xuICAgICAgICAgICAgcmVzZXJ2ZUxpbmUgPSAyO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZweCA9IHRoaXMuX3ZpZXdQb3J0LnggLSB0aGlzLl9vZmZzZXQueCArIHRoaXMuX2xlZnREb3duVG9DZW50ZXJYO1xuICAgICAgICBsZXQgdnB5ID0gdGhpcy5fdmlld1BvcnQueSAtIHRoaXMuX29mZnNldC55ICsgdGhpcy5fbGVmdERvd25Ub0NlbnRlclk7XG5cbiAgICAgICAgbGV0IGxlZnREb3duWCA9IHZweCAtIHRoaXMuX2xlZnRPZmZzZXQ7XG4gICAgICAgIGxldCBsZWZ0RG93blkgPSB2cHkgLSB0aGlzLl9kb3duT2Zmc2V0O1xuICAgICAgICBsZXQgcmlnaHRUb3BYID0gdnB4ICsgd2lkdGggKyB0aGlzLl9yaWdodE9mZnNldDtcbiAgICAgICAgbGV0IHJpZ2h0VG9wWSA9IHZweSArIGhlaWdodCArIHRoaXMuX3RvcE9mZnNldDtcblxuICAgICAgICBsZXQgbGVmdERvd24gPSB0aGlzLl9jdWxsaW5nUmVjdC5sZWZ0RG93bjtcbiAgICAgICAgbGV0IHJpZ2h0VG9wID0gdGhpcy5fY3VsbGluZ1JlY3QucmlnaHRUb3A7XG5cbiAgICAgICAgaWYgKGxlZnREb3duWCA8IDApIGxlZnREb3duWCA9IDA7XG4gICAgICAgIGlmIChsZWZ0RG93blkgPCAwKSBsZWZ0RG93blkgPSAwO1xuXG4gICAgICAgIC8vIGNhbGMgbGVmdCBkb3duXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uVG9Sb3dDb2wobGVmdERvd25YLCBsZWZ0RG93blksIF90ZW1wUm93Q29sKTtcbiAgICAgICAgLy8gbWFrZSByYW5nZSBsYXJnZVxuICAgICAgICBfdGVtcFJvd0NvbC5yb3ctPXJlc2VydmVMaW5lO1xuICAgICAgICBfdGVtcFJvd0NvbC5jb2wtPXJlc2VydmVMaW5lO1xuICAgICAgICAvLyBpbnN1cmUgbGVmdCBkb3duIHJvdyBjb2wgZ3JlYXRlciB0aGFuIDBcbiAgICAgICAgX3RlbXBSb3dDb2wucm93ID0gX3RlbXBSb3dDb2wucm93ID4gMCA/IF90ZW1wUm93Q29sLnJvdyA6IDA7XG4gICAgICAgIF90ZW1wUm93Q29sLmNvbCA9IF90ZW1wUm93Q29sLmNvbCA+IDAgPyBfdGVtcFJvd0NvbC5jb2wgOiAwOyAgICAgICAgXG5cbiAgICAgICAgaWYgKF90ZW1wUm93Q29sLnJvdyAhPT0gbGVmdERvd24ucm93IHx8IF90ZW1wUm93Q29sLmNvbCAhPT0gbGVmdERvd24uY29sKSB7XG4gICAgICAgICAgICBsZWZ0RG93bi5yb3cgPSBfdGVtcFJvd0NvbC5yb3c7XG4gICAgICAgICAgICBsZWZ0RG93bi5jb2wgPSBfdGVtcFJvd0NvbC5jb2w7XG4gICAgICAgICAgICB0aGlzLl9jdWxsaW5nRGlydHkgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2hvdyBub3RoaW5nXG4gICAgICAgIGlmIChyaWdodFRvcFggPCAwIHx8IHJpZ2h0VG9wWSA8IDApIHtcbiAgICAgICAgICAgIF90ZW1wUm93Q29sLnJvdyA9IC0xO1xuICAgICAgICAgICAgX3RlbXBSb3dDb2wuY29sID0gLTE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjYWxjIHJpZ2h0IHRvcFxuICAgICAgICAgICAgdGhpcy5fcG9zaXRpb25Ub1Jvd0NvbChyaWdodFRvcFgsIHJpZ2h0VG9wWSwgX3RlbXBSb3dDb2wpO1xuICAgICAgICAgICAgLy8gbWFrZSByYW5nZSBsYXJnZVxuICAgICAgICAgICAgX3RlbXBSb3dDb2wucm93Kys7XG4gICAgICAgICAgICBfdGVtcFJvd0NvbC5jb2wrKztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGF2b2lkIHJhbmdlIG91dCBvZiBtYXggcmVjdFxuICAgICAgICBpZiAoX3RlbXBSb3dDb2wucm93ID4gdGhpcy5fcmlnaHRUb3Aucm93KSBfdGVtcFJvd0NvbC5yb3cgPSB0aGlzLl9yaWdodFRvcC5yb3c7XG4gICAgICAgIGlmIChfdGVtcFJvd0NvbC5jb2wgPiB0aGlzLl9yaWdodFRvcC5jb2wpIF90ZW1wUm93Q29sLmNvbCA9IHRoaXMuX3JpZ2h0VG9wLmNvbDtcblxuICAgICAgICBpZiAoX3RlbXBSb3dDb2wucm93ICE9PSByaWdodFRvcC5yb3cgfHwgX3RlbXBSb3dDb2wuY29sICE9PSByaWdodFRvcC5jb2wpIHtcbiAgICAgICAgICAgIHJpZ2h0VG9wLnJvdyA9IF90ZW1wUm93Q29sLnJvdztcbiAgICAgICAgICAgIHJpZ2h0VG9wLmNvbCA9IF90ZW1wUm93Q29sLmNvbDtcbiAgICAgICAgICAgIHRoaXMuX2N1bGxpbmdEaXJ0eSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdGhlIHJlc3VsdCBtYXkgbm90IHByZWNpc2UsIGJ1dCBpdCBkb3NlJ3QgbWF0dGVyLCBpdCBqdXN0IHVzZXMgdG8gYmUgZ290IHJhbmdlXG4gICAgX3Bvc2l0aW9uVG9Sb3dDb2wgKHgsIHksIHJlc3VsdCkge1xuICAgICAgICBjb25zdCBUaWxlZE1hcCA9IGNjLlRpbGVkTWFwO1xuICAgICAgICBjb25zdCBPcmllbnRhdGlvbiA9IFRpbGVkTWFwLk9yaWVudGF0aW9uO1xuICAgICAgICBjb25zdCBTdGFnZ2VyQXhpcyA9IFRpbGVkTWFwLlN0YWdnZXJBeGlzO1xuXG4gICAgICAgIGxldCBtYXB0dyA9IHRoaXMuX21hcFRpbGVTaXplLndpZHRoLFxuICAgICAgICAgICAgbWFwdGggPSB0aGlzLl9tYXBUaWxlU2l6ZS5oZWlnaHQsXG4gICAgICAgICAgICBtYXB0dzIgPSBtYXB0dyAqIDAuNSxcbiAgICAgICAgICAgIG1hcHRoMiA9IG1hcHRoICogMC41O1xuICAgICAgICBsZXQgcm93ID0gMCwgY29sID0gMCwgZGlmZlgyID0gMCwgZGlmZlkyID0gMCwgYXhpcyA9IHRoaXMuX3N0YWdnZXJBeGlzO1xuICAgICAgICBsZXQgY29scyA9IHRoaXMuX2xheWVyU2l6ZS53aWR0aDtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuX2xheWVyT3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgIC8vIGxlZnQgdG9wIHRvIHJpZ2h0IGRvd21cbiAgICAgICAgICAgIGNhc2UgT3JpZW50YXRpb24uT1JUSE86XG4gICAgICAgICAgICAgICAgY29sID0gTWF0aC5mbG9vcih4IC8gbWFwdHcpO1xuICAgICAgICAgICAgICAgIHJvdyA9IE1hdGguZmxvb3IoeSAvIG1hcHRoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIHJpZ2h0IHRvcCB0byBsZWZ0IGRvd25cbiAgICAgICAgICAgIC8vIGlzbyBjYW4gYmUgdHJlYXQgYXMgc3BlY2lhbCBoZXggd2hvc2UgaGV4IHNpZGUgbGVuZ3RoIGlzIDBcbiAgICAgICAgICAgIGNhc2UgT3JpZW50YXRpb24uSVNPOlxuICAgICAgICAgICAgICAgIGNvbCA9IE1hdGguZmxvb3IoeCAvIG1hcHR3Mik7XG4gICAgICAgICAgICAgICAgcm93ID0gTWF0aC5mbG9vcih5IC8gbWFwdGgyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIGxlZnQgdG9wIHRvIHJpZ2h0IGRvd21cbiAgICAgICAgICAgIGNhc2UgT3JpZW50YXRpb24uSEVYOlxuICAgICAgICAgICAgICAgIGlmIChheGlzID09PSBTdGFnZ2VyQXhpcy5TVEFHR0VSQVhJU19ZKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IE1hdGguZmxvb3IoeSAvIChtYXB0aCAtIHRoaXMuX2RpZmZZMSkpO1xuICAgICAgICAgICAgICAgICAgICBkaWZmWDIgPSByb3cgJSAyID09PSAxID8gbWFwdHcyICogdGhpcy5fb2RkX2V2ZW4gOiAwO1xuICAgICAgICAgICAgICAgICAgICBjb2wgPSBNYXRoLmZsb29yKCh4IC0gZGlmZlgyKSAvIG1hcHR3KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb2wgPSBNYXRoLmZsb29yKHggLyAobWFwdHcgLSB0aGlzLl9kaWZmWDEpKTtcbiAgICAgICAgICAgICAgICAgICAgZGlmZlkyID0gY29sICUgMiA9PT0gMSA/IG1hcHRoMiAqIC10aGlzLl9vZGRfZXZlbiA6IDA7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IE1hdGguZmxvb3IoKHkgLSBkaWZmWTIpIC8gbWFwdGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucm93ID0gcm93O1xuICAgICAgICByZXN1bHQuY29sID0gY29sO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBfdXBkYXRlQ3VsbGluZyAoKSB7XG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlQ3VsbGluZyhmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZW5hYmxlQ3VsbGluZykge1xuICAgICAgICAgICAgdGhpcy5ub2RlLl91cGRhdGVXb3JsZE1hdHJpeCgpO1xuICAgICAgICAgICAgTWF0NC5pbnZlcnQoX21hdDRfdGVtcCwgdGhpcy5ub2RlLl93b3JsZE1hdHJpeCk7XG4gICAgICAgICAgICBsZXQgcmVjdCA9IGNjLnZpc2libGVSZWN0O1xuICAgICAgICAgICAgbGV0IGNhbWVyYSA9IGNjLkNhbWVyYS5maW5kQ2FtZXJhKHRoaXMubm9kZSk7XG4gICAgICAgICAgICBpZiAoY2FtZXJhKSB7XG4gICAgICAgICAgICAgICAgX3ZlYzJfdGVtcC54ID0gMDtcbiAgICAgICAgICAgICAgICBfdmVjMl90ZW1wLnkgPSAwO1xuICAgICAgICAgICAgICAgIF92ZWMyX3RlbXAyLnggPSBfdmVjMl90ZW1wLnggKyByZWN0LndpZHRoO1xuICAgICAgICAgICAgICAgIF92ZWMyX3RlbXAyLnkgPSBfdmVjMl90ZW1wLnkgKyByZWN0LmhlaWdodDtcbiAgICAgICAgICAgICAgICBjYW1lcmEuZ2V0U2NyZWVuVG9Xb3JsZFBvaW50KF92ZWMyX3RlbXAsIF92ZWMyX3RlbXApO1xuICAgICAgICAgICAgICAgIGNhbWVyYS5nZXRTY3JlZW5Ub1dvcmxkUG9pbnQoX3ZlYzJfdGVtcDIsIF92ZWMyX3RlbXAyKTtcbiAgICAgICAgICAgICAgICBWZWMyLnRyYW5zZm9ybU1hdDQoX3ZlYzJfdGVtcCwgX3ZlYzJfdGVtcCwgX21hdDRfdGVtcCk7XG4gICAgICAgICAgICAgICAgVmVjMi50cmFuc2Zvcm1NYXQ0KF92ZWMyX3RlbXAyLCBfdmVjMl90ZW1wMiwgX21hdDRfdGVtcCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmlld1BvcnQoX3ZlYzJfdGVtcC54LCBfdmVjMl90ZW1wLnksIF92ZWMyX3RlbXAyLnggLSBfdmVjMl90ZW1wLngsIF92ZWMyX3RlbXAyLnkgLSBfdmVjMl90ZW1wLnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gTGF5ZXIgb3JpZW50YXRpb24sIHdoaWNoIGlzIHRoZSBzYW1lIGFzIHRoZSBtYXAgb3JpZW50YXRpb24uXG4gICAgICogISN6aCDojrflj5YgTGF5ZXIg5pa55ZCRKOWQjOWcsOWbvuaWueWQkSnjgIJcbiAgICAgKiBAbWV0aG9kIGdldExheWVyT3JpZW50YXRpb25cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBsZXQgb3JpZW50YXRpb24gPSB0aWxlZExheWVyLmdldExheWVyT3JpZW50YXRpb24oKTtcbiAgICAgKiBjYy5sb2coXCJMYXllciBPcmllbnRhdGlvbjogXCIgKyBvcmllbnRhdGlvbik7XG4gICAgICovXG4gICAgZ2V0TGF5ZXJPcmllbnRhdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllck9yaWVudGF0aW9uO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIHByb3BlcnRpZXMgZnJvbSB0aGUgbGF5ZXIuIFRoZXkgY2FuIGJlIGFkZGVkIHVzaW5nIFRpbGVkLlxuICAgICAqICEjemgg6I635Y+WIGxheWVyIOeahOWxnuaAp++8jOWPr+S7peS9v+eUqCBUaWxlZCDnvJbovpHlmajmt7vliqDlsZ7mgKfjgIJcbiAgICAgKiBAbWV0aG9kIGdldFByb3BlcnRpZXNcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBsZXQgcHJvcGVydGllcyA9IHRpbGVkTGF5ZXIuZ2V0UHJvcGVydGllcygpO1xuICAgICAqIGNjLmxvZyhcIlByb3BlcnRpZXM6IFwiICsgcHJvcGVydGllcyk7XG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlVmVydGV4IChjb2wsIHJvdykge1xuICAgICAgICBjb25zdCBUaWxlZE1hcCA9IGNjLlRpbGVkTWFwO1xuICAgICAgICBjb25zdCBUaWxlRmxhZyA9IFRpbGVkTWFwLlRpbGVGbGFnO1xuICAgICAgICBjb25zdCBGTElQUEVEX01BU0sgPSBUaWxlRmxhZy5GTElQUEVEX01BU0s7XG4gICAgICAgIGNvbnN0IFN0YWdnZXJBeGlzID0gVGlsZWRNYXAuU3RhZ2dlckF4aXM7XG4gICAgICAgIGNvbnN0IE9yaWVudGF0aW9uID0gVGlsZWRNYXAuT3JpZW50YXRpb247XG5cbiAgICAgICAgbGV0IHZlcnRpY2VzID0gdGhpcy5fdmVydGljZXM7XG5cbiAgICAgICAgbGV0IGxheWVyT3JpZW50YXRpb24gPSB0aGlzLl9sYXllck9yaWVudGF0aW9uLFxuICAgICAgICAgICAgdGlsZXMgPSB0aGlzLl90aWxlcztcblxuICAgICAgICBpZiAoIXRpbGVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmlnaHRUb3AgPSB0aGlzLl9yaWdodFRvcDtcbiAgICAgICAgbGV0IG1hcHR3ID0gdGhpcy5fbWFwVGlsZVNpemUud2lkdGgsXG4gICAgICAgICAgICBtYXB0aCA9IHRoaXMuX21hcFRpbGVTaXplLmhlaWdodCxcbiAgICAgICAgICAgIG1hcHR3MiA9IG1hcHR3ICogMC41LFxuICAgICAgICAgICAgbWFwdGgyID0gbWFwdGggKiAwLjUsXG4gICAgICAgICAgICByb3dzID0gdGhpcy5fbGF5ZXJTaXplLmhlaWdodCxcbiAgICAgICAgICAgIGNvbHMgPSB0aGlzLl9sYXllclNpemUud2lkdGgsXG4gICAgICAgICAgICBncmlkcyA9IHRoaXMuX3RleEdyaWRzO1xuICAgICAgICBcbiAgICAgICAgbGV0IGdpZCwgZ3JpZCwgbGVmdCwgYm90dG9tLFxuICAgICAgICAgICAgYXhpcywgZGlmZlgxLCBkaWZmWTEsIG9kZF9ldmVuLCBkaWZmWDIsIGRpZmZZMjtcblxuICAgICAgICBpZiAobGF5ZXJPcmllbnRhdGlvbiA9PT0gT3JpZW50YXRpb24uSEVYKSB7XG4gICAgICAgICAgICBheGlzID0gdGhpcy5fc3RhZ2dlckF4aXM7XG4gICAgICAgICAgICBkaWZmWDEgPSB0aGlzLl9kaWZmWDE7XG4gICAgICAgICAgICBkaWZmWTEgPSB0aGlzLl9kaWZmWTE7XG4gICAgICAgICAgICBvZGRfZXZlbiA9IHRoaXMuX29kZF9ldmVuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGN1bGxpbmdDb2wgPSAwLCBjdWxsaW5nUm93ID0gMDtcbiAgICAgICAgbGV0IHRpbGVPZmZzZXQgPSBudWxsLCBncmlkR0lEID0gMDtcblxuICAgICAgICAvLyBncmlkIGJvcmRlclxuICAgICAgICBsZXQgdG9wQm9yZGVyID0gMCwgZG93bkJvcmRlciA9IDAsIGxlZnRCb3JkZXIgPSAwLCByaWdodEJvcmRlciA9IDA7XG4gICAgICAgIGxldCBpbmRleCA9IHJvdyAqIGNvbHMgKyBjb2w7XG4gICAgICAgIGdpZCA9IHRpbGVzW2luZGV4XTtcbiAgICAgICAgZ3JpZEdJRCA9ICgoZ2lkICYgRkxJUFBFRF9NQVNLKSA+Pj4gMCk7XG4gICAgICAgIGdyaWQgPSBncmlkc1tncmlkR0lEXTtcbiAgICAgICAgaWYgKCFncmlkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBoYXMgYW5pbWF0aW9uLCBncmlkIG11c3QgYmUgdXBkYXRlZCBwZXIgZnJhbWVcbiAgICAgICAgaWYgKHRoaXMuX2FuaW1hdGlvbnNbZ3JpZEdJRF0pIHtcbiAgICAgICAgICAgIHRoaXMuX2hhc0FuaUdyaWQgPSB0aGlzLl9oYXNBbmlHcmlkIHx8IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGxheWVyT3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgIC8vIGxlZnQgdG9wIHRvIHJpZ2h0IGRvd21cbiAgICAgICAgICAgIGNhc2UgT3JpZW50YXRpb24uT1JUSE86XG4gICAgICAgICAgICAgICAgY3VsbGluZ0NvbCA9IGNvbDtcbiAgICAgICAgICAgICAgICBjdWxsaW5nUm93ID0gcm93cyAtIHJvdyAtIDE7XG4gICAgICAgICAgICAgICAgbGVmdCA9IGN1bGxpbmdDb2wgKiBtYXB0dztcbiAgICAgICAgICAgICAgICBib3R0b20gPSBjdWxsaW5nUm93ICogbWFwdGg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyByaWdodCB0b3AgdG8gbGVmdCBkb3duXG4gICAgICAgICAgICBjYXNlIE9yaWVudGF0aW9uLklTTzpcbiAgICAgICAgICAgIFx0Ly8gaWYgbm90IGNvbnNpZGVyIGFib3V0IGNvbCwgdGhlbiBsZWZ0IGlzICd3LzIgKiAocm93cyAtIHJvdyAtIDEpJ1xuICAgICAgICAgICAgICAgIC8vIGlmIGNvbnNpZGVyIGFib3V0IGNvbCB0aGVuIGxlZnQgbXVzdCBhZGQgJ3cvMiAqIGNvbCdcbiAgICAgICAgICAgICAgICAvLyBzbyBsZWZ0IGlzICd3LzIgKiAocm93cyAtIHJvdyAtIDEpICsgdy8yICogY29sJ1xuICAgICAgICAgICAgICAgIC8vIGNvbWJpbmUgZXhwcmVzc2lvbiBpcyAndy8yICogKHJvd3MgLSByb3cgKyBjb2wgLTEpJ1xuICAgICAgICAgICAgICAgIGN1bGxpbmdDb2wgPSByb3dzICsgY29sIC0gcm93IC0gMTtcbiAgICAgICAgICAgICAgICAvLyBpZiBub3QgY29uc2lkZXIgYWJvdXQgcm93LCB0aGVuIGJvdHRvbSBpcyAnaC8yICogKGNvbHMgLSBjb2wgLTEpJ1xuICAgICAgICAgICAgICAgIC8vIGlmIGNvbnNpZGVyIGFib3V0IHJvdyB0aGVuIGJvdHRvbSBtdXN0IGFkZCAnaC8yICogKHJvd3MgLSByb3cgLSAxKSdcbiAgICAgICAgICAgICAgICAvLyBzbyBib3R0b20gaXMgJ2gvMiAqIChjb2xzIC0gY29sIC0xKSArIGgvMiAqIChyb3dzIC0gcm93IC0gMSknXG4gICAgICAgICAgICAgICAgLy8gY29tYmluZSBleHByZXNzaW9ubiBpcyAnaC8yICogKHJvd3MgKyBjb2xzIC0gY29sIC0gcm93IC0gMiknXG4gICAgICAgICAgICAgICAgY3VsbGluZ1JvdyA9IHJvd3MgKyBjb2xzIC0gY29sIC0gcm93IC0gMjtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gbWFwdHcyICogY3VsbGluZ0NvbDtcbiAgICAgICAgICAgICAgICBib3R0b20gPSBtYXB0aDIgKiBjdWxsaW5nUm93O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gbGVmdCB0b3AgdG8gcmlnaHQgZG93bVxuICAgICAgICAgICAgY2FzZSBPcmllbnRhdGlvbi5IRVg6XG4gICAgICAgICAgICAgICAgZGlmZlgyID0gKGF4aXMgPT09IFN0YWdnZXJBeGlzLlNUQUdHRVJBWElTX1kgJiYgcm93ICUgMiA9PT0gMSkgPyBtYXB0dzIgKiBvZGRfZXZlbiA6IDA7XG4gICAgICAgICAgICAgICAgZGlmZlkyID0gKGF4aXMgPT09IFN0YWdnZXJBeGlzLlNUQUdHRVJBWElTX1ggJiYgY29sICUgMiA9PT0gMSkgPyBtYXB0aDIgKiAtb2RkX2V2ZW4gOiAwO1xuXG4gICAgICAgICAgICAgICAgbGVmdCA9IGNvbCAqIChtYXB0dyAtIGRpZmZYMSkgKyBkaWZmWDI7XG4gICAgICAgICAgICAgICAgYm90dG9tID0gKHJvd3MgLSByb3cgLSAxKSAqIChtYXB0aCAtIGRpZmZZMSkgKyBkaWZmWTI7XG4gICAgICAgICAgICAgICAgY3VsbGluZ0NvbCA9IGNvbDtcbiAgICAgICAgICAgICAgICBjdWxsaW5nUm93ID0gcm93cyAtIHJvdyAtIDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcm93RGF0YSA9IHZlcnRpY2VzW2N1bGxpbmdSb3ddID0gdmVydGljZXNbY3VsbGluZ1Jvd10gfHwge21pbkNvbDowLCBtYXhDb2w6MH07XG4gICAgICAgIGxldCBjb2xEYXRhID0gcm93RGF0YVtjdWxsaW5nQ29sXSA9IHJvd0RhdGFbY3VsbGluZ0NvbF0gfHwge307XG4gICAgICAgIFxuICAgICAgICAvLyByZWNvcmQgZWFjaCByb3cgcmFuZ2UsIGl0IHdpbGwgZmFzdGVyIHdoZW4gY3VsbGluZyBncmlkXG4gICAgICAgIGlmIChyb3dEYXRhLm1pbkNvbCA+IGN1bGxpbmdDb2wpIHtcbiAgICAgICAgICAgIHJvd0RhdGEubWluQ29sID0gY3VsbGluZ0NvbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyb3dEYXRhLm1heENvbCA8IGN1bGxpbmdDb2wpIHtcbiAgICAgICAgICAgIHJvd0RhdGEubWF4Q29sID0gY3VsbGluZ0NvbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlY29yZCBtYXggcmVjdCwgd2hlbiB2aWV3UG9ydCBpcyBiaWdnZXIgdGhhbiBsYXllciwgY2FuIG1ha2UgaXQgc21hbGxlclxuICAgICAgICBpZiAocmlnaHRUb3Aucm93IDwgY3VsbGluZ1Jvdykge1xuICAgICAgICAgICAgcmlnaHRUb3Aucm93ID0gY3VsbGluZ1JvdztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyaWdodFRvcC5jb2wgPCBjdWxsaW5nQ29sKSB7XG4gICAgICAgICAgICByaWdodFRvcC5jb2wgPSBjdWxsaW5nQ29sO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gX29mZnNldCBpcyB3aG9sZSBsYXllciBvZmZzZXRcbiAgICAgICAgLy8gdGlsZU9mZnNldCBpcyB0aWxlc2V0IG9mZnNldCB3aGljaCBpcyByZWxhdGVkIHRvIGVhY2ggZ3JpZFxuICAgICAgICAvLyB0aWxlT2Zmc2V0IGNvb3JkaW5hdGUgc3lzdGVtJ3MgeSBheGlzIGlzIG9wcG9zaXRlIHdpdGggZW5naW5lJ3MgeSBheGlzLlxuICAgICAgICB0aWxlT2Zmc2V0ID0gZ3JpZC50aWxlc2V0LnRpbGVPZmZzZXQ7XG4gICAgICAgIGxlZnQgKz0gdGhpcy5fb2Zmc2V0LnggKyB0aWxlT2Zmc2V0Lng7XG4gICAgICAgIGJvdHRvbSArPSB0aGlzLl9vZmZzZXQueSAtIHRpbGVPZmZzZXQueTtcbiAgICAgICAgXG4gICAgICAgIHRvcEJvcmRlciA9IC10aWxlT2Zmc2V0LnkgKyBncmlkLnRpbGVzZXQuX3RpbGVTaXplLmhlaWdodCAtIG1hcHRoO1xuICAgICAgICB0b3BCb3JkZXIgPSB0b3BCb3JkZXIgPCAwID8gMCA6IHRvcEJvcmRlcjtcbiAgICAgICAgZG93bkJvcmRlciA9IHRpbGVPZmZzZXQueSA8IDAgPyAwIDogdGlsZU9mZnNldC55O1xuICAgICAgICBsZWZ0Qm9yZGVyID0gLXRpbGVPZmZzZXQueCA8IDAgPyAwIDogLXRpbGVPZmZzZXQueDtcbiAgICAgICAgcmlnaHRCb3JkZXIgPSB0aWxlT2Zmc2V0LnggKyBncmlkLnRpbGVzZXQuX3RpbGVTaXplLndpZHRoIC0gbWFwdHc7XG4gICAgICAgIHJpZ2h0Qm9yZGVyID0gcmlnaHRCb3JkZXIgPCAwID8gMCA6IHJpZ2h0Qm9yZGVyO1xuXG4gICAgICAgIGlmICh0aGlzLl9yaWdodE9mZnNldCA8IGxlZnRCb3JkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3JpZ2h0T2Zmc2V0ID0gbGVmdEJvcmRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9sZWZ0T2Zmc2V0IDwgcmlnaHRCb3JkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZnRPZmZzZXQgPSByaWdodEJvcmRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl90b3BPZmZzZXQgPCBkb3duQm9yZGVyKSB7XG4gICAgICAgICAgICB0aGlzLl90b3BPZmZzZXQgPSBkb3duQm9yZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2Rvd25PZmZzZXQgPCB0b3BCb3JkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rvd25PZmZzZXQgPSB0b3BCb3JkZXI7XG4gICAgICAgIH1cblxuICAgICAgICBjb2xEYXRhLmxlZnQgPSBsZWZ0O1xuICAgICAgICBjb2xEYXRhLmJvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgLy8gdGhpcyBpbmRleCBpcyB0aWxlZG1hcCBncmlkIGluZGV4XG4gICAgICAgIGNvbERhdGEuaW5kZXggPSBpbmRleDsgXG5cbiAgICAgICAgdGhpcy5fY3VsbGluZ0RpcnR5ID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZVZlcnRpY2VzICgpIHtcbiAgICAgICAgbGV0IHZlcnRpY2VzID0gdGhpcy5fdmVydGljZXM7XG4gICAgICAgIHZlcnRpY2VzLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgbGV0IHRpbGVzID0gdGhpcy5fdGlsZXM7XG4gICAgICAgIGlmICghdGlsZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByaWdodFRvcCA9IHRoaXMuX3JpZ2h0VG9wO1xuICAgICAgICByaWdodFRvcC5yb3cgPSAtMTtcbiAgICAgICAgcmlnaHRUb3AuY29sID0gLTE7XG5cbiAgICAgICAgbGV0IHJvd3MgPSB0aGlzLl9sYXllclNpemUuaGVpZ2h0LFxuICAgICAgICAgICAgY29scyA9IHRoaXMuX2xheWVyU2l6ZS53aWR0aDtcblxuICAgICAgICB0aGlzLl90b3BPZmZzZXQgPSAwO1xuICAgICAgICB0aGlzLl9kb3duT2Zmc2V0ID0gMDtcbiAgICAgICAgdGhpcy5fbGVmdE9mZnNldCA9IDA7XG4gICAgICAgIHRoaXMuX3JpZ2h0T2Zmc2V0ID0gMDtcbiAgICAgICAgdGhpcy5faGFzQW5pR3JpZCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHJvd3M7ICsrcm93KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBjb2xzOyArK2NvbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZlcnRleChjb2wsIHJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdmVydGljZXNEaXJ0eSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHRoZSBUaWxlZFRpbGUgd2l0aCB0aGUgdGlsZSBjb29yZGluYXRlLjxici8+XG4gICAgICogSWYgdGhlcmUgaXMgbm8gdGlsZSBpbiB0aGUgc3BlY2lmaWVkIGNvb3JkaW5hdGUgYW5kIGZvcmNlQ3JlYXRlIHBhcmFtZXRlciBpcyB0cnVlLCA8YnIvPlxuICAgICAqIHRoZW4gd2lsbCBjcmVhdGUgYSBuZXcgVGlsZWRUaWxlIGF0IHRoZSBjb29yZGluYXRlLlxuICAgICAqIFRoZSByZW5kZXJlciB3aWxsIHJlbmRlciB0aGUgdGlsZSB3aXRoIHRoZSByb3RhdGlvbiwgc2NhbGUsIHBvc2l0aW9uIGFuZCBjb2xvciBwcm9wZXJ0eSBvZiB0aGUgVGlsZWRUaWxlLlxuICAgICAqICEjemhcbiAgICAgKiDpgJrov4fmjIflrprnmoQgdGlsZSDlnZDmoIfojrflj5blr7nlupTnmoQgVGlsZWRUaWxl44CCIDxici8+XG4gICAgICog5aaC5p6c5oyH5a6a55qE5Z2Q5qCH5rKh5pyJIHRpbGXvvIzlubbkuJTorr7nva7kuoYgZm9yY2VDcmVhdGUg6YKj5LmI5bCG5Lya5Zyo5oyH5a6a55qE5Z2Q5qCH5Yib5bu65LiA5Liq5paw55qEIFRpbGVkVGlsZSDjgII8YnIvPlxuICAgICAqIOWcqOa4suafk+i/meS4qiB0aWxlIOeahOaXtuWAme+8jOWwhuS8muS9v+eUqCBUaWxlZFRpbGUg55qE6IqC54K555qE5peL6L2s44CB57yp5pS+44CB5L2N56e744CB6aKc6Imy5bGe5oCn44CCPGJyLz5cbiAgICAgKiBAbWV0aG9kIGdldFRpbGVkVGlsZUF0XG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB4XG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB5XG4gICAgICogQHBhcmFtIHtCb29sZWFufSBmb3JjZUNyZWF0ZVxuICAgICAqIEByZXR1cm4ge2NjLlRpbGVkVGlsZX1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCB0aWxlID0gdGlsZWRMYXllci5nZXRUaWxlZFRpbGVBdCgxMDAsIDEwMCwgdHJ1ZSk7XG4gICAgICogY2MubG9nKHRpbGUpO1xuICAgICAqL1xuICAgIGdldFRpbGVkVGlsZUF0ICh4LCB5LCBmb3JjZUNyZWF0ZSkge1xuICAgICAgICBpZiAodGhpcy5faXNJbnZhbGlkUG9zaXRpb24oeCwgeSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRpbGVkTGF5ZXIuZ2V0VGlsZWRUaWxlQXQ6IGludmFsaWQgcG9zaXRpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl90aWxlcykge1xuICAgICAgICAgICAgY2MubG9nSUQoNzIzNik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoeCkgKyBNYXRoLmZsb29yKHkpICogdGhpcy5fbGF5ZXJTaXplLndpZHRoO1xuICAgICAgICBsZXQgdGlsZSA9IHRoaXMuX3RpbGVkVGlsZXNbaW5kZXhdO1xuICAgICAgICBpZiAoIXRpbGUgJiYgZm9yY2VDcmVhdGUpIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gbmV3IGNjLk5vZGUoKTtcbiAgICAgICAgICAgIHRpbGUgPSBub2RlLmFkZENvbXBvbmVudChjYy5UaWxlZFRpbGUpO1xuICAgICAgICAgICAgdGlsZS5feCA9IHg7XG4gICAgICAgICAgICB0aWxlLl95ID0geTtcbiAgICAgICAgICAgIHRpbGUuX2xheWVyID0gdGhpcztcbiAgICAgICAgICAgIHRpbGUuX3VwZGF0ZUluZm8oKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgcmV0dXJuIHRpbGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbGU7XG4gICAgfSxcblxuICAgIC8qKiBcbiAgICAgKiAhI2VuXG4gICAgICogQ2hhbmdlIHRpbGUgdG8gVGlsZWRUaWxlIGF0IHRoZSBzcGVjaWZpZWQgY29vcmRpbmF0ZS5cbiAgICAgKiAhI3poXG4gICAgICog5bCG5oyH5a6a55qEIHRpbGUg5Z2Q5qCH5pu/5o2i5Li65oyH5a6a55qEIFRpbGVkVGlsZeOAglxuICAgICAqIEBtZXRob2Qgc2V0VGlsZWRUaWxlQXRcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHhcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHlcbiAgICAgKiBAcGFyYW0ge2NjLlRpbGVkVGlsZX0gdGlsZWRUaWxlXG4gICAgICogQHJldHVybiB7Y2MuVGlsZWRUaWxlfVxuICAgICAqL1xuICAgIHNldFRpbGVkVGlsZUF0ICh4LCB5LCB0aWxlZFRpbGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzSW52YWxpZFBvc2l0aW9uKHgsIHkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaWxlZExheWVyLnNldFRpbGVkVGlsZUF0OiBpbnZhbGlkIHBvc2l0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fdGlsZXMpIHtcbiAgICAgICAgICAgIGNjLmxvZ0lEKDcyMzYpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKHgpICsgTWF0aC5mbG9vcih5KSAqIHRoaXMuX2xheWVyU2l6ZS53aWR0aDtcbiAgICAgICAgdGhpcy5fdGlsZWRUaWxlc1tpbmRleF0gPSB0aWxlZFRpbGU7XG4gICAgICAgIHRoaXMuX2N1bGxpbmdEaXJ0eSA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRpbGVkVGlsZSkge1xuICAgICAgICAgICAgdGhpcy5faGFzVGlsZWROb2RlR3JpZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9oYXNUaWxlZE5vZGVHcmlkID0gdGhpcy5fdGlsZWRUaWxlcy5zb21lKGZ1bmN0aW9uICh0aWxlZE5vZGUsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdGlsZWROb2RlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGlsZWRUaWxlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybiB0ZXh0dXJlLlxuICAgICAqICEjemgg6I635Y+W57q555CG44CCXG4gICAgICogQG1ldGhvZCBnZXRUZXh0dXJlXG4gICAgICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBvZiB0ZXh0dXJlc1xuICAgICAqIEByZXR1cm4ge1RleHR1cmUyRH1cbiAgICAgKi9cbiAgICBnZXRUZXh0dXJlIChpbmRleCkge1xuICAgICAgICBpbmRleCA9IGluZGV4IHx8IDA7XG4gICAgICAgIGlmICh0aGlzLl90ZXh0dXJlcyAmJiBpbmRleCA+PSAwICYmIHRoaXMuX3RleHR1cmVzLmxlbmd0aCA+IGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGV4dHVyZXNbaW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybiB0ZXh0dXJlLlxuICAgICAqICEjemgg6I635Y+W57q555CG44CCXG4gICAgICogQG1ldGhvZCBnZXRUZXh0dXJlc1xuICAgICAqIEByZXR1cm4ge1RleHR1cmUyRH1cbiAgICAgKi9cbiAgICBnZXRUZXh0dXJlcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0dXJlcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgdGhlIHRleHR1cmUuXG4gICAgICogISN6aCDorr7nva7nurnnkIbjgIJcbiAgICAgKiBAbWV0aG9kIHNldFRleHR1cmVcbiAgICAgKiBAcGFyYW0ge1RleHR1cmUyRH0gdGV4dHVyZVxuICAgICAqL1xuICAgIHNldFRleHR1cmUgKHRleHR1cmUpe1xuICAgICAgICB0aGlzLnNldFRleHR1cmVzKFt0ZXh0dXJlXSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHRoZSB0ZXh0dXJlLlxuICAgICAqICEjemgg6K6+572u57q555CG44CCXG4gICAgICogQG1ldGhvZCBzZXRUZXh0dXJlXG4gICAgICogQHBhcmFtIHtUZXh0dXJlMkR9IHRleHR1cmVzXG4gICAgICovXG4gICAgc2V0VGV4dHVyZXMgKHRleHR1cmVzKSB7XG4gICAgICAgIHRoaXMuX3RleHR1cmVzID0gdGV4dHVyZXM7XG4gICAgICAgIHRoaXMuX2FjdGl2YXRlTWF0ZXJpYWwoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXRzIGxheWVyIHNpemUuXG4gICAgICogISN6aCDojrflvpflsYLlpKflsI/jgIJcbiAgICAgKiBAbWV0aG9kIGdldExheWVyU2l6ZVxuICAgICAqIEByZXR1cm4ge1NpemV9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBsZXQgc2l6ZSA9IHRpbGVkTGF5ZXIuZ2V0TGF5ZXJTaXplKCk7XG4gICAgICogY2MubG9nKFwibGF5ZXIgc2l6ZTogXCIgKyBzaXplKTtcbiAgICAgKi9cbiAgICBnZXRMYXllclNpemUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGF5ZXJTaXplO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNpemUgb2YgdGhlIG1hcCdzIHRpbGUgKGNvdWxkIGJlIGRpZmZlcmVudCBmcm9tIHRoZSB0aWxlJ3Mgc2l6ZSkuXG4gICAgICogISN6aCDojrflj5YgdGlsZSDnmoTlpKflsI8oIHRpbGUg55qE5aSn5bCP5Y+v6IO95Lya5pyJ5omA5LiN5ZCMKeOAglxuICAgICAqIEBtZXRob2QgZ2V0TWFwVGlsZVNpemVcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGV0IG1hcFRpbGVTaXplID0gdGlsZWRMYXllci5nZXRNYXBUaWxlU2l6ZSgpO1xuICAgICAqIGNjLmxvZyhcIk1hcFRpbGUgc2l6ZTogXCIgKyBtYXBUaWxlU2l6ZSk7XG4gICAgICovXG4gICAgZ2V0TWFwVGlsZVNpemUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwVGlsZVNpemU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0cyBUaWxlIHNldCBmaXJzdCBpbmZvcm1hdGlvbiBmb3IgdGhlIGxheWVyLlxuICAgICAqICEjemgg6I635Y+WIGxheWVyIOe0ouW8leS9jee9ruS4ujDnmoQgVGlsZXNldCDkv6Hmga/jgIJcbiAgICAgKiBAbWV0aG9kIGdldFRpbGVTZXRcbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IG9mIHRpbGVzZXRzXG4gICAgICogQHJldHVybiB7VE1YVGlsZXNldEluZm99XG4gICAgICovXG4gICAgZ2V0VGlsZVNldCAoaW5kZXgpIHtcbiAgICAgICAgaW5kZXggPSBpbmRleCB8fCAwO1xuICAgICAgICBpZiAodGhpcy5fdGlsZXNldHMgJiYgaW5kZXggPj0gMCAmJiB0aGlzLl90aWxlc2V0cy5sZW5ndGggPiBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpbGVzZXRzW2luZGV4XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXRzIHRpbGUgc2V0IGFsbCBpbmZvcm1hdGlvbiBmb3IgdGhlIGxheWVyLlxuICAgICAqICEjemgg6I635Y+WIGxheWVyIOaJgOacieeahCBUaWxlc2V0IOS/oeaBr+OAglxuICAgICAqIEBtZXRob2QgZ2V0VGlsZVNldFxuICAgICAqIEByZXR1cm4ge1RNWFRpbGVzZXRJbmZvfVxuICAgICAqL1xuICAgIGdldFRpbGVTZXRzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbGVzZXRzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgdGlsZSBzZXQgaW5mb3JtYXRpb24gZm9yIHRoZSBsYXllci5cbiAgICAgKiAhI3poIOiuvue9riBsYXllciDnmoQgdGlsZXNldCDkv6Hmga/jgIJcbiAgICAgKiBAbWV0aG9kIHNldFRpbGVTZXRcbiAgICAgKiBAcGFyYW0ge1RNWFRpbGVzZXRJbmZvfSB0aWxlc2V0XG4gICAgICovXG4gICAgc2V0VGlsZVNldCAodGlsZXNldCkge1xuICAgICAgICB0aGlzLnNldFRpbGVTZXRzKFt0aWxlc2V0XSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0cyBUaWxlIHNldCBpbmZvcm1hdGlvbiBmb3IgdGhlIGxheWVyLlxuICAgICAqICEjemgg6K6+572uIGxheWVyIOeahCBUaWxlc2V0IOS/oeaBr+OAglxuICAgICAqIEBtZXRob2Qgc2V0VGlsZVNldHNcbiAgICAgKiBAcGFyYW0ge1RNWFRpbGVzZXRJbmZvfSB0aWxlc2V0c1xuICAgICAqL1xuICAgIHNldFRpbGVTZXRzICh0aWxlc2V0cykge1xuICAgICAgICB0aGlzLl90aWxlc2V0cyA9IHRpbGVzZXRzO1xuICAgICAgICBsZXQgdGV4dHVyZXMgPSB0aGlzLl90ZXh0dXJlcyA9IFtdO1xuICAgICAgICBsZXQgdGV4R3JpZHMgPSB0aGlzLl90ZXhHcmlkcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbGVzZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdGlsZXNldCA9IHRpbGVzZXRzW2ldO1xuICAgICAgICAgICAgaWYgKHRpbGVzZXQpIHtcbiAgICAgICAgICAgICAgICB0ZXh0dXJlc1tpXSA9IHRpbGVzZXQuc291cmNlSW1hZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjYy5UaWxlZE1hcC5sb2FkQWxsVGV4dHVyZXMgKHRleHR1cmVzLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRpbGVzZXRzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCB0aWxlc2V0SW5mbyA9IHRpbGVzZXRzW2ldO1xuICAgICAgICAgICAgICAgIGlmICghdGlsZXNldEluZm8pIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNjLlRpbGVkTWFwLmZpbGxUZXh0dXJlR3JpZHModGlsZXNldEluZm8sIHRleEdyaWRzLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3ByZXBhcmVUb1JlbmRlcigpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0sXG5cbiAgICBfdHJhdmVyc2VBbGxHcmlkICgpIHtcbiAgICAgICAgbGV0IHRpbGVzID0gdGhpcy5fdGlsZXM7XG4gICAgICAgIGxldCB0ZXhHcmlkcyA9IHRoaXMuX3RleEdyaWRzO1xuICAgICAgICBsZXQgdGlsZXNldEluZGV4QXJyID0gdGhpcy5fdGlsZXNldEluZGV4QXJyO1xuICAgICAgICBsZXQgdGlsZXNldEluZGV4VG9BcnJJbmRleCA9IHRoaXMuX3RpbGVzZXRJbmRleFRvQXJySW5kZXggPSB7fTtcblxuICAgICAgICBjb25zdCBUaWxlZE1hcCA9IGNjLlRpbGVkTWFwO1xuICAgICAgICBjb25zdCBUaWxlRmxhZyA9IFRpbGVkTWFwLlRpbGVGbGFnO1xuICAgICAgICBjb25zdCBGTElQUEVEX01BU0sgPSBUaWxlRmxhZy5GTElQUEVEX01BU0s7XG5cbiAgICAgICAgdGlsZXNldEluZGV4QXJyLmxlbmd0aCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBnaWQgPSB0aWxlc1tpXTtcbiAgICAgICAgICAgIGlmIChnaWQgPT09IDApIGNvbnRpbnVlO1xuICAgICAgICAgICAgZ2lkID0gKChnaWQgJiBGTElQUEVEX01BU0spID4+PiAwKTtcbiAgICAgICAgICAgIGxldCBncmlkID0gdGV4R3JpZHNbZ2lkXTtcbiAgICAgICAgICAgIGlmICghZ3JpZCkge1xuICAgICAgICAgICAgICAgIGNjLmVycm9yKFwiQ0NUaWxlZExheWVyOl90cmF2ZXJzZUFsbEdyaWQgZ3JpZCBpcyBudWxsLCBnaWQgaXM6XCIsIGdpZCk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdGlsZXNldElkeCA9IGdyaWQudGV4SWQ7XG4gICAgICAgICAgICBpZiAodGlsZXNldEluZGV4VG9BcnJJbmRleFt0aWxlc2V0SWR4XSAhPT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgICAgICAgIHRpbGVzZXRJbmRleFRvQXJySW5kZXhbdGlsZXNldElkeF0gPSB0aWxlc2V0SW5kZXhBcnIubGVuZ3RoO1xuICAgICAgICAgICAgdGlsZXNldEluZGV4QXJyLnB1c2godGlsZXNldElkeCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2luaXQgKGxheWVySW5mbywgbWFwSW5mbywgdGlsZXNldHMsIHRleHR1cmVzLCB0ZXhHcmlkcykge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fY3VsbGluZ0RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fbGF5ZXJJbmZvID0gbGF5ZXJJbmZvO1xuICAgICAgICB0aGlzLl9tYXBJbmZvID0gbWFwSW5mbztcblxuICAgICAgICBsZXQgc2l6ZSA9IGxheWVySW5mby5fbGF5ZXJTaXplO1xuXG4gICAgICAgIC8vIGxheWVySW5mb1xuICAgICAgICB0aGlzLl9sYXllck5hbWUgPSBsYXllckluZm8ubmFtZTtcbiAgICAgICAgdGhpcy5fdGlsZXMgPSBsYXllckluZm8uX3RpbGVzO1xuICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzID0gbGF5ZXJJbmZvLnByb3BlcnRpZXM7XG4gICAgICAgIHRoaXMuX2xheWVyU2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMuX21pbkdJRCA9IGxheWVySW5mby5fbWluR0lEO1xuICAgICAgICB0aGlzLl9tYXhHSUQgPSBsYXllckluZm8uX21heEdJRDtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IGxheWVySW5mby5fb3BhY2l0eTtcbiAgICAgICAgdGhpcy5fcmVuZGVyT3JkZXIgPSBtYXBJbmZvLnJlbmRlck9yZGVyO1xuICAgICAgICB0aGlzLl9zdGFnZ2VyQXhpcyA9IG1hcEluZm8uZ2V0U3RhZ2dlckF4aXMoKTtcbiAgICAgICAgdGhpcy5fc3RhZ2dlckluZGV4ID0gbWFwSW5mby5nZXRTdGFnZ2VySW5kZXgoKTtcbiAgICAgICAgdGhpcy5faGV4U2lkZUxlbmd0aCA9IG1hcEluZm8uZ2V0SGV4U2lkZUxlbmd0aCgpO1xuICAgICAgICB0aGlzLl9hbmltYXRpb25zID0gbWFwSW5mby5nZXRUaWxlQW5pbWF0aW9ucygpO1xuXG4gICAgICAgIC8vIHRpbGVzZXRzXG4gICAgICAgIHRoaXMuX3RpbGVzZXRzID0gdGlsZXNldHM7XG4gICAgICAgIC8vIHRleHR1cmVzXG4gICAgICAgIHRoaXMuX3RleHR1cmVzID0gdGV4dHVyZXM7XG4gICAgICAgIC8vIGdyaWQgdGV4dHVyZVxuICAgICAgICB0aGlzLl90ZXhHcmlkcyA9IHRleEdyaWRzO1xuXG4gICAgICAgIC8vIG1hcEluZm9cbiAgICAgICAgdGhpcy5fbGF5ZXJPcmllbnRhdGlvbiA9IG1hcEluZm8ub3JpZW50YXRpb247XG4gICAgICAgIHRoaXMuX21hcFRpbGVTaXplID0gbWFwSW5mby5nZXRUaWxlU2l6ZSgpO1xuXG4gICAgICAgIGxldCBtYXB0dyA9IHRoaXMuX21hcFRpbGVTaXplLndpZHRoO1xuICAgICAgICBsZXQgbWFwdGggPSB0aGlzLl9tYXBUaWxlU2l6ZS5oZWlnaHQ7XG4gICAgICAgIGxldCBsYXllclcgPSB0aGlzLl9sYXllclNpemUud2lkdGg7XG4gICAgICAgIGxldCBsYXllckggPSB0aGlzLl9sYXllclNpemUuaGVpZ2h0O1xuXG4gICAgICAgIGlmICh0aGlzLl9sYXllck9yaWVudGF0aW9uID09PSBjYy5UaWxlZE1hcC5PcmllbnRhdGlvbi5IRVgpIHtcbiAgICAgICAgICAgIC8vIGhhbmRsZSBoZXggbWFwXG4gICAgICAgICAgICBjb25zdCBUaWxlZE1hcCA9IGNjLlRpbGVkTWFwO1xuICAgICAgICAgICAgY29uc3QgU3RhZ2dlckF4aXMgPSBUaWxlZE1hcC5TdGFnZ2VyQXhpcztcbiAgICAgICAgICAgIGNvbnN0IFN0YWdnZXJJbmRleCA9IFRpbGVkTWFwLlN0YWdnZXJJbmRleDsgICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IDAsIGhlaWdodCA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuX29kZF9ldmVuID0gKHRoaXMuX3N0YWdnZXJJbmRleCA9PT0gU3RhZ2dlckluZGV4LlNUQUdHRVJJTkRFWF9PREQpID8gMSA6IC0xO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3N0YWdnZXJBeGlzID09PSBTdGFnZ2VyQXhpcy5TVEFHR0VSQVhJU19YKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlmZlgxID0gKG1hcHR3IC0gdGhpcy5faGV4U2lkZUxlbmd0aCkgLyAyO1xuICAgICAgICAgICAgICAgIHRoaXMuX2RpZmZZMSA9IDA7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gbWFwdGggKiAobGF5ZXJIICsgMC41KTtcbiAgICAgICAgICAgICAgICB3aWR0aCA9IChtYXB0dyArIHRoaXMuX2hleFNpZGVMZW5ndGgpICogTWF0aC5mbG9vcihsYXllclcgLyAyKSArIG1hcHR3ICogKGxheWVyVyAlIDIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kaWZmWDEgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX2RpZmZZMSA9IChtYXB0aCAtIHRoaXMuX2hleFNpZGVMZW5ndGgpIC8gMjtcbiAgICAgICAgICAgICAgICB3aWR0aCA9IG1hcHR3ICogKGxheWVyVyArIDAuNSk7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gKG1hcHRoICsgdGhpcy5faGV4U2lkZUxlbmd0aCkgKiBNYXRoLmZsb29yKGxheWVySCAvIDIpICsgbWFwdGggKiAobGF5ZXJIICUgMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbGF5ZXJPcmllbnRhdGlvbiA9PT0gY2MuVGlsZWRNYXAuT3JpZW50YXRpb24uSVNPKSB7XG4gICAgICAgICAgICBsZXQgd2ggPSBsYXllclcgKyBsYXllckg7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUobWFwdHcgKiAwLjUgKiB3aCwgbWFwdGggKiAwLjUgKiB3aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUobGF5ZXJXICogbWFwdHcsIGxheWVySCAqIG1hcHRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9mZnNldCAoYWZ0ZXIgbGF5ZXIgb3JpZW50YXRpb24gaXMgc2V0KTtcbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0gY2MudjIobGF5ZXJJbmZvLm9mZnNldC54LCAtbGF5ZXJJbmZvLm9mZnNldC55KTtcbiAgICAgICAgdGhpcy5fdXNlQXV0b21hdGljVmVydGV4WiA9IGZhbHNlO1xuICAgICAgICB0aGlzLl92ZXJ0ZXhadmFsdWUgPSAwO1xuICAgICAgICB0aGlzLl9zeW5jQW5jaG9yUG9pbnQoKTtcbiAgICAgICAgdGhpcy5fcHJlcGFyZVRvUmVuZGVyKCk7XG4gICAgfSxcblxuICAgIF9wcmVwYXJlVG9SZW5kZXIgKCkge1xuICAgICAgICB0aGlzLl91cGRhdGVWZXJ0aWNlcygpO1xuICAgICAgICB0aGlzLl90cmF2ZXJzZUFsbEdyaWQoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlQWxsVXNlck5vZGUoKTtcbiAgICAgICAgdGhpcy5fYWN0aXZhdGVNYXRlcmlhbCgpO1xuICAgIH0sXG5cbiAgICBfYnVpbGRNYXRlcmlhbCAodGlsZXNldElkeCkge1xuICAgICAgICBsZXQgdGV4SWRNYXRJZHggPSB0aGlzLl90ZXhJZFRvTWF0SW5kZXg7XG4gICAgICAgIGlmICh0ZXhJZE1hdElkeFt0aWxlc2V0SWR4XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0aWxlc2V0SW5kZXhBcnIgPSB0aGlzLl90aWxlc2V0SW5kZXhBcnI7XG4gICAgICAgIGxldCB0aWxlc2V0SW5kZXhUb0FyckluZGV4ID0gdGhpcy5fdGlsZXNldEluZGV4VG9BcnJJbmRleDtcbiAgICAgICAgbGV0IGluZGV4ID0gdGlsZXNldEluZGV4VG9BcnJJbmRleFt0aWxlc2V0SWR4XTtcbiAgICAgICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRpbGVzZXRJbmRleFRvQXJySW5kZXhbdGlsZXNldElkeF0gPSBpbmRleCA9IHRpbGVzZXRJbmRleEFyci5sZW5ndGg7XG4gICAgICAgICAgICB0aWxlc2V0SW5kZXhBcnIucHVzaCh0aWxlc2V0SWR4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0ZXh0dXJlID0gdGhpcy5fdGV4dHVyZXNbdGlsZXNldElkeF07XG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMuX21hdGVyaWFsc1tpbmRleF07XG4gICAgICAgIGlmICghbWF0ZXJpYWwpIHtcbiAgICAgICAgICAgIG1hdGVyaWFsID0gTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKCcyZC1zcHJpdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBtYXRlcmlhbCA9IE1hdGVyaWFsVmFyaWFudC5jcmVhdGUobWF0ZXJpYWwsIHRoaXMpO1xuXG4gICAgICAgIG1hdGVyaWFsLmRlZmluZSgnQ0NfVVNFX01PREVMJywgdHJ1ZSk7XG4gICAgICAgIG1hdGVyaWFsLnNldFByb3BlcnR5KCd0ZXh0dXJlJywgdGV4dHVyZSk7XG5cbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxzW2luZGV4XSA9IG1hdGVyaWFsO1xuICAgICAgICB0ZXhJZE1hdElkeFt0aWxlc2V0SWR4XSA9IGluZGV4O1xuICAgICAgICByZXR1cm4gbWF0ZXJpYWw7XG4gICAgfSxcblxuICAgIF9hY3RpdmF0ZU1hdGVyaWFsICgpIHtcbiAgICAgICAgbGV0IHRpbGVzZXRJbmRleEFyciA9IHRoaXMuX3RpbGVzZXRJbmRleEFycjtcbiAgICAgICAgaWYgKHRpbGVzZXRJbmRleEFyci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1hdExlbiA9IHRpbGVzZXRJbmRleEFyci5sZW5ndGg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0TGVuOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkTWF0ZXJpYWwodGlsZXNldEluZGV4QXJyW2ldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYXRlcmlhbHMubGVuZ3RoID0gbWF0TGVuO1xuICAgICAgICB0aGlzLm1hcmtGb3JSZW5kZXIodHJ1ZSk7XG4gICAgfVxufSk7XG5cbmNjLlRpbGVkTGF5ZXIgPSBtb2R1bGUuZXhwb3J0cyA9IFRpbGVkTGF5ZXI7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==