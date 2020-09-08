
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/tilemap/CCTiledMap.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

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
require('./CCTMXXMLParser');

require('./CCTiledMapAsset');

require('./CCTiledLayer');

require('./CCTiledTile');

require('./CCTiledObjectGroup');
/**
 * !#en The orientation of tiled map.
 * !#zh Tiled Map 地图方向。
 * @enum TiledMap.Orientation
 * @static
 */


var Orientation = cc.Enum({
  /**
   * !#en Orthogonal orientation.
   * !#zh 直角鸟瞰地图（90°地图）。
   * @property ORTHO
   * @type {Number}
   * @static
   */
  ORTHO: 0,

  /**
   * !#en Hexagonal orientation.
   * !#zh 六边形地图
   * @property HEX
   * @type {Number}
   * @static
   */
  HEX: 1,

  /**
   * Isometric orientation.
   * 等距斜视地图（斜45°地图）。
   * @property ISO
   * @type {Number}
   * @static
   */
  ISO: 2
});
/**
 * The property type of tiled map.
 * @enum TiledMap.Property
 * @static
 */

var Property = cc.Enum({
  /**
   * @property NONE
   * @type {Number}
   * @static
   */
  NONE: 0,

  /**
   * @property MAP
   * @type {Number}
   * @static
   */
  MAP: 1,

  /**
   * @property LAYER
   * @type {Number}
   * @static
   */
  LAYER: 2,

  /**
   * @property OBJECTGROUP
   * @type {Number}
   * @static
   */
  OBJECTGROUP: 3,

  /**
   * @property OBJECT
   * @type {Number}
   * @static
   */
  OBJECT: 4,

  /**
   * @property TILE
   * @type {Number}
   * @static
   */
  TILE: 5
});
/**
 * The tile flags of tiled map.
 * @enum TiledMap.TileFlag
 * @static
 */

var TileFlag = cc.Enum({
  /**
   * @property HORIZONTAL
   * @type {Number}
   * @static
   */
  HORIZONTAL: 0x80000000,

  /**
   * @property VERTICAL
   * @type {Number}
   * @static
   */
  VERTICAL: 0x40000000,

  /**
   * @property DIAGONAL
   * @type {Number}
   * @static
   */
  DIAGONAL: 0x20000000,

  /**
   * @property FLIPPED_ALL
   * @type {Number}
   * @static
   */
  FLIPPED_ALL: (0x80000000 | 0x40000000 | 0x20000000 | 0x10000000) >>> 0,

  /**
   * @property FLIPPED_MASK
   * @type {Number}
   * @static
   */
  FLIPPED_MASK: ~(0x80000000 | 0x40000000 | 0x20000000 | 0x10000000) >>> 0
});
/**
 * !#en The stagger axis of Hex tiled map.
 * !#zh 六边形地图的 stagger axis 值
 * @enum TiledMap.StaggerAxis
 * @static
 */

var StaggerAxis = cc.Enum({
  /**
   * @property STAGGERAXIS_X
   * @type {Number}
   * @static
   */
  STAGGERAXIS_X: 0,

  /**
   * @property STAGGERAXIS_Y
   * @type {Number}
   * @static
   */
  STAGGERAXIS_Y: 1
});
/**
 * !#en The stagger index of Hex tiled map.
 * !#zh 六边形地图的 stagger index 值
 * @enum TiledMap.RenderOrder
 * @static
 */

var StaggerIndex = cc.Enum({
  /**
   * @property STAGGERINDEX_ODD
   * @type {Number}
   * @static
   */
  STAGGERINDEX_ODD: 0,

  /**
   * @property STAGGERINDEX_EVEN
   * @type {Number}
   * @static
   */
  STAGGERINDEX_EVEN: 1
});
/**
 * !#en The render order of tiled map.
 * !#zh 地图的渲染顺序
 * @enum TiledMap.RenderOrder
 * @static
 */

var RenderOrder = cc.Enum({
  /**
   * @property RightDown
   * @type {Number}
   * @static
   */
  RightDown: 0,

  /**
   * @property RightUp
   * @type {Number}
   * @static
   */
  RightUp: 1,

  /**
   * @property LeftDown
   * @type {Number}
   * @static
   */
  LeftDown: 2,

  /**
   * @property LeftUp
   * @type {Number}
   * @static
   */
  LeftUp: 3
});
/**
 * !#en TiledMap Object Type
 * !#zh 地图物体类型
 * @enum TiledMap.TMXObjectType
 * @static
 */

var TMXObjectType = cc.Enum({
  /**
   * @property RECT
   * @type {Number}
   * @static
   */
  RECT: 0,

  /**
   * @property ELLIPSE
   * @type {Number}
   * @static
   */
  ELLIPSE: 1,

  /**
   * @property POLYGON
   * @type {Number}
   * @static
   */
  POLYGON: 2,

  /**
   * @property POLYLINE
   * @type {Number}
   * @static
   */
  POLYLINE: 3,

  /**
   * @property IMAGE
   * @type {Number}
   * @static
   */
  IMAGE: 4,

  /**
   * @property TEXT
   * @type {Number}
   * @static
   */
  TEXT: 5
});
/**
 * !#en Renders a TMX Tile Map in the scene.
 * !#zh 在场景中渲染一个 tmx 格式的 Tile Map。
 * @class TiledMap
 * @extends Component
 */

