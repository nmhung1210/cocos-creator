class o extends Editor.Gizmo{constructor(o,r){super(o,r),this._proxyTransformGizmo=null}layer(){return"foreground"}onKeyDown(o){}onKeyUp(o){}onGizmoKeyDown(o){this._proxyTransformGizmo&&this._proxyTransformGizmo.onGizmoKeyDown(o)}onGizmoKeyUp(o){this._proxyTransformGizmo&&this._proxyTransformGizmo.onGizmoKeyUp(o)}visible(){return o.show}dirty(){return!0}onUpdate(){this._proxyTransformGizmo&&this._proxyTransformGizmo.updateControllerTransform()}onTargetUpdate(){this._proxyTransformGizmo&&(this._proxyTransformGizmo.target=this.target)}onShow(){this._proxyTransformGizmo&&this._proxyTransformGizmo.onShow()}onHide(){this._proxyTransformGizmo&&this._proxyTransformGizmo.onHide()}}o.show=!0,module.exports=o;