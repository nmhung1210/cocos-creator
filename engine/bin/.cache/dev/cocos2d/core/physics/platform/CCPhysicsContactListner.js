
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/platform/CCPhysicsContactListner.js';
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
function PhysicsContactListener() {
  this._contactFixtures = [];
}

PhysicsContactListener.prototype.setBeginContact = function (cb) {
  this._BeginContact = cb;
};

PhysicsContactListener.prototype.setEndContact = function (cb) {
  this._EndContact = cb;
};

PhysicsContactListener.prototype.setPreSolve = function (cb) {
  this._PreSolve = cb;
};

PhysicsContactListener.prototype.setPostSolve = function (cb) {
  this._PostSolve = cb;
};

PhysicsContactListener.prototype.BeginContact = function (contact) {
  if (!this._BeginContact) return;
  var fixtureA = contact.GetFixtureA();
  var fixtureB = contact.GetFixtureB();
  var fixtures = this._contactFixtures;
  contact._shouldReport = false;

  if (fixtures.indexOf(fixtureA) !== -1 || fixtures.indexOf(fixtureB) !== -1) {
    contact._shouldReport = true; // for quick check whether this contact should report

    this._BeginContact(contact);
  }
};

PhysicsContactListener.prototype.EndContact = function (contact) {
  if (this._EndContact && contact._shouldReport) {
    contact._shouldReport = false;

    this._EndContact(contact);
  }
};

PhysicsContactListener.prototype.PreSolve = function (contact, oldManifold) {
  if (this._PreSolve && contact._shouldReport) {
    this._PreSolve(contact, oldManifold);
  }
};

PhysicsContactListener.prototype.PostSolve = function (contact, impulse) {
  if (this._PostSolve && contact._shouldReport) {
    this._PostSolve(contact, impulse);
  }
};

PhysicsContactListener.prototype.registerContactFixture = function (fixture) {
  this._contactFixtures.push(fixture);
};

PhysicsContactListener.prototype.unregisterContactFixture = function (fixture) {
  cc.js.array.remove(this._contactFixtures, fixture);
};

cc.PhysicsContactListener = module.exports = PhysicsContactListener;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3MvcGxhdGZvcm0vQ0NQaHlzaWNzQ29udGFjdExpc3RuZXIuanMiXSwibmFtZXMiOlsiUGh5c2ljc0NvbnRhY3RMaXN0ZW5lciIsIl9jb250YWN0Rml4dHVyZXMiLCJwcm90b3R5cGUiLCJzZXRCZWdpbkNvbnRhY3QiLCJjYiIsIl9CZWdpbkNvbnRhY3QiLCJzZXRFbmRDb250YWN0IiwiX0VuZENvbnRhY3QiLCJzZXRQcmVTb2x2ZSIsIl9QcmVTb2x2ZSIsInNldFBvc3RTb2x2ZSIsIl9Qb3N0U29sdmUiLCJCZWdpbkNvbnRhY3QiLCJjb250YWN0IiwiZml4dHVyZUEiLCJHZXRGaXh0dXJlQSIsImZpeHR1cmVCIiwiR2V0Rml4dHVyZUIiLCJmaXh0dXJlcyIsIl9zaG91bGRSZXBvcnQiLCJpbmRleE9mIiwiRW5kQ29udGFjdCIsIlByZVNvbHZlIiwib2xkTWFuaWZvbGQiLCJQb3N0U29sdmUiLCJpbXB1bHNlIiwicmVnaXN0ZXJDb250YWN0Rml4dHVyZSIsImZpeHR1cmUiLCJwdXNoIiwidW5yZWdpc3RlckNvbnRhY3RGaXh0dXJlIiwiY2MiLCJqcyIsImFycmF5IiwicmVtb3ZlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsU0FBU0Esc0JBQVQsR0FBbUM7QUFDL0IsT0FBS0MsZ0JBQUwsR0FBd0IsRUFBeEI7QUFDSDs7QUFFREQsc0JBQXNCLENBQUNFLFNBQXZCLENBQWlDQyxlQUFqQyxHQUFtRCxVQUFVQyxFQUFWLEVBQWM7QUFDN0QsT0FBS0MsYUFBTCxHQUFxQkQsRUFBckI7QUFDSCxDQUZEOztBQUlBSixzQkFBc0IsQ0FBQ0UsU0FBdkIsQ0FBaUNJLGFBQWpDLEdBQWlELFVBQVVGLEVBQVYsRUFBYztBQUMzRCxPQUFLRyxXQUFMLEdBQW1CSCxFQUFuQjtBQUNILENBRkQ7O0FBSUFKLHNCQUFzQixDQUFDRSxTQUF2QixDQUFpQ00sV0FBakMsR0FBK0MsVUFBVUosRUFBVixFQUFjO0FBQ3pELE9BQUtLLFNBQUwsR0FBaUJMLEVBQWpCO0FBQ0gsQ0FGRDs7QUFJQUosc0JBQXNCLENBQUNFLFNBQXZCLENBQWlDUSxZQUFqQyxHQUFnRCxVQUFVTixFQUFWLEVBQWM7QUFDMUQsT0FBS08sVUFBTCxHQUFrQlAsRUFBbEI7QUFDSCxDQUZEOztBQUlBSixzQkFBc0IsQ0FBQ0UsU0FBdkIsQ0FBaUNVLFlBQWpDLEdBQWdELFVBQVVDLE9BQVYsRUFBbUI7QUFDL0QsTUFBSSxDQUFDLEtBQUtSLGFBQVYsRUFBeUI7QUFFekIsTUFBSVMsUUFBUSxHQUFHRCxPQUFPLENBQUNFLFdBQVIsRUFBZjtBQUNBLE1BQUlDLFFBQVEsR0FBR0gsT0FBTyxDQUFDSSxXQUFSLEVBQWY7QUFDQSxNQUFJQyxRQUFRLEdBQUcsS0FBS2pCLGdCQUFwQjtBQUVBWSxFQUFBQSxPQUFPLENBQUNNLGFBQVIsR0FBd0IsS0FBeEI7O0FBRUEsTUFBSUQsUUFBUSxDQUFDRSxPQUFULENBQWlCTixRQUFqQixNQUErQixDQUFDLENBQWhDLElBQXFDSSxRQUFRLENBQUNFLE9BQVQsQ0FBaUJKLFFBQWpCLE1BQStCLENBQUMsQ0FBekUsRUFBNEU7QUFDeEVILElBQUFBLE9BQU8sQ0FBQ00sYUFBUixHQUF3QixJQUF4QixDQUR3RSxDQUMxQzs7QUFDOUIsU0FBS2QsYUFBTCxDQUFtQlEsT0FBbkI7QUFDSDtBQUNKLENBYkQ7O0FBZUFiLHNCQUFzQixDQUFDRSxTQUF2QixDQUFpQ21CLFVBQWpDLEdBQThDLFVBQVVSLE9BQVYsRUFBbUI7QUFDN0QsTUFBSSxLQUFLTixXQUFMLElBQW9CTSxPQUFPLENBQUNNLGFBQWhDLEVBQStDO0FBQzNDTixJQUFBQSxPQUFPLENBQUNNLGFBQVIsR0FBd0IsS0FBeEI7O0FBQ0EsU0FBS1osV0FBTCxDQUFpQk0sT0FBakI7QUFDSDtBQUNKLENBTEQ7O0FBT0FiLHNCQUFzQixDQUFDRSxTQUF2QixDQUFpQ29CLFFBQWpDLEdBQTRDLFVBQVVULE9BQVYsRUFBbUJVLFdBQW5CLEVBQWdDO0FBQ3hFLE1BQUksS0FBS2QsU0FBTCxJQUFrQkksT0FBTyxDQUFDTSxhQUE5QixFQUE2QztBQUN6QyxTQUFLVixTQUFMLENBQWVJLE9BQWYsRUFBd0JVLFdBQXhCO0FBQ0g7QUFDSixDQUpEOztBQU1BdkIsc0JBQXNCLENBQUNFLFNBQXZCLENBQWlDc0IsU0FBakMsR0FBNkMsVUFBVVgsT0FBVixFQUFtQlksT0FBbkIsRUFBNEI7QUFDckUsTUFBSSxLQUFLZCxVQUFMLElBQW1CRSxPQUFPLENBQUNNLGFBQS9CLEVBQThDO0FBQzFDLFNBQUtSLFVBQUwsQ0FBZ0JFLE9BQWhCLEVBQXlCWSxPQUF6QjtBQUNIO0FBQ0osQ0FKRDs7QUFNQXpCLHNCQUFzQixDQUFDRSxTQUF2QixDQUFpQ3dCLHNCQUFqQyxHQUEwRCxVQUFVQyxPQUFWLEVBQW1CO0FBQ3pFLE9BQUsxQixnQkFBTCxDQUFzQjJCLElBQXRCLENBQTJCRCxPQUEzQjtBQUNILENBRkQ7O0FBSUEzQixzQkFBc0IsQ0FBQ0UsU0FBdkIsQ0FBaUMyQix3QkFBakMsR0FBNEQsVUFBVUYsT0FBVixFQUFtQjtBQUMzRUcsRUFBQUEsRUFBRSxDQUFDQyxFQUFILENBQU1DLEtBQU4sQ0FBWUMsTUFBWixDQUFtQixLQUFLaEMsZ0JBQXhCLEVBQTBDMEIsT0FBMUM7QUFDSCxDQUZEOztBQUlBRyxFQUFFLENBQUM5QixzQkFBSCxHQUE0QmtDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQm5DLHNCQUE3QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuZnVuY3Rpb24gUGh5c2ljc0NvbnRhY3RMaXN0ZW5lciAoKSB7XG4gICAgdGhpcy5fY29udGFjdEZpeHR1cmVzID0gW107XG59XG5cblBoeXNpY3NDb250YWN0TGlzdGVuZXIucHJvdG90eXBlLnNldEJlZ2luQ29udGFjdCA9IGZ1bmN0aW9uIChjYikge1xuICAgIHRoaXMuX0JlZ2luQ29udGFjdCA9IGNiO1xufTtcblxuUGh5c2ljc0NvbnRhY3RMaXN0ZW5lci5wcm90b3R5cGUuc2V0RW5kQ29udGFjdCA9IGZ1bmN0aW9uIChjYikge1xuICAgIHRoaXMuX0VuZENvbnRhY3QgPSBjYjtcbn07XG5cblBoeXNpY3NDb250YWN0TGlzdGVuZXIucHJvdG90eXBlLnNldFByZVNvbHZlID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgdGhpcy5fUHJlU29sdmUgPSBjYjtcbn07XG5cblBoeXNpY3NDb250YWN0TGlzdGVuZXIucHJvdG90eXBlLnNldFBvc3RTb2x2ZSA9IGZ1bmN0aW9uIChjYikge1xuICAgIHRoaXMuX1Bvc3RTb2x2ZSA9IGNiO1xufTtcblxuUGh5c2ljc0NvbnRhY3RMaXN0ZW5lci5wcm90b3R5cGUuQmVnaW5Db250YWN0ID0gZnVuY3Rpb24gKGNvbnRhY3QpIHtcbiAgICBpZiAoIXRoaXMuX0JlZ2luQ29udGFjdCkgcmV0dXJuO1xuXG4gICAgdmFyIGZpeHR1cmVBID0gY29udGFjdC5HZXRGaXh0dXJlQSgpO1xuICAgIHZhciBmaXh0dXJlQiA9IGNvbnRhY3QuR2V0Rml4dHVyZUIoKTtcbiAgICB2YXIgZml4dHVyZXMgPSB0aGlzLl9jb250YWN0Rml4dHVyZXM7XG4gICAgXG4gICAgY29udGFjdC5fc2hvdWxkUmVwb3J0ID0gZmFsc2U7XG4gICAgXG4gICAgaWYgKGZpeHR1cmVzLmluZGV4T2YoZml4dHVyZUEpICE9PSAtMSB8fCBmaXh0dXJlcy5pbmRleE9mKGZpeHR1cmVCKSAhPT0gLTEpIHtcbiAgICAgICAgY29udGFjdC5fc2hvdWxkUmVwb3J0ID0gdHJ1ZTsgLy8gZm9yIHF1aWNrIGNoZWNrIHdoZXRoZXIgdGhpcyBjb250YWN0IHNob3VsZCByZXBvcnRcbiAgICAgICAgdGhpcy5fQmVnaW5Db250YWN0KGNvbnRhY3QpO1xuICAgIH1cbn07XG5cblBoeXNpY3NDb250YWN0TGlzdGVuZXIucHJvdG90eXBlLkVuZENvbnRhY3QgPSBmdW5jdGlvbiAoY29udGFjdCkge1xuICAgIGlmICh0aGlzLl9FbmRDb250YWN0ICYmIGNvbnRhY3QuX3Nob3VsZFJlcG9ydCkge1xuICAgICAgICBjb250YWN0Ll9zaG91bGRSZXBvcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fRW5kQ29udGFjdChjb250YWN0KTtcbiAgICB9XG59O1xuXG5QaHlzaWNzQ29udGFjdExpc3RlbmVyLnByb3RvdHlwZS5QcmVTb2x2ZSA9IGZ1bmN0aW9uIChjb250YWN0LCBvbGRNYW5pZm9sZCkge1xuICAgIGlmICh0aGlzLl9QcmVTb2x2ZSAmJiBjb250YWN0Ll9zaG91bGRSZXBvcnQpIHtcbiAgICAgICAgdGhpcy5fUHJlU29sdmUoY29udGFjdCwgb2xkTWFuaWZvbGQpO1xuICAgIH1cbn07XG5cblBoeXNpY3NDb250YWN0TGlzdGVuZXIucHJvdG90eXBlLlBvc3RTb2x2ZSA9IGZ1bmN0aW9uIChjb250YWN0LCBpbXB1bHNlKSB7XG4gICAgaWYgKHRoaXMuX1Bvc3RTb2x2ZSAmJiBjb250YWN0Ll9zaG91bGRSZXBvcnQpIHtcbiAgICAgICAgdGhpcy5fUG9zdFNvbHZlKGNvbnRhY3QsIGltcHVsc2UpO1xuICAgIH1cbn07XG5cblBoeXNpY3NDb250YWN0TGlzdGVuZXIucHJvdG90eXBlLnJlZ2lzdGVyQ29udGFjdEZpeHR1cmUgPSBmdW5jdGlvbiAoZml4dHVyZSkge1xuICAgIHRoaXMuX2NvbnRhY3RGaXh0dXJlcy5wdXNoKGZpeHR1cmUpO1xufTtcblxuUGh5c2ljc0NvbnRhY3RMaXN0ZW5lci5wcm90b3R5cGUudW5yZWdpc3RlckNvbnRhY3RGaXh0dXJlID0gZnVuY3Rpb24gKGZpeHR1cmUpIHtcbiAgICBjYy5qcy5hcnJheS5yZW1vdmUodGhpcy5fY29udGFjdEZpeHR1cmVzLCBmaXh0dXJlKTtcbn07XG5cbmNjLlBoeXNpY3NDb250YWN0TGlzdGVuZXIgPSBtb2R1bGUuZXhwb3J0cyA9IFBoeXNpY3NDb250YWN0TGlzdGVuZXI7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==