var TiledMap = cc.Class({
  name: 'cc.TiledMap',
  "extends": cc.Component,
  editor: CC_EDITOR && {
    executeInEditMode: true,
    menu: 'i18n:MAIN_MENU.component.renderers/TiledMap'
  },
  ctor: function ctor() {
    // store all layer gid corresponding texture info, index is gid, format likes '[gid0]=tex-info,[gid1]=tex-info, ...'
    this._texGrids = []; // store all tileset texture, index is tileset index, format likes '[0]=texture0, [1]=texture1, ...'

    this._textures = [];
    this._tilesets = [];
    this._animations = [];
    this._imageLayers = [];
    this._layers = [];
    this._groups = [];
    this._images = [];
    this._properties = [];
    this._tileProperties = [];
    this._mapSize = cc.size(0, 0);
    this._tileSize = cc.size(0, 0);
  },
  statics: {
    Orientation: Orientation,
    Property: Property,
    TileFlag: TileFlag,
    StaggerAxis: StaggerAxis,
    StaggerIndex: StaggerIndex,
    TMXObjectType: TMXObjectType,
    RenderOrder: RenderOrder
  },
  properties: {
    _tmxFile: {
      "default": null,
      type: cc.TiledMapAsset
    },

    /**
     * !#en The TiledMap Asset.
     * !#zh TiledMap 资源。
     * @property {TiledMapAsset} tmxAsset
     * @default ""
     */
    tmxAsset: {
      get: function get() {
        return this._tmxFile;
      },
      set: function set(value, force) {
        if (this._tmxFile !== value || CC_EDITOR && force) {
          this._tmxFile = value;

          this._applyFile();
        }
      },
      type: cc.TiledMapAsset
    }
  },

  /**
   * !#en Gets the map size.
   * !#zh 获取地图大小。
   * @method getMapSize
   * @return {Size}
   * @example
   * let mapSize = tiledMap.getMapSize();
   * cc.log("Map Size: " + mapSize);
   */
  getMapSize: function getMapSize() {
    return this._mapSize;
  },

  /**
   * !#en Gets the tile size.
   * !#zh 获取地图背景中 tile 元素的大小。
   * @method getTileSize
   * @return {Size}
   * @example
   * let tileSize = tiledMap.getTileSize();
   * cc.log("Tile Size: " + tileSize);
   */
  getTileSize: function getTileSize() {
    return this._tileSize;
  },

  /**
   * !#en map orientation.
   * !#zh 获取地图方向。
   * @method getMapOrientation
   * @return {Number}
   * @example
   * let mapOrientation = tiledMap.getMapOrientation();
   * cc.log("Map Orientation: " + mapOrientation);
   */
  getMapOrientation: function getMapOrientation() {
    return this._mapOrientation;
  },

  /**
   * !#en object groups.
   * !#zh 获取所有的对象层。
   * @method getObjectGroups
   * @return {TiledObjectGroup[]}
   * @example
   * let objGroups = titledMap.getObjectGroups();
   * for (let i = 0; i < objGroups.length; ++i) {
   *     cc.log("obj: " + objGroups[i]);
   * }
   */
  getObjectGroups: function getObjectGroups() {
    return this._groups;
  },

  /**
   * !#en Return the TMXObjectGroup for the specific group.
   * !#zh 获取指定的 TMXObjectGroup。
   * @method getObjectGroup
   * @param {String} groupName
   * @return {TiledObjectGroup}
   * @example
   * let group = titledMap.getObjectGroup("Players");
   * cc.log("ObjectGroup: " + group);
   */
  getObjectGroup: function getObjectGroup(groupName) {
    var groups = this._groups;

    for (var i = 0, l = groups.length; i < l; i++) {
      var group = groups[i];

      if (group && group.getGroupName() === groupName) {
        return group;
      }
    }

    return null;
  },

  /**
   * !#en enable or disable culling
   * !#zh 开启或关闭裁剪。
   * @method enableCulling
   * @param value
   */
  enableCulling: function enableCulling(value) {
    var layers = this._layers;

    for (var i = 0; i < layers.length; ++i) {
      layers[i].enableCulling(value);
    }
  },

  /**
   * !#en Gets the map properties.
   * !#zh 获取地图的属性。
   * @method getProperties
   * @return {Object[]}
   * @example
   * let properties = titledMap.getProperties();
   * for (let i = 0; i < properties.length; ++i) {
   *     cc.log("Properties: " + properties[i]);
   * }
   */
  getProperties: function getProperties() {
    return this._properties;
  },

  /**
   * !#en Return All layers array.
   * !#zh 返回包含所有 layer 的数组。
   * @method getLayers
   * @returns {TiledLayer[]}
   * @example
   * let layers = titledMap.getLayers();
   * for (let i = 0; i < layers.length; ++i) {
   *     cc.log("Layers: " + layers[i]);
   * }
   */
  getLayers: function getLayers() {
    return this._layers;
  },

  /**
   * !#en return the cc.TiledLayer for the specific layer.
   * !#zh 获取指定名称的 layer。
   * @method getLayer
   * @param {String} layerName
   * @return {TiledLayer}
   * @example
   * let layer = titledMap.getLayer("Player");
   * cc.log(layer);
   */
  getLayer: function getLayer(layerName) {
    var layers = this._layers;

    for (var i = 0, l = layers.length; i < l; i++) {
      var layer = layers[i];

      if (layer && layer.getLayerName() === layerName) {
        return layer;
      }
    }

    return null;
  },
  _changeLayer: function _changeLayer(layerName, replaceLayer) {
    var layers = this._layers;

    for (var i = 0, l = layers.length; i < l; i++) {
      var layer = layers[i];

      if (layer && layer.getLayerName() === layerName) {
        layers[i] = replaceLayer;
        return;
      }
    }
  },

  /**
   * !#en Return the value for the specific property name.
   * !#zh 通过属性名称，获取指定的属性。
   * @method getProperty
   * @param {String} propertyName
   * @return {String}
   * @example
   * let property = titledMap.getProperty("info");
   * cc.log("Property: " + property);
   */
  getProperty: function getProperty(propertyName) {
    return this._properties[propertyName.toString()];
  },

  /**
   * !#en Return properties dictionary for tile GID.
   * !#zh 通过 GID ，获取指定的属性。
   * @method getPropertiesForGID
   * @param {Number} GID
   * @return {Object}
   * @example
   * let properties = titledMap.getPropertiesForGID(GID);
   * cc.log("Properties: " + properties);
   */
  getPropertiesForGID: function getPropertiesForGID(GID) {
    return this._tileProperties[GID];
  },
  __preload: function __preload() {
    if (this._tmxFile) {
      // refresh layer entities
      this._applyFile();
    }
  },
  onEnable: function onEnable() {
    this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this._syncAnchorPoint, this);
  },
  onDisable: function onDisable() {
    this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this._syncAnchorPoint, this);
  },
  _applyFile: function _applyFile() {
    var file = this._tmxFile;

    if (file) {
      var texValues = file.textures;
      var texKeys = file.textureNames;
      var texSizes = file.textureSizes;
      var textures = {};
      var textureSizes = {};

      for (var i = 0; i < texValues.length; ++i) {
        var texName = texKeys[i];
        textures[texName] = texValues[i];
        textureSizes[texName] = texSizes[i];
      }

      var imageLayerTextures = {};
      texValues = file.imageLayerTextures;
      texKeys = file.imageLayerTextureNames;

      for (var _i = 0; _i < texValues.length; ++_i) {
        imageLayerTextures[texKeys[_i]] = texValues[_i];
      }

      var tsxFileNames = file.tsxFileNames;
      var tsxFiles = file.tsxFiles;
      var tsxMap = {};

      for (var _i2 = 0; _i2 < tsxFileNames.length; ++_i2) {
        if (tsxFileNames[_i2].length > 0) {
          tsxMap[tsxFileNames[_i2]] = tsxFiles[_i2].text;
        }
      }

      var mapInfo = new cc.TMXMapInfo(file.tmxXmlStr, tsxMap, textures, textureSizes, imageLayerTextures);
      var tilesets = mapInfo.getTilesets();
      if (!tilesets || tilesets.length === 0) cc.logID(7241);

      this._buildWithMapInfo(mapInfo);
    } else {
      this._releaseMapInfo();
    }
  },
  _releaseMapInfo: function _releaseMapInfo() {
    // remove the layers & object groups added before
    var layers = this._layers;

    for (var i = 0, l = layers.length; i < l; i++) {
      layers[i].node.removeFromParent(true);
      layers[i].node.destroy();
    }

    layers.length = 0;
    var groups = this._groups;

    for (var _i3 = 0, _l = groups.length; _i3 < _l; _i3++) {
      groups[_i3].node.removeFromParent(true);

      groups[_i3].node.destroy();
    }

    groups.length = 0;
    var images = this._images;

    for (var _i4 = 0, _l2 = images.length; _i4 < _l2; _i4++) {
      images[_i4].removeFromParent(true);

      images[_i4].destroy();
    }

    images.length = 0;
  },
  _syncAnchorPoint: function _syncAnchorPoint() {
    var anchor = this.node.getAnchorPoint();
    var leftTopX = this.node.width * anchor.x;
    var leftTopY = this.node.height * (1 - anchor.y);
    var i, l;

    for (i = 0, l = this._layers.length; i < l; i++) {
      var layerInfo = this._layers[i];
      var layerNode = layerInfo.node; // Tiled layer sync anchor to map because it's old behavior,
      // do not change the behavior avoid influence user's existed logic.

      layerNode.setAnchorPoint(anchor);
    }

    for (i = 0, l = this._groups.length; i < l; i++) {
      var groupInfo = this._groups[i];
      var groupNode = groupInfo.node; // Group layer not sync anchor to map because it's old behavior,
      // do not change the behavior avoid influence user's existing logic.

      groupNode.anchorX = 0.5;
      groupNode.anchorY = 0.5;
      groupNode.x = groupInfo._offset.x - leftTopX + groupNode.width * groupNode.anchorX;
      groupNode.y = groupInfo._offset.y + leftTopY - groupNode.height * groupNode.anchorY;
    }

    for (i = 0, l = this._images.length; i < l; i++) {
      var image = this._images[i];
      image.anchorX = 0.5;
      image.anchorY = 0.5;
      image.x = image._offset.x - leftTopX + image.width * image.anchorX;
      image.y = image._offset.y + leftTopY - image.height * image.anchorY;
    }
  },
  _fillAniGrids: function _fillAniGrids(texGrids, animations) {
    for (var i in animations) {
      var animation = animations[i];
      if (!animation) continue;
      var frames = animation.frames;

      for (var j = 0; j < frames.length; j++) {
        var frame = frames[j];
        frame.grid = texGrids[frame.tileid];
      }
    }
  },
  _buildLayerAndGroup: function _buildLayerAndGroup() {
    var tilesets = this._tilesets;
    var texGrids = this._texGrids;
    var animations = this._animations;
    texGrids.length = 0;

    for (var i = 0, l = tilesets.length; i < l; ++i) {
      var tilesetInfo = tilesets[i];
      if (!tilesetInfo) continue;
      cc.TiledMap.fillTextureGrids(tilesetInfo, texGrids, i);
    }

    this._fillAniGrids(texGrids, animations);

    var layers = this._layers;
    var groups = this._groups;
    var images = this._images;
    var oldNodeNames = {};

    for (var _i5 = 0, n = layers.length; _i5 < n; _i5++) {
      oldNodeNames[layers[_i5].node._name] = true;
    }

    for (var _i6 = 0, _n = groups.length; _i6 < _n; _i6++) {
      oldNodeNames[groups[_i6].node._name] = true;
    }

    for (var _i7 = 0, _n2 = images.length; _i7 < _n2; _i7++) {
      oldNodeNames[images[_i7]._name] = true;
    }

    layers = this._layers = [];
    groups = this._groups = [];
    images = this._images = [];
    var mapInfo = this._mapInfo;
    var node = this.node;
    var layerInfos = mapInfo.getAllChildren();
    var textures = this._textures;
    var maxWidth = 0;
    var maxHeight = 0;

    if (layerInfos && layerInfos.length > 0) {
      for (var _i8 = 0, len = layerInfos.length; _i8 < len; _i8++) {
        var layerInfo = layerInfos[_i8];
        var name = layerInfo.name;
        var child = this.node.getChildByName(name);
        oldNodeNames[name] = false;

        if (!child) {
          child = new cc.Node();
          child.name = name;
          node.addChild(child);
        }

        child.setSiblingIndex(_i8);
        child.active = layerInfo.visible;

        if (layerInfo instanceof cc.TMXLayerInfo) {
          var layer = child.getComponent(cc.TiledLayer);

          if (!layer) {
            layer = child.addComponent(cc.TiledLayer);
          }

          layer._init(layerInfo, mapInfo, tilesets, textures, texGrids); // tell the layerinfo to release the ownership of the tiles map.


          layerInfo.ownTiles = false;
          layers.push(layer);
        } else if (layerInfo instanceof cc.TMXObjectGroupInfo) {
          var group = child.getComponent(cc.TiledObjectGroup);

          if (!group) {
            group = child.addComponent(cc.TiledObjectGroup);
          }

          group._init(layerInfo, mapInfo, texGrids);

          groups.push(group);
        } else if (layerInfo instanceof cc.TMXImageLayerInfo) {
          var texture = layerInfo.sourceImage;
          child.opacity = layerInfo.opacity;
          child.layerInfo = layerInfo;
          child._offset = cc.v2(layerInfo.offset.x, -layerInfo.offset.y);
          var image = child.getComponent(cc.Sprite);

          if (!image) {
            image = child.addComponent(cc.Sprite);
          }

          var spf = image.spriteFrame || new cc.SpriteFrame();
          spf.setTexture(texture);
          image.spriteFrame = spf;
          child.width = texture.width;
          child.height = texture.height;
          images.push(child);
        }

        maxWidth = Math.max(maxWidth, child.width);
        maxHeight = Math.max(maxHeight, child.height);
      }
    }

    var children = node.children;

    for (var _i9 = 0, _n3 = children.length; _i9 < _n3; _i9++) {
      var c = children[_i9];

      if (oldNodeNames[c._name]) {
        c.destroy();
      }
    }

    this.node.width = maxWidth;
    this.node.height = maxHeight;

    this._syncAnchorPoint();
  },
  _buildWithMapInfo: function _buildWithMapInfo(mapInfo) {
    this._mapInfo = mapInfo;
    this._mapSize = mapInfo.getMapSize();
    this._tileSize = mapInfo.getTileSize();
    this._mapOrientation = mapInfo.orientation;
    this._properties = mapInfo.properties;
    this._tileProperties = mapInfo.getTileProperties();
    this._imageLayers = mapInfo.getImageLayers();
    this._animations = mapInfo.getTileAnimations();
    this._tilesets = mapInfo.getTilesets();
    var tilesets = this._tilesets;
    this._textures.length = 0;
    var totalTextures = [];

    for (var i = 0, l = tilesets.length; i < l; ++i) {
      var tilesetInfo = tilesets[i];
      if (!tilesetInfo || !tilesetInfo.sourceImage) continue;
      this._textures[i] = tilesetInfo.sourceImage;
      totalTextures.push(tilesetInfo.sourceImage);
    }

    for (var _i10 = 0; _i10 < this._imageLayers.length; _i10++) {
      var imageLayer = this._imageLayers[_i10];
      if (!imageLayer || !imageLayer.sourceImage) continue;
      totalTextures.push(imageLayer.sourceImage);
    }

    cc.TiledMap.loadAllTextures(totalTextures, function () {
      this._buildLayerAndGroup();
    }.bind(this));
  },
  update: function update(dt) {
    var animations = this._animations;
    var texGrids = this._texGrids;

    for (var aniGID in animations) {
      var animation = animations[aniGID];
      var frames = animation.frames;
      var frame = frames[animation.frameIdx];
      animation.dt += dt;

      if (frame.duration < animation.dt) {
        animation.dt = 0;
        animation.frameIdx++;

        if (animation.frameIdx >= frames.length) {
          animation.frameIdx = 0;
        }

        frame = frames[animation.frameIdx];
      }

      texGrids[aniGID] = frame.grid;
    }
  }
});
cc.TiledMap = module.exports = TiledMap;

cc.TiledMap.loadAllTextures = function (textures, loadedCallback) {
  var totalNum = textures.length;

  if (totalNum === 0) {
    loadedCallback();
    return;
  }

  var curNum = 0;

  var itemCallback = function itemCallback() {
    curNum++;

    if (curNum >= totalNum) {
      loadedCallback();
    }
  };

  for (var i = 0; i < totalNum; i++) {
    var tex = textures[i];

    if (!tex.loaded) {
      tex.once('load', function () {
        itemCallback();
      });
    } else {
      itemCallback();
    }
  }
};

cc.TiledMap.fillTextureGrids = function (tileset, texGrids, texId) {
  var tex = tileset.sourceImage;

  if (!tileset.imageSize.width || !tileset.imageSize.height) {
    tileset.imageSize.width = tex.width;
    tileset.imageSize.height = tex.height;
  }

  var tw = tileset._tileSize.width,
      th = tileset._tileSize.height,
      imageW = tex.width,
      imageH = tex.height,
      spacing = tileset.spacing,
      margin = tileset.margin,
      cols = Math.floor((imageW - margin * 2 + spacing) / (tw + spacing)),
      rows = Math.floor((imageH - margin * 2 + spacing) / (th + spacing)),
      count = rows * cols,
      gid = tileset.firstGid,
      grid = null,
      override = texGrids[gid] ? true : false,
      texelCorrect = cc.macro.FIX_ARTIFACTS_BY_STRECHING_TEXEL_TMX ? 0.5 : 0; // Tiledmap may not be partitioned into blocks, resulting in a count value of 0

  if (count <= 0) {
    count = 1;
  }

  var maxGid = tileset.firstGid + count;

  for (; gid < maxGid; ++gid) {
    // Avoid overlapping
    if (override && !texGrids[gid]) {
      override = false;
    }

    if (!override && texGrids[gid]) {
      break;
    }

    grid = {
      // record texture id
      texId: texId,
      // record belong to which tileset
      tileset: tileset,
      x: 0,
      y: 0,
      width: tw,
      height: th,
      t: 0,
      l: 0,
      r: 0,
      b: 0,
      gid: gid
    };
    tileset.rectForGID(gid, grid);
    grid.x += texelCorrect;
    grid.y += texelCorrect;
    grid.width -= texelCorrect * 2;
    grid.height -= texelCorrect * 2;
    grid.t = grid.y / imageH;
    grid.l = grid.x / imageW;
    grid.r = (grid.x + grid.width) / imageW;
    grid.b = (grid.y + grid.height) / imageH;
    texGrids[gid] = grid;
  }
};

