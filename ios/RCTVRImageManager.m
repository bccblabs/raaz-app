//
//  RCTVRImage.m
//  Viicles
//
//  Created by bo chen on 8/4/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "GCSPanoramaView.h"
#import "RCTViewManager.h"

@interface RCTVRImageManager : RCTViewManager
@end

@implementation RCTVRImageManager {
  GCSPanoramaView *_panoView;
}

RCT_EXPORT_MODULE()

- (UIView *)view
{
    _panoView = [[GCSPanoramaView alloc] init];
    _panoView.enableFullscreenButton = NO;
    _panoView.enableCardboardButton = NO;
    [_panoView loadImage:[UIImage imageNamed:@"IMG_3656.JPG"]
                  ofType:kGCSPanoramaImageTypeMono];
    return _panoView;
}

@end