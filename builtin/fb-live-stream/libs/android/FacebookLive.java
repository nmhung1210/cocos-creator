/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

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

package org.cocos2dx.javascript;

import android.content.Context;
import android.util.Log;

import com.facebook.livestreaming.LiveStreamCallback;
import com.facebook.livestreaming.LiveStreamConfig;
import com.facebook.livestreaming.LiveStreamError;
import com.facebook.livestreaming.LiveStreamManager;
import com.facebook.livestreaming.LiveStreamStatus;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

public class FacebookLive {
    private static final String TAG = "FacebookLive";
    private LiveStreamConfig mLiveStreamConfig;
    private Cocos2dxActivity act;
    private static FacebookLive mLive = null;

    public FacebookLive(Context ctx) {
        this.act = ((Cocos2dxActivity) ctx);
        mLiveStreamConfig = new LiveStreamConfig(new LiveStreamCallback() {
            @Override
            public void onLiveStreamError(final LiveStreamError liveStreamError) {
                Runnable runnable = new Runnable() {

                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("fb.liveStream._live_error_received(" + liveStreamError.getCode() + ")");
                    }
                };

                act.runOnGLThread(runnable);
                Log.d(TAG, "onLiveStreamError: "
                        + liveStreamError.getMessage() +
                        " live stream error code:" + liveStreamError.getCode());
            }

            @Override
            public void onLiveStreamStatusChange(final LiveStreamStatus liveStreamStatus) {
                Runnable runnable = new Runnable() {

                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("fb.liveStream._live_status_changed(" + liveStreamStatus.getCode() + ")");
                    }
                };

                act.runOnGLThread(runnable);

                Log.d(TAG, "onLiveStreamStatusChange: "
                        + liveStreamStatus.getMessage() +
                        " live stream error code:" + liveStreamStatus.getCode());

            }
        });
    }

    public static FacebookLive getInstance() {
        if (null == mLive) {
            mLive = new FacebookLive(SDKWrapper.getInstance().getContext());
        }
        return mLive;
    }

    private void _startLive() {
        Log.d(TAG, "startLive");
        LiveStreamManager.getInstance().
                startLiveStreaming(act.getBaseContext(), mLiveStreamConfig);
    }

    private void _pauseLive() {
        Log.d(TAG, "pauseLive");
        LiveStreamManager.getInstance().
                pauseLiveStreaming(act.getBaseContext());
    }

    private void _resumeLive() {
        Log.d(TAG, "resumeLive");
        LiveStreamManager.getInstance().
                resumeLiveStreaming(act.getBaseContext());
    }

    private void _stopLive() {
        LiveStreamManager.getInstance().stopLiveStreaming(act.getBaseContext());
    }

    public static void startLive() {
        FacebookLive.getInstance()._startLive();
    }

    public static void pauseLive() {
        FacebookLive.getInstance()._pauseLive();
    }

    public static void resumeLive() {
        FacebookLive.getInstance()._resumeLive();
    }

    public static void stopLive() {
        FacebookLive.getInstance()._stopLive();
    }
}
