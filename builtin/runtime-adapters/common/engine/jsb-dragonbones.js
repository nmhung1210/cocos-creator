"use strict";

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
(function () {
  if (window.dragonBones === undefined || window.middleware === undefined) return;
  if (dragonBones.DragonBonesAtlasAsset === undefined) return;
  var renderEngine = cc.renderer.renderEngine;
  var SpriteMaterial = renderEngine.SpriteMaterial;

  var _slotColor = cc.color(0, 0, 255, 255);

  var _boneColor = cc.color(255, 0, 0, 255);

  var _originColor = cc.color(0, 255, 0, 255); ////////////////////////////////////////////////////////////
  // override dragonBones library by native dragonBones
  ////////////////////////////////////////////////////////////
  //--------------------
  // adapt event name
  //--------------------


  dragonBones.EventObject.START = "start";
  dragonBones.EventObject.LOOP_COMPLETE = "loopComplete";
  dragonBones.EventObject.COMPLETE = "complete";
  dragonBones.EventObject.FADE_IN = "fadeIn";
  dragonBones.EventObject.FADE_IN_COMPLETE = "fadeInComplete";
  dragonBones.EventObject.FADE_OUT = "fadeOut";
  dragonBones.EventObject.FADE_OUT_COMPLETE = "fadeOutComplete";
  dragonBones.EventObject.FRAME_EVENT = "frameEvent";
  dragonBones.EventObject.SOUND_EVENT = "soundEvent";
  dragonBones.DragonBones = {
    ANGLE_TO_RADIAN: Math.PI / 180,
    RADIAN_TO_ANGLE: 180 / Math.PI
  }; //-------------------
  // native factory
  //-------------------

  var factoryProto = dragonBones.CCFactory.prototype;

  factoryProto.createArmatureNode = function (comp, armatureName, node) {
    node = node || new cc.Node();
    var display = node.getComponent(dragonBones.ArmatureDisplay);

    if (!display) {
      display = node.addComponent(dragonBones.ArmatureDisplay);
    }

    node.name = armatureName;
    display._armatureName = armatureName;
    display._N$dragonAsset = comp.dragonAsset;
    display._N$dragonAtlasAsset = comp.dragonAtlasAsset;

    display._init();

    return display;
  }; //-------------------
  // native armature
  //-------------------


  var armatureProto = dragonBones.Armature.prototype;
  Object.defineProperty(armatureProto, 'animation', {
    get: function get() {
      return this.getAnimation();
    }
  });
  Object.defineProperty(armatureProto, 'display', {
    get: function get() {
      return this.getDisplay();
    }
  });
  Object.defineProperty(armatureProto, 'name', {
    get: function get() {
      return this.getName();
    }
  });

  armatureProto.addEventListener = function (eventType, listener, target) {
    if (!this.__persistentDisplay__) {
      this.__persistentDisplay__ = this.getDisplay();
    }

    this.__persistentDisplay__.on(eventType, listener, target);
  };

  armatureProto.removeEventListener = function (eventType, listener, target) {
    if (!this.__persistentDisplay__) {
      this.__persistentDisplay__ = this.getDisplay();
    }

    this.__persistentDisplay__.off(eventType, listener, target);
  }; //--------------------------
  // native CCArmatureDisplay
  //--------------------------


  var nativeArmatureDisplayProto = dragonBones.CCArmatureDisplay.prototype;
  Object.defineProperty(nativeArmatureDisplayProto, "node", {
    get: function get() {
      return this;
    }
  });

  nativeArmatureDisplayProto.getRootNode = function () {
    var rootDisplay = this.getRootDisplay();
    return rootDisplay && rootDisplay._ccNode;
  };

  nativeArmatureDisplayProto.convertToWorldSpace = function (point) {
    var newPos = this.convertToRootSpace(point);
    var ccNode = this.getRootNode();
    if (!ccNode) return newPos;
    var finalPos = ccNode.convertToWorldSpace(newPos);
    return finalPos;
  };

  nativeArmatureDisplayProto.initEvent = function () {
    if (this._eventTarget) {
      return;
    }

    this._eventTarget = new cc.EventTarget();
    this.setDBEventCallback(function (eventObject) {
      this._eventTarget.emit(eventObject.type, eventObject);
    });
  };

  nativeArmatureDisplayProto.on = function (type, listener, target) {
    this.initEvent();

    this._eventTarget.on(type, listener, target);

    this.addDBEventListener(type, listener);
  };

  nativeArmatureDisplayProto.off = function (type, listener, target) {
    this.initEvent();

    this._eventTarget.off(type, listener, target);

    this.removeDBEventListener(type, listener);
  }; //-------------------
  // native slot
  //-------------------


  var slotProto = dragonBones.Slot.prototype;
  Object.defineProperty(slotProto, 'childArmature', {
    get: function get() {
      return this.getChildArmature();
    },
    set: function set(val) {
      this.setChildArmature(val);
    }
  });
  Object.defineProperty(slotProto, 'display', {
    get: function get() {
      return this.getDisplay();
    }
  });
  Object.defineProperty(slotProto, 'name', {
    get: function get() {
      return this.getName();
    }
  }); //------------------------
  // native TransformObject
  //------------------------

  var transformObjectProto = dragonBones.TransformObject.prototype;
  Object.defineProperty(transformObjectProto, 'global', {
    get: function get() {
      return this.getGlobal();
    }
  });
  Object.defineProperty(transformObjectProto, 'origin', {
    get: function get() {
      return this.getOrigin();
    }
  });
  Object.defineProperty(transformObjectProto, 'offset', {
    get: function get() {
      return this.getOffset();
    }
  }); ////////////////////////////////////////////////////////////
  // override DragonBonesAtlasAsset
  ////////////////////////////////////////////////////////////

  var dbAtlas = dragonBones.DragonBonesAtlasAsset.prototype;
  var gTextureIdx = 0;
  var textureKeyMap = {};
  var textureMap = new WeakMap();
  var textureIdx2Name = {};
  var _reset = dbAtlas.reset;

  dbAtlas.reset = function () {
    _reset.call(this);

    this.recordTexture();
  };

  dbAtlas.recordTexture = function () {
    if (this._texture && this._oldTexture !== this._texture) {
      var texKey = textureKeyMap[gTextureIdx] = {
        key: gTextureIdx
      };
      textureMap.set(texKey, this._texture);
      this._oldTexture = this._texture;
      this._texture.__textureIndex__ = gTextureIdx;
      gTextureIdx++;
    }
  };

  dbAtlas.getTextureByIndex = function (textureIdx) {
    var texKey = textureKeyMap[textureIdx];
    if (!texKey) return;
    return textureMap.get(texKey);
  };

  dbAtlas.buildMaterial = function (tex) {
    this._material = this._material || new SpriteMaterial();
    this._materialCache = this._materialCache || {};
    var baseMaterial = this._material;
    var materialCache = this._materialCache;
    var baseKey = baseMaterial._hash;
    var material = undefined;

    if (!materialCache[baseKey]) {
      material = baseMaterial;
    } else {
      material = baseMaterial.clone();
    }

    material.useModel = true;
    material.texture = tex;
    material.useColor = false;
    material.updateHash();
    materialCache[material._hash] = material;
    return material;
  };

  dbAtlas.updateTextureAtlasData = function (factory) {
    var url = this._texture.url;
    var preAtlasInfo = textureIdx2Name[url];
    var index; // If the texture has store the atlas info before,then get native atlas object,and 
    // update script texture map.

    if (preAtlasInfo) {
      index = preAtlasInfo.index;
      this._textureAtlasData = factory.getTextureAtlasDataByIndex(preAtlasInfo.name, index);
      var texKey = textureKeyMap[preAtlasInfo.index];
      textureMap.set(texKey, this._texture);
      this._texture.__textureIndex__ = index; // If script has store the atlas info,but native has no atlas object,then
      // still new native texture2d object,but no call recordTexture to increase
      // textureIndex.

      if (this._textureAtlasData) {
        return;
      }
    } else {
      this.recordTexture();
    }

    index = this._texture.__textureIndex__;
    this.jsbTexture = new middleware.Texture2D();
    this.jsbTexture.setRealTextureIndex(index);
    this.jsbTexture.setPixelsWide(this._texture.width);
    this.jsbTexture.setPixelsHigh(this._texture.height);
    this._textureAtlasData = factory.parseTextureAtlasData(this.atlasJson, this.jsbTexture);
    var material = this.buildMaterial(this._texture); // var pass = material._mainTech.passes[0];
    // pass._programName = 'skeleton';
    // pass._native.setProgramName('skeleton');

    var nativeEffect = material.effect._nativeObj;
    this.jsbTexture.setNativeEffect(nativeEffect);
    this.jsbTexture.setNativeTexture(this._texture.getImpl());
    textureIdx2Name[url] = {
      name: this._textureAtlasData.name,
      index: index
    };
  };

  dbAtlas.init = function (factory) {
    if (this._textureAtlasData) {
      factory.addTextureAtlasData(this._textureAtlasData);
    } else {
      this.updateTextureAtlasData(factory);
    }
  }; ////////////////////////////////////////////////////////////
  // override DragonBonesAsset
  ////////////////////////////////////////////////////////////


  var dbAsset = dragonBones.DragonBonesAsset.prototype;

  dbAsset.init = function (factory) {
    this._factory = factory;

    if (this._dragonBonesData) {
      var sameNamedDragonBonesData = this._factory.getDragonBonesData(this._dragonBonesData.name);

      if (!sameNamedDragonBonesData) {
        this._factory.addDragonBonesData(this._dragonBonesData);
      }
    } else {
      if (this.dragonBonesJson) {
        this.initWithRawData(this.dragonBonesJson, false);
      } else {
        var nativeUrl = cc.loader.md5Pipe ? cc.loader.md5Pipe.transformURL(this.nativeUrl, true) : this.nativeUrl;
        this.initWithRawData(nativeUrl, true);
      }
    }
  };

  dbAsset.initWithRawData = function (nativeUrl, isBinary) {
    var dragonBonesData = this._factory.parseDragonBonesDataOnly(nativeUrl);

    var sameNamedDragonBonesData = this._factory.getDragonBonesData(dragonBonesData.name);

    if (sameNamedDragonBonesData) {
      this._dragonBonesData = sameNamedDragonBonesData;
    } else {
      this._dragonBonesData = dragonBonesData;

      this._factory.handleTextureAtlasData(isBinary);

      this._factory.addDragonBonesData(dragonBonesData);
    }
  }; ////////////////////////////////////////////////////////////
  // override ArmatureDisplay
  ////////////////////////////////////////////////////////////


  dragonBones.ArmatureDisplay._assembler = undefined;
  var armatureDisplayProto = dragonBones.ArmatureDisplay.prototype;
  var renderCompProto = cc.RenderComponent.prototype;
  var RenderFlow = cc.RenderFlow;
  Object.defineProperty(armatureDisplayProto, 'armatureName', {
    get: function get() {
      return this._armatureName;
    },
    set: function set(value) {
      this._armatureName = value;
      var animNames = this.getAnimationNames(this._armatureName);

      if (!this.animationName || animNames.indexOf(this.animationName) < 0) {
        this.animationName = '';
      }

      if (this._armature) {
        this._armature.dispose();

        this._armature = null;
      }

      this._nativeDisplay = null;

      this._refresh();
    },
    visible: false
  });
  Object.defineProperty(armatureDisplayProto, 'debugBones', {
    get: function get() {
      return this._debugBones || false;
    },
    set: function set(value) {
      this._debugBones = value;

      this._initDebugDraw();

      if (this._nativeDisplay) {
        this._nativeDisplay.setDebugBonesEnabled(this._debugBones);
      }
    }
  });
  Object.defineProperty(armatureDisplayProto, "premultipliedAlpha", {
    get: function get() {
      if (this._premultipliedAlpha === undefined) {
        return false;
      }

      return this._premultipliedAlpha;
    },
    set: function set(value) {
      this._premultipliedAlpha = value;

      if (this._nativeDisplay) {
        this._nativeDisplay.setOpacityModifyRGB(this._premultipliedAlpha);
      }
    }
  });

  armatureDisplayProto._clearRenderData = function () {
    this._nativeDisplay = undefined;
  };

  armatureDisplayProto.initNativeHandle = function () {
    this._assembler = undefined;
    this._renderHandle = new middleware.MiddlewareRenderHandle();

    this._renderHandle.bind(this);
  };

  armatureDisplayProto._buildArmature = function () {
    if (!this.dragonAsset || !this.dragonAtlasAsset || !this.armatureName) {
      this._clearRenderData();

      return;
    }

    var atlasName = this.dragonAtlasAsset._textureAtlasData.name;
    this._nativeDisplay = this._factory.buildArmatureDisplay(this.armatureName, this.dragonAsset._dragonBonesData.name, "", atlasName);

    if (!this._nativeDisplay) {
      this._clearRenderData();

      return;
    }

    this._nativeDisplay._ccNode = this.node;
    this._nativeDisplay._comp = this;

    this._nativeDisplay.bindNodeProxy(this.node._proxy);

    this._nativeDisplay.setOpacityModifyRGB(this.premultipliedAlpha);

    this._nativeDisplay.setDebugBonesEnabled(this.debugBones);

    this._armature = this._nativeDisplay.armature();
    this._armature.animation.timeScale = this.timeScale;

    if (this.animationName) {
      this.playAnimation(this.animationName, this.playTimes);
    }
  };

  armatureDisplayProto.update = function () {
    if (this._debugDraw && this.debugBones) {
      var nativeDisplay = this._nativeDisplay;
      this._debugData = this._debugData || nativeDisplay.getDebugData();
      if (!this._debugData) return;
      var graphics = this._debugDraw;
      graphics.clear();
      var debugData = this._debugData;
      var debugIdx = 0;
      graphics.lineWidth = 5;
      graphics.strokeColor = _boneColor;
      graphics.fillColor = _slotColor; // Root bone color is same as slot color.

      var debugBonesLen = debugData[debugIdx++];

      for (var i = 0; i < debugBonesLen; i += 4) {
        var bx = debugData[debugIdx++];
        var by = debugData[debugIdx++];
        var x = debugData[debugIdx++];
        var y = debugData[debugIdx++]; // Bone lengths.

        graphics.moveTo(bx, by);
        graphics.lineTo(x, y);
        graphics.stroke(); // Bone origins.

        graphics.circle(bx, by, Math.PI * 2);
        graphics.fill();

        if (i === 0) {
          graphics.fillColor = _originColor;
        }
      }
    }
  };

  armatureDisplayProto.onEnable = function () {
    renderCompProto.onEnable.call(this);

    if (this._armature) {
      this._factory.add(this._armature);
    }

    this.node._renderFlag &= ~RenderFlow.FLAG_UPDATE_RENDER_DATA;
    this.node._renderFlag &= ~RenderFlow.FLAG_RENDER;
    this.node._renderFlag &= ~RenderFlow.FLAG_CUSTOM_IA_RENDER;
  };

  armatureDisplayProto.onDisable = function () {
    renderCompProto.onDisable.call(this);

    if (this._armature) {
      this._factory.remove(this._armature);
    }
  };

  var _onLoad = armatureDisplayProto.onLoad;

  armatureDisplayProto.onLoad = function () {
    if (_onLoad) {
      _onLoad.call(this);
    }
  };

  armatureDisplayProto.addEventListener = function (eventType, listener, target) {
    if (this._nativeDisplay) {
      this._nativeDisplay.on(eventType, listener, target);
    }
  };

  armatureDisplayProto.removeEventListener = function (eventType, listener, target) {
    if (this._nativeDisplay) {
      this._nativeDisplay.off(eventType, listener, target);
    }
  };

  var _onDestroy = armatureDisplayProto.onDestroy;

  armatureDisplayProto.onDestroy = function () {
    _onDestroy.call(this);

    if (this._nativeDisplay) {
      this._nativeDisplay._comp = undefined;
      this._nativeDisplay = undefined;
    }

    this._materialCache = undefined;
  };
})();