

@interface FacebookLive:NSObject
-(void) startLive;
-(void) stopLive;
-(void) resumeLive;
-(void) pauseLive;

+(FacebookLive *) getInstance;
+(void)startLive;
+(void)resumeLive;
+(void)stopLive;
+(void)pauseLive;
@end