cc.js.obsolete(cc.TiledMap.prototype, 'cc.TiledMap.tmxFile', 'tmxAsset', true);
cc.js.get(cc.TiledMap.prototype, 'mapLoaded', function () {
  cc.errorID(7203);
  return [];
}, false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC90aWxlbWFwL0NDVGlsZWRNYXAuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIk9yaWVudGF0aW9uIiwiY2MiLCJFbnVtIiwiT1JUSE8iLCJIRVgiLCJJU08iLCJQcm9wZXJ0eSIsIk5PTkUiLCJNQVAiLCJMQVlFUiIsIk9CSkVDVEdST1VQIiwiT0JKRUNUIiwiVElMRSIsIlRpbGVGbGFnIiwiSE9SSVpPTlRBTCIsIlZFUlRJQ0FMIiwiRElBR09OQUwiLCJGTElQUEVEX0FMTCIsIkZMSVBQRURfTUFTSyIsIlN0YWdnZXJBeGlzIiwiU1RBR0dFUkFYSVNfWCIsIlNUQUdHRVJBWElTX1kiLCJTdGFnZ2VySW5kZXgiLCJTVEFHR0VSSU5ERVhfT0REIiwiU1RBR0dFUklOREVYX0VWRU4iLCJSZW5kZXJPcmRlciIsIlJpZ2h0RG93biIsIlJpZ2h0VXAiLCJMZWZ0RG93biIsIkxlZnRVcCIsIlRNWE9iamVjdFR5cGUiLCJSRUNUIiwiRUxMSVBTRSIsIlBPTFlHT04iLCJQT0xZTElORSIsIklNQUdFIiwiVEVYVCIsIlRpbGVkTWFwIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJtZW51IiwiY3RvciIsIl90ZXhHcmlkcyIsIl90ZXh0dXJlcyIsIl90aWxlc2V0cyIsIl9hbmltYXRpb25zIiwiX2ltYWdlTGF5ZXJzIiwiX2xheWVycyIsIl9ncm91cHMiLCJfaW1hZ2VzIiwiX3Byb3BlcnRpZXMiLCJfdGlsZVByb3BlcnRpZXMiLCJfbWFwU2l6ZSIsInNpemUiLCJfdGlsZVNpemUiLCJzdGF0aWNzIiwicHJvcGVydGllcyIsIl90bXhGaWxlIiwidHlwZSIsIlRpbGVkTWFwQXNzZXQiLCJ0bXhBc3NldCIsImdldCIsInNldCIsInZhbHVlIiwiZm9yY2UiLCJfYXBwbHlGaWxlIiwiZ2V0TWFwU2l6ZSIsImdldFRpbGVTaXplIiwiZ2V0TWFwT3JpZW50YXRpb24iLCJfbWFwT3JpZW50YXRpb24iLCJnZXRPYmplY3RHcm91cHMiLCJnZXRPYmplY3RHcm91cCIsImdyb3VwTmFtZSIsImdyb3VwcyIsImkiLCJsIiwibGVuZ3RoIiwiZ3JvdXAiLCJnZXRHcm91cE5hbWUiLCJlbmFibGVDdWxsaW5nIiwibGF5ZXJzIiwiZ2V0UHJvcGVydGllcyIsImdldExheWVycyIsImdldExheWVyIiwibGF5ZXJOYW1lIiwibGF5ZXIiLCJnZXRMYXllck5hbWUiLCJfY2hhbmdlTGF5ZXIiLCJyZXBsYWNlTGF5ZXIiLCJnZXRQcm9wZXJ0eSIsInByb3BlcnR5TmFtZSIsInRvU3RyaW5nIiwiZ2V0UHJvcGVydGllc0ZvckdJRCIsIkdJRCIsIl9fcHJlbG9hZCIsIm9uRW5hYmxlIiwibm9kZSIsIm9uIiwiTm9kZSIsIkV2ZW50VHlwZSIsIkFOQ0hPUl9DSEFOR0VEIiwiX3N5bmNBbmNob3JQb2ludCIsIm9uRGlzYWJsZSIsIm9mZiIsImZpbGUiLCJ0ZXhWYWx1ZXMiLCJ0ZXh0dXJlcyIsInRleEtleXMiLCJ0ZXh0dXJlTmFtZXMiLCJ0ZXhTaXplcyIsInRleHR1cmVTaXplcyIsInRleE5hbWUiLCJpbWFnZUxheWVyVGV4dHVyZXMiLCJpbWFnZUxheWVyVGV4dHVyZU5hbWVzIiwidHN4RmlsZU5hbWVzIiwidHN4RmlsZXMiLCJ0c3hNYXAiLCJ0ZXh0IiwibWFwSW5mbyIsIlRNWE1hcEluZm8iLCJ0bXhYbWxTdHIiLCJ0aWxlc2V0cyIsImdldFRpbGVzZXRzIiwibG9nSUQiLCJfYnVpbGRXaXRoTWFwSW5mbyIsIl9yZWxlYXNlTWFwSW5mbyIsInJlbW92ZUZyb21QYXJlbnQiLCJkZXN0cm95IiwiaW1hZ2VzIiwiYW5jaG9yIiwiZ2V0QW5jaG9yUG9pbnQiLCJsZWZ0VG9wWCIsIndpZHRoIiwieCIsImxlZnRUb3BZIiwiaGVpZ2h0IiwieSIsImxheWVySW5mbyIsImxheWVyTm9kZSIsInNldEFuY2hvclBvaW50IiwiZ3JvdXBJbmZvIiwiZ3JvdXBOb2RlIiwiYW5jaG9yWCIsImFuY2hvclkiLCJfb2Zmc2V0IiwiaW1hZ2UiLCJfZmlsbEFuaUdyaWRzIiwidGV4R3JpZHMiLCJhbmltYXRpb25zIiwiYW5pbWF0aW9uIiwiZnJhbWVzIiwiaiIsImZyYW1lIiwiZ3JpZCIsInRpbGVpZCIsIl9idWlsZExheWVyQW5kR3JvdXAiLCJ0aWxlc2V0SW5mbyIsImZpbGxUZXh0dXJlR3JpZHMiLCJvbGROb2RlTmFtZXMiLCJuIiwiX25hbWUiLCJfbWFwSW5mbyIsImxheWVySW5mb3MiLCJnZXRBbGxDaGlsZHJlbiIsIm1heFdpZHRoIiwibWF4SGVpZ2h0IiwibGVuIiwiY2hpbGQiLCJnZXRDaGlsZEJ5TmFtZSIsImFkZENoaWxkIiwic2V0U2libGluZ0luZGV4IiwiYWN0aXZlIiwidmlzaWJsZSIsIlRNWExheWVySW5mbyIsImdldENvbXBvbmVudCIsIlRpbGVkTGF5ZXIiLCJhZGRDb21wb25lbnQiLCJfaW5pdCIsIm93blRpbGVzIiwicHVzaCIsIlRNWE9iamVjdEdyb3VwSW5mbyIsIlRpbGVkT2JqZWN0R3JvdXAiLCJUTVhJbWFnZUxheWVySW5mbyIsInRleHR1cmUiLCJzb3VyY2VJbWFnZSIsIm9wYWNpdHkiLCJ2MiIsIm9mZnNldCIsIlNwcml0ZSIsInNwZiIsInNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJzZXRUZXh0dXJlIiwiTWF0aCIsIm1heCIsImNoaWxkcmVuIiwiYyIsIm9yaWVudGF0aW9uIiwiZ2V0VGlsZVByb3BlcnRpZXMiLCJnZXRJbWFnZUxheWVycyIsImdldFRpbGVBbmltYXRpb25zIiwidG90YWxUZXh0dXJlcyIsImltYWdlTGF5ZXIiLCJsb2FkQWxsVGV4dHVyZXMiLCJiaW5kIiwidXBkYXRlIiwiZHQiLCJhbmlHSUQiLCJmcmFtZUlkeCIsImR1cmF0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyIsImxvYWRlZENhbGxiYWNrIiwidG90YWxOdW0iLCJjdXJOdW0iLCJpdGVtQ2FsbGJhY2siLCJ0ZXgiLCJsb2FkZWQiLCJvbmNlIiwidGlsZXNldCIsInRleElkIiwiaW1hZ2VTaXplIiwidHciLCJ0aCIsImltYWdlVyIsImltYWdlSCIsInNwYWNpbmciLCJtYXJnaW4iLCJjb2xzIiwiZmxvb3IiLCJyb3dzIiwiY291bnQiLCJnaWQiLCJmaXJzdEdpZCIsIm92ZXJyaWRlIiwidGV4ZWxDb3JyZWN0IiwibWFjcm8iLCJGSVhfQVJUSUZBQ1RTX0JZX1NUUkVDSElOR19URVhFTF9UTVgiLCJtYXhHaWQiLCJ0IiwiciIsImIiLCJyZWN0Rm9yR0lEIiwianMiLCJvYnNvbGV0ZSIsInByb3RvdHlwZSIsImVycm9ySUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQUEsT0FBTyxDQUFDLGtCQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxtQkFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMsZ0JBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLGVBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLHNCQUFELENBQVA7QUFFQTs7Ozs7Ozs7QUFNQSxJQUFJQyxXQUFXLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ3RCOzs7Ozs7O0FBT0FDLEVBQUFBLEtBQUssRUFBRSxDQVJlOztBQVV0Qjs7Ozs7OztBQU9BQyxFQUFBQSxHQUFHLEVBQUUsQ0FqQmlCOztBQW1CdEI7Ozs7Ozs7QUFPQUMsRUFBQUEsR0FBRyxFQUFFO0FBMUJpQixDQUFSLENBQWxCO0FBNkJBOzs7Ozs7QUFLQSxJQUFJQyxRQUFRLEdBQUdMLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ25COzs7OztBQUtBSyxFQUFBQSxJQUFJLEVBQUUsQ0FOYTs7QUFRbkI7Ozs7O0FBS0FDLEVBQUFBLEdBQUcsRUFBRSxDQWJjOztBQWVuQjs7Ozs7QUFLQUMsRUFBQUEsS0FBSyxFQUFFLENBcEJZOztBQXNCbkI7Ozs7O0FBS0FDLEVBQUFBLFdBQVcsRUFBRSxDQTNCTTs7QUE2Qm5COzs7OztBQUtBQyxFQUFBQSxNQUFNLEVBQUUsQ0FsQ1c7O0FBb0NuQjs7Ozs7QUFLQUMsRUFBQUEsSUFB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eEUsSUFBQUEsSUFBSSxDQUFDOUUsQ0FBTCxHQUFVOEUsSUFBSSxDQUFDcEIsQ0FBTixHQUFXMkYsTUFBcEI7QUFDQXZFLElBQUFBLElBQUksQ0FBQ3VGLENBQUwsR0FBUyxDQUFDdkYsSUFBSSxDQUFDcEIsQ0FBTCxHQUFTb0IsSUFBSSxDQUFDckIsS0FBZixJQUF3QjRGLE1BQWpDO0FBQ0F2RSxJQUFBQSxJQUFJLENBQUN3RixDQUFMLEdBQVMsQ0FBQ3hGLElBQUksQ0FBQ2pCLENBQUwsR0FBU2lCLElBQUksQ0FBQ2xCLE1BQWYsSUFBeUIwRixNQUFsQztBQUNBOUUsSUFBQUEsUUFBUSxDQUFDcUYsR0FBRCxDQUFSLEdBQWdCL0UsSUFBaEI7QUFDSDtBQUNKLENBM0REOztBQTZEQTVKLEVBQUUsQ0FBQ3NQLEVBQUgsQ0FBTUMsUUFBTixDQUFldlAsRUFBRSxDQUFDb0MsUUFBSCxDQUFZb04sU0FBM0IsRUFBc0MscUJBQXRDLEVBQTZELFVBQTdELEVBQXlFLElBQXpFO0FBQ0F4UCxFQUFFLENBQUNzUCxFQUFILENBQU10TCxHQUFOLENBQVVoRSxFQUFFLENBQUNvQyxRQUFILENBQVlvTixTQUF0QixFQUFpQyxXQUFqQyxFQUE4QyxZQUFZO0FBQ3REeFAsRUFBQUEsRUFBRSxDQUFDeVAsT0FBSCxDQUFXLElBQVg7QUFDQSxTQUFPLEVBQVA7QUFDSCxDQUhELEVBR0csS0FISCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxucmVxdWlyZSgnLi9DQ1RNWFhNTFBhcnNlcicpO1xucmVxdWlyZSgnLi9DQ1RpbGVkTWFwQXNzZXQnKTtcbnJlcXVpcmUoJy4vQ0NUaWxlZExheWVyJyk7XG5yZXF1aXJlKCcuL0NDVGlsZWRUaWxlJyk7XG5yZXF1aXJlKCcuL0NDVGlsZWRPYmplY3RHcm91cCcpO1xuXG4vKipcbiAqICEjZW4gVGhlIG9yaWVudGF0aW9uIG9mIHRpbGVkIG1hcC5cbiAqICEjemggVGlsZWQgTWFwIOWcsOWbvuaWueWQkeOAglxuICogQGVudW0gVGlsZWRNYXAuT3JpZW50YXRpb25cbiAqIEBzdGF0aWNcbiAqL1xubGV0IE9yaWVudGF0aW9uID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBPcnRob2dvbmFsIG9yaWVudGF0aW9uLlxuICAgICAqICEjemgg55u06KeS6bif556w5Zyw5Zu+77yIOTDCsOWcsOWbvu+8ieOAglxuICAgICAqIEBwcm9wZXJ0eSBPUlRIT1xuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIE9SVEhPOiAwLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBIZXhhZ29uYWwgb3JpZW50YXRpb24uXG4gICAgICogISN6aCDlha3ovrnlvaLlnLDlm75cbiAgICAgKiBAcHJvcGVydHkgSEVYXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgSEVYOiAxLFxuXG4gICAgLyoqXG4gICAgICogSXNvbWV0cmljIG9yaWVudGF0aW9uLlxuICAgICAqIOetiei3neaWnOinhuWcsOWbvu+8iOaWnDQ1wrDlnLDlm77vvInjgIJcbiAgICAgKiBAcHJvcGVydHkgSVNPXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgSVNPOiAyXG59KTtcblxuLyoqXG4gKiBUaGUgcHJvcGVydHkgdHlwZSBvZiB0aWxlZCBtYXAuXG4gKiBAZW51bSBUaWxlZE1hcC5Qcm9wZXJ0eVxuICogQHN0YXRpY1xuICovXG5sZXQgUHJvcGVydHkgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgTk9ORVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIE5PTkU6IDAsXG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgTUFQXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgTUFQOiAxLFxuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IExBWUVSXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgTEFZRVI6IDIsXG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgT0JKRUNUR1JPVVBcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBPQkpFQ1RHUk9VUDogMyxcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBPQkpFQ1RcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBPQkpFQ1Q6IDQsXG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgVElMRVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFRJTEU6IDVcbn0pO1xuXG4vKipcbiAqIFRoZSB0aWxlIGZsYWdzIG9mIHRpbGVkIG1hcC5cbiAqIEBlbnVtIFRpbGVkTWFwLlRpbGVGbGFnXG4gKiBAc3RhdGljXG4gKi9cbmxldCBUaWxlRmxhZyA9IGNjLkVudW0oe1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBIT1JJWk9OVEFMXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgSE9SSVpPTlRBTDogMHg4MDAwMDAwMCxcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBWRVJUSUNBTFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFZFUlRJQ0FMOiAweDQwMDAwMDAwLFxuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IERJQUdPTkFMXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgRElBR09OQUw6IDB4MjAwMDAwMDAsXG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgRkxJUFBFRF9BTExcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBGTElQUEVEX0FMTDogKDB4ODAwMDAwMDAgfCAweDQwMDAwMDAwIHwgMHgyMDAwMDAwMCB8IDB4MTAwMDAwMDApID4+PiAwLFxuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IEZMSVBQRURfTUFTS1xuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIEZMSVBQRURfTUFTSzogKH4oMHg4MDAwMDAwMCB8IDB4NDAwMDAwMDAgfCAweDIwMDAwMDAwIHwgMHgxMDAwMDAwMCkpID4+PiAwXG59KTtcblxuLyoqXG4gKiAhI2VuIFRoZSBzdGFnZ2VyIGF4aXMgb2YgSGV4IHRpbGVkIG1hcC5cbiAqICEjemgg5YWt6L655b2i5Zyw5Zu+55qEIHN0YWdnZXIgYXhpcyDlgLxcbiAqIEBlbnVtIFRpbGVkTWFwLlN0YWdnZXJBeGlzXG4gKiBAc3RhdGljXG4gKi9cbmxldCBTdGFnZ2VyQXhpcyA9IGNjLkVudW0oe1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBTVEFHR0VSQVhJU19YXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgU1RBR0dFUkFYSVNfWCA6IDAsXG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgU1RBR0dFUkFYSVNfWVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFNUQUdHRVJBWElTX1kgOiAxXG59KTtcblxuLyoqXG4gKiAhI2VuIFRoZSBzdGFnZ2VyIGluZGV4IG9mIEhleCB0aWxlZCBtYXAuXG4gKiAhI3poIOWFrei+ueW9ouWcsOWbvueahCBzdGFnZ2VyIGluZGV4IOWAvFxuICogQGVudW0gVGlsZWRNYXAuUmVuZGVyT3JkZXJcbiAqIEBzdGF0aWNcbiAqL1xubGV0IFN0YWdnZXJJbmRleCA9IGNjLkVudW0oe1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBTVEFHR0VSSU5ERVhfT0REXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgU1RBR0dFUklOREVYX09ERCA6IDAsXG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgU1RBR0dFUklOREVYX0VWRU5cbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBTVEFHR0VSSU5ERVhfRVZFTiA6IDFcbn0pO1xuXG4vKipcbiAqICEjZW4gVGhlIHJlbmRlciBvcmRlciBvZiB0aWxlZCBtYXAuXG4gKiAhI3poIOWcsOWbvueahOa4suafk+mhuuW6j1xuICogQGVudW0gVGlsZWRNYXAuUmVuZGVyT3JkZXJcbiAqIEBzdGF0aWNcbiAqL1xubGV0IFJlbmRlck9yZGVyID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IFJpZ2h0RG93blxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFJpZ2h0RG93biA6IDAsXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IFJpZ2h0VXBcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBSaWdodFVwIDogMSxcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgTGVmdERvd25cbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBMZWZ0RG93bjogMixcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgTGVmdFVwXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgTGVmdFVwOiAzLFxufSk7XG5cbi8qKlxuICogISNlbiBUaWxlZE1hcCBPYmplY3QgVHlwZVxuICogISN6aCDlnLDlm77niankvZPnsbvlnotcbiAqIEBlbnVtIFRpbGVkTWFwLlRNWE9iamVjdFR5cGVcbiAqIEBzdGF0aWNcbiAqL1xubGV0IFRNWE9iamVjdFR5cGUgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgUkVDVFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFJFQ1QgOiAwLFxuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IEVMTElQU0VcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBFTExJUFNFIDogMSxcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBQT0xZR09OXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgUE9MWUdPTiA6IDIsXG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgUE9MWUxJTkVcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBQT0xZTElORSA6IDMsXG4gICAgXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IElNQUdFXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgSU1BR0UgOiA0LFxuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IFRFWFRcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBURVhUOiA1LFxufSk7XG5cbi8qKlxuICogISNlbiBSZW5kZXJzIGEgVE1YIFRpbGUgTWFwIGluIHRoZSBzY2VuZS5cbiAqICEjemgg5Zyo5Zy65pmv5Lit5riy5p+T5LiA5LiqIHRteCDmoLzlvI/nmoQgVGlsZSBNYXDjgIJcbiAqIEBjbGFzcyBUaWxlZE1hcFxuICogQGV4dGVuZHMgQ29tcG9uZW50XG4gKi9cbmxldCBUaWxlZE1hcCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuVGlsZWRNYXAnLFxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcbiAgICAgICAgZXhlY3V0ZUluRWRpdE1vZGU6IHRydWUsXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucmVuZGVyZXJzL1RpbGVkTWFwJyxcbiAgICB9LFxuXG4gICAgY3RvciAoKSB7XG4gICAgICAgIC8vIHN0b3JlIGFsbCBsYXllciBnaWQgY29ycmVzcG9uZGluZyB0ZXh0dXJlIGluZm8sIGluZGV4IGlzIGdpZCwgZm9ybWF0IGxpa2VzICdbZ2lkMF09dGV4LWluZm8sW2dpZDFdPXRleC1pbmZvLCAuLi4nXG4gICAgICAgIHRoaXMuX3RleEdyaWRzID0gW107XG4gICAgICAgIC8vIHN0b3JlIGFsbCB0aWxlc2V0IHRleHR1cmUsIGluZGV4IGlzIHRpbGVzZXQgaW5kZXgsIGZvcm1hdCBsaWtlcyAnWzBdPXRleHR1cmUwLCBbMV09dGV4dHVyZTEsIC4uLidcbiAgICAgICAgdGhpcy5fdGV4dHVyZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fdGlsZXNldHMgPSBbXTtcblxuICAgICAgICB0aGlzLl9hbmltYXRpb25zID0gW107XG4gICAgICAgIHRoaXMuX2ltYWdlTGF5ZXJzID0gW107XG4gICAgICAgIHRoaXMuX2xheWVycyA9IFtdO1xuICAgICAgICB0aGlzLl9ncm91cHMgPSBbXTtcbiAgICAgICAgdGhpcy5faW1hZ2VzID0gW107XG4gICAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fdGlsZVByb3BlcnRpZXMgPSBbXTtcblxuICAgICAgICB0aGlzLl9tYXBTaXplID0gY2Muc2l6ZSgwLCAwKTtcbiAgICAgICAgdGhpcy5fdGlsZVNpemUgPSBjYy5zaXplKDAsIDApO1xuICAgIH0sXG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIE9yaWVudGF0aW9uOiBPcmllbnRhdGlvbixcbiAgICAgICAgUHJvcGVydHk6IFByb3BlcnR5LFxuICAgICAgICBUaWxlRmxhZzogVGlsZUZsYWcsXG4gICAgICAgIFN0YWdnZXJBeGlzOiBTdGFnZ2VyQXhpcyxcbiAgICAgICAgU3RhZ2dlckluZGV4OiBTdGFnZ2VySW5kZXgsXG4gICAgICAgIFRNWE9iamVjdFR5cGU6IFRNWE9iamVjdFR5cGUsXG4gICAgICAgIFJlbmRlck9yZGVyOiBSZW5kZXJPcmRlclxuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIF90bXhGaWxlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuVGlsZWRNYXBBc3NldFxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgVGlsZWRNYXAgQXNzZXQuXG4gICAgICAgICAqICEjemggVGlsZWRNYXAg6LWE5rqQ44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7VGlsZWRNYXBBc3NldH0gdG14QXNzZXRcbiAgICAgICAgICogQGRlZmF1bHQgXCJcIlxuICAgICAgICAgKi9cbiAgICAgICAgdG14QXNzZXQgOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90bXhGaWxlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUsIGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RteEZpbGUgIT09IHZhbHVlIHx8IChDQ19FRElUT1IgJiYgZm9yY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RteEZpbGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlGaWxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IGNjLlRpbGVkTWFwQXNzZXRcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldHMgdGhlIG1hcCBzaXplLlxuICAgICAqICEjemgg6I635Y+W5Zyw5Zu+5aSn5bCP44CCXG4gICAgICogQG1ldGhvZCBnZXRNYXBTaXplXG4gICAgICogQHJldHVybiB7U2l6ZX1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBtYXBTaXplID0gdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpO1xuICAgICAqIGNjLmxvZyhcIk1hcCBTaXplOiBcIiArIG1hcFNpemUpO1xuICAgICAqL1xuICAgIGdldE1hcFNpemUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwU2l6ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXRzIHRoZSB0aWxlIHNpemUuXG4gICAgICogISN6aCDojrflj5blnLDlm77og4zmma/kuK0gdGlsZSDlhYPntKDnmoTlpKflsI/jgIJcbiAgICAgKiBAbWV0aG9kIGdldFRpbGVTaXplXG4gICAgICogQHJldHVybiB7U2l6ZX1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCB0aWxlU2l6ZSA9IHRpbGVkTWFwLmdldFRpbGVTaXplKCk7XG4gICAgICogY2MubG9nKFwiVGlsZSBTaXplOiBcIiArIHRpbGVTaXplKTtcbiAgICAgKi9cbiAgICBnZXRUaWxlU2l6ZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aWxlU2l6ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBtYXAgb3JpZW50YXRpb24uXG4gICAgICogISN6aCDojrflj5blnLDlm77mlrnlkJHjgIJcbiAgICAgKiBAbWV0aG9kIGdldE1hcE9yaWVudGF0aW9uXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGV0IG1hcE9yaWVudGF0aW9uID0gdGlsZWRNYXAuZ2V0TWFwT3JpZW50YXRpb24oKTtcbiAgICAgKiBjYy5sb2coXCJNYXAgT3JpZW50YXRpb246IFwiICsgbWFwT3JpZW50YXRpb24pO1xuICAgICAqL1xuICAgIGdldE1hcE9yaWVudGF0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcE9yaWVudGF0aW9uO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIG9iamVjdCBncm91cHMuXG4gICAgICogISN6aCDojrflj5bmiYDmnInnmoTlr7nosaHlsYLjgIJcbiAgICAgKiBAbWV0aG9kIGdldE9iamVjdEdyb3Vwc1xuICAgICAqIEByZXR1cm4ge1RpbGVkT2JqZWN0R3JvdXBbXX1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBvYmpHcm91cHMgPSB0aXRsZWRNYXAuZ2V0T2JqZWN0R3JvdXBzKCk7XG4gICAgICogZm9yIChsZXQgaSA9IDA7IGkgPCBvYmpHcm91cHMubGVuZ3RoOyArK2kpIHtcbiAgICAgKiAgICAgY2MubG9nKFwib2JqOiBcIiArIG9iakdyb3Vwc1tpXSk7XG4gICAgICogfVxuICAgICAqL1xuICAgIGdldE9iamVjdEdyb3VwcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ncm91cHM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJuIHRoZSBUTVhPYmplY3RHcm91cCBmb3IgdGhlIHNwZWNpZmljIGdyb3VwLlxuICAgICAqICEjemgg6I635Y+W5oyH5a6a55qEIFRNWE9iamVjdEdyb3Vw44CCXG4gICAgICogQG1ldGhvZCBnZXRPYmplY3RHcm91cFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBncm91cE5hbWVcbiAgICAgKiBAcmV0dXJuIHtUaWxlZE9iamVjdEdyb3VwfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGV0IGdyb3VwID0gdGl0bGVkTWFwLmdldE9iamVjdEdyb3VwKFwiUGxheWVyc1wiKTtcbiAgICAgKiBjYy5sb2coXCJPYmplY3RHcm91cDogXCIgKyBncm91cCk7XG4gICAgICovXG4gICAgZ2V0T2JqZWN0R3JvdXAgKGdyb3VwTmFtZSkge1xuICAgICAgICBsZXQgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGdyb3Vwcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBncm91cCA9IGdyb3Vwc1tpXTtcbiAgICAgICAgICAgIGlmIChncm91cCAmJiBncm91cC5nZXRHcm91cE5hbWUoKSA9PT0gZ3JvdXBOYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gZW5hYmxlIG9yIGRpc2FibGUgY3VsbGluZ1xuICAgICAqICEjemgg5byA5ZCv5oiW5YWz6Zet6KOB5Ymq44CCXG4gICAgICogQG1ldGhvZCBlbmFibGVDdWxsaW5nXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgZW5hYmxlQ3VsbGluZyAodmFsdWUpIHtcbiAgICAgICAgbGV0IGxheWVycyA9IHRoaXMuX2xheWVycztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxheWVyc1tpXS5lbmFibGVDdWxsaW5nKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldHMgdGhlIG1hcCBwcm9wZXJ0aWVzLlxuICAgICAqICEjemgg6I635Y+W5Zyw5Zu+55qE5bGe5oCn44CCXG4gICAgICogQG1ldGhvZCBnZXRQcm9wZXJ0aWVzXG4gICAgICogQHJldHVybiB7T2JqZWN0W119XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBsZXQgcHJvcGVydGllcyA9IHRpdGxlZE1hcC5nZXRQcm9wZXJ0aWVzKCk7XG4gICAgICogZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICogICAgIGNjLmxvZyhcIlByb3BlcnRpZXM6IFwiICsgcHJvcGVydGllc1tpXSk7XG4gICAgICogfVxuICAgICAqL1xuICAgIGdldFByb3BlcnRpZXMgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm4gQWxsIGxheWVycyBhcnJheS5cbiAgICAgKiAhI3poIOi/lOWbnuWMheWQq+aJgOaciSBsYXllciDnmoTmlbDnu4TjgIJcbiAgICAgKiBAbWV0aG9kIGdldExheWVyc1xuICAgICAqIEByZXR1cm5zIHtUaWxlZExheWVyW119XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBsZXQgbGF5ZXJzID0gdGl0bGVkTWFwLmdldExheWVycygpO1xuICAgICAqIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXJzLmxlbmd0aDsgKytpKSB7XG4gICAgICogICAgIGNjLmxvZyhcIkxheWVyczogXCIgKyBsYXllcnNbaV0pO1xuICAgICAqIH1cbiAgICAgKi9cbiAgICBnZXRMYXllcnMgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGF5ZXJzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIHJldHVybiB0aGUgY2MuVGlsZWRMYXllciBmb3IgdGhlIHNwZWNpZmljIGxheWVyLlxuICAgICAqICEjemgg6I635Y+W5oyH5a6a5ZCN56ew55qEIGxheWVy44CCXG4gICAgICogQG1ldGhvZCBnZXRMYXllclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsYXllck5hbWVcbiAgICAgKiBAcmV0dXJuIHtUaWxlZExheWVyfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGV0IGxheWVyID0gdGl0bGVkTWFwLmdldExheWVyKFwiUGxheWVyXCIpO1xuICAgICAqIGNjLmxvZyhsYXllcik7XG4gICAgICovXG4gICAgZ2V0TGF5ZXIgKGxheWVyTmFtZSkge1xuICAgICAgICBsZXQgbGF5ZXJzID0gdGhpcy5fbGF5ZXJzO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGxheWVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBsYXllciA9IGxheWVyc1tpXTtcbiAgICAgICAgICAgIGlmIChsYXllciAmJiBsYXllci5nZXRMYXllck5hbWUoKSA9PT0gbGF5ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxheWVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICBfY2hhbmdlTGF5ZXIgKGxheWVyTmFtZSwgcmVwbGFjZUxheWVyKSB7XG4gICAgICAgIGxldCBsYXllcnMgPSB0aGlzLl9sYXllcnM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbGF5ZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgbGV0IGxheWVyID0gbGF5ZXJzW2ldO1xuICAgICAgICAgICAgaWYgKGxheWVyICYmIGxheWVyLmdldExheWVyTmFtZSgpID09PSBsYXllck5hbWUpIHtcbiAgICAgICAgICAgICAgICBsYXllcnNbaV0gPSByZXBsYWNlTGF5ZXI7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJuIHRoZSB2YWx1ZSBmb3IgdGhlIHNwZWNpZmljIHByb3BlcnR5IG5hbWUuXG4gICAgICogISN6aCDpgJrov4flsZ7mgKflkI3np7DvvIzojrflj5bmjIflrprnmoTlsZ7mgKfjgIJcbiAgICAgKiBAbWV0aG9kIGdldFByb3BlcnR5XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5TmFtZVxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBwcm9wZXJ0eSA9IHRpdGxlZE1hcC5nZXRQcm9wZXJ0eShcImluZm9cIik7XG4gICAgICogY2MubG9nKFwiUHJvcGVydHk6IFwiICsgcHJvcGVydHkpO1xuICAgICAqL1xuICAgIGdldFByb3BlcnR5IChwcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXNbcHJvcGVydHlOYW1lLnRvU3RyaW5nKCldO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybiBwcm9wZXJ0aWVzIGRpY3Rpb25hcnkgZm9yIHRpbGUgR0lELlxuICAgICAqICEjemgg6YCa6L+HIEdJRCDvvIzojrflj5bmjIflrprnmoTlsZ7mgKfjgIJcbiAgICAgKiBAbWV0aG9kIGdldFByb3BlcnRpZXNGb3JHSURcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gR0lEXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGV0IHByb3BlcnRpZXMgPSB0aXRsZWRNYXAuZ2V0UHJvcGVydGllc0ZvckdJRChHSUQpO1xuICAgICAqIGNjLmxvZyhcIlByb3BlcnRpZXM6IFwiICsgcHJvcGVydGllcyk7XG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllc0ZvckdJRCAoR0lEKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aWxlUHJvcGVydGllc1tHSURdO1xuICAgIH0sXG5cbiAgICBfX3ByZWxvYWQgKCkge1xuICAgICAgICBpZiAodGhpcy5fdG14RmlsZSkge1xuICAgICAgICAgICAgLy8gcmVmcmVzaCBsYXllciBlbnRpdGllc1xuICAgICAgICAgICAgdGhpcy5fYXBwbHlGaWxlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25FbmFibGUgKCkge1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQsIHRoaXMuX3N5bmNBbmNob3JQb2ludCwgdGhpcyk7XG4gICAgfSxcblxuICAgIG9uRGlzYWJsZSAoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQsIHRoaXMuX3N5bmNBbmNob3JQb2ludCwgdGhpcyk7XG4gICAgfSxcblxuICAgIF9hcHBseUZpbGUgKCkge1xuICAgICAgICBsZXQgZmlsZSA9IHRoaXMuX3RteEZpbGU7XG4gICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICBsZXQgdGV4VmFsdWVzID0gZmlsZS50ZXh0dXJlcztcbiAgICAgICAgICAgIGxldCB0ZXhLZXlzID0gZmlsZS50ZXh0dXJlTmFtZXM7XG4gICAgICAgICAgICBsZXQgdGV4U2l6ZXMgPSBmaWxlLnRleHR1cmVTaXplcztcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlcyA9IHt9O1xuICAgICAgICAgICAgbGV0IHRleHR1cmVTaXplcyA9IHt9O1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXhWYWx1ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGV4TmFtZSA9IHRleEtleXNbaV07XG4gICAgICAgICAgICAgICAgdGV4dHVyZXNbdGV4TmFtZV0gPSB0ZXhWYWx1ZXNbaV07XG4gICAgICAgICAgICAgICAgdGV4dHVyZVNpemVzW3RleE5hbWVdID0gdGV4U2l6ZXNbaV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpbWFnZUxheWVyVGV4dHVyZXMgPSB7fTtcbiAgICAgICAgICAgIHRleFZhbHVlcyA9IGZpbGUuaW1hZ2VMYXllclRleHR1cmVzO1xuICAgICAgICAgICAgdGV4S2V5cyA9IGZpbGUuaW1hZ2VMYXllclRleHR1cmVOYW1lcztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4VmFsdWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2VMYXllclRleHR1cmVzW3RleEtleXNbaV1dID0gdGV4VmFsdWVzW2ldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgdHN4RmlsZU5hbWVzID0gZmlsZS50c3hGaWxlTmFtZXM7XG4gICAgICAgICAgICBsZXQgdHN4RmlsZXMgPSBmaWxlLnRzeEZpbGVzO1xuICAgICAgICAgICAgbGV0IHRzeE1hcCA9IHt9O1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0c3hGaWxlTmFtZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAodHN4RmlsZU5hbWVzW2ldLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdHN4TWFwW3RzeEZpbGVOYW1lc1tpXV0gPSB0c3hGaWxlc1tpXS50ZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG1hcEluZm8gPSBuZXcgY2MuVE1YTWFwSW5mbyhmaWxlLnRteFhtbFN0ciwgdHN4TWFwLCB0ZXh0dXJlcywgdGV4dHVyZVNpemVzLCBpbWFnZUxheWVyVGV4dHVyZXMpO1xuICAgICAgICAgICAgbGV0IHRpbGVzZXRzID0gbWFwSW5mby5nZXRUaWxlc2V0cygpO1xuICAgICAgICAgICAgaWYoIXRpbGVzZXRzIHx8IHRpbGVzZXRzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICBjYy5sb2dJRCg3MjQxKTtcblxuICAgICAgICAgICAgdGhpcy5fYnVpbGRXaXRoTWFwSW5mbyhtYXBJbmZvKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbGVhc2VNYXBJbmZvKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3JlbGVhc2VNYXBJbmZvICgpIHtcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBsYXllcnMgJiBvYmplY3QgZ3JvdXBzIGFkZGVkIGJlZm9yZVxuICAgICAgICBsZXQgbGF5ZXJzID0gdGhpcy5fbGF5ZXJzO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGxheWVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGxheWVyc1tpXS5ub2RlLnJlbW92ZUZyb21QYXJlbnQodHJ1ZSk7XG4gICAgICAgICAgICBsYXllcnNbaV0ubm9kZS5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgbGF5ZXJzLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgbGV0IGdyb3VwcyA9IHRoaXMuX2dyb3VwcztcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBncm91cHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBncm91cHNbaV0ubm9kZS5yZW1vdmVGcm9tUGFyZW50KHRydWUpO1xuICAgICAgICAgICAgZ3JvdXBzW2ldLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIGdyb3Vwcy5sZW5ndGggPSAwO1xuXG4gICAgICAgIGxldCBpbWFnZXMgPSB0aGlzLl9pbWFnZXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gaW1hZ2VzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaW1hZ2VzW2ldLnJlbW92ZUZyb21QYXJlbnQodHJ1ZSk7XG4gICAgICAgICAgICBpbWFnZXNbaV0uZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIGltYWdlcy5sZW5ndGggPSAwO1xuICAgIH0sXG5cbiAgICBfc3luY0FuY2hvclBvaW50ICgpIHtcbiAgICAgICAgbGV0IGFuY2hvciA9IHRoaXMubm9kZS5nZXRBbmNob3JQb2ludCgpO1xuICAgICAgICBsZXQgbGVmdFRvcFggPSB0aGlzLm5vZGUud2lkdGggKiBhbmNob3IueDtcbiAgICAgICAgbGV0IGxlZnRUb3BZID0gdGhpcy5ub2RlLmhlaWdodCAqICgxIC0gYW5jaG9yLnkpO1xuICAgICAgICBsZXQgaSwgbDtcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IHRoaXMuX2xheWVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBsYXllckluZm8gPSB0aGlzLl9sYXllcnNbaV07XG4gICAgICAgICAgICBsZXQgbGF5ZXJOb2RlID0gbGF5ZXJJbmZvLm5vZGU7XG4gICAgICAgICAgICAvLyBUaWxlZCBsYXllciBzeW5jIGFuY2hvciB0byBtYXAgYmVjYXVzZSBpdCdzIG9sZCBiZWhhdmlvcixcbiAgICAgICAgICAgIC8vIGRvIG5vdCBjaGFuZ2UgdGhlIGJlaGF2aW9yIGF2b2lkIGluZmx1ZW5jZSB1c2VyJ3MgZXhpc3RlZCBsb2dpYy5cbiAgICAgICAgICAgIGxheWVyTm9kZS5zZXRBbmNob3JQb2ludChhbmNob3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMCwgbCA9IHRoaXMuX2dyb3Vwcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBncm91cEluZm8gPSB0aGlzLl9ncm91cHNbaV07XG4gICAgICAgICAgICBsZXQgZ3JvdXBOb2RlID0gZ3JvdXBJbmZvLm5vZGU7XG4gICAgICAgICAgICAvLyBHcm91cCBsYXllciBub3Qgc3luYyBhbmNob3IgdG8gbWFwIGJlY2F1c2UgaXQncyBvbGQgYmVoYXZpb3IsXG4gICAgICAgICAgICAvLyBkbyBub3QgY2hhbmdlIHRoZSBiZWhhdmlvciBhdm9pZCBpbmZsdWVuY2UgdXNlcidzIGV4aXN0aW5nIGxvZ2ljLlxuICAgICAgICAgICAgZ3JvdXBOb2RlLmFuY2hvclggPSAwLjU7XG4gICAgICAgICAgICBncm91cE5vZGUuYW5jaG9yWSA9IDAuNTtcbiAgICAgICAgICAgIGdyb3VwTm9kZS54ID0gZ3JvdXBJbmZvLl9vZmZzZXQueCAtIGxlZnRUb3BYICsgZ3JvdXBOb2RlLndpZHRoICogZ3JvdXBOb2RlLmFuY2hvclg7XG4gICAgICAgICAgICBncm91cE5vZGUueSA9IGdyb3VwSW5mby5fb2Zmc2V0LnkgKyBsZWZ0VG9wWSAtIGdyb3VwTm9kZS5oZWlnaHQgKiBncm91cE5vZGUuYW5jaG9yWTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSB0aGlzLl9pbWFnZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaW1hZ2UgPSB0aGlzLl9pbWFnZXNbaV07XG4gICAgICAgICAgICBpbWFnZS5hbmNob3JYID0gMC41O1xuICAgICAgICAgICAgaW1hZ2UuYW5jaG9yWSA9IDAuNTtcbiAgICAgICAgICAgIGltYWdlLnggPSBpbWFnZS5fb2Zmc2V0LnggLSBsZWZ0VG9wWCArIGltYWdlLndpZHRoICogaW1hZ2UuYW5jaG9yWDtcbiAgICAgICAgICAgIGltYWdlLnkgPSBpbWFnZS5fb2Zmc2V0LnkgKyBsZWZ0VG9wWSAtIGltYWdlLmhlaWdodCAqIGltYWdlLmFuY2hvclk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2ZpbGxBbmlHcmlkcyAodGV4R3JpZHMsIGFuaW1hdGlvbnMpIHtcbiAgICAgICAgZm9yIChsZXQgaSBpbiBhbmltYXRpb25zKSB7XG4gICAgICAgICAgICBsZXQgYW5pbWF0aW9uID0gYW5pbWF0aW9uc1tpXTtcbiAgICAgICAgICAgIGlmICghYW5pbWF0aW9uKSBjb250aW51ZTtcbiAgICAgICAgICAgIGxldCBmcmFtZXMgPSBhbmltYXRpb24uZnJhbWVzO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBmcmFtZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZnJhbWUgPSBmcmFtZXNbal07XG4gICAgICAgICAgICAgICAgZnJhbWUuZ3JpZCA9IHRleEdyaWRzW2ZyYW1lLnRpbGVpZF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2J1aWxkTGF5ZXJBbmRHcm91cCAoKSB7XG4gICAgICAgIGxldCB0aWxlc2V0cyA9IHRoaXMuX3RpbGVzZXRzO1xuICAgICAgICBsZXQgdGV4R3JpZHMgPSB0aGlzLl90ZXhHcmlkcztcbiAgICAgICAgbGV0IGFuaW1hdGlvbnMgPSB0aGlzLl9hbmltYXRpb25zO1xuICAgICAgICB0ZXhHcmlkcy5sZW5ndGggPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRpbGVzZXRzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgICAgbGV0IHRpbGVzZXRJbmZvID0gdGlsZXNldHNbaV07XG4gICAgICAgICAgICBpZiAoIXRpbGVzZXRJbmZvKSBjb250aW51ZTtcbiAgICAgICAgICAgIGNjLlRpbGVkTWFwLmZpbGxUZXh0dXJlR3JpZHModGlsZXNldEluZm8sIHRleEdyaWRzLCBpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9maWxsQW5pR3JpZHModGV4R3JpZHMsIGFuaW1hdGlvbnMpO1xuXG4gICAgICAgIGxldCBsYXllcnMgPSB0aGlzLl9sYXllcnM7XG4gICAgICAgIGxldCBncm91cHMgPSB0aGlzLl9ncm91cHM7XG4gICAgICAgIGxldCBpbWFnZXMgPSB0aGlzLl9pbWFnZXM7XG4gICAgICAgIGxldCBvbGROb2RlTmFtZXMgPSB7fTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBsYXllcnMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBvbGROb2RlTmFtZXNbbGF5ZXJzW2ldLm5vZGUuX25hbWVdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IGdyb3Vwcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIG9sZE5vZGVOYW1lc1tncm91cHNbaV0ubm9kZS5fbmFtZV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gaW1hZ2VzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgb2xkTm9kZU5hbWVzW2ltYWdlc1tpXS5fbmFtZV0gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGF5ZXJzID0gdGhpcy5fbGF5ZXJzID0gW107XG4gICAgICAgIGdyb3VwcyA9IHRoaXMuX2dyb3VwcyA9IFtdO1xuICAgICAgICBpbWFnZXMgPSB0aGlzLl9pbWFnZXMgPSBbXTtcblxuICAgICAgICBsZXQgbWFwSW5mbyA9IHRoaXMuX21hcEluZm87XG4gICAgICAgIGxldCBub2RlID0gdGhpcy5ub2RlO1xuICAgICAgICBsZXQgbGF5ZXJJbmZvcyA9IG1hcEluZm8uZ2V0QWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgbGV0IHRleHR1cmVzID0gdGhpcy5fdGV4dHVyZXM7XG4gICAgICAgIGxldCBtYXhXaWR0aCA9IDA7XG4gICAgICAgIGxldCBtYXhIZWlnaHQgPSAwO1xuXG4gICAgICAgIGlmIChsYXllckluZm9zICYmIGxheWVySW5mb3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGxheWVySW5mb3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXJJbmZvID0gbGF5ZXJJbmZvc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IGxheWVySW5mby5uYW1lO1xuXG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKG5hbWUpO1xuICAgICAgICAgICAgICAgIG9sZE5vZGVOYW1lc1tuYW1lXSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFjaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IG5ldyBjYy5Ob2RlKCk7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgICAgICAgICBub2RlLmFkZENoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjaGlsZC5zZXRTaWJsaW5nSW5kZXgoaSk7XG4gICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gbGF5ZXJJbmZvLnZpc2libGU7XG5cbiAgICAgICAgICAgICAgICBpZiAobGF5ZXJJbmZvIGluc3RhbmNlb2YgY2MuVE1YTGF5ZXJJbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXllciA9IGNoaWxkLmdldENvbXBvbmVudChjYy5UaWxlZExheWVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFsYXllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIgPSBjaGlsZC5hZGRDb21wb25lbnQoY2MuVGlsZWRMYXllcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxheWVyLl9pbml0KGxheWVySW5mbywgbWFwSW5mbywgdGlsZXNldHMsIHRleHR1cmVzLCB0ZXhHcmlkcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGVsbCB0aGUgbGF5ZXJpbmZvIHRvIHJlbGVhc2UgdGhlIG93bmVyc2hpcCBvZiB0aGUgdGlsZXMgbWFwLlxuICAgICAgICAgICAgICAgICAgICBsYXllckluZm8ub3duVGlsZXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJzLnB1c2gobGF5ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsYXllckluZm8gaW5zdGFuY2VvZiBjYy5UTVhPYmplY3RHcm91cEluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyb3VwID0gY2hpbGQuZ2V0Q29tcG9uZW50KGNjLlRpbGVkT2JqZWN0R3JvdXApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cCA9IGNoaWxkLmFkZENvbXBvbmVudChjYy5UaWxlZE9iamVjdEdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBncm91cC5faW5pdChsYXllckluZm8sIG1hcEluZm8sIHRleEdyaWRzKTtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBzLnB1c2goZ3JvdXApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsYXllckluZm8gaW5zdGFuY2VvZiBjYy5UTVhJbWFnZUxheWVySW5mbykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGV4dHVyZSA9IGxheWVySW5mby5zb3VyY2VJbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQub3BhY2l0eSA9IGxheWVySW5mby5vcGFjaXR5O1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5sYXllckluZm8gPSBsYXllckluZm87XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLl9vZmZzZXQgPSBjYy52MihsYXllckluZm8ub2Zmc2V0LngsIC1sYXllckluZm8ub2Zmc2V0LnkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWFnZSA9IGNoaWxkLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWltYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZSA9IGNoaWxkLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BmID0gaW1hZ2Uuc3ByaXRlRnJhbWUgfHwgbmV3IGNjLlNwcml0ZUZyYW1lKCk7XG4gICAgICAgICAgICAgICAgICAgIHNwZi5zZXRUZXh0dXJlKHRleHR1cmUpO1xuICAgICAgICAgICAgICAgICAgICBpbWFnZS5zcHJpdGVGcmFtZSA9IHNwZjtcblxuICAgICAgICAgICAgICAgICAgICBjaGlsZC53aWR0aCA9IHRleHR1cmUud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmhlaWdodCA9IHRleHR1cmUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBpbWFnZXMucHVzaChjaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbWF4V2lkdGggPSBNYXRoLm1heChtYXhXaWR0aCwgY2hpbGQud2lkdGgpO1xuICAgICAgICAgICAgICAgIG1heEhlaWdodCA9IE1hdGgubWF4KG1heEhlaWdodCwgY2hpbGQuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgYyA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKG9sZE5vZGVOYW1lc1tjLl9uYW1lXSkge1xuICAgICAgICAgICAgICAgIGMuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gbWF4V2lkdGg7XG4gICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSBtYXhIZWlnaHQ7XG4gICAgICAgIHRoaXMuX3N5bmNBbmNob3JQb2ludCgpO1xuICAgIH0sXG5cbiAgICBfYnVpbGRXaXRoTWFwSW5mbyAobWFwSW5mbykge1xuICAgICAgICB0aGlzLl9tYXBJbmZvID0gbWFwSW5mbztcbiAgICAgICAgdGhpcy5fbWFwU2l6ZSA9IG1hcEluZm8uZ2V0TWFwU2l6ZSgpO1xuICAgICAgICB0aGlzLl90aWxlU2l6ZSA9IG1hcEluZm8uZ2V0VGlsZVNpemUoKTtcbiAgICAgICAgdGhpcy5fbWFwT3JpZW50YXRpb24gPSBtYXBJbmZvLm9yaWVudGF0aW9uO1xuICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzID0gbWFwSW5mby5wcm9wZXJ0aWVzO1xuICAgICAgICB0aGlzLl90aWxlUHJvcGVydGllcyA9IG1hcEluZm8uZ2V0VGlsZVByb3BlcnRpZXMoKTtcbiAgICAgICAgdGhpcy5faW1hZ2VMYXllcnMgPSBtYXBJbmZvLmdldEltYWdlTGF5ZXJzKCk7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbnMgPSBtYXBJbmZvLmdldFRpbGVBbmltYXRpb25zKCk7XG4gICAgICAgIHRoaXMuX3RpbGVzZXRzID0gbWFwSW5mby5nZXRUaWxlc2V0cygpO1xuXG4gICAgICAgIGxldCB0aWxlc2V0cyA9IHRoaXMuX3RpbGVzZXRzO1xuICAgICAgICB0aGlzLl90ZXh0dXJlcy5sZW5ndGggPSAwO1xuXG4gICAgICAgIGxldCB0b3RhbFRleHR1cmVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGlsZXNldHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgdGlsZXNldEluZm8gPSB0aWxlc2V0c1tpXTtcbiAgICAgICAgICAgIGlmICghdGlsZXNldEluZm8gfHwgIXRpbGVzZXRJbmZvLnNvdXJjZUltYWdlKSBjb250aW51ZTtcbiAgICAgICAgICAgIHRoaXMuX3RleHR1cmVzW2ldID0gdGlsZXNldEluZm8uc291cmNlSW1hZ2U7XG4gICAgICAgICAgICB0b3RhbFRleHR1cmVzLnB1c2godGlsZXNldEluZm8uc291cmNlSW1hZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9pbWFnZUxheWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGltYWdlTGF5ZXIgPSB0aGlzLl9pbWFnZUxheWVyc1tpXTtcbiAgICAgICAgICAgIGlmICghaW1hZ2VMYXllciB8fCAhaW1hZ2VMYXllci5zb3VyY2VJbWFnZSkgY29udGludWU7XG4gICAgICAgICAgICB0b3RhbFRleHR1cmVzLnB1c2goaW1hZ2VMYXllci5zb3VyY2VJbWFnZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjYy5UaWxlZE1hcC5sb2FkQWxsVGV4dHVyZXMgKHRvdGFsVGV4dHVyZXMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkTGF5ZXJBbmRHcm91cCgpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0sXG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIGxldCBhbmltYXRpb25zID0gdGhpcy5fYW5pbWF0aW9ucztcbiAgICAgICAgbGV0IHRleEdyaWRzID0gdGhpcy5fdGV4R3JpZHM7XG4gICAgICAgIGZvciAobGV0IGFuaUdJRCBpbiBhbmltYXRpb25zKSB7XG4gICAgICAgICAgICBsZXQgYW5pbWF0aW9uID0gYW5pbWF0aW9uc1thbmlHSURdO1xuICAgICAgICAgICAgbGV0IGZyYW1lcyA9IGFuaW1hdGlvbi5mcmFtZXM7XG4gICAgICAgICAgICBsZXQgZnJhbWUgPSBmcmFtZXNbYW5pbWF0aW9uLmZyYW1lSWR4XTtcbiAgICAgICAgICAgIGFuaW1hdGlvbi5kdCArPSBkdDtcbiAgICAgICAgICAgIGlmIChmcmFtZS5kdXJhdGlvbiA8IGFuaW1hdGlvbi5kdCkge1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5kdCA9IDA7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZyYW1lSWR4Kys7XG4gICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbi5mcmFtZUlkeCA+PSBmcmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcmFtZUlkeCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZyYW1lID0gZnJhbWVzW2FuaW1hdGlvbi5mcmFtZUlkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZXhHcmlkc1thbmlHSURdID0gZnJhbWUuZ3JpZDtcbiAgICAgICAgfVxuICAgIH0sXG59KTtcblxuY2MuVGlsZWRNYXAgPSBtb2R1bGUuZXhwb3J0cyA9IFRpbGVkTWFwO1xuXG5jYy5UaWxlZE1hcC5sb2FkQWxsVGV4dHVyZXMgPSBmdW5jdGlvbiAodGV4dHVyZXMsIGxvYWRlZENhbGxiYWNrKSB7XG4gICAgbGV0IHRvdGFsTnVtID0gdGV4dHVyZXMubGVuZ3RoO1xuICAgIGlmICh0b3RhbE51bSA9PT0gMCkge1xuICAgICAgICBsb2FkZWRDYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGN1ck51bSA9IDA7XG4gICAgbGV0IGl0ZW1DYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY3VyTnVtICsrO1xuICAgICAgICBpZiAoY3VyTnVtID49IHRvdGFsTnVtKSB7XG4gICAgICAgICAgICBsb2FkZWRDYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG90YWxOdW07IGkrKykge1xuICAgICAgICBsZXQgdGV4ID0gdGV4dHVyZXNbaV07XG4gICAgICAgIGlmICghdGV4LmxvYWRlZCkge1xuICAgICAgICAgICAgdGV4Lm9uY2UoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaXRlbUNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW1DYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuY2MuVGlsZWRNYXAuZmlsbFRleHR1cmVHcmlkcyA9IGZ1bmN0aW9uICh0aWxlc2V0LCB0ZXhHcmlkcywgdGV4SWQpIHtcbiAgICBsZXQgdGV4ID0gdGlsZXNldC5zb3VyY2VJbWFnZTtcblxuICAgIGlmICghdGlsZXNldC5pbWFnZVNpemUud2lkdGggfHwgIXRpbGVzZXQuaW1hZ2VTaXplLmhlaWdodCkge1xuICAgICAgICB0aWxlc2V0LmltYWdlU2l6ZS53aWR0aCA9IHRleC53aWR0aDtcbiAgICAgICAgdGlsZXNldC5pbWFnZVNpemUuaGVpZ2h0ID0gdGV4LmhlaWdodDtcbiAgICB9XG5cbiAgICBsZXQgdHcgPSB0aWxlc2V0Ll90aWxlU2l6ZS53aWR0aCxcbiAgICAgICAgdGggPSB0aWxlc2V0Ll90aWxlU2l6ZS5oZWlnaHQsXG4gICAgICAgIGltYWdlVyA9IHRleC53aWR0aCxcbiAgICAgICAgaW1hZ2VIID0gdGV4LmhlaWdodCxcbiAgICAgICAgc3BhY2luZyA9IHRpbGVzZXQuc3BhY2luZyxcbiAgICAgICAgbWFyZ2luID0gdGlsZXNldC5tYXJnaW4sXG5cbiAgICAgICAgY29scyA9IE1hdGguZmxvb3IoKGltYWdlVyAtIG1hcmdpbioyICsgc3BhY2luZykgLyAodHcgKyBzcGFjaW5nKSksXG4gICAgICAgIHJvd3MgPSBNYXRoLmZsb29yKChpbWFnZUggLSBtYXJnaW4qMiArIHNwYWNpbmcpIC8gKHRoICsgc3BhY2luZykpLFxuICAgICAgICBjb3VudCA9IHJvd3MgKiBjb2xzLFxuXG4gICAgICAgIGdpZCA9IHRpbGVzZXQuZmlyc3RHaWQsXG4gICAgICAgIGdyaWQgPSBudWxsLFxuICAgICAgICBvdmVycmlkZSA9IHRleEdyaWRzW2dpZF0gPyB0cnVlIDogZmFsc2UsXG4gICAgICAgIHRleGVsQ29ycmVjdCA9IGNjLm1hY3JvLkZJWF9BUlRJRkFDVFNfQllfU1RSRUNISU5HX1RFWEVMX1RNWCA/IDAuNSA6IDA7XG5cbiAgICAvLyBUaWxlZG1hcCBtYXkgbm90IGJlIHBhcnRpdGlvbmVkIGludG8gYmxvY2tzLCByZXN1bHRpbmcgaW4gYSBjb3VudCB2YWx1ZSBvZiAwXG4gICAgaWYgKGNvdW50IDw9IDApIHtcbiAgICAgICAgY291bnQgPSAxO1xuICAgIH1cblxuICAgIGxldCBtYXhHaWQgPSB0aWxlc2V0LmZpcnN0R2lkICsgY291bnQ7XG4gICAgZm9yICg7IGdpZCA8IG1heEdpZDsgKytnaWQpIHtcbiAgICAgICAgLy8gQXZvaWQgb3ZlcmxhcHBpbmdcbiAgICAgICAgaWYgKG92ZXJyaWRlICYmICF0ZXhHcmlkc1tnaWRdKSB7XG4gICAgICAgICAgICBvdmVycmlkZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb3ZlcnJpZGUgJiYgdGV4R3JpZHNbZ2lkXSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBncmlkID0ge1xuICAgICAgICAgICAgLy8gcmVjb3JkIHRleHR1cmUgaWRcbiAgICAgICAgICAgIHRleElkOiB0ZXhJZCwgXG4gICAgICAgICAgICAvLyByZWNvcmQgYmVsb25nIHRvIHdoaWNoIHRpbGVzZXRcbiAgICAgICAgICAgIHRpbGVzZXQ6IHRpbGVzZXQsXG4gICAgICAgICAgICB4OiAwLCB5OiAwLCB3aWR0aDogdHcsIGhlaWdodDogdGgsXG4gICAgICAgICAgICB0OiAwLCBsOiAwLCByOiAwLCBiOiAwLFxuICAgICAgICAgICAgZ2lkOiBnaWQsXG4gICAgICAgIH07XG4gICAgICAgIHRpbGVzZXQucmVjdEZvckdJRChnaWQsIGdyaWQpO1xuICAgICAgICBncmlkLnggKz0gdGV4ZWxDb3JyZWN0O1xuICAgICAgICBncmlkLnkgKz0gdGV4ZWxDb3JyZWN0O1xuICAgICAgICBncmlkLndpZHRoIC09IHRleGVsQ29ycmVjdCoyO1xuICAgICAgICBncmlkLmhlaWdodCAtPSB0ZXhlbENvcnJlY3QqMjtcbiAgICAgICAgZ3JpZC50ID0gKGdyaWQueSkgLyBpbWFnZUg7XG4gICAgICAgIGdyaWQubCA9IChncmlkLngpIC8gaW1hZ2VXO1xuICAgICAgICBncmlkLnIgPSAoZ3JpZC54ICsgZ3JpZC53aWR0aCkgLyBpbWFnZVc7XG4gICAgICAgIGdyaWQuYiA9IChncmlkLnkgKyBncmlkLmhlaWdodCkgLyBpbWFnZUg7XG4gICAgICAgIHRleEdyaWRzW2dpZF0gPSBncmlkO1xuICAgIH1cbn07XG5cbmNjLmpzLm9ic29sZXRlKGNjLlRpbGVkTWFwLnByb3RvdHlwZSwgJ2NjLlRpbGVkTWFwLnRteEZpbGUnLCAndG14QXNzZXQnLCB0cnVlKTtcbmNjLmpzLmdldChjYy5UaWxlZE1hcC5wcm90b3R5cGUsICdtYXBMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgY2MuZXJyb3JJRCg3MjAzKTtcbiAgICByZXR1cm4gW107XG59LCBmYWxzZSk7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==