
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC90aWxlbWFwL0NDVGlsZWRMYXllci5qcyJdLCJuYW1lcyI6WyJSZW5kZXJDb21wb25lbnQiLCJyZXF1aXJlIiwiTWF0ZXJpYWwiLCJSZW5kZXJGbG93IiwiX21hdDRfdGVtcCIsImNjIiwibWF0NCIsIl92ZWMyX3RlbXAiLCJ2MiIsIl92ZWMyX3RlbXAyIiwiX3ZlYzJfdGVtcDMiLCJfdGVtcFJvd0NvbCIsInJvdyIsImNvbCIsIlRpbGVkVXNlck5vZGVEYXRhIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwiY3RvciIsIl9pbmRleCIsIl9yb3ciLCJfY29sIiwiX3RpbGVkTGF5ZXIiLCJUaWxlZExheWVyIiwiZWRpdG9yIiwiaW5zcGVjdG9yIiwiX3VzZXJOb2RlR3JpZCIsIl91c2VyTm9kZU1hcCIsIl91c2VyTm9kZURpcnR5IiwiX3RpbGVkVGlsZXMiLCJfdGlsZXNldEluZGV4QXJyIiwiX3RpbGVzZXRJbmRleFRvQXJySW5kZXgiLCJfdGV4SWRUb01hdEluZGV4IiwiX3ZpZXdQb3J0IiwieCIsInkiLCJ3aWR0aCIsImhlaWdodCIsIl9jdWxsaW5nUmVjdCIsImxlZnREb3duIiwicmlnaHRUb3AiLCJfY3VsbGluZ0RpcnR5IiwiX3JpZ2h0VG9wIiwiX2xheWVySW5mbyIsIl9tYXBJbmZvIiwiX3RvcE9mZnNldCIsIl9kb3duT2Zmc2V0IiwiX2xlZnRPZmZzZXQiLCJfcmlnaHRPZmZzZXQiLCJfdGlsZXMiLCJfdmVydGljZXMiLCJfdmVydGljZXNEaXJ0eSIsIl9sYXllck5hbWUiLCJfbGF5ZXJPcmllbnRhdGlvbiIsIl90ZXhHcmlkcyIsIl90ZXh0dXJlcyIsIl90aWxlc2V0cyIsIl9sZWZ0RG93blRvQ2VudGVyWCIsIl9sZWZ0RG93blRvQ2VudGVyWSIsIl9oYXNUaWxlZE5vZGVHcmlkIiwiX2hhc0FuaUdyaWQiLCJfYW5pbWF0aW9ucyIsIl9lbmFibGVDdWxsaW5nIiwibWFjcm8iLCJFTkFCTEVfVElMRURNQVBfQ1VMTElORyIsIl9oYXNUaWxlZE5vZGUiLCJfaGFzQW5pbWF0aW9uIiwiZW5hYmxlQ3VsbGluZyIsInZhbHVlIiwiYWRkVXNlck5vZGUiLCJub2RlIiwiZGF0YUNvbXAiLCJnZXRDb21wb25lbnQiLCJ3YXJuIiwiYWRkQ29tcG9uZW50IiwicGFyZW50IiwiX3JlbmRlckZsYWciLCJGTEFHX0JSRUFLX0ZMT1ciLCJfaWQiLCJfbm9kZUxvY2FsUG9zVG9MYXllclBvcyIsIl9wb3NpdGlvblRvUm93Q29sIiwiX2FkZFVzZXJOb2RlVG9HcmlkIiwiX3VwZGF0ZUN1bGxpbmdPZmZzZXRCeVVzZXJOb2RlIiwib24iLCJOb2RlIiwiRXZlbnRUeXBlIiwiUE9TSVRJT05fQ0hBTkdFRCIsIl91c2VyTm9kZVBvc0NoYW5nZSIsIlNJWkVfQ0hBTkdFRCIsIl91c2VyTm9kZVNpemVDaGFuZ2UiLCJyZW1vdmVVc2VyTm9kZSIsIm9mZiIsIl9yZW1vdmVVc2VyTm9kZUZyb21HcmlkIiwiX3JlbW92ZUNvbXBvbmVudCIsImRlc3Ryb3kiLCJyZW1vdmVGcm9tUGFyZW50IiwiZGVzdHJveVVzZXJOb2RlIiwibm9kZVBvcyIsIm91dCIsIl9nZXROb2Rlc0J5Um93Q29sIiwicm93RGF0YSIsIl9nZXROb2Rlc0NvdW50QnlSb3ciLCJjb3VudCIsIl91cGRhdGVBbGxVc2VyTm9kZSIsImRhdGFJZCIsInNlbGYiLCJfbGltaXRJbkxheWVyIiwiaW5kZXgiLCJjb2xEYXRhIiwibGlzdCIsImxlbmd0aCIsInJvd0NvbCIsInRlbXBSb3dDb2wiLCJwdXNoIiwiX2lzVXNlck5vZGVEaXJ0eSIsIl9zZXRVc2VyTm9kZURpcnR5Iiwib25FbmFibGUiLCJfc3VwZXIiLCJBTkNIT1JfQ0hBTkdFRCIsIl9zeW5jQW5jaG9yUG9pbnQiLCJfYWN0aXZhdGVNYXRlcmlhbCIsIm9uRGlzYWJsZSIsImFuY2hvclgiLCJzY2FsZVgiLCJhbmNob3JZIiwic2NhbGVZIiwib25EZXN0cm95IiwiX2J1ZmZlciIsIl9yZW5kZXJEYXRhTGlzdCIsImdldExheWVyTmFtZSIsInNldExheWVyTmFtZSIsImxheWVyTmFtZSIsImdldFByb3BlcnR5IiwicHJvcGVydHlOYW1lIiwiX3Byb3BlcnRpZXMiLCJnZXRQb3NpdGlvbkF0IiwicG9zIiwidW5kZWZpbmVkIiwiTWF0aCIsImZsb29yIiwicmV0IiwiVGlsZWRNYXAiLCJPcmllbnRhdGlvbiIsIk9SVEhPIiwiX3Bvc2l0aW9uRm9yT3J0aG9BdCIsIklTTyIsIl9wb3NpdGlvbkZvcklzb0F0IiwiSEVYIiwiX3Bvc2l0aW9uRm9ySGV4QXQiLCJfaXNJbnZhbGlkUG9zaXRpb24iLCJfbGF5ZXJTaXplIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJnaWRBbmRGbGFncyIsImdpZCIsIlRpbGVGbGFnIiwiRkxJUFBFRF9NQVNLIiwidGlsZXNldCIsIm9mZnNldCIsInRpbGVPZmZzZXQiLCJfbWFwVGlsZVNpemUiLCJ0aWxlV2lkdGgiLCJ0aWxlSGVpZ2h0Iiwicm93cyIsIm9kZF9ldmVuIiwiX3N0YWdnZXJJbmRleCIsIlN0YWdnZXJJbmRleCIsIlNUQUdHRVJJTkRFWF9PREQiLCJkaWZmWCIsImRpZmZZIiwiX3N0YWdnZXJBeGlzIiwiU3RhZ2dlckF4aXMiLCJTVEFHR0VSQVhJU19ZIiwiX2hleFNpZGVMZW5ndGgiLCJTVEFHR0VSQVhJU19YIiwic2V0VGlsZXNHSURBdCIsImdpZHMiLCJiZWdpbkNvbCIsImJlZ2luUm93IiwidG90YWxDb2xzIiwiZ2lkc0lkeCIsImVuZENvbCIsIl91cGRhdGVUaWxlRm9yR0lEIiwic2V0VGlsZUdJREF0IiwicG9zT3JYIiwiZmxhZ3NPclkiLCJmbGFncyIsIkVycm9yIiwiVmVjMiIsInVnaWQiLCJsb2dJRCIsImZpcnN0R2lkIiwiaWR4Iiwib2xkR0lEQW5kRmxhZ3MiLCJncmlkIiwidGlsZXNldElkeCIsInRleElkIiwiX3VwZGF0ZVZlcnRleCIsIl9idWlsZE1hdGVyaWFsIiwiZ2V0VGlsZUdJREF0IiwidGlsZSIsImdldFRpbGVGbGFnc0F0IiwiRkxJUFBFRF9BTEwiLCJfc2V0Q3VsbGluZ0RpcnR5IiwiX2lzQ3VsbGluZ0RpcnR5IiwiX3VwZGF0ZVZpZXdQb3J0IiwicmVzZXJ2ZUxpbmUiLCJ2cHgiLCJfb2Zmc2V0IiwidnB5IiwibGVmdERvd25YIiwibGVmdERvd25ZIiwicmlnaHRUb3BYIiwicmlnaHRUb3BZIiwicmVzdWx0IiwibWFwdHciLCJtYXB0aCIsIm1hcHR3MiIsIm1hcHRoMiIsImRpZmZYMiIsImRpZmZZMiIsImF4aXMiLCJjb2xzIiwiX2RpZmZZMSIsIl9vZGRfZXZlbiIsIl9kaWZmWDEiLCJfdXBkYXRlQ3VsbGluZyIsIkNDX0VESVRPUiIsIl91cGRhdGVXb3JsZE1hdHJpeCIsIk1hdDQiLCJpbnZlcnQiLCJfd29ybGRNYXRyaXgiLCJyZWN0IiwidmlzaWJsZVJlY3QiLCJjYW1lcmEiLCJDYW1lcmEiLCJmaW5kQ2FtZXJhIiwiZ2V0U2NyZWVuVG9Xb3JsZFBvaW50IiwidHJhbnNmb3JtTWF0NCIsImdldExheWVyT3JpZW50YXRpb24iLCJnZXRQcm9wZXJ0aWVzIiwidmVydGljZXMiLCJsYXllck9yaWVudGF0aW9uIiwidGlsZXMiLCJncmlkcyIsImxlZnQiLCJib3R0b20iLCJkaWZmWDEiLCJkaWZmWTEiLCJjdWxsaW5nQ29sIiwiY3VsbGluZ1JvdyIsImdyaWRHSUQiLCJ0b3BCb3JkZXIiLCJkb3duQm9yZGVyIiwibGVmdEJvcmRlciIsInJpZ2h0Qm9yZGVyIiwibWluQ29sIiwibWF4Q29sIiwiX3RpbGVTaXplIiwiX3VwZGF0ZVZlcnRpY2VzIiwiZ2V0VGlsZWRUaWxlQXQiLCJmb3JjZUNyZWF0ZSIsIlRpbGVkVGlsZSIsIl94IiwiX3kiLCJfbGF5ZXIiLCJfdXBkYXRlSW5mbyIsInNldFRpbGVkVGlsZUF0IiwidGlsZWRUaWxlIiwic29tZSIsInRpbGVkTm9kZSIsImdldFRleHR1cmUiLCJnZXRUZXh0dXJlcyIsInNldFRleHR1cmUiLCJ0ZXh0dXJlIiwic2V0VGV4dHVyZXMiLCJ0ZXh0dXJlcyIsImdldExheWVyU2l6ZSIsImdldE1hcFRpbGVTaXplIiwiZ2V0VGlsZVNldCIsImdldFRpbGVTZXRzIiwic2V0VGlsZVNldCIsInNldFRpbGVTZXRzIiwidGlsZXNldHMiLCJ0ZXhHcmlkcyIsImkiLCJzb3VyY2VJbWFnZSIsImxvYWRBbGxUZXh0dXJlcyIsImwiLCJ0aWxlc2V0SW5mbyIsImZpbGxUZXh0dXJlR3JpZHMiLCJfcHJlcGFyZVRvUmVuZGVyIiwiYmluZCIsIl90cmF2ZXJzZUFsbEdyaWQiLCJ0aWxlc2V0SW5kZXhBcnIiLCJ0aWxlc2V0SW5kZXhUb0FyckluZGV4IiwiZXJyb3IiLCJfaW5pdCIsImxheWVySW5mbyIsIm1hcEluZm8iLCJzaXplIiwicHJvcGVydGllcyIsIl9taW5HSUQiLCJfbWF4R0lEIiwiX29wYWNpdHkiLCJfcmVuZGVyT3JkZXIiLCJyZW5kZXJPcmRlciIsImdldFN0YWdnZXJBeGlzIiwiZ2V0U3RhZ2dlckluZGV4IiwiZ2V0SGV4U2lkZUxlbmd0aCIsImdldFRpbGVBbmltYXRpb25zIiwib3JpZW50YXRpb24iLCJnZXRUaWxlU2l6ZSIsImxheWVyVyIsImxheWVySCIsInNldENvbnRlbnRTaXplIiwid2giLCJfdXNlQXV0b21hdGljVmVydGV4WiIsIl92ZXJ0ZXhadmFsdWUiLCJ0ZXhJZE1hdElkeCIsIm1hdGVyaWFsIiwiX21hdGVyaWFscyIsImdldEJ1aWx0aW5NYXRlcmlhbCIsIk1hdGVyaWFsVmFyaWFudCIsImNyZWF0ZSIsImRlZmluZSIsInNldFByb3BlcnR5IiwiZGlzYWJsZVJlbmRlciIsIm1hdExlbiIsIm1hcmtGb3JSZW5kZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBNkJBOztBQUNBOzs7O0FBOUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLElBQU1BLGVBQWUsR0FBR0MsT0FBTyxDQUFDLHNDQUFELENBQS9COztBQUNBLElBQU1DLFFBQVEsR0FBR0QsT0FBTyxDQUFDLG9DQUFELENBQXhCOztBQUNBLElBQU1FLFVBQVUsR0FBR0YsT0FBTyxDQUFDLDhCQUFE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QUFqQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IFJlbmRlckNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2NvcmUvY29tcG9uZW50cy9DQ1JlbmRlckNvbXBvbmVudCcpO1xuY29uc3QgTWF0ZXJpYWwgPSByZXF1aXJlKCcuLi9jb3JlL2Fzc2V0cy9tYXRlcmlhbC9DQ01hdGVyaWFsJyk7XG5jb25zdCBSZW5kZXJGbG93ID0gcmVxdWlyZSgnLi4vY29yZS9yZW5kZXJlci9yZW5kZXItZmxvdycpO1xuXG5pbXBvcnQgeyBNYXQ0LCBWZWMyIH0gZnJvbSAnLi4vY29yZS92YWx1ZS10eXBlcyc7XG5pbXBvcnQgTWF0ZXJpYWxWYXJpYW50IGZyb20gJy4uL2NvcmUvYXNzZXRzL21hdGVyaWFsL21hdGVyaWFsLXZhcmlhbnQnO1xubGV0IF9tYXQ0X3RlbXAgPSBjYy5tYXQ0KCk7XG5sZXQgX3ZlYzJfdGVtcCA9IGNjLnYyKCk7XG5sZXQgX3ZlYzJfdGVtcDIgPSBjYy52MigpO1xubGV0IF92ZWMyX3RlbXAzID0gY2MudjIoKTtcbmxldCBfdGVtcFJvd0NvbCA9IHtyb3c6MCwgY29sOjB9O1xuXG5sZXQgVGlsZWRVc2VyTm9kZURhdGEgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlRpbGVkVXNlck5vZGVEYXRhJyxcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBjdG9yICgpIHtcbiAgICAgICAgdGhpcy5faW5kZXggPSAtMTtcbiAgICAgICAgdGhpcy5fcm93ID0gLTE7XG4gICAgICAgIHRoaXMuX2NvbCA9IC0xO1xuICAgICAgICB0aGlzLl90aWxlZExheWVyID0gbnVsbDtcbiAgICB9XG5cbn0pO1xuXG4vKipcbiAqICEjZW4gUmVuZGVyIHRoZSBUTVggbGF5ZXIuXG4gKiAhI3poIOa4suafkyBUTVggbGF5ZXLjgIJcbiAqIEBjbGFzcyBUaWxlZExheWVyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcbiAqL1xubGV0IFRpbGVkTGF5ZXIgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlRpbGVkTGF5ZXInLFxuXG4gICAgLy8gSW5oZXJpdHMgZnJvbSB0aGUgYWJzdHJhY3QgY2xhc3MgZGlyZWN0bHksXG4gICAgLy8gYmVjYXVzZSBUaWxlZExheWVyIG5vdCBjcmVhdGUgb3IgbWFpbnRhaW5zIHRoZSBzZ05vZGUgYnkgaXRzZWxmLlxuICAgIGV4dGVuZHM6IFJlbmRlckNvbXBvbmVudCxcblxuICAgIGVkaXRvcjoge1xuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL3RpbGVkLWxheWVyLmpzJyxcbiAgICB9LFxuXG4gICAgY3RvciAoKSB7XG4gICAgICAgIHRoaXMuX3VzZXJOb2RlR3JpZCA9IHt9Oy8vIFtyb3ddW2NvbF0gPSB7Y291bnQ6IDAsIG5vZGVzTGlzdDogW119O1xuICAgICAgICB0aGlzLl91c2VyTm9kZU1hcCA9IHt9Oy8vIFtpZF0gPSBub2RlO1xuICAgICAgICB0aGlzLl91c2VyTm9kZURpcnR5ID0gZmFsc2U7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIGxheWVyIHRpbGVzIG5vZGUsIGluZGV4IGlzIGNhY3VsYXRlZCBieSAneCArIHdpZHRoICogeScsIGZvcm1hdCBsaWtlcyAnWzBdPXRpbGVOb2RlMCxbMV09dGlsZU5vZGUxLCAuLi4nXG4gICAgICAgIHRoaXMuX3RpbGVkVGlsZXMgPSBbXTtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgbGF5ZXIgdGlsZXNldHMgaW5kZXggYXJyYXlcbiAgICAgICAgdGhpcy5fdGlsZXNldEluZGV4QXJyID0gW107XG4gICAgICAgIC8vIHRpbGVzZXQgaW5kZXggdG8gYXJyYXkgaW5kZXhcbiAgICAgICAgdGhpcy5fdGlsZXNldEluZGV4VG9BcnJJbmRleCA9IHt9O1xuICAgICAgICAvLyB0ZXh0dXJlIGlkIHRvIG1hdGVyaWFsIGluZGV4XG4gICAgICAgIHRoaXMuX3RleElkVG9NYXRJbmRleCA9IHt9O1xuXG4gICAgICAgIHRoaXMuX3ZpZXdQb3J0ID0ge3g6LTEsIHk6LTEsIHdpZHRoOi0xLCBoZWlnaHQ6LTF9O1xuICAgICAgICB0aGlzLl9jdWxsaW5nUmVjdCA9IHtcbiAgICAgICAgICAgIGxlZnREb3duOntyb3c6LTEsIGNvbDotMX0sXG4gICAgICAgICAgICByaWdodFRvcDp7cm93Oi0xLCBjb2w6LTF9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2N1bGxpbmdEaXJ0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuX3JpZ2h0VG9wID0ge3JvdzotMSwgY29sOi0xfTtcblxuICAgICAgICB0aGlzLl9sYXllckluZm8gPSBudWxsO1xuICAgICAgICB0aGlzLl9tYXBJbmZvID0gbnVsbDtcblxuICAgICAgICAvLyByZWNvcmQgbWF4IG9yIG1pbiB0aWxlIHRleHR1cmUgb2Zmc2V0LCBcbiAgICAgICAgLy8gaXQgd2lsbCBtYWtlIGN1bGxpbmcgcmVjdCBtb3JlIGxhcmdlLCB3aGljaCBpbnN1cmUgY3VsbGluZyByZWN0IGNvcnJlY3QuXG4gICAgICAgIHRoaXMuX3RvcE9mZnNldCA9IDA7XG4gICAgICAgIHRoaXMuX2Rvd25PZmZzZXQgPSAwO1xuICAgICAgICB0aGlzLl9sZWZ0T2Zmc2V0ID0gMDtcbiAgICAgICAgdGhpcy5fcmlnaHRPZmZzZXQgPSAwO1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBsYXllciB0aWxlcywgaW5kZXggaXMgY2FjdWxhdGVkIGJ5ICd4ICsgd2lkdGggKiB5JywgZm9ybWF0IGxpa2VzICdbMF09Z2lkMCxbMV09Z2lkMSwgLi4uJ1xuICAgICAgICB0aGlzLl90aWxlcyA9IFtdO1xuICAgICAgICAvLyB2ZXJ0ZXggYXJyYXlcbiAgICAgICAgdGhpcy5fdmVydGljZXMgPSBbXTtcbiAgICAgICAgLy8gdmVydGljZXMgZGlydHlcbiAgICAgICAgdGhpcy5fdmVydGljZXNEaXJ0eSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5fbGF5ZXJOYW1lID0gJyc7XG4gICAgICAgIHRoaXMuX2xheWVyT3JpZW50YXRpb24gPSBudWxsO1xuXG4gICAgICAgIC8vIHN0b3JlIGFsbCBsYXllciBnaWQgY29ycmVzcG9uZGluZyB0ZXh0dXJlIGluZm8sIGluZGV4IGlzIGdpZCwgZm9ybWF0IGxpa2VzICdbZ2lkMF09dGV4LWluZm8sW2dpZDFdPXRleC1pbmZvLCAuLi4nXG4gICAgICAgIHRoaXMuX3RleEdyaWRzID0gbnVsbDtcbiAgICAgICAgLy8gc3RvcmUgYWxsIHRpbGVzZXQgdGV4dHVyZSwgaW5kZXggaXMgdGlsZXNldCBpbmRleCwgZm9ybWF0IGxpa2VzICdbMF09dGV4dHVyZTAsIFsxXT10ZXh0dXJlMSwgLi4uJ1xuICAgICAgICB0aGlzLl90ZXh0dXJlcyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3RpbGVzZXRzID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9sZWZ0RG93blRvQ2VudGVyWCA9IDA7XG4gICAgICAgIHRoaXMuX2xlZnREb3duVG9DZW50ZXJZID0gMDtcblxuICAgICAgICB0aGlzLl9oYXNUaWxlZE5vZGVHcmlkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2hhc0FuaUdyaWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9ucyA9IG51bGw7XG5cbiAgICAgICAgLy8gc3dpdGNoIG9mIGN1bGxpbmdcbiAgICAgICAgdGhpcy5fZW5hYmxlQ3VsbGluZyA9IGNjLm1hY3JvLkVOQUJMRV9USUxFRE1BUF9DVUxMSU5HO1xuICAgIH0sXG5cbiAgICBfaGFzVGlsZWROb2RlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc1RpbGVkTm9kZUdyaWQ7XG4gICAgfSxcblxuICAgIF9oYXNBbmltYXRpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGFzQW5pR3JpZDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBlbmFibGUgb3IgZGlzYWJsZSBjdWxsaW5nXG4gICAgICogISN6aCDlvIDlkK/miJblhbPpl63oo4HliarjgIJcbiAgICAgKiBAbWV0aG9kIGVuYWJsZUN1bGxpbmdcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBlbmFibGVDdWxsaW5nICh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5fZW5hYmxlQ3VsbGluZyAhPSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fZW5hYmxlQ3VsbGluZyA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fY3VsbGluZ0RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEFkZHMgdXNlcidzIG5vZGUgaW50byBsYXllci5cbiAgICAgKiAhI3poIOa3u+WKoOeUqOaIt+iKgueCueOAglxuICAgICAqIEBtZXRob2QgYWRkVXNlck5vZGVcbiAgICAgKiBAcGFyYW0ge2NjLk5vZGV9IG5vZGVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGFkZFVzZXJOb2RlIChub2RlKSB7XG4gICAgICAgIGxldCBkYXRhQ29tcCA9IG5vZGUuZ2V0Q29tcG9uZW50KFRpbGVkVXNlck5vZGVEYXRhKTtcbiAgICAgICAgaWYgKGRhdGFDb21wKSB7XG4gICAgICAgICAgICBjYy53YXJuKFwiQ0NUaWxlZExheWVyOmFkZFVzZXJOb2RlIG5vZGUgaGFzIGJlZW4gYWRkZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRhQ29tcCA9IG5vZGUuYWRkQ29tcG9uZW50KFRpbGVkVXNlck5vZGVEYXRhKTtcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgIG5vZGUuX3JlbmRlckZsYWcgfD0gUmVuZGVyRmxvdy5GTEFHX0JSRUFLX0ZMT1c7XG4gICAgICAgIHRoaXMuX3VzZXJOb2RlTWFwW25vZGUuX2lkXSA9IGRhdGFDb21wO1xuXG4gICAgICAgIGRhdGFDb21wLl9yb3cgPSAtMTtcbiAgICAgICAgZGF0YUNvbXAuX2NvbCA9IC0xO1xuICAgICAgICBkYXRhQ29tcC5fdGlsZWRMYXllciA9IHRoaXM7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9ub2RlTG9jYWxQb3NUb0xheWVyUG9zKG5vZGUsIF92ZWMyX3RlbXApO1xuICAgICAgICB0aGlzLl9wb3NpdGlvblRvUm93Q29sKF92ZWMyX3RlbXAueCwgX3ZlYzJfdGVtcC55LCBfdGVtcFJvd0NvbCk7XG4gICAgICAgIHRoaXMuX2FkZFVzZXJOb2RlVG9HcmlkKGRhdGFDb21wLCBfdGVtcFJvd0NvbCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUN1bGxpbmdPZmZzZXRCeVVzZXJOb2RlKG5vZGUpO1xuICAgICAgICBub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsIHRoaXMuX3VzZXJOb2RlUG9zQ2hhbmdlLCBkYXRhQ29tcCk7XG4gICAgICAgIG5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0aGlzLl91c2VyTm9kZVNpemVDaGFuZ2UsIGRhdGFDb21wKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmVtb3ZlcyB1c2VyJ3Mgbm9kZS5cbiAgICAgKiAhI3poIOenu+mZpOeUqOaIt+iKgueCueOAglxuICAgICAqIEBtZXRob2QgcmVtb3ZlVXNlck5vZGVcbiAgICAgKiBAcGFyYW0ge2NjLk5vZGV9IG5vZGVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIHJlbW92ZVVzZXJOb2RlIChub2RlKSB7XG4gICAgICAgIGxldCBkYXRhQ29tcCA9IG5vZGUuZ2V0Q29tcG9uZW50KFRpbGVkVXNlck5vZGVEYXRhKTtcbiAgICAgICAgaWYgKCFkYXRhQ29tcCkge1xuICAgICAgICAgICAgY2Mud2FybihcIkNDVGlsZWRMYXllcjpyZW1vdmVVc2VyTm9kZSBub2RlIGlzIG5vdCBleGlzdFwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELCB0aGlzLl91c2VyTm9kZVBvc0NoYW5nZSwgZGF0YUNvbXApO1xuICAgICAgICBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5TSVpFX0NIQU5HRUQsIHRoaXMuX3VzZXJOb2RlU2l6ZUNoYW5nZSwgZGF0YUNvbXApO1xuICAgICAgICB0aGlzLl9yZW1vdmVVc2VyTm9kZUZyb21HcmlkKGRhdGFDb21wKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX3VzZXJOb2RlTWFwW25vZGUuX2lkXTtcbiAgICAgICAgbm9kZS5fcmVtb3ZlQ29tcG9uZW50KGRhdGFDb21wKTtcbiAgICAgICAgZGF0YUNvbXAuZGVzdHJveSgpO1xuICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQodHJ1ZSk7XG4gICAgICAgIG5vZGUuX3JlbmRlckZsYWcgJj0gflJlbmRlckZsb3cuRkxBR19CUkVBS19GTE9XO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBEZXN0cm95IHVzZXIncyBub2RlLlxuICAgICAqICEjemgg6ZSA5q+B55So5oi36IqC54K544CCXG4gICAgICogQG1ldGhvZCBkZXN0cm95VXNlck5vZGVcbiAgICAgKiBAcGFyYW0ge2NjLk5vZGV9IG5vZGVcbiAgICAgKi9cbiAgICBkZXN0cm95VXNlck5vZGUgKG5vZGUpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVVc2VyTm9kZShub2RlKTtcbiAgICAgICAgbm9kZS5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIC8vIGFjb3JkaW5nIGxheWVyIGFuY2hvciBwb2ludCB0byBjYWxjdWxhdGUgbm9kZSBsYXllciBwb3NcbiAgICBfbm9kZUxvY2FsUG9zVG9MYXllclBvcyAobm9kZVBvcywgb3V0KSB7XG4gICAgICAgIG91dC54ID0gbm9kZVBvcy54ICsgdGhpcy5fbGVmdERvd25Ub0NlbnRlclg7XG4gICAgICAgIG91dC55ID0gbm9kZVBvcy55ICsgdGhpcy5fbGVmdERvd25Ub0NlbnRlclk7XG4gICAgfSxcblxuICAgIF9nZXROb2Rlc0J5Um93Q29sIChyb3csIGNvbCkge1xuICAgICAgICBsZXQgcm93RGF0YSA9IHRoaXMuX3VzZXJOb2RlR3JpZFtyb3ddO1xuICAgICAgICBpZiAoIXJvd0RhdGEpIHJldHVybiBudWxsO1xuICAgICAgICByZXR1cm4gcm93RGF0YVtjb2xdO1xuICAgIH0sXG5cbiAgICBfZ2V0Tm9kZXNDb3VudEJ5Um93IChyb3cpIHtcbiAgICAgICAgbGV0IHJvd0RhdGEgPSB0aGlzLl91c2VyTm9kZUdyaWRbcm93XTtcbiAgICAgICAgaWYgKCFyb3dEYXRhKSByZXR1cm4gMDtcbiAgICAgICAgcmV0dXJuIHJvd0RhdGEuY291bnQ7XG4gICAgfSxcblxuICAgIF91cGRhdGVBbGxVc2VyTm9kZSAoKSB7XG4gICAgICAgIHRoaXMuX3VzZXJOb2RlR3JpZCA9IHt9O1xuICAgICAgICBmb3IgKGxldCBkYXRhSWQgaW4gdGhpcy5fdXNlck5vZGVNYXApIHtcbiAgICAgICAgICAgIGxldCBkYXRhQ29tcCA9IHRoaXMuX3VzZXJOb2RlTWFwW2RhdGFJZF07XG4gICAgICAgICAgICB0aGlzLl9ub2RlTG9jYWxQb3NUb0xheWVyUG9zKGRhdGFDb21wLm5vZGUsIF92ZWMyX3RlbXApO1xuICAgICAgICAgICAgdGhpcy5fcG9zaXRpb25Ub1Jvd0NvbChfdmVjMl90ZW1wLngsIF92ZWMyX3RlbXAueSwgX3RlbXBSb3dDb2wpO1xuICAgICAgICAgICAgdGhpcy5fYWRkVXNlck5vZGVUb0dyaWQoZGF0YUNvbXAsIF90ZW1wUm93Q29sKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUN1bGxpbmdPZmZzZXRCeVVzZXJOb2RlKGRhdGFDb21wLm5vZGUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF91cGRhdGVDdWxsaW5nT2Zmc2V0QnlVc2VyTm9kZSAobm9kZSkge1xuICAgICAgICBpZiAodGhpcy5fdG9wT2Zmc2V0IDwgbm9kZS5oZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuX3RvcE9mZnNldCA9IG5vZGUuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9kb3duT2Zmc2V0IDwgbm9kZS5oZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2Rvd25PZmZzZXQgPSBub2RlLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbGVmdE9mZnNldCA8IG5vZGUud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZnRPZmZzZXQgPSBub2RlLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9yaWdodE9mZnNldCA8IG5vZGUud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuX3JpZ2h0T2Zmc2V0ID0gbm9kZS53aWR0aDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdXNlck5vZGVTaXplQ2hhbmdlICgpIHtcbiAgICAgICAgbGV0IGRhdGFDb21wID0gdGhpcztcbiAgICAgICAgbGV0IG5vZGUgPSBkYXRhQ29tcC5ub2RlO1xuICAgICAgICBsZXQgc2VsZiA9IGRhdGFDb21wLl90aWxlZExheWVyO1xuICAgICAgICBzZWxmLl91cGRhdGVDdWxsaW5nT2Zmc2V0QnlVc2VyTm9kZShub2RlKTtcbiAgICB9LFxuXG4gICAgX3VzZXJOb2RlUG9zQ2hhbmdlICgpIHtcbiAgICAgICAgbGV0IGRhdGFDb21wID0gdGhpcztcbiAgICAgICAgbGV0IG5vZGUgPSBkYXRhQ29tcC5ub2RlO1xuICAgICAgICBsZXQgc2VsZiA9IGRhdGFDb21wLl90aWxlZExheWVyO1xuICAgICAgICBzZWxmLl9ub2RlTG9jYWxQb3NUb0xheWVyUG9zKG5vZGUsIF92ZWMyX3RlbXApO1xuICAgICAgICBzZWxmLl9wb3NpdGlvblRvUm93Q29sKF92ZWMyX3RlbXAueCwgX3ZlYzJfdGVtcC55LCBfdGVtcFJvd0NvbCk7XG4gICAgICAgIHNlbGYuX2xpbWl0SW5MYXllcihfdGVtcFJvd0NvbCk7XG4gICAgICAgIC8vIHVzZXJzIHBvcyBub3QgY2hhbmdlXG4gICAgICAgIGlmIChfdGVtcFJvd0NvbC5yb3cgPT09IGRhdGFDb21wLl9yb3cgJiYgX3RlbXBSb3dDb2wuY29sID09PSBkYXRhQ29tcC5fY29sKSByZXR1cm47XG5cbiAgICAgICAgc2VsZi5fcmVtb3ZlVXNlck5vZGVGcm9tR3JpZChkYXRhQ29tcCk7XG4gICAgICAgIHNlbGYuX2FkZFVzZXJOb2RlVG9HcmlkKGRhdGFDb21wLCBfdGVtcFJvd0NvbCk7XG4gICAgfSxcblxuICAgIF9yZW1vdmVVc2VyTm9kZUZyb21HcmlkIChkYXRhQ29tcCkge1xuICAgICAgICBsZXQgcm93ID0gZGF0YUNvbXAuX3JvdztcbiAgICAgICAgbGV0IGNvbCA9IGRhdGFDb21wLl9jb2w7XG4gICAgICAgIGxldCBpbmRleCA9IGRhdGFDb21wLl9pbmRleDtcblxuICAgICAgICBsZXQgcm93RGF0YSA9IHRoaXMuX3VzZXJOb2RlR3JpZFtyb3ddO1xuICAgICAgICBsZXQgY29sRGF0YSA9IHJvd0RhdGEgJiYgcm93RGF0YVtjb2xdO1xuICAgICAgICBpZiAoY29sRGF0YSkge1xuICAgICAgICAgICAgcm93RGF0YS5jb3VudCAtLTtcbiAgICAgICAgICAgIGNvbERhdGEuY291bnQgLS07XG4gICAgICAgICAgICBjb2xEYXRhLmxpc3RbaW5kZXhdID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChjb2xEYXRhLmNvdW50IDw9IDApIHtcbiAgICAgICAgICAgICAgICBjb2xEYXRhLmxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICBjb2xEYXRhLmNvdW50ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGFDb21wLl9yb3cgPSAtMTtcbiAgICAgICAgZGF0YUNvbXAuX2NvbCA9IC0xO1xuICAgICAgICBkYXRhQ29tcC5faW5kZXggPSAtMTtcbiAgICAgICAgdGhpcy5fdXNlck5vZGVEaXJ0eSA9IHRydWU7XG4gICAgfSxcblxuICAgIF9saW1pdEluTGF5ZXIgKHJvd0NvbCkge1xuICAgICAgICBsZXQgcm93ID0gcm93Q29sLnJvdztcbiAgICAgICAgbGV0IGNvbCA9IHJvd0NvbC5jb2w7XG4gICAgICAgIGlmIChyb3cgPCAwKSByb3dDb2wucm93ID0gMDtcbiAgICAgICAgaWYgKHJvdyA+IHRoaXMuX3JpZ2h0VG9wLnJvdykgcm93Q29sLnJvdyA9IHRoaXMuX3JpZ2h0VG9wLnJvdztcbiAgICAgICAgaWYgKGNvbCA8IDApIHJvd0NvbC5jb2wgPSAwO1xuICAgICAgICBpZiAoY29sID4gdGhpcy5fcmlnaHRUb3AuY29sKSByb3dDb2wuY29sID0gdGhpcy5fcmlnaHRUb3AuY29sO1xuICAgIH0sXG5cbiAgICBfYWRkVXNlck5vZGVUb0dyaWQgKGRhdGFDb21wLCB0ZW1wUm93Q29sKSB7XG4gICAgICAgIGxldCByb3cgPSB0ZW1wUm93Q29sLnJvdztcbiAgICAgICAgbGV0IGNvbCA9IHRlbXBSb3dDb2wuY29sO1xuICAgICAgICBsZXQgcm93RGF0YSA9IHRoaXMuX3VzZXJOb2RlR3JpZFtyb3ddID0gdGhpcy5fdXNlck5vZGVHcmlkW3Jvd10gfHwge2NvdW50IDogMH07XG4gICAgICAgIGxldCBjb2xEYXRhID0gcm93RGF0YVtjb2xdID0gcm93RGF0YVtjb2xdIHx8IHtjb3VudCA6IDAsIGxpc3Q6IFtdfTtcbiAgICAgICAgZGF0YUNvbXAuX3JvdyA9IHJvdztcbiAgICAgICAgZGF0YUNvbXAuX2NvbCA9IGNvbDtcbiAgICAgICAgZGF0YUNvbXAuX2luZGV4ID0gY29sRGF0YS5saXN0Lmxlbmd0aDtcbiAgICAgICAgcm93RGF0YS5jb3VudCsrO1xuICAgICAgICBjb2xEYXRhLmNvdW50Kys7XG4gICAgICAgIGNvbERhdGEubGlzdC5wdXNoKGRhdGFDb21wKTtcbiAgICAgICAgdGhpcy5fdXNlck5vZGVEaXJ0eSA9IHRydWU7XG4gICAgfSxcblxuICAgIF9pc1VzZXJOb2RlRGlydHkgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlck5vZGVEaXJ0eTtcbiAgICB9LFxuXG4gICAgX3NldFVzZXJOb2RlRGlydHkgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3VzZXJOb2RlRGlydHkgPSB2YWx1ZTtcbiAgICB9LFxuXG4gICAgb25FbmFibGUgKCkge1xuICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQsIHRoaXMuX3N5bmNBbmNob3JQb2ludCwgdGhpcyk7XG4gICAgICAgIHRoaXMuX2FjdGl2YXRlTWF0ZXJpYWwoKTtcbiAgICB9LFxuXG4gICAgb25EaXNhYmxlICgpIHtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgdGhpcy5fc3luY0FuY2hvclBvaW50LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgX3N5bmNBbmNob3JQb2ludCAoKSB7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy5ub2RlO1xuICAgICAgICB0aGlzLl9sZWZ0RG93blRvQ2VudGVyWCA9IG5vZGUud2lkdGggKiBub2RlLmFuY2hvclggKiBub2RlLnNjYWxlWDtcbiAgICAgICAgdGhpcy5fbGVmdERvd25Ub0NlbnRlclkgPSBub2RlLmhlaWdodCAqIG5vZGUuYW5jaG9yWSAqIG5vZGUuc2NhbGVZO1xuICAgICAgICB0aGlzLl9jdWxsaW5nRGlydHkgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3kgKCkge1xuICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICBpZiAodGhpcy5fYnVmZmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9idWZmZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZW5kZXJEYXRhTGlzdCA9IG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0cyB0aGUgbGF5ZXIgbmFtZS5cbiAgICAgKiAhI3poIOiOt+WPluWxgueahOWQjeensOOAglxuICAgICAqIEBtZXRob2QgZ2V0TGF5ZXJOYW1lXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGV0IGxheWVyTmFtZSA9IHRpbGVkTGF5ZXIuZ2V0TGF5ZXJOYW1lKCk7XG4gICAgICogY2MubG9nKGxheWVyTmFtZSk7XG4gICAgICovXG4gICAgZ2V0TGF5ZXJOYW1lICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheWVyTmFtZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgdGhlIGxheWVyIG5hbWUuXG4gICAgICogISN6aCDorr7nva7lsYLnmoTlkI3np7BcbiAgICAgKiBAbWV0aG9kIFNldExheWVyTmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsYXllck5hbWVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHRpbGVkTGF5ZXIuc2V0TGF5ZXJOYW1lKFwiTmV3IExheWVyXCIpO1xuICAgICAqL1xuICAgIHNldExheWVyTmFtZSAobGF5ZXJOYW1lKSB7XG4gICAgICAgIHRoaXMuX2xheWVyTmFtZSA9IGxheWVyTmFtZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm4gdGhlIHZhbHVlIGZvciB0aGUgc3BlY2lmaWMgcHJvcGVydHkgbmFtZS5cbiAgICAgKiAhI3poIOiOt+WPluaMh+WumuWxnuaAp+WQjeeahOWAvOOAglxuICAgICAqIEBtZXRob2QgZ2V0UHJvcGVydHlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlOYW1lXG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBwcm9wZXJ0eSA9IHRpbGVkTGF5ZXIuZ2V0UHJvcGVydHkoXCJpbmZvXCIpO1xuICAgICAqIGNjLmxvZyhwcm9wZXJ0eSk7XG4gICAgICovXG4gICAgZ2V0UHJvcGVydHkgKHByb3BlcnR5TmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllc1twcm9wZXJ0eU5hbWVdO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIHBvc2l0aW9uIGluIHBpeGVscyBvZiBhIGdpdmVuIHRpbGUgY29vcmRpbmF0ZS5cbiAgICAgKiAhI3poIOiOt+WPluaMh+WumiB0aWxlIOeahOWDj+e0oOWdkOagh+OAglxuICAgICAqIEBtZXRob2QgZ2V0UG9zaXRpb25BdFxuICAgICAqIEBwYXJhbSB7VmVjMnxOdW1iZXJ9IHBvcyBwb3NpdGlvbiBvciB4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt5XVxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBsZXQgcG9zID0gdGlsZWRMYXllci5nZXRQb3NpdGlvbkF0KGNjLnYyKDAsIDApKTtcbiAgICAgKiBjYy5sb2coXCJQb3M6IFwiICsgcG9zKTtcbiAgICAgKiBsZXQgcG9zID0gdGlsZWRMYXllci5nZXRQb3NpdGlvbkF0KDAsIDApO1xuICAgICAqIGNjLmxvZyhcIlBvczogXCIgKyBwb3MpO1xuICAgICAqL1xuICAgIGdldFBvc2l0aW9uQXQgKHBvcywgeSkge1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgaWYgKHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IocG9zKTtcbiAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKHkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IocG9zLngpO1xuICAgICAgICAgICAgeSA9IE1hdGguZmxvb3IocG9zLnkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcmV0O1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX2xheWVyT3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgY2MuVGlsZWRNYXAuT3JpZW50YXRpb24uT1JUSE86XG4gICAgICAgICAgICAgICAgcmV0ID0gdGhpcy5fcG9zaXRpb25Gb3JPcnRob0F0KHgsIHkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjYy5UaWxlZE1hcC5PcmllbnRhdGlvbi5JU086XG4gICAgICAgICAgICAgICAgcmV0ID0gdGhpcy5fcG9zaXRpb25Gb3JJc29BdCh4LCB5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY2MuVGlsZWRNYXAuT3JpZW50YXRpb24uSEVYOlxuICAgICAgICAgICAgICAgIHJldCA9IHRoaXMuX3Bvc2l0aW9uRm9ySGV4QXQoeCwgeSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgX2lzSW52YWxpZFBvc2l0aW9uICh4LCB5KSB7XG4gICAgICAgIGlmICh4ICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgbGV0IHBvcyA9IHg7XG4gICAgICAgICAgICB5ID0gcG9zLnk7XG4gICAgICAgICAgICB4ID0gcG9zLng7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHggPj0gdGhpcy5fbGF5ZXJTaXplLndpZHRoIHx8IHkgPj0gdGhpcy5fbGF5ZXJTaXplLmhlaWdodCB8fCB4IDwgMCB8fCB5IDwgMDtcbiAgICB9LFxuXG4gICAgX3Bvc2l0aW9uRm9ySXNvQXQgKHgsIHkpIHtcbiAgICAgICAgbGV0IG9mZnNldFggPSAwLCBvZmZzZXRZID0gMDtcbiAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcih4KSArIE1hdGguZmxvb3IoeSkgKiB0aGlzLl9sYXllclNpemUud2lkdGg7XG4gICAgICAgIGxldCBnaWRBbmRGbGFncyA9IHRoaXMuX3RpbGVzW2luZGV4XTtcbiAgICAgICAgaWYgKGdpZEFuZEZsYWdzKSB7XG4gICAgICAgICAgICBsZXQgZ2lkID0gKChnaWRBbmRGbGFncyAmIGNjLlRpbGVkTWFwLlRpbGVGbGFnLkZMSVBQRURfTUFTSykgPj4+IDApO1xuICAgICAgICAgICAgbGV0IHRpbGVzZXQgPSB0aGlzLl90ZXhHcmlkc1tnaWRdLnRpbGVzZXQ7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gdGlsZXNldC50aWxlT2Zmc2V0O1xuICAgICAgICAgICAgb2Zmc2V0WCA9IG9mZnNldC54O1xuICAgICAgICAgICAgb2Zmc2V0WSA9IG9mZnNldC55O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNjLnYyKFxuICAgICAgICAgICAgdGhpcy5fbWFwVGlsZVNpemUud2lkdGggKiAwLjUgKiAodGhpcy5fbGF5ZXJTaXplLmhlaWdodCArIHggLSB5IC0gMSkgKyBvZmZzZXRYLFxuICAgICAgICAgICAgdGhpcy5fbWFwVGlsZVNpemUuaGVpZ2h0ICogMC41ICogKHRoaXMuX2xheWVyU2l6ZS53aWR0aCAtIHggKyB0aGlzLl9sYXllclNpemUuaGVpZ2h0IC0geSAtIDIpIC0gb2Zmc2V0WVxuICAgICAgICApO1xuICAgIH0sXG5cbiAgICBfcG9zaXRpb25Gb3JPcnRob0F0ICh4LCB5KSB7XG4gICAgICAgIGxldCBvZmZzZXRYID0gMCwgb2Zmc2V0WSA9IDA7XG4gICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoeCkgKyBNYXRoLmZsb29yKHkpICogdGhpcy5fbGF5ZXJTaXplLndpZHRoO1xuICAgICAgICBsZXQgZ2lkQW5kRmxhZ3MgPSB0aGlzLl90aWxlc1tpbmRleF07XG4gICAgICAgIGlmIChnaWRBbmRGbGFncykge1xuICAgICAgICAgICAgbGV0IGdpZCA9ICgoZ2lkQW5kRmxhZ3MgJiBjYy5UaWxlZE1hcC5UaWxlRmxhZy5GTElQUEVEX01BU0spID4+PiAwKTtcbiAgICAgICAgICAgIGxldCB0aWxlc2V0ID0gdGhpcy5fdGV4R3JpZHNbZ2lkXS50aWxlc2V0O1xuICAgICAgICAgICAgbGV0IG9mZnNldCA9IHRpbGVzZXQudGlsZU9mZnNldDtcbiAgICAgICAgICAgIG9mZnNldFggPSBvZmZzZXQueDtcbiAgICAgICAgICAgIG9mZnNldFkgPSBvZmZzZXQueTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjYy52MihcbiAgICAgICAgICAgIHggKiB0aGlzLl9tYXBUaWxlU2l6ZS53aWR0aCArIG9mZnNldFgsXG4gICAgICAgICAgICAodGhpcy5fbGF5ZXJTaXplLmhlaWdodCAtIHkgLSAxKSAqIHRoaXMuX21hcFRpbGVTaXplLmhlaWdodCAtIG9mZnNldFlcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgX3Bvc2l0aW9uRm9ySGV4QXQgKGNvbCwgcm93KSB7XG4gICAgICAgIGxldCB0aWxlV2lkdGggPSB0aGlzLl9tYXBUaWxlU2l6ZS53aWR0aDtcbiAgICAgICAgbGV0IHRpbGVIZWlnaHQgPSB0aGlzLl9tYXBUaWxlU2l6ZS5oZWlnaHQ7XG4gICAgICAgIGxldCByb3dzID0gdGhpcy5fbGF5ZXJTaXplLmhlaWdodDtcblxuICAgICAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKGNvbCkgKyBNYXRoLmZsb29yKHJvdykgKiB0aGlzLl9sYXllclNpemUud2lkdGg7XG4gICAgICAgIGxldCBnaWQgPSB0aGlzLl90aWxlc1tpbmRleF07XG4gICAgICAgIGxldCB0aWxlc2V0ID0gdGhpcy5fdGV4R3JpZHNbZ2lkXS50aWxlc2V0O1xuICAgICAgICBsZXQgb2Zmc2V0ID0gdGlsZXNldC50aWxlT2Zmc2V0O1xuXG4gICAgICAgIGxldCBvZGRfZXZlbiA9ICh0aGlzLl9zdGFnZ2VySW5kZXggPT09IGNjLlRpbGVkTWFwLlN0YWdnZXJJbmRleC5TVEFHR0VSSU5ERVhfT0REKSA/IDEgOiAtMTtcbiAgICAgICAgbGV0IHggPSAwLCB5ID0gMDtcbiAgICAgICAgbGV0IGRpZmZYID0gMDtcbiAgICAgICAgbGV0IGRpZmZZID0gMDtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9zdGFnZ2VyQXhpcykge1xuICAgICAgICAgICAgY2FzZSBjYy5UaWxlZE1hcC5TdGFnZ2VyQXhpcy5TVEFHR0VSQVhJU19ZOlxuICAgICAgICAgICAgICAgIGRpZmZYID0gMDtcbiAgICAgICAgICAgICAgICBpZiAocm93ICUgMiA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBkaWZmWCA9IHRpbGVXaWR0aCAvIDIgKiBvZGRfZXZlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgeCA9IGNvbCAqIHRpbGVXaWR0aCArIGRpZmZYICsgb2Zmc2V0Lng7XG4gICAgICAgICAgICAgICAgeSA9IChyb3dzIC0gcm93IC0gMSkgKiAodGlsZUhlaWdodCAtICh0aWxlSGVpZ2h0IC0gdGhpcy5faGV4U2lkZUxlbmd0aCkgLyAyKSAtIG9mZnNldC55O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjYy5UaWxlZE1hcC5TdGFnZ2VyQXhpcy5TVEFHR0VSQVhJU19YOlxuICAgICAgICAgICAgICAgIGRpZmZZID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoY29sICUgMiA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBkaWZmWSA9IHRpbGVIZWlnaHQgLyAyICogLW9kZF9ldmVuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB4ID0gY29sICogKHRpbGVXaWR0aCAtICh0aWxlV2lkdGggLSB0aGlzLl9oZXhTaWRlTGVuZ3RoKSAvIDIpICsgb2Zmc2V0Lng7XG4gICAgICAgICAgICAgICAgeSA9IChyb3dzIC0gcm93IC0gMSkgKiB0aWxlSGVpZ2h0ICsgZGlmZlkgLSBvZmZzZXQueTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2MudjIoeCwgeSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXRzIHRoZSB0aWxlcyBnaWQgKGdpZCA9IHRpbGUgZ2xvYmFsIGlkKSBhdCBhIGdpdmVuIHRpbGVzIHJlY3QuXG4gICAgICogISN6aFxuICAgICAqIOiuvue9rue7meWumuWMuuWfn+eahCB0aWxlIOeahCBnaWQgKGdpZCA9IHRpbGUg5YWo5bGAIGlkKe+8jFxuICAgICAqIEBtZXRob2Qgc2V0VGlsZXNHSURBdFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGdpZHMgYW4gYXJyYXkgY29udGFpbnMgZ2lkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGJlZ2luQ29sIGJlZ2luIGNvbCBudW1iZXJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYmVnaW5Sb3cgYmVnaW4gcm93IG51bWJlclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0b3RhbENvbHMgY291bnQgb2YgY29sdW1uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB0aWxlZExheWVyLnNldFRpbGVzR0lEQXQoWzEsIDEsIDEsIDFdLCAxMCwgMTAsIDIpXG4gICAgICovXG4gICAgc2V0VGlsZXNHSURBdCAoZ2lkcywgYmVnaW5Db2wsIGJlZ2luUm93LCB0b3RhbENvbHMpIHtcbiAgICAgICAgaWYgKCFnaWRzIHx8IGdpZHMubGVuZ3RoID09PSAwIHx8IHRvdGFsQ29scyA8PSAwKSByZXR1cm47XG4gICAgICAgIGlmIChiZWdpblJvdyA8IDApIGJlZ2luUm93ID0gMDtcbiAgICAgICAgaWYgKGJlZ2luQ29sIDwgMCkgYmVnaW5Db2wgPSAwO1xuICAgICAgICBsZXQgZ2lkc0lkeCA9IDA7XG4gICAgICAgIGxldCBlbmRDb2wgPSBiZWdpbkNvbCArIHRvdGFsQ29scztcbiAgICAgICAgZm9yIChsZXQgcm93ID0gYmVnaW5Sb3c7IDsgcm93KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IGJlZ2luQ29sOyBjb2wgPCBlbmRDb2w7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdpZHNJZHggPj0gZ2lkcy5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVUaWxlRm9yR0lEKGdpZHNbZ2lkc0lkeF0sIGNvbCwgcm93KTtcbiAgICAgICAgICAgICAgICBnaWRzSWR4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldHMgdGhlIHRpbGUgZ2lkIChnaWQgPSB0aWxlIGdsb2JhbCBpZCkgYXQgYSBnaXZlbiB0aWxlIGNvb3JkaW5hdGUuPGJyIC8+XG4gICAgICogVGhlIFRpbGUgR0lEIGNhbiBiZSBvYnRhaW5lZCBieSB1c2luZyB0aGUgbWV0aG9kIFwidGlsZUdJREF0XCIgb3IgYnkgdXNpbmcgdGhlIFRNWCBlZGl0b3IgLiBUaWxlc2V0IE1nciArMS48YnIgLz5cbiAgICAgKiBJZiBhIHRpbGUgaXMgYWxyZWFkeSBwbGFjZWQgYXQgdGhhdCBwb3NpdGlvbiwgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQuXG4gICAgICogISN6aFxuICAgICAqIOiuvue9rue7meWumuWdkOagh+eahCB0aWxlIOeahCBnaWQgKGdpZCA9IHRpbGUg5YWo5bGAIGlkKe+8jFxuICAgICAqIHRpbGUg55qEIEdJRCDlj6/ku6Xkvb/nlKjmlrnms5Ug4oCcdGlsZUdJREF04oCdIOadpeiOt+W+l+OAgjxiciAvPlxuICAgICAqIOWmguaenOS4gOS4qiB0aWxlIOW3sue7j+aUvuWcqOmCo+S4quS9jee9ru+8jOmCo+S5iOWug+Wwhuiiq+WIoOmZpOOAglxuICAgICAqIEBtZXRob2Qgc2V0VGlsZUdJREF0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGdpZFxuICAgICAqIEBwYXJhbSB7VmVjMnxOdW1iZXJ9IHBvc09yWCBwb3NpdGlvbiBvciB4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGZsYWdzT3JZIGZsYWdzIG9yIHlcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2ZsYWdzXVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdGlsZWRMYXllci5zZXRUaWxlR0lEQXQoMTAwMSwgMTAsIDEwLCAxKVxuICAgICAqL1xuICAgIHNldFRpbGVHSURBdCAoZ2lkLCBwb3NPclgsIGZsYWdzT3JZLCBmbGFncykge1xuICAgICAgICBpZiAocG9zT3JYID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNjLlRpbGVkTGF5ZXIuc2V0VGlsZUdJREF0KCk6IHBvcyBzaG91bGQgYmUgbm9uLW51bGxcIik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBvcztcbiAgICAgICAgaWYgKGZsYWdzICE9PSB1bmRlZmluZWQgfHwgIShwb3NPclggaW5zdGFuY2VvZiBjYy5WZWMyKSkge1xuICAgICAgICAgICAgLy8gZm91ciBwYXJhbWV0ZXJzIG9yIHBvc09yWCBpcyBub3QgYSBWZWMyIG9iamVjdFxuICAgICAgICAgICAgX3ZlYzJfdGVtcDMueCA9IHBvc09yWDtcbiAgICAgICAgICAgIF92ZWMyX3RlbXAzLnkgPSBmbGFnc09yWTtcbiAgICAgICAgICAgIHBvcyA9IF92ZWMyX3RlbXAzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcG9zID0gcG9zT3JYO1xuICAgICAgICAgICAgZmxhZ3MgPSBmbGFnc09yWTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHVnaWQgPSBnaWQgJiBjYy5UaWxlZE1hcC5UaWxlRmxhZy5GTElQUEVEX01BU0s7XG5cbiAgICAgICAgcG9zLnggPSBNYXRoLmZsb29yKHBvcy54KTtcbiAgICAgICAgcG9zLnkgPSBNYXRoLmZsb29yKHBvcy55KTtcbiAgICAgICAgaWYgKHRoaXMuX2lzSW52YWxpZFBvc2l0aW9uKHBvcykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNjLlRpbGVkTGF5ZXIuc2V0VGlsZUdJREF0KCk6IGludmFsaWQgcG9zaXRpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl90aWxlcyB8fCAhdGhpcy5fdGlsZXNldHMgfHwgdGhpcy5fdGlsZXNldHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIGNjLmxvZ0lEKDcyMzgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1Z2lkICE9PSAwICYmIHVnaWQgPCB0aGlzLl90aWxlc2V0c1swXS5maXJzdEdpZCkge1xuICAgICAgICAgICAgY2MubG9nSUQoNzIzOSwgZ2lkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZsYWdzID0gZmxhZ3MgfHwgMDtcbiAgICAgICAgdGhpcy5fdXBkYXRlVGlsZUZvckdJRCggKGdpZCB8IGZsYWdzKSA+Pj4gMCwgcG9zLngsIHBvcy55KTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZVRpbGVGb3JHSUQgKGdpZEFuZEZsYWdzLCB4LCB5KSB7XG4gICAgICAgIGxldCBpZHggPSAwIHwgKHggKyB5ICogdGhpcy5fbGF5ZXJTaXplLndpZHRoKTtcbiAgICAgICAgaWYgKGlkeCA+PSB0aGlzLl90aWxlcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBsZXQgb2xkR0lEQW5kRmxhZ3MgPSB0aGlzLl90aWxlc1tpZHhdO1xuICAgICAgICBpZiAoZ2lkQW5kRmxhZ3MgPT09IG9sZEdJREFuZEZsYWdzKSByZXR1cm47XG5cbiAgICAgICAgbGV0IGdpZCA9ICgoZ2lkQW5kRmxhZ3MgJiBjYy5UaWxlZE1hcC5UaWxlRmxhZy5GTElQUEVEX01BU0spID4+PiAwKTtcbiAgICAgICAgbGV0IGdyaWQgPSB0aGlzLl90ZXhHcmlkc1tnaWRdO1xuICAgICAgICBsZXQgdGlsZXNldElkeCA9IGdyaWQgJiYgZ3JpZC50ZXhJZDtcbiAgICAgICAgXG4gICAgICAgIGlmIChncmlkKSB7XG4gICAgICAgICAgICB0aGlzLl90aWxlc1tpZHhdID0gZ2lkQW5kRmxhZ3M7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVWZXJ0ZXgoeCwgeSk7XG4gICAgICAgICAgICB0aGlzLl9idWlsZE1hdGVyaWFsKHRpbGVzZXRJZHgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdGlsZXNbaWR4XSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3VsbGluZ0RpcnR5ID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIHRpbGUgZ2lkIGF0IGEgZ2l2ZW4gdGlsZSBjb29yZGluYXRlLiA8YnIgLz5cbiAgICAgKiBpZiBpdCByZXR1cm5zIDAsIGl0IG1lYW5zIHRoYXQgdGhlIHRpbGUgaXMgZW1wdHkuIDxiciAvPlxuICAgICAqICEjemhcbiAgICAgKiDpgJrov4fnu5nlrprnmoQgdGlsZSDlnZDmoIfjgIFmbGFnc++8iOWPr+mAie+8iei/lOWbniB0aWxlIOeahCBHSUQuIDxiciAvPlxuICAgICAqIOWmguaenOWug+i/lOWbniAw77yM5YiZ6KGo56S66K+lIHRpbGUg5Li656m644CCPGJyIC8+XG4gICAgICogQG1ldGhvZCBnZXRUaWxlR0lEQXRcbiAgICAgKiBAcGFyYW0ge1ZlYzJ8TnVtYmVyfSBwb3Mgb3IgeFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeV1cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBsZXQgdGlsZUdpZCA9IHRpbGVkTGF5ZXIuZ2V0VGlsZUdJREF0KDAsIDApO1xuICAgICAqL1xuICAgIGdldFRpbGVHSURBdCAocG9zLCB5KSB7XG4gICAgICAgIGlmIChwb3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2MuVGlsZWRMYXllci5nZXRUaWxlR0lEQXQoKTogcG9zIHNob3VsZCBiZSBub24tbnVsbFwiKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgeCA9IHBvcztcbiAgICAgICAgaWYgKHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgeCA9IHBvcy54O1xuICAgICAgICAgICAgeSA9IHBvcy55O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pc0ludmFsaWRQb3NpdGlvbih4LCB5KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2MuVGlsZWRMYXllci5nZXRUaWxlR0lEQXQoKTogaW52YWxpZCBwb3NpdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3RpbGVzKSB7XG4gICAgICAgICAgICBjYy5sb2dJRCg3MjM3KTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcih4KSArIE1hdGguZmxvb3IoeSkgKiB0aGlzLl9sYXllclNpemUud2lkdGg7XG4gICAgICAgIC8vIEJpdHMgb24gdGhlIGZhciBlbmQgb2YgdGhlIDMyLWJpdCBnbG9iYWwgdGlsZSBJRCBhcmUgdXNlZCBmb3IgdGlsZSBmbGFnc1xuICAgICAgICBsZXQgdGlsZSA9IHRoaXMuX3RpbGVzW2luZGV4XTtcblxuICAgICAgICByZXR1cm4gKHRpbGUgJiBjYy5UaWxlZE1hcC5UaWxlRmxhZy5GTElQUEVEX01BU0spID4+PiAwO1xuICAgIH0sXG5cbiAgICBnZXRUaWxlRmxhZ3NBdCAocG9zLCB5KSB7XG4gICAgICAgIGlmICghcG9zKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaWxlZExheWVyLmdldFRpbGVGbGFnc0F0OiBwb3Mgc2hvdWxkIGJlIG5vbi1udWxsXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBvcyA9IGNjLnYyKHBvcywgeSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2lzSW52YWxpZFBvc2l0aW9uKHBvcykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRpbGVkTGF5ZXIuZ2V0VGlsZUZsYWdzQXQ6IGludmFsaWQgcG9zaXRpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl90aWxlcykge1xuICAgICAgICAgICAgY2MubG9nSUQoNzI0MCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpZHggPSBNYXRoLmZsb29yKHBvcy54KSArIE1hdGguZmxvb3IocG9zLnkpICogdGhpcy5fbGF5ZXJTaXplLndpZHRoO1xuICAgICAgICAvLyBCaXRzIG9uIHRoZSBmYXIgZW5kIG9mIHRoZSAzMi1iaXQgZ2xvYmFsIHRpbGUgSUQgYXJlIHVzZWQgZm9yIHRpbGUgZmxhZ3NcbiAgICAgICAgbGV0IHRpbGUgPSB0aGlzLl90aWxlc1tpZHhdO1xuXG4gICAgICAgIHJldHVybiAodGlsZSAmIGNjLlRpbGVkTWFwLlRpbGVGbGFnLkZMSVBQRURfQUxMKSA+Pj4gMDtcbiAgICB9LFxuXG4gICAgX3NldEN1bGxpbmdEaXJ0eSAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fY3VsbGluZ0RpcnR5ID0gdmFsdWU7XG4gICAgfSxcblxuICAgIF9pc0N1bGxpbmdEaXJ0eSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdWxsaW5nRGlydHk7XG4gICAgfSxcblxuICAgIC8vICd4LCB5JyBpcyB0aGUgcG9zaXRpb24gb2Ygdmlld1BvcnQsIHdoaWNoJ3MgYW5jaG9yIHBvaW50IGlzIGF0IHRoZSBjZW50ZXIgb2YgcmVjdC5cbiAgICAvLyAnd2lkdGgsIGhlaWdodCcgaXMgdGhlIHNpemUgb2Ygdmlld1BvcnQuXG4gICAgX3VwZGF0ZVZpZXdQb3J0ICh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGlmICh0aGlzLl92aWV3UG9ydC53aWR0aCA9PT0gd2lkdGggJiYgXG4gICAgICAgICAgICB0aGlzLl92aWV3UG9ydC5oZWlnaHQgPT09IGhlaWdodCAmJlxuICAgICAgICAgICAgdGhpcy5fdmlld1BvcnQueCA9PT0geCAmJlxuICAgICAgICAgICAgdGhpcy5fdmlld1BvcnQueSA9PT0geSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ZpZXdQb3J0LnggPSB4O1xuICAgICAgICB0aGlzLl92aWV3UG9ydC55ID0geTtcbiAgICAgICAgdGhpcy5fdmlld1BvcnQud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5fdmlld1BvcnQuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIC8vIGlmIG1hcCdzIHR5cGUgaXMgaXNvLCByZXNlcnZlIGJvdHRvbSBsaW5lIGlzIDIgdG8gYXZvaWQgc2hvdyBlbXB0eSBncmlkIGJlY2F1c2Ugb2YgaXNvIGdyaWQgYXJpdGhtZXRpY1xuICAgICAgICBsZXQgcmVzZXJ2ZUxpbmUgPSAxO1xuICAgICAgICBpZiAodGhpcy5fbGF5ZXJPcmllbnRhdGlvbiA9PT0gY2MuVGlsZWRNYXAuT3JpZW50YXRpb24uSVNPKSB7XG4gICAgICAgICAgICByZXNlcnZlTGluZSA9IDI7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdnB4ID0gdGhpcy5fdmlld1BvcnQueCAtIHRoaXMuX29mZnNldC54ICsgdGhpcy5fbGVmdERvd25Ub0NlbnRlclg7XG4gICAgICAgIGxldCB2cHkgPSB0aGlzLl92aWV3UG9ydC55IC0gdGhpcy5fb2Zmc2V0LnkgKyB0aGlzLl9sZWZ0RG93blRvQ2VudGVyWTtcblxuICAgICAgICBsZXQgbGVmdERvd25YID0gdnB4IC0gdGhpcy5fbGVmdE9mZnNldDtcbiAgICAgICAgbGV0IGxlZnREb3duWSA9IHZweSAtIHRoaXMuX2Rvd25PZmZzZXQ7XG4gICAgICAgIGxldCByaWdodFRvcFggPSB2cHggKyB3aWR0aCArIHRoaXMuX3JpZ2h0T2Zmc2V0O1xuICAgICAgICBsZXQgcmlnaHRUb3BZID0gdnB5ICsgaGVpZ2h0ICsgdGhpcy5fdG9wT2Zmc2V0O1xuXG4gICAgICAgIGxldCBsZWZ0RG93biA9IHRoaXMuX2N1bGxpbmdSZWN0LmxlZnREb3duO1xuICAgICAgICBsZXQgcmlnaHRUb3AgPSB0aGlzLl9jdWxsaW5nUmVjdC5yaWdodFRvcDtcblxuICAgICAgICBpZiAobGVmdERvd25YIDwgMCkgbGVmdERvd25YID0gMDtcbiAgICAgICAgaWYgKGxlZnREb3duWSA8IDApIGxlZnREb3duWSA9IDA7XG5cbiAgICAgICAgLy8gY2FsYyBsZWZ0IGRvd25cbiAgICAgICAgdGhpcy5fcG9zaXRpb25Ub1Jvd0NvbChsZWZ0RG93blgsIGxlZnREb3duWSwgX3RlbXBSb3dDb2wpO1xuICAgICAgICAvLyBtYWtlIHJhbmdlIGxhcmdlXG4gICAgICAgIF90ZW1wUm93Q29sLnJvdy09cmVzZXJ2ZUxpbmU7XG4gICAgICAgIF90ZW1wUm93Q29sLmNvbC09cmVzZXJ2ZUxpbmU7XG4gICAgICAgIC8vIGluc3VyZSBsZWZ0IGRvd24gcm93IGNvbCBncmVhdGVyIHRoYW4gMFxuICAgICAgICBfdGVtcFJvd0NvbC5yb3cgPSBfdGVtcFJvd0NvbC5yb3cgPiAwID8gX3RlbXBSb3dDb2wucm93IDogMDtcbiAgICAgICAgX3RlbXBSb3dDb2wuY29sID0gX3RlbXBSb3dDb2wuY29sID4gMCA/IF90ZW1wUm93Q29sLmNvbCA6IDA7ICAgICAgICBcblxuICAgICAgICBpZiAoX3RlbXBSb3dDb2wucm93ICE9PSBsZWZ0RG93bi5yb3cgfHwgX3RlbXBSb3dDb2wuY29sICE9PSBsZWZ0RG93bi5jb2wpIHtcbiAgICAgICAgICAgIGxlZnREb3duLnJvdyA9IF90ZW1wUm93Q29sLnJvdztcbiAgICAgICAgICAgIGxlZnREb3duLmNvbCA9IF90ZW1wUm93Q29sLmNvbDtcbiAgICAgICAgICAgIHRoaXMuX2N1bGxpbmdEaXJ0eSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzaG93IG5vdGhpbmdcbiAgICAgICAgaWYgKHJpZ2h0VG9wWCA8IDAgfHwgcmlnaHRUb3BZIDwgMCkge1xuICAgICAgICAgICAgX3RlbXBSb3dDb2wucm93ID0gLTE7XG4gICAgICAgICAgICBfdGVtcFJvd0NvbC5jb2wgPSAtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNhbGMgcmlnaHQgdG9wXG4gICAgICAgICAgICB0aGlzLl9wb3NpdGlvblRvUm93Q29sKHJpZ2h0VG9wWCwgcmlnaHRUb3BZLCBfdGVtcFJvd0NvbCk7XG4gICAgICAgICAgICAvLyBtYWtlIHJhbmdlIGxhcmdlXG4gICAgICAgICAgICBfdGVtcFJvd0NvbC5yb3crKztcbiAgICAgICAgICAgIF90ZW1wUm93Q29sLmNvbCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXZvaWQgcmFuZ2Ugb3V0IG9mIG1heCByZWN0XG4gICAgICAgIGlmIChfdGVtcFJvd0NvbC5yb3cgPiB0aGlzLl9yaWdodFRvcC5yb3cpIF90ZW1wUm93Q29sLnJvdyA9IHRoaXMuX3JpZ2h0VG9wLnJvdztcbiAgICAgICAgaWYgKF90ZW1wUm93Q29sLmNvbCA+IHRoaXMuX3JpZ2h0VG9wLmNvbCkgX3RlbXBSb3dDb2wuY29sID0gdGhpcy5fcmlnaHRUb3AuY29sO1xuXG4gICAgICAgIGlmIChfdGVtcFJvd0NvbC5yb3cgIT09IHJpZ2h0VG9wLnJvdyB8fCBfdGVtcFJvd0NvbC5jb2wgIT09IHJpZ2h0VG9wLmNvbCkge1xuICAgICAgICAgICAgcmlnaHRUb3Aucm93ID0gX3RlbXBSb3dDb2wucm93O1xuICAgICAgICAgICAgcmlnaHRUb3AuY29sID0gX3RlbXBSb3dDb2wuY29sO1xuICAgICAgICAgICAgdGhpcy5fY3VsbGluZ0RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB0aGUgcmVzdWx0IG1heSBub3QgcHJlY2lzZSwgYnV0IGl0IGRvc2UndCBtYXR0ZXIsIGl0IGp1c3QgdXNlcyB0byBiZSBnb3QgcmFuZ2VcbiAgICBfcG9zaXRpb25Ub1Jvd0NvbCAoeCwgeSwgcmVzdWx0KSB7XG4gICAgICAgIGNvbnN0IFRpbGVkTWFwID0gY2MuVGlsZWRNYXA7XG4gICAgICAgIGNvbnN0IE9yaWVudGF0aW9uID0gVGlsZWRNYXAuT3JpZW50YXRpb247XG4gICAgICAgIGNvbnN0IFN0YWdnZXJBeGlzID0gVGlsZWRNYXAuU3RhZ2dlckF4aXM7XG5cbiAgICAgICAgbGV0IG1hcHR3ID0gdGhpcy5fbWFwVGlsZVNpemUud2lkdGgsXG4gICAgICAgICAgICBtYXB0aCA9IHRoaXMuX21hcFRpbGVTaXplLmhlaWdodCxcbiAgICAgICAgICAgIG1hcHR3MiA9IG1hcHR3ICogMC41LFxuICAgICAgICAgICAgbWFwdGgyID0gbWFwdGggKiAwLjU7XG4gICAgICAgIGxldCByb3cgPSAwLCBjb2wgPSAwLCBkaWZmWDIgPSAwLCBkaWZmWTIgPSAwLCBheGlzID0gdGhpcy5fc3RhZ2dlckF4aXM7XG4gICAgICAgIGxldCBjb2xzID0gdGhpcy5fbGF5ZXJTaXplLndpZHRoO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5fbGF5ZXJPcmllbnRhdGlvbikge1xuICAgICAgICAgICAgLy8gbGVmdCB0b3AgdG8gcmlnaHQgZG93bVxuICAgICAgICAgICAgY2FzZSBPcmllbnRhdGlvbi5PUlRITzpcbiAgICAgICAgICAgICAgICBjb2wgPSBNYXRoLmZsb29yKHggLyBtYXB0dyk7XG4gICAgICAgICAgICAgICAgcm93ID0gTWF0aC5mbG9vcih5IC8gbWFwdGgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gcmlnaHQgdG9wIHRvIGxlZnQgZG93blxuICAgICAgICAgICAgLy8gaXNvIGNhbiBiZSB0cmVhdCBhcyBzcGVjaWFsIGhleCB3aG9zZSBoZXggc2lkZSBsZW5ndGggaXMgMFxuICAgICAgICAgICAgY2FzZSBPcmllbnRhdGlvbi5JU086XG4gICAgICAgICAgICAgICAgY29sID0gTWF0aC5mbG9vcih4IC8gbWFwdHcyKTtcbiAgICAgICAgICAgICAgICByb3cgPSBNYXRoLmZsb29yKHkgLyBtYXB0aDIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gbGVmdCB0b3AgdG8gcmlnaHQgZG93bVxuICAgICAgICAgICAgY2FzZSBPcmllbnRhdGlvbi5IRVg6XG4gICAgICAgICAgICAgICAgaWYgKGF4aXMgPT09IFN0YWdnZXJBeGlzLlNUQUdHRVJBWElTX1kpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gTWF0aC5mbG9vcih5IC8gKG1hcHRoIC0gdGhpcy5fZGlmZlkxKSk7XG4gICAgICAgICAgICAgICAgICAgIGRpZmZYMiA9IHJvdyAlIDIgPT09IDEgPyBtYXB0dzIgKiB0aGlzLl9vZGRfZXZlbiA6IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbCA9IE1hdGguZmxvb3IoKHggLSBkaWZmWDIpIC8gbWFwdHcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbCA9IE1hdGguZmxvb3IoeCAvIChtYXB0dyAtIHRoaXMuX2RpZmZYMSkpO1xuICAgICAgICAgICAgICAgICAgICBkaWZmWTIgPSBjb2wgJSAyID09PSAxID8gbWFwdGgyICogLXRoaXMuX29kZF9ldmVuIDogMDtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gTWF0aC5mbG9vcigoeSAtIGRpZmZZMikgLyBtYXB0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC5yb3cgPSByb3c7XG4gICAgICAgIHJlc3VsdC5jb2wgPSBjb2w7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIF91cGRhdGVDdWxsaW5nICgpIHtcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgdGhpcy5lbmFibGVDdWxsaW5nKGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9lbmFibGVDdWxsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuX3VwZGF0ZVdvcmxkTWF0cml4KCk7XG4gICAgICAgICAgICBNYXQ0LmludmVydChfbWF0NF90ZW1wLCB0aGlzLm5vZGUuX3dvcmxkTWF0cml4KTtcbiAgICAgICAgICAgIGxldCByZWN0ID0gY2MudmlzaWJsZVJlY3Q7XG4gICAgICAgICAgICBsZXQgY2FtZXJhID0gY2MuQ2FtZXJhLmZpbmRDYW1lcmEodGhpcy5ub2RlKTtcbiAgICAgICAgICAgIGlmIChjYW1lcmEpIHtcbiAgICAgICAgICAgICAgICBfdmVjMl90ZW1wLnggPSAwO1xuICAgICAgICAgICAgICAgIF92ZWMyX3RlbXAueSA9IDA7XG4gICAgICAgICAgICAgICAgX3ZlYzJfdGVtcDIueCA9IF92ZWMyX3RlbXAueCArIHJlY3Qud2lkdGg7XG4gICAgICAgICAgICAgICAgX3ZlYzJfdGVtcDIueSA9IF92ZWMyX3RlbXAueSArIHJlY3QuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIGNhbWVyYS5nZXRTY3JlZW5Ub1dvcmxkUG9pbnQoX3ZlYzJfdGVtcCwgX3ZlYzJfdGVtcCk7XG4gICAgICAgICAgICAgICAgY2FtZXJhLmdldFNjcmVlblRvV29ybGRQb2ludChfdmVjMl90ZW1wMiwgX3ZlYzJfdGVtcDIpO1xuICAgICAgICAgICAgICAgIFZlYzIudHJhbnNmb3JtTWF0NChfdmVjMl90ZW1wLCBfdmVjMl90ZW1wLCBfbWF0NF90ZW1wKTtcbiAgICAgICAgICAgICAgICBWZWMyLnRyYW5zZm9ybU1hdDQoX3ZlYzJfdGVtcDIsIF92ZWMyX3RlbXAyLCBfbWF0NF90ZW1wKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVWaWV3UG9ydChfdmVjMl90ZW1wLngsIF92ZWMyX3RlbXAueSwgX3ZlYzJfdGVtcDIueCAtIF92ZWMyX3RlbXAueCwgX3ZlYzJfdGVtcDIueSAtIF92ZWMyX3RlbXAueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBMYXllciBvcmllbnRhdGlvbiwgd2hpY2ggaXMgdGhlIHNhbWUgYXMgdGhlIG1hcCBvcmllbnRhdGlvbi5cbiAgICAgKiAhI3poIOiOt+WPliBMYXllciDmlrnlkJEo5ZCM5Zyw5Zu+5pa55ZCRKeOAglxuICAgICAqIEBtZXRob2QgZ2V0TGF5ZXJPcmllbnRhdGlvblxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBvcmllbnRhdGlvbiA9IHRpbGVkTGF5ZXIuZ2V0TGF5ZXJPcmllbnRhdGlvbigpO1xuICAgICAqIGNjLmxvZyhcIkxheWVyIE9yaWVudGF0aW9uOiBcIiArIG9yaWVudGF0aW9uKTtcbiAgICAgKi9cbiAgICBnZXRMYXllck9yaWVudGF0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheWVyT3JpZW50YXRpb247XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gcHJvcGVydGllcyBmcm9tIHRoZSBsYXllci4gVGhleSBjYW4gYmUgYWRkZWQgdXNpbmcgVGlsZWQuXG4gICAgICogISN6aCDojrflj5YgbGF5ZXIg55qE5bGe5oCn77yM5Y+v5Lul5L2/55SoIFRpbGVkIOe8lui+keWZqOa3u+WKoOWxnuaAp+OAglxuICAgICAqIEBtZXRob2QgZ2V0UHJvcGVydGllc1xuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBwcm9wZXJ0aWVzID0gdGlsZWRMYXllci5nZXRQcm9wZXJ0aWVzKCk7XG4gICAgICogY2MubG9nKFwiUHJvcGVydGllczogXCIgKyBwcm9wZXJ0aWVzKTtcbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0aWVzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXM7XG4gICAgfSxcblxuICAgIF91cGRhdGVWZXJ0ZXggKGNvbCwgcm93KSB7XG4gICAgICAgIGNvbnN0IFRpbGVkTWFwID0gY2MuVGlsZWRNYXA7XG4gICAgICAgIGNvbnN0IFRpbGVGbGFnID0gVGlsZWRNYXAuVGlsZUZsYWc7XG4gICAgICAgIGNvbnN0IEZMSVBQRURfTUFTSyA9IFRpbGVGbGFnLkZMSVBQRURfTUFTSztcbiAgICAgICAgY29uc3QgU3RhZ2dlckF4aXMgPSBUaWxlZE1hcC5TdGFnZ2VyQXhpcztcbiAgICAgICAgY29uc3QgT3JpZW50YXRpb24gPSBUaWxlZE1hcC5PcmllbnRhdGlvbjtcblxuICAgICAgICBsZXQgdmVydGljZXMgPSB0aGlzLl92ZXJ0aWNlcztcblxuICAgICAgICBsZXQgbGF5ZXJPcmllbnRhdGlvbiA9IHRoaXMuX2xheWVyT3JpZW50YXRpb24sXG4gICAgICAgICAgICB0aWxlcyA9IHRoaXMuX3RpbGVzO1xuXG4gICAgICAgIGlmICghdGlsZXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByaWdodFRvcCA9IHRoaXMuX3JpZ2h0VG9wO1xuICAgICAgICBsZXQgbWFwdHcgPSB0aGlzLl9tYXBUaWxlU2l6ZS53aWR0aCxcbiAgICAgICAgICAgIG1hcHRoID0gdGhpcy5fbWFwVGlsZVNpemUuaGVpZ2h0LFxuICAgICAgICAgICAgbWFwdHcyID0gbWFwdHcgKiAwLjUsXG4gICAgICAgICAgICBtYXB0aDIgPSBtYXB0aCAqIDAuNSxcbiAgICAgICAgICAgIHJvd3MgPSB0aGlzLl9sYXllclNpemUuaGVpZ2h0LFxuICAgICAgICAgICAgY29scyA9IHRoaXMuX2xheWVyU2l6ZS53aWR0aCxcbiAgICAgICAgICAgIGdyaWRzID0gdGhpcy5fdGV4R3JpZHM7XG4gICAgICAgIFxuICAgICAgICBsZXQgZ2lkLCBncmlkLCBsZWZ0LCBib3R0b20sXG4gICAgICAgICAgICBheGlzLCBkaWZmWDEsIGRpZmZZMSwgb2RkX2V2ZW4sIGRpZmZYMiwgZGlmZlkyO1xuXG4gICAgICAgIGlmIChsYXllck9yaWVudGF0aW9uID09PSBPcmllbnRhdGlvbi5IRVgpIHtcbiAgICAgICAgICAgIGF4aXMgPSB0aGlzLl9zdGFnZ2VyQXhpcztcbiAgICAgICAgICAgIGRpZmZYMSA9IHRoaXMuX2RpZmZYMTtcbiAgICAgICAgICAgIGRpZmZZMSA9IHRoaXMuX2RpZmZZMTtcbiAgICAgICAgICAgIG9kZF9ldmVuID0gdGhpcy5fb2RkX2V2ZW47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY3VsbGluZ0NvbCA9IDAsIGN1bGxpbmdSb3cgPSAwO1xuICAgICAgICBsZXQgdGlsZU9mZnNldCA9IG51bGwsIGdyaWRHSUQgPSAwO1xuXG4gICAgICAgIC8vIGdyaWQgYm9yZGVyXG4gICAgICAgIGxldCB0b3BCb3JkZXIgPSAwLCBkb3duQm9yZGVyID0gMCwgbGVmdEJvcmRlciA9IDAsIHJpZ2h0Qm9yZGVyID0gMDtcbiAgICAgICAgbGV0IGluZGV4ID0gcm93ICogY29scyArIGNvbDtcbiAgICAgICAgZ2lkID0gdGlsZXNbaW5kZXhdO1xuICAgICAgICBncmlkR0lEID0gKChnaWQgJiBGTElQUEVEX01BU0spID4+PiAwKTtcbiAgICAgICAgZ3JpZCA9IGdyaWRzW2dyaWRHSURdO1xuICAgICAgICBpZiAoIWdyaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGhhcyBhbmltYXRpb24sIGdyaWQgbXVzdCBiZSB1cGRhdGVkIHBlciBmcmFtZVxuICAgICAgICBpZiAodGhpcy5fYW5pbWF0aW9uc1tncmlkR0lEXSkge1xuICAgICAgICAgICAgdGhpcy5faGFzQW5pR3JpZCA9IHRoaXMuX2hhc0FuaUdyaWQgfHwgdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAobGF5ZXJPcmllbnRhdGlvbikge1xuICAgICAgICAgICAgLy8gbGVmdCB0b3AgdG8gcmlnaHQgZG93bVxuICAgICAgICAgICAgY2FzZSBPcmllbnRhdGlvbi5PUlRITzpcbiAgICAgICAgICAgICAgICBjdWxsaW5nQ29sID0gY29sO1xuICAgICAgICAgICAgICAgIGN1bGxpbmdSb3cgPSByb3dzIC0gcm93IC0gMTtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gY3VsbGluZ0NvbCAqIG1hcHR3O1xuICAgICAgICAgICAgICAgIGJvdHRvbSA9IGN1bGxpbmdSb3cgKiBtYXB0aDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIHJpZ2h0IHRvcCB0byBsZWZ0IGRvd25cbiAgICAgICAgICAgIGNhc2UgT3JpZW50YXRpb24uSVNPOlxuICAgICAgICAgICAgXHQvLyBpZiBub3QgY29uc2lkZXIgYWJvdXQgY29sLCB0aGVuIGxlZnQgaXMgJ3cvMiAqIChyb3dzIC0gcm93IC0gMSknXG4gICAgICAgICAgICAgICAgLy8gaWYgY29uc2lkZXIgYWJvdXQgY29sIHRoZW4gbGVmdCBtdXN0IGFkZCAndy8yICogY29sJ1xuICAgICAgICAgICAgICAgIC8vIHNvIGxlZnQgaXMgJ3cvMiAqIChyb3dzIC0gcm93IC0gMSkgKyB3LzIgKiBjb2wnXG4gICAgICAgICAgICAgICAgLy8gY29tYmluZSBleHByZXNzaW9uIGlzICd3LzIgKiAocm93cyAtIHJvdyArIGNvbCAtMSknXG4gICAgICAgICAgICAgICAgY3VsbGluZ0NvbCA9IHJvd3MgKyBjb2wgLSByb3cgLSAxO1xuICAgICAgICAgICAgICAgIC8vIGlmIG5vdCBjb25zaWRlciBhYm91dCByb3csIHRoZW4gYm90dG9tIGlzICdoLzIgKiAoY29scyAtIGNvbCAtMSknXG4gICAgICAgICAgICAgICAgLy8gaWYgY29uc2lkZXIgYWJvdXQgcm93IHRoZW4gYm90dG9tIG11c3QgYWRkICdoLzIgKiAocm93cyAtIHJvdyAtIDEpJ1xuICAgICAgICAgICAgICAgIC8vIHNvIGJvdHRvbSBpcyAnaC8yICogKGNvbHMgLSBjb2wgLTEpICsgaC8yICogKHJvd3MgLSByb3cgLSAxKSdcbiAgICAgICAgICAgICAgICAvLyBjb21iaW5lIGV4cHJlc3Npb25uIGlzICdoLzIgKiAocm93cyArIGNvbHMgLSBjb2wgLSByb3cgLSAyKSdcbiAgICAgICAgICAgICAgICBjdWxsaW5nUm93ID0gcm93cyArIGNvbHMgLSBjb2wgLSByb3cgLSAyO1xuICAgICAgICAgICAgICAgIGxlZnQgPSBtYXB0dzIgKiBjdWxsaW5nQ29sO1xuICAgICAgICAgICAgICAgIGJvdHRvbSA9IG1hcHRoMiAqIGN1bGxpbmdSb3c7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBsZWZ0IHRvcCB0byByaWdodCBkb3dtXG4gICAgICAgICAgICBjYXNlIE9yaWVudGF0aW9uLkhFWDpcbiAgICAgICAgICAgICAgICBkaWZmWDIgPSAoYXhpcyA9PT0gU3RhZ2dlckF4aXMuU1RBR0dFUkFYSVNfWSAmJiByb3cgJSAyID09PSAxKSA/IG1hcHR3MiAqIG9kZF9ldmVuIDogMDtcbiAgICAgICAgICAgICAgICBkaWZmWTIgPSAoYXhpcyA9PT0gU3RhZ2dlckF4aXMuU1RBR0dFUkFYSVNfWCAmJiBjb2wgJSAyID09PSAxKSA/IG1hcHRoMiAqIC1vZGRfZXZlbiA6IDA7XG5cbiAgICAgICAgICAgICAgICBsZWZ0ID0gY29sICogKG1hcHR3IC0gZGlmZlgxKSArIGRpZmZYMjtcbiAgICAgICAgICAgICAgICBib3R0b20gPSAocm93cyAtIHJvdyAtIDEpICogKG1hcHRoIC0gZGlmZlkxKSArIGRpZmZZMjtcbiAgICAgICAgICAgICAgICBjdWxsaW5nQ29sID0gY29sO1xuICAgICAgICAgICAgICAgIGN1bGxpbmdSb3cgPSByb3dzIC0gcm93IC0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByb3dEYXRhID0gdmVydGljZXNbY3VsbGluZ1Jvd10gPSB2ZXJ0aWNlc1tjdWxsaW5nUm93XSB8fCB7bWluQ29sOjAsIG1heENvbDowfTtcbiAgICAgICAgbGV0IGNvbERhdGEgPSByb3dEYXRhW2N1bGxpbmdDb2xdID0gcm93RGF0YVtjdWxsaW5nQ29sXSB8fCB7fTtcbiAgICAgICAgXG4gICAgICAgIC8vIHJlY29yZCBlYWNoIHJvdyByYW5nZSwgaXQgd2lsbCBmYXN0ZXIgd2hlbiBjdWxsaW5nIGdyaWRcbiAgICAgICAgaWYgKHJvd0RhdGEubWluQ29sID4gY3VsbGluZ0NvbCkge1xuICAgICAgICAgICAgcm93RGF0YS5taW5Db2wgPSBjdWxsaW5nQ29sO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvd0RhdGEubWF4Q29sIDwgY3VsbGluZ0NvbCkge1xuICAgICAgICAgICAgcm93RGF0YS5tYXhDb2wgPSBjdWxsaW5nQ29sO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVjb3JkIG1heCByZWN0LCB3aGVuIHZpZXdQb3J0IGlzIGJpZ2dlciB0aGFuIGxheWVyLCBjYW4gbWFrZSBpdCBzbWFsbGVyXG4gICAgICAgIGlmIChyaWdodFRvcC5yb3cgPCBjdWxsaW5nUm93KSB7XG4gICAgICAgICAgICByaWdodFRvcC5yb3cgPSBjdWxsaW5nUm93O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJpZ2h0VG9wLmNvbCA8IGN1bGxpbmdDb2wpIHtcbiAgICAgICAgICAgIHJpZ2h0VG9wLmNvbCA9IGN1bGxpbmdDb2w7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBfb2Zmc2V0IGlzIHdob2xlIGxheWVyIG9mZnNldFxuICAgICAgICAvLyB0aWxlT2Zmc2V0IGlzIHRpbGVzZXQgb2Zmc2V0IHdoaWNoIGlzIHJlbGF0ZWQgdG8gZWFjaCBncmlkXG4gICAgICAgIC8vIHRpbGVPZmZzZXQgY29vcmRpbmF0ZSBzeXN0ZW0ncyB5IGF4aXMgaXMgb3Bwb3NpdGUgd2l0aCBlbmdpbmUncyB5IGF4aXMuXG4gICAgICAgIHRpbGVPZmZzZXQgPSBncmlkLnRpbGVzZXQudGlsZU9mZnNldDtcbiAgICAgICAgbGVmdCArPSB0aGlzLl9vZmZzZXQueCArIHRpbGVPZmZzZXQueDtcbiAgICAgICAgYm90dG9tICs9IHRoaXMuX29mZnNldC55IC0gdGlsZU9mZnNldC55O1xuICAgICAgICBcbiAgICAgICAgdG9wQm9yZGVyID0gLXRpbGVPZmZzZXQueSArIGdyaWQudGlsZXNldC5fdGlsZVNpemUuaGVpZ2h0IC0gbWFwdGg7XG4gICAgICAgIHRvcEJvcmRlciA9IHRvcEJvcmRlciA8IDAgPyAwIDogdG9wQm9yZGVyO1xuICAgICAgICBkb3duQm9yZGVyID0gdGlsZU9mZnNldC55IDwgMCA/IDAgOiB0aWxlT2Zmc2V0Lnk7XG4gICAgICAgIGxlZnRCb3JkZXIgPSAtdGlsZU9mZnNldC54IDwgMCA/IDAgOiAtdGlsZU9mZnNldC54O1xuICAgICAgICByaWdodEJvcmRlciA9IHRpbGVPZmZzZXQueCArIGdyaWQudGlsZXNldC5fdGlsZVNpemUud2lkdGggLSBtYXB0dztcbiAgICAgICAgcmlnaHRCb3JkZXIgPSByaWdodEJvcmRlciA8IDAgPyAwIDogcmlnaHRCb3JkZXI7XG5cbiAgICAgICAgaWYgKHRoaXMuX3JpZ2h0T2Zmc2V0IDwgbGVmdEJvcmRlcikge1xuICAgICAgICAgICAgdGhpcy5fcmlnaHRPZmZzZXQgPSBsZWZ0Qm9yZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2xlZnRPZmZzZXQgPCByaWdodEJvcmRlcikge1xuICAgICAgICAgICAgdGhpcy5fbGVmdE9mZnNldCA9IHJpZ2h0Qm9yZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3RvcE9mZnNldCA8IGRvd25Cb3JkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3RvcE9mZnNldCA9IGRvd25Cb3JkZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZG93bk9mZnNldCA8IHRvcEJvcmRlcikge1xuICAgICAgICAgICAgdGhpcy5fZG93bk9mZnNldCA9IHRvcEJvcmRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbERhdGEubGVmdCA9IGxlZnQ7XG4gICAgICAgIGNvbERhdGEuYm90dG9tID0gYm90dG9tO1xuICAgICAgICAvLyB0aGlzIGluZGV4IGlzIHRpbGVkbWFwIGdyaWQgaW5kZXhcbiAgICAgICAgY29sRGF0YS5pbmRleCA9IGluZGV4OyBcblxuICAgICAgICB0aGlzLl9jdWxsaW5nRGlydHkgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlVmVydGljZXMgKCkge1xuICAgICAgICBsZXQgdmVydGljZXMgPSB0aGlzLl92ZXJ0aWNlcztcbiAgICAgICAgdmVydGljZXMubGVuZ3RoID0gMDtcblxuICAgICAgICBsZXQgdGlsZXMgPSB0aGlzLl90aWxlcztcbiAgICAgICAgaWYgKCF0aWxlcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJpZ2h0VG9wID0gdGhpcy5fcmlnaHRUb3A7XG4gICAgICAgIHJpZ2h0VG9wLnJvdyA9IC0xO1xuICAgICAgICByaWdodFRvcC5jb2wgPSAtMTtcblxuICAgICAgICBsZXQgcm93cyA9IHRoaXMuX2xheWVyU2l6ZS5oZWlnaHQsXG4gICAgICAgICAgICBjb2xzID0gdGhpcy5fbGF5ZXJTaXplLndpZHRoO1xuXG4gICAgICAgIHRoaXMuX3RvcE9mZnNldCA9IDA7XG4gICAgICAgIHRoaXMuX2Rvd25PZmZzZXQgPSAwO1xuICAgICAgICB0aGlzLl9sZWZ0T2Zmc2V0ID0gMDtcbiAgICAgICAgdGhpcy5fcmlnaHRPZmZzZXQgPSAwO1xuICAgICAgICB0aGlzLl9oYXNBbmlHcmlkID0gZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgcm93czsgKytyb3cpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGNvbHM7ICsrY29sKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmVydGV4KGNvbCwgcm93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92ZXJ0aWNlc0RpcnR5ID0gZmFsc2U7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgdGhlIFRpbGVkVGlsZSB3aXRoIHRoZSB0aWxlIGNvb3JkaW5hdGUuPGJyLz5cbiAgICAgKiBJZiB0aGVyZSBpcyBubyB0aWxlIGluIHRoZSBzcGVjaWZpZWQgY29vcmRpbmF0ZSBhbmQgZm9yY2VDcmVhdGUgcGFyYW1ldGVyIGlzIHRydWUsIDxici8+XG4gICAgICogdGhlbiB3aWxsIGNyZWF0ZSBhIG5ldyBUaWxlZFRpbGUgYXQgdGhlIGNvb3JkaW5hdGUuXG4gICAgICogVGhlIHJlbmRlcmVyIHdpbGwgcmVuZGVyIHRoZSB0aWxlIHdpdGggdGhlIHJvdGF0aW9uLCBzY2FsZSwgcG9zaXRpb24gYW5kIGNvbG9yIHByb3BlcnR5IG9mIHRoZSBUaWxlZFRpbGUuXG4gICAgICogISN6aFxuICAgICAqIOmAmui/h+aMh+WumueahCB0aWxlIOWdkOagh+iOt+WPluWvueW6lOeahCBUaWxlZFRpbGXjgIIgPGJyLz5cbiAgICAgKiDlpoLmnpzmjIflrprnmoTlnZDmoIfmsqHmnIkgdGlsZe+8jOW5tuS4lOiuvue9ruS6hiBmb3JjZUNyZWF0ZSDpgqPkuYjlsIbkvJrlnKjmjIflrprnmoTlnZDmoIfliJvlu7rkuIDkuKrmlrDnmoQgVGlsZWRUaWxlIOOAgjxici8+XG4gICAgICog5Zyo5riy5p+T6L+Z5LiqIHRpbGUg55qE5pe25YCZ77yM5bCG5Lya5L2/55SoIFRpbGVkVGlsZSDnmoToioLngrnnmoTml4vovazjgIHnvKnmlL7jgIHkvY3np7vjgIHpopzoibLlsZ7mgKfjgII8YnIvPlxuICAgICAqIEBtZXRob2QgZ2V0VGlsZWRUaWxlQXRcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHhcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IHlcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZvcmNlQ3JlYXRlXG4gICAgICogQHJldHVybiB7Y2MuVGlsZWRUaWxlfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGV0IHRpbGUgPSB0aWxlZExheWVyLmdldFRpbGVkVGlsZUF0KDEwMCwgMTAwLCB0cnVlKTtcbiAgICAgKiBjYy5sb2codGlsZSk7XG4gICAgICovXG4gICAgZ2V0VGlsZWRUaWxlQXQgKHgsIHksIGZvcmNlQ3JlYXRlKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0ludmFsaWRQb3NpdGlvbih4LCB5KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGlsZWRMYXllci5nZXRUaWxlZFRpbGVBdDogaW52YWxpZCBwb3NpdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3RpbGVzKSB7XG4gICAgICAgICAgICBjYy5sb2dJRCg3MjM2KTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcih4KSArIE1hdGguZmxvb3IoeSkgKiB0aGlzLl9sYXllclNpemUud2lkdGg7XG4gICAgICAgIGxldCB0aWxlID0gdGhpcy5fdGlsZWRUaWxlc1tpbmRleF07XG4gICAgICAgIGlmICghdGlsZSAmJiBmb3JjZUNyZWF0ZSkge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZSgpO1xuICAgICAgICAgICAgdGlsZSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlRpbGVkVGlsZSk7XG4gICAgICAgICAgICB0aWxlLl94ID0geDtcbiAgICAgICAgICAgIHRpbGUuX3kgPSB5O1xuICAgICAgICAgICAgdGlsZS5fbGF5ZXIgPSB0aGlzO1xuICAgICAgICAgICAgdGlsZS5fdXBkYXRlSW5mbygpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICByZXR1cm4gdGlsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGlsZTtcbiAgICB9LFxuXG4gICAgLyoqIFxuICAgICAqICEjZW5cbiAgICAgKiBDaGFuZ2UgdGlsZSB0byBUaWxlZFRpbGUgYXQgdGhlIHNwZWNpZmllZCBjb29yZGluYXRlLlxuICAgICAqICEjemhcbiAgICAgKiDlsIbmjIflrprnmoQgdGlsZSDlnZDmoIfmm7/mjaLkuLrmjIflrprnmoQgVGlsZWRUaWxl44CCXG4gICAgICogQG1ldGhvZCBzZXRUaWxlZFRpbGVBdFxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0geFxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0geVxuICAgICAqIEBwYXJhbSB7Y2MuVGlsZWRUaWxlfSB0aWxlZFRpbGVcbiAgICAgKiBAcmV0dXJuIHtjYy5UaWxlZFRpbGV9XG4gICAgICovXG4gICAgc2V0VGlsZWRUaWxlQXQgKHgsIHksIHRpbGVkVGlsZSkge1xuICAgICAgICBpZiAodGhpcy5faXNJbnZhbGlkUG9zaXRpb24oeCwgeSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRpbGVkTGF5ZXIuc2V0VGlsZWRUaWxlQXQ6IGludmFsaWQgcG9zaXRpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl90aWxlcykge1xuICAgICAgICAgICAgY2MubG9nSUQoNzIzNik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoeCkgKyBNYXRoLmZsb29yKHkpICogdGhpcy5fbGF5ZXJTaXplLndpZHRoO1xuICAgICAgICB0aGlzLl90aWxlZFRpbGVzW2luZGV4XSA9IHRpbGVkVGlsZTtcbiAgICAgICAgdGhpcy5fY3VsbGluZ0RpcnR5ID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGlsZWRUaWxlKSB7XG4gICAgICAgICAgICB0aGlzLl9oYXNUaWxlZE5vZGVHcmlkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2hhc1RpbGVkTm9kZUdyaWQgPSB0aGlzLl90aWxlZFRpbGVzLnNvbWUoZnVuY3Rpb24gKHRpbGVkTm9kZSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISF0aWxlZE5vZGU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aWxlZFRpbGU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJuIHRleHR1cmUuXG4gICAgICogISN6aCDojrflj5bnurnnkIbjgIJcbiAgICAgKiBAbWV0aG9kIGdldFRleHR1cmVcbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IG9mIHRleHR1cmVzXG4gICAgICogQHJldHVybiB7VGV4dHVyZTJEfVxuICAgICAqL1xuICAgIGdldFRleHR1cmUgKGluZGV4KSB7XG4gICAgICAgIGluZGV4ID0gaW5kZXggfHwgMDtcbiAgICAgICAgaWYgKHRoaXMuX3RleHR1cmVzICYmIGluZGV4ID49IDAgJiYgdGhpcy5fdGV4dHVyZXMubGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90ZXh0dXJlc1tpbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJuIHRleHR1cmUuXG4gICAgICogISN6aCDojrflj5bnurnnkIbjgIJcbiAgICAgKiBAbWV0aG9kIGdldFRleHR1cmVzXG4gICAgICogQHJldHVybiB7VGV4dHVyZTJEfVxuICAgICAqL1xuICAgIGdldFRleHR1cmVzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RleHR1cmVzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldCB0aGUgdGV4dHVyZS5cbiAgICAgKiAhI3poIOiuvue9rue6ueeQhuOAglxuICAgICAqIEBtZXRob2Qgc2V0VGV4dHVyZVxuICAgICAqIEBwYXJhbSB7VGV4dHVyZTJEfSB0ZXh0dXJlXG4gICAgICovXG4gICAgc2V0VGV4dHVyZSAodGV4dHVyZSl7XG4gICAgICAgIHRoaXMuc2V0VGV4dHVyZXMoW3RleHR1cmVdKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgdGhlIHRleHR1cmUuXG4gICAgICogISN6aCDorr7nva7nurnnkIbjgIJcbiAgICAgKiBAbWV0aG9kIHNldFRleHR1cmVcbiAgICAgKiBAcGFyYW0ge1RleHR1cmUyRH0gdGV4dHVyZXNcbiAgICAgKi9cbiAgICBzZXRUZXh0dXJlcyAodGV4dHVyZXMpIHtcbiAgICAgICAgdGhpcy5fdGV4dHVyZXMgPSB0ZXh0dXJlcztcbiAgICAgICAgdGhpcy5fYWN0aXZhdGVNYXRlcmlhbCgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldHMgbGF5ZXIgc2l6ZS5cbiAgICAgKiAhI3poIOiOt+W+l+WxguWkp+Wwj+OAglxuICAgICAqIEBtZXRob2QgZ2V0TGF5ZXJTaXplXG4gICAgICogQHJldHVybiB7U2l6ZX1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBzaXplID0gdGlsZWRMYXllci5nZXRMYXllclNpemUoKTtcbiAgICAgKiBjYy5sb2coXCJsYXllciBzaXplOiBcIiArIHNpemUpO1xuICAgICAqL1xuICAgIGdldExheWVyU2l6ZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllclNpemU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2l6ZSBvZiB0aGUgbWFwJ3MgdGlsZSAoY291bGQgYmUgZGlmZmVyZW50IGZyb20gdGhlIHRpbGUncyBzaXplKS5cbiAgICAgKiAhI3poIOiOt+WPliB0aWxlIOeahOWkp+WwjyggdGlsZSDnmoTlpKflsI/lj6/og73kvJrmnInmiYDkuI3lkIwp44CCXG4gICAgICogQG1ldGhvZCBnZXRNYXBUaWxlU2l6ZVxuICAgICAqIEByZXR1cm4ge1NpemV9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBsZXQgbWFwVGlsZVNpemUgPSB0aWxlZExheWVyLmdldE1hcFRpbGVTaXplKCk7XG4gICAgICogY2MubG9nKFwiTWFwVGlsZSBzaXplOiBcIiArIG1hcFRpbGVTaXplKTtcbiAgICAgKi9cbiAgICBnZXRNYXBUaWxlU2l6ZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBUaWxlU2l6ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXRzIFRpbGUgc2V0IGZpcnN0IGluZm9ybWF0aW9uIGZvciB0aGUgbGF5ZXIuXG4gICAgICogISN6aCDojrflj5YgbGF5ZXIg57Si5byV5L2N572u5Li6MOeahCBUaWxlc2V0IOS/oeaBr+OAglxuICAgICAqIEBtZXRob2QgZ2V0VGlsZVNldFxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggb2YgdGlsZXNldHNcbiAgICAgKiBAcmV0dXJuIHtUTVhUaWxlc2V0SW5mb31cbiAgICAgKi9cbiAgICBnZXRUaWxlU2V0IChpbmRleCkge1xuICAgICAgICBpbmRleCA9IGluZGV4IHx8IDA7XG4gICAgICAgIGlmICh0aGlzLl90aWxlc2V0cyAmJiBpbmRleCA+PSAwICYmIHRoaXMuX3RpbGVzZXRzLmxlbmd0aCA+IGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGlsZXNldHNbaW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldHMgdGlsZSBzZXQgYWxsIGluZm9ybWF0aW9uIGZvciB0aGUgbGF5ZXIuXG4gICAgICogISN6aCDojrflj5YgbGF5ZXIg5omA5pyJ55qEIFRpbGVzZXQg5L+h5oGv44CCXG4gICAgICogQG1ldGhvZCBnZXRUaWxlU2V0XG4gICAgICogQHJldHVybiB7VE1YVGlsZXNldEluZm99XG4gICAgICovXG4gICAgZ2V0VGlsZVNldHMgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGlsZXNldHM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0cyB0aWxlIHNldCBpbmZvcm1hdGlvbiBmb3IgdGhlIGxheWVyLlxuICAgICAqICEjemgg6K6+572uIGxheWVyIOeahCB0aWxlc2V0IOS/oeaBr+OAglxuICAgICAqIEBtZXRob2Qgc2V0VGlsZVNldFxuICAgICAqIEBwYXJhbSB7VE1YVGlsZXNldEluZm99IHRpbGVzZXRcbiAgICAgKi9cbiAgICBzZXRUaWxlU2V0ICh0aWxlc2V0KSB7XG4gICAgICAgIHRoaXMuc2V0VGlsZVNldHMoW3RpbGVzZXRdKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXRzIFRpbGUgc2V0IGluZm9ybWF0aW9uIGZvciB0aGUgbGF5ZXIuXG4gICAgICogISN6aCDorr7nva4gbGF5ZXIg55qEIFRpbGVzZXQg5L+h5oGv44CCXG4gICAgICogQG1ldGhvZCBzZXRUaWxlU2V0c1xuICAgICAqIEBwYXJhbSB7VE1YVGlsZXNldEluZm99IHRpbGVzZXRzXG4gICAgICovXG4gICAgc2V0VGlsZVNldHMgKHRpbGVzZXRzKSB7XG4gICAgICAgIHRoaXMuX3RpbGVzZXRzID0gdGlsZXNldHM7XG4gICAgICAgIGxldCB0ZXh0dXJlcyA9IHRoaXMuX3RleHR1cmVzID0gW107XG4gICAgICAgIGxldCB0ZXhHcmlkcyA9IHRoaXMuX3RleEdyaWRzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGlsZXNldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0aWxlc2V0ID0gdGlsZXNldHNbaV07XG4gICAgICAgICAgICBpZiAodGlsZXNldCkge1xuICAgICAgICAgICAgICAgIHRleHR1cmVzW2ldID0gdGlsZXNldC5zb3VyY2VJbWFnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNjLlRpbGVkTWFwLmxvYWRBbGxUZXh0dXJlcyAodGV4dHVyZXMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGlsZXNldHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRpbGVzZXRJbmZvID0gdGlsZXNldHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCF0aWxlc2V0SW5mbykgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2MuVGlsZWRNYXAuZmlsbFRleHR1cmVHcmlkcyh0aWxlc2V0SW5mbywgdGV4R3JpZHMsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcHJlcGFyZVRvUmVuZGVyKCk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSxcblxuICAgIF90cmF2ZXJzZUFsbEdyaWQgKCkge1xuICAgICAgICBsZXQgdGlsZXMgPSB0aGlzLl90aWxlcztcbiAgICAgICAgbGV0IHRleEdyaWRzID0gdGhpcy5fdGV4R3JpZHM7XG4gICAgICAgIGxldCB0aWxlc2V0SW5kZXhBcnIgPSB0aGlzLl90aWxlc2V0SW5kZXhBcnI7XG4gICAgICAgIGxldCB0aWxlc2V0SW5kZXhUb0FyckluZGV4ID0gdGhpcy5fdGlsZXNldEluZGV4VG9BcnJJbmRleCA9IHt9O1xuXG4gICAgICAgIGNvbnN0IFRpbGVkTWFwID0gY2MuVGlsZWRNYXA7XG4gICAgICAgIGNvbnN0IFRpbGVGbGFnID0gVGlsZWRNYXAuVGlsZUZsYWc7XG4gICAgICAgIGNvbnN0IEZMSVBQRURfTUFTSyA9IFRpbGVGbGFnLkZMSVBQRURfTUFTSztcblxuICAgICAgICB0aWxlc2V0SW5kZXhBcnIubGVuZ3RoID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGdpZCA9IHRpbGVzW2ldO1xuICAgICAgICAgICAgaWYgKGdpZCA9PT0gMCkgY29udGludWU7XG4gICAgICAgICAgICBnaWQgPSAoKGdpZCAmIEZMSVBQRURfTUFTSykgPj4+IDApO1xuICAgICAgICAgICAgbGV0IGdyaWQgPSB0ZXhHcmlkc1tnaWRdO1xuICAgICAgICAgICAgaWYgKCFncmlkKSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoXCJDQ1RpbGVkTGF5ZXI6X3RyYXZlcnNlQWxsR3JpZCBncmlkIGlzIG51bGwsIGdpZCBpczpcIiwgZ2lkKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0aWxlc2V0SWR4ID0gZ3JpZC50ZXhJZDtcbiAgICAgICAgICAgIGlmICh0aWxlc2V0SW5kZXhUb0FyckluZGV4W3RpbGVzZXRJZHhdICE9PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuICAgICAgICAgICAgdGlsZXNldEluZGV4VG9BcnJJbmRleFt0aWxlc2V0SWR4XSA9IHRpbGVzZXRJbmRleEFyci5sZW5ndGg7XG4gICAgICAgICAgICB0aWxlc2V0SW5kZXhBcnIucHVzaCh0aWxlc2V0SWR4KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfaW5pdCAobGF5ZXJJbmZvLCBtYXBJbmZvLCB0aWxlc2V0cywgdGV4dHVyZXMsIHRleEdyaWRzKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9jdWxsaW5nRGlydHkgPSB0cnVlO1xuICAgICAgICB0aGlzLl9sYXllckluZm8gPSBsYXllckluZm87XG4gICAgICAgIHRoaXMuX21hcEluZm8gPSBtYXBJbmZvO1xuXG4gICAgICAgIGxldCBzaXplID0gbGF5ZXJJbmZvLl9sYXllclNpemU7XG5cbiAgICAgICAgLy8gbGF5ZXJJbmZvXG4gICAgICAgIHRoaXMuX2xheWVyTmFtZSA9IGxheWVySW5mby5uYW1lO1xuICAgICAgICB0aGlzLl90aWxlcyA9IGxheWVySW5mby5fdGlsZXM7XG4gICAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSBsYXllckluZm8ucHJvcGVydGllcztcbiAgICAgICAgdGhpcy5fbGF5ZXJTaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5fbWluR0lEID0gbGF5ZXJJbmZvLl9taW5HSUQ7XG4gICAgICAgIHRoaXMuX21heEdJRCA9IGxheWVySW5mby5fbWF4R0lEO1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gbGF5ZXJJbmZvLl9vcGFjaXR5O1xuICAgICAgICB0aGlzLl9yZW5kZXJPcmRlciA9IG1hcEluZm8ucmVuZGVyT3JkZXI7XG4gICAgICAgIHRoaXMuX3N0YWdnZXJBeGlzID0gbWFwSW5mby5nZXRTdGFnZ2VyQXhpcygpO1xuICAgICAgICB0aGlzLl9zdGFnZ2VySW5kZXggPSBtYXBJbmZvLmdldFN0YWdnZXJJbmRleCgpO1xuICAgICAgICB0aGlzLl9oZXhTaWRlTGVuZ3RoID0gbWFwSW5mby5nZXRIZXhTaWRlTGVuZ3RoKCk7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbnMgPSBtYXBJbmZvLmdldFRpbGVBbmltYXRpb25zKCk7XG5cbiAgICAgICAgLy8gdGlsZXNldHNcbiAgICAgICAgdGhpcy5fdGlsZXNldHMgPSB0aWxlc2V0cztcbiAgICAgICAgLy8gdGV4dHVyZXNcbiAgICAgICAgdGhpcy5fdGV4dHVyZXMgPSB0ZXh0dXJlcztcbiAgICAgICAgLy8gZ3JpZCB0ZXh0dXJlXG4gICAgICAgIHRoaXMuX3RleEdyaWRzID0gdGV4R3JpZHM7XG5cbiAgICAgICAgLy8gbWFwSW5mb1xuICAgICAgICB0aGlzLl9sYXllck9yaWVudGF0aW9uID0gbWFwSW5mby5vcmllbnRhdGlvbjtcbiAgICAgICAgdGhpcy5fbWFwVGlsZVNpemUgPSBtYXBJbmZvLmdldFRpbGVTaXplKCk7XG5cbiAgICAgICAgbGV0IG1hcHR3ID0gdGhpcy5fbWFwVGlsZVNpemUud2lkdGg7XG4gICAgICAgIGxldCBtYXB0aCA9IHRoaXMuX21hcFRpbGVTaXplLmhlaWdodDtcbiAgICAgICAgbGV0IGxheWVyVyA9IHRoaXMuX2xheWVyU2l6ZS53aWR0aDtcbiAgICAgICAgbGV0IGxheWVySCA9IHRoaXMuX2xheWVyU2l6ZS5oZWlnaHQ7XG5cbiAgICAgICAgaWYgKHRoaXMuX2xheWVyT3JpZW50YXRpb24gPT09IGNjLlRpbGVkTWFwLk9yaWVudGF0aW9uLkhFWCkge1xuICAgICAgICAgICAgLy8gaGFuZGxlIGhleCBtYXBcbiAgICAgICAgICAgIGNvbnN0IFRpbGVkTWFwID0gY2MuVGlsZWRNYXA7XG4gICAgICAgICAgICBjb25zdCBTdGFnZ2VyQXhpcyA9IFRpbGVkTWFwLlN0YWdnZXJBeGlzO1xuICAgICAgICAgICAgY29uc3QgU3RhZ2dlckluZGV4ID0gVGlsZWRNYXAuU3RhZ2dlckluZGV4OyAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHdpZHRoID0gMCwgaGVpZ2h0ID0gMDtcblxuICAgICAgICAgICAgdGhpcy5fb2RkX2V2ZW4gPSAodGhpcy5fc3RhZ2dlckluZGV4ID09PSBTdGFnZ2VySW5kZXguU1RBR0dFUklOREVYX09ERCkgPyAxIDogLTE7XG4gICAgICAgICAgICBpZiAodGhpcy5fc3RhZ2dlckF4aXMgPT09IFN0YWdnZXJBeGlzLlNUQUdHRVJBWElTX1gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kaWZmWDEgPSAobWFwdHcgLSB0aGlzLl9oZXhTaWRlTGVuZ3RoKSAvIDI7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlmZlkxID0gMDtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBtYXB0aCAqIChsYXllckggKyAwLjUpO1xuICAgICAgICAgICAgICAgIHdpZHRoID0gKG1hcHR3ICsgdGhpcy5faGV4U2lkZUxlbmd0aCkgKiBNYXRoLmZsb29yKGxheWVyVyAvIDIpICsgbWFwdHcgKiAobGF5ZXJXICUgMik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RpZmZYMSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlmZlkxID0gKG1hcHRoIC0gdGhpcy5faGV4U2lkZUxlbmd0aCkgLyAyO1xuICAgICAgICAgICAgICAgIHdpZHRoID0gbWFwdHcgKiAobGF5ZXJXICsgMC41KTtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSAobWFwdGggKyB0aGlzLl9oZXhTaWRlTGVuZ3RoKSAqIE1hdGguZmxvb3IobGF5ZXJIIC8gMikgKyBtYXB0aCAqIChsYXllckggJSAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9sYXllck9yaWVudGF0aW9uID09PSBjYy5UaWxlZE1hcC5PcmllbnRhdGlvbi5JU08pIHtcbiAgICAgICAgICAgIGxldCB3aCA9IGxheWVyVyArIGxheWVySDtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZShtYXB0dyAqIDAuNSAqIHdoLCBtYXB0aCAqIDAuNSAqIHdoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZShsYXllclcgKiBtYXB0dywgbGF5ZXJIICogbWFwdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb2Zmc2V0IChhZnRlciBsYXllciBvcmllbnRhdGlvbiBpcyBzZXQpO1xuICAgICAgICB0aGlzLl9vZmZzZXQgPSBjYy52MihsYXllckluZm8ub2Zmc2V0LngsIC1sYXllckluZm8ub2Zmc2V0LnkpO1xuICAgICAgICB0aGlzLl91c2VBdXRvbWF0aWNWZXJ0ZXhaID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3ZlcnRleFp2YWx1ZSA9IDA7XG4gICAgICAgIHRoaXMuX3N5bmNBbmNob3JQb2ludCgpO1xuICAgICAgICB0aGlzLl9wcmVwYXJlVG9SZW5kZXIoKTtcbiAgICB9LFxuXG4gICAgX3ByZXBhcmVUb1JlbmRlciAoKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVZlcnRpY2VzKCk7XG4gICAgICAgIHRoaXMuX3RyYXZlcnNlQWxsR3JpZCgpO1xuICAgICAgICB0aGlzLl91cGRhdGVBbGxVc2VyTm9kZSgpO1xuICAgICAgICB0aGlzLl9hY3RpdmF0ZU1hdGVyaWFsKCk7XG4gICAgfSxcblxuICAgIF9idWlsZE1hdGVyaWFsICh0aWxlc2V0SWR4KSB7XG4gICAgICAgIGxldCB0ZXhJZE1hdElkeCA9IHRoaXMuX3RleElkVG9NYXRJbmRleDtcbiAgICAgICAgaWYgKHRleElkTWF0SWR4W3RpbGVzZXRJZHhdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRpbGVzZXRJbmRleEFyciA9IHRoaXMuX3RpbGVzZXRJbmRleEFycjtcbiAgICAgICAgbGV0IHRpbGVzZXRJbmRleFRvQXJySW5kZXggPSB0aGlzLl90aWxlc2V0SW5kZXhUb0FyckluZGV4O1xuICAgICAgICBsZXQgaW5kZXggPSB0aWxlc2V0SW5kZXhUb0FyckluZGV4W3RpbGVzZXRJZHhdO1xuICAgICAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGlsZXNldEluZGV4VG9BcnJJbmRleFt0aWxlc2V0SWR4XSA9IGluZGV4ID0gdGlsZXNldEluZGV4QXJyLmxlbmd0aDtcbiAgICAgICAgICAgIHRpbGVzZXRJbmRleEFyci5wdXNoKHRpbGVzZXRJZHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRleHR1cmUgPSB0aGlzLl90ZXh0dXJlc1t0aWxlc2V0SWR4XTtcbiAgICAgICAgbGV0IG1hdGVyaWFsID0gdGhpcy5fbWF0ZXJpYWxzW2luZGV4XTtcbiAgICAgICAgaWYgKCFtYXRlcmlhbCkge1xuICAgICAgICAgICAgbWF0ZXJpYWwgPSBNYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLXNwcml0ZScpO1xuICAgICAgICB9XG4gICAgICAgIG1hdGVyaWFsID0gTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZShtYXRlcmlhbCwgdGhpcyk7XG5cbiAgICAgICAgbWF0ZXJpYWwuZGVmaW5lKCdDQ19VU0VfTU9ERUwnLCB0cnVlKTtcbiAgICAgICAgbWF0ZXJpYWwuc2V0UHJvcGVydHkoJ3RleHR1cmUnLCB0ZXh0dXJlKTtcblxuICAgICAgICB0aGlzLl9tYXRlcmlhbHNbaW5kZXhdID0gbWF0ZXJpYWw7XG4gICAgICAgIHRleElkTWF0SWR4W3RpbGVzZXRJZHhdID0gaW5kZXg7XG4gICAgICAgIHJldHVybiBtYXRlcmlhbDtcbiAgICB9LFxuXG4gICAgX2FjdGl2YXRlTWF0ZXJpYWwgKCkge1xuICAgICAgICBsZXQgdGlsZXNldEluZGV4QXJyID0gdGhpcy5fdGlsZXNldEluZGV4QXJyO1xuICAgICAgICBpZiAodGlsZXNldEluZGV4QXJyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlUmVuZGVyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWF0TGVuID0gdGlsZXNldEluZGV4QXJyLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRMZW47IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fYnVpbGRNYXRlcmlhbCh0aWxlc2V0SW5kZXhBcnJbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hdGVyaWFscy5sZW5ndGggPSBtYXRMZW47XG4gICAgICAgIHRoaXMubWFya0ZvclJlbmRlcih0cnVlKTtcbiAgICB9XG59KTtcblxuY2MuVGlsZWRMYXllciA9IG1vZHVsZS5leHBvcnRzID0gVGlsZWRMYXllcjtcbiJdLCJzb3VyY2VSb290IjoiLyJ9