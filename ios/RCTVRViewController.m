#import <UIKit/UIKit.h>

#import "RCTVRViewController.h"

#import "GVRVideoView.h"

@interface RCTVRViewController () <GVRVideoViewDelegate>
@property(nonatomic) IBOutlet GVRVideoView *videoView;
@end

@implementation RCTVRViewController
  BOOL _isPaused;

- (GVRVideoView *) getView {
    NSLog(@"get view");
    return _videoView;
  }

- (instancetype)init {
  self = [super initWithNibName:nil bundle:nil];
  NSLog(@"RCTVRViewController=> init");
  return self;
}

- (void)viewDidLoad {
  [super viewDidLoad];
  NSLog(@"RCTVRViewController=> viewDidLoad");
  _videoView.delegate = self;
  _videoView.enableFullscreenButton = YES;
  _videoView.enableCardboardButton = YES;
  
  _isPaused = NO;
  
  NSString *videoPath = [[NSBundle mainBundle] pathForResource:@"congo" ofType:@"mp4"];
  [_videoView loadFromUrl:[[NSURL alloc] initFileURLWithPath:videoPath]];
}

#pragma mark - GVRVideoViewDelegate

- (void)widgetViewDidTap:(GVRWidgetView *)widgetView {
  if (_isPaused) {
    [_videoView resume];
  } else {
    [_videoView pause];
  }
  _isPaused = !_isPaused;
}

- (void)widgetView:(GVRWidgetView *)widgetView didLoadContent:(id)content {
  NSLog(@"Finished loading video");
}

- (void)widgetView:(GVRWidgetView *)widgetView
didFailToLoadContent:(id)content
  withErrorMessage:(NSString *)errorMessage {
  NSLog(@"Failed to load video: %@", errorMessage);
}

- (void)videoView:(GVRVideoView*)videoView didUpdatePosition:(NSTimeInterval)position {
  // Loop the video when it reaches the end.
  if (position == videoView.duration) {
    [_videoView seekTo:0];
    [_videoView resume];
  }
}

@end
