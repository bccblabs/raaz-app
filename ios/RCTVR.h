#import "RCTView.h"
#import <Foundation/Foundation.h>
#import "UIView+FindUIViewController.h"
#import "RCTVRViewController.h"
#import "RCTVRViewControllerDelegate.h"

@class RCTEventDispatcher;

@interface RCTVR : UIView
- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;
- (RCTVRViewController *) createPlayerViewController;
@end