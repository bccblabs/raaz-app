#import "RCTVRManager.h"
//#import "RCTVR.h"
#import "GVRVideoView.h"
#import "RCTBridge.h"
#import <Foundation/Foundation.h>


@interface RCTVRManager() <GVRVideoViewDelegate, RCTBridgeDelegate>
@property (nonatomic, strong) GVRVideoView * _videoView;
@property BOOL _isPaused;
@end
@implementation RCTVRManager

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;


- (UIView *)view
{
//  return [[RCTVR alloc] init];
  NSLog(@"initializing gvr video");
  
//  CGRect frame = CGRectMake(0, 0, 250, 250); // Replacing with your dimensions
  GVRVideoView *_videoView = [[GVRVideoView alloc] init];
  _videoView.delegate = self;
  _videoView.enableFullscreenButton = YES;
  _videoView.enableCardboardButton = YES;
  return _videoView;
}

//- (dispatch_queue_t)methodQueue
//{
//  return dispatch_get_main_queue();
//}
//
//- (void)widgetViewDidTap:(GVRWidgetView *)widgetView {
//  if (_isPaused) {
//    [_videoView resume];
//  } else {
//    [_videoView pause];
//  }
//  _isPaused = !_isPaused;
//}
//
//- (void)widgetView:(GVRWidgetView *)widgetView didLoadContent:(id)content {
//  NSLog(@"Finished loading video");
//}
//
//- (void)widgetView:(GVRWidgetView *)widgetView
//didFailToLoadContent:(id)content
//  withErrorMessage:(NSString *)errorMessage {
//  NSLog(@"Failed to load video: %@", errorMessage);
//}
//
//- (void)videoView:(GVRVideoView*)videoView didUpdatePosition:(NSTimeInterval)position {
//  [super didUpdatePosition];
//  // Loop the video when it reaches the end.
//  if (position == videoView.duration) {
//    [_videoView seekTo:0];
//    [_videoView resume];
//  }
//}
//- (NSArray *) customDirectEventTypes
//{
//  return @[
//    @"autoplay",
//    @"loop",
//    @"paused",
//    @"onVideoError",
//    @"onVideoLoad",
//    @"onVideoLoadStart",
//    @"src",
//    @"vrmode",
//    @"onVideoProgress",
//    @"onVideoSeek",
//    @"onVideoEnd",
//    @"onVideoFullscreenPlayerWillPresent",
//    @"onVideoFullscreenPlayerDidPresent",
//    @"onVideoFullscreenPlayerWillDismiss",
//    @"onVideoFullscreenPlayerDidDismiss",
//    @"onReadyForDisplay",
//    @"onPlaybackStalled",
//    @"onPlaybackResume",
//    @"onPlaybackRateChange"
//  ];
//}

//RCT_EXPORT_VIEW_PROPERTY(autoplay, BOOL)
//RCT_EXPORT_VIEW_PROPERTY(loop, BOOL);
//RCT_EXPORT_VIEW_PROPERTY(paused, BOOL);
//RCT_EXPORT_VIEW_PROPERTY(src, NSDictionary);
//RCT_EXPORT_VIEW_PROPERTY(vrmode, BOOL);


//RCT_EXPORT_VIEW_PROPERTY(resizeMode, NSString);
//RCT_EXPORT_VIEW_PROPERTY(repeat, BOOL);
//RCT_EXPORT_VIEW_PROPERTY(muted, BOOL);
//RCT_EXPORT_VIEW_PROPERTY(controls, BOOL);
//RCT_EXPORT_VIEW_PROPERTY(volume, float);
//RCT_EXPORT_VIEW_PROPERTY(playInBackground, BOOL);
//RCT_EXPORT_VIEW_PROPERTY(playWhenInactive, BOOL);
//RCT_EXPORT_VIEW_PROPERTY(rate, float);
//RCT_EXPORT_VIEW_PROPERTY(seek, float);
//RCT_EXPORT_VIEW_PROPERTY(currentTime, float);
//RCT_EXPORT_VIEW_PROPERTY(fullscreen, BOOL);


@end