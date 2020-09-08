
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/tilemap/CCTMXXMLParser.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
'use strict';

var codec = require('../compression/ZipUtils');

var zlib = require('../compression/zlib.min');

var js = require('../core/platform/js');

require('../core/platform/CCSAXParser');

function uint8ArrayToUint32Array(uint8Arr) {
  if (uint8Arr.length % 4 !== 0) return null;
  var arrLen = uint8Arr.length / 4;
  var retArr = window.Uint32Array ? new Uint32Array(arrLen) : [];

  for (var i = 0; i < arrLen; i++) {
    var offset = i * 4;
    retArr[i] = uint8Arr[offset] + uint8Arr[offset + 1] * (1 << 8) + uint8Arr[offset + 2] * (1 << 16) + uint8Arr[offset + 3] * (1 << 24);
  }

  return retArr;
} // Bits on the far end of the 32-bit global tile ID (GID's) are used for tile flags

/**
 * cc.TMXLayerInfo contains the information about the layers like:
 * - Layer name
 * - Layer size
 * - Layer opacity at creation time (it can be modified at runtime)
 * - Whether the layer is visible (if it's not visible, then the CocosNode won't be created)
 * This information is obtained from the TMX file.
 * @class TMXLayerInfo
 */

/**
 * Properties of the layer info.
 * @property {Object} properties 
 */


cc.TMXLayerInfo = function () {
  this.properties = {};
  this.name = "";
  this._layerSize = null;
  this._tiles = [];
  this.visible = true;
  this._opacity = 0;
  this.ownTiles = true;
  this._minGID = 100000;
  this._maxGID = 0;
  this.offset = cc.v2(0, 0);
};

cc.TMXLayerInfo.prototype = {
  constructor: cc.TMXLayerInfo,

  /**
   * Gets the Properties.
   * @return {Object}
   */
  getProperties: function getProperties() {
    return this.properties;
  },

  /**
   * Set the Properties.
   * @param {object} value
   */
  setProperties: function setProperties(value) {
    this.properties = value;
  }
};
/**
 * cc.TMXImageLayerInfo contains the information about the image layers.
 * This information is obtained from the TMX file.
 * @class TMXImageLayerInfo
 */

cc.TMXImageLayerInfo = function () {
  this.name = "";
  this.visible = true;
  this.width = 0;
  this.height = 0;
  this.offset = cc.v2(0, 0);
  this._opacity = 0;
  this._trans = new cc.Color(255, 255, 255, 255);
  this.sourceImage = null;
};
/**
 * <p>cc.TMXObjectGroupInfo contains the information about the object group like:
 * - group name
 * - group size
 * - group opacity at creation time (it can be modified at runtime)
 * - Whether the group is visible
 *
 * This information is obtained from the TMX file.</p>
 * @class TMXObjectGroupInfo
 */

/**
 * Properties of the ObjectGroup info.
 * @property {Array} properties
 */


cc.TMXObjectGroupInfo = function () {
  this.properties = {};
  this.name = "";
  this._objects = [];
  this.visible = true;
  this._opacity = 0;
  this._color = new cc.Color(255, 255, 255, 255);
  this.offset = cc.v2(0, 0);
  this._draworder = 'topdown';
};

cc.TMXObjectGroupInfo.prototype = {
  constructor: cc.TMXObjectGroupInfo,

  /**
   * Gets the Properties.
   * @return {Array}
   */
  getProperties: function getProperties() {
    return this.properties;
  },

  /**
   * Set the Properties.
   * @param {object} value
   */
  setProperties: function setProperties(value) {
    this.properties = value;
  }
};
/**
 * <p>cc.TMXTilesetInfo contains the information about the tilesets like: <br />
 * - Tileset name<br />
 * - Tileset spacing<br />
 * - Tileset margin<br />
 * - size of the tiles<br />
 * - Image used for the tiles<br />
 * - Image size<br />
 *
 * This information is obtained from the TMX file. </p>
 * @class TMXTilesetInfo
 */

/**
 * Tileset name
 * @property {string} name
 */

/**
 * First grid
 * @property {number} firstGid 
 */

/**
 * Spacing
 * @property {number} spacing
 */

/**
 * Margin
 * @property {number} margin 
 */

/**
 * Texture containing the tiles (should be sprite sheet / texture atlas)
 * @property {any} sourceImage
 */

/**
 * Size in pixels of the image
 * @property {cc.Size} imageSize
 */

cc.TMXTilesetInfo = function () {
  // Tileset name
  this.name = ""; // First grid

  this.firstGid = 0; // Spacing

  this.spacing = 0; // Margin

  this.margin = 0; // Texture containing the tiles (should be sprite sheet / texture atlas)

  this.sourceImage = null; // Size in pixels of the image

  this.imageSize = cc.size(0, 0);
  this.tileOffset = cc.v2(0, 0);
  this._tileSize = cc.size(0, 0);
};

cc.TMXTilesetInfo.prototype = {
  constructor: cc.TMXTilesetInfo,

  /**
   * Return rect
   * @param {Number} gid
   * @return {Rect}
   */
  rectForGID: function rectForGID(gid, result) {
    var rect = result || cc.rect(0, 0, 0, 0);
    rect.width = this._tileSize.width;
    rect.height = this._tileSize.height;
    gid &= cc.TiledMap.TileFlag.FLIPPED_MASK;
    gid = gid - parseInt(this.firstGid, 10);
    var max_x = parseInt((this.imageSize.width - this.margin * 2 + this.spacing) / (this._tileSize.width + this.spacing), 10);
    rect.x = parseInt(gid % max_x * (this._tileSize.width + this.spacing) + this.margin, 10);
    rect.y = parseInt(parseInt(gid / max_x, 10) * (this._tileSize.height + this.spacing) + this.margin, 10);
    return rect;
  }
};

function strToHAlign(value) {
  var hAlign = cc.Label.HorizontalAlign;

  switch (value) {
    case 'center':
      return hAlign.CENTER;

    case 'right':
      return hAlign.RIGHT;

    default:
      return hAlign.LEFT;
  }
}

function strToVAlign(value) {
  var vAlign = cc.Label.VerticalAlign;

  switch (value) {
    case 'center':
      return vAlign.CENTER;

    case 'bottom':
      return vAlign.BOTTOM;

    default:
      return vAlign.TOP;
  }
}

function strToColor(value) {
  if (!value) {
    return cc.color(0, 0, 0, 255);
  }

  value = value.indexOf('#') !== -1 ? value.substring(1) : value;

  if (value.length === 8) {
    var a = parseInt(value.substr(0, 2), 16) || 255;
    var r = parseInt(value.substr(2, 2), 16) || 0;
    var g = parseInt(value.substr(4, 2), 16) || 0;
    var b = parseInt(value.substr(6, 2), 16) || 0;
    return cc.color(r, g, b, a);
  } else {
    var _r = parseInt(value.substr(0, 2), 16) || 0;

    var _g = parseInt(value.substr(2, 2), 16) || 0;

    var _b = parseInt(value.substr(4, 2), 16) || 0;

    return cc.color(_r, _g, _b, 255);
  }
}

function getPropertyList(node, map) {
  var res = [];
  var properties = node.getElementsByTagName("properties");

  for (var i = 0; i < properties.length; ++i) {
    var property = properties[i].getElementsByTagName("property");

    for (var j = 0; j < property.length; ++j) {
      res.push(property[j]);
    }
  }

  map = map || {};

  for (var _i = 0; _i < res.length; _i++) {
    var element = res[_i];
    var name = element.getAttribute('name');
    var type = element.getAttribute('type') || 'string';
    var value = element.getAttribute('value');

    if (type === 'int') {
      value = parseInt(value);
    } else if (type === 'float') {
      value = parseFloat(value);
    } else if (type === 'bool') {
      value = value === 'true';
    } else if (type === 'color') {
      value = strToColor(value);
    }

    map[name] = value;
  }

  return map;
}
/**
 * <p>cc.TMXMapInfo contains the information about the map like: <br/>
 *- Map orientation (hexagonal, isometric or orthogonal)<br/>
 *- Tile size<br/>
 *- Map size</p>
 *
 * <p>And it also contains: <br/>
 * - Layers (an array of TMXLayerInfo objects)<br/>
 * - Tilesets (an array of TMXTilesetInfo objects) <br/>
 * - ObjectGroups (an array of TMXObjectGroupInfo objects) </p>
 *
 * <p>This information is obtained from the TMX file. </p>
 * @class TMXMapInfo
 */

/**
 * Properties of the map info.
 * @property {Array}    properties          
 */

/**
 * Map orientation.
 * @property {Number}   orientation         
 */

/**
 * Parent element.
 * @property {Object}   parentElement       
 */

/**
 * Parent GID.
 * @property {Number}   parentGID           
 */

/**
 * Layer attributes.
 * @property {Object}   layerAttrs        
 */

/**
 * Is reading storing characters stream.
 * @property {Boolean}  storingCharacters   
 */

/**
 * Current string stored from characters stream.
 * @property {String}   currentString       
 */

/**
 * Width of the map
 * @property {Number}   mapWidth            
 */

/**
 * Height of the map
 * @property {Number}   mapHeight           
 */

/**
 * Width of a tile
 * @property {Number}   tileWidth           
 */

/** 
 * Height of a tile
 * @property {Number}   tileHeight          
 */

/**
 * @example
 * 1.
 * //create a TMXMapInfo with file name
 * let tmxMapInfo = new cc.TMXMapInfo("res/orthogonal-test1.tmx");
 * 2.
 * //create a TMXMapInfo with content string and resource path
 * let resources = "res/TileMaps";
 * let filePath = "res/TileMaps/orthogonal-test1.tmx";
 * let xmlStr = cc.resources.get(filePath);
 * let tmxMapInfo = new cc.TMXMapInfo(xmlStr, resources);
 */

/**
 * Creates a TMX Format with a tmx file or content string
 */


cc.TMXMapInfo = function (tmxFile, tsxMap, textures, textureSizes, imageLayerTextures) {
  this.properties = [];
  this.orientation = null;
  this.parentElement = null;
  this.parentGID = null;
  this.layerAttrs = 0;
  this.storingCharacters = false;
  this.currentString = null;
  this.renderOrder = cc.TiledMap.RenderOrder.RightDown;
  this._supportVersion = [1, 2, 0];
  this._parser = new cc.SAXParser();
  this._objectGroups = [];
  this._allChildren = [];
  this._mapSize = cc.size(0, 0);
  this._tileSize = cc.size(0, 0);
  this._layers = [];
  this._tilesets = [];
  this._imageLayers = [];
  this._tileProperties = {};
  this._tileAnimations = {};
  this._tsxMap = null; // map of textures indexed by name

  this._textures = null; // hex map values

  this._staggerAxis = null;
  this._staggerIndex = null;
  this._hexSideLength = 0;
  this._imageLayerTextures = null;
  this.initWithXML(tmxFile, tsxMap, textures, textureSizes, imageLayerTextures);
};

cc.TMXMapInfo.prototype = {
  constructor: cc.TMXMapInfo,

  /**
   * Gets Map orientation.
   * @return {Number}
   */
  getOrientation: function getOrientation() {
    return this.orientation;
  },

  /**
   * Set the Map orientation.
   * @param {Number} value
   */
  setOrientation: function setOrientation(value) {
    this.orientation = value;
  },

  /**
   * Gets the staggerAxis of map.
   * @return {cc.TiledMap.StaggerAxis}
   */
  getStaggerAxis: function getStaggerAxis() {
    return this._staggerAxis;
  },

  /**
   * Set the staggerAxis of map.
   * @param {cc.TiledMap.StaggerAxis} value
   */
  setStaggerAxis: function setStaggerAxis(value) {
    this._staggerAxis = value;
  },

  /**
   * Gets stagger index
   * @return {cc.TiledMap.StaggerIndex}
   */
  getStaggerIndex: function getStaggerIndex() {
    return this._staggerIndex;
  },

  /**
   * Set the stagger index.
   * @param {cc.TiledMap.StaggerIndex} value
   */
  setStaggerIndex: function setStaggerIndex(value) {
    this._staggerIndex = value;
  },

  /**
   * Gets Hex side length.
   * @return {Number}
   */
  getHexSideLength: function getHexSideLength() {
    return this._hexSideLength;
  },

  /**
   * Set the Hex side length.
   * @param {Number} value
   */
  setHexSideLength: function setHexSideLength(value) {
    this._hexSideLength = value;
  },

  /**
   * Map width & height
   * @return {Size}
   */
  getMapSize: function getMapSize() {
    return cc.size(this._mapSize.width, this._mapSize.height);
  },

  /**
   * Map width & height
   * @param {Size} value
   */
  setMapSize: function setMapSize(value) {
    this._mapSize.width = value.width;
    this._mapSize.height = value.height;
  },
  _getMapWidth: function _getMapWidth() {
    return this._mapSize.width;
  },
  _setMapWidth: function _setMapWidth(width) {
    this._mapSize.width = width;
  },
  _getMapHeight: function _getMapHeight() {
    return this._mapSize.height;
  },
  _setMapHeight: function _setMapHeight(height) {
    this._mapSize.height = height;
  },

  /**
   * Tiles width & height
   * @return {Size}
   */
  getTileSize: function getTileSize() {
    return cc.size(this._tileSize.width, this._tileSize.height);
  },

  /**
   * Tiles width & height
   * @param {Size} value
   */
  setTileSize: function setTileSize(value) {
    this._tileSize.width = value.width;
    this._tileSize.height = value.height;
  },
  _getTileWidth: function _getTileWidth() {
    return this._tileSize.width;
  },
  _setTileWidth: function _setTileWidth(width) {
    this._tileSize.width = width;
  },
  _getTileHeight: function _getTileHeight() {
    return this._tileSize.height;
  },
  _setTileHeight: function _setTileHeight(height) {
    this._tileSize.height = height;
  },

  /**
   * Layers
   * @return {Array}
   */
  getLayers: function getLayers() {
    return this._layers;
  },

  /**
   * Layers
   * @param {cc.TMXLayerInfo} value
   */
  setLayers: function setLayers(value) {
    this._allChildren.push(value);

    this._layers.push(value);
  },

  /**
   * ImageLayers
   * @return {Array}
   */
  getImageLayers: function getImageLayers() {
    return this._imageLayers;
  },

  /**
   * ImageLayers
   * @param {cc.TMXImageLayerInfo} value
   */
  setImageLayers: function setImageLayers(value) {
    this._allChildren.push(value);

    this._imageLayers.push(value);
  },

  /**
   * tilesets
   * @return {Array}
   */
  getTilesets: function getTilesets() {
    return this._tilesets;
  },

  /**
   * tilesets
   * @param {cc.TMXTilesetInfo} value
   */
  setTilesets: function setTilesets(value) {
    this._tilesets.push(value);
  },

  /**
   * ObjectGroups
   * @return {Array}
   */
  getObjectGroups: function getObjectGroups() {
    return this._objectGroups;
  },

  /**
   * ObjectGroups
   * @param {cc.TMXObjectGroup} value
   */
  setObjectGroups: function setObjectGroups(value) {
    this._allChildren.push(value);

    this._objectGroups.push(value);
  },
  getAllChildren: function getAllChildren() {
    return this._allChildren;
  },

  /**
   * parent element
   * @return {Object}
   */
  getParentElement: function getParentElement() {
    return this.parentElement;
  },

  /**
   * parent element
   * @param {Object} value
   */
  setParentElement: function setParentElement(value) {
    this.parentElement = value;
  },

  /**
   * parent GID
   * @return {Number}
   */
  getParentGID: function getParentGID() {
    return this.parentGID;
  },

  /**
   * parent GID
   * @param {Number} value
   */
  setParentGID: function setParentGID(value) {
    this.parentGID = value;
  },

  /**
   * Layer attribute
   * @return {Object}
   */
  getLayerAttribs: function getLayerAttribs() {
    return this.layerAttrs;
  },

  /**
   * Layer attribute
   * @param {Object} value
   */
  setLayerAttribs: function setLayerAttribs(value) {
    this.layerAttrs = value;
  },

  /**
   * Is reading storing characters stream
   * @return {Boolean}
   */
  getStoringCharacters: function getStoringCharacters() {
    return this.storingCharacters;
  },

  /**
   * Is reading storing characters stream
   * @param {Boolean} value
   */
  setStoringCharacters: function setStoringCharacters(value) {
    this.storingCharacters = value;
  },

  /**
   * Properties
   * @return {Array}
   */
  getProperties: function getProperties() {
    return this.properties;
  },

  /**
   * Properties
   * @param {object} value
   */
  setProperties: function setProperties(value) {
    this.properties = value;
  },

  /**
   * initializes a TMX format with an XML string and a TMX resource path
   * @param {String} tmxString
   * @param {Object} tsxMap
   * @param {Object} textures
   * @return {Boolean}
   */
  initWithXML: function initWithXML(tmxString, tsxMap, textures, textureSizes, imageLayerTextures) {
    this._tilesets.length = 0;
    this._layers.length = 0;
    this._imageLayers.length = 0;
    this._tsxMap = tsxMap;
    this._textures = textures;
    this._imageLayerTextures = imageLayerTextures;
    this._textureSizes = textureSizes;
    this._objectGroups.length = 0;
    this._allChildren.length = 0;
    this.properties.length = 0;
    this._tileProperties = {};
    this._tileAnimations = {}; // tmp vars

    this.currentString = "";
    this.storingCharacters = false;
    this.layerAttrs = cc.TMXLayerInfo.ATTRIB_NONE;
    this.parentElement = cc.TiledMap.NONE;
    return this.parseXMLString(tmxString);
  },

  /**
   * Initializes parsing of an XML string, either a tmx (Map) string or tsx (Tileset) string
   * @param {String} xmlString
   * @param {Number} tilesetFirstGid
   * @return {Element}
   */
  parseXMLString: function parseXMLString(xmlStr, tilesetFirstGid) {
    var mapXML = this._parser._parseXML(xmlStr);

    var i; // PARSE <map>

    var map = mapXML.documentElement;
    var orientationStr = map.getAttribute('orientation');
    var staggerAxisStr = map.getAttribute('staggeraxis');
    var staggerIndexStr = map.getAttribute('staggerindex');
    var hexSideLengthStr = map.getAttribute('hexsidelength');
    var renderorderStr = map.getAttribute('renderorder');
    var version = map.getAttribute('version') || '1.0.0';

    if (map.nodeName === "map") {
      var versionArr = version.split('.');
      var supportVersion = this._supportVersion;

      for (var _i2 = 0; _i2 < supportVersion.length; _i2++) {
        var v = parseInt(versionArr[_i2]) || 0;
        var sv = supportVersion[_i2];

        if (sv < v) {
          cc.logID(7216, version);
          break;
        }
      }

      if (orientationStr === "orthogonal") this.orientation = cc.TiledMap.Orientation.ORTHO;else if (orientationStr === "isometric") this.orientation = cc.TiledMap.Orientation.ISO;else if (orientationStr === "hexagonal") this.orientation = cc.TiledMap.Orientation.HEX;else if (orientationStr !== null) cc.logID(7217, orientationStr);

      if (renderorderStr === 'right-up') {
        this.renderOrder = cc.TiledMap.RenderOrder.RightUp;
      } else if (renderorderStr === 'left-up') {
        this.renderOrder = cc.TiledMap.RenderOrder.LeftUp;
      } else if (renderorderStr === 'left-down') {
        this.renderOrder = cc.TiledMap.RenderOrder.LeftDown;
      } else {
        this.renderOrder = cc.TiledMap.RenderOrder.RightDown;
      }

      if (staggerAxisStr === 'x') {
        this.setStaggerAxis(cc.TiledMap.StaggerAxis.STAGGERAXIS_X);
      } else if (staggerAxisStr === 'y') {
        this.setStaggerAxis(cc.TiledMap.StaggerAxis.STAGGERAXIS_Y);
      }

      if (staggerIndexStr === 'odd') {
        this.setStaggerIndex(cc.TiledMap.StaggerIndex.STAGGERINDEX_ODD);
      } else if (staggerIndexStr === 'even') {
        this.setStaggerIndex(cc.TiledMap.StaggerIndex.STAGGERINDEX_EVEN);
      }

      if (hexSideLengthStr) {
        this.setHexSideLength(parseFloat(hexSideLengthStr));
      }

      var mapSize = cc.size(0, 0);
      mapSize.width = parseFloat(map.getAttribute('width'));
      mapSize.height = parseFloat(map.getAttribute('height'));
      this.setMapSize(mapSize);
      mapSize = cc.size(0, 0);
      mapSize.width = parseFloat(map.getAttribute('tilewidth'));
      mapSize.height = parseFloat(map.getAttribute('tileheight'));
      this.setTileSize(mapSize); // The parent element is the map

      this.properties = getPropertyList(map);
    } // PARSE <tileset>


    var tilesets = map.getElementsByTagName('tileset');

    if (map.nodeName !== "map") {
      tilesets = [];
      tilesets.push(map);
    }

    for (i = 0; i < tilesets.length; i++) {
      var selTileset = tilesets[i]; // If this is an external tileset then start parsing that

      var tsxName = selTileset.getAttribute('source');

      if (tsxName) {
        var currentFirstGID = parseInt(selTileset.getAttribute('firstgid'));
        var tsxXmlString = this._tsxMap[tsxName];

        if (tsxXmlString) {
          this.parseXMLString(tsxXmlString, currentFirstGID);
        }
      } else {
        var images = selTileset.getElementsByTagName('image');
        var multiTextures = images.length > 1;
        var image = images[0];
        var firstImageName = image.getAttribute('source');
        firstImageName.replace(/\\/g, '\/');
        var tiles = selTileset.getElementsByTagName('tile');
        var tileCount = tiles && tiles.length || 1;
        var tile = null;
        var tilesetName = selTileset.getAttribute('name') || "";
        var tilesetSpacing = parseInt(selTileset.getAttribute('spacing')) || 0;
        var tilesetMargin = parseInt(selTileset.getAttribute('margin')) || 0;
        var fgid = parseInt(tilesetFirstGid);

        if (!fgid) {
          fgid = parseInt(selTileset.getAttribute('firstgid')) || 0;
        }

        var tilesetSize = cc.size(0, 0);
        tilesetSize.width = parseFloat(selTileset.getAttribute('tilewidth'));
        tilesetSize.height = parseFloat(selTileset.getAttribute('tileheight')); // parse tile offset

        var offset = selTileset.getElementsByTagName('tileoffset')[0];
        var tileOffset = cc.v2(0, 0);

        if (offset) {
          tileOffset.x = parseFloat(offset.getAttribute('x'));
          tileOffset.y = parseFloat(offset.getAttribute('y'));
        }

        var tileset = null;

        for (var tileIdx = 0; tileIdx < tileCount; tileIdx++) {
          if (!tileset || multiTextures) {
            tileset = new cc.TMXTilesetInfo();
            tileset.name = tilesetName;
            tileset.firstGid = fgid;
            tileset.spacing = tilesetSpacing;
            tileset.margin = tilesetMargin;
            tileset._tileSize = tilesetSize;
            tileset.tileOffset = tileOffset;
            tileset.sourceImage = this._textures[firstImageName];
            tileset.imageSize = this._textureSizes[firstImageName] || tileset.imageSize;

            if (!tileset.sourceImage) {
              cc.errorID(7221, firstImageName);
            }

            this.setTilesets(tileset);
          }

          tile = tiles && tiles[tileIdx];
          if (!tile) continue;
          this.parentGID = parseInt(fgid) + parseInt(tile.getAttribute('id') || 0);
          var tileImages = tile.getElementsByTagName('image');

          if (tileImages && tileImages.length > 0) {
            image = tileImages[0];
            var imageName = image.getAttribute('source');
            imageName.replace(/\\/g, '\/');
            tileset.sourceImage = this._textures[imageName];

            if (!tileset.sourceImage) {
              cc.errorID(7221, imageName);
            }

            var tileSize = cc.size(0, 0);
            tileSize.width = parseFloat(image.getAttribute('width'));
            tileSize.height = parseFloat(image.getAttribute('height'));
            tileset._tileSize = tileSize;
            tileset.firstGid = this.parentGID;
          }

          this._tileProperties[this.parentGID] = getPropertyList(tile);
          var animations = tile.getElementsByTagName('animation');

          if (animations && animations.length > 0) {
            var animation = animations[0];
            var framesData = animation.getElementsByTagName('frame');
            var animationProp = {
              frames: [],
              dt: 0,
              frameIdx: 0
            };
            this._tileAnimations[this.parentGID] = animationProp;
            var frames = animationProp.frames;

            for (var frameIdx = 0; frameIdx < framesData.length; frameIdx++) {
              var frame = framesData[frameIdx];
              var tileid = parseInt(fgid) + parseInt(frame.getAttribute('tileid'));
              var duration = parseFloat(frame.getAttribute('duration'));
              frames.push({
                tileid: tileid,
                duration: duration / 1000,
                grid: null
              });
            }
          }
        }
      }
    } // PARSE <layer> & <objectgroup> in order


    var childNodes = map.childNodes;

    for (i = 0; i < childNodes.length; i++) {
      var childNode = childNodes[i];

      if (this._shouldIgnoreNode(childNode)) {
        continue;
      }

      if (childNode.nodeName === 'imagelayer') {
        var imageLayer = this._parseImageLayer(childNode);

        if (imageLayer) {
          this.setImageLayers(imageLayer);
        }
      }

      if (childNode.nodeName === 'layer') {
        var layer = this._parseLayer(childNode);

        this.setLayers(layer);
      }

      if (childNode.nodeName === 'objectgroup') {
        var objectGroup = this._parseObjectGroup(childNode);

        this.setObjectGroups(objectGroup);
      }
    }

    return map;
  },
  _shouldIgnoreNode: function _shouldIgnoreNode(node) {
    return node.nodeType === 3 // text
    || node.nodeType === 8 // comment
    || node.nodeType === 4; // cdata
  },
  _parseImageLayer: function _parseImageLayer(selLayer) {
    var datas = selLayer.getElementsByTagName('image');
    if (!datas || datas.length == 0) return null;
    var imageLayer = new cc.TMXImageLayerInfo();
    imageLayer.name = selLayer.getAttribute('name');
    imageLayer.offset.x = parseFloat(selLayer.getAttribute('offsetx')) || 0;
    imageLayer.offset.y = parseFloat(selLayer.getAttribute('offsety')) || 0;
    var visible = selLayer.getAttribute('visible');
    imageLayer.visible = !(visible === "0");
    var opacity = selLayer.getAttribute('opacity') || 1;
    imageLayer.opacity = parseInt(255 * parseFloat(opacity)) || 255;
    var data = datas[0];
    var source = data.getAttribute('source');
    imageLayer.sourceImage = this._imageLayerTextures[source];
    imageLayer.width = parseInt(data.getAttribute('width')) || 0;
    imageLayer.height = parseInt(data.getAttribute('height')) || 0;
    imageLayer.trans = strToColor(data.getAttribute('trans'));

    if (!imageLayer.sourceImage) {
      cc.errorID(7221, source);
      return null;
    }

    return imageLayer;
  },
  _parseLayer: function _parseLayer(selLayer) {
    var data = selLayer.getElementsByTagName('data')[0];
    var layer = new cc.TMXLayerInfo();
    layer.name = selLayer.getAttribute('name');
    var layerSize = cc.size(0, 0);
    layerSize.width = parseFloat(selLayer.getAttribute('width'));
    layerSize.height = parseFloat(selLayer.getAttribute('height'));
    layer._layerSize = layerSize;
    var visible = selLayer.getAttribute('visible');
    layer.visible = !(visible === "0");
    var opacity = selLayer.getAttribute('opacity') || 1;
    if (opacity) layer._opacity = parseInt(255 * parseFloat(opacity));else layer._opacity = 255;
    layer.offset = cc.v2(parseFloat(selLayer.getAttribute('offsetx')) || 0, parseFloat(selLayer.getAttribute('offsety')) || 0);
    var nodeValue = '';

    for (var j = 0; j < data.childNodes.length; j++) {
      nodeValue += data.childNodes[j].nodeValue;
    }

    nodeValue = nodeValue.trim(); // Unpack the tilemap data

    var compression = data.getAttribute('compression');
    var encoding = data.getAttribute('encoding');

    if (compression && compression !== "gzip" && compression !== "zlib") {
      cc.logID(7218);
      return null;
    }

    var tiles;

    switch (compression) {
      case 'gzip':
        tiles = codec.unzipBase64AsArray(nodeValue, 4);
        break;

      case 'zlib':
        var inflator = new zlib.Inflate(codec.Base64.decodeAsArray(nodeValue, 1));
        tiles = uint8ArrayToUint32Array(inflator.decompress());
        break;

      case null:
      case '':
        // Uncompressed
        if (encoding === "base64") tiles = codec.Base64.decodeAsArray(nodeValue, 4);else if (encoding === "csv") {
          tiles = [];
          var csvTiles = nodeValue.split(',');

          for (var csvIdx = 0; csvIdx < csvTiles.length; csvIdx++) {
            tiles.push(parseInt(csvTiles[csvIdx]));
          }
        } else {
          //XML format
          var selDataTiles = data.getElementsByTagName("tile");
          tiles = [];

          for (var xmlIdx = 0; xmlIdx < selDataTiles.length; xmlIdx++) {
            tiles.push(parseInt(selDataTiles[xmlIdx].getAttribute("gid")));
          }
        }
        break;

      default:
        if (this.layerAttrs === cc.TMXLayerInfo.ATTRIB_NONE) cc.logID(7219);
        break;
    }

    if (tiles) {
      layer._tiles = new Uint32Array(tiles);
    } // The parent element is the last layer


    layer.properties = getPropertyList(selLayer);
    return layer;
  },
  _parseObjectGroup: function _parseObjectGroup(selGroup) {
    var objectGroup = new cc.TMXObjectGroupInfo();
    objectGroup.name = selGroup.getAttribute('name') || '';
    objectGroup.offset = cc.v2(parseFloat(selGroup.getAttribute('offsetx')), parseFloat(selGroup.getAttribute('offsety')));
    var opacity = selGroup.getAttribute('opacity') || 1;
    if (opacity) objectGroup._opacity = parseInt(255 * parseFloat(opacity));else objectGroup._opacity = 255;
    var visible = selGroup.getAttribute('visible');
    if (visible && parseInt(visible) === 0) objectGroup.visible = false;
    var color = selGroup.getAttribute('color');
    if (color) objectGroup._color.fromHEX(color);
    var draworder = selGroup.getAttribute('draworder');
    if (draworder) objectGroup._draworder = draworder; // set the properties to the group

    objectGroup.setProperties(getPropertyList(selGroup));
    var objects = selGroup.getElementsByTagName('object');

    if (objects) {
      for (var j = 0; j < objects.length; j++) {
        var selObj = objects[j]; // The value for "type" was blank or not a valid class name
        // Create an instance of TMXObjectInfo to store the object and its properties

        var objectProp = {}; // Set the id of the object

        objectProp['id'] = selObj.getAttribute('id') || j; // Set the name of the object to the value for "name"

        objectProp["name"] = selObj.getAttribute('name') || ""; // Assign all the attributes as key/name pairs in the properties dictionary

        objectProp["width"] = parseFloat(selObj.getAttribute('width')) || 0;
        objectProp["height"] = parseFloat(selObj.getAttribute('height')) || 0;
        objectProp["x"] = parseFloat(selObj.getAttribute('x')) || 0;
        objectProp["y"] = parseFloat(selObj.getAttribute('y')) || 0;
        objectProp["rotation"] = parseFloat(selObj.getAttribute('rotation')) || 0;
        getPropertyList(selObj, objectProp); // visible

        var visibleAttr = selObj.getAttribute('visible');
        objectProp['visible'] = !(visibleAttr && parseInt(visibleAttr) === 0); // text

        var texts = selObj.getElementsByTagName('text');

        if (texts && texts.length > 0) {
          var text = texts[0];
          objectProp['type'] = cc.TiledMap.TMXObjectType.TEXT;
          objectProp['wrap'] = text.getAttribute('wrap') == '1';
          objectProp['color'] = strToColor(text.getAttribute('color'));
          objectProp['halign'] = strToHAlign(text.getAttribute('halign'));
          objectProp['valign'] = strToVAlign(text.getAttribute('valign'));
          objectProp['pixelsize'] = parseInt(text.getAttribute('pixelsize')) || 16;
          objectProp['text'] = text.childNodes[0].nodeValue;
        } // image


        var gid = selObj.getAttribute('gid');

        if (gid) {
          objectProp['gid'] = parseInt(gid);
          objectProp['type'] = cc.TiledMap.TMXObjectType.IMAGE;
        } // ellipse


        var ellipse = selObj.getElementsByTagName('ellipse');

        if (ellipse && ellipse.length > 0) {
          objectProp['type'] = cc.TiledMap.TMXObjectType.ELLIPSE;
        } //polygon


        var polygonProps = selObj.getElementsByTagName("polygon");

        if (polygonProps && polygonProps.length > 0) {
          objectProp['type'] = cc.TiledMap.TMXObjectType.POLYGON;
          var selPgPointStr = polygonProps[0].getAttribute('points');
          if (selPgPointStr) objectProp["points"] = this._parsePointsString(selPgPointStr);
        } //polyline


        var polylineProps = selObj.getElementsByTagName("polyline");

        if (polylineProps && polylineProps.length > 0) {
          objectProp['type'] = cc.TiledMap.TMXObjectType.POLYLINE;
          var selPlPointStr = polylineProps[0].getAttribute('points');
          if (selPlPointStr) objectProp["polylinePoints"] = this._parsePointsString(selPlPointStr);
        }

        if (!objectProp['type']) {
          objectProp['type'] = cc.TiledMap.TMXObjectType.RECT;
        } // Add the object to the objectGroup


        objectGroup._objects.push(objectProp);
      }

      if (draworder !== 'index') {
        objectGroup._objects.sort(function (a, b) {
          return a.y - b.y;
        });
      }
    }

    return objectGroup;
  },
  _parsePointsString: function _parsePointsString(pointsString) {
    if (!pointsString) return null;
    var points = [];
    var pointsStr = pointsString.split(' ');

    for (var i = 0; i < pointsStr.length; i++) {
      var selPointStr = pointsStr[i].split(',');
      points.push({
        'x': parseFloat(selPointStr[0]),
        'y': parseFloat(selPointStr[1])
      });
    }

    return points;
  },

  /**
   * Sets the tile animations.
   * @return {Object}
   */
  setTileAnimations: function setTileAnimations(animations) {
    this._tileAnimations = animations;
  },

  /**
   * Gets the tile animations.
   * @return {Object}
   */
  getTileAnimations: function getTileAnimations() {
    return this._tileAnimations;
  },

  /**
   * Gets the tile properties.
   * @return {Object}
   */
  getTileProperties: function getTileProperties() {
    return this._tileProperties;
  },

  /**
   * Set the tile properties.
   * @param {Object} tileProperties
   */
  setTileProperties: function setTileProperties(tileProperties) {
    this._tileProperties = tileProperties;
  },

  /**
   * Gets the currentString
   * @return {String}
   */
  getCurrentString: function getCurrentString() {
    return this.currentString;
  },

  /**
   * Set the currentString
   * @param {String} currentString
   */
  setCurrentString: function setCurrentString(currentString) {
    this.currentString = currentString;
  }
};
var _p = cc.TMXMapInfo.prototype; // Extended properties

