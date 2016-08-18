//
//  RCTVRImage.m
//  Viicles
//
//  Created by bo chen on 8/4/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <MapKit/MapKit.h>
#import "GCSVideoView.h"

#import "RCTViewManager.h"

@interface RCTVRVideoManager : RCTViewManager
@end

@implementation RCTVRVideoManager {
  GCSVideoView *_panoView;
}

RCT_EXPORT_MODULE()

- (UIView *)view
{
  _panoView = [[GCSVideoView alloc] init];
  _panoView.enableFullscreenButton = YES;
  _panoView.enableCardboardButton = YES;

  NSString *videoPath = [[NSBundle mainBundle] pathForResource:@"IMG_9930" ofType:@"mp4"];
  
  [_panoView loadFromUrl:[[NSURL alloc] initFileURLWithPath:videoPath]];
  return _panoView;
}

@end