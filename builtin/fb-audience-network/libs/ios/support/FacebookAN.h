

@interface FacebookAN:NSObject

@property(nonatomic,retain) NSMutableDictionary *adList;

-(id)getAd:(NSString *)placementId;
-(NSObject *)removeAd:(NSString *)placementId;
-(void) show:(NSString *)placementId;
-(void) load:(NSString *)placementId;
-(bool)_isExist:(NSString *)placementId;
-(void)addRewardAd:(NSString *)placementId;
-(void)addInterstitalAd:(NSString *)placementId;
-(void)addBanner:(NSString *)placementId withSize:(NSString *)size andPosition:(NSString *)position;
-(void)handlerMessageToGame:(NSString *)eventName withAdsId:(NSString *)placementId;
-(void)handlerMessageToGame:(NSString *)eventName withAdsId:(NSString *)placementId andErrorCode:(NSString *)code;
-(void)destroy:(NSString *)placementId;

+(FacebookAN *) getInstance;
+(void)createAd:(NSString *)placementId withSize:(NSString *)size andPosition:(NSString *)position;
+(void)createAd:(NSString *)type withId:(NSString *)placementId;
+(void)loadAd:(NSString *)placementId;
+(void)showAd:(NSString *)placementId;
+(void)destroyAd:(NSString *)placementId;
@end
