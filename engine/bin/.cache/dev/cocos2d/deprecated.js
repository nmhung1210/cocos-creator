
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/deprecated.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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
var js = cc.js;

if (CC_DEBUG) {
  var deprecateEnum = function deprecateEnum(obj, oldPath, newPath, hasTypePrefixBefore) {
    if (!CC_SUPPORT_JIT) {
      return;
    }

    hasTypePrefixBefore = hasTypePrefixBefore !== false;
    var enumDef = Function('return ' + newPath)();
    var entries = cc.Enum.getList(enumDef);
    var delimiter = hasTypePrefixBefore ? '_' : '.';

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i].name;
      var oldPropName;

      if (hasTypePrefixBefore) {
        var oldTypeName = oldPath.split('.').slice(-1)[0];
        oldPropName = oldTypeName + '_' + entry;
      } else {
        oldPropName = entry;
      }

      js.get(obj, oldPropName, function (entry) {
        cc.errorID(1400, oldPath + delimiter + entry, newPath + '.' + entry);
        return enumDef[entry];
      }.bind(null, entry));
    }
  };

  var markAsRemoved = function markAsRemoved(ownerCtor, removedProps, ownerName) {
    if (!ownerCtor) {
      // 可能被裁剪了
      return;
    }

    ownerName = ownerName || js.getClassName(ownerCtor);
    removedProps.forEach(function (prop) {
      function error() {
        cc.errorID(1406, ownerName, prop);
      }

      js.getset(ownerCtor.prototype, prop, error, error);
    });
  };

  var markAsDeprecated = function markAsDeprecated(ownerCtor, deprecatedProps, ownerName) {
    if (!ownerCtor) {
      return;
    }

    ownerName = ownerName || js.getClassName(ownerCtor);
    var descriptors = Object.getOwnPropertyDescriptors(ownerCtor.prototype);
    deprecatedProps.forEach(function (prop) {
      var deprecatedProp = prop[0];
      var newProp = prop[1];
      var descriptor = descriptors[deprecatedProp];
      js.getset(ownerCtor.prototype, deprecatedProp, function () {
        cc.warnID(1400, ownerName + "." + deprecatedProp, ownerName + "." + newProp);
        return descriptor.get.call(this);
      }, function (v) {
        cc.warnID(1400, ownerName + "." + deprecatedProp, ownerName + "." + newProp);
        descriptor.set.call(this, v);
      });
    });
  };

  var markAsRemovedInObject = function markAsRemovedInObject(ownerObj, removedProps, ownerName) {
    if (!ownerObj) {
      // 可能被裁剪了
      return;
    }

    removedProps.forEach(function (prop) {
      function error() {
        cc.errorID(1406, ownerName, prop);
      }

      js.getset(ownerObj, prop, error);
    });
  };

  var provideClearError = function provideClearError(owner, obj, ownerName) {
    if (!owner) {
      // 可能被裁剪了
      return;
    }

    var className = ownerName || cc.js.getClassName(owner);
    var Info = 'Sorry, ' + className + '.%s is removed, please use %s instead.';

    var _loop = function _loop() {
      function define(prop, getset) {
        function accessor(newProp) {
          cc.error(Info, prop, newProp);
        }

        if (!Array.isArray(getset)) {
          getset = getset.split(',').map(function (x) {
            return x.trim();
          });
        }

        try {
          js.getset(owner, prop, accessor.bind(null, getset[0]), getset[1] && accessor.bind(null, getset[1]));
        } catch (e) {}
      }

      getset = obj[prop];

      if (prop[0] === '*') {
        // get set
        etProp = prop.slice(1);
        define('g' + etProp, getset);
        define('s' + etProp, getset);
      } else {
        prop.split(',').map(function (x) {
          return x.trim();
        }).forEach(function (x) {
          define(x, getset);
        });
      }
    };

    for (var prop in obj) {
      var getset;
      var etProp;

      _loop();
    }
  };

  var markFunctionWarning = function markFunctionWarning(ownerCtor, obj, ownerName) {
    if (!ownerCtor) {
      // 可能被裁剪了
      return;
    }

    ownerName = ownerName || js.getClassName(ownerCtor);

    for (var prop in obj) {
      (function () {
        var propName = prop;
        var originFunc = ownerCtor[propName];
        if (!originFunc) return;

        function warn() {
          cc.warn('Sorry, %s.%s is deprecated. Please use %s instead', ownerName, propName, obj[propName]);
          return originFunc.apply(this, arguments);
        }

        ownerCtor[propName] = warn;
      })();
    }
  }; // remove cc.info


  js.get(cc, 'info', function () {
    cc.errorID(1400, 'cc.info', 'cc.log');
    return cc.log;
  }); // cc.spriteFrameCache

  js.get(cc, "spriteFrameCache", function () {
    cc.errorID(1404);
  }); // cc.vmath

  js.get(cc, 'vmath', function () {
    cc.warnID(1400, 'cc.vmath', 'cc.math');
    return cc.math;
  });
  js.get(cc.math, 'vec2', function () {
    cc.warnID(1400, 'cc.vmath.vec2', 'cc.Vec2');
    return cc.Vec2;
  });
  js.get(cc.math, 'vec3', function () {
    cc.warnID(1400, 'cc.vmath.vec3', 'cc.Vec3');
    return cc.Vec3;
  });
  js.get(cc.math, 'vec4', function () {
    cc.warnID(1400, 'cc.vmath.vec4', 'cc.Vec4');
    return cc.Vec4;
  });
  js.get(cc.math, 'mat4', function () {
    cc.warnID(1400, 'cc.vmath.mat4', 'cc.Mat4');
    return cc.Mat4;
  });
  js.get(cc.math, 'mat3', function () {
    cc.warnID(1400, 'cc.vmath.mat3', 'cc.Mat3');
    return cc.Mat3;
  });
  js.get(cc.math, 'quat', function () {
    cc.warnID(1400, 'cc.vmath.quat', 'cc.Quat');
    return cc.Quat;
  }); // SpriteFrame

  js.get(cc.SpriteFrame.prototype, '_textureLoaded', function () {
    cc.errorID(1400, 'spriteFrame._textureLoaded', 'spriteFrame.textureLoaded()');
    return this.textureLoaded();
  });
  markAsRemoved(cc.SpriteFrame, ['addLoadedEventListener']);
  markFunctionWarning(cc.Sprite.prototype, {
    setState: 'cc.Sprite.setMaterial',
    getState: 'cc.Sprite.getMaterial'
  }, 'cc.Sprite');
  js.get(cc.SpriteFrame.prototype, 'clearTexture', function () {
    cc.errorID(1406, 'cc.SpriteFrame', 'clearTexture');
    return function () {};
  }); // cc.textureCache

  js.get(cc, 'textureCache', function () {
    cc.errorID(1406, 'cc', 'textureCache');
  }); // Texture

  var Texture2D = cc.Texture2D;
  js.get(Texture2D.prototype, 'releaseTexture', function () {
    cc.errorID(1400, 'texture.releaseTexture()', 'texture.destroy()');
    return this.destroy;
  });
  js.get(Texture2D.prototype, 'getName', function () {
    cc.errorID(1400, 'texture.getName()', 'texture._glID');
    return function () {
      return this._glID || null;
    };
  });
  js.get(Texture2D.prototype, 'isLoaded', function () {
    cc.errorID(1400, 'texture.isLoaded function', 'texture.loaded property');
    return function () {
      return this.loaded;
    };
  });
  js.get(Texture2D.prototype, 'setAntiAliasTexParameters', function () {
    cc.errorID(1400, 'texture.setAntiAliasTexParameters()', 'texture.setFilters(cc.Texture2D.Filter.LINEAR, cc.Texture2D.Filter.LINEAR)');
    return function () {
      this.setFilters(Texture2D.Filter.LINEAR, Texture2D.Filter.LINEAR);
    };
  });
  js.get(Texture2D.prototype, 'setAliasTexParameters', function () {
    cc.errorID(1400, 'texture.setAntiAliasTexParameters()', 'texture.setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST)');
    return function () {
      this.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
    };
  }); // cc.macro

  markAsRemovedInObject(cc.macro, ['ENABLE_GL_STATE_CACHE', 'FIX_ARTIFACTS_BY_STRECHING_TEXEL'], 'cc.macro');
  provideClearError(cc.macro, {
    PI: 'Math.PI',
    PI2: 'Math.PI * 2',
    FLT_MAX: 'Number.MAX_VALUE',
    FLT_MIN: 'Number.MIN_VALUE',
    UINT_MAX: 'Number.MAX_SAFE_INTEGER'
  }, 'cc.macro'); // cc.game

  markAsRemovedInObject(cc.game, ['CONFIG_KEY'], 'cc.game'); // cc.sys

  markAsRemovedInObject(cc.sys, ['dumpRoot', 'cleanScript', 'BROWSER_TYPE_WECHAT_GAME', 'BROWSER_TYPE_WECHAT_GAME_SUB', 'BROWSER_TYPE_BAIDU_GAME', 'BROWSER_TYPE_BAIDU_GAME_SUB', 'BROWSER_TYPE_XIAOMI_GAME', 'BROWSER_TYPE_ALIPAY_GAME'], 'cc.sys'); // cc.Director

  provideClearError(cc.Director, {
    EVENT_PROJECTION_CHANGED: '',
    EVENT_BEFORE_VISIT: 'EVENT_AFTER_UPDATE',
    EVENT_AFTER_VISIT: 'EVENT_BEFORE_DRAW'
  }, 'cc.Director');
  markFunctionWarning(cc.Director.prototype, {
    convertToGL: 'cc.view.convertToLocationInView',
    convertToUI: '',
    getWinSize: 'cc.winSize',
    getWinSizeInPixels: 'cc.winSize',
    getVisibleSize: 'cc.view.getVisibleSize',
    getVisibleOrigin: 'cc.view.getVisibleOrigin',
    purgeCachedData: 'cc.assetManager.releaseAll',
    setDepthTest: 'cc.Camera.main.depth',
    setClearColor: 'cc.Camera.main.backgroundColor',
    getRunningScene: 'cc.director.getScene',
    getAnimationInterval: 'cc.game.getFrameRate',
    setAnimationInterval: 'cc.game.setFrameRate',
    isDisplayStats: 'cc.debug.isDisplayStats',
    setDisplayStats: 'cc.debug.setDisplayStats',
    stopAnimation: 'cc.game.pause',
    startAnimation: 'cc.game.resume'
  }, 'cc.Director');
  markAsRemoved(cc.Director, ['pushScene', 'popScene', 'popToRootScene', 'popToSceneStackLevel', 'setProjection', 'getProjection'], 'cc.Director'); // Scheduler

  provideClearError(cc.Scheduler, {
    scheduleCallbackForTarget: 'schedule',
    scheduleUpdateForTarget: 'scheduleUpdate',
    unscheduleCallbackForTarget: 'unschedule',
    unscheduleUpdateForTarget: 'unscheduleUpdate',
    unscheduleAllCallbacksForTarget: 'unscheduleAllForTarget',
    unscheduleAllCallbacks: 'unscheduleAll',
    unscheduleAllCallbacksWithMinPriority: 'unscheduleAllWithMinPriority'
  }, 'cc.Scheduler'); // cc.view

  provideClearError(cc.view, {
    adjustViewPort: 'adjustViewportMeta',
    setViewPortInPoints: 'setViewportInPoints',
    getViewPortRect: 'getViewportRect'
  }, 'cc.view');
  markAsRemovedInObject(cc.view, ['isViewReady', 'setTargetDensityDPI', 'getTargetDensityDPI', 'setFrameZoomFactor', 'canSetContentScaleFactor', 'setContentTranslateLeftTop', 'getContentTranslateLeftTop', 'setViewName', 'getViewName'], 'cc.view'); // cc.PhysicsManager

  markAsRemoved(cc.PhysicsManager, ['attachDebugDrawToCamera', 'detachDebugDrawFromCamera']); // cc.CollisionManager

  markAsRemoved(cc.CollisionManager, ['attachDebugDrawToCamera', 'detachDebugDrawFromCamera']); // cc.Node

  provideClearError(cc._BaseNode.prototype, {
    'tag': 'name',
    'getTag': 'name',
    'setTag': 'name',
    'getChildByTag': 'getChildByName',
    'removeChildByTag': 'getChildByName(name).destroy()'
  });
  markAsRemoved(cc.Node, ['_cascadeColorEnabled', 'cascadeColor', 'isCascadeColorEnabled', 'setCascadeColorEnabled', '_cascadeOpacityEnabled', 'cascadeOpacity', 'isCascadeOpacityEnabled', 'setCascadeOpacityEnabled', 'opacityModifyRGB', 'isOpacityModifyRGB', 'setOpacityModifyRGB', 'ignoreAnchor', 'isIgnoreAnchorPointForPosition', 'ignoreAnchorPointForPosition', 'isRunning', '_sgNode']);
  markFunctionWarning(cc.Node.prototype, {
    getNodeToParentTransform: 'getLocalMatrix',
    getNodeToParentTransformAR: 'getLocalMatrix',
    getNodeToWorldTransform: 'getWorldMatrix',
    getNodeToWorldTransformAR: 'getWorldMatrix',
    getParentToNodeTransform: 'getLocalMatrix',
    getWorldToNodeTransform: 'getWorldMatrix',
    convertTouchToNodeSpace: 'convertToNodeSpaceAR',
    convertTouchToNodeSpaceAR: 'convertToNodeSpaceAR',
    convertToWorldSpace: 'convertToWorldSpaceAR',
    convertToNodeSpace: 'convertToNodeSpaceAR'
  });
  provideClearError(cc.Node.prototype, {
    getRotationX: 'rotationX',
    setRotationX: 'rotationX',
    getRotationY: 'rotationY',
    setRotationY: 'rotationY',
    getPositionX: 'x',
    setPositionX: 'x',
    getPositionY: 'y',
    setPositionY: 'y',
    getSkewX: 'skewX',
    setSkewX: 'skewX',
    getSkewY: 'skewY',
    setSkewY: 'skewY',
    getScaleX: 'scaleX',
    setScaleX: 'scaleX',
    getScaleY: 'scaleY',
    setScaleY: 'scaleY',
    getOpacity: 'opacity',
    setOpacity: 'opacity',
    getColor: 'color',
    setColor: 'color',
    getLocalZOrder: 'zIndex',
    setLocalZOrder: 'zIndex'
  });
  provideClearError(cc.Sprite.prototype, {
    setInsetLeft: 'cc.SpriteFrame insetLeft',
    setInsetRight: 'cc.SpriteFrame insetRight',
    setInsetTop: 'cc.SpriteFrame insetTop',
    setInsetBottom: 'cc.SpriteFrame insetBottom'
  }); // cc.Material

  cc.Material.getInstantiatedBuiltinMaterial = cc.MaterialVariant.createWithBuiltin;
  cc.Material.getInstantiatedMaterial = cc.MaterialVariant.create;
  markFunctionWarning(cc.Material, {
    getInstantiatedBuiltinMaterial: 'cc.MaterialVariant.createWithBuiltin',
    getInstantiatedMaterial: 'cc.MaterialVariant.create'
  }); // cc.RenderComponent

  cc.js.getset(cc.RenderComponent.prototype, 'sharedMaterials', function () {
    cc.warnID(1400, 'sharedMaterials', 'getMaterials');
    return this.materials;
  }, function (v) {
    cc.warnID(1400, 'sharedMaterials', 'setMaterial');
    this.materials = v;
  }); // cc.Camera

  markFunctionWarning(cc.Camera.prototype, {
    getNodeToCameraTransform: 'getWorldToScreenMatrix2D',
    getCameraToWorldPoint: 'getScreenToWorldPoint',
    getWorldToCameraPoint: 'getWorldToScreenPoint',
    getCameraToWorldMatrix: 'getScreenToWorldMatrix2D',
    getWorldToCameraMatrix: 'getWorldToScreenMatrix2D'
  });
  markAsRemoved(cc.Camera, ['addTarget', 'removeTarget', 'getTargets']); // SCENE

  var ERR = '"%s" is not defined in the Scene, it is only defined in normal nodes.';
  CC_EDITOR || Object.defineProperties(cc.Scene.prototype, {
    active: {
      get: function get() {
        cc.error(ERR, 'active');
        return true;
      },
      set: function set() {
        cc.error(ERR, 'active');
      }
    },
    activeInHierarchy: {
      get: function get() {
        cc.error(ERR, 'activeInHierarchy');
        return true;
      }
    },
    getComponent: {
      get: function get() {
        cc.error(ERR, 'getComponent');
        return function () {
          return null;
        };
      }
    },
    addComponent: {
      get: function get() {
        cc.error(ERR, 'addComponent');
        return function () {
          return null;
        };
      }
    }
  }); // cc.dynamicAtlasManager

  markAsRemovedInObject(cc.dynamicAtlasManager, ['minFrameSize'], 'cc.dynamicAtlasManager'); // light component

  if (cc.Light) {
    markAsRemovedInObject(cc.Light.prototype, ['shadowDepthScale'], 'cc.Light.prototype');
  } // Value types


  provideClearError(cc, {
    // AffineTransform
    affineTransformMake: 'cc.AffineTransform.create',
    affineTransformMakeIdentity: 'cc.AffineTransform.identity',
    affineTransformClone: 'cc.AffineTransform.clone',
    affineTransformConcat: 'cc.AffineTransform.concat',
    affineTransformConcatIn: 'cc.AffineTransform.concat',
    affineTransformInvert: 'cc.AffineTransform.invert',
    affineTransformInvertIn: 'cc.AffineTransform.invert',
    affineTransformInvertOut: 'cc.AffineTransform.invert',
    affineTransformEqualToTransform: 'cc.AffineTransform.equal',
    pointApplyAffineTransform: 'cc.AffineTransform.transformVec2',
    sizeApplyAffineTransform: 'cc.AffineTransform.transformSize',
    rectApplyAffineTransform: 'cc.AffineTransform.transformRect',
    obbApplyAffineTransform: 'cc.AffineTransform.transformObb',
    // Vec2
    pointEqualToPoint: 'cc.Vec2 equals',
    // Size
    sizeEqualToSize: 'cc.Size equals',
    // Rect
    rectEqualToRect: 'rectA.equals(rectB)',
    rectContainsRect: 'rectA.containsRect(rectB)',
    rectContainsPoint: 'rect.contains(vec2)',
    rectOverlapsRect: 'rectA.intersects(rectB)',
    rectIntersectsRect: 'rectA.intersects(rectB)',
    rectIntersection: 'rectA.intersection(intersection, rectB)',
    rectUnion: 'rectA.union(union, rectB)',
    rectGetMaxX: 'rect.xMax',
    rectGetMidX: 'rect.center.x',
    rectGetMinX: 'rect.xMin',
    rectGetMaxY: 'rect.yMax',
    rectGetMidY: 'rect.center.y',
    rectGetMinY: 'rect.yMin',
    // Color
    colorEqual: 'colorA.equals(colorB)',
    hexToColor: 'color.fromHEX(hexColor)',
    colorToHex: 'color.toHEX()',
    // Enums
    TextAlignment: 'cc.macro.TextAlignment',
    VerticalTextAlignment: 'cc.macro.VerticalTextAlignment',
    // Point Extensions
    pNeg: 'p.neg()',
    pAdd: 'p1.add(p2)',
    pSub: 'p1.sub(p2)',
    pMult: 'p.mul(factor)',
    pMidpoint: 'p1.add(p2).mul(0.5)',
    pDot: 'p1.dot(p2)',
    pCross: 'p1.cross(p2)',
    pPerp: 'p.rotate(-90 * Math.PI / 180)',
    pRPerp: 'p.rotate(90 * Math.PI / 180)',
    pProject: 'p1.project(p2)',
    pLengthSQ: 'p.magSqr()',
    pDistanceSQ: 'p1.sub(p2).magSqr()',
    pLength: 'p.mag()',
    pDistance: 'p1.sub(p2).mag()',
    pNormalize: 'p.normalize()',
    pForAngle: 'cc.v2(Math.cos(a), Math.sin(a))',
    pToAngle: 'Math.atan2(v.y, v.x)',
    pZeroIn: 'p.x = p.y = 0',
    pIn: 'p1.set(p2)',
    pMultIn: 'p.mulSelf(factor)',
    pSubIn: 'p1.subSelf(p2)',
    pAddIn: 'p1.addSelf(p2)',
    pNormalizeIn: 'p.normalizeSelf()',
    pSameAs: 'p1.equals(p2)',
    pAngle: 'v1.angle(v2)',
    pAngleSigned: 'v1.signAngle(v2)',
    pRotateByAngle: 'p.rotate(radians)',
    pCompMult: 'v1.dot(v2)',
    pFuzzyEqual: 'v1.fuzzyEquals(v2, tolerance)',
    pLerp: 'p.lerp(endPoint, ratio)',
    pClamp: 'p.clampf(min_inclusive, max_inclusive)',
    rand: 'Math.random() * 0xffffff',
    randomMinus1To1: '(Math.random() - 0.5) * 2',
    container: 'cc.game.container',
    _canvas: 'cc.game.canvas',
    _renderType: 'cc.game.renderType',
    _getError: 'cc.debug.getError',
    _initDebugSetting: 'cc.debug._resetDebugSetting',
    DebugMode: 'cc.debug.DebugMode'
  }, 'cc');
  markAsRemovedInObject(cc, ['blendFuncDisable', 'pFromSize', 'pCompOp', 'pIntersectPoint', 'pSegmentIntersect', 'pLineIntersect', 'obbApplyMatrix', 'getImageFormatByData', 'initEngine'], 'cc');
  markFunctionWarning(cc, {
    // cc.p
    p: 'cc.v2'
  }, 'cc'); // cc.Rect

  provideClearError(cc.Rect, {
    contain: 'rectA.contains(rectB)',
    transformMat4: 'rect.transformMat4(out, mat4)'
  }); // cc.Color

  provideClearError(cc.Color, {
    rgb2hsv: 'color.toHSV()',
    hsv2rgb: 'color.fromHSV(h, s, v)'
  });
  markFunctionWarning(cc.Color, {
    fromHex: 'cc.Color.fromHEX'
  }); // macro functions

  js.get(cc, 'lerp', function () {
    cc.errorID(1400, 'cc.lerp', 'cc.misc.lerp');
    return cc.misc.lerp;
  });
  js.get(cc, 'random0To1', function () {
    cc.errorID(1400, 'cc.random0To1', 'Math.random');
    return Math.random;
  });
  js.get(cc, 'degreesToRadians', function () {
    cc.errorID(1400, 'cc.degreesToRadians', 'cc.misc.degreesToRadians');
    return cc.misc.degreesToRadians;
  });
  js.get(cc, 'radiansToDegrees', function () {
    cc.errorID(1400, 'cc.radiansToDegrees', 'cc.misc.radiansToDegrees');
    return cc.misc.radiansToDegrees;
  });
  js.get(cc, 'clampf', function () {
    cc.errorID(1400, 'cc.clampf', 'cc.misc.clampf');
    return cc.misc.clampf;
  });
  js.get(cc, 'clamp01', function () {
    cc.errorID(1400, 'cc.clamp01', 'cc.misc.clamp01');
    return cc.misc.clamp01;
  });
  js.get(cc, 'ImageFormat', function () {
    cc.errorID(1400, 'cc.ImageFormat', 'cc.macro.ImageFormat');
    return cc.macro.ImageFormat;
  });
  js.get(cc, 'KEY', function () {
    cc.errorID(1400, 'cc.KEY', 'cc.macro.KEY');
    return cc.macro.KEY;
  });
  js.get(cc, 'Easing', function () {
    cc.errorID(1400, 'cc.Easing', 'cc.easing');
    return cc.easing;
  }); // cc.isChildClassOf

  js.get(cc, 'isChildClassOf', function () {
    cc.errorID(1400, 'cc.isChildClassOf', 'cc.js.isChildClassOf');
    return cc.js.isChildClassOf;
  }); // dragon bones

  if (typeof dragonBones !== 'undefined') {
    js.get(dragonBones.CCFactory, 'getFactory', function () {
      cc.errorID(1400, 'dragonBones.CCFactory.getFactory', 'dragonBones.CCFactory.getInstance');
      return dragonBones.CCFactory.getInstance;
    });
  } // renderEngine


  cc.renderer.renderEngine = {
    get gfx() {
      cc.warnID(1400, 'cc.renderer.renderEngine.gfx', 'cc.gfx');
      return cc.gfx;
    },

    get math() {
      cc.warnID(1400, 'cc.renderer.renderEngine.math', 'cc.math');
      return cc.vmath;
    },

    get InputAssembler() {
      cc.warnID(1400, 'cc.renderer.renderEngine.InputAssembler', 'cc.renderer.InputAssembler');
      return cc.renderer.InputAssembler;
    }

  }; // audio

  markAsRemovedInObject(cc.audioEngine, ['getProfile', 'preload', 'setMaxWebAudioSize'], 'cc.audioEngine');
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9kZXByZWNhdGVkLmpzIl0sIm5hbWVzIjpbImpzIiwiY2MiLCJDQ19ERUJVRyIsImRlcHJlY2F0ZUVudW0iLCJvYmoiLCJvbGRQYXRoIiwibmV3UGF0aCIsImhhc1R5cGVQcmVmaXhCZWZvcmUiLCJDQ19TVVBQT1JUX0pJVCIsImVudW1EZWYiLCJGdW5jdGlvbiIsImVudHJpZXMiLCJFbnVtIiwiZ2V0TGlzdCIsImRlbGltaXRlciIsImkiLCJsZW5ndGgiLCJlbnRyeSIsIm5hbWUiLCJvbGRQcm9wTmFtZSIsIm9sZFR5cGVOYW1lIiwic3BsaXQiLCJzbGljZSIsImdldCIsImVycm9ySUQiLCJiaW5kIiwibWFya0FzUmVtb3ZlZCIsIm93bmVyQ3RvciIsInJlbW92ZWRQcm9wcyIsIm93bmVyTmFtZSIsImdldENsYXNzTmFtZSIsImZvckVhY2giLCJwcm9wIiwiZXJyb3IiLCJnZXRzZXQiLCJwcm90b3R5cGUiLCJtYXJrQXNEZXByZWNhdGVkIiwiZGVwcmVjYXRlZFByb3BzIiwiZGVzY3JpcHRvcnMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVwcmVjYXRlZFByb3AiLCJuZXdQcm9wIiwiZGVzY3JpcHRvciIsIndhcm5JRCIsImNhbGwiLCJ2Iiwic2V0IiwibWFya0FzUmVtb3ZlZEluT2JqZWN0Iiwib3duZXJPYmoiLCJwcm92aWRlQ2xlYXJFcnJvciIsIm93bmVyIiwiY2xhc3NOYW1lIiwiSW5mbyIsImRlZmluZSIsImFjY2Vzc29yIiwiQXJyYXkiLCJpc0FycmF5IiwibWFwIiwieCIsInRyaW0iLCJlIiwiZXRQcm9wIiwibWFya0Z1bmN0aW9uV2FybmluZyIsInByb3BOYW1lIiwib3JpZ2luRnVuYyIsIndhcm4iLCJhcHBseSIsImFyZ3VtZW50cyIsImxvZyIsIm1hdGgiLCJWZWMyIiwiVmVjMyIsIlZlYzQiLCJNYXQ0IiwiTWF0MyIsIlF1YXQiLCJTcHJpdGVGcmFtZSIsInRleHR1cmVMb2FkZWQiLCJTcHJpdGUiLCJzZXRTdGF0ZSIsImdldFN0YXRlIiwiVGV4dHVyZTJEIiwiZGVzdHJveSIsIl9nbElEIiwibG9hZGVkIiwic2V0RmlsdGVycyIsIkZpbHRlciIsIkxJTkVBUiIsIk5FQVJFU1QiLCJtYWNybyIsIlBJIiwiUEkyIiwiRkxUX01BWCIsIkZMVF9NSU4iLCJVSU5UX01BWCIsImdhbWUiLCJzeXMiLCJEaXJlY3RvciIsIkVWRU5UX1BST0pFQ1RJT05fQ0hBTkdFRCIsIkVWRU5UX0JFRk9SRV9WSVNJVCIsIkVWRU5UX0FGVEVSX1ZJU0lUIiwiY29udmVydFRvR0wiLCJjb252ZXJ0VG9VSSIsImdldFdpblNpemUiLCJnZXRXaW5TaXplSW5QaXhlbHMiLCJnZXRWaXNpYmxlU2l6ZSIsImdldFZpc2libGVPcmlnaW4iLCJwdXJnZUNhY2hlZERhdGEiLCJzZXREZXB0aFRlc3QiLCJzZXRDbGVhckNvbG9yIiwiZ2V0UnVubmluZ1NjZW5lIiwiZ2V0QW5pbWF0aW9uSW50ZXJ2YWwiLCJzZXRBbmltYXRpb25JbnRlcnZhbCIsImlzRGlzcGxheVN0YXRzIiwic2V0RGlzcGxheVN0YXRzIiwic3RvcEFuaW1hdGlvbiIsInN0YXJ0QW5pbWF0aW9uIiwiU2NoZWR1bGVyIiwic2NoZWR1bGVDYWxsYmFja0ZvclRhcmdldCIsInNjaGVkdWxlVXBkYXRlRm9yVGFyZ2V0IiwidW5zY2hlZHVsZUNhbGxiYWNrRm9yVGFyZ2V0IiwidW5zY2hlZHVsZVVwZGF0ZUZvclRhcmdldCIsInVuc2NoZWR1bGVBbGxDYWxsYmFja3NGb3JUYXJnZXQiLCJ1bnNjaGVkdWxlQWxsQ2FsbGJhY2tzIiwidW5zY2hlZHVsZUFsbENhbGxiYWNrc1dpdGhNaW5Qcmlvcml0eSIsInZpZXciLCJhZGp1c3RWaWV3UG9ydCIsInNldFZpZXdQb3J0SW5Qb2ludHMiLCJnZXRWaWV3UG9ydFJlY3QiLCJQaHlzaWNzTWFuYWdlciIsIkNvbGxpc2lvbk1hbmFnZXIiLCJfQmFzZU5vZGUiLCJOb2RlIiwiZ2V0Tm9kZVRvUGFyZW50VHJhbnNmb3JtIiwiZ2V0Tm9kZVRvUGFyZW50VHJhbnNmb3JtQVIiLCJnZXROb2RlVG9Xb3JsZFRyYW5zZm9ybSIsImdldE5vZGVUb1dvcmxkVHJhbnNmb3JtQVIiLCJnZXRQYXJlbnRUb05vZGVUcmFuc2Zvcm0iLCJnZXRXb3JsZFRvTm9kZVRyYW5zZm9ybSIsImNvbnZlcnRUb3VjaFRvTm9kZVNwYWNlIiwiY29udmVydFRvdWNoVG9Ob2RlU3BhY2VBUiIsImNvbnZlcnRUb1dvcmxkU3BhY2UiLCJjb252ZXJ0VG9Ob2RlU3BhY2UiLCJnZXRSb3RhdGlvblgiLCJzZXRSb3RhdGlvblgiLCJnZXRSb3RhdGlvblkiLCJzZXRSb3RhdGlvblkiLCJnZXRQb3NpdGlvblgiLCJzZXRQb3NpdGlvblgiLCJnZXRQb3NpdGlvblkiLCJzZXRQb3NpdGlvblkiLCJnZXRTa2V3WCIsInNldFNrZXdYIiwiZ2V0U2tld1kiLCJzZXRTa2V3WSIsImdldFNjYWxlWCIsInNldFNjYWxlWCIsImdldFNjYWxlWSIsInNldFNjYWxlWSIsImdldE9wYWNpdHkiLCJzZXRPcGFjaXR5IiwiZ2V0Q29sb3IiLCJzZXRDb2xvciIsImdldExvY2FsWk9yZGVyIiwic2V0TG9jYWxaT3JkZXIiLCJzZXRJbnNldExlZnQiLCJzZXRJbnNldFJpZ2h0Iiwic2V0SW5zZXRUb3AiLCJzZXRJbnNldEJvdHRvbSIsIk1hdGVyaWFsIiwiZ2V0SW5zdGFudGlhdGVkQnVpbHRpbk1hdGVyaWFsIiwiTWF0ZXJpYWxWYXJpYW50IiwiY3JlYXRlV2l0aEJ1aWx0aW4iLCJnZXRJbnN0YW50aWF0ZWRNYXRlcmlhbCIsImNyZWF0ZSIsIlJlbmRlckNvbXBvbmVudCIsIm1hdGVyaWFscyIsIkNhbWVyYSIsImdldE5vZGVUb0NhbWVyYVRyYW5zZm9ybSIsImdldENhbWVyYVRvV29ybGRQb2ludCIsImdldFdvcmxkVG9DYW1lcmFQb2ludCIsImdldENhbWVyYVRvV29ybGRNYXRyaXgiLCJnZXRXb3JsZFRvQ2FtZXJhTWF0cml4IiwiRVJSIiwiQ0NfRURJVE9SIiwiZGVmaW5lUHJvcGVydGllcyIsIlNjZW5lIiwiYWN0aXZlIiwiYWN0aXZlSW5IaWVyYXJjaHkiLCJnZXRDb21wb25lbnQiLCJhZGRDb21wb25lbnQiLCJkeW5hbWljQXRsYXNNYW5hZ2VyIiwiTGlnaHQiLCJhZmZpbmVUcmFuc2Zvcm1NYWtlIiwiYWZmaW5lVHJhbnNmb3JtTWFrZUlkZW50aXR5IiwiYWZmaW5lVHJhbnNmb3JtQ2xvbmUiLCJhZmZpbmVUcmFuc2Zvcm1Db25jYXQiLCJhZmZpbmVUcmFuc2Zvcm1Db25jYXRJbiIsImFmZmluZVRyYW5zZm9ybUludmVydCIsImFmZmluZVRyYW5zZm9ybUludmVydEluIiwiYWZmaW5lVHJhbnNmb3JtSW52ZXJ0T3V0IiwiYWZmaW5lVHJhbnNmb3JtRXF1YWxUb1RyYW5zZm9ybSIsInBvaW50QXBwbHlBZmZpbmVUcmFuc2Zvcm0iLCJzaXplQXBwbHlBZmZpbmVUcmFuc2Zvcm0iLCJyZWN0QXBwbHlBZmZpbmVUcmFuc2Zvcm0iLCJvYmJBcHBseUFmZmluZVRyYW5zZm9ybSIsInBvaW50RXF1YWxUb1BvaW50Iiwic2l6ZUVxdWFsVG9TaXplIiwicmVjdEVxdWFsVG9SZWN0IiwicmVjdENvbnRhaW5zUmVjdCIsInJlY3RDb250YWluc1BvaW50IiwicmVjdE92ZXJsYXBzUmVjdCIsInJlY3RJbnRlcnNlY3RzUmVjdCIsInJlY3RJbnRlcnNlY3Rpb24iLCJyZWN0VW5pb24iLCJyZWN0R2V0TWF4WCIsInJlY3RHZXRNaWRYIiwicmVjdEdldE1pblgiLCJyZWN0R2V0TWF4WSIsInJlY3RHZXRNaWRZIiwicmVjdEdldE1pblkiLCJjb2xvckVxdWFsIiwiaGV4VG9Db2xvciIsImNvbG9yVG9IZXgiLCJUZXh0QWxpZ25tZW50IiwiVmVydGljYWxUZXh0QWxpZ25tZW50IiwicE5lZyIsInBBZGQiLCJwU3ViIiwicE11bHQiLCJwTWlkcG9pbnQiLCJwRG90IiwicENyb3NzIiwicFBlcnAiLCJwUlBlcnAiLCJwUHJvamVjdCIsInBMZW5ndGhTUSIsInBEaXN0YW5jZVNRIiwicExlbmd0aCIsInBEaXN0YW5jZSIsInBOb3JtYWxpemUiLCJwRm9yQW5nbGUiLCJwVG9BbmdsZSIsInBaZXJvSW4iLCJwSW4iLCJwTXVsdEluIiwicFN1YkluIiwicEFkZEluIiwicE5vcm1hbGl6ZUluIiwicFNhbWVBcyIsInBBbmdsZSIsInBBbmdsZVNpZ25lZCIsInBSb3RhdGVCeUFuZ2xlIiwicENvbXBNdWx0IiwicEZ1enp5RXF1YWwiLCJwTGVycCIsInBDbGFtcCIsInJhbmQiLCJyYW5kb21NaW51czFUbzEiLCJjb250YWluZXIiLCJfY2FudmFzIiwiX3JlbmRlclR5cGUiLCJfZ2V0RXJyb3IiLCJfaW5pdERlYnVnU2V0dGluZyIsIkRlYnVnTW9kZSIsInAiLCJSZWN0IiwiY29udGFpbiIsInRyYW5zZm9ybU1hdDQiLCJDb2xvciIsInJnYjJoc3YiLCJoc3YycmdiIiwiZnJvbUhleCIsIm1pc2MiLCJsZXJwIiwiTWF0aCIsInJhbmRvbSIsImRlZ3JlZXNUb1JhZGlhbnMiLCJyYWRpYW5zVG9EZWdyZWVzIiwiY2xhbXBmIiwiY2xhbXAwMSIsIkltYWdlRm9ybWF0IiwiS0VZIiwiZWFzaW5nIiwiaXNDaGlsZENsYXNzT2YiLCJkcmFnb25Cb25lcyIsIkNDRmFjdG9yeSIsImdldEluc3RhbmNlIiwicmVuZGVyZXIiLCJyZW5kZXJFbmdpbmUiLCJnZngiLCJ2bWF0aCIsIklucHV0QXNzZW1ibGVyIiwiYXVkaW9FbmdpbmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlBLEVBQUUsR0FBR0MsRUFBRSxDQUFDRCxFQUFaOztBQUVBLElBQUlFLFFBQUosRUFBYztBQUFBLE1BRURDLGFBRkMsR0FFVixTQUFTQSxhQUFULENBQXdCQyxHQUF4QixFQUE2QkMsT0FBN0IsRUFBc0NDLE9BQXRDLEVBQStDQyxtQkFBL0MsRUFBb0U7QUFDaEUsUUFBSSxDQUFDQyxjQUFMLEVBQXFCO0FBQ2pCO0FBQ0g7O0FBQ0RELElBQUFBLG1CQUFtQixHQUFHQSxtQkFBbUIsS0FBSyxLQUE5QztBQUNBLFFBQUlFLE9BQU8sR0FBR0MsUUFBUSxDQUFDLFlBQVlKLE9BQWIsQ0FBUixFQUFkO0FBQ0EsUUFBSUssT0FBTyxHQUFHVixFQUFFLENBQUNXLElBQUgsQ0FBUUMsT0FBUixDQUFnQkosT0FBaEIsQ0FBZDtBQUNBLFFBQUlLLFNBQVMsR0FBR1AsbUJBQW1CLEdBQUcsR0FBSCxHQUFTLEdBQTVDOztBQUNBLFNBQUssSUFBSVEsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0osT0FBTyxDQUFDSyxNQUE1QixFQUFvQ0QsQ0FBQyxFQUFyQyxFQUF5QztBQUNyQyxVQUFJRSxLQUFLLEdBQUdOLE9BQU8sQ0FBQ0ksQ0FBRCxDQUFQLENBQVdHLElBQXZCO0FBQ0EsVUFBSUMsV0FBSjs7QUFDQSxVQUFJWixtQkFBSixFQUF5QjtBQUNyQixZQUFJYSxXQUFXLEdBQUdmLE9BQU8sQ0FBQ2dCLEtBQVIsQ0FBYyxHQUFkLEVBQW1CQyxLQUFuQixDQUF5QixDQUFDLENBQTFCLEVBQTZCLENBQTdCLENBQWxCO0FBQ0FILFFBQUFBLFdBQVcsR0FBR0MsV0FBVyxHQUFHLEdBQWQsR0FBb0JILEtBQWxDO0FBQ0gsT0FIRCxNQUlLO0FBQ0RFLFFBQUFBLFdBQVcsR0FBR0YsS0FBZDtBQUNIOztBQUNEakIsTUFBQUEsRUFBRSxDQUFDdUIsR0FBSCxDQUFPbkIsR0FBUCxFQUFZZSxXQUFaLEVBQXlCLFVBQVVGLEtBQVYsRUFBaUI7QUFDdENoQixRQUFBQSxFQUFFLENBQUN1QixPQUFILENBQVcsSUFBWCxFQUFpQm5CLE9BQU8sR0FBR1MsU0FBVixHQUFzQkcsS0FBdkMsRUFBOENYLE9BQU8sR0FBRyxHQUFWLEdBQWdCVyxLQUE5RDtBQUNBLGVBQU9SLE9BQU8sQ0FBQ1EsS0FBRCxDQUFkO0FBQ0gsT0FId0IsQ0FHdkJRLElBSHVCLENBR2xCLElBSGtCLEVBR1pSLEtBSFksQ0FBekI7QUFJSDtBQUNKLEdBekJTOztBQUFBLE1BMkJEUyxhQTNCQyxHQTJCVixTQUFTQSxhQUFULENBQXdCQyxTQUF4QixFQUFtQ0MsWUFBbkMsRUFBaURDLFNBQWpELEVBQTREO0FBQ3hELFFBQUksQ0FBQ0YsU0FBTCxFQUFnQjtBQUNaO0FBQ0E7QUFDSDs7QUFDREUsSUFBQUEsU0FBUyxHQUFHQSxTQUFTLElBQUk3QixFQUFFLENBQUM4QixZQUFILENBQWdCSCxTQUFoQixDQUF6QjtBQUNBQyxJQUFBQSxZQUFZLENBQUNHLE9BQWIsQ0FBcUIsVUFBVUMsSUFBVixFQUFnQjtBQUNqQyxlQUFTQyxLQUFULEdBQWtCO0FBQ2RoQyxRQUFBQSxFQUFFLENBQUN1QixPQUFILENBQVcsSUFBWCxFQUFpQkssU0FBakIsRUFBNEJHLElBQTVCO0FBQ0g7O0FBQ0RoQyxNQUFBQSxFQUFFLENBQUNrQyxNQUFILENBQVVQLFNBQVMsQ0FBQ1EsU0FBcEIsRUFBK0JILElBQS9CLEVBQXFDQyxLQUFyQyxFQUE0Q0EsS0FBNUM7QUFDSCxLQUxEO0FBTUgsR0F2Q1M7O0FBQUEsTUF5Q0RHLGdCQXpDQyxHQXlDVixTQUFTQSxnQkFBVCxDQUEyQlQsU0FBM0IsRUFBc0NVLGVBQXRDLEVBQXVEUixTQUF2RCxFQUFrRTtBQUM5RCxRQUFJLENBQUNGLFNBQUwsRUFBZ0I7QUFDWjtBQUNIOztBQUNERSxJQUFBQSxTQUFTLEdBQUdBLFNBQVMsSUFBSTdCLEVBQUUsQ0FBQzhCLFlBQUgsQ0FBZ0JILFNBQWhCLENBQXpCO0FBQ0EsUUFBSVcsV0FBVyxHQUFHQyxNQUFNLENBQUNDLHlCQUFQLENBQWlDYixTQUFTLENBQUNRLFNBQTNDLENBQWxCO0FBQ0FFLElBQUFBLGVBQWUsQ0FBQ04sT0FBaEIsQ0FBd0IsVUFBVUMsSUFBVixFQUFnQjtBQUNwQyxVQUFJUyxjQUFjLEdBQUdULElBQUksQ0FBQyxDQUFELENBQXpCO0FBQ0EsVUFBSVUsT0FBTyxHQUFHVixJQUFJLENBQUMsQ0FBRCxDQUFsQjtBQUNBLFVBQUlXLFVBQVUsR0FBR0wsV0FBVyxDQUFDRyxjQUFELENBQTVCO0FBQ0F6QyxNQUFBQSxFQUFFLENBQUNrQyxNQUFILENBQVVQLFNBQVMsQ0FBQ1EsU0FBcEIsRUFBK0JNLGNBQS9CLEVBQStDLFlBQVk7QUFDdkR4QyxRQUFBQSxFQUFFLENBQUMyQyxNQUFILENBQVUsSUFBVixFQUFtQmYsU0FBbkIsU0FBZ0NZLGNBQWhDLEVBQXFEWixTQUFyRCxTQUFrRWEsT0FBbEU7QUFDQSxlQUFPQyxVQUFVLENBQUNwQixHQUFYLENBQWVzQixJQUFmLENBQW9CLElBQXBCLENBQVA7QUFDSCxPQUhELEVBR0csVUFBVUMsQ0FBVixFQUFhO0FBQ1o3QyxRQUFBQSxFQUFFLENBQUMyQyxNQUFILENBQVUsSUFBVixFQUFtQmYsU0FBbkIsU0FBZ0NZLGNBQWhDLEVBQXFEWixTQUFyRCxTQUFrRWEsT0FBbEU7QUFDQUMsUUFBQUEsVUFBVSxDQUFDSSxHQUFYLENBQWVGLElBQWYsQ0FBb0IsSUFBcEIsRUFBMEJDLENBQTFCO0FBQ0gsT0FORDtBQU9ILEtBWEQ7QUFZSCxHQTNEUzs7QUFBQSxNQTZEREUscUJBN0RDLEdBNkRWLFNBQVNBLHFCQUFULENBQWdDQyxRQUFoQyxFQUEwQ3JCLFlBQTFDLEVBQXdEQyxTQUF4RCxFQUFtRTtBQUMvRCxRQUFJLENBQUNvQixRQUFMLEVBQWU7QUFDWDtBQUNBO0FBQ0g7O0FBQ0RyQixJQUFBQSxZQUFZLENBQUNHLE9BQWIsQ0FBcUIsVUFBVUMsSUFBVixFQUFnQjtBQUNqQyxlQUFTQyxLQUFULEdBQWtCO0FBQ2RoQyxRQUFBQSxFQUFFLENBQUN1QixPQUFILENBQVcsSUFBWCxFQUFpQkssU0FBakIsRUFBNEJHLElBQTVCO0FBQ0g7O0FBQ0RoQyxNQUFBQSxFQUFFLENBQUNrQyxNQUFILENBQVVlLFFBQVYsRUFBb0JqQixJQUFwQixFQUEwQkMsS0FBMUI7QUFDSCxLQUxEO0FBTUgsR0F4RVM7O0FBQUEsTUEwRURpQixpQkExRUMsR0EwRVYsU0FBU0EsaUJBQVQsQ0FBNEJDLEtBQTVCLEVBQW1DL0MsR0FBbkMsRUFBd0N5QixTQUF4QyxFQUFtRDtBQUMvQyxRQUFJLENBQUNzQixLQUFMLEVBQVk7QUFDUjtBQUNBO0FBQ0g7O0FBQ0QsUUFBSUMsU0FBUyxHQUFHdkIsU0FBUyxJQUFJNUIsRUFBRSxDQUFDRCxFQUFILENBQU04QixZQUFOLENBQW1CcUIsS0FBbkIsQ0FBN0I7QUFDQSxRQUFJRSxJQUFJLEdBQUcsWUFBWUQsU0FBWixHQUF3Qix3Q0FBbkM7O0FBTitDO0FBUTNDLGVBQVNFLE1BQVQsQ0FBaUJ0QixJQUFqQixFQUF1QkUsTUFBdkIsRUFBK0I7QUFDM0IsaUJBQVNxQixRQUFULENBQW1CYixPQUFuQixFQUE0QjtBQUN4QnpDLFVBQUFBLEVBQUUsQ0FBQ2dDLEtBQUgsQ0FBU29CLElBQVQsRUFBZXJCLElBQWYsRUFBcUJVLE9BQXJCO0FBQ0g7O0FBQ0QsWUFBSSxDQUFDYyxLQUFLLENBQUNDLE9BQU4sQ0FBY3ZCLE1BQWQsQ0FBTCxFQUE0QjtBQUN4QkEsVUFBQUEsTUFBTSxHQUFHQSxNQUFNLENBQUNiLEtBQVAsQ0FBYSxHQUFiLEVBQ0pxQyxHQURJLENBQ0EsVUFBVUMsQ0FBVixFQUFhO0FBQ2QsbUJBQU9BLENBQUMsQ0FBQ0MsSUFBRixFQUFQO0FBQ0gsV0FISSxDQUFUO0FBSUg7O0FBQ0QsWUFBSTtBQUNBNUQsVUFBQUEsRUFBRSxDQUFDa0MsTUFBSCxDQUFVaUIsS0FBVixFQUFpQm5CLElBQWpCLEVBQXVCdUIsUUFBUSxDQUFDOUIsSUFBVCxDQUFjLElBQWQsRUFBb0JTLE1BQU0sQ0FBQyxDQUFELENBQTFCLENBQXZCLEVBQXVEQSxNQUFNLENBQUMsQ0FBRCxDQUFOLElBQWFxQixRQUFRLENBQUM5QixJQUFULENBQWMsSUFBZCxFQUFvQlMsTUFBTSxDQUFDLENBQUQsQ0FBMUIsQ0FBcEU7QUFDSCxTQUZELENBR0EsT0FBTzJCLENBQVAsRUFBVSxDQUFFO0FBQ2Y7O0FBQ0czQixNQUFBQSxNQUFNLEdBQUc5QixHQUFHLENBQUM0QixJQUFELENBdkIyQjs7QUF3QjNDLFVBQUlBLElBQUksQ0FBQyxDQUFELENBQUosS0FBWSxHQUFoQixFQUFxQjtBQUNqQjtBQUNJOEIsUUFBQUEsTUFBTSxHQUFHOUIsSUFBSSxDQUFDVixLQUFMLENBQVcsQ0FBWCxDQUZJO0FBR2pCZ0MsUUFBQUEsTUFBTSxDQUFDLE1BQU1RLE1BQVAsRUFBZTVCLE1BQWYsQ0FBTjtBQUNBb0IsUUFBQUEsTUFBTSxDQUFDLE1BQU1RLE1BQVAsRUFBZTVCLE1BQWYsQ0FBTjtBQUNILE9BTEQsTUFNSztBQUNERixRQUFBQSxJQUFJLENBQUNYLEtBQUwsQ0FBVyxHQUFYLEVBQ0txQyxHQURMLENBQ1MsVUFBVUMsQ0FBVixFQUFhO0FBQ2QsaUJBQU9BLENBQUMsQ0FBQ0MsSUFBRixFQUFQO0FBQ0gsU0FITCxFQUlLN0IsT0FKTCxDQUlhLFVBQVU0QixDQUFWLEVBQWE7QUFDbEJMLFVBQUFBLE1BQU0sQ0FBQ0ssQ0FBRCxFQUFJekIsTUFBSixDQUFOO0FBQ0gsU0FOTDtBQU9IO0FBdEMwQzs7QUFPL0MsU0FBSyxJQUFJRixJQUFULElBQWlCNUIsR0FBakIsRUFBc0I7QUFBQSxVQWdCZDhCLE1BaEJjO0FBQUEsVUFtQlY0QixNQW5CVTs7QUFBQTtBQWdDckI7QUFDSixHQWxIUzs7QUFBQSxNQW9IREMsbUJBcEhDLEdBb0hWLFNBQVNBLG1CQUFULENBQThCcEMsU0FBOUIsRUFBeUN2QixHQUF6QyxFQUE4Q3lCLFNBQTlDLEVBQXlEO0FBQ3JELFFBQUksQ0FBQ0YsU0FBTCxFQUFnQjtBQUNaO0FBQ0E7QUFDSDs7QUFDREUsSUFBQUEsU0FBUyxHQUFHQSxTQUFTLElBQUk3QixFQUFFLENBQUM4QixZQUFILENBQWdCSCxTQUFoQixDQUF6Qjs7QUFDQSxTQUFLLElBQUlLLElBQVQsSUFBaUI1QixHQUFqQixFQUFzQjtBQUNsQixPQUFDLFlBQVU7QUFDUCxZQUFJNEQsUUFBUSxHQUFHaEMsSUFBZjtBQUNBLFlBQUlpQyxVQUFVLEdBQUd0QyxTQUFTLENBQUNxQyxRQUFELENBQTFCO0FBQ0EsWUFBSSxDQUFDQyxVQUFMLEVBQWlCOztBQUVqQixpQkFBU0MsSUFBVCxHQUFpQjtBQUNiakUsVUFBQUEsRUFBRSxDQUFDaUUsSUFBSCxDQUFRLG1EQUFSLEVBQTZEckMsU0FBN0QsRUFBd0VtQyxRQUF4RSxFQUFrRjVELEdBQUcsQ0FBQzRELFFBQUQsQ0FBckY7QUFDQSxpQkFBT0MsVUFBVSxDQUFDRSxLQUFYLENBQWlCLElBQWpCLEVBQXVCQyxTQUF2QixDQUFQO0FBQ0g7O0FBRUR6QyxRQUFBQSxTQUFTLENBQUNxQyxRQUFELENBQVQsR0FBc0JFLElBQXRCO0FBQ0gsT0FYRDtBQVlIO0FBQ0osR0F4SVMsRUF5SVY7OztBQUNBbEUsRUFBQUEsRUFBRSxDQUFDdUIsR0FBSCxDQUFPdEIsRUFBUCxFQUFXLE1BQVgsRUFBbUIsWUFBWTtBQUMzQkEsSUFBQUEsRUFBRSxDQUFDdUIsT0FBSCxDQUFXLElBQVgsRUFBaUIsU0FBakIsRUFBNEIsUUFBNUI7QUFDQSxXQUFPdkIsRUFBRSxDQUFDb0UsR0FBVjtBQUNILEdBSEQsRUExSVUsQ0E4SVY7O0FBQ0FyRSxFQUFBQSxFQUFFLENBQUN1QixHQUFILENBQU90QixFQUFQLEVBQVcsa0JBQVgsRUFBK0IsWUFBWTtBQUN2Q0EsSUFBQUEsRUFBRSxDQUFDdUIsT0FBSCxDQUFXLElBQVg7QUFDSCxHQUZELEVBL0lVLENBbUpWOztBQUNBeEIsRUFBQUEsRUFBRSxDQUFDdUIsR0FBSCxDQUFPdEIsRUFBUCxFQUFXLE9BQVgsRUFBb0IsWUFBWTtBQUM1QkEsSUFBQUEsRUFBRSxDQUFDMkMsTUFBSCxDQUFVLElBQVYsRUFBZ0IsVUFBaEIsRUFBNEIsU0FBNUI7QUFDQSxXQUFPM0MsRUFBRSxDQUFDcUUsSUFBVjtBQUNILEdBSEQ7QUFJQXRFLEVBQUFBLEVBQUUsQ0FBQ3VCLEdBQUgsQ0FBT3RCLEVBQUUsQ0FBQ3FFLElBQVYsRUFBZ0IsTUFBaEIsRUFBd0IsWUFBWTtBQUNoQ3JFLElBQUFBLEVBQUUsQ0FBQzJDLE1BQUgsQ0FBVSxJQUFWLEVBQWdCLGVBQWhCLEVBQWlDLFNBQWpDO0FBQ0EsV0FBTzNDLEVBQUUsQ0FBQ3NFLElBQVY7QUFDSCxHQUhEO0FBSUF2RSxFQUFBQSxFQUFFLENBQUN1QixHQUFILENBQU90QixFQUFFLENBQUNxRSxJQUFWLEVBQWdCLE1BQWhCLEVBQXdCLFlBQVk7QUFDaENyRSxJQUFBQSxFQUFFLENBQUMyQyxNQUFILENBQVUsSUFBVixFQUFnQixlQUFoQixFQUFpQyxTQUFqQztBQUNBLFdBQU8zQyxFQUFFLENBQUN1RSxJQUFWO0FBQ0gsR0FIRDtBQUlBeEUsRUFBQUEsRUFBRSxDQUFDdUIsR0FBSCxDQUFPdEIsRUFBRSxDQUFDcUUsSUFBVixFQUFnQixNQUFoQixFQUF3QixZQUFZO0FBQ2hDckUsSUFBQUEsRUFBRSxDQUFDMkMsTUFBSCxDQUFVLElBQVYsRUFBZ0IsZUFBaEIsRUFBaUMsU0FBakM7QUFDQSxXQUFPM0MsRUFBRSxDQUFDd0UsSUFBVjtBQUNILEdBSEQ7QUFJQXpFLEVBQUFBLEVBQUUsQ0FBQ3VCLEdBQUgsQ0FBT3RCLEVBQUUsQ0FBQ3FFLElBQVYsRUFBZ0IsTUFBaEIsRUFBd0IsWUFBWTtBQUNoQ3JFLElBQUFBLEVBQUUsQ0FBQzJDLE1BQUgsQ0FBVSxJQUFWLEVBQWdCLGVBQWhCLEVBQWlDLFNBQWpDO0FBQ0EsV0FBTzNDLEVBQUUsQ0FBQ3lFLElBQVY7QUFDSCxHQUhEO0FBSUExRSxFQUFBQSxFQUFFLENBQUN1QixHQUFILENBQU90QixFQUFFLENBQUNxRSxJQUFWLEVBQWdCLE1BQWhCLEVBQXdCLFlBQVk7QUFDaENyRSxJQUFBQSxFQUFFLENBQUMyQyxNQUFILENBQVUsSUFBVixFQUFnQixlQUFoQixFQUFpQyxTQUFqQztBQUNBLFdBQU8zQyxFQUFFLENBQUMwRSxJQUFWO0FBQ0gsR0FIRDtBQUlBM0UsRUFBQUEsRUFBRSxDQUFDdUIsR0FBSCxDQUFPdEIsRUFBRSxDQUFDcUUsSUFBVixFQUFnQixNQUFoQixFQUF3QixZQUFZO0FBQ2hDckUsSUFBQUEsRUFBRSxDQUFDMkMsTUFBSCxDQUFVLElBQVYsRUFBZ0IsZUFBaEIsRUFBaUMsU0FBakM7QUFDQSxXQUFPM0MsRUFBRSxDQUFDMkUsSUFBVjtBQUNILEdBSEQsRUE1S1UsQ0FpTFY7O0FBQ0E1RSxFQUFBQSxFQUFFLENBQUN1QixHQUFILENBQU90QixFQUFFLENBQUM0RSxXQUFILENBQWUxQyxTQUF0QixFQUFpQyxnQkFBakMsRUFBbUQsWUFBWTtBQUMzRGxDLElBQUFBLEVBQUUsQ0FBQ3VCLE9BQUgsQ0FBVyxJQUFYLEVBQWlCLDRCQUFqQixFQUErQyw2QkFBL0M7QUFDQSxXQUFPLEtBQUtzRCxhQUFMLEVBQVA7QUFDSCxHQUhEO0FBSUFwRCxFQUFBQSxhQUFhLENBQUN6QixFQUFFLENBQUM0RSxXQUFKLEVBQWlCLENBQzFCLHdCQUQwQixDQUFqQixDQUFiO0FBR0FkLEVBQUFBLG1CQUFtQixDQUFDOUQsRUFBRSxDQUFDOEUsTUFBSCxDQUFVNUMsU0FBWCxFQUFzQjtBQUNyQzZDLElBQUFBLFFBQVEsRUFBRSx1QkFEMkI7QUFFckNDLElBQUFBLFFBQVEsRUFBRTtBQUYyQixHQUF0QixFQUdoQixXQUhnQixDQUFuQjtBQUtBakYsRUFBQUEsRUFBRSxDQUFDdUIsR0FBSCxDQUFPdEIsRUFBRSxDQUFDNEUsV0FBSCxDQUFlMUMsU0FBdEIsRUFBaUMsY0FBakMsRUFBaUQsWUFBWTtBQUN6RGxDLElBQUFBLEVBQUUsQ0FBQ3VCLE9BQUgsQ0FBVyxJQUFYLEVBQWlCLGdCQUFqQixFQUFtQyxjQUFuQztBQUNBLFdBQU8sWUFBWSxDQUFFLENBQXJCO0FBQ0gsR0FIRCxFQTlMVSxDQW1NVjs7QUFDQXhCLEVBQUFBLEVBQUUsQ0FBQ3VCLEdBQUgsQ0FBT3RCLEVBQVAsRUFBVyxjQUFYLEVBQTJCLFlBQVk7QUFDbkNBLElBQUFBLEVBQUUsQ0FBQ3VCLE9BQUgsQ0FBVyxJQUFYLEVBQWlCLElBQWpCLEVBQXVCLGNBQXZCO0FBQ0gsR0FGRCxFQXBNVSxDQXdNVjs7QUFDQSxNQUFJMEQsU0FBUyxHQUFHakYsRUFBRSxDQUFDaUYsU0FBbkI7QUFDQWxGLEVBQUFBLEVBQUUsQ0FBQ3VCLEdBQUgsQ0FBTzJELFNBQVMsQ0FBQy9DLFNBQWpCLEVBQTRCLGdCQUE1QixFQUE4QyxZQUFZO0FBQ3REbEMsSUFBQUEsRUFBRSxDQUFDdUIsT0FBSCxDQUFXLElBQVgsRUFBaUIsMEJBQWpCLEVBQTZDLG1CQUE3QztBQUNBLFdBQU8sS0FBSzJELE9BQVo7QUFDSCxHQUhEO0FBS0FuRixFQUFBQSxFQUFFLENBQUN1QixHQUFILENBQU8yRCxTQUFTLENBQUMvQyxTQUFqQixFQUE0QixTQUE1QixFQUF1QyxZQUFZO0FBQy9DbEMsSUFBQUEsRUFBRSxDQUFDdUIsT0FBSCxDQUFXLElBQVgsRUFBaUIsbUJBQWpCLEVBQXNDLGVBQXRDO0FBQ0EsV0FBTyxZQUFZO0FBQ2YsYUFBTyxLQUFLNEQsS0FBTCxJQUFjLElBQXJCO0FBQ0gsS0FGRDtBQUdILEdBTEQ7QUFPQXBGLEVBQUFBLEVBQUUsQ0FBQ3VCLEdBQUgsQ0FBTzJELFNBQVMsQ0FBQy9DLFNBQWpCLEVBQTRCLFVBQTVCLEVBQXdDLFlBQVk7QUFDaERsQyxJQUFBQSxFQUFFLENBQUN1QixPQUFILENBQVcsSUFBWCxFQUFpQiwyQkFBakIsRUFBOEMseUJBQTlDO0FBQ0EsV0FBUSxZQUFZO0FBQ2hCLGFBQU8sS0FBSzZELE1BQVo7QUFDSCxLQUZEO0FBR0gsR0FMRDtBQU9BckYsRUFBQUEsRUFBRSxDQUFDdUIsR0FBSCxDQUFPMkQsU0FBUyxDQUFDL0MsU0FBakIsRUFBNEIsMkJBQTVCLEVBQXlELFlBQVk7QUFDakVsQyxJQUFBQSxFQUFFLENBQUN1QixPQUFILENBQVcsSUFBWCxFQUFpQixxQ0FBakIsRUFBd0QsNEVBQXhEO0FBQ0EsV0FBTyxZQUFZO0FBQ2YsV0FBSzhELFVBQUwsQ0FBZ0JKLFNBQVMsQ0FBQ0ssTUFBVixDQUFpQkMsTUFBakMsRUFBeUNOLFNBQVMsQ0FBQ0ssTUFBVixDQUFpQkMsTUFBMUQ7QUFDSCxLQUZEO0FBR0gsR0FMRDtBQU9BeEYsRUFBQUEsRUFBRSxDQUFDdUIsR0FBSCxDQUFPMkQsU0FBUyxDQUFDL0MsU0FBakIsRUFBNEIsdUJBQTVCLEVBQXFELFlBQVk7QUFDN0RsQyxJQUFBQSxFQUFFLENBQUN1QixPQUFILENBQVcsSUFBWCxFQUFpQixxQ0FBakIsRUFBd0QsOEVBQXhEO0FBQ0EsV0FBTyxZQUFZO0FBQ2YsV0FBSzhELFVBQUwsQ0FBZ0JKLFNBQVMsQ0FBQ0ssTUFBVixDQUFpQkUsT0FBakMsRUFBMENQLFNBQVMsQ0FBQ0ssTUFBVixDQUFpQkUsT0FBM0Q7QUFDSCxLQUZEO0FBR0gsR0FMRCxFQXBPVSxDQTJPVjs7QUFDQXpDLEVBQUFBLHFCQUFxQixDQUFDL0MsRUFBRSxDQUFDeUYsS0FBSixFQUFXLENBQzVCLHVCQUQ0QixFQUU1QixrQ0FGNEIsQ0FBWCxFQUdsQixVQUhrQixDQUFyQjtBQUtBeEMsRUFBQUEsaUJBQWlCLENBQUNqRCxFQUFFLENBQUN5RixLQUFKLEVBQVc7QUFDeEJDLElBQUFBLEVBQUUsRUFBRSxTQURvQjtBQUV4QkMsSUFBQUEsR0FBRyxFQUFFLGFBRm1CO0FBR3hCQyxJQUFBQSxPQUFPLEVBQUUsa0JBSGU7QUFJeEJDLElBQUFBLE9BQU8sRUFBRSxrQkFKZTtBQUt4QkMsSUFBQUEsUUFBUSxFQUFFO0FBTGMsR0FBWCxFQU1kLFVBTmMsQ0FBakIsQ0FqUFUsQ0F5UFY7O0FBQ0EvQyxFQUFBQSxxQkFBcUIsQ0FBQy9DLEVBQUUsQ0FBQytGLElBQUosRUFBVSxDQUMzQixZQUQyQixDQUFWLEVBRWxCLFNBRmtCLENBQXJCLENBMVBVLENBOFBWOztBQUNBaEQsRUFBQUEscUJBQXFCLENBQUMvQyxFQUFFLENBQUNnRyxHQUFKLEVBQVMsQ0FDMUIsVUFEMEIsRUFFMUIsYUFGMEIsRUFHMUIsMEJBSDBCLEVBSTFCLDhCQUowQixFQUsxQix5QkFMMEIsRUFNMUIsNkJBTjBCLEVBTzFCLDBCQVAwQixFQVExQiwwQkFSMEIsQ0FBVCxFQVNsQixRQVRrQixDQUFyQixDQS9QVSxDQTBRVjs7QUFDQS9DLEVBQUFBLGlCQUFpQixDQUFDakQsRUFBRSxDQUFDaUcsUUFBSixFQUFjO0FBQzNCQyxJQUFBQSx3QkFBd0IsRUFBRSxFQURDO0FBRTNCQyxJQUFBQSxrQkFBa0IsRUFBRSxvQkFGTztBQUczQkMsSUFBQUEsaUJBQWlCLEVBQUU7QUFIUSxHQUFkLEVBSWQsYUFKYyxDQUFqQjtBQUtBdEMsRUFBQUEsbUJBQW1CLENBQUM5RCxFQUFFLENBQUNpRyxRQUFILENBQVkvRCxTQUFiLEVBQXdCO0FBQ3ZDbUUsSUFBQUEsV0FBVyxFQUFFLGlDQUQwQjtBQUV2Q0MsSUFBQUEsV0FBVyxFQUFFLEVBRjBCO0FBR3ZDQyxJQUFBQSxVQUFVLEVBQUUsWUFIMkI7QUFJdkNDLElBQUFBLGtCQUFrQixFQUFFLFlBSm1CO0FBS3ZDQyxJQUFBQSxjQUFjLEVBQUUsd0JBTHVCO0FBTXZDQyxJQUFBQSxnQkFBZ0IsRUFBRSwwQkFOcUI7QUFPdkNDLElBQUFBLGVBQWUsRUFBRSw0QkFQc0I7QUFRdkNDLElBQUFBLFlBQVksRUFBRSxzQkFSeUI7QUFTdkNDLElBQUFBLGFBQWEsRUFBRSxnQ0FUd0I7QUFVdkNDLElBQUFBLGVBQWUsRUFBRSxzQkFWc0I7QUFXdkNDLElBQUFBLG9CQUFvQixFQUFFLHNCQVhpQjtBQVl2Q0MsSUFBQUEsb0JBQW9CLEVBQUUsc0JBWmlCO0FBYXZDQyxJQUFBQSxjQUFjLEVBQUUseUJBYnVCO0FBY3ZDQyxJQUFBQSxlQUFlLEVBQUUsMEJBZHNCO0FBZXZDQyxJQUFBQSxhQUFhLEVBQUUsZUFmd0I7QUFnQnZDQyxJQUFBQSxjQUFjLEVBQUU7QUFoQnVCLEdBQXhCLEVBaUJoQixhQWpCZ0IsQ0FBbkI7QUFrQkEzRixFQUFBQSxhQUFhLENBQUN6QixFQUFFLENBQUNpRyxRQUFKLEVBQWMsQ0FDdkIsV0FEdUIsRUFFdkIsVUFGdUIsRUFHdkIsZ0JBSHVCLEVBSXZCLHNCQUp1QixFQUt2QixlQUx1QixFQU12QixlQU51QixDQUFkLEVBT1YsYUFQVSxDQUFiLENBbFNVLENBMlNWOztBQUNBaEQsRUFBQUEsaUJBQWlCLENBQUNqRCxFQUFFLENBQUNxSCxTQUFKLEVBQWU7QUFDNUJDLElBQUFBLHlCQUF5QixFQUFFLFVBREM7QUFFNUJDLElBQUFBLHVCQUF1QixFQUFFLGdCQUZHO0FBRzVCQyxJQUFBQSwyQkFBMkIsRUFBRSxZQUhEO0FBSTVCQyxJQUFBQSx5QkFBeUIsRUFBRSxrQkFKQztBQUs1QkMsSUFBQUEsK0JBQStCLEVBQUUsd0JBTEw7QUFNNUJDLElBQUFBLHNCQUFzQixFQUFFLGVBTkk7QUFPNUJDLElBQUFBLHFDQUFxQyxFQUFFO0FBUFgsR0FBZixFQVFkLGNBUmMsQ0FBakIsQ0E1U1UsQ0FzVFY7O0FBQ0EzRSxFQUFBQSxpQkFBaUIsQ0FBQ2pELEVBQUUsQ0FBQzZILElBQUosRUFBVTtBQUN2QkMsSUFBQUEsY0FBYyxFQUFFLG9CQURPO0FBRXZCQyxJQUFBQSxtQkFBbUIsRUFBRSxxQkFGRTtBQUd2QkMsSUFBQUEsZUFBZSxFQUFFO0FBSE0sR0FBVixFQUlkLFNBSmMsQ0FBakI7QUFLQWpGLEVBQUFBLHFCQUFxQixDQUFDL0MsRUFBRSxDQUFDNkgsSUFBSixFQUFVLENBQzNCLGFBRDJCLEVBRTNCLHFCQUYyQixFQUczQixxQkFIMkIsRUFJM0Isb0JBSjJCLEVBSzNCLDBCQUwyQixFQU0zQiw0QkFOMkIsRUFPM0IsNEJBUDJCLEVBUTNCLGFBUjJCLEVBUzNCLGFBVDJCLENBQVYsRUFVbEIsU0FWa0IsQ0FBckIsQ0E1VFUsQ0F3VVY7O0FBQ0FwRyxFQUFBQSxhQUFhLENBQUN6QixFQUFFLENBQUNpSSxjQUFKLEVBQW9CLENBQzdCLHlCQUQ2QixFQUU3QiwyQkFGNkIsQ0FBcEIsQ0FBYixDQXpVVSxDQThVVjs7QUFDQXhHLEVBQUFBLGFBQWEsQ0FBQ3pCLEVBQUUsQ0FBQ2tJLGdCQUFKLEVBQXNCLENBQy9CLHlCQUQrQixFQUUvQiwyQkFGK0IsQ0FBdEIsQ0FBYixDQS9VVSxDQW9WVjs7QUFDQWpGLEVBQUFBLGlCQUFpQixDQUFDakQsRUFBRSxDQUFDbUksU0FBSCxDQUFhakcsU0FBZCxFQUF5QjtBQUN0QyxXQUFPLE1BRCtCO0FBRXRDLGNBQVUsTUFGNEI7QUFHdEMsY0FBVSxNQUg0QjtBQUl0QyxxQkFBaUIsZ0JBSnFCO0FBS3RDLHdCQUFvQjtBQUxrQixHQUF6QixDQUFqQjtBQVFBVCxFQUFBQSxhQUFhLENBQUN6QixFQUFFLENBQUNvSSxJQUFKLEVBQVUsQ0FDbkIsc0JBRG1CLEVBRW5CLGNBRm1CLEVBR25CLHVCQUhtQixFQUluQix3QkFKbUIsRUFLbkIsd0JBTG1CLEVBTW5CLGdCQU5tQixFQU9uQix5QkFQbUIsRUFRbkIsMEJBUm1CLEVBU25CLGtCQVRtQixFQVVuQixvQkFWbUIsRUFXbkIscUJBWG1CLEVBWW5CLGNBWm1CLEVBYW5CLGdDQWJtQixFQWNuQiw4QkFkbUIsRUFlbkIsV0FmbUIsRUFnQm5CLFNBaEJtQixDQUFWLENBQWI7QUFtQkF0RSxFQUFBQSxtQkFBbUIsQ0FBQzlELEVBQUUsQ0FBQ29JLElBQUgsQ0FBUWxHLFNBQVQsRUFBb0I7QUFDbkNtRyxJQUFBQSx3QkFBd0IsRUFBRSxnQkFEUztBQUVuQ0MsSUFBQUEsMEJBQTBCLEVBQUUsZ0JBRk87QUFHbkNDLElBQUFBLHVCQUF1QixFQUFFLGdCQUhVO0FBSW5DQyxJQUFBQSx5QkFBeUIsRUFBRSxnQkFKUTtBQUtuQ0MsSUFBQUEsd0JBQXdCLEVBQUUsZ0JBTFM7QUFNbkNDLElBQUFBLHVCQUF1QixFQUFFLGdCQU5VO0FBT25DQyxJQUFBQSx1QkFBdUIsRUFBRSxzQkFQVTtBQVFuQ0MsSUFBQUEseUJBQXlCLEVBQUUsc0JBUlE7QUFTbkNDLElBQUFBLG1CQUFtQixFQUFFLHVCQVRjO0FBVW5DQyxJQUFBQSxrQkFBa0IsRUFBRTtBQVZlLEdBQXBCLENBQW5CO0FBYUE3RixFQUFBQSxpQkFBaUIsQ0FBQ2pELEVBQUUsQ0FBQ29JLElBQUgsQ0FBUWxHLFNBQVQsRUFBb0I7QUFDakM2RyxJQUFBQSxZQUFZLEVBQUUsV0FEbUI7QUFFakNDLElBQUFBLFlBQVksRUFBRSxXQUZtQjtBQUdqQ0MsSUFBQUEsWUFBWSxFQUFFLFdBSG1CO0FBSWpDQyxJQUFBQSxZQUFZLEVBQUUsV0FKbUI7QUFLakNDLElBQUFBLFlBQVksRUFBRSxHQUxtQjtBQU1qQ0MsSUFBQUEsWUFBWSxFQUFFLEdBTm1CO0FBT2pDQyxJQUFBQSxZQUFZLEVBQUUsR0FQbUI7QUFRakNDLElBQUFBLFlBQVksRUFBRSxHQVJtQjtBQVNqQ0MsSUFBQUEsUUFBUSxFQUFFLE9BVHVCO0FBVWpDQyxJQUFBQSxRQUFRLEVBQUUsT0FWdUI7QUFXakNDLElBQUFBLFFBQVEsRUFBRSxPQVh1QjtBQVlqQ0MsSUFBQUEsUUFBUSxFQUFFLE9BWnVCO0FBYWpDQyxJQUFBQSxTQUFTLEVBQUUsUUFic0I7QUFjakNDLElBQUFBLFNBQVMsRUFBRSxRQWRzQjtBQWVqQ0MsSUFBQUEsU0FBUyxFQUFFLFFBZnNCO0FBZ0JqQ0MsSUFBQUEsU0FBUyxFQUFFLFFBaEJzQjtBQWlCakNDLElBQUFBLFVBQVUsRUFBRSxTQWpCcUI7QUFrQmpDQyxJQUFBQSxVQUFVLEVBQUUsU0FsQnFCO0FBbUJqQ0MsSUFBQUEsUUFBUSxFQUFFLE9BbkJ1QjtBQW9CakNDLElBQUFBLFFBQVEsRUFBRSxPQXBCdUI7QUFxQmpDQyxJQUFBQSxjQUFjLEVBQUUsUUFyQmlCO0FBc0JqQ0MsSUFBQUEsY0FBYyxFQUFFO0FBdEJpQixHQUFwQixDQUFqQjtBQXlCQW5ILEVBQUFBLGlCQUFpQixDQUFDakQsRUFBRSxDQUFDOEUsTUFBSCxDQUFVNUMsU0FBWCxFQUFzQjtBQUNuQ21JLElBQUFBLFlBQVksRUFBRSwwQkFEcUI7QUFFbkNDLElBQUFBLGFBQWEsRUFBRSwyQkFGb0I7QUFHbkNDLElBQUFBLFdBQVcsRUFBRSx5QkFIc0I7QUFJbkNDLElBQUFBLGNBQWMsRUFBRTtBQUptQixHQUF0QixDQUFqQixDQXRaVSxDQTZaVjs7QUFDQXhLLEVBQUFBLEVBQUUsQ0FBQ3lLLFFBQUgsQ0FBWUMsOEJBQVosR0FBNkMxSyxFQUFFLENBQUMySyxlQUFILENBQW1CQyxpQkFBaEU7QUFDQTVLLEVBQUFBLEVBQUUsQ0FBQ3lLLFFBQUgsQ0FBWUksdUJBQVosR0FBc0M3SyxFQUFFLENBQUMySyxlQUFILENBQW1CRyxNQUF6RDtBQUNBaEgsRUFBQUEsbUJBQW1CLENBQUM5RCxFQUFFLENBQUN5SyxRQUFKLEVBQWM7QUFDN0JDLElBQUFBLDhCQUE4QixFQUFFLHNDQURIO0FBRTdCRyxJQUFBQSx1QkFBdUIsRUFBRTtBQUZJLEdBQWQsQ0FBbkIsQ0FoYVUsQ0FxYVY7O0FBQ0E3SyxFQUFBQSxFQUFFLENBQUNELEVBQUgsQ0FBTWtDLE1BQU4sQ0FBYWpDLEVBQUUsQ0FBQytLLGVBQUgsQ0FBbUI3SSxTQUFoQyxFQUEyQyxpQkFBM0MsRUFBOEQsWUFBWTtBQUN0RWxDLElBQUFBLEVBQUUsQ0FBQzJDLE1BQUgsQ0FBVSxJQUFWLEVBQWdCLGlCQUFoQixFQUFtQyxjQUFuQztBQUNBLFdBQU8sS0FBS3FJLFNBQVo7QUFDSCxHQUhELEVBR0csVUFBVW5JLENBQVYsRUFBYTtBQUNaN0MsSUFBQUEsRUFBRSxDQUFDMkMsTUFBSCxDQUFVLElBQVYsRUFBZ0IsaUJBQWhCLEVBQW1DLGFBQW5DO0FBQ0EsU0FBS3FJLFNBQUwsR0FBaUJuSSxDQUFqQjtBQUNILEdBTkQsRUF0YVUsQ0E4YVY7O0FBQ0FpQixFQUFBQSxtQkFBbUIsQ0FBQzlELEVBQUUsQ0FBQ2lMLE1BQUgsQ0FBVS9JLFNBQVgsRUFBc0I7QUFDckNnSixJQUFBQSx3QkFBd0IsRUFBRSwwQkFEVztBQUVyQ0MsSUFBQUEscUJBQXFCLEVBQUUsdUJBRmM7QUFHckNDLElBQUFBLHFCQUFxQixFQUFFLHVCQUhjO0FBSXJDQyxJQUFBQSxzQkFBc0IsRUFBRSwwQkFKYTtBQUtyQ0MsSUFBQUEsc0JBQXNCLEVBQUU7QUFMYSxHQUF0QixDQUFuQjtBQVFBN0osRUFBQUEsYUFBYSxDQUFDekIsRUFBRSxDQUFDaUwsTUFBSixFQUFZLENBQ3JCLFdBRHFCLEVBRXJCLGNBRnFCLEVBR3JCLFlBSHFCLENBQVosQ0FBYixDQXZiVSxDQTZiVjs7QUFDQSxNQUFJTSxHQUFHLEdBQUcsdUVBQVY7QUFDQUMsRUFBQUEsU0FBUyxJQUFJbEosTUFBTSxDQUFDbUosZ0JBQVAsQ0FBd0J6TCxFQUFFLENBQUMwTCxLQUFILENBQVN4SixTQUFqQyxFQUE0QztBQUNyRHlKLElBQUFBLE1BQU0sRUFBRTtBQUNKckssTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYnRCLFFBQUFBLEVBQUUsQ0FBQ2dDLEtBQUgsQ0FBU3VKLEdBQVQsRUFBYyxRQUFkO0FBQ0EsZUFBTyxJQUFQO0FBQ0gsT0FKRztBQUtKekksTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYjlDLFFBQUFBLEVBQUUsQ0FBQ2dDLEtBQUgsQ0FBU3VKLEdBQVQsRUFBYyxRQUFkO0FBQ0g7QUFQRyxLQUQ2QztBQVVyREssSUFBQUEsaUJBQWlCLEVBQUU7QUFDZnRLLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2J0QixRQUFBQSxFQUFFLENBQUNnQyxLQUFILENBQVN1SixHQUFULEVBQWMsbUJBQWQ7QUFDQSxlQUFPLElBQVA7QUFDSDtBQUpjLEtBVmtDO0FBZ0JyRE0sSUFBQUEsWUFBWSxFQUFFO0FBQ1Z2SyxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNidEIsUUFBQUEsRUFBRSxDQUFDZ0MsS0FBSCxDQUFTdUosR0FBVCxFQUFjLGNBQWQ7QUFDQSxlQUFPLFlBQVk7QUFDZixpQkFBTyxJQUFQO0FBQ0gsU0FGRDtBQUdIO0FBTlMsS0FoQnVDO0FBd0JyRE8sSUFBQUEsWUFBWSxFQUFFO0FBQ1Z4SyxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNidEIsUUFBQUEsRUFBRSxDQUFDZ0MsS0FBSCxDQUFTdUosR0FBVCxFQUFjLGNBQWQ7QUFDQSxlQUFPLFlBQVk7QUFDZixpQkFBTyxJQUFQO0FBQ0gsU0FGRDtBQUdIO0FBTlM7QUF4QnVDLEdBQTVDLENBQWIsQ0EvYlUsQ0FpZVY7O0FBQ0F4SSxFQUFBQSxxQkFBcUIsQ0FBQy9DLEVBQUUsQ0FBQytMLG1CQUFKLEVBQXlCLENBQzFDLGNBRDBDLENBQXpCLEVBRWxCLHdCQUZrQixDQUFyQixDQWxlVSxDQXNlVjs7QUFDQSxNQUFJL0wsRUFBRSxDQUFDZ00sS0FBUCxFQUFjO0FBQ1ZqSixJQUFBQSxxQkFBcUIsQ0FBQy9DLEVBQUUsQ0FBQ2dNLEtBQUgsQ0FBUzlKLFNBQVYsRUFBcUIsQ0FDdEMsa0JBRHNDLENBQXJCLEVBRWxCLG9CQUZrQixDQUFyQjtBQUdILEdBM2VTLENBNmVWOzs7QUFDQWUsRUFBQUEsaUJBQWlCLENBQUNqRCxFQUFELEVBQUs7QUFDbEI7QUFDQWlNLElBQUFBLG1CQUFtQixFQUFFLDJCQUZIO0FBR2xCQyxJQUFBQSwyQkFBMkIsRUFBRSw2QkFIWDtBQUlsQkMsSUFBQUEsb0JBQW9CLEVBQUUsMEJBSko7QUFLbEJDLElBQUFBLHFCQUFxQixFQUFFLDJCQUxMO0FBTWxCQyxJQUFBQSx1QkFBdUIsRUFBRSwyQkFOUDtBQU9sQkMsSUFBQUEscUJBQXFCLEVBQUUsMkJBUEw7QUFRbEJDLElBQUFBLHVCQUF1QixFQUFFLDJCQVJQO0FBU2xCQyxJQUFBQSx3QkFBd0IsRUFBRSwyQkFUUjtBQVVsQkMsSUFBQUEsK0JBQStCLEVBQUUsMEJBVmY7QUFXbEJDLElBQUFBLHlCQUF5QixFQUFFLGtDQVhUO0FBWWxCQyxJQUFBQSx3QkFBd0IsRUFBRSxrQ0FaUjtBQWFsQkMsSUFBQUEsd0JBQXdCLEVBQUUsa0NBYlI7QUFjbEJDLElBQUFBLHVCQUF1QixFQUFFLGlDQWRQO0FBZ0JsQjtBQUNBQyxJQUFBQSxpQkFBaUIsRUFBRSxnQkFqQkQ7QUFtQmxCO0FBQ0FDLElBQUFBLGVBQWUsRUFBRSxnQkFwQkM7QUFzQmxCO0FBQ0FDLElBQUFBLGVBQWUsRUFBRSxxQkF2QkM7QUF3QmxCQyxJQUFBQSxnQkFBZ0IsRUFBRSwyQkF4QkE7QUF5QmxCQyxJQUFBQSxpQkFBaUIsRUFBRSxxQkF6QkQ7QUEwQmxCQyxJQUFBQSxnQkFBZ0IsRUFBRSx5QkExQkE7QUEyQmxCQyxJQUFBQSxrQkFBa0IsRUFBRSx5QkEzQkY7QUE0QmxCQyxJQUFBQSxnQkFBZ0IsRUFBRSx5Q0E1QkE7QUE2QmxCQyxJQUFBQSxTQUFTLEVBQUUsMkJBN0JPO0FBOEJsQkMsSUFBQUEsV0FBVyxFQUFFLFdBOUJLO0FBK0JsQkMsSUFBQUEsV0FBVyxFQUFFLGVBL0JLO0FBZ0NsQkMsSUFBQUEsV0FBVyxFQUFFLFdBaENLO0FBaUNsQkMsSUFBQUEsV0FBVyxFQUFFLFdBakNLO0FBa0NsQkMsSUFBQUEsV0FBVyxFQUFFLGVBbENLO0FBbUNsQkMsSUFBQUEsV0FBVyxFQUFFLFdBbkNLO0FBcUNsQjtBQUNBQyxJQUFBQSxVQUFVLEVBQUUsdUJBdENNO0FBdUNsQkMsSUFBQUEsVUFBVSxFQUFFLHlCQXZDTTtBQXdDbEJDLElBQUFBLFVBQVUsRUFBRSxlQXhDTTtBQTBDbEI7QUFDQUMsSUFBQUEsYUFBYSxFQUFFLHdCQTNDRztBQTRDbEJDLElBQUFBLHFCQUFxQixFQUFFLGdDQTVDTDtBQThDbEI7QUFDQUMsSUFBQUEsSUFBSSxFQUFFLFNBL0NZO0FBZ0RsQkMsSUFBQUEsSUFBSSxFQUFFLFlBaERZO0FBaURsQkMsSUFBQUEsSUFBSSxFQUFFLFlBakRZO0FBa0RsQkMsSUFBQUEsS0FBSyxFQUFFLGVBbERXO0FBbURsQkMsSUFBQUEsU0FBUyxFQUFFLHFCQW5ETztBQW9EbEJDLElBQUFBLElBQUksRUFBRSxZQXBEWTtBQXFEbEJDLElBQUFBLE1BQU0sRUFBRSxjQXJEVTtBQXNEbEJDLElBQUFBLEtBQUssRUFBRSwrQkF0RFc7QUF1RGxCQyxJQUFBQSxNQUFNLEVBQUUsOEJBdkRVO0FBd0RsQkMsSUFBQUEsUUFBUSxFQUFFLGdCQXhEUTtBQXlEbEJDLElBQUFBLFNBQVMsRUFBRSxZQXpETztBQTBEbEJDLElBQUFBLFdBQVcsRUFBRSxxQkExREs7QUEyRGxCQyxJQUFBQSxPQUFPLEVBQUUsU0EzRFM7QUE0RGxCQyxJQUFBQSxTQUFTLEVBQUUsa0JBNURPO0FBNkRsQkMsSUFBQUEsVUFBVSxFQUFFLGVBN0RNO0FBOERsQkMsSUFBQUEsU0FBUyxFQUFFLGlDQTlETztBQStEbEJDLElBQUFBLFFBQVEsRUFBRSxzQkEvRFE7QUFnRWxCQyxJQUFBQSxPQUFPLEVBQUUsZUFoRVM7QUFpRWxCQyxJQUFBQSxHQUFHLEVBQUUsWUFqRWE7QUFrRWxCQyxJQUFBQSxPQUFPLEVBQUUsbUJBbEVTO0FBbUVsQkMsSUFBQUEsTUFBTSxFQUFFLGdCQW5FVTtBQW9FbEJDLElBQUFBLE1BQU0sRUFBRSxnQkFwRVU7QUFxRWxCQyxJQUFBQSxZQUFZLEVBQUUsbUJBckVJO0FBc0VsQkMsSUFBQUEsT0FBTyxFQUFFLGVBdEVTO0FBdUVsQkMsSUFBQUEsTUFBTSxFQUFFLGNBdkVVO0FBd0VsQkMsSUFBQUEsWUFBWSxFQUFFLGtCQXhFSTtBQXlFbEJDLElBQUFBLGNBQWMsRUFBRSxtQkF6RUU7QUEwRWxCQyxJQUFBQSxTQUFTLEVBQUUsWUExRU87QUEyRWxCQyxJQUFBQSxXQUFXLEVBQUUsK0JBM0VLO0FBNEVsQkMsSUFBQUEsS0FBSyxFQUFFLHlCQTVFVztBQTZFbEJDLElBQUFBLE1BQU0sRUFBRSx3Q0E3RVU7QUErRWxCQyxJQUFBQSxJQUFJLEVBQUUsMEJBL0VZO0FBZ0ZsQkMsSUFBQUEsZUFBZSxFQUFFLDJCQWhGQztBQWtGbEJDLElBQUFBLFNBQVMsRUFBRSxtQkFsRk87QUFtRmxCQyxJQUFBQSxPQUFPLEVBQUUsZ0JBbkZTO0FBb0ZsQkMsSUFBQUEsV0FBVyxFQUFFLG9CQXBGSztBQXNGbEJDLElBQUFBLFNBQVMsRUFBRSxtQkF0Rk87QUF1RmxCQyxJQUFBQSxpQkFBaUIsRUFBRSw2QkF2RkQ7QUF3RmxCQyxJQUFBQSxTQUFTLEVBQUU7QUF4Rk8sR0FBTCxFQXlGZCxJQXpGYyxDQUFqQjtBQTBGQXpOLEVBQUFBLHFCQUFxQixDQUFDL0MsRUFBRCxFQUFLLENBQ3RCLGtCQURzQixFQUd0QixXQUhzQixFQUl0QixTQUpzQixFQUt0QixpQkFMc0IsRUFNdEIsbUJBTnNCLEVBT3RCLGdCQVBzQixFQVN0QixnQkFUc0IsRUFXdEIsc0JBWHNCLEVBYXRCLFlBYnNCLENBQUwsRUFjbEIsSUFka0IsQ0FBckI7QUFlQThELEVBQUFBLG1CQUFtQixDQUFDOUQsRUFBRCxFQUFLO0FBQ3BCO0FBQ0F5USxJQUFBQSxDQUFDLEVBQUU7QUFGaUIsR0FBTCxFQUdoQixJQUhnQixDQUFuQixDQXZsQlUsQ0EybEJWOztBQUNBeE4sRUFBQUEsaUJBQWlCLENBQUNqRCxFQUFFLENBQUMwUSxJQUFKLEVBQVU7QUFDdkJDLElBQUFBLE9BQU8sRUFBRSx1QkFEYztBQUV2QkMsSUFBQUEsYUFBYSxFQUFFO0FBRlEsR0FBVixDQUFqQixDQTVsQlUsQ0FnbUJWOztBQUNBM04sRUFBQUEsaUJBQWlCLENBQUNqRCxFQUFFLENBQUM2USxLQUFKLEVBQVc7QUFDeEJDLElBQUFBLE9BQU8sRUFBRSxlQURlO0FBRXhCQyxJQUFBQSxPQUFPLEVBQUU7QUFGZSxHQUFYLENBQWpCO0FBSUFqTixFQUFBQSxtQkFBbUIsQ0FBQzlELEVBQUUsQ0FBQzZRLEtBQUosRUFBVztBQUMxQkcsSUFBQUEsT0FBTyxFQUFFO0FBRGlCLEdBQVgsQ0FBbkIsQ0FybUJVLENBeW1CVjs7QUFDQWpSLEVBQUFBLEVBQUUsQ0FBQ3VCLEdBQUgsQ0FBT3RCLEVBQVAsRUFBVyxNQUFYLEVBQW1CLFlBQVk7QUFDM0JBLElBQUFBLEVBQUUsQ0FBQ3VCLE9BQUgsQ0FBVyxJQUFYLEVBQWlCLFNBQWpCLEVBQTRCLGNBQTVCO0FBQ0EsV0FBT3ZCLEVBQUUsQ0FBQ2lSLElBQUgsQ0FBUUMsSUFBZjtBQUNILEdBSEQ7QUFJQW5SLEVBQUFBLEVBQUUsQ0FBQ3VCLEdBQUgsQ0FBT3RCLEVBQVAsRUFBVyxZQUFYLEVBQXlCLFlBQVk7QUFDakNBLElBQUFBLEVBQUUsQ0FBQ3VCLE9BQUgsQ0FBVyxJQUFYLEVBQWlCLGVBQWpCLEVBQWtDLGFBQWxDO0FBQ0EsV0FBTzRQLElBQUksQ0FBQ0MsTUFBWjtBQUNILEdBSEQ7QUFJQXJSLEVBQUFBLEVBQUUsQ0FBQ3VCLEdBQUgsQ0FBT3RCLEVBQVAsRUFBVyxrQkFBWCxFQUErQixZQUFZO0FBQ3ZDQSxJQUFBQSxFQUFFLENBQUN1QixPQUFILENBQVcsSUFBWCxFQUFpQixxQkFBakIsRUFBd0MsMEJBQXhDO0FBQ0EsV0FBT3ZCLEVBQUUsQ0FBQ2lSLElBQUgsQ0FBUUksZ0JBQWY7QUFDSCxHQUhEO0FBSUF0UixFQUFBQSxFQUFFLENBQUN1QixHQUFILENBQU90QixFQUFQLEVBQVcsa0JBQVgsRUFBK0IsWUFBWTtBQUN2Q0EsSUFBQUEsRUFBRSxDQUFDdUIsT0FBSCxDQUFXLElBQVgsRUFBaUIscUJBQWpCLEVBQXdDLDBCQUF4QztBQUNBLFdBQU92QixFQUFFLENBQUNpUixJQUFILENBQVFLLGdCQUFmO0FBQ0gsR0FIRDtBQUlBdlIsRUFBQUEsRUFBRSxDQUFDdUIsR0FBSCxDQUFPdEIsRUFBUCxFQUFXLFFBQVgsRUFBcUIsWUFBWTtBQUM3QkEsSUFBQUEsRUFBRSxDQUFDdUIsT0FBSCxDQUFXLElBQVgsRUFBaUIsV0FBakIsRUFBOEIsZ0JBQTlCO0FBQ0EsV0FBT3ZCLEVBQUUsQ0FBQ2lSLElBQUgsQ0FBUU0sTUFBZjtBQUNILEdBSEQ7QUFJQXhSLEVBQUFBLEVBQUUsQ0FBQ3VCLEdBQUgsQ0FBT3RCLEVBQVAsRUFBVyxTQUFYLEVBQXNCLFlBQVk7QUFDOUJBLElBQUFBLEVBQUUsQ0FBQ3VCLE9BQUgsQ0FBVyxJQUFYLEVBQWlCLFlBQWpCLEVBQStCLGlCQUEvQjtBQUNBLFdBQU92QixFQUFFLENBQUNpUixJQUFILENBQVFPLE9BQWY7QUFDSCxHQUhEO0FBSUF6UixFQUFBQSxFQUFFLENBQUN1QixHQUFILENBQU90QixFQUFQLEVBQVcsYUFBWCxFQUEwQixZQUFZO0FBQ2xDQSxJQUFBQSxFQUFFLENBQUN1QixPQUFILENBQVcsSUFBWCxFQUFpQixnQkFBakIsRUFBbUMsc0JBQW5DO0FBQ0EsV0FBT3ZCLEVBQUUsQ0FBQ3lGLEtBQUgsQ0FBU2dNLFdBQWhCO0FBQ0gsR0FIRDtBQUlBMVIsRUFBQUEsRUFBRSxDQUFDdUIsR0FBSCxDQUFPdEIsRUFBUCxFQUFXLEtBQVgsRUFBa0IsWUFBWTtBQUMxQkEsSUFBQUEsRUFBRSxDQUFDdUIsT0FBSCxDQUFXLElBQVgsRUFBaUIsUUFBakIsRUFBMkIsY0FBM0I7QUFDQSxXQUFPdkIsRUFBRSxDQUFDeUYsS0FBSCxDQUFTaU0sR0FBaEI7QUFDSCxHQUhEO0FBSUEzUixFQUFBQSxFQUFFLENBQUN1QixHQUFILENBQU90QixFQUFQLEVBQVcsUUFBWCxFQUFxQixZQUFZO0FBQzdCQSxJQUFBQSxFQUFFLENBQUN1QixPQUFILENBQVcsSUFBWCxFQUFpQixXQUFqQixFQUE4QixXQUE5QjtBQUNBLFdBQU92QixFQUFFLENBQUMyUixNQUFWO0FBQ0gsR0FIRCxFQTFvQlUsQ0Erb0JWOztBQUNBNVIsRUFBQUEsRUFBRSxDQUFDdUIsR0FBSCxDQUFPdEIsRUFBUCxFQUFXLGdCQUFYLEVBQTZCLFlBQVk7QUFDckNBLElBQUFBLEVBQUUsQ0FBQ3VCLE9BQUgsQ0FBVyxJQUFYLEVBQWlCLG1CQUFqQixFQUFzQyxzQkFBdEM7QUFDQSxXQUFPdkIsRUFBRSxDQUFDRCxFQUFILENBQU02UixjQUFiO0FBQ0gsR0FIRCxFQWhwQlUsQ0FxcEJWOztBQUNBLE1BQUksT0FBT0MsV0FBUCxLQUF1QixXQUEzQixFQUF3QztBQUNwQzlSLElBQUFBLEVBQUUsQ0FBQ3VCLEdBQUgsQ0FBT3VRLFdBQVcsQ0FBQ0MsU0FBbkIsRUFBOEIsWUFBOUIsRUFBNEMsWUFBWTtBQUNwRDlSLE1BQUFBLEVBQUUsQ0FBQ3VCLE9BQUgsQ0FBVyxJQUFYLEVBQWlCLGtDQUFqQixFQUFxRCxtQ0FBckQ7QUFDQSxhQUFPc1EsV0FBVyxDQUFDQyxTQUFaLENBQXNCQyxXQUE3QjtBQUNILEtBSEQ7QUFJSCxHQTNwQlMsQ0E2cEJWOzs7QUFDQS9SLEVBQUFBLEVBQUUsQ0FBQ2dTLFFBQUgsQ0FBWUMsWUFBWixHQUEyQjtBQUN2QixRQUFJQyxHQUFKLEdBQVc7QUFDUGxTLE1BQUFBLEVBQUUsQ0FBQzJDLE1BQUgsQ0FBVSxJQUFWLEVBQWdCLDhCQUFoQixFQUFnRCxRQUFoRDtBQUNBLGFBQU8zQyxFQUFFLENBQUNrUyxHQUFWO0FBQ0gsS0FKc0I7O0FBS3ZCLFFBQUk3TixJQUFKLEdBQVk7QUFDUnJFLE1BQUFBLEVBQUUsQ0FBQzJDLE1BQUgsQ0FBVSxJQUFWLEVBQWdCLCtCQUFoQixFQUFpRCxTQUFqRDtBQUNBLGFBQU8zQyxFQUFFLENBQUNtUyxLQUFWO0FBQ0gsS0FSc0I7O0FBU3ZCLFFBQUlDLGNBQUosR0FBc0I7QUFDbEJwUyxNQUFBQSxFQUFFLENBQUMyQyxNQUFILENBQVUsSUFBVixFQUFnQix5Q0FBaEIsRUFBMkQsNEJBQTNEO0FBQ0EsYUFBTzNDLEVBQUUsQ0FBQ2dTLFFBQUgsQ0FBWUksY0FBbkI7QUFDSDs7QUFac0IsR0FBM0IsQ0E5cEJVLENBNnFCVjs7QUFDQXJQLEVBQUFBLHFCQUFxQixDQUFDL0MsRUFBRSxDQUFDcVMsV0FBSixFQUFpQixDQUNsQyxZQURrQyxFQUVsQyxTQUZrQyxFQUdsQyxvQkFIa0MsQ0FBakIsRUFJbEIsZ0JBSmtCLENBQXJCO0FBS0giLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbnZhciBqcyA9IGNjLmpzO1xuXG5pZiAoQ0NfREVCVUcpIHtcblxuICAgIGZ1bmN0aW9uIGRlcHJlY2F0ZUVudW0gKG9iaiwgb2xkUGF0aCwgbmV3UGF0aCwgaGFzVHlwZVByZWZpeEJlZm9yZSkge1xuICAgICAgICBpZiAoIUNDX1NVUFBPUlRfSklUKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaGFzVHlwZVByZWZpeEJlZm9yZSA9IGhhc1R5cGVQcmVmaXhCZWZvcmUgIT09IGZhbHNlO1xuICAgICAgICB2YXIgZW51bURlZiA9IEZ1bmN0aW9uKCdyZXR1cm4gJyArIG5ld1BhdGgpKCk7XG4gICAgICAgIHZhciBlbnRyaWVzID0gY2MuRW51bS5nZXRMaXN0KGVudW1EZWYpO1xuICAgICAgICB2YXIgZGVsaW1pdGVyID0gaGFzVHlwZVByZWZpeEJlZm9yZSA/ICdfJyA6ICcuJztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2ldLm5hbWU7XG4gICAgICAgICAgICB2YXIgb2xkUHJvcE5hbWU7XG4gICAgICAgICAgICBpZiAoaGFzVHlwZVByZWZpeEJlZm9yZSkge1xuICAgICAgICAgICAgICAgIHZhciBvbGRUeXBlTmFtZSA9IG9sZFBhdGguc3BsaXQoJy4nKS5zbGljZSgtMSlbMF07XG4gICAgICAgICAgICAgICAgb2xkUHJvcE5hbWUgPSBvbGRUeXBlTmFtZSArICdfJyArIGVudHJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2xkUHJvcE5hbWUgPSBlbnRyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGpzLmdldChvYmosIG9sZFByb3BOYW1lLCBmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDE0MDAsIG9sZFBhdGggKyBkZWxpbWl0ZXIgKyBlbnRyeSwgbmV3UGF0aCArICcuJyArIGVudHJ5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW51bURlZltlbnRyeV07XG4gICAgICAgICAgICB9LmJpbmQobnVsbCwgZW50cnkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hcmtBc1JlbW92ZWQgKG93bmVyQ3RvciwgcmVtb3ZlZFByb3BzLCBvd25lck5hbWUpIHtcbiAgICAgICAgaWYgKCFvd25lckN0b3IpIHtcbiAgICAgICAgICAgIC8vIOWPr+iDveiiq+ijgeWJquS6hlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG93bmVyTmFtZSA9IG93bmVyTmFtZSB8fCBqcy5nZXRDbGFzc05hbWUob3duZXJDdG9yKTtcbiAgICAgICAgcmVtb3ZlZFByb3BzLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGVycm9yICgpIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDE0MDYsIG93bmVyTmFtZSwgcHJvcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBqcy5nZXRzZXQob3duZXJDdG9yLnByb3RvdHlwZSwgcHJvcCwgZXJyb3IsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFya0FzRGVwcmVjYXRlZCAob3duZXJDdG9yLCBkZXByZWNhdGVkUHJvcHMsIG93bmVyTmFtZSkge1xuICAgICAgICBpZiAoIW93bmVyQ3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG93bmVyTmFtZSA9IG93bmVyTmFtZSB8fCBqcy5nZXRDbGFzc05hbWUob3duZXJDdG9yKTtcbiAgICAgICAgbGV0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob3duZXJDdG9yLnByb3RvdHlwZSk7XG4gICAgICAgIGRlcHJlY2F0ZWRQcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgICAgICBsZXQgZGVwcmVjYXRlZFByb3AgPSBwcm9wWzBdO1xuICAgICAgICAgICAgbGV0IG5ld1Byb3AgPSBwcm9wWzFdO1xuICAgICAgICAgICAgbGV0IGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9yc1tkZXByZWNhdGVkUHJvcF07XG4gICAgICAgICAgICBqcy5nZXRzZXQob3duZXJDdG9yLnByb3RvdHlwZSwgZGVwcmVjYXRlZFByb3AsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjYy53YXJuSUQoMTQwMCwgYCR7b3duZXJOYW1lfS4ke2RlcHJlY2F0ZWRQcm9wfWAsIGAke293bmVyTmFtZX0uJHtuZXdQcm9wfWApO1xuICAgICAgICAgICAgICAgIHJldHVybiBkZXNjcmlwdG9yLmdldC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICBjYy53YXJuSUQoMTQwMCwgYCR7b3duZXJOYW1lfS4ke2RlcHJlY2F0ZWRQcm9wfWAsIGAke293bmVyTmFtZX0uJHtuZXdQcm9wfWApO1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0b3Iuc2V0LmNhbGwodGhpcywgdik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXJrQXNSZW1vdmVkSW5PYmplY3QgKG93bmVyT2JqLCByZW1vdmVkUHJvcHMsIG93bmVyTmFtZSkge1xuICAgICAgICBpZiAoIW93bmVyT2JqKSB7XG4gICAgICAgICAgICAvLyDlj6/og73ooqvoo4HliarkuoZcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZW1vdmVkUHJvcHMuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICAgICAgZnVuY3Rpb24gZXJyb3IgKCkge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMTQwNiwgb3duZXJOYW1lLCBwcm9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGpzLmdldHNldChvd25lck9iaiwgcHJvcCwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcm92aWRlQ2xlYXJFcnJvciAob3duZXIsIG9iaiwgb3duZXJOYW1lKSB7XG4gICAgICAgIGlmICghb3duZXIpIHtcbiAgICAgICAgICAgIC8vIOWPr+iDveiiq+ijgeWJquS6hlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjbGFzc05hbWUgPSBvd25lck5hbWUgfHwgY2MuanMuZ2V0Q2xhc3NOYW1lKG93bmVyKTtcbiAgICAgICAgdmFyIEluZm8gPSAnU29ycnksICcgKyBjbGFzc05hbWUgKyAnLiVzIGlzIHJlbW92ZWQsIHBsZWFzZSB1c2UgJXMgaW5zdGVhZC4nO1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuICAgICAgICAgICAgZnVuY3Rpb24gZGVmaW5lIChwcm9wLCBnZXRzZXQpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhY2Nlc3NvciAobmV3UHJvcCkge1xuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihJbmZvLCBwcm9wLCBuZXdQcm9wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGdldHNldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0c2V0ID0gZ2V0c2V0LnNwbGl0KCcsJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geC50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAganMuZ2V0c2V0KG93bmVyLCBwcm9wLCBhY2Nlc3Nvci5iaW5kKG51bGwsIGdldHNldFswXSksIGdldHNldFsxXSAmJiBhY2Nlc3Nvci5iaW5kKG51bGwsIGdldHNldFsxXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBnZXRzZXQgPSBvYmpbcHJvcF07XG4gICAgICAgICAgICBpZiAocHJvcFswXSA9PT0gJyonKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHNldFxuICAgICAgICAgICAgICAgIHZhciBldFByb3AgPSBwcm9wLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIGRlZmluZSgnZycgKyBldFByb3AsIGdldHNldCk7XG4gICAgICAgICAgICAgICAgZGVmaW5lKCdzJyArIGV0UHJvcCwgZ2V0c2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHByb3Auc3BsaXQoJywnKVxuICAgICAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geC50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZpbmUoeCwgZ2V0c2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXJrRnVuY3Rpb25XYXJuaW5nIChvd25lckN0b3IsIG9iaiwgb3duZXJOYW1lKSB7XG4gICAgICAgIGlmICghb3duZXJDdG9yKSB7XG4gICAgICAgICAgICAvLyDlj6/og73ooqvoo4HliarkuoZcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBvd25lck5hbWUgPSBvd25lck5hbWUgfHwganMuZ2V0Q2xhc3NOYW1lKG93bmVyQ3Rvcik7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcE5hbWUgPSBwcm9wO1xuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5GdW5jID0gb3duZXJDdG9yW3Byb3BOYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAoIW9yaWdpbkZ1bmMpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHdhcm4gKCkge1xuICAgICAgICAgICAgICAgICAgICBjYy53YXJuKCdTb3JyeSwgJXMuJXMgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSAlcyBpbnN0ZWFkJywgb3duZXJOYW1lLCBwcm9wTmFtZSwgb2JqW3Byb3BOYW1lXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcmlnaW5GdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgb3duZXJDdG9yW3Byb3BOYW1lXSA9IHdhcm47XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHJlbW92ZSBjYy5pbmZvXG4gICAganMuZ2V0KGNjLCAnaW5mbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZXJyb3JJRCgxNDAwLCAnY2MuaW5mbycsICdjYy5sb2cnKTtcbiAgICAgICAgcmV0dXJuIGNjLmxvZztcbiAgICB9KTtcbiAgICAvLyBjYy5zcHJpdGVGcmFtZUNhY2hlXG4gICAganMuZ2V0KGNjLCBcInNwcml0ZUZyYW1lQ2FjaGVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5lcnJvcklEKDE0MDQpO1xuICAgIH0pO1xuXG4gICAgLy8gY2Mudm1hdGhcbiAgICBqcy5nZXQoY2MsICd2bWF0aCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2Mud2FybklEKDE0MDAsICdjYy52bWF0aCcsICdjYy5tYXRoJyk7XG4gICAgICAgIHJldHVybiBjYy5tYXRoO1xuICAgIH0pO1xuICAgIGpzLmdldChjYy5tYXRoLCAndmVjMicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2Mud2FybklEKDE0MDAsICdjYy52bWF0aC52ZWMyJywgJ2NjLlZlYzInKTtcbiAgICAgICAgcmV0dXJuIGNjLlZlYzI7XG4gICAgfSlcbiAgICBqcy5nZXQoY2MubWF0aCwgJ3ZlYzMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLndhcm5JRCgxNDAwLCAnY2Mudm1hdGgudmVjMycsICdjYy5WZWMzJyk7XG4gICAgICAgIHJldHVybiBjYy5WZWMzO1xuICAgIH0pXG4gICAganMuZ2V0KGNjLm1hdGgsICd2ZWM0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy53YXJuSUQoMTQwMCwgJ2NjLnZtYXRoLnZlYzQnLCAnY2MuVmVjNCcpO1xuICAgICAgICByZXR1cm4gY2MuVmVjNDtcbiAgICB9KVxuICAgIGpzLmdldChjYy5tYXRoLCAnbWF0NCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2Mud2FybklEKDE0MDAsICdjYy52bWF0aC5tYXQ0JywgJ2NjLk1hdDQnKTtcbiAgICAgICAgcmV0dXJuIGNjLk1hdDQ7XG4gICAgfSlcbiAgICBqcy5nZXQoY2MubWF0aCwgJ21hdDMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLndhcm5JRCgxNDAwLCAnY2Mudm1hdGgubWF0MycsICdjYy5NYXQzJyk7XG4gICAgICAgIHJldHVybiBjYy5NYXQzO1xuICAgIH0pXG4gICAganMuZ2V0KGNjLm1hdGgsICdxdWF0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy53YXJuSUQoMTQwMCwgJ2NjLnZtYXRoLnF1YXQnLCAnY2MuUXVhdCcpO1xuICAgICAgICByZXR1cm4gY2MuUXVhdDtcbiAgICB9KVxuXG4gICAgLy8gU3ByaXRlRnJhbWVcbiAgICBqcy5nZXQoY2MuU3ByaXRlRnJhbWUucHJvdG90eXBlLCAnX3RleHR1cmVMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmVycm9ySUQoMTQwMCwgJ3Nwcml0ZUZyYW1lLl90ZXh0dXJlTG9hZGVkJywgJ3Nwcml0ZUZyYW1lLnRleHR1cmVMb2FkZWQoKScpO1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlTG9hZGVkKCk7XG4gICAgfSk7XG4gICAgbWFya0FzUmVtb3ZlZChjYy5TcHJpdGVGcmFtZSwgW1xuICAgICAgICAnYWRkTG9hZGVkRXZlbnRMaXN0ZW5lcidcbiAgICBdKTtcbiAgICBtYXJrRnVuY3Rpb25XYXJuaW5nKGNjLlNwcml0ZS5wcm90b3R5cGUsIHtcbiAgICAgICAgc2V0U3RhdGU6ICdjYy5TcHJpdGUuc2V0TWF0ZXJpYWwnLFxuICAgICAgICBnZXRTdGF0ZTogJ2NjLlNwcml0ZS5nZXRNYXRlcmlhbCdcbiAgICB9LCAnY2MuU3ByaXRlJyk7XG5cbiAgICBqcy5nZXQoY2MuU3ByaXRlRnJhbWUucHJvdG90eXBlLCAnY2xlYXJUZXh0dXJlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5lcnJvcklEKDE0MDYsICdjYy5TcHJpdGVGcmFtZScsICdjbGVhclRleHR1cmUnKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuICAgIH0pO1xuXG4gICAgLy8gY2MudGV4dHVyZUNhY2hlXG4gICAganMuZ2V0KGNjLCAndGV4dHVyZUNhY2hlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5lcnJvcklEKDE0MDYsICdjYycsICd0ZXh0dXJlQ2FjaGUnKTtcbiAgICB9KTtcblxuICAgIC8vIFRleHR1cmVcbiAgICBsZXQgVGV4dHVyZTJEID0gY2MuVGV4dHVyZTJEO1xuICAgIGpzLmdldChUZXh0dXJlMkQucHJvdG90eXBlLCAncmVsZWFzZVRleHR1cmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmVycm9ySUQoMTQwMCwgJ3RleHR1cmUucmVsZWFzZVRleHR1cmUoKScsICd0ZXh0dXJlLmRlc3Ryb3koKScpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZXN0cm95O1xuICAgIH0pO1xuXG4gICAganMuZ2V0KFRleHR1cmUyRC5wcm90b3R5cGUsICdnZXROYW1lJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5lcnJvcklEKDE0MDAsICd0ZXh0dXJlLmdldE5hbWUoKScsICd0ZXh0dXJlLl9nbElEJyk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2xJRCB8fCBudWxsO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAganMuZ2V0KFRleHR1cmUyRC5wcm90b3R5cGUsICdpc0xvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZXJyb3JJRCgxNDAwLCAndGV4dHVyZS5pc0xvYWRlZCBmdW5jdGlvbicsICd0ZXh0dXJlLmxvYWRlZCBwcm9wZXJ0eScpO1xuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWRlZDtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBqcy5nZXQoVGV4dHVyZTJELnByb3RvdHlwZSwgJ3NldEFudGlBbGlhc1RleFBhcmFtZXRlcnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmVycm9ySUQoMTQwMCwgJ3RleHR1cmUuc2V0QW50aUFsaWFzVGV4UGFyYW1ldGVycygpJywgJ3RleHR1cmUuc2V0RmlsdGVycyhjYy5UZXh0dXJlMkQuRmlsdGVyLkxJTkVBUiwgY2MuVGV4dHVyZTJELkZpbHRlci5MSU5FQVIpJyk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZpbHRlcnMoVGV4dHVyZTJELkZpbHRlci5MSU5FQVIsIFRleHR1cmUyRC5GaWx0ZXIuTElORUFSKTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGpzLmdldChUZXh0dXJlMkQucHJvdG90eXBlLCAnc2V0QWxpYXNUZXhQYXJhbWV0ZXJzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5lcnJvcklEKDE0MDAsICd0ZXh0dXJlLnNldEFudGlBbGlhc1RleFBhcmFtZXRlcnMoKScsICd0ZXh0dXJlLnNldEZpbHRlcnMoY2MuVGV4dHVyZTJELkZpbHRlci5ORUFSRVNULCBjYy5UZXh0dXJlMkQuRmlsdGVyLk5FQVJFU1QpJyk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZpbHRlcnMoVGV4dHVyZTJELkZpbHRlci5ORUFSRVNULCBUZXh0dXJlMkQuRmlsdGVyLk5FQVJFU1QpO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgLy8gY2MubWFjcm9cbiAgICBtYXJrQXNSZW1vdmVkSW5PYmplY3QoY2MubWFjcm8sIFtcbiAgICAgICAgJ0VOQUJMRV9HTF9TVEFURV9DQUNIRScsXG4gICAgICAgICdGSVhfQVJUSUZBQ1RTX0JZX1NUUkVDSElOR19URVhFTCcsXG4gICAgXSwgJ2NjLm1hY3JvJyk7XG5cbiAgICBwcm92aWRlQ2xlYXJFcnJvcihjYy5tYWNybywge1xuICAgICAgICBQSTogJ01hdGguUEknLFxuICAgICAgICBQSTI6ICdNYXRoLlBJICogMicsXG4gICAgICAgIEZMVF9NQVg6ICdOdW1iZXIuTUFYX1ZBTFVFJyxcbiAgICAgICAgRkxUX01JTjogJ051bWJlci5NSU5fVkFMVUUnLFxuICAgICAgICBVSU5UX01BWDogJ051bWJlci5NQVhfU0FGRV9JTlRFR0VSJ1xuICAgIH0sICdjYy5tYWNybycpO1xuXG4gICAgLy8gY2MuZ2FtZVxuICAgIG1hcmtBc1JlbW92ZWRJbk9iamVjdChjYy5nYW1lLCBbXG4gICAgICAgICdDT05GSUdfS0VZJyxcbiAgICBdLCAnY2MuZ2FtZScpO1xuXG4gICAgLy8gY2Muc3lzXG4gICAgbWFya0FzUmVtb3ZlZEluT2JqZWN0KGNjLnN5cywgW1xuICAgICAgICAnZHVtcFJvb3QnLFxuICAgICAgICAnY2xlYW5TY3JpcHQnLFxuICAgICAgICAnQlJPV1NFUl9UWVBFX1dFQ0hBVF9HQU1FJyxcbiAgICAgICAgJ0JST1dTRVJfVFlQRV9XRUNIQVRfR0FNRV9TVUInLFxuICAgICAgICAnQlJPV1NFUl9UWVBFX0JBSURVX0dBTUUnLFxuICAgICAgICAnQlJPV1NFUl9UWVBFX0JBSURVX0dBTUVfU1VCJyxcbiAgICAgICAgJ0JST1dTRVJfVFlQRV9YSUFPTUlfR0FNRScsXG4gICAgICAgICdCUk9XU0VSX1RZUEVfQUxJUEFZX0dBTUUnLFxuICAgIF0sICdjYy5zeXMnKTtcblxuICAgIC8vIGNjLkRpcmVjdG9yXG4gICAgcHJvdmlkZUNsZWFyRXJyb3IoY2MuRGlyZWN0b3IsIHtcbiAgICAgICAgRVZFTlRfUFJPSkVDVElPTl9DSEFOR0VEOiAnJyxcbiAgICAgICAgRVZFTlRfQkVGT1JFX1ZJU0lUOiAnRVZFTlRfQUZURVJfVVBEQVRFJyxcbiAgICAgICAgRVZFTlRfQUZURVJfVklTSVQ6ICdFVkVOVF9CRUZPUkVfRFJBVycsXG4gICAgfSwgJ2NjLkRpcmVjdG9yJyk7XG4gICAgbWFya0Z1bmN0aW9uV2FybmluZyhjYy5EaXJlY3Rvci5wcm90b3R5cGUsIHtcbiAgICAgICAgY29udmVydFRvR0w6ICdjYy52aWV3LmNvbnZlcnRUb0xvY2F0aW9uSW5WaWV3JyxcbiAgICAgICAgY29udmVydFRvVUk6ICcnLFxuICAgICAgICBnZXRXaW5TaXplOiAnY2Mud2luU2l6ZScsXG4gICAgICAgIGdldFdpblNpemVJblBpeGVsczogJ2NjLndpblNpemUnLFxuICAgICAgICBnZXRWaXNpYmxlU2l6ZTogJ2NjLnZpZXcuZ2V0VmlzaWJsZVNpemUnLFxuICAgICAgICBnZXRWaXNpYmxlT3JpZ2luOiAnY2Mudmlldy5nZXRWaXNpYmxlT3JpZ2luJyxcbiAgICAgICAgcHVyZ2VDYWNoZWREYXRhOiAnY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBbGwnLFxuICAgICAgICBzZXREZXB0aFRlc3Q6ICdjYy5DYW1lcmEubWFpbi5kZXB0aCcsXG4gICAgICAgIHNldENsZWFyQ29sb3I6ICdjYy5DYW1lcmEubWFpbi5iYWNrZ3JvdW5kQ29sb3InLFxuICAgICAgICBnZXRSdW5uaW5nU2NlbmU6ICdjYy5kaXJlY3Rvci5nZXRTY2VuZScsXG4gICAgICAgIGdldEFuaW1hdGlvbkludGVydmFsOiAnY2MuZ2FtZS5nZXRGcmFtZVJhdGUnLFxuICAgICAgICBzZXRBbmltYXRpb25JbnRlcnZhbDogJ2NjLmdhbWUuc2V0RnJhbWVSYXRlJyxcbiAgICAgICAgaXNEaXNwbGF5U3RhdHM6ICdjYy5kZWJ1Zy5pc0Rpc3BsYXlTdGF0cycsXG4gICAgICAgIHNldERpc3BsYXlTdGF0czogJ2NjLmRlYnVnLnNldERpc3BsYXlTdGF0cycsXG4gICAgICAgIHN0b3BBbmltYXRpb246ICdjYy5nYW1lLnBhdXNlJyxcbiAgICAgICAgc3RhcnRBbmltYXRpb246ICdjYy5nYW1lLnJlc3VtZScsXG4gICAgfSwgJ2NjLkRpcmVjdG9yJyk7XG4gICAgbWFya0FzUmVtb3ZlZChjYy5EaXJlY3RvciwgW1xuICAgICAgICAncHVzaFNjZW5lJyxcbiAgICAgICAgJ3BvcFNjZW5lJyxcbiAgICAgICAgJ3BvcFRvUm9vdFNjZW5lJyxcbiAgICAgICAgJ3BvcFRvU2NlbmVTdGFja0xldmVsJyxcbiAgICAgICAgJ3NldFByb2plY3Rpb24nLFxuICAgICAgICAnZ2V0UHJvamVjdGlvbicsXG4gICAgXSwgJ2NjLkRpcmVjdG9yJyk7XG5cbiAgICAvLyBTY2hlZHVsZXJcbiAgICBwcm92aWRlQ2xlYXJFcnJvcihjYy5TY2hlZHVsZXIsIHtcbiAgICAgICAgc2NoZWR1bGVDYWxsYmFja0ZvclRhcmdldDogJ3NjaGVkdWxlJyxcbiAgICAgICAgc2NoZWR1bGVVcGRhdGVGb3JUYXJnZXQ6ICdzY2hlZHVsZVVwZGF0ZScsXG4gICAgICAgIHVuc2NoZWR1bGVDYWxsYmFja0ZvclRhcmdldDogJ3Vuc2NoZWR1bGUnLFxuICAgICAgICB1bnNjaGVkdWxlVXBkYXRlRm9yVGFyZ2V0OiAndW5zY2hlZHVsZVVwZGF0ZScsXG4gICAgICAgIHVuc2NoZWR1bGVBbGxDYWxsYmFja3NGb3JUYXJnZXQ6ICd1bnNjaGVkdWxlQWxsRm9yVGFyZ2V0JyxcbiAgICAgICAgdW5zY2hlZHVsZUFsbENhbGxiYWNrczogJ3Vuc2NoZWR1bGVBbGwnLFxuICAgICAgICB1bnNjaGVkdWxlQWxsQ2FsbGJhY2tzV2l0aE1pblByaW9yaXR5OiAndW5zY2hlZHVsZUFsbFdpdGhNaW5Qcmlvcml0eSdcbiAgICB9LCAnY2MuU2NoZWR1bGVyJyk7XG5cbiAgICAvLyBjYy52aWV3XG4gICAgcHJvdmlkZUNsZWFyRXJyb3IoY2Mudmlldywge1xuICAgICAgICBhZGp1c3RWaWV3UG9ydDogJ2FkanVzdFZpZXdwb3J0TWV0YScsXG4gICAgICAgIHNldFZpZXdQb3J0SW5Qb2ludHM6ICdzZXRWaWV3cG9ydEluUG9pbnRzJyxcbiAgICAgICAgZ2V0Vmlld1BvcnRSZWN0OiAnZ2V0Vmlld3BvcnRSZWN0J1xuICAgIH0sICdjYy52aWV3Jyk7XG4gICAgbWFya0FzUmVtb3ZlZEluT2JqZWN0KGNjLnZpZXcsIFtcbiAgICAgICAgJ2lzVmlld1JlYWR5JyxcbiAgICAgICAgJ3NldFRhcmdldERlbnNpdHlEUEknLFxuICAgICAgICAnZ2V0VGFyZ2V0RGVuc2l0eURQSScsXG4gICAgICAgICdzZXRGcmFtZVpvb21GYWN0b3InLFxuICAgICAgICAnY2FuU2V0Q29udGVudFNjYWxlRmFjdG9yJyxcbiAgICAgICAgJ3NldENvbnRlbnRUcmFuc2xhdGVMZWZ0VG9wJyxcbiAgICAgICAgJ2dldENvbnRlbnRUcmFuc2xhdGVMZWZ0VG9wJyxcbiAgICAgICAgJ3NldFZpZXdOYW1lJyxcbiAgICAgICAgJ2dldFZpZXdOYW1lJ1xuICAgIF0sICdjYy52aWV3Jyk7XG5cbiAgICAvLyBjYy5QaHlzaWNzTWFuYWdlclxuICAgIG1hcmtBc1JlbW92ZWQoY2MuUGh5c2ljc01hbmFnZXIsIFtcbiAgICAgICAgJ2F0dGFjaERlYnVnRHJhd1RvQ2FtZXJhJyxcbiAgICAgICAgJ2RldGFjaERlYnVnRHJhd0Zyb21DYW1lcmEnLFxuICAgIF0pO1xuXG4gICAgLy8gY2MuQ29sbGlzaW9uTWFuYWdlclxuICAgIG1hcmtBc1JlbW92ZWQoY2MuQ29sbGlzaW9uTWFuYWdlciwgW1xuICAgICAgICAnYXR0YWNoRGVidWdEcmF3VG9DYW1lcmEnLFxuICAgICAgICAnZGV0YWNoRGVidWdEcmF3RnJvbUNhbWVyYScsXG4gICAgXSk7XG5cbiAgICAvLyBjYy5Ob2RlXG4gICAgcHJvdmlkZUNsZWFyRXJyb3IoY2MuX0Jhc2VOb2RlLnByb3RvdHlwZSwge1xuICAgICAgICAndGFnJzogJ25hbWUnLFxuICAgICAgICAnZ2V0VGFnJzogJ25hbWUnLFxuICAgICAgICAnc2V0VGFnJzogJ25hbWUnLFxuICAgICAgICAnZ2V0Q2hpbGRCeVRhZyc6ICdnZXRDaGlsZEJ5TmFtZScsXG4gICAgICAgICdyZW1vdmVDaGlsZEJ5VGFnJzogJ2dldENoaWxkQnlOYW1lKG5hbWUpLmRlc3Ryb3koKSdcbiAgICB9KTtcblxuICAgIG1hcmtBc1JlbW92ZWQoY2MuTm9kZSwgW1xuICAgICAgICAnX2Nhc2NhZGVDb2xvckVuYWJsZWQnLFxuICAgICAgICAnY2FzY2FkZUNvbG9yJyxcbiAgICAgICAgJ2lzQ2FzY2FkZUNvbG9yRW5hYmxlZCcsXG4gICAgICAgICdzZXRDYXNjYWRlQ29sb3JFbmFibGVkJyxcbiAgICAgICAgJ19jYXNjYWRlT3BhY2l0eUVuYWJsZWQnLFxuICAgICAgICAnY2FzY2FkZU9wYWNpdHknLFxuICAgICAgICAnaXNDYXNjYWRlT3BhY2l0eUVuYWJsZWQnLFxuICAgICAgICAnc2V0Q2FzY2FkZU9wYWNpdHlFbmFibGVkJyxcbiAgICAgICAgJ29wYWNpdHlNb2RpZnlSR0InLFxuICAgICAgICAnaXNPcGFjaXR5TW9kaWZ5UkdCJyxcbiAgICAgICAgJ3NldE9wYWNpdHlNb2RpZnlSR0InLFxuICAgICAgICAnaWdub3JlQW5jaG9yJyxcbiAgICAgICAgJ2lzSWdub3JlQW5jaG9yUG9pbnRGb3JQb3NpdGlvbicsXG4gICAgICAgICdpZ25vcmVBbmNob3JQb2ludEZvclBvc2l0aW9uJyxcbiAgICAgICAgJ2lzUnVubmluZycsXG4gICAgICAgICdfc2dOb2RlJyxcbiAgICBdKTtcblxuICAgIG1hcmtGdW5jdGlvbldhcm5pbmcoY2MuTm9kZS5wcm90b3R5cGUsIHtcbiAgICAgICAgZ2V0Tm9kZVRvUGFyZW50VHJhbnNmb3JtOiAnZ2V0TG9jYWxNYXRyaXgnLFxuICAgICAgICBnZXROb2RlVG9QYXJlbnRUcmFuc2Zvcm1BUjogJ2dldExvY2FsTWF0cml4JyxcbiAgICAgICAgZ2V0Tm9kZVRvV29ybGRUcmFuc2Zvcm06ICdnZXRXb3JsZE1hdHJpeCcsXG4gICAgICAgIGdldE5vZGVUb1dvcmxkVHJhbnNmb3JtQVI6ICdnZXRXb3JsZE1hdHJpeCcsXG4gICAgICAgIGdldFBhcmVudFRvTm9kZVRyYW5zZm9ybTogJ2dldExvY2FsTWF0cml4JyxcbiAgICAgICAgZ2V0V29ybGRUb05vZGVUcmFuc2Zvcm06ICdnZXRXb3JsZE1hdHJpeCcsXG4gICAgICAgIGNvbnZlcnRUb3VjaFRvTm9kZVNwYWNlOiAnY29udmVydFRvTm9kZVNwYWNlQVInLFxuICAgICAgICBjb252ZXJ0VG91Y2hUb05vZGVTcGFjZUFSOiAnY29udmVydFRvTm9kZVNwYWNlQVInLFxuICAgICAgICBjb252ZXJ0VG9Xb3JsZFNwYWNlOiAnY29udmVydFRvV29ybGRTcGFjZUFSJyxcbiAgICAgICAgY29udmVydFRvTm9kZVNwYWNlOiAnY29udmVydFRvTm9kZVNwYWNlQVInXG4gICAgfSk7XG5cbiAgICBwcm92aWRlQ2xlYXJFcnJvcihjYy5Ob2RlLnByb3RvdHlwZSwge1xuICAgICAgICBnZXRSb3RhdGlvblg6ICdyb3RhdGlvblgnLFxuICAgICAgICBzZXRSb3RhdGlvblg6ICdyb3RhdGlvblgnLFxuICAgICAgICBnZXRSb3RhdGlvblk6ICdyb3RhdGlvblknLFxuICAgICAgICBzZXRSb3RhdGlvblk6ICdyb3RhdGlvblknLFxuICAgICAgICBnZXRQb3NpdGlvblg6ICd4JyxcbiAgICAgICAgc2V0UG9zaXRpb25YOiAneCcsXG4gICAgICAgIGdldFBvc2l0aW9uWTogJ3knLFxuICAgICAgICBzZXRQb3NpdGlvblk6ICd5JyxcbiAgICAgICAgZ2V0U2tld1g6ICdza2V3WCcsXG4gICAgICAgIHNldFNrZXdYOiAnc2tld1gnLFxuICAgICAgICBnZXRTa2V3WTogJ3NrZXdZJyxcbiAgICAgICAgc2V0U2tld1k6ICdza2V3WScsXG4gICAgICAgIGdldFNjYWxlWDogJ3NjYWxlWCcsXG4gICAgICAgIHNldFNjYWxlWDogJ3NjYWxlWCcsXG4gICAgICAgIGdldFNjYWxlWTogJ3NjYWxlWScsXG4gICAgICAgIHNldFNjYWxlWTogJ3NjYWxlWScsXG4gICAgICAgIGdldE9wYWNpdHk6ICdvcGFjaXR5JyxcbiAgICAgICAgc2V0T3BhY2l0eTogJ29wYWNpdHknLFxuICAgICAgICBnZXRDb2xvcjogJ2NvbG9yJyxcbiAgICAgICAgc2V0Q29sb3I6ICdjb2xvcicsXG4gICAgICAgIGdldExvY2FsWk9yZGVyOiAnekluZGV4JyxcbiAgICAgICAgc2V0TG9jYWxaT3JkZXI6ICd6SW5kZXgnLFxuICAgIH0pO1xuXG4gICAgcHJvdmlkZUNsZWFyRXJyb3IoY2MuU3ByaXRlLnByb3RvdHlwZSwge1xuICAgICAgICBzZXRJbnNldExlZnQ6ICdjYy5TcHJpdGVGcmFtZSBpbnNldExlZnQnLFxuICAgICAgICBzZXRJbnNldFJpZ2h0OiAnY2MuU3ByaXRlRnJhbWUgaW5zZXRSaWdodCcsXG4gICAgICAgIHNldEluc2V0VG9wOiAnY2MuU3ByaXRlRnJhbWUgaW5zZXRUb3AnLFxuICAgICAgICBzZXRJbnNldEJvdHRvbTogJ2NjLlNwcml0ZUZyYW1lIGluc2V0Qm90dG9tJyxcbiAgICB9KTtcblxuICAgIC8vIGNjLk1hdGVyaWFsXG4gICAgY2MuTWF0ZXJpYWwuZ2V0SW5zdGFudGlhdGVkQnVpbHRpbk1hdGVyaWFsID0gY2MuTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZVdpdGhCdWlsdGluO1xuICAgIGNjLk1hdGVyaWFsLmdldEluc3RhbnRpYXRlZE1hdGVyaWFsID0gY2MuTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZTtcbiAgICBtYXJrRnVuY3Rpb25XYXJuaW5nKGNjLk1hdGVyaWFsLCB7XG4gICAgICAgIGdldEluc3RhbnRpYXRlZEJ1aWx0aW5NYXRlcmlhbDogJ2NjLk1hdGVyaWFsVmFyaWFudC5jcmVhdGVXaXRoQnVpbHRpbicsXG4gICAgICAgIGdldEluc3RhbnRpYXRlZE1hdGVyaWFsOiAnY2MuTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZSdcbiAgICB9KTtcblxuICAgIC8vIGNjLlJlbmRlckNvbXBvbmVudFxuICAgIGNjLmpzLmdldHNldChjYy5SZW5kZXJDb21wb25lbnQucHJvdG90eXBlLCAnc2hhcmVkTWF0ZXJpYWxzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy53YXJuSUQoMTQwMCwgJ3NoYXJlZE1hdGVyaWFscycsICdnZXRNYXRlcmlhbHMnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0ZXJpYWxzO1xuICAgIH0sIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGNjLndhcm5JRCgxNDAwLCAnc2hhcmVkTWF0ZXJpYWxzJywgJ3NldE1hdGVyaWFsJyk7XG4gICAgICAgIHRoaXMubWF0ZXJpYWxzID0gdjtcbiAgICB9KVxuXG4gICAgLy8gY2MuQ2FtZXJhXG4gICAgbWFya0Z1bmN0aW9uV2FybmluZyhjYy5DYW1lcmEucHJvdG90eXBlLCB7XG4gICAgICAgIGdldE5vZGVUb0NhbWVyYVRyYW5zZm9ybTogJ2dldFdvcmxkVG9TY3JlZW5NYXRyaXgyRCcsXG4gICAgICAgIGdldENhbWVyYVRvV29ybGRQb2ludDogJ2dldFNjcmVlblRvV29ybGRQb2ludCcsXG4gICAgICAgIGdldFdvcmxkVG9DYW1lcmFQb2ludDogJ2dldFdvcmxkVG9TY3JlZW5Qb2ludCcsXG4gICAgICAgIGdldENhbWVyYVRvV29ybGRNYXRyaXg6ICdnZXRTY3JlZW5Ub1dvcmxkTWF0cml4MkQnLFxuICAgICAgICBnZXRXb3JsZFRvQ2FtZXJhTWF0cml4OiAnZ2V0V29ybGRUb1NjcmVlbk1hdHJpeDJEJ1xuICAgIH0pO1xuXG4gICAgbWFya0FzUmVtb3ZlZChjYy5DYW1lcmEsIFtcbiAgICAgICAgJ2FkZFRhcmdldCcsXG4gICAgICAgICdyZW1vdmVUYXJnZXQnLFxuICAgICAgICAnZ2V0VGFyZ2V0cydcbiAgICBdKTtcblxuICAgIC8vIFNDRU5FXG4gICAgdmFyIEVSUiA9ICdcIiVzXCIgaXMgbm90IGRlZmluZWQgaW4gdGhlIFNjZW5lLCBpdCBpcyBvbmx5IGRlZmluZWQgaW4gbm9ybWFsIG5vZGVzLic7XG4gICAgQ0NfRURJVE9SIHx8IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNjLlNjZW5lLnByb3RvdHlwZSwge1xuICAgICAgICBhY3RpdmU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNjLmVycm9yKEVSUiwgJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNjLmVycm9yKEVSUiwgJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhY3RpdmVJbkhpZXJhcmNoeToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoRVJSLCAnYWN0aXZlSW5IaWVyYXJjaHknKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGdldENvbXBvbmVudDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoRVJSLCAnZ2V0Q29tcG9uZW50Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYWRkQ29tcG9uZW50OiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihFUlIsICdhZGRDb21wb25lbnQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gY2MuZHluYW1pY0F0bGFzTWFuYWdlclxuICAgIG1hcmtBc1JlbW92ZWRJbk9iamVjdChjYy5keW5hbWljQXRsYXNNYW5hZ2VyLCBbXG4gICAgICAgICdtaW5GcmFtZVNpemUnXG4gICAgXSwgJ2NjLmR5bmFtaWNBdGxhc01hbmFnZXInKVxuXG4gICAgLy8gbGlnaHQgY29tcG9uZW50XG4gICAgaWYgKGNjLkxpZ2h0KSB7XG4gICAgICAgIG1hcmtBc1JlbW92ZWRJbk9iamVjdChjYy5MaWdodC5wcm90b3R5cGUsIFtcbiAgICAgICAgICAgICdzaGFkb3dEZXB0aFNjYWxlJyxcbiAgICAgICAgXSwgJ2NjLkxpZ2h0LnByb3RvdHlwZScpO1xuICAgIH1cblxuICAgIC8vIFZhbHVlIHR5cGVzXG4gICAgcHJvdmlkZUNsZWFyRXJyb3IoY2MsIHtcbiAgICAgICAgLy8gQWZmaW5lVHJhbnNmb3JtXG4gICAgICAgIGFmZmluZVRyYW5zZm9ybU1ha2U6ICdjYy5BZmZpbmVUcmFuc2Zvcm0uY3JlYXRlJyxcbiAgICAgICAgYWZmaW5lVHJhbnNmb3JtTWFrZUlkZW50aXR5OiAnY2MuQWZmaW5lVHJhbnNmb3JtLmlkZW50aXR5JyxcbiAgICAgICAgYWZmaW5lVHJhbnNmb3JtQ2xvbmU6ICdjYy5BZmZpbmVUcmFuc2Zvcm0uY2xvbmUnLFxuICAgICAgICBhZmZpbmVUcmFuc2Zvcm1Db25jYXQ6ICdjYy5BZmZpbmVUcmFuc2Zvcm0uY29uY2F0JyxcbiAgICAgICAgYWZmaW5lVHJhbnNmb3JtQ29uY2F0SW46ICdjYy5BZmZpbmVUcmFuc2Zvcm0uY29uY2F0JyxcbiAgICAgICAgYWZmaW5lVHJhbnNmb3JtSW52ZXJ0OiAnY2MuQWZmaW5lVHJhbnNmb3JtLmludmVydCcsXG4gICAgICAgIGFmZmluZVRyYW5zZm9ybUludmVydEluOiAnY2MuQWZmaW5lVHJhbnNmb3JtLmludmVydCcsXG4gICAgICAgIGFmZmluZVRyYW5zZm9ybUludmVydE91dDogJ2NjLkFmZmluZVRyYW5zZm9ybS5pbnZlcnQnLFxuICAgICAgICBhZmZpbmVUcmFuc2Zvcm1FcXVhbFRvVHJhbnNmb3JtOiAnY2MuQWZmaW5lVHJhbnNmb3JtLmVxdWFsJyxcbiAgICAgICAgcG9pbnRBcHBseUFmZmluZVRyYW5zZm9ybTogJ2NjLkFmZmluZVRyYW5zZm9ybS50cmFuc2Zvcm1WZWMyJyxcbiAgICAgICAgc2l6ZUFwcGx5QWZmaW5lVHJhbnNmb3JtOiAnY2MuQWZmaW5lVHJhbnNmb3JtLnRyYW5zZm9ybVNpemUnLFxuICAgICAgICByZWN0QXBwbHlBZmZpbmVUcmFuc2Zvcm06ICdjYy5BZmZpbmVUcmFuc2Zvcm0udHJhbnNmb3JtUmVjdCcsXG4gICAgICAgIG9iYkFwcGx5QWZmaW5lVHJhbnNmb3JtOiAnY2MuQWZmaW5lVHJhbnNmb3JtLnRyYW5zZm9ybU9iYicsXG5cbiAgICAgICAgLy8gVmVjMlxuICAgICAgICBwb2ludEVxdWFsVG9Qb2ludDogJ2NjLlZlYzIgZXF1YWxzJyxcblxuICAgICAgICAvLyBTaXplXG4gICAgICAgIHNpemVFcXVhbFRvU2l6ZTogJ2NjLlNpemUgZXF1YWxzJyxcblxuICAgICAgICAvLyBSZWN0XG4gICAgICAgIHJlY3RFcXVhbFRvUmVjdDogJ3JlY3RBLmVxdWFscyhyZWN0QiknLFxuICAgICAgICByZWN0Q29udGFpbnNSZWN0OiAncmVjdEEuY29udGFpbnNSZWN0KHJlY3RCKScsXG4gICAgICAgIHJlY3RDb250YWluc1BvaW50OiAncmVjdC5jb250YWlucyh2ZWMyKScsXG4gICAgICAgIHJlY3RPdmVybGFwc1JlY3Q6ICdyZWN0QS5pbnRlcnNlY3RzKHJlY3RCKScsXG4gICAgICAgIHJlY3RJbnRlcnNlY3RzUmVjdDogJ3JlY3RBLmludGVyc2VjdHMocmVjdEIpJyxcbiAgICAgICAgcmVjdEludGVyc2VjdGlvbjogJ3JlY3RBLmludGVyc2VjdGlvbihpbnRlcnNlY3Rpb24sIHJlY3RCKScsXG4gICAgICAgIHJlY3RVbmlvbjogJ3JlY3RBLnVuaW9uKHVuaW9uLCByZWN0QiknLFxuICAgICAgICByZWN0R2V0TWF4WDogJ3JlY3QueE1heCcsXG4gICAgICAgIHJlY3RHZXRNaWRYOiAncmVjdC5jZW50ZXIueCcsXG4gICAgICAgIHJlY3RHZXRNaW5YOiAncmVjdC54TWluJyxcbiAgICAgICAgcmVjdEdldE1heFk6ICdyZWN0LnlNYXgnLFxuICAgICAgICByZWN0R2V0TWlkWTogJ3JlY3QuY2VudGVyLnknLFxuICAgICAgICByZWN0R2V0TWluWTogJ3JlY3QueU1pbicsXG5cbiAgICAgICAgLy8gQ29sb3JcbiAgICAgICAgY29sb3JFcXVhbDogJ2NvbG9yQS5lcXVhbHMoY29sb3JCKScsXG4gICAgICAgIGhleFRvQ29sb3I6ICdjb2xvci5mcm9tSEVYKGhleENvbG9yKScsXG4gICAgICAgIGNvbG9yVG9IZXg6ICdjb2xvci50b0hFWCgpJyxcblxuICAgICAgICAvLyBFbnVtc1xuICAgICAgICBUZXh0QWxpZ25tZW50OiAnY2MubWFjcm8uVGV4dEFsaWdubWVudCcsXG4gICAgICAgIFZlcnRpY2FsVGV4dEFsaWdubWVudDogJ2NjLm1hY3JvLlZlcnRpY2FsVGV4dEFsaWdubWVudCcsXG5cbiAgICAgICAgLy8gUG9pbnQgRXh0ZW5zaW9uc1xuICAgICAgICBwTmVnOiAncC5uZWcoKScsXG4gICAgICAgIHBBZGQ6ICdwMS5hZGQocDIpJyxcbiAgICAgICAgcFN1YjogJ3AxLnN1YihwMiknLFxuICAgICAgICBwTXVsdDogJ3AubXVsKGZhY3RvciknLFxuICAgICAgICBwTWlkcG9pbnQ6ICdwMS5hZGQocDIpLm11bCgwLjUpJyxcbiAgICAgICAgcERvdDogJ3AxLmRvdChwMiknLFxuICAgICAgICBwQ3Jvc3M6ICdwMS5jcm9zcyhwMiknLFxuICAgICAgICBwUGVycDogJ3Aucm90YXRlKC05MCAqIE1hdGguUEkgLyAxODApJyxcbiAgICAgICAgcFJQZXJwOiAncC5yb3RhdGUoOTAgKiBNYXRoLlBJIC8gMTgwKScsXG4gICAgICAgIHBQcm9qZWN0OiAncDEucHJvamVjdChwMiknLFxuICAgICAgICBwTGVuZ3RoU1E6ICdwLm1hZ1NxcigpJyxcbiAgICAgICAgcERpc3RhbmNlU1E6ICdwMS5zdWIocDIpLm1hZ1NxcigpJyxcbiAgICAgICAgcExlbmd0aDogJ3AubWFnKCknLFxuICAgICAgICBwRGlzdGFuY2U6ICdwMS5zdWIocDIpLm1hZygpJyxcbiAgICAgICAgcE5vcm1hbGl6ZTogJ3Aubm9ybWFsaXplKCknLFxuICAgICAgICBwRm9yQW5nbGU6ICdjYy52MihNYXRoLmNvcyhhKSwgTWF0aC5zaW4oYSkpJyxcbiAgICAgICAgcFRvQW5nbGU6ICdNYXRoLmF0YW4yKHYueSwgdi54KScsXG4gICAgICAgIHBaZXJvSW46ICdwLnggPSBwLnkgPSAwJyxcbiAgICAgICAgcEluOiAncDEuc2V0KHAyKScsXG4gICAgICAgIHBNdWx0SW46ICdwLm11bFNlbGYoZmFjdG9yKScsXG4gICAgICAgIHBTdWJJbjogJ3AxLnN1YlNlbGYocDIpJyxcbiAgICAgICAgcEFkZEluOiAncDEuYWRkU2VsZihwMiknLFxuICAgICAgICBwTm9ybWFsaXplSW46ICdwLm5vcm1hbGl6ZVNlbGYoKScsXG4gICAgICAgIHBTYW1lQXM6ICdwMS5lcXVhbHMocDIpJyxcbiAgICAgICAgcEFuZ2xlOiAndjEuYW5nbGUodjIpJyxcbiAgICAgICAgcEFuZ2xlU2lnbmVkOiAndjEuc2lnbkFuZ2xlKHYyKScsXG4gICAgICAgIHBSb3RhdGVCeUFuZ2xlOiAncC5yb3RhdGUocmFkaWFucyknLFxuICAgICAgICBwQ29tcE11bHQ6ICd2MS5kb3QodjIpJyxcbiAgICAgICAgcEZ1enp5RXF1YWw6ICd2MS5mdXp6eUVxdWFscyh2MiwgdG9sZXJhbmNlKScsXG4gICAgICAgIHBMZXJwOiAncC5sZXJwKGVuZFBvaW50LCByYXRpbyknLFxuICAgICAgICBwQ2xhbXA6ICdwLmNsYW1wZihtaW5faW5jbHVzaXZlLCBtYXhfaW5jbHVzaXZlKScsXG5cbiAgICAgICAgcmFuZDogJ01hdGgucmFuZG9tKCkgKiAweGZmZmZmZicsXG4gICAgICAgIHJhbmRvbU1pbnVzMVRvMTogJyhNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDInLFxuXG4gICAgICAgIGNvbnRhaW5lcjogJ2NjLmdhbWUuY29udGFpbmVyJyxcbiAgICAgICAgX2NhbnZhczogJ2NjLmdhbWUuY2FudmFzJyxcbiAgICAgICAgX3JlbmRlclR5cGU6ICdjYy5nYW1lLnJlbmRlclR5cGUnLFxuXG4gICAgICAgIF9nZXRFcnJvcjogJ2NjLmRlYnVnLmdldEVycm9yJyxcbiAgICAgICAgX2luaXREZWJ1Z1NldHRpbmc6ICdjYy5kZWJ1Zy5fcmVzZXREZWJ1Z1NldHRpbmcnLFxuICAgICAgICBEZWJ1Z01vZGU6ICdjYy5kZWJ1Zy5EZWJ1Z01vZGUnLFxuICAgIH0sICdjYycpO1xuICAgIG1hcmtBc1JlbW92ZWRJbk9iamVjdChjYywgW1xuICAgICAgICAnYmxlbmRGdW5jRGlzYWJsZScsXG5cbiAgICAgICAgJ3BGcm9tU2l6ZScsXG4gICAgICAgICdwQ29tcE9wJyxcbiAgICAgICAgJ3BJbnRlcnNlY3RQb2ludCcsXG4gICAgICAgICdwU2VnbWVudEludGVyc2VjdCcsXG4gICAgICAgICdwTGluZUludGVyc2VjdCcsXG5cbiAgICAgICAgJ29iYkFwcGx5TWF0cml4JyxcblxuICAgICAgICAnZ2V0SW1hZ2VGb3JtYXRCeURhdGEnLFxuXG4gICAgICAgICdpbml0RW5naW5lJyxcbiAgICBdLCAnY2MnKTtcbiAgICBtYXJrRnVuY3Rpb25XYXJuaW5nKGNjLCB7XG4gICAgICAgIC8vIGNjLnBcbiAgICAgICAgcDogJ2NjLnYyJ1xuICAgIH0sICdjYycpO1xuICAgIC8vIGNjLlJlY3RcbiAgICBwcm92aWRlQ2xlYXJFcnJvcihjYy5SZWN0LCB7XG4gICAgICAgIGNvbnRhaW46ICdyZWN0QS5jb250YWlucyhyZWN0QiknLFxuICAgICAgICB0cmFuc2Zvcm1NYXQ0OiAncmVjdC50cmFuc2Zvcm1NYXQ0KG91dCwgbWF0NCknXG4gICAgfSk7XG4gICAgLy8gY2MuQ29sb3JcbiAgICBwcm92aWRlQ2xlYXJFcnJvcihjYy5Db2xvciwge1xuICAgICAgICByZ2IyaHN2OiAnY29sb3IudG9IU1YoKScsXG4gICAgICAgIGhzdjJyZ2I6ICdjb2xvci5mcm9tSFNWKGgsIHMsIHYpJ1xuICAgIH0pO1xuICAgIG1hcmtGdW5jdGlvbldhcm5pbmcoY2MuQ29sb3IsIHtcbiAgICAgICAgZnJvbUhleDogJ2NjLkNvbG9yLmZyb21IRVgnLFxuICAgIH0pXG5cbiAgICAvLyBtYWNybyBmdW5jdGlvbnNcbiAgICBqcy5nZXQoY2MsICdsZXJwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5lcnJvcklEKDE0MDAsICdjYy5sZXJwJywgJ2NjLm1pc2MubGVycCcpO1xuICAgICAgICByZXR1cm4gY2MubWlzYy5sZXJwO1xuICAgIH0pO1xuICAgIGpzLmdldChjYywgJ3JhbmRvbTBUbzEnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmVycm9ySUQoMTQwMCwgJ2NjLnJhbmRvbTBUbzEnLCAnTWF0aC5yYW5kb20nKTtcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tO1xuICAgIH0pO1xuICAgIGpzLmdldChjYywgJ2RlZ3JlZXNUb1JhZGlhbnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmVycm9ySUQoMTQwMCwgJ2NjLmRlZ3JlZXNUb1JhZGlhbnMnLCAnY2MubWlzYy5kZWdyZWVzVG9SYWRpYW5zJyk7XG4gICAgICAgIHJldHVybiBjYy5taXNjLmRlZ3JlZXNUb1JhZGlhbnM7XG4gICAgfSk7XG4gICAganMuZ2V0KGNjLCAncmFkaWFuc1RvRGVncmVlcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZXJyb3JJRCgxNDAwLCAnY2MucmFkaWFuc1RvRGVncmVlcycsICdjYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMnKTtcbiAgICAgICAgcmV0dXJuIGNjLm1pc2MucmFkaWFuc1RvRGVncmVlcztcbiAgICB9KTtcbiAgICBqcy5nZXQoY2MsICdjbGFtcGYnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmVycm9ySUQoMTQwMCwgJ2NjLmNsYW1wZicsICdjYy5taXNjLmNsYW1wZicpO1xuICAgICAgICByZXR1cm4gY2MubWlzYy5jbGFtcGY7XG4gICAgfSk7XG4gICAganMuZ2V0KGNjLCAnY2xhbXAwMScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZXJyb3JJRCgxNDAwLCAnY2MuY2xhbXAwMScsICdjYy5taXNjLmNsYW1wMDEnKTtcbiAgICAgICAgcmV0dXJuIGNjLm1pc2MuY2xhbXAwMTtcbiAgICB9KTtcbiAgICBqcy5nZXQoY2MsICdJbWFnZUZvcm1hdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZXJyb3JJRCgxNDAwLCAnY2MuSW1hZ2VGb3JtYXQnLCAnY2MubWFjcm8uSW1hZ2VGb3JtYXQnKTtcbiAgICAgICAgcmV0dXJuIGNjLm1hY3JvLkltYWdlRm9ybWF0O1xuICAgIH0pO1xuICAgIGpzLmdldChjYywgJ0tFWScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZXJyb3JJRCgxNDAwLCAnY2MuS0VZJywgJ2NjLm1hY3JvLktFWScpO1xuICAgICAgICByZXR1cm4gY2MubWFjcm8uS0VZO1xuICAgIH0pO1xuICAgIGpzLmdldChjYywgJ0Vhc2luZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZXJyb3JJRCgxNDAwLCAnY2MuRWFzaW5nJywgJ2NjLmVhc2luZycpO1xuICAgICAgICByZXR1cm4gY2MuZWFzaW5nO1xuICAgIH0pO1xuXG4gICAgLy8gY2MuaXNDaGlsZENsYXNzT2ZcbiAgICBqcy5nZXQoY2MsICdpc0NoaWxkQ2xhc3NPZicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZXJyb3JJRCgxNDAwLCAnY2MuaXNDaGlsZENsYXNzT2YnLCAnY2MuanMuaXNDaGlsZENsYXNzT2YnKTtcbiAgICAgICAgcmV0dXJuIGNjLmpzLmlzQ2hpbGRDbGFzc09mO1xuICAgIH0pO1xuXG4gICAgLy8gZHJhZ29uIGJvbmVzXG4gICAgaWYgKHR5cGVvZiBkcmFnb25Cb25lcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAganMuZ2V0KGRyYWdvbkJvbmVzLkNDRmFjdG9yeSwgJ2dldEZhY3RvcnknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYy5lcnJvcklEKDE0MDAsICdkcmFnb25Cb25lcy5DQ0ZhY3RvcnkuZ2V0RmFjdG9yeScsICdkcmFnb25Cb25lcy5DQ0ZhY3RvcnkuZ2V0SW5zdGFuY2UnKTtcbiAgICAgICAgICAgIHJldHVybiBkcmFnb25Cb25lcy5DQ0ZhY3RvcnkuZ2V0SW5zdGFuY2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHJlbmRlckVuZ2luZVxuICAgIGNjLnJlbmRlcmVyLnJlbmRlckVuZ2luZSA9IHtcbiAgICAgICAgZ2V0IGdmeCAoKSB7XG4gICAgICAgICAgICBjYy53YXJuSUQoMTQwMCwgJ2NjLnJlbmRlcmVyLnJlbmRlckVuZ2luZS5nZngnLCAnY2MuZ2Z4Jyk7XG4gICAgICAgICAgICByZXR1cm4gY2MuZ2Z4O1xuICAgICAgICB9LFxuICAgICAgICBnZXQgbWF0aCAoKSB7XG4gICAgICAgICAgICBjYy53YXJuSUQoMTQwMCwgJ2NjLnJlbmRlcmVyLnJlbmRlckVuZ2luZS5tYXRoJywgJ2NjLm1hdGgnKTtcbiAgICAgICAgICAgIHJldHVybiBjYy52bWF0aDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IElucHV0QXNzZW1ibGVyICgpIHtcbiAgICAgICAgICAgIGNjLndhcm5JRCgxNDAwLCAnY2MucmVuZGVyZXIucmVuZGVyRW5naW5lLklucHV0QXNzZW1ibGVyJywgJ2NjLnJlbmRlcmVyLklucHV0QXNzZW1ibGVyJyk7XG4gICAgICAgICAgICByZXR1cm4gY2MucmVuZGVyZXIuSW5wdXRBc3NlbWJsZXI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIC8vIGF1ZGlvXG4gICAgbWFya0FzUmVtb3ZlZEluT2JqZWN0KGNjLmF1ZGlvRW5naW5lLCBbXG4gICAgICAgICdnZXRQcm9maWxlJyxcbiAgICAgICAgJ3ByZWxvYWQnLFxuICAgICAgICAnc2V0TWF4V2ViQXVkaW9TaXplJyxcbiAgICBdLCAnY2MuYXVkaW9FbmdpbmUnKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9