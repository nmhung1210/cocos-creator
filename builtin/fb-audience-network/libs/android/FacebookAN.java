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
import android.widget.RelativeLayout;


import com.facebook.ads.Ad;
import com.facebook.ads.AdError;
import com.facebook.ads.AdListener;
import com.facebook.ads.AdSettings;
import com.facebook.ads.AdSize;
import com.facebook.ads.AdView;
import com.facebook.ads.InterstitialAd;
import com.facebook.ads.InterstitialAdListener;
import com.facebook.ads.RewardedVideoAd;
import com.facebook.ads.RewardedVideoAdListener;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

import java.util.ArrayList;


import android.widget.RelativeLayout.LayoutParams;

public class FacebookAN {
    class ADS_TYPE {
        public static final int BANNER = 1;
        public static final int REWARDEDVIDEO = 2;
        public static final int INTERSTITIAL = 3;
    }

    class BANNER_SIZE {
        public static final int INTERSTITIAL = 1;
        public static final int BANNER_HEIGHT_50 = 2;
        public static final int BANNER_HEIGHT_90 = 3;
        public static final int RECTANGLE_HEIGHT_250 = 4;
    }

    class BANNER_POSITION {
        public static final int ALIGN_PARENT_TOP = 1;
        public static final int ALIGN_PARENT_BOTTOM = 2;
        public static final int CENTER_IN_PARENT = 3;

    }

    private static final String TAG = "FacebookAN";
    private static FacebookAN mInstance;
    private ArrayList<Ad> adList;

    FacebookAN() {
        adList = new ArrayList<>();
        AdSettings.addTestDevice("8ab177fa-f7f5-4da2-b008-7d7e70e17dce");
    }

    public static FacebookAN getInstance() {
        if (null == mInstance) {
            mInstance = new FacebookAN();
        }
        return mInstance;
    }

    private Ad getAd(String placementId) {
        Ad ad = null;
        for (int i = 0; i < adList.size(); i++) {
            Ad item = adList.get(i);
            if (item.getPlacementId().equals(placementId)) {
                ad = item;
                break;
            }
        }
        return ad;
    }

    private Ad removeAd(String placementId) {
        Ad ad = null;
        for (int i = 0; i < adList.size(); i++) {
            Ad item = adList.get(i);
            if (item.getPlacementId().equals(placementId)) {
                ad = item;
                adList.remove(item);
                break;
            }
        }
        return ad;
    }

    private void show(String placementId) {
        Ad ad = this.getAd(placementId);
        if (ad != null) {
            if (ad instanceof InterstitialAd) {
                InterstitialAd intAd = ((InterstitialAd) ad);
                if (intAd.isAdLoaded()) {
                    intAd.show();
                } else {
                    Log.w(TAG, "InterstitialAd needs to call show after ad onAdLoaded");
                }
            } else if (ad instanceof RewardedVideoAd) {
                RewardedVideoAd reAd = ((RewardedVideoAd) ad);
                if (reAd.isAdLoaded()) {
                    reAd.show();
                } else {
                    Log.w(TAG, "RewardedVideoAd needs to call show after ad onAdLoaded");
                }
            } else {
                Log.w(TAG, "banner has not show function");
            }
        }
    }

    private void load(String placementId) {
        Log.d(TAG, "load ad " + placementId);
        Ad ad = this.getAd(placementId);
        if (ad != null) {
            ad.loadAd();
        } else {
            Log.w(TAG, "load ad fail" + placementId);
        }
    }

    private boolean _isExist(String placementId) {
        boolean exist = false;
        for (int i = 0; i < adList.size(); i++) {
            Ad item = adList.get(i);
            if (placementId.equals(item.getPlacementId())) {
                exist = true;
                break;
            }
        }
        return exist;
    }

    private void destroy(String placementId) {
        Ad ad = this.removeAd(placementId);
        if (ad != null) {
            Log.d(TAG, "destroy----");
            ad.destroy();
        }
    }

    private void addRewardedAd(String placementId) {
        boolean exist = this._isExist(placementId);

        if (exist) {
            this.removeAd(placementId);
        }

        Context ctx = SDKWrapper.getInstance().getContext();
        final RewardedVideoAd ad = new RewardedVideoAd(ctx, placementId);
        adList.add(ad);

        ad.setAdListener(new RewardedVideoAdListener() {
            @Override
            public void onRewardedVideoCompleted() {
                FacebookAN.this.handlerMessageToGame("onRewardedVideoCompleted", ad.getPlacementId());
            }

            @Override
            public void onLoggingImpression(Ad ad) {
                FacebookAN.this.handlerMessageToGame("onLoggingImpression", ad.getPlacementId());
            }

            @Override
            public void onRewardedVideoClosed() {
                FacebookAN.this.handlerMessageToGame("onRewardedVideoClosed", ad.getPlacementId());
            }

            @Override
            public void onError(Ad ad, AdError adError) {
                FacebookAN.this.handlerMessageToGame("onError", ad.getPlacementId(), adError.getErrorCode());
                Log.d(TAG, "onError---------addRewardedAd" + adError.getErrorMessage());
            }

            @Override
            public void onAdLoaded(Ad ad) {
                FacebookAN.this.handlerMessageToGame("onAdLoaded", ad.getPlacementId());
            }

            @Override
            public void onAdClicked(Ad ad) {
                FacebookAN.this.handlerMessageToGame("onAdClicked", ad.getPlacementId());
            }
        });

        this.handlerMessageToGame("onCreated", ad.getPlacementId());
    }

    private void addInterstitalAd(String placementId) {
        boolean exist = this._isExist(placementId);

        if (exist) {
            this.removeAd(placementId);
        }
        Context ctx = SDKWrapper.getInstance().getContext();
        InterstitialAd ad = new InterstitialAd(ctx, placementId);
        adList.add(ad);

        ad.setAdListener(new InterstitialAdListener() {
            @Override
            public void onInterstitialDisplayed(Ad ad) {
                FacebookAN.this.handlerMessageToGame("onInterstitialDisplayed", ad.getPlacementId());
                Log.d(TAG, "onInterstitialDisplayed---------Interstital");
            }

            @Override
            public void onInterstitialDismissed(Ad ad) {
                FacebookAN.this.handlerMessageToGame("onInterstitialDismissed", ad.getPlacementId());
                Log.d(TAG, "onInterstitialDismissed---------Interstital");
            }

            @Override
            public void onError(Ad ad, AdError adError) {
                FacebookAN.this.handlerMessageToGame("onError", ad.getPlacementId(), adError.getErrorCode());
                Log.d(TAG, "onError---------Interstital");
            }

            @Override
            public void onAdLoaded(Ad ad) {
                FacebookAN.this.handlerMessageToGame("onAdLoaded", ad.getPlacementId());
                Log.d(TAG, "onAdLoaded---------Interstital");
            }

            @Override
            public void onAdClicked(Ad ad) {
                FacebookAN.this.handlerMessageToGame("onAdClicked", ad.getPlacementId());
                Log.d(TAG, "onAdClicked---------Interstital");

            }

            @Override
            public void onLoggingImpression(Ad ad) {
                FacebookAN.this.handlerMessageToGame("onLoggingImpression", ad.getPlacementId());
                Log.d(TAG, "onLoggingImpression---------Interstital");
            }
        });

        this.handlerMessageToGame("onCreated", ad.getPlacementId());
        Log.d(TAG, "create Interstital---------");
    }

    private void addBanner(String placementId, int adSize, int position) {
        boolean exist = this._isExist(placementId);

        if (exist) {
            this.removeAd(placementId);
        }
        AdSize size;
        //parse banner size;
        switch (adSize) {
            case BANNER_SIZE.BANNER_HEIGHT_90:
                size = AdSize.BANNER_HEIGHT_90;
                break;
            case BANNER_SIZE.INTERSTITIAL:
                size = AdSize.INTERSTITIAL;
                break;
            case BANNER_SIZE.RECTANGLE_HEIGHT_250:
                size = AdSize.RECTANGLE_HEIGHT_250;
                break;
            case BANNER_SIZE.BANNER_HEIGHT_50:
                size = AdSize.BANNER_HEIGHT_50;
                break;
            default:
                size = AdSize.BANNER_HEIGHT_50;
                break;
        }

        //parse banner position
        int pos;
        switch (position) {
            case BANNER_POSITION.ALIGN_PARENT_BOTTOM:
                pos = RelativeLayout.ALIGN_PARENT_BOTTOM;
                break;
            case BANNER_POSITION.CENTER_IN_PARENT:
                pos = RelativeLayout.CENTER_IN_PARENT;
                break;
            default:
                pos = RelativeLayout.ALIGN_PARENT_TOP;
                break;
        }

        Context ctx = SDKWrapper.getInstance().getContext();
        AdView ad = new AdView(ctx, placementId, size);

        Log.d(TAG, "ad size is " + adList.size());
        adList.add(ad);

        RelativeLayout oriLayout = new RelativeLayout(ctx);
        ((Cocos2dxActivity) ctx).addContentView(oriLayout, new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
        RelativeLayout.LayoutParams adLayoutParams = new RelativeLayout.LayoutParams(LayoutParams.MATCH_PARENT, RelativeLayout.LayoutParams.WRAP_CONTENT);
        adLayoutParams.addRule(pos);
        oriLayout.addView(ad, adLayoutParams);

        ad.setAdListener(new AdListener() {
            @Override
            public void onError(Ad ad, AdError adError) {
                FacebookAN.this.handlerMessageToGame("onError", ad.getPlacementId(), adError.getErrorCode());
                Log.d(TAG, "onError---------banner" + adError.getErrorMessage());
            }

            @Override
            public void onAdLoaded(Ad ad) {
                FacebookAN.this.handlerMessageToGame("onAdLoaded", ad.getPlacementId());
                Log.d(TAG, "onAdLoaded---------banner");
            }

            @Override
            public void onAdClicked(Ad ad) {
                FacebookAN.this.handlerMessageToGame("onAdClicked", ad.getPlacementId());
                Log.d(TAG, "onAdClicked---------banner");
            }

            @Override
            public void onLoggingImpression(Ad ad) {
                FacebookAN.this.handlerMessageToGame("onLoggingImpression", ad.getPlacementId());
                Log.d(TAG, "onLoggingImpression---------banner");
            }
        });

        Log.d(TAG, "create Banner");
        this.handlerMessageToGame("onCreated", ad.getPlacementId());
    }

    private void handlerMessageToGame(final String eventName, final String placementId) {
        Context ctx = SDKWrapper.getInstance().getContext();
        ((Cocos2dxActivity) ctx).runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Cocos2dxJavascriptJavaBridge.evalString("cc.Ads._eventReceiver('" + eventName + "','" + placementId + "')");
            }
        });
    }

    private void handlerMessageToGame(final String eventName, final String placementId, final int error) {
        Context ctx = SDKWrapper.getInstance().getContext();
        ((Cocos2dxActivity) ctx).runOnGLThread(new Runnable() {
            @Override
            public void run() {
                Cocos2dxJavascriptJavaBridge.evalString("cc.Ads._eventReceiver('" + eventName + "','" + placementId + "'," + error + ")");
            }
        });
    }

    public static void createAd(final String placementId, final int size, final int position) {
        Context ctx = SDKWrapper.getInstance().getContext();
        ((Cocos2dxActivity) ctx).runOnUiThread(new Runnable() {
            @Override
            public void run() {
                FacebookAN.getInstance().addBanner(placementId, size, position);
            }
        });
    }

    public static void createAd(final int type, final String placementId) {
        Context ctx = SDKWrapper.getInstance().getContext();
        ((Cocos2dxActivity) ctx).runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (type == ADS_TYPE.INTERSTITIAL) {
                    FacebookAN.getInstance().addInterstitalAd(placementId);
                } else if (type == ADS_TYPE.REWARDEDVIDEO) {
                    FacebookAN.getInstance().addRewardedAd(placementId);
                }
            }
        });

    }

    public static void loadAd(final String placementId) {
        Context ctx = SDKWrapper.getInstance().getContext();
        ((Cocos2dxActivity) ctx).runOnUiThread(new Runnable() {
            @Override
            public void run() {
                FacebookAN.getInstance().load(placementId);
            }
        });
    }

    public static void showAd(final String placementId) {
        Context ctx = SDKWrapper.getInstance().getContext();
        ((Cocos2dxActivity) ctx).runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Log.d(TAG, "showAd----");
                FacebookAN.getInstance().show(placementId);
            }
        });
    }

    public static void destroyAd(final String placementId) {
        Context ctx = SDKWrapper.getInstance().getContext();
        ((Cocos2dxActivity) ctx).runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Log.d(TAG, "destroyAd----");
                FacebookAN.getInstance().destroy(placementId);
            }
        });
    }
}