js.getset(_p, "mapWidth", _p._getMapWidth, _p._setMapWidth);
js.getset(_p, "mapHeight", _p._getMapHeight, _p._setMapHeight);
js.getset(_p, "tileWidth", _p._getTileWidth, _p._setTileWidth);
js.getset(_p, "tileHeight", _p._getTileHeight, _p._setTileHeight);
/**
 * @property ATTRIB_NONE
 * @constant
 * @static
 * @type {Number}
 * @default 1
 */

cc.TMXLayerInfo.ATTRIB_NONE = 1 << 0;
/**
 * @property ATTRIB_BASE64
 * @constant
 * @static
 * @type {Number}
 * @default 2
 */

cc.TMXLayerInfo.ATTRIB_BASE64 = 1 << 1;
/**
 * @property ATTRIB_GZIP
 * @constant
 * @static
 * @type {Number}
 * @default 4
 */

cc.TMXLayerInfo.ATTRIB_GZIP = 1 << 2;
/**
 * @property ATTRIB_ZLIB
 * @constant
 * @static
 * @type {Number}
 * @default 8
 */

cc.TMXLayerInfo.ATTRIB_ZLIB = 1 << 3;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC90aWxlbWFwL0NDVE1YWE1MUGFyc2VyLmpzIl0sIm5hbWVzIjpbImNvZGVjIiwicmVxdWlyZSIsInpsaWIiLCJqcyIsInVpbnQ4QXJyYXlUb1VpbnQzMkFycmF5IiwidWludDhBcnIiLCJsZW5ndGgiLCJhcnJMZW4iLCJyZXRBcnIiLCJ3aW5kb3ciLCJVaW50MzJBcnJheSIsImkiLCJvZmZzZXQiLCJjYyIsIlRNWExheWVySW5mbyIsInByb3BlcnRpZXMiLCJuYW1lIiwiX2xheWVyU2l6ZSIsIl90aWxlcyIsInZpc2libGUiLCJfb3BhY2l0eSIsIm93blRpbGVzIiwiX21pbkdJRCIsIl9tYXhHSUQiLCJ2MiIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwiZ2V0UHJvcGVydGllcyIsInNldFByb3BlcnRpZXMiLCJ2YWx1ZSIsIlRNWEltYWdlTGF5ZXJJbmZvIiwid2lkdGgiLCJoZWlnaHQiLCJfdHJhbnMiLCJDb2xvciIsInNvdXJjZUltYWdlIiwiVE1YT2JqZWN0R3JvdXBJbmZvIiwiX29iamVjdHMiLCJfY29sb3IiLCJfZHJhd29yZGVyIiwiVE1YVGlsZXNldEluZm8iLCJmaXJzdEdpZCIsInNwYWNpbmciLCJtYXJnaW4iLCJpbWFnZVNpemUiLCJzaXplIiwidGlsZU9mZnNldCIsIl90aWxlU2l6ZSIsInJlY3RGb3JHSUQiLCJnaWQiLCJyZXN1bHQiLCJyZWN0IiwiVGlsZWRNYXAiLCJUaWxlRmxhZyIsIkZMSVBQRURfTUFTSyIsInBhcnNlSW50IiwibWF4X3giLCJ4IiwieSIsInN0clRvSEFsaWduIiwiaEFsaWduIiwiTGFiZWwiLCJIb3Jpem9udGFsQWxpZ24iLCJDRU5URVIiLCJSSUdIVCIsIkxFRlQiLCJzdHJUb1ZBbGlnbiIsInZBbGlnbiIsIlZlcnRpY2FsQWxpZ24iLCJCT1RUT00iLCJUT1AiLCJzdHJUb0NvbG9yIiwiY29sb3IiLCJpbmRleE9mIiwic3Vic3RyaW5nIiwiYSIsInN1YnN0ciIsInIiLCJnIiwiYiIsImdldFByb3BlcnR5TGlzdCIsIm5vZGUiLCJtYXAiLCJyZXMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInByb3BlcnR5IiwiaiIsInB1c2giLCJlbGVtZW50IiwiZ2V0QXR0cmlidXRlIiwidHlwZSIsInBhcnNlRmxvYXQiLCJUTVhNYXBJbmZvIiwidG14RmlsZSIsInRzeE1hcCIsInRleHR1cmVzIiwidGV4dHVyZVNpemVzIiwiaW1hZ2VMYXllclRleHR1cmVzIiwib3JpZW50YXRpb24iLCJwYXJlbnRFbGVtZW50IiwicGFyZW50R0lEIiwibGF5ZXJBdHRycyIsInN0b3JpbmdDaGFyYWN0ZXJzIiwiY3VycmVudFN0cmluZyIsInJlbmRlck9yZGVyIiwiUmVuZGVyT3JkZXIiLCJSaWdodERvd24iLCJfc3VwcG9ydFZlcnNpb24iLCJfcGFyc2VyIiwiU0FYUGFyc2VyIiwiX29iamVjdEdyb3VwcyIsIl9hbGxDaGlsZHJlbiIsIl9tYXBTaXplIiwiX2xheWVycyIsIl90aWxlc2V0cyIsIl9pbWFnZUxheWVycyIsIl90aWxlUHJvcGVydGllcyIsIl90aWxlQW5pbWF0aW9ucyIsIl90c3hNYXAiLCJfdGV4dHVyZXMiLCJfc3RhZ2dlckF4aXMiLCJfc3RhZ2dlckluZGV4IiwiX2hleFNpZGVMZW5ndGgiLCJfaW1hZ2VMYXllclRleHR1cmVzIiwiaW5pdFdpdGhYTUwiLCJnZXRPcmllbnRhdGlvbiIsInNldE9yaWVudGF0aW9uIiwiZ2V0U3RhZ2dlckF4aXMiLCJzZXRTdGFnZ2VyQXhpcyIsImdldFN0YWdnZXJJbmRleCIsInNldFN0YWdnZXJJbmRleCIsImdldEhleFNpZGVMZW5ndGgiLCJzZXRIZXhTaWRlTGVuZ3RoIiwiZ2V0TWFwU2l6ZSIsInNldE1hcFNpemUiLCJfZ2V0TWFwV2lkdGgiLCJfc2V0TWFwV2lkdGgiLCJfZ2V0TWFwSGVpZ2h0IiwiX3NldE1hcEhlaWdodCIsImdldFRpbGVTaXplIiwic2V0VGlsZVNpemUiLCJfZ2V0VGlsZVdpZHRoIiwiX3NldFRpbGVXaWR0aCIsIl9nZXRUaWxlSGVpZ2h0IiwiX3NldFRpbGVIZWlnaHQiLCJnZXRMYXllcnMiLCJzZXRMYXllcnMiLCJnZXRJbWFnZUxheWVycyIsInNldEltYWdlTGF5ZXJzIiwiZ2V0VGlsZXNldHMiLCJzZXRUaWxlc2V0cyIsImdldE9iamVjdEdyb3VwcyIsInNldE9iamVjdEdyb3VwcyIsImdldEFsbENoaWxkcmVuIiwiZ2V0UGFyZW50RWxlbWVudCIsInNldFBhcmVudEVsZW1lbnQiLCJnZXRQYXJlbnRHSUQiLCJzZXRQYXJlbnRHSUQiLCJnZXRMYXllckF0dHJpYnMiLCJzZXRMYXllckF0dHJpYnMiLCJnZXRTdG9yaW5nQ2hhcmFjdGVycyIsInNldFN0b3JpbmdDaGFyYWN0ZXJzIiwidG14U3RyaW5nIiwiX3RleHR1cmVTaXplcyIsIkFUVFJJQl9OT05FIiwiTk9ORSIsInBhcnNlWE1MU3RyaW5nIiwieG1sU3RyIiwidGlsZXNldEZpcnN0R2lkIiwibWFwWE1MIiwiX3BhcnNlWE1MIiwiZG9jdW1lbnRFbGVtZW50Iiwib3JpZW50YXRpb25TdHIiLCJzdGFnZ2VyQXhpc1N0ciIsInN0YWdnZXJJbmRleFN0ciIsImhleFNpZGVMZW5ndGhTdHIiLCJyZW5kZXJvcmRlclN0ciIsInZlcnNpb24iLCJub2RlTmFtZSIsInZlcnNpb25BcnIiLCJzcGxpdCIsInN1cHBvcnRWZXJzaW9uIiwidiIsInN2IiwibG9nSUQiLCJPcmllbnRhdGlvbiIsIk9SVEhPIiwiSVNPIiwiSEVYIiwiUmlnaHRVcCIsIkxlZnRVcCIsIkxlZnREb3duIiwiU3RhZ2dlckF4aXMiLCJTVEFHR0VSQVhJU19YIiwiU1RBR0dFUkFYSVNfWSIsIlN0YWdnZXJJbmRleCIsIlNUQUdHRVJJTkRFWF9PREQiLCJTVEFHR0VSSU5ERVhfRVZFTiIsIm1hcFNpemUiLCJ0aWxlc2V0cyIsInNlbFRpbGVzZXQiLCJ0c3hOYW1lIiwiY3VycmVudEZpcnN0R0lEIiwidHN4WG1sU3RyaW5nIiwiaW1hZ2VzIiwibXVsdGlUZXh0dXJlcyIsImltYWdlIiwiZmlyc3RJbWFnZU5hbWUiLCJyZXBsYWNlIiwidGlsZXMiLCJ0aWxlQ291bnQiLCJ0aWxlIiwidGlsZXNldE5hbWUiLCJ0aWxlc2V0U3BhY2luZyIsInRpbGVzZXRNYXJnaW4iLCJmZ2lkIiwidGlsZXNldFNpemUiLCJ0aWxlc2V0IiwidGlsZUlkeCIsImVycm9ySUQiLCJ0aWxlSW1hZ2VzIiwiaW1hZ2VOYW1lIiwidGlsZVNpemUiLCJhbmltYXRpb25zIiwiYW5pbWF0aW9uIiwiZnJhbWVzRGF0YSIsImFuaW1hdGlvblByb3AiLCJmcmFtZXMiLCJkdCIsImZyYW1lSWR4IiwiZnJhbWUiLCJ0aWxlaWQiLCJkdXJhdGlvbiIsImdyaWQiLCJjaGlsZE5vZGVzIiwiY2hpbGROb2RlIiwiX3Nob3VsZElnbm9yZU5vZGUiLCJpbWFnZUxheWVyIiwiX3BhcnNlSW1hZ2VMYXllciIsImxheWVyIiwiX3BhcnNlTGF5ZXIiLCJvYmplY3RHcm91cCIsIl9wYXJzZU9iamVjdEdyb3VwIiwibm9kZVR5cGUiLCJzZWxMYXllciIsImRhdGFzIiwib3BhY2l0eSIsImRhdGEiLCJzb3VyY2UiLCJ0cmFucyIsImxheWVyU2l6ZSIsIm5vZGVWYWx1ZSIsInRyaW0iLCJjb21wcmVzc2lvbiIsImVuY29kaW5nIiwidW56aXBCYXNlNjRBc0FycmF5IiwiaW5mbGF0b3IiLCJJbmZsYXRlIiwiQmFzZTY0IiwiZGVjb2RlQXNBcnJheSIsImRlY29tcHJlc3MiLCJjc3ZUaWxlcyIsImNzdklkeCIsInNlbERhdGFUaWxlcyIsInhtbElkeCIsInNlbEdyb3VwIiwiZnJvbUhFWCIsImRyYXdvcmRlciIsIm9iamVjdHMiLCJzZWxPYmoiLCJvYmplY3RQcm9wIiwidmlzaWJsZUF0dHIiLCJ0ZXh0cyIsInRleHQiLCJUTVhPYmplY3RUeXBlIiwiVEVYVCIsIklNQUdFIiwiZWxsaXBzZSIsIkVMTElQU0UiLCJwb2x5Z29uUHJvcHMiLCJQT0xZR09OIiwic2VsUGdQb2ludFN0ciIsIl9wYXJzZVBvaW50c1N0cmluZyIsInBvbHlsaW5lUHJvcHMiLCJQT0xZTElORSIsInNlbFBsUG9pbnRTdHIiLCJSRUNUIiwic29ydCIsInBvaW50c1N0cmluZyIsInBvaW50cyIsInBvaW50c1N0ciIsInNlbFBvaW50U3RyIiwic2V0VGlsZUFuaW1hdGlvbnMiLCJnZXRUaWxlQW5pbWF0aW9ucyIsImdldFRpbGVQcm9wZXJ0aWVzIiwic2V0VGlsZVByb3BlcnRpZXMiLCJ0aWxlUHJvcGVydGllcyIsImdldEN1cnJlbnRTdHJpbmciLCJzZXRDdXJyZW50U3RyaW5nIiwiX3AiLCJnZXRzZXQiLCJBVFRSSUJfQkFTRTY0IiwiQVRUUklCX0daSVAiLCJBVFRSSUJfWkxJQiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkE7O0FBRUEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMseUJBQUQsQ0FBckI7O0FBQ0EsSUFBTUMsSUFBSSxHQUFHRCxPQUFPLENBQUMseUJBQUQsQ0FBcEI7O0FBQ0EsSUFBTUUsRUFBRSxHQUFHRixPQUFPLENBQUMscUJBQUQsQ0FBbEI7O0FBQ0FBLE9BQU8sQ0FBQyw4QkFBRCxDQUFQOztBQUVBLFNBQVNHLHVCQUFULENBQWtDQyxRQUFsQyxFQUE0QztBQUN4QyxNQUFHQSxRQUFRLENBQUNDLE1BQVQsR0FBa0IsQ0FBbEIsS0FBd0IsQ0FBM0IsRUFDSSxPQUFPLElBQVA7QUFFSixNQUFJQyxNQUFNLEdBQUdGLFFBQVEsQ0FBQ0MsTUFBVCxHQUFpQixDQUE5QjtBQUNBLE1BQUlFLE1BQU0sR0FBR0MsTUFBTSxDQUFDQyxXQUFQLEdBQW9CLElBQUlBLFdBQUosQ0FBZ0JILE1BQWhCLENBQXBCLEdBQThDLEVBQTNEOztBQUNBLE9BQUksSUFBSUksQ0FBQyxHQUFHLENBQVosRUFBZUEsQ0FBQyxHQUFHSixNQUFuQixFQUEyQkksQ0FBQyxFQUE1QixFQUErQjtBQUMzQixRQUFJQyxNQUFNLEdBQUdELENBQUMsR0FBRyxDQUFqQjtBQUNBSCxJQUFBQSxNQUFNLENBQUNHLENBQUQsQ0FBTixHQUFZTixRQUFRLENBQUNP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bkM7QUFDQTs7Ozs7Ozs7QUFPQXZKLEVBQUUsQ0FBQ0MsWUFBSCxDQUFnQitSLGFBQWhCLEdBQWdDLEtBQUssQ0FBckM7QUFDQTs7Ozs7Ozs7QUFPQWhTLEVBQUUsQ0FBQ0MsWUFBSCxDQUFnQmdTLFdBQWhCLEdBQThCLEtBQUssQ0FBbkM7QUFDQTs7Ozs7Ozs7QUFPQWpTLEVBQUUsQ0FBQ0MsWUFBSCxDQUFnQmlTLFdBQWhCLEdBQThCLEtBQUssQ0FBbkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAwOC0yMDEwIFJpY2FyZG8gUXVlc2FkYVxuIENvcHlyaWdodCAoYykgMjAxMS0yMDEyIGNvY29zMmQteC5vcmdcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgY29kZWMgPSByZXF1aXJlKCcuLi9jb21wcmVzc2lvbi9aaXBVdGlscycpO1xuY29uc3QgemxpYiA9IHJlcXVpcmUoJy4uL2NvbXByZXNzaW9uL3psaWIubWluJyk7XG5jb25zdCBqcyA9IHJlcXVpcmUoJy4uL2NvcmUvcGxhdGZvcm0vanMnKTtcbnJlcXVpcmUoJy4uL2NvcmUvcGxhdGZvcm0vQ0NTQVhQYXJzZXInKTtcblxuZnVuY3Rpb24gdWludDhBcnJheVRvVWludDMyQXJyYXkgKHVpbnQ4QXJyKSB7XG4gICAgaWYodWludDhBcnIubGVuZ3RoICUgNCAhPT0gMClcbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBsZXQgYXJyTGVuID0gdWludDhBcnIubGVuZ3RoIC80O1xuICAgIGxldCByZXRBcnIgPSB3aW5kb3cuVWludDMyQXJyYXk/IG5ldyBVaW50MzJBcnJheShhcnJMZW4pIDogW107XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFyckxlbjsgaSsrKXtcbiAgICAgICAgbGV0IG9mZnNldCA9IGkgKiA0O1xuICAgICAgICByZXRBcnJbaV0gPSB1aW50OEFycltvZmZzZXRdICArIHVpbnQ4QXJyW29mZnNldCArIDFdICogKDEgPDwgOCkgKyB1aW50OEFycltvZmZzZXQgKyAyXSAqICgxIDw8IDE2KSArIHVpbnQ4QXJyW29mZnNldCArIDNdICogKDE8PDI0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJldEFycjtcbn1cblxuLy8gQml0cyBvbiB0aGUgZmFyIGVuZCBvZiB0aGUgMzItYml0IGdsb2JhbCB0aWxlIElEIChHSUQncykgYXJlIHVzZWQgZm9yIHRpbGUgZmxhZ3NcblxuLyoqXG4gKiBjYy5UTVhMYXllckluZm8gY29udGFpbnMgdGhlIGluZm9ybWF0aW9uIGFib3V0IHRoZSBsYXllcnMgbGlrZTpcbiAqIC0gTGF5ZXIgbmFtZVxuICogLSBMYXllciBzaXplXG4gKiAtIExheWVyIG9wYWNpdHkgYXQgY3JlYXRpb24gdGltZSAoaXQgY2FuIGJlIG1vZGlmaWVkIGF0IHJ1bnRpbWUpXG4gKiAtIFdoZXRoZXIgdGhlIGxheWVyIGlzIHZpc2libGUgKGlmIGl0J3Mgbm90IHZpc2libGUsIHRoZW4gdGhlIENvY29zTm9kZSB3b24ndCBiZSBjcmVhdGVkKVxuICogVGhpcyBpbmZvcm1hdGlvbiBpcyBvYnRhaW5lZCBmcm9tIHRoZSBUTVggZmlsZS5cbiAqIEBjbGFzcyBUTVhMYXllckluZm9cbiAqL1xuLyoqXG4gKiBQcm9wZXJ0aWVzIG9mIHRoZSBsYXllciBpbmZvLlxuICogQHByb3BlcnR5IHtPYmplY3R9IHByb3BlcnRpZXMgXG4gKi9cbmNjLlRNWExheWVySW5mbyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnByb3BlcnRpZXMgPSB7fTtcbiAgICB0aGlzLm5hbWUgPSBcIlwiO1xuICAgIHRoaXMuX2xheWVyU2l6ZSA9IG51bGw7XG4gICAgdGhpcy5fdGlsZXMgPSBbXTtcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMuX29wYWNpdHkgPSAwO1xuICAgIHRoaXMub3duVGlsZXMgPSB0cnVlO1xuICAgIHRoaXMuX21pbkdJRCA9IDEwMDAwMDtcbiAgICB0aGlzLl9tYXhHSUQgPSAwO1xuICAgIHRoaXMub2Zmc2V0ID0gY2MudjIoMCwwKTtcbn07XG5cbmNjLlRNWExheWVySW5mby5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IGNjLlRNWExheWVySW5mbyxcbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBQcm9wZXJ0aWVzLlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0aWVzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydGllcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBQcm9wZXJ0aWVzLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZVxuICAgICAqL1xuICAgIHNldFByb3BlcnRpZXMgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHZhbHVlO1xuICAgIH1cbn07XG5cbi8qKlxuICogY2MuVE1YSW1hZ2VMYXllckluZm8gY29udGFpbnMgdGhlIGluZm9ybWF0aW9uIGFib3V0IHRoZSBpbWFnZSBsYXllcnMuXG4gKiBUaGlzIGluZm9ybWF0aW9uIGlzIG9idGFpbmVkIGZyb20gdGhlIFRNWCBmaWxlLlxuICogQGNsYXNzIFRNWEltYWdlTGF5ZXJJbmZvXG4gKi9cbmNjLlRNWEltYWdlTGF5ZXJJbmZvID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubmFtZT0gXCJcIjtcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMud2lkdGggPSAwO1xuICAgIHRoaXMuaGVpZ2h0ID0gMDtcbiAgICB0aGlzLm9mZnNldCA9IGNjLnYyKDAsMCk7XG4gICAgdGhpcy5fb3BhY2l0eSA9IDA7XG4gICAgdGhpcy5fdHJhbnMgPSBuZXcgY2MuQ29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KTtcbiAgICB0aGlzLnNvdXJjZUltYWdlID0gbnVsbDtcbn07XG5cbi8qKlxuICogPHA+Y2MuVE1YT2JqZWN0R3JvdXBJbmZvIGNvbnRhaW5zIHRoZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgb2JqZWN0IGdyb3VwIGxpa2U6XG4gKiAtIGdyb3VwIG5hbWVcbiAqIC0gZ3JvdXAgc2l6ZVxuICogLSBncm91cCBvcGFjaXR5IGF0IGNyZWF0aW9uIHRpbWUgKGl0IGNhbiBiZSBtb2RpZmllZCBhdCBydW50aW1lKVxuICogLSBXaGV0aGVyIHRoZSBncm91cCBpcyB2aXNpYmxlXG4gKlxuICogVGhpcyBpbmZvcm1hdGlvbiBpcyBvYnRhaW5lZCBmcm9tIHRoZSBUTVggZmlsZS48L3A+XG4gKiBAY2xhc3MgVE1YT2JqZWN0R3JvdXBJbmZvXG4gKi9cblxuLyoqXG4gKiBQcm9wZXJ0aWVzIG9mIHRoZSBPYmplY3RHcm91cCBpbmZvLlxuICogQHByb3BlcnR5IHtBcnJheX0gcHJvcGVydGllc1xuICovXG5jYy5UTVhPYmplY3RHcm91cEluZm8gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0ge307XG4gICAgdGhpcy5uYW1lID0gXCJcIjtcbiAgICB0aGlzLl9vYmplY3RzID0gW107XG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLl9vcGFjaXR5ID0gMDtcbiAgICB0aGlzLl9jb2xvciA9IG5ldyBjYy5Db2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpO1xuICAgIHRoaXMub2Zmc2V0ID0gY2MudjIoMCwwKTtcbiAgICB0aGlzLl9kcmF3b3JkZXIgPSAndG9wZG93bic7XG59O1xuXG5jYy5UTVhPYmplY3RHcm91cEluZm8ucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBjYy5UTVhPYmplY3RHcm91cEluZm8sXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgUHJvcGVydGllcy5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0aWVzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydGllcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBQcm9wZXJ0aWVzLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZVxuICAgICAqL1xuICAgIHNldFByb3BlcnRpZXMgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHZhbHVlO1xuICAgIH1cbn07XG5cbi8qKlxuICogPHA+Y2MuVE1YVGlsZXNldEluZm8gY29udGFpbnMgdGhlIGluZm9ybWF0aW9uIGFib3V0IHRoZSB0aWxlc2V0cyBsaWtlOiA8YnIgLz5cbiAqIC0gVGlsZXNldCBuYW1lPGJyIC8+XG4gKiAtIFRpbGVzZXQgc3BhY2luZzxiciAvPlxuICogLSBUaWxlc2V0IG1hcmdpbjxiciAvPlxuICogLSBzaXplIG9mIHRoZSB0aWxlczxiciAvPlxuICogLSBJbWFnZSB1c2VkIGZvciB0aGUgdGlsZXM8YnIgLz5cbiAqIC0gSW1hZ2Ugc2l6ZTxiciAvPlxuICpcbiAqIFRoaXMgaW5mb3JtYXRpb24gaXMgb2J0YWluZWQgZnJvbSB0aGUgVE1YIGZpbGUuIDwvcD5cbiAqIEBjbGFzcyBUTVhUaWxlc2V0SW5mb1xuICovXG5cbi8qKlxuICogVGlsZXNldCBuYW1lXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZVxuICovXG5cbi8qKlxuICogRmlyc3QgZ3JpZFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGZpcnN0R2lkIFxuICovXG5cbi8qKlxuICogU3BhY2luZ1xuICogQHByb3BlcnR5IHtudW1iZXJ9IHNwYWNpbmdcbiAqL1xuXG4vKipcbiAqIE1hcmdpblxuICogQHByb3BlcnR5IHtudW1iZXJ9IG1hcmdpbiBcbiAqL1xuXG4vKipcbiAqIFRleHR1cmUgY29udGFpbmluZyB0aGUgdGlsZXMgKHNob3VsZCBiZSBzcHJpdGUgc2hlZXQgLyB0ZXh0dXJlIGF0bGFzKVxuICogQHByb3BlcnR5IHthbnl9IHNvdXJjZUltYWdlXG4gKi9cblxuLyoqXG4gKiBTaXplIGluIHBpeGVscyBvZiB0aGUgaW1hZ2VcbiAqIEBwcm9wZXJ0eSB7Y2MuU2l6ZX0gaW1hZ2VTaXplXG4gKi9cbmNjLlRNWFRpbGVzZXRJbmZvID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIFRpbGVzZXQgbmFtZVxuICAgIHRoaXMubmFtZSA9IFwiXCI7XG4gICAgLy8gRmlyc3QgZ3JpZFxuICAgIHRoaXMuZmlyc3RHaWQgPSAwO1xuICAgIC8vIFNwYWNpbmdcbiAgICB0aGlzLnNwYWNpbmcgPSAwO1xuICAgIC8vIE1hcmdpblxuICAgIHRoaXMubWFyZ2luID0gMDtcbiAgICAvLyBUZXh0dXJlIGNvbnRhaW5pbmcgdGhlIHRpbGVzIChzaG91bGQgYmUgc3ByaXRlIHNoZWV0IC8gdGV4dHVyZSBhdGxhcylcbiAgICB0aGlzLnNvdXJjZUltYWdlID0gbnVsbDtcbiAgICAvLyBTaXplIGluIHBpeGVscyBvZiB0aGUgaW1hZ2VcbiAgICB0aGlzLmltYWdlU2l6ZSA9IGNjLnNpemUoMCwgMCk7XG5cbiAgICB0aGlzLnRpbGVPZmZzZXQgPSBjYy52MigwLCAwKTtcblxuICAgIHRoaXMuX3RpbGVTaXplID0gY2Muc2l6ZSgwLCAwKTtcbn07XG5cbmNjLlRNWFRpbGVzZXRJbmZvLnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogY2MuVE1YVGlsZXNldEluZm8sXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHJlY3RcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZ2lkXG4gICAgICogQHJldHVybiB7UmVjdH1cbiAgICAgKi9cbiAgICByZWN0Rm9yR0lEIChnaWQsIHJlc3VsdCkge1xuICAgICAgICBsZXQgcmVjdCA9IHJlc3VsdCB8fCBjYy5yZWN0KDAsIDAsIDAsIDApO1xuICAgICAgICByZWN0LndpZHRoID0gdGhpcy5fdGlsZVNpemUud2lkdGg7XG4gICAgICAgIHJlY3QuaGVpZ2h0ID0gdGhpcy5fdGlsZVNpemUuaGVpZ2h0O1xuICAgICAgICBnaWQgJj0gY2MuVGlsZWRNYXAuVGlsZUZsYWcuRkxJUFBFRF9NQVNLO1xuICAgICAgICBnaWQgPSBnaWQgLSBwYXJzZUludCh0aGlzLmZpcnN0R2lkLCAxMCk7XG4gICAgICAgIGxldCBtYXhfeCA9IHBhcnNlSW50KCh0aGlzLmltYWdlU2l6ZS53aWR0aCAtIHRoaXMubWFyZ2luICogMiArIHRoaXMuc3BhY2luZykgLyAodGhpcy5fdGlsZVNpemUud2lkdGggKyB0aGlzLnNwYWNpbmcpLCAxMCk7XG4gICAgICAgIHJlY3QueCA9IHBhcnNlSW50KChnaWQgJSBtYXhfeCkgKiAodGhpcy5fdGlsZVNpemUud2lkdGggKyB0aGlzLnNwYWNpbmcpICsgdGhpcy5tYXJnaW4sIDEwKTtcbiAgICAgICAgcmVjdC55ID0gcGFyc2VJbnQocGFyc2VJbnQoZ2lkIC8gbWF4X3gsIDEwKSAqICh0aGlzLl90aWxlU2l6ZS5oZWlnaHQgKyB0aGlzLnNwYWNpbmcpICsgdGhpcy5tYXJnaW4sIDEwKTtcbiAgICAgICAgcmV0dXJuIHJlY3Q7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gc3RyVG9IQWxpZ24gKHZhbHVlKSB7XG4gICAgY29uc3QgaEFsaWduID0gY2MuTGFiZWwuSG9yaXpvbnRhbEFsaWduO1xuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICAgIHJldHVybiBoQWxpZ24uQ0VOVEVSO1xuICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICByZXR1cm4gaEFsaWduLlJJR0hUO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGhBbGlnbi5MRUZUO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc3RyVG9WQWxpZ24gKHZhbHVlKSB7XG4gICAgY29uc3QgdkFsaWduID0gY2MuTGFiZWwuVmVydGljYWxBbGlnbjtcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgICByZXR1cm4gdkFsaWduLkNFTlRFUjtcbiAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgIHJldHVybiB2QWxpZ24uQk9UVE9NO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHZBbGlnbi5UT1A7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzdHJUb0NvbG9yICh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGNjLmNvbG9yKDAsIDAsIDAsIDI1NSk7XG4gICAgfVxuICAgIHZhbHVlID0gKHZhbHVlLmluZGV4T2YoJyMnKSAhPT0gLTEpID8gdmFsdWUuc3Vic3RyaW5nKDEpIDogdmFsdWU7XG4gICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gOCkge1xuICAgICAgICBsZXQgYSA9IHBhcnNlSW50KHZhbHVlLnN1YnN0cigwLCAyKSwgMTYpIHx8IDI1NTtcbiAgICAgICAgbGV0IHIgPSBwYXJzZUludCh2YWx1ZS5zdWJzdHIoMiwgMiksIDE2KSB8fCAwO1xuICAgICAgICBsZXQgZyA9IHBhcnNlSW50KHZhbHVlLnN1YnN0cig0LCAyKSwgMTYpIHx8IDA7XG4gICAgICAgIGxldCBiID0gcGFyc2VJbnQodmFsdWUuc3Vic3RyKDYsIDIpLCAxNikgfHwgMDtcbiAgICAgICAgcmV0dXJuIGNjLmNvbG9yKHIsIGcsIGIsIGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCByID0gcGFyc2VJbnQodmFsdWUuc3Vic3RyKDAsIDIpLCAxNikgfHwgMDtcbiAgICAgICAgbGV0IGcgPSBwYXJzZUludCh2YWx1ZS5zdWJzdHIoMiwgMiksIDE2KSB8fCAwO1xuICAgICAgICBsZXQgYiA9IHBhcnNlSW50KHZhbHVlLnN1YnN0cig0LCAyKSwgMTYpIHx8IDA7XG4gICAgICAgIHJldHVybiBjYy5jb2xvcihyLCBnLCBiLCAyNTUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0UHJvcGVydHlMaXN0IChub2RlLCBtYXApIHtcbiAgICBsZXQgcmVzID0gW107XG4gICAgbGV0IHByb3BlcnRpZXMgPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicHJvcGVydGllc1wiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgbGV0IHByb3BlcnR5ID0gcHJvcGVydGllc1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInByb3BlcnR5XCIpO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHByb3BlcnR5Lmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICByZXMucHVzaChwcm9wZXJ0eVtqXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtYXAgPSBtYXAgfHwge307XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSByZXNbaV07XG4gICAgICAgIGxldCBuYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcbiAgICAgICAgbGV0IHR5cGUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgndHlwZScpIHx8ICdzdHJpbmcnO1xuXG4gICAgICAgIGxldCB2YWx1ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2ludCcpIHtcbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdmbG9hdCcpIHtcbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ2Jvb2wnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlID09PSAndHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ2NvbG9yJykge1xuICAgICAgICAgICAgdmFsdWUgPSBzdHJUb0NvbG9yKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hcFtuYW1lXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBtYXA7XG59XG5cbi8qKlxuICogPHA+Y2MuVE1YTWFwSW5mbyBjb250YWlucyB0aGUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIG1hcCBsaWtlOiA8YnIvPlxuICotIE1hcCBvcmllbnRhdGlvbiAoaGV4YWdvbmFsLCBpc29tZXRyaWMgb3Igb3J0aG9nb25hbCk8YnIvPlxuICotIFRpbGUgc2l6ZTxici8+XG4gKi0gTWFwIHNpemU8L3A+XG4gKlxuICogPHA+QW5kIGl0IGFsc28gY29udGFpbnM6IDxici8+XG4gKiAtIExheWVycyAoYW4gYXJyYXkgb2YgVE1YTGF5ZXJJbmZvIG9iamVjdHMpPGJyLz5cbiAqIC0gVGlsZXNldHMgKGFuIGFycmF5IG9mIFRNWFRpbGVzZXRJbmZvIG9iamVjdHMpIDxici8+XG4gKiAtIE9iamVjdEdyb3VwcyAoYW4gYXJyYXkgb2YgVE1YT2JqZWN0R3JvdXBJbmZvIG9iamVjdHMpIDwvcD5cbiAqXG4gKiA8cD5UaGlzIGluZm9ybWF0aW9uIGlzIG9idGFpbmVkIGZyb20gdGhlIFRNWCBmaWxlLiA8L3A+XG4gKiBAY2xhc3MgVE1YTWFwSW5mb1xuICovXG5cbi8qKlxuICogUHJvcGVydGllcyBvZiB0aGUgbWFwIGluZm8uXG4gKiBAcHJvcGVydHkge0FycmF5fSAgICBwcm9wZXJ0aWVzICAgICAgICAgIFxuICovXG5cbi8qKlxuICogTWFwIG9yaWVudGF0aW9uLlxuICogQHByb3BlcnR5IHtOdW1iZXJ9ICAgb3JpZW50YXRpb24gICAgICAgICBcbiAqL1xuXG4vKipcbiAqIFBhcmVudCBlbGVtZW50LlxuICogQHByb3BlcnR5IHtPYmplY3R9ICAgcGFyZW50RWxlbWVudCAgICAgICBcbiAqL1xuXG4vKipcbiAqIFBhcmVudCBHSUQuXG4gKiBAcHJvcGVydHkge051bWJlcn0gICBwYXJlbnRHSUQgICAgICAgICAgIFxuICovXG5cbi8qKlxuICogTGF5ZXIgYXR0cmlidXRlcy5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSAgIGxheWVyQXR0cnMgICAgICAgIFxuICovXG5cbi8qKlxuICogSXMgcmVhZGluZyBzdG9yaW5nIGNoYXJhY3RlcnMgc3RyZWFtLlxuICogQHByb3BlcnR5IHtCb29sZWFufSAgc3RvcmluZ0NoYXJhY3RlcnMgICBcbiAqL1xuXG4vKipcbiAqIEN1cnJlbnQgc3RyaW5nIHN0b3JlZCBmcm9tIGNoYXJhY3RlcnMgc3RyZWFtLlxuICogQHByb3BlcnR5IHtTdHJpbmd9ICAgY3VycmVudFN0cmluZyAgICAgICBcbiAqL1xuXG4vKipcbiAqIFdpZHRoIG9mIHRoZSBtYXBcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSAgIG1hcFdpZHRoICAgICAgICAgICAgXG4gKi9cblxuLyoqXG4gKiBIZWlnaHQgb2YgdGhlIG1hcFxuICogQHByb3BlcnR5IHtOdW1iZXJ9ICAgbWFwSGVpZ2h0ICAgICAgICAgICBcbiAqL1xuXG4vKipcbiAqIFdpZHRoIG9mIGEgdGlsZVxuICogQHByb3BlcnR5IHtOdW1iZXJ9ICAgdGlsZVdpZHRoICAgICAgICAgICBcbiAqL1xuXG4vKiogXG4gKiBIZWlnaHQgb2YgYSB0aWxlXG4gKiBAcHJvcGVydHkge051bWJlcn0gICB0aWxlSGVpZ2h0ICAgICAgICAgIFxuICovXG5cbi8qKlxuICogQGV4YW1wbGVcbiAqIDEuXG4gKiAvL2NyZWF0ZSBhIFRNWE1hcEluZm8gd2l0aCBmaWxlIG5hbWVcbiAqIGxldCB0bXhNYXBJbmZvID0gbmV3IGNjLlRNWE1hcEluZm8oXCJyZXMvb3J0aG9nb25hbC10ZXN0MS50bXhcIik7XG4gKiAyLlxuICogLy9jcmVhdGUgYSBUTVhNYXBJbmZvIHdpdGggY29udGVudCBzdHJpbmcgYW5kIHJlc291cmNlIHBhdGhcbiAqIGxldCByZXNvdXJjZXMgPSBcInJlcy9UaWxlTWFwc1wiO1xuICogbGV0IGZpbGVQYXRoID0gXCJyZXMvVGlsZU1hcHMvb3J0aG9nb25hbC10ZXN0MS50bXhcIjtcbiAqIGxldCB4bWxTdHIgPSBjYy5yZXNvdXJjZXMuZ2V0KGZpbGVQYXRoKTtcbiAqIGxldCB0bXhNYXBJbmZvID0gbmV3IGNjLlRNWE1hcEluZm8oeG1sU3RyLCByZXNvdXJjZXMpO1xuICovXG5cbi8qKlxuICogQ3JlYXRlcyBhIFRNWCBGb3JtYXQgd2l0aCBhIHRteCBmaWxlIG9yIGNvbnRlbnQgc3RyaW5nXG4gKi9cbmNjLlRNWE1hcEluZm8gPSBmdW5jdGlvbiAodG14RmlsZSwgdHN4TWFwLCB0ZXh0dXJlcywgdGV4dHVyZVNpemVzLCBpbWFnZUxheWVyVGV4dHVyZXMpIHtcbiAgICB0aGlzLnByb3BlcnRpZXMgPSBbXTtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gbnVsbDtcbiAgICB0aGlzLnBhcmVudEVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMucGFyZW50R0lEID0gbnVsbDtcbiAgICB0aGlzLmxheWVyQXR0cnMgPSAwO1xuICAgIHRoaXMuc3RvcmluZ0NoYXJhY3RlcnMgPSBmYWxzZTtcbiAgICB0aGlzLmN1cnJlbnRTdHJpbmcgPSBudWxsO1xuICAgIHRoaXMucmVuZGVyT3JkZXIgPSBjYy5UaWxlZE1hcC5SZW5kZXJPcmRlci5SaWdodERvd247XG5cbiAgICB0aGlzLl9zdXBwb3J0VmVyc2lvbiA9IFsxLCAyLCAwXTtcbiAgICB0aGlzLl9wYXJzZXIgPSBuZXcgY2MuU0FYUGFyc2VyKCk7XG4gICAgdGhpcy5fb2JqZWN0R3JvdXBzID0gW107XG4gICAgdGhpcy5fYWxsQ2hpbGRyZW4gPSBbXTtcbiAgICB0aGlzLl9tYXBTaXplID0gY2Muc2l6ZSgwLCAwKTtcbiAgICB0aGlzLl90aWxlU2l6ZSA9IGNjLnNpemUoMCwgMCk7XG4gICAgdGhpcy5fbGF5ZXJzID0gW107XG4gICAgdGhpcy5fdGlsZXNldHMgPSBbXTtcbiAgICB0aGlzLl9pbWFnZUxheWVycyA9IFtdO1xuICAgIHRoaXMuX3RpbGVQcm9wZXJ0aWVzID0ge307XG4gICAgdGhpcy5fdGlsZUFuaW1hdGlvbnMgPSB7fTtcbiAgICB0aGlzLl90c3hNYXAgPSBudWxsO1xuXG4gICAgLy8gbWFwIG9mIHRleHR1cmVzIGluZGV4ZWQgYnkgbmFtZVxuICAgIHRoaXMuX3RleHR1cmVzID0gbnVsbDtcblxuICAgIC8vIGhleCBtYXAgdmFsdWVzXG4gICAgdGhpcy5fc3RhZ2dlckF4aXMgPSBudWxsO1xuICAgIHRoaXMuX3N0YWdnZXJJbmRleCA9IG51bGw7XG4gICAgdGhpcy5faGV4U2lkZUxlbmd0aCA9IDA7XG5cbiAgICB0aGlzLl9pbWFnZUxheWVyVGV4dHVyZXMgPSBudWxsO1xuXG4gICAgdGhpcy5pbml0V2l0aFhNTCh0bXhGaWxlLCB0c3hNYXAsIHRleHR1cmVzLCB0ZXh0dXJlU2l6ZXMsIGltYWdlTGF5ZXJUZXh0dXJlcyk7XG59O1xuY2MuVE1YTWFwSW5mby5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IGNjLlRNWE1hcEluZm8sXG4gICAgLyoqXG4gICAgICogR2V0cyBNYXAgb3JpZW50YXRpb24uXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldE9yaWVudGF0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZW50YXRpb247XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgTWFwIG9yaWVudGF0aW9uLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgICAqL1xuICAgIHNldE9yaWVudGF0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gdmFsdWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHN0YWdnZXJBeGlzIG9mIG1hcC5cbiAgICAgKiBAcmV0dXJuIHtjYy5UaWxlZE1hcC5TdGFnZ2VyQXhpc31cbiAgICAgKi9cbiAgICBnZXRTdGFnZ2VyQXhpcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFnZ2VyQXhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBzdGFnZ2VyQXhpcyBvZiBtYXAuXG4gICAgICogQHBhcmFtIHtjYy5UaWxlZE1hcC5TdGFnZ2VyQXhpc30gdmFsdWVcbiAgICAgKi9cbiAgICBzZXRTdGFnZ2VyQXhpcyAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fc3RhZ2dlckF4aXMgPSB2YWx1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0cyBzdGFnZ2VyIGluZGV4XG4gICAgICogQHJldHVybiB7Y2MuVGlsZWRNYXAuU3RhZ2dlckluZGV4fVxuICAgICAqL1xuICAgIGdldFN0YWdnZXJJbmRleCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFnZ2VySW5kZXg7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgc3RhZ2dlciBpbmRleC5cbiAgICAgKiBAcGFyYW0ge2NjLlRpbGVkTWFwLlN0YWdnZXJJbmRleH0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXRTdGFnZ2VySW5kZXggKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3N0YWdnZXJJbmRleCA9IHZhbHVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIEhleCBzaWRlIGxlbmd0aC5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0SGV4U2lkZUxlbmd0aCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZXhTaWRlTGVuZ3RoO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIEhleCBzaWRlIGxlbmd0aC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXRIZXhTaWRlTGVuZ3RoICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9oZXhTaWRlTGVuZ3RoID0gdmFsdWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1hcCB3aWR0aCAmIGhlaWdodFxuICAgICAqIEByZXR1cm4ge1NpemV9XG4gICAgICovXG4gICAgZ2V0TWFwU2l6ZSAoKSB7XG4gICAgICAgIHJldHVybiBjYy5zaXplKHRoaXMuX21hcFNpemUud2lkdGgsIHRoaXMuX21hcFNpemUuaGVpZ2h0KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWFwIHdpZHRoICYgaGVpZ2h0XG4gICAgICogQHBhcmFtIHtTaXplfSB2YWx1ZVxuICAgICAqL1xuICAgIHNldE1hcFNpemUgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX21hcFNpemUud2lkdGggPSB2YWx1ZS53aWR0aDtcbiAgICAgICAgdGhpcy5fbWFwU2l6ZS5oZWlnaHQgPSB2YWx1ZS5oZWlnaHQ7XG4gICAgfSxcblxuICAgIF9nZXRNYXBXaWR0aCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBTaXplLndpZHRoO1xuICAgIH0sXG4gICAgX3NldE1hcFdpZHRoICh3aWR0aCkge1xuICAgICAgICB0aGlzLl9tYXBTaXplLndpZHRoID0gd2lkdGg7XG4gICAgfSxcbiAgICBfZ2V0TWFwSGVpZ2h0ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcFNpemUuaGVpZ2h0O1xuICAgIH0sXG4gICAgX3NldE1hcEhlaWdodCAoaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuX21hcFNpemUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaWxlcyB3aWR0aCAmIGhlaWdodFxuICAgICAqIEByZXR1cm4ge1NpemV9XG4gICAgICovXG4gICAgZ2V0VGlsZVNpemUgKCkge1xuICAgICAgICByZXR1cm4gY2Muc2l6ZSh0aGlzLl90aWxlU2l6ZS53aWR0aCwgdGhpcy5fdGlsZVNpemUuaGVpZ2h0KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGlsZXMgd2lkdGggJiBoZWlnaHRcbiAgICAgKiBAcGFyYW0ge1NpemV9IHZhbHVlXG4gICAgICovXG4gICAgc2V0VGlsZVNpemUgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3RpbGVTaXplLndpZHRoID0gdmFsdWUud2lkdGg7XG4gICAgICAgIHRoaXMuX3RpbGVTaXplLmhlaWdodCA9IHZhbHVlLmhlaWdodDtcbiAgICB9LFxuXG4gICAgX2dldFRpbGVXaWR0aCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aWxlU2l6ZS53aWR0aDtcbiAgICB9LFxuICAgIF9zZXRUaWxlV2lkdGggKHdpZHRoKSB7XG4gICAgICAgIHRoaXMuX3RpbGVTaXplLndpZHRoID0gd2lkdGg7XG4gICAgfSxcbiAgICBfZ2V0VGlsZUhlaWdodCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aWxlU2l6ZS5oZWlnaHQ7XG4gICAgfSxcbiAgICBfc2V0VGlsZUhlaWdodCAoaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuX3RpbGVTaXplLmhlaWdodCA9IGhlaWdodDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTGF5ZXJzXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0TGF5ZXJzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheWVycztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTGF5ZXJzXG4gICAgICogQHBhcmFtIHtjYy5UTVhMYXllckluZm99IHZhbHVlXG4gICAgICovXG4gICAgc2V0TGF5ZXJzICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9hbGxDaGlsZHJlbi5wdXNoKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fbGF5ZXJzLnB1c2godmFsdWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBJbWFnZUxheWVyc1xuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqL1xuICAgIGdldEltYWdlTGF5ZXJzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ltYWdlTGF5ZXJzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBJbWFnZUxheWVyc1xuICAgICAqIEBwYXJhbSB7Y2MuVE1YSW1hZ2VMYXllckluZm99IHZhbHVlXG4gICAgICovXG4gICAgc2V0SW1hZ2VMYXllcnMgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2FsbENoaWxkcmVuLnB1c2godmFsdWUpO1xuICAgICAgICB0aGlzLl9pbWFnZUxheWVycy5wdXNoKHZhbHVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdGlsZXNldHNcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRUaWxlc2V0cyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aWxlc2V0cztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdGlsZXNldHNcbiAgICAgKiBAcGFyYW0ge2NjLlRNWFRpbGVzZXRJbmZvfSB2YWx1ZVxuICAgICAqL1xuICAgIHNldFRpbGVzZXRzICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl90aWxlc2V0cy5wdXNoKHZhbHVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogT2JqZWN0R3JvdXBzXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0T2JqZWN0R3JvdXBzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29iamVjdEdyb3VwcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogT2JqZWN0R3JvdXBzXG4gICAgICogQHBhcmFtIHtjYy5UTVhPYmplY3RHcm91cH0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXRPYmplY3RHcm91cHMgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2FsbENoaWxkcmVuLnB1c2godmFsdWUpO1xuICAgICAgICB0aGlzLl9vYmplY3RHcm91cHMucHVzaCh2YWx1ZSk7XG4gICAgfSxcblxuICAgIGdldEFsbENoaWxkcmVuICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FsbENoaWxkcmVuO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBwYXJlbnQgZWxlbWVudFxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRQYXJlbnRFbGVtZW50ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50RWxlbWVudDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcGFyZW50IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXRQYXJlbnRFbGVtZW50ICh2YWx1ZSkge1xuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQgPSB2YWx1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogcGFyZW50IEdJRFxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXRQYXJlbnRHSUQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRHSUQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHBhcmVudCBHSURcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXRQYXJlbnRHSUQgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMucGFyZW50R0lEID0gdmFsdWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIExheWVyIGF0dHJpYnV0ZVxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRMYXllckF0dHJpYnMgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXllckF0dHJzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBMYXllciBhdHRyaWJ1dGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXRMYXllckF0dHJpYnMgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubGF5ZXJBdHRycyA9IHZhbHVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBJcyByZWFkaW5nIHN0b3JpbmcgY2hhcmFjdGVycyBzdHJlYW1cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGdldFN0b3JpbmdDaGFyYWN0ZXJzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmluZ0NoYXJhY3RlcnM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIElzIHJlYWRpbmcgc3RvcmluZyBjaGFyYWN0ZXJzIHN0cmVhbVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXRTdG9yaW5nQ2hhcmFjdGVycyAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zdG9yaW5nQ2hhcmFjdGVycyA9IHZhbHVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0aWVzXG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFByb3BlcnRpZXNcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXRQcm9wZXJ0aWVzICh2YWx1ZSkge1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSB2YWx1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZXMgYSBUTVggZm9ybWF0IHdpdGggYW4gWE1MIHN0cmluZyBhbmQgYSBUTVggcmVzb3VyY2UgcGF0aFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0bXhTdHJpbmdcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdHN4TWFwXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRleHR1cmVzXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpbml0V2l0aFhNTCAodG14U3RyaW5nLCB0c3hNYXAsIHRleHR1cmVzLCB0ZXh0dXJlU2l6ZXMsIGltYWdlTGF5ZXJUZXh0dXJlcykge1xuICAgICAgICB0aGlzLl90aWxlc2V0cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl9sYXllcnMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5faW1hZ2VMYXllcnMubGVuZ3RoID0gMDtcblxuICAgICAgICB0aGlzLl90c3hNYXAgPSB0c3hNYXA7XG4gICAgICAgIHRoaXMuX3RleHR1cmVzID0gdGV4dHVyZXM7XG4gICAgICAgIHRoaXMuX2ltYWdlTGF5ZXJUZXh0dXJlcyA9IGltYWdlTGF5ZXJUZXh0dXJlcztcbiAgICAgICAgdGhpcy5fdGV4dHVyZVNpemVzID0gdGV4dHVyZVNpemVzO1xuXG4gICAgICAgIHRoaXMuX29iamVjdEdyb3Vwcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl9hbGxDaGlsZHJlbi5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fdGlsZVByb3BlcnRpZXMgPSB7fTtcbiAgICAgICAgdGhpcy5fdGlsZUFuaW1hdGlvbnMgPSB7fTtcblxuICAgICAgICAvLyB0bXAgdmFyc1xuICAgICAgICB0aGlzLmN1cnJlbnRTdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLnN0b3JpbmdDaGFyYWN0ZXJzID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGF5ZXJBdHRycyA9IGNjLlRNWExheWVySW5mby5BVFRSSUJfTk9ORTtcbiAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50ID0gY2MuVGlsZWRNYXAuTk9ORTtcblxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVhNTFN0cmluZyh0bXhTdHJpbmcpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBwYXJzaW5nIG9mIGFuIFhNTCBzdHJpbmcsIGVpdGhlciBhIHRteCAoTWFwKSBzdHJpbmcgb3IgdHN4IChUaWxlc2V0KSBzdHJpbmdcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30geG1sU3RyaW5nXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbGVzZXRGaXJzdEdpZFxuICAgICAqIEByZXR1cm4ge0VsZW1lbnR9XG4gICAgICovXG4gICAgcGFyc2VYTUxTdHJpbmcgKHhtbFN0ciwgdGlsZXNldEZpcnN0R2lkKSB7XG4gICAgICAgIGxldCBtYXBYTUwgPSB0aGlzLl9wYXJzZXIuX3BhcnNlWE1MKHhtbFN0cik7XG4gICAgICAgIGxldCBpO1xuXG4gICAgICAgIC8vIFBBUlNFIDxtYXA+XG4gICAgICAgIGxldCBtYXAgPSBtYXBYTUwuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgICAgIGxldCBvcmllbnRhdGlvblN0ciA9IG1hcC5nZXRBdHRyaWJ1dGUoJ29yaWVudGF0aW9uJyk7XG4gICAgICAgIGxldCBzdGFnZ2VyQXhpc1N0ciA9IG1hcC5nZXRBdHRyaWJ1dGUoJ3N0YWdnZXJheGlzJyk7XG4gICAgICAgIGxldCBzdGFnZ2VySW5kZXhTdHIgPSBtYXAuZ2V0QXR0cmlidXRlKCdzdGFnZ2VyaW5kZXgnKTtcbiAgICAgICAgbGV0IGhleFNpZGVMZW5ndGhTdHIgPSBtYXAuZ2V0QXR0cmlidXRlKCdoZXhzaWRlbGVuZ3RoJyk7XG4gICAgICAgIGxldCByZW5kZXJvcmRlclN0ciA9IG1hcC5nZXRBdHRyaWJ1dGUoJ3JlbmRlcm9yZGVyJyk7XG4gICAgICAgIGxldCB2ZXJzaW9uID0gbWFwLmdldEF0dHJpYnV0ZSgndmVyc2lvbicpIHx8ICcxLjAuMCc7XG5cbiAgICAgICAgaWYgKG1hcC5ub2RlTmFtZSA9PT0gXCJtYXBcIikge1xuICAgICAgICAgICAgbGV0IHZlcnNpb25BcnIgPSB2ZXJzaW9uLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBsZXQgc3VwcG9ydFZlcnNpb24gPSB0aGlzLl9zdXBwb3J0VmVyc2lvbjtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3VwcG9ydFZlcnNpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgdiA9IHBhcnNlSW50KHZlcnNpb25BcnJbaV0pIHx8IDA7XG4gICAgICAgICAgICAgICAgbGV0IHN2ID0gc3VwcG9ydFZlcnNpb25baV07XG4gICAgICAgICAgICAgICAgaWYgKHN2IDwgdikge1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2dJRCg3MjE2LCB2ZXJzaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAgIFxuXG4gICAgICAgICAgICBpZiAob3JpZW50YXRpb25TdHIgPT09IFwib3J0aG9nb25hbFwiKVxuICAgICAgICAgICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBjYy5UaWxlZE1hcC5PcmllbnRhdGlvbi5PUlRITztcbiAgICAgICAgICAgIGVsc2UgaWYgKG9yaWVudGF0aW9uU3RyID09PSBcImlzb21ldHJpY1wiKVxuICAgICAgICAgICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBjYy5UaWxlZE1hcC5PcmllbnRhdGlvbi5JU087XG4gICAgICAgICAgICBlbHNlIGlmIChvcmllbnRhdGlvblN0ciA9PT0gXCJoZXhhZ29uYWxcIilcbiAgICAgICAgICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gY2MuVGlsZWRNYXAuT3JpZW50YXRpb24uSEVYO1xuICAgICAgICAgICAgZWxzZSBpZiAob3JpZW50YXRpb25TdHIgIT09IG51bGwpXG4gICAgICAgICAgICAgICAgY2MubG9nSUQoNzIxNywgb3JpZW50YXRpb25TdHIpO1xuXG4gICAgICAgICAgICBpZiAocmVuZGVyb3JkZXJTdHIgPT09ICdyaWdodC11cCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlck9yZGVyID0gY2MuVGlsZWRNYXAuUmVuZGVyT3JkZXIuUmlnaHRVcDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVuZGVyb3JkZXJTdHIgPT09ICdsZWZ0LXVwJykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyT3JkZXIgPSBjYy5UaWxlZE1hcC5SZW5kZXJPcmRlci5MZWZ0VXA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlbmRlcm9yZGVyU3RyID09PSAnbGVmdC1kb3duJykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyT3JkZXIgPSBjYy5UaWxlZE1hcC5SZW5kZXJPcmRlci5MZWZ0RG93bjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJPcmRlciA9IGNjLlRpbGVkTWFwLlJlbmRlck9yZGVyLlJpZ2h0RG93bjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0YWdnZXJBeGlzU3RyID09PSAneCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YWdnZXJBeGlzKGNjLlRpbGVkTWFwLlN0YWdnZXJBeGlzLlNUQUdHRVJBWElTX1gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc3RhZ2dlckF4aXNTdHIgPT09ICd5Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhZ2dlckF4aXMoY2MuVGlsZWRNYXAuU3RhZ2dlckF4aXMuU1RBR0dFUkFYSVNfWSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdGFnZ2VySW5kZXhTdHIgPT09ICdvZGQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGFnZ2VySW5kZXgoY2MuVGlsZWRNYXAuU3RhZ2dlckluZGV4LlNUQUdHRVJJTkRFWF9PREQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc3RhZ2dlckluZGV4U3RyID09PSAnZXZlbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YWdnZXJJbmRleChjYy5UaWxlZE1hcC5TdGFnZ2VySW5kZXguU1RBR0dFUklOREVYX0VWRU4pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaGV4U2lkZUxlbmd0aFN0cikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SGV4U2lkZUxlbmd0aChwYXJzZUZsb2F0KGhleFNpZGVMZW5ndGhTdHIpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG1hcFNpemUgPSBjYy5zaXplKDAsIDApO1xuICAgICAgICAgICAgbWFwU2l6ZS53aWR0aCA9IHBhcnNlRmxvYXQobWFwLmdldEF0dHJpYnV0ZSgnd2lkdGgnKSk7XG4gICAgICAgICAgICBtYXBTaXplLmhlaWdodCA9IHBhcnNlRmxvYXQobWFwLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykpO1xuICAgICAgICAgICAgdGhpcy5zZXRNYXBTaXplKG1hcFNpemUpO1xuXG4gICAgICAgICAgICBtYXBTaXplID0gY2Muc2l6ZSgwLCAwKTtcbiAgICAgICAgICAgIG1hcFNpemUud2lkdGggPSBwYXJzZUZsb2F0KG1hcC5nZXRBdHRyaWJ1dGUoJ3RpbGV3aWR0aCcpKTtcbiAgICAgICAgICAgIG1hcFNpemUuaGVpZ2h0ID0gcGFyc2VGbG9hdChtYXAuZ2V0QXR0cmlidXRlKCd0aWxlaGVpZ2h0JykpO1xuICAgICAgICAgICAgdGhpcy5zZXRUaWxlU2l6ZShtYXBTaXplKTtcblxuICAgICAgICAgICAgLy8gVGhlIHBhcmVudCBlbGVtZW50IGlzIHRoZSBtYXBcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllcyA9IGdldFByb3BlcnR5TGlzdChtYXApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUEFSU0UgPHRpbGVzZXQ+XG4gICAgICAgIGxldCB0aWxlc2V0cyA9IG1hcC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGlsZXNldCcpO1xuICAgICAgICBpZiAobWFwLm5vZGVOYW1lICE9PSBcIm1hcFwiKSB7XG4gICAgICAgICAgICB0aWxlc2V0cyA9IFtdO1xuICAgICAgICAgICAgdGlsZXNldHMucHVzaChtYXApO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRpbGVzZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc2VsVGlsZXNldCA9IHRpbGVzZXRzW2ldO1xuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBhbiBleHRlcm5hbCB0aWxlc2V0IHRoZW4gc3RhcnQgcGFyc2luZyB0aGF0XG4gICAgICAgICAgICBsZXQgdHN4TmFtZSA9IHNlbFRpbGVzZXQuZ2V0QXR0cmlidXRlKCdzb3VyY2UnKTtcbiAgICAgICAgICAgIGlmICh0c3hOYW1lKSB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRGaXJzdEdJRCA9IHBhcnNlSW50KHNlbFRpbGVzZXQuZ2V0QXR0cmlidXRlKCdmaXJzdGdpZCcpKTtcbiAgICAgICAgICAgICAgICBsZXQgdHN4WG1sU3RyaW5nID0gdGhpcy5fdHN4TWFwW3RzeE5hbWVdO1xuICAgICAgICAgICAgICAgIGlmICh0c3hYbWxTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZVhNTFN0cmluZyh0c3hYbWxTdHJpbmcsIGN1cnJlbnRGaXJzdEdJRCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2VzID0gc2VsVGlsZXNldC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1hZ2UnKTtcbiAgICAgICAgICAgICAgICBsZXQgbXVsdGlUZXh0dXJlcyA9IGltYWdlcy5sZW5ndGggPiAxO1xuICAgICAgICAgICAgICAgIGxldCBpbWFnZSA9IGltYWdlc1swXTtcbiAgICAgICAgICAgICAgICBsZXQgZmlyc3RJbWFnZU5hbWUgPSBpbWFnZS5nZXRBdHRyaWJ1dGUoJ3NvdXJjZScpO1xuICAgICAgICAgICAgICAgIGZpcnN0SW1hZ2VOYW1lLnJlcGxhY2UoL1xcXFwvZywgJ1xcLycpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHRpbGVzID0gc2VsVGlsZXNldC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGlsZScpO1xuICAgICAgICAgICAgICAgIGxldCB0aWxlQ291bnQgPSB0aWxlcyAmJiB0aWxlcy5sZW5ndGggfHwgMTtcbiAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBsZXQgdGlsZXNldE5hbWUgPSBzZWxUaWxlc2V0LmdldEF0dHJpYnV0ZSgnbmFtZScpIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgbGV0IHRpbGVzZXRTcGFjaW5nID0gcGFyc2VJbnQoc2VsVGlsZXNldC5nZXRBdHRyaWJ1dGUoJ3NwYWNpbmcnKSkgfHwgMDtcbiAgICAgICAgICAgICAgICBsZXQgdGlsZXNldE1hcmdpbiA9IHBhcnNlSW50KHNlbFRpbGVzZXQuZ2V0QXR0cmlidXRlKCdtYXJnaW4nKSkgfHwgMDtcbiAgICAgICAgICAgICAgICBsZXQgZmdpZCA9IHBhcnNlSW50KHRpbGVzZXRGaXJzdEdpZCk7XG4gICAgICAgICAgICAgICAgaWYgKCFmZ2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZnaWQgPSBwYXJzZUludChzZWxUaWxlc2V0LmdldEF0dHJpYnV0ZSgnZmlyc3RnaWQnKSkgfHwgMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgdGlsZXNldFNpemUgPSBjYy5zaXplKDAsIDApO1xuICAgICAgICAgICAgICAgIHRpbGVzZXRTaXplLndpZHRoID0gcGFyc2VGbG9hdChzZWxUaWxlc2V0LmdldEF0dHJpYnV0ZSgndGlsZXdpZHRoJykpO1xuICAgICAgICAgICAgICAgIHRpbGVzZXRTaXplLmhlaWdodCA9IHBhcnNlRmxvYXQoc2VsVGlsZXNldC5nZXRBdHRyaWJ1dGUoJ3RpbGVoZWlnaHQnKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBwYXJzZSB0aWxlIG9mZnNldFxuICAgICAgICAgICAgICAgIGxldCBvZmZzZXQgPSBzZWxUaWxlc2V0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0aWxlb2Zmc2V0JylbMF07XG4gICAgICAgICAgICAgICAgbGV0IHRpbGVPZmZzZXQgPSBjYy52MigwLCAwKTtcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbGVPZmZzZXQueCA9IHBhcnNlRmxvYXQob2Zmc2V0LmdldEF0dHJpYnV0ZSgneCcpKTtcbiAgICAgICAgICAgICAgICAgICAgdGlsZU9mZnNldC55ID0gcGFyc2VGbG9hdChvZmZzZXQuZ2V0QXR0cmlidXRlKCd5JykpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCB0aWxlc2V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB0aWxlSWR4ID0gMDsgdGlsZUlkeCA8IHRpbGVDb3VudDsgdGlsZUlkeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGlsZXNldCB8fCBtdWx0aVRleHR1cmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlc2V0ID0gbmV3IGNjLlRNWFRpbGVzZXRJbmZvKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlc2V0Lm5hbWUgPSB0aWxlc2V0TmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVzZXQuZmlyc3RHaWQgPSBmZ2lkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlc2V0LnNwYWNpbmcgPSB0aWxlc2V0U3BhY2luZztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVzZXQubWFyZ2luID0gdGlsZXNldE1hcmdpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVzZXQuX3RpbGVTaXplID0gdGlsZXNldFNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlc2V0LnRpbGVPZmZzZXQgPSB0aWxlT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZXNldC5zb3VyY2VJbWFnZSA9IHRoaXMuX3RleHR1cmVzW2ZpcnN0SW1hZ2VOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVzZXQuaW1hZ2VTaXplID0gdGhpcy5fdGV4dHVyZVNpemVzW2ZpcnN0SW1hZ2VOYW1lXSB8fCB0aWxlc2V0LmltYWdlU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGlsZXNldC5zb3VyY2VJbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoNzIyMSwgZmlyc3RJbWFnZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUaWxlc2V0cyh0aWxlc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRpbGUgPSB0aWxlcyAmJiB0aWxlc1t0aWxlSWR4XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aWxlKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudEdJRCA9IHBhcnNlSW50KGZnaWQpICsgcGFyc2VJbnQodGlsZS5nZXRBdHRyaWJ1dGUoJ2lkJykgfHwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0aWxlSW1hZ2VzID0gdGlsZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1hZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbGVJbWFnZXMgJiYgdGlsZUltYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZSA9IHRpbGVJbWFnZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW1hZ2VOYW1lID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdzb3VyY2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlTmFtZS5yZXBsYWNlKC9cXFxcL2csICdcXC8nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVzZXQuc291cmNlSW1hZ2UgPSB0aGlzLl90ZXh0dXJlc1tpbWFnZU5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aWxlc2V0LnNvdXJjZUltYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3JJRCg3MjIxLCBpbWFnZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGlsZVNpemUgPSBjYy5zaXplKDAsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZVNpemUud2lkdGggPSBwYXJzZUZsb2F0KGltYWdlLmdldEF0dHJpYnV0ZSgnd2lkdGgnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlU2l6ZS5oZWlnaHQgPSBwYXJzZUZsb2F0KGltYWdlLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZXNldC5fdGlsZVNpemUgPSB0aWxlU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVzZXQuZmlyc3RHaWQgPSB0aGlzLnBhcmVudEdJRDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpbGVQcm9wZXJ0aWVzW3RoaXMucGFyZW50R0lEXSA9IGdldFByb3BlcnR5TGlzdCh0aWxlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFuaW1hdGlvbnMgPSB0aWxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhbmltYXRpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbnMgJiYgYW5pbWF0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYW5pbWF0aW9uID0gYW5pbWF0aW9uc1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmcmFtZXNEYXRhID0gYW5pbWF0aW9uLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmcmFtZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFuaW1hdGlvblByb3AgPSB7ZnJhbWVzOltdLCBkdDowLCBmcmFtZUlkeDowfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpbGVBbmltYXRpb25zW3RoaXMucGFyZW50R0lEXSA9IGFuaW1hdGlvblByb3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJhbWVzID0gYW5pbWF0aW9uUHJvcC5mcmFtZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBmcmFtZUlkeCA9IDA7IGZyYW1lSWR4IDwgZnJhbWVzRGF0YS5sZW5ndGg7IGZyYW1lSWR4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJhbWUgPSBmcmFtZXNEYXRhW2ZyYW1lSWR4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGlsZWlkID0gcGFyc2VJbnQoZmdpZCkgKyBwYXJzZUludChmcmFtZS5nZXRBdHRyaWJ1dGUoJ3RpbGVpZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZHVyYXRpb24gPSBwYXJzZUZsb2F0KGZyYW1lLmdldEF0dHJpYnV0ZSgnZHVyYXRpb24nKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWVzLnB1c2goe3RpbGVpZCA6IHRpbGVpZCwgZHVyYXRpb24gOiBkdXJhdGlvbiAvIDEwMDAsIGdyaWQ6IG51bGx9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBBUlNFIDxsYXllcj4gJiA8b2JqZWN0Z3JvdXA+IGluIG9yZGVyXG4gICAgICAgIGxldCBjaGlsZE5vZGVzID0gbWFwLmNoaWxkTm9kZXM7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGROb2RlID0gY2hpbGROb2Rlc1tpXTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zaG91bGRJZ25vcmVOb2RlKGNoaWxkTm9kZSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNoaWxkTm9kZS5ub2RlTmFtZSA9PT0gJ2ltYWdlbGF5ZXInKSB7XG4gICAgICAgICAgICAgICAgbGV0IGltYWdlTGF5ZXIgPSB0aGlzLl9wYXJzZUltYWdlTGF5ZXIoY2hpbGROb2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoaW1hZ2VMYXllcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEltYWdlTGF5ZXJzKGltYWdlTGF5ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNoaWxkTm9kZS5ub2RlTmFtZSA9PT0gJ2xheWVyJykge1xuICAgICAgICAgICAgICAgIGxldCBsYXllciA9IHRoaXMuX3BhcnNlTGF5ZXIoY2hpbGROb2RlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldExheWVycyhsYXllcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjaGlsZE5vZGUubm9kZU5hbWUgPT09ICdvYmplY3Rncm91cCcpIHtcbiAgICAgICAgICAgICAgICBsZXQgb2JqZWN0R3JvdXAgPSB0aGlzLl9wYXJzZU9iamVjdEdyb3VwKGNoaWxkTm9kZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRPYmplY3RHcm91cHMob2JqZWN0R3JvdXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9LFxuXG4gICAgX3Nob3VsZElnbm9yZU5vZGUgKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDMgLy8gdGV4dFxuICAgICAgICAgICAgfHwgbm9kZS5ub2RlVHlwZSA9PT0gOCAgIC8vIGNvbW1lbnRcbiAgICAgICAgICAgIHx8IG5vZGUubm9kZVR5cGUgPT09IDQ7ICAvLyBjZGF0YVxuICAgIH0sXG5cbiAgICBfcGFyc2VJbWFnZUxheWVyIChzZWxMYXllcikge1xuICAgICAgICBsZXQgZGF0YXMgPSBzZWxMYXllci5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1hZ2UnKTtcbiAgICAgICAgaWYgKCFkYXRhcyB8fCBkYXRhcy5sZW5ndGggPT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgbGV0IGltYWdlTGF5ZXIgPSBuZXcgY2MuVE1YSW1hZ2VMYXllckluZm8oKTtcbiAgICAgICAgaW1hZ2VMYXllci5uYW1lID0gc2VsTGF5ZXIuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG4gICAgICAgIGltYWdlTGF5ZXIub2Zmc2V0LnggPSBwYXJzZUZsb2F0KHNlbExheWVyLmdldEF0dHJpYnV0ZSgnb2Zmc2V0eCcpKSB8fCAwO1xuICAgICAgICBpbWFnZUxheWVyLm9mZnNldC55ID0gcGFyc2VGbG9hdChzZWxMYXllci5nZXRBdHRyaWJ1dGUoJ29mZnNldHknKSkgfHwgMDtcbiAgICAgICAgbGV0IHZpc2libGUgPSBzZWxMYXllci5nZXRBdHRyaWJ1dGUoJ3Zpc2libGUnKTtcbiAgICAgICAgaW1hZ2VMYXllci52aXNpYmxlID0gISh2aXNpYmxlID09PSBcIjBcIik7XG5cbiAgICAgICAgbGV0IG9wYWNpdHkgPSBzZWxMYXllci5nZXRBdHRyaWJ1dGUoJ29wYWNpdHknKSB8fCAxO1xuICAgICAgICBpbWFnZUxheWVyLm9wYWNpdHkgPSBwYXJzZUludCgyNTUgKiBwYXJzZUZsb2F0KG9wYWNpdHkpKSB8fCAyNTU7XG5cbiAgICAgICAgbGV0IGRhdGEgPSBkYXRhc1swXTtcbiAgICAgICAgbGV0IHNvdXJjZSA9IGRhdGEuZ2V0QXR0cmlidXRlKCdzb3VyY2UnKTtcbiAgICAgICAgaW1hZ2VMYXllci5zb3VyY2VJbWFnZSA9IHRoaXMuX2ltYWdlTGF5ZXJUZXh0dXJlc1tzb3VyY2VdO1xuICAgICAgICBpbWFnZUxheWVyLndpZHRoID0gcGFyc2VJbnQoZGF0YS5nZXRBdHRyaWJ1dGUoJ3dpZHRoJykpIHx8IDA7XG4gICAgICAgIGltYWdlTGF5ZXIuaGVpZ2h0ID0gcGFyc2VJbnQoZGF0YS5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpKSB8fCAwO1xuICAgICAgICBpbWFnZUxheWVyLnRyYW5zID0gc3RyVG9Db2xvcihkYXRhLmdldEF0dHJpYnV0ZSgndHJhbnMnKSk7XG5cbiAgICAgICAgaWYgKCFpbWFnZUxheWVyLnNvdXJjZUltYWdlKSB7XG4gICAgICAgICAgICBjYy5lcnJvcklEKDcyMjEsIHNvdXJjZSk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW1hZ2VMYXllcjtcbiAgICB9LFxuIFxuICAgIF9wYXJzZUxheWVyIChzZWxMYXllcikge1xuICAgICAgICBsZXQgZGF0YSA9IHNlbExheWVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkYXRhJylbMF07XG5cbiAgICAgICAgbGV0IGxheWVyID0gbmV3IGNjLlRNWExheWVySW5mbygpO1xuICAgICAgICBsYXllci5uYW1lID0gc2VsTGF5ZXIuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cbiAgICAgICAgbGV0IGxheWVyU2l6ZSA9IGNjLnNpemUoMCwgMCk7XG4gICAgICAgIGxheWVyU2l6ZS53aWR0aCA9IHBhcnNlRmxvYXQoc2VsTGF5ZXIuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKTtcbiAgICAgICAgbGF5ZXJTaXplLmhlaWdodCA9IHBhcnNlRmxvYXQoc2VsTGF5ZXIuZ2V0QXR0cmlidXRlKCdoZWlnaHQnKSk7XG4gICAgICAgIGxheWVyLl9sYXllclNpemUgPSBsYXllclNpemU7XG5cbiAgICAgICAgbGV0IHZpc2libGUgPSBzZWxMYXllci5nZXRBdHRyaWJ1dGUoJ3Zpc2libGUnKTtcbiAgICAgICAgbGF5ZXIudmlzaWJsZSA9ICEodmlzaWJsZSA9PT0gXCIwXCIpO1xuXG4gICAgICAgIGxldCBvcGFjaXR5ID0gc2VsTGF5ZXIuZ2V0QXR0cmlidXRlKCdvcGFjaXR5JykgfHwgMTtcbiAgICAgICAgaWYgKG9wYWNpdHkpXG4gICAgICAgICAgICBsYXllci5fb3BhY2l0eSA9IHBhcnNlSW50KDI1NSAqIHBhcnNlRmxvYXQob3BhY2l0eSkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBsYXllci5fb3BhY2l0eSA9IDI1NTtcbiAgICAgICAgbGF5ZXIub2Zmc2V0ID0gY2MudjIocGFyc2VGbG9hdChzZWxMYXllci5nZXRBdHRyaWJ1dGUoJ29mZnNldHgnKSkgfHwgMCwgcGFyc2VGbG9hdChzZWxMYXllci5nZXRBdHRyaWJ1dGUoJ29mZnNldHknKSkgfHwgMCk7XG5cbiAgICAgICAgbGV0IG5vZGVWYWx1ZSA9ICcnO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRhdGEuY2hpbGROb2Rlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgbm9kZVZhbHVlICs9IGRhdGEuY2hpbGROb2Rlc1tqXS5ub2RlVmFsdWVcbiAgICAgICAgfVxuICAgICAgICBub2RlVmFsdWUgPSBub2RlVmFsdWUudHJpbSgpO1xuXG4gICAgICAgIC8vIFVucGFjayB0aGUgdGlsZW1hcCBkYXRhXG4gICAgICAgIGxldCBjb21wcmVzc2lvbiA9IGRhdGEuZ2V0QXR0cmlidXRlKCdjb21wcmVzc2lvbicpO1xuICAgICAgICBsZXQgZW5jb2RpbmcgPSBkYXRhLmdldEF0dHJpYnV0ZSgnZW5jb2RpbmcnKTtcbiAgICAgICAgaWYgKGNvbXByZXNzaW9uICYmIGNvbXByZXNzaW9uICE9PSBcImd6aXBcIiAmJiBjb21wcmVzc2lvbiAhPT0gXCJ6bGliXCIpIHtcbiAgICAgICAgICAgIGNjLmxvZ0lEKDcyMTgpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRpbGVzO1xuICAgICAgICBzd2l0Y2ggKGNvbXByZXNzaW9uKSB7XG4gICAgICAgICAgICBjYXNlICdnemlwJzpcbiAgICAgICAgICAgICAgICB0aWxlcyA9IGNvZGVjLnVuemlwQmFzZTY0QXNBcnJheShub2RlVmFsdWUsIDQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnemxpYic6XG4gICAgICAgICAgICAgICAgbGV0IGluZmxhdG9yID0gbmV3IHpsaWIuSW5mbGF0ZShjb2RlYy5CYXNlNjQuZGVjb2RlQXNBcnJheShub2RlVmFsdWUsIDEpKTtcbiAgICAgICAgICAgICAgICB0aWxlcyA9IHVpbnQ4QXJyYXlUb1VpbnQzMkFycmF5KGluZmxhdG9yLmRlY29tcHJlc3MoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgICBjYXNlICcnOlxuICAgICAgICAgICAgICAgIC8vIFVuY29tcHJlc3NlZFxuICAgICAgICAgICAgICAgIGlmIChlbmNvZGluZyA9PT0gXCJiYXNlNjRcIilcbiAgICAgICAgICAgICAgICAgICAgdGlsZXMgPSBjb2RlYy5CYXNlNjQuZGVjb2RlQXNBcnJheShub2RlVmFsdWUsIDQpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVuY29kaW5nID09PSBcImNzdlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbGVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGxldCBjc3ZUaWxlcyA9IG5vZGVWYWx1ZS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBjc3ZJZHggPSAwOyBjc3ZJZHggPCBjc3ZUaWxlcy5sZW5ndGg7IGNzdklkeCsrKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZXMucHVzaChwYXJzZUludChjc3ZUaWxlc1tjc3ZJZHhdKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9YTUwgZm9ybWF0XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxEYXRhVGlsZXMgPSBkYXRhLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGlsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGlsZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeG1sSWR4ID0gMDsgeG1sSWR4IDwgc2VsRGF0YVRpbGVzLmxlbmd0aDsgeG1sSWR4KyspXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlcy5wdXNoKHBhcnNlSW50KHNlbERhdGFUaWxlc1t4bWxJZHhdLmdldEF0dHJpYnV0ZShcImdpZFwiKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGF5ZXJBdHRycyA9PT0gY2MuVE1YTGF5ZXJJbmZvLkFUVFJJQl9OT05FKVxuICAgICAgICAgICAgICAgICAgICBjYy5sb2dJRCg3MjE5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGlsZXMpIHtcbiAgICAgICAgICAgIGxheWVyLl90aWxlcyA9IG5ldyBVaW50MzJBcnJheSh0aWxlcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgcGFyZW50IGVsZW1lbnQgaXMgdGhlIGxhc3QgbGF5ZXJcbiAgICAgICAgbGF5ZXIucHJvcGVydGllcyA9IGdldFByb3BlcnR5TGlzdChzZWxMYXllcik7XG5cbiAgICAgICAgcmV0dXJuIGxheWVyO1xuICAgIH0sXG5cbiAgICBfcGFyc2VPYmplY3RHcm91cCAoc2VsR3JvdXApIHtcbiAgICAgICAgbGV0IG9iamVjdEdyb3VwID0gbmV3IGNjLlRNWE9iamVjdEdyb3VwSW5mbygpO1xuICAgICAgICBvYmplY3RHcm91cC5uYW1lID0gc2VsR3JvdXAuZ2V0QXR0cmlidXRlKCduYW1lJykgfHwgJyc7XG4gICAgICAgIG9iamVjdEdyb3VwLm9mZnNldCA9IGNjLnYyKHBhcnNlRmxvYXQoc2VsR3JvdXAuZ2V0QXR0cmlidXRlKCdvZmZzZXR4JykpLCBwYXJzZUZsb2F0KHNlbEdyb3VwLmdldEF0dHJpYnV0ZSgnb2Zmc2V0eScpKSk7XG5cbiAgICAgICAgbGV0IG9wYWNpdHkgPSBzZWxHcm91cC5nZXRBdHRyaWJ1dGUoJ29wYWNpdHknKSB8fCAxO1xuICAgICAgICBpZiAob3BhY2l0eSlcbiAgICAgICAgICAgIG9iamVjdEdyb3VwLl9vcGFjaXR5ID0gcGFyc2VJbnQoMjU1ICogcGFyc2VGbG9hdChvcGFjaXR5KSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG9iamVjdEdyb3VwLl9vcGFjaXR5ID0gMjU1O1xuXG4gICAgICAgIGxldCB2aXNpYmxlID0gc2VsR3JvdXAuZ2V0QXR0cmlidXRlKCd2aXNpYmxlJyk7XG4gICAgICAgIGlmICh2aXNpYmxlICYmIHBhcnNlSW50KHZpc2libGUpID09PSAwKVxuICAgICAgICAgICAgb2JqZWN0R3JvdXAudmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIGxldCBjb2xvciA9IHNlbEdyb3VwLmdldEF0dHJpYnV0ZSgnY29sb3InKTtcbiAgICAgICAgaWYgKGNvbG9yKVxuICAgICAgICAgICAgb2JqZWN0R3JvdXAuX2NvbG9yLmZyb21IRVgoY29sb3IpO1xuXG4gICAgICAgIGxldCBkcmF3b3JkZXIgPSBzZWxHcm91cC5nZXRBdHRyaWJ1dGUoJ2RyYXdvcmRlcicpO1xuICAgICAgICBpZiAoZHJhd29yZGVyKVxuICAgICAgICAgICAgb2JqZWN0R3JvdXAuX2RyYXdvcmRlciA9IGRyYXdvcmRlcjtcblxuICAgICAgICAvLyBzZXQgdGhlIHByb3BlcnRpZXMgdG8gdGhlIGdyb3VwXG4gICAgICAgIG9iamVjdEdyb3VwLnNldFByb3BlcnRpZXMoZ2V0UHJvcGVydHlMaXN0KHNlbEdyb3VwKSk7XG5cbiAgICAgICAgbGV0IG9iamVjdHMgPSBzZWxHcm91cC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnb2JqZWN0Jyk7XG4gICAgICAgIGlmIChvYmplY3RzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG9iamVjdHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsT2JqID0gb2JqZWN0c1tqXTtcbiAgICAgICAgICAgICAgICAvLyBUaGUgdmFsdWUgZm9yIFwidHlwZVwiIHdhcyBibGFuayBvciBub3QgYSB2YWxpZCBjbGFzcyBuYW1lXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGFuIGluc3RhbmNlIG9mIFRNWE9iamVjdEluZm8gdG8gc3RvcmUgdGhlIG9iamVjdCBhbmQgaXRzIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICBsZXQgb2JqZWN0UHJvcCA9IHt9O1xuXG4gICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBpZCBvZiB0aGUgb2JqZWN0XG4gICAgICAgICAgICAgICAgb2JqZWN0UHJvcFsnaWQnXSA9IHNlbE9iai5nZXRBdHRyaWJ1dGUoJ2lkJykgfHwgajtcblxuICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgbmFtZSBvZiB0aGUgb2JqZWN0IHRvIHRoZSB2YWx1ZSBmb3IgXCJuYW1lXCJcbiAgICAgICAgICAgICAgICBvYmplY3RQcm9wW1wibmFtZVwiXSA9IHNlbE9iai5nZXRBdHRyaWJ1dGUoJ25hbWUnKSB8fCBcIlwiO1xuXG4gICAgICAgICAgICAgICAgLy8gQXNzaWduIGFsbCB0aGUgYXR0cmlidXRlcyBhcyBrZXkvbmFtZSBwYWlycyBpbiB0aGUgcHJvcGVydGllcyBkaWN0aW9uYXJ5XG4gICAgICAgICAgICAgICAgb2JqZWN0UHJvcFtcIndpZHRoXCJdID0gcGFyc2VGbG9hdChzZWxPYmouZ2V0QXR0cmlidXRlKCd3aWR0aCcpKSB8fCAwO1xuICAgICAgICAgICAgICAgIG9iamVjdFByb3BbXCJoZWlnaHRcIl0gPSBwYXJzZUZsb2F0KHNlbE9iai5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpKSB8fCAwO1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0UHJvcFtcInhcIl0gPSBwYXJzZUZsb2F0KHNlbE9iai5nZXRBdHRyaWJ1dGUoJ3gnKSkgfHwgMDtcbiAgICAgICAgICAgICAgICBvYmplY3RQcm9wW1wieVwiXSA9IHBhcnNlRmxvYXQoc2VsT2JqLmdldEF0dHJpYnV0ZSgneScpKSB8fCAwO1xuXG4gICAgICAgICAgICAgICAgb2JqZWN0UHJvcFtcInJvdGF0aW9uXCJdID0gcGFyc2VGbG9hdChzZWxPYmouZ2V0QXR0cmlidXRlKCdyb3RhdGlvbicpKSB8fCAwO1xuXG4gICAgICAgICAgICAgICAgZ2V0UHJvcGVydHlMaXN0KHNlbE9iaiwgb2JqZWN0UHJvcCk7XG5cbiAgICAgICAgICAgICAgICAvLyB2aXNpYmxlXG4gICAgICAgICAgICAgICAgbGV0IHZpc2libGVBdHRyID0gc2VsT2JqLmdldEF0dHJpYnV0ZSgndmlzaWJsZScpO1xuICAgICAgICAgICAgICAgIG9iamVjdFByb3BbJ3Zpc2libGUnXSA9ICEodmlzaWJsZUF0dHIgJiYgcGFyc2VJbnQodmlzaWJsZUF0dHIpID09PSAwKTtcblxuICAgICAgICAgICAgICAgIC8vIHRleHRcbiAgICAgICAgICAgICAgICBsZXQgdGV4dHMgPSBzZWxPYmouZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RleHQnKTtcbiAgICAgICAgICAgICAgICBpZiAodGV4dHMgJiYgdGV4dHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGV4dCA9IHRleHRzWzBdO1xuICAgICAgICAgICAgICAgICAgICBvYmplY3RQcm9wWyd0eXBlJ10gPSBjYy5UaWxlZE1hcC5UTVhPYmplY3RUeXBlLlRFWFQ7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFByb3BbJ3dyYXAnXSA9IHRleHQuZ2V0QXR0cmlidXRlKCd3cmFwJykgPT0gJzEnO1xuICAgICAgICAgICAgICAgICAgICBvYmplY3RQcm9wWydjb2xvciddID0gc3RyVG9Db2xvcih0ZXh0LmdldEF0dHJpYnV0ZSgnY29sb3InKSk7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFByb3BbJ2hhbGlnbiddID0gc3RyVG9IQWxpZ24odGV4dC5nZXRBdHRyaWJ1dGUoJ2hhbGlnbicpKTtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0UHJvcFsndmFsaWduJ10gPSBzdHJUb1ZBbGlnbih0ZXh0LmdldEF0dHJpYnV0ZSgndmFsaWduJykpO1xuICAgICAgICAgICAgICAgICAgICBvYmplY3RQcm9wWydwaXhlbHNpemUnXSA9IHBhcnNlSW50KHRleHQuZ2V0QXR0cmlidXRlKCdwaXhlbHNpemUnKSkgfHwgMTY7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFByb3BbJ3RleHQnXSA9IHRleHQuY2hpbGROb2Rlc1swXS5ub2RlVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gaW1hZ2VcbiAgICAgICAgICAgICAgICBsZXQgZ2lkID0gc2VsT2JqLmdldEF0dHJpYnV0ZSgnZ2lkJyk7XG4gICAgICAgICAgICAgICAgaWYgKGdpZCkge1xuICAgICAgICAgICAgICAgICAgICBvYmplY3RQcm9wWydnaWQnXSA9IHBhcnNlSW50KGdpZCk7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFByb3BbJ3R5cGUnXSA9IGNjLlRpbGVkTWFwLlRNWE9iamVjdFR5cGUuSU1BR0U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZWxsaXBzZVxuICAgICAgICAgICAgICAgIGxldCBlbGxpcHNlID0gc2VsT2JqLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdlbGxpcHNlJyk7XG4gICAgICAgICAgICAgICAgaWYgKGVsbGlwc2UgJiYgZWxsaXBzZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFByb3BbJ3R5cGUnXSA9IGNjLlRpbGVkTWFwLlRNWE9iamVjdFR5cGUuRUxMSVBTRTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL3BvbHlnb25cbiAgICAgICAgICAgICAgICBsZXQgcG9seWdvblByb3BzID0gc2VsT2JqLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicG9seWdvblwiKTtcbiAgICAgICAgICAgICAgICBpZiAocG9seWdvblByb3BzICYmIHBvbHlnb25Qcm9wcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFByb3BbJ3R5cGUnXSA9IGNjLlRpbGVkTWFwLlRNWE9iamVjdFR5cGUuUE9MWUdPTjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbFBnUG9pbnRTdHIgPSBwb2x5Z29uUHJvcHNbMF0uZ2V0QXR0cmlidXRlKCdwb2ludHMnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbFBnUG9pbnRTdHIpXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RQcm9wW1wicG9pbnRzXCJdID0gdGhpcy5fcGFyc2VQb2ludHNTdHJpbmcoc2VsUGdQb2ludFN0cik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9wb2x5bGluZVxuICAgICAgICAgICAgICAgIGxldCBwb2x5bGluZVByb3BzID0gc2VsT2JqLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicG9seWxpbmVcIik7XG4gICAgICAgICAgICAgICAgaWYgKHBvbHlsaW5lUHJvcHMgJiYgcG9seWxpbmVQcm9wcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFByb3BbJ3R5cGUnXSA9IGNjLlRpbGVkTWFwLlRNWE9iamVjdFR5cGUuUE9MWUxJTkU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxQbFBvaW50U3RyID0gcG9seWxpbmVQcm9wc1swXS5nZXRBdHRyaWJ1dGUoJ3BvaW50cycpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsUGxQb2ludFN0cilcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFByb3BbXCJwb2x5bGluZVBvaW50c1wiXSA9IHRoaXMuX3BhcnNlUG9pbnRzU3RyaW5nKHNlbFBsUG9pbnRTdHIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghb2JqZWN0UHJvcFsndHlwZSddKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFByb3BbJ3R5cGUnXSA9IGNjLlRpbGVkTWFwLlRNWE9iamVjdFR5cGUuUkVDVDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIG9iamVjdCB0byB0aGUgb2JqZWN0R3JvdXBcbiAgICAgICAgICAgICAgICBvYmplY3RHcm91cC5fb2JqZWN0cy5wdXNoKG9iamVjdFByb3ApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZHJhd29yZGVyICE9PSAnaW5kZXgnKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0R3JvdXAuX29iamVjdHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS55IC0gYi55O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmplY3RHcm91cDtcbiAgICB9LFxuXG4gICAgX3BhcnNlUG9pbnRzU3RyaW5nIChwb2ludHNTdHJpbmcpIHtcbiAgICAgICAgaWYgKCFwb2ludHNTdHJpbmcpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICBsZXQgcG9pbnRzID0gW107XG4gICAgICAgIGxldCBwb2ludHNTdHIgPSBwb2ludHNTdHJpbmcuc3BsaXQoJyAnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2ludHNTdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzZWxQb2ludFN0ciA9IHBvaW50c1N0cltpXS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgcG9pbnRzLnB1c2goeyd4JzogcGFyc2VGbG9hdChzZWxQb2ludFN0clswXSksICd5JzogcGFyc2VGbG9hdChzZWxQb2ludFN0clsxXSl9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcG9pbnRzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB0aWxlIGFuaW1hdGlvbnMuXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIHNldFRpbGVBbmltYXRpb25zIChhbmltYXRpb25zKSB7XG4gICAgICAgIHRoaXMuX3RpbGVBbmltYXRpb25zID0gYW5pbWF0aW9ucztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdGlsZSBhbmltYXRpb25zLlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRUaWxlQW5pbWF0aW9ucyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aWxlQW5pbWF0aW9ucztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdGlsZSBwcm9wZXJ0aWVzLlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRUaWxlUHJvcGVydGllcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aWxlUHJvcGVydGllcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB0aWxlIHByb3BlcnRpZXMuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRpbGVQcm9wZXJ0aWVzXG4gICAgICovXG4gICAgc2V0VGlsZVByb3BlcnRpZXMgKHRpbGVQcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRoaXMuX3RpbGVQcm9wZXJ0aWVzID0gdGlsZVByb3BlcnRpZXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGN1cnJlbnRTdHJpbmdcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q3VycmVudFN0cmluZyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTdHJpbmc7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY3VycmVudFN0cmluZ1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjdXJyZW50U3RyaW5nXG4gICAgICovXG4gICAgc2V0Q3VycmVudFN0cmluZyAoY3VycmVudFN0cmluZykge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdHJpbmcgPSBjdXJyZW50U3RyaW5nO1xuICAgIH1cbn07XG5cbmxldCBfcCA9IGNjLlRNWE1hcEluZm8ucHJvdG90eXBlO1xuXG4vLyBFeHRlbmRlZCBwcm9wZXJ0aWVzXG5qcy5nZXRzZXQoX3AsIFwibWFwV2lkdGhcIiwgX3AuX2dldE1hcFdpZHRoLCBfcC5fc2V0TWFwV2lkdGgpO1xuanMuZ2V0c2V0KF9wLCBcIm1hcEhlaWdodFwiLCBfcC5fZ2V0TWFwSGVpZ2h0LCBfcC5fc2V0TWFwSGVpZ2h0KTtcbmpzLmdldHNldChfcCwgXCJ0aWxlV2lkdGhcIiwgX3AuX2dldFRpbGVXaWR0aCwgX3AuX3NldFRpbGVXaWR0aCk7XG5qcy5nZXRzZXQoX3AsIFwidGlsZUhlaWdodFwiLCBfcC5fZ2V0VGlsZUhlaWdodCwgX3AuX3NldFRpbGVIZWlnaHQpO1xuXG4vKipcbiAqIEBwcm9wZXJ0eSBBVFRSSUJfTk9ORVxuICogQGNvbnN0YW50XG4gKiBAc3RhdGljXG4gKiBAdHlwZSB7TnVtYmVyfVxuICogQGRlZmF1bHQgMVxuICovXG5jYy5UTVhMYXllckluZm8uQVRUUklCX05PTkUgPSAxIDw8IDA7XG4vKipcbiAqIEBwcm9wZXJ0eSBBVFRSSUJfQkFTRTY0XG4gKiBAY29uc3RhbnRcbiAqIEBzdGF0aWNcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKiBAZGVmYXVsdCAyXG4gKi9cbmNjLlRNWExheWVySW5mby5BVFRSSUJfQkFTRTY0ID0gMSA8PCAxO1xuLyoqXG4gKiBAcHJvcGVydHkgQVRUUklCX0daSVBcbiAqIEBjb25zdGFudFxuICogQHN0YXRpY1xuICogQHR5cGUge051bWJlcn1cbiAqIEBkZWZhdWx0IDRcbiAqL1xuY2MuVE1YTGF5ZXJJbmZvLkFUVFJJQl9HWklQID0gMSA8PCAyO1xuLyoqXG4gKiBAcHJvcGVydHkgQVRUUklCX1pMSUJcbiAqIEBjb25zdGFudFxuICogQHN0YXRpY1xuICogQHR5cGUge051bWJlcn1cbiAqIEBkZWZhdWx0IDhcbiAqL1xuY2MuVE1YTGF5ZXJJbmZvLkFUVFJJQl9aTElCID0gMSA8PCAzO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=