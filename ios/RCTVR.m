#import "RCTConvert.h"
#import "RCTVR.h"
#import "RCTBridgeModule.h"
#import "RCTEventDispatcher.h"
#import "UIView+React.h"
#import "GVRVideoView.h"

static NSString *const statusKeyPath = @"status";
static NSString *const playbackLikelyToKeepUpKeyPath = @"playbackLikelyToKeepUp";
static NSString *const playbackBufferEmptyKeyPath = @"playbackBufferEmpty";
static NSString *const readyForDisplayKeyPath = @"readyForDisplay";
static NSString *const playbackRate = @"rate";


@implementation RCTVR
{
  BOOL _playerItemObserversSet;
  BOOL _playerBufferEmpty;

  RCTVRViewController * rctVrViewController;
  NSURL *_videoURL;

  
  RCTEventDispatcher *_eventDispatcher;
  BOOL _playbackRateObserverRegistered;

  bool _pendingSeek;
  float _pendingSeekTime;
  float _lastSeekTime;

  /* For sending videoProgress events */
  Float64 _progressUpdateInterval;
//  BOOL _controls;
  id _timeObserver;

  /* Keep track of any modifiers, need to be applied after each play */
  float _volume;
  float _rate;
  BOOL _muted;
  BOOL _paused;
  BOOL _repeat;
  BOOL _playbackStalled;
  BOOL _playInBackground;
  BOOL _playWhenInactive;
  NSString * _resizeMode;
  BOOL _fullscreenPlayerPresented;
  UIViewController * _presentingViewController;
}

//- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
- (instancetype) init
{
  NSLog(@"RCTVR=> initWithEventDispatcher");

  if ((self = [super init])) {
//    _eventDispatcher = eventDispatcher;
    
    _playbackRateObserverRegistered = NO;
    _playbackStalled = NO;
    _rate = 1.0;
    _volume = 1.0;
    _pendingSeek = false;
    _pendingSeekTime = 0.0f;
    _lastSeekTime = 0.0f;
    _progressUpdateInterval = 250;
    _playerBufferEmpty = YES;
    _playInBackground = false;
    _playWhenInactive = false;
//    
//    [[NSNotificationCenter defaultCenter] addObserver:self
//                                             selector:@selector(applicationWillResignActive:)
//                                                 name:UIApplicationWillResignActiveNotification
//                                               object:nil];
//    
//    [[NSNotificationCenter defaultCenter] addObserver:self
//                                             selector:@selector(applicationDidEnterBackground:)
//                                                 name:UIApplicationDidEnterBackgroundNotification
//                                               object:nil];
//    
//    [[NSNotificationCenter defaultCenter] addObserver:self
//                                             selector:@selector(applicationWillEnterForeground:)
//                                                 name:UIApplicationWillEnterForegroundNotification
//                                               object:nil];
  }
  
  return self;
}


// initializes the rct viewcontroller
- (RCTVRViewController*)createPlayerViewController {
  NSLog(@"creatingPlayerViewController");
  RCTVRViewController* playerLayer= [[RCTVRViewController alloc] init];
  return playerLayer;
}

#pragma mark - Progress

- (void)dealloc
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)usePlayerViewController
{
    NSLog(@"RCTVR=> usePlayerViewController");
    rctVrViewController = [self createPlayerViewController];
    GVRVideoView * videoView = [rctVrViewController getView];
    [self addSubview:videoView];
}

- (void)setControls
{
//  if( _controls != controls || (!_playerLayer && !_playerViewController) )
//  {
//    _controls = controls;
//    if( _controls )
//    {
//      [self removePlayerLayer];
      [self usePlayerViewController];
//    }
//    else
//    {
//      [_playerViewController.view removeFromSuperview];
//      _playerViewController = nil;
//      [self usePlayerLayer];
//    }
//  }
}

- (void)insertReactSubview:(UIView *)view atIndex:(NSInteger)atIndex
{
  [self setControls];
}

- (void) layoutSubViews
{
  [super layoutSubviews];
  NSLog(@"RCTVR=> layoutSubviews");
}

- (void)removeReactSubview:(UIView *)subview
{
    [subview removeFromSuperview];
    return;
}


@end