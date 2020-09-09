
(function () {
var scripts = [{"deps":{},"path":"engine-dev/index.js"},{"deps":{},"path":"engine-dev/polyfill/array.js"},{"deps":{},"path":"engine-dev/predefine.js"},{"deps":{},"path":"engine-dev/extends.js"},{"deps":{},"path":"engine-dev/polyfill/string.js"},{"deps":{},"path":"engine-dev/polyfill/array-buffer.js"},{"deps":{},"path":"engine-dev/polyfill/object.js"},{"deps":{},"path":"engine-dev/polyfill/number.js"},{"deps":{},"path":"engine-dev/polyfill/misc.js"},{"deps":{},"path":"engine-dev/package.js"},{"deps":{},"path":"engine-dev/polyfill/typescript.js"},{"deps":{},"path":"engine-dev/cocos2d/core/predefine.js"},{"deps":{},"path":"engine-dev/cocos2d/index.js"},{"deps":{},"path":"engine-dev/cocos2d/tilemap/CCTiledMapAsset.js"},{"deps":{},"path":"engine-dev/cocos2d/particle/CCParticleAsset.js"},{"deps":{},"path":"engine-dev/cocos2d/webview/CCWebView.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCStudioComponent.js"},{"deps":{},"path":"engine-dev/cocos2d/videoplayer/CCVideoPlayer.js"},{"deps":{},"path":"engine-dev/cocos2d/deprecated.js"},{"deps":{},"path":"engine-dev/extensions/ccpool/CCNodePool.js"},{"deps":{},"path":"engine-dev/cocos2d/particle/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/index.js"},{"deps":{},"path":"engine-dev/cocos2d/tilemap/index.js"},{"deps":{},"path":"engine-dev/cocos2d/animation/index.js"},{"deps":{},"path":"engine-dev/extensions/spine/index.js"},{"deps":{},"path":"engine-dev/cocos2d/actions/index.js"},{"deps":{},"path":"engine-dev/extensions/dragonbones/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/CCInputExtension.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/CCScreen.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/CCInputManager.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/js.js"},{"deps":{},"path":"engine-dev/cocos2d/core/CCScheduler.js"},{"deps":{},"path":"engine-dev/cocos2d/core/CCGame.js"},{"deps":{},"path":"engine-dev/cocos2d/core/CCDirector.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/CCSys.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/CCMacro.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/event/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/event-manager/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/CCView.js"},{"deps":{},"path":"engine-dev/cocos2d/core/value-types/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/CCAsset.js"},{"deps":{},"path":"engine-dev/cocos2d/webview/webview-impl.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/prefab-helper.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/CCSpriteFrame.js"},{"deps":{},"path":"engine-dev/cocos2d/videoplayer/video-player-impl.js"},{"deps":{},"path":"engine-dev/cocos2d/particle/particle-system-assembler.js"},{"deps":{},"path":"engine-dev/cocos2d/core/CCPrivateNode.js"},{"deps":{},"path":"engine-dev/cocos2d/core/CCScene.js"},{"deps":{},"path":"engine-dev/cocos2d/tilemap/CCTiledMapRenderDataList.js"},{"deps":{},"path":"engine-dev/cocos2d/animation/bezier.js"},{"deps":{},"path":"engine-dev/cocos2d/tilemap/tiledmap-buffer.js"},{"deps":{},"path":"engine-dev/cocos2d/animation/types.js"},{"deps":{},"path":"engine-dev/cocos2d/animation/animation-manager.js"},{"deps":{},"path":"engine-dev/extensions/spine/skeleton-texture.js"},{"deps":{},"path":"engine-dev/cocos2d/animation/animation-animator.js"},{"deps":{},"path":"engine-dev/extensions/spine/vertex-effect-delegate.js"},{"deps":{},"path":"engine-dev/extensions/dragonbones/CCFactory.js"},{"deps":{},"path":"engine-dev/extensions/dragonbones/CCArmatureDisplay.js"},{"deps":{},"path":"engine-dev/extensions/dragonbones/CCTextureData.js"},{"deps":{},"path":"engine-dev/extensions/dragonbones/DragonBonesAsset.js"},{"deps":{},"path":"engine-dev/extensions/dragonbones/DragonBonesAtlasAsset.js"},{"deps":{},"path":"engine-dev/cocos2d/particle/particle-simulator.js"},{"deps":{},"path":"engine-dev/cocos2d/core/collider/CCIntersection.js"},{"deps":{},"path":"engine-dev/cocos2d/tilemap/tmx-layer-assembler.js"},{"deps":{},"path":"engine-dev/cocos2d/animation/animation-clip.js"},{"deps":{},"path":"engine-dev/cocos2d/animation/animation-state.js"},{"deps":{},"path":"engine-dev/cocos2d/animation/animation-curves.js"},{"deps":{},"path":"engine-dev/cocos2d/animation/motion-path-helper.js"},{"deps":{},"path":"engine-dev/extensions/spine/skeleton-data.js"},{"deps":{},"path":"engine-dev/cocos2d/actions/CCActionInstant.js"},{"deps":{},"path":"engine-dev/cocos2d/actions/CCActionCatmullRom.js"},{"deps":{},"path":"engine-dev/extensions/dragonbones/CCSlot.js"},{"deps":{},"path":"engine-dev/extensions/dragonbones/webgl-assembler.js"},{"deps":{},"path":"engine-dev/cocos2d/core/base-ui/CCWidgetManager.js"},{"deps":{},"path":"engine-dev/cocos2d/animation/easing.js"},{"deps":{},"path":"engine-dev/cocos2d/actions/CCActionManager.js"},{"deps":{},"path":"engine-dev/cocos2d/actions/CCAction.js"},{"deps":{},"path":"engine-dev/cocos2d/actions/tween.js"},{"deps":{},"path":"engine-dev/extensions/dragonbones/ArmatureCache.js"},{"deps":{},"path":"engine-dev/cocos2d/core/camera/CCCamera.js"},{"deps":{},"path":"engine-dev/cocos2d/tilemap/CCTiledMap.js"},{"deps":{},"path":"engine-dev/extensions/spine/spine-assembler.js"},{"deps":{},"path":"engine-dev/cocos2d/actions/CCActionEase.js"},{"deps":{},"path":"engine-dev/cocos2d/particle/CCParticleSystem.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/id-generater.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/collider/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/graphics/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/mesh/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/3d/index.js"},{"deps":{},"path":"engine-dev/extensions/spine/Skeleton.js"},{"deps":{},"path":"engine-dev/extensions/dragonbones/ArmatureDisplay.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/mutable-forward-iterator.js"},{"deps":{},"path":"engine-dev/cocos2d/core/event/event-target.js"},{"deps":{},"path":"engine-dev/cocos2d/core/CCDebug.js"},{"deps":{},"path":"engine-dev/cocos2d/core/node-activator.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/profiler/CCProfiler.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/find.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/CCPath.js"},{"deps":{},"path":"engine-dev/cocos2d/core/event/event-listeners.js"},{"deps":{},"path":"engine-dev/cocos2d/core/event/system-event.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/webgl/model-batcher.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/canvas/Device.js"},{"deps":{},"path":"engine-dev/cocos2d/core/event-manager/CCTouch.js"},{"deps":{},"path":"engine-dev/cocos2d/core/component-scheduler.js"},{"deps":{},"path":"engine-dev/cocos2d/audio/CCAudioEngine.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/CCObject.js"},{"deps":{},"path":"engine-dev/cocos2d/core/geom-utils/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/event/event.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/canvas/Texture2D.js"},{"deps":{},"path":"engine-dev/cocos2d/core/event-manager/CCEvent.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/utils/dynamic-atlas/manager.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/renderers/forward-renderer.js"},{"deps":{},"path":"engine-dev/cocos2d/core/event-manager/CCEventListener.js"},{"deps":{},"path":"engine-dev/cocos2d/actions/CCActionInterval.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/scene/scene.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/CCAssetManager.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/core/input-assembler.js"},{"deps":{},"path":"engine-dev/cocos2d/core/value-types/trs.js"},{"deps":{},"path":"engine-dev/cocos2d/core/value-types/utils.js"},{"deps":{},"path":"engine-dev/cocos2d/core/value-types/size.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/deprecated.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/gfx/index.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/core/pass.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/webgl/assemblers/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/canvas/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/value-types/rect.js"},{"deps":{},"path":"engine-dev/cocos2d/core/event-manager/CCEventManager.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/CCClass.js"},{"deps":{},"path":"engine-dev/cocos2d/core/value-types/mat3.js"},{"deps":{},"path":"engine-dev/cocos2d/core/value-types/color.js"},{"deps":{},"path":"engine-dev/cocos2d/core/value-types/quat.js"},{"deps":{},"path":"engine-dev/cocos2d/core/value-types/vec2.js"},{"deps":{},"path":"engine-dev/cocos2d/core/value-types/vec4.js"},{"deps":{},"path":"engine-dev/cocos2d/core/value-types/vec3.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/utils.js"},{"deps":{},"path":"engine-dev/cocos2d/core/CCNode.js"},{"deps":{},"path":"engine-dev/cocos2d/core/value-types/mat4.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/assembler.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/webgl/quad-buffer.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/webgl/vertex-format.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/render-flow.js"},{"deps":{},"path":"engine-dev/cocos2d/animation/playable.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/binary-search.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/misc.js"},{"deps":{},"path":"engine-dev/cocos2d/tilemap/CCTiledTile.js"},{"deps":{},"path":"engine-dev/extensions/spine/skeleton-cache.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/texture-util.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/blend-func.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCRenderComponent.js"},{"deps":{},"path":"engine-dev/cocos2d/compression/ZipUtils.js"},{"deps":{},"path":"engine-dev/cocos2d/tilemap/CCTiledObjectGroup.js"},{"deps":{},"path":"engine-dev/cocos2d/particle/CCPNGReader.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/material/CCMaterial.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/affine-transform.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/scene/camera.js"},{"deps":{},"path":"engine-dev/extensions/spine/track-entry-listeners.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/CCFont.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/CCScripts.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/CCSceneAsset.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/CCAudioClip.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/CCTTFFont.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/CCBitmapFont.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/CCSpriteAtlas.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/CCRenderTexture.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/CCTextAsset.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/CCLabelAtlas.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/CCBufferAsset.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/CCJsonAsset.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/CCEnum.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/requiring-frame.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/deserialize.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/CCVisibleRect.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCComponentEventHandler.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/missing-script.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCCanvas.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCPageViewIndicator.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCToggleContainer.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCLabelOutline.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCBlockInputEvents.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCLabelShadow.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCToggle.js"},{"deps":{},"path":"engine-dev/cocos2d/core/collider/CCCollider.js"},{"deps":{},"path":"engine-dev/cocos2d/core/collider/CCBoxCollider.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCToggleGroup.js"},{"deps":{},"path":"engine-dev/cocos2d/core/collider/CCCircleCollider.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCSafeArea.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/box2d-adapter.js"},{"deps":{},"path":"engine-dev/cocos2d/core/collider/CCPolygonCollider.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/collider/CCPhysicsChainCollider.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/joint/CCDistanceJoint.js"},{"deps":{},"path":"engine-dev/cocos2d/tilemap/CCTiledLayer.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/platform/CCPhysicsAABBQueryCallback.js"},{"deps":{},"path":"engine-dev/cocos2d/core/mesh/mesh-renderer.js"},{"deps":{},"path":"engine-dev/cocos2d/core/3d/skeleton/CCSkeleton.js"},{"deps":{},"path":"engine-dev/cocos2d/core/3d/actions.js"},{"deps":{},"path":"engine-dev/cocos2d/core/3d/CCModel.js"},{"deps":{},"path":"engine-dev/extensions/spine/AttachUtil.js"},{"deps":{},"path":"engine-dev/cocos2d/core/graphics/graphics.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/CCPrefab.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/instantiate.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/callbacks-invoker.js"},{"deps":{},"path":"engine-dev/cocos2d/particle/CCTIFFReader.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/SubContextView.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCAudioSource.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCProgressBar.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCMask.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCScrollBar.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCMotionStreak.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCSlider.js"},{"deps":{},"path":"engine-dev/cocos2d/core/collider/CCCollisionManager.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/CCPhysicsContact.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/collider/CCPhysicsCircleCollider.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/collider/CCPhysicsPolygonCollider.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/joint/CCRevoluteJoint.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/collider/CCPhysicsBoxCollider.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/joint/CCMotorJoint.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/joint/CCPrismaticJoint.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/joint/CCRopeJoint.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/joint/CCWheelJoint.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/platform/CCPhysicsRayCastCallback.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/joint/CCWeldJoint.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/joint/CCJoint.js"},{"deps":{},"path":"engine-dev/cocos2d/core/mesh/CCMeshRenderer.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/platform/CCPhysicsContactListner.js"},{"deps":{},"path":"engine-dev/cocos2d/core/3d/skeleton/CCSkeletonAnimation.js"},{"deps":{},"path":"engine-dev/cocos2d/core/3d/skeleton/skinned-mesh-renderer.js"},{"deps":{},"path":"engine-dev/cocos2d/core/3d/CCLightComponent.js"},{"deps":{},"path":"engine-dev/cocos2d/tilemap/CCTMXXMLParser.js"},{"deps":{},"path":"engine-dev/extensions/dragonbones/AttachUtil.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/CCClassDecorator.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/instantiate-jit.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCWidget.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCSprite.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCPageView.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/CCPhysicsManager.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/collider/CCPhysicsCollider.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/joint/CCMouseJoint.js"},{"deps":{},"path":"engine-dev/cocos2d/core/mesh/CCMesh.js"},{"deps":{},"path":"engine-dev/cocos2d/core/3d/skeleton/CCSkinnedMeshRenderer.js"},{"deps":{},"path":"engine-dev/cocos2d/core/3d/skeleton/CCSkeletonAnimationClip.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/scene/model.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/memop/recycle-pool.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/webgl/spine-buffer.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/profiler/perf-counter.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/webgl/mesh-buffer.js"},{"deps":{},"path":"engine-dev/cocos2d/audio/CCAudio.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCComponent.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCButton.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCAnimation.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCLabel.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/editbox/CCEditBox.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/enums.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/CCTexture2D.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCLayout.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCRichText.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/CCRigidBody.js"},{"deps":{},"path":"engine-dev/cocos2d/core/geom-utils/triangle.js"},{"deps":{},"path":"engine-dev/cocos2d/core/geom-utils/aabb.js"},{"deps":{},"path":"engine-dev/cocos2d/core/geom-utils/enums.js"},{"deps":{},"path":"engine-dev/cocos2d/core/geom-utils/sphere.js"},{"deps":{},"path":"engine-dev/cocos2d/core/geom-utils/distance.js"},{"deps":{},"path":"engine-dev/cocos2d/core/geom-utils/line.js"},{"deps":{},"path":"engine-dev/cocos2d/core/geom-utils/plane.js"},{"deps":{},"path":"engine-dev/cocos2d/core/geom-utils/ray.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/core/base-renderer.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/preprocess.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/fetch.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/releaseManager.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/cache.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/helper.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/builtins.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/factory.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/request-item.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/shared.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/utils/dynamic-atlas/atlas.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/material/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/geom-utils/frustum.js"},{"deps":{},"path":"engine-dev/cocos2d/core/geom-utils/obb.js"},{"deps":{},"path":"engine-dev/cocos2d/core/3d/physics/exports/physics-builtin.js"},{"deps":{},"path":"engine-dev/cocos2d/core/3d/particle/particle-system-3d.js"},{"deps":{},"path":"engine-dev/cocos2d/core/3d/physics/framework/assets/physics-material.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/depend-util.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/load.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/pipeline.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/pack-manager.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/task.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/urlTransformer.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/utilities.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/gfx/vertex-format.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/gfx/texture.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/gfx/index-buffer.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/gfx/vertex-buffer.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/gfx/program.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/gfx/frame-buffer.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/gfx/render-buffer.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/downloader.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/parser.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/CCScrollView.js"},{"deps":{},"path":"engine-dev/cocos2d/core/3d/physics/exports/physics-cannon.js"},{"deps":{},"path":"engine-dev/cocos2d/core/3d/physics/exports/physics-framework.js"},{"deps":{},"path":"engine-dev/cocos2d/core/3d/primitive/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/3d/particle/renderer/particle-system-3d-renderer.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/gfx/enums.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/gfx/texture-2d.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/gfx/texture-cube.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/canvas/forward-renderer.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/canvas/render-component-handle.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/canvas/render-flow.js"},{"deps":{},"path":"engine-dev/cocos2d/core/value-types/value-type.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/bundle.js"},{"deps":{},"path":"engine-dev/cocos2d/core/geom-utils/intersect.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/webgl/assemblers/mask-assembler.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/webgl/assemblers/motion-streak.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/memop/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/attribute.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/preprocess-class.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/gfx/device.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/canvas/renderers/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/webgl/assemblers/label/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/webgl/assemblers/sprite/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/assembler-pool.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/webgl/assemblers/graphics/index.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/base-node.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/trans-pool/index.js"},{"deps":{},"path":"engine-dev/cocos2d/compression/base64.js"},{"deps":{},"path":"engine-dev/cocos2d/compression/gzip.js"},{"deps":{},"path":"engine-dev/cocos2d/compression/zlib.min.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/material/material-variant.js"},{"deps":{},"path":"engine-dev/cocos2d/core/assets/material/CCEffectAsset.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/gray-sprite-state.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/CCSAXParser.js"},{"deps":{},"path":"engine-dev/cocos2d/core/graphics/types.js"},{"deps":{},"path":"engine-dev/cocos2d/core/graphics/helper.js"},{"deps":{},"path":"engine-dev/cocos2d/core/collider/CCContact.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/CCPhysicsTypes.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/compiler.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/utils.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/platform/CCPhysicsDebugDraw.js"},{"deps":{},"path":"engine-dev/cocos2d/core/mesh/mesh-data.js"},{"deps":{},"path":"engine-dev/extensions/spine/lib/spine.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/scene/light.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/utils/label/label-frame.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/deserialize-editor.js"},{"deps":{},"path":"engine-dev/cocos2d/core/renderer/utils/utils.js"},{"deps":{},"path":"engine-dev/cocos2d/core/physics/CCPolygonSeparator.js"},{"deps":{},"path":"engine-dev/cocos2d/core/3d/skeleton/CCJointMatrixCurve.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/profiler/counter.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/editbox/EditBoxImplBase.js"},{"deps":{},"path":"engine-dev/cocos2d/core/components/editbox/types.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/memop/timsort.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/decode-uuid.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/core/program-lib.js"},{"deps":{},"path":"engine-dev/cocos2d/renderer/core/view.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/text-utils.js"},{"deps":{},"path":"engine-dev/cocos2d/core/utils/html-text-parser.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/deserialize.js"},{"deps":{},"path":"engine-dev/cocos2d/core/asset-manager/download-script.js"},{"deps":{},"path":"engine-dev/cocos2d/core/platform/deserialize-compiled.js"}];
var entries = ["engine-dev/index.js"];
var bundleScript = 'engine-dev/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_engine__.destPath;
    if (destPath) {
        let prefix = 'engine-dev';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_engine__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_engine__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_engine__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_engine__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_engine__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    