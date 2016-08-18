package com.viicles;

import com.facebook.react.ReactActivity;
import com.auth0.lock.react.LockReactPackage;
import com.brentvatne.RCTVideo.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.AirMaps.AirPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.brentvatne.RCTVideo.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Viicles";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

   /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
            new LockReactPackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new OrientationPackage(),
            new AirPackage(),
            new LinearGradientPackage(),
            new ImagePickerPackage(),
            new FBSDKPackage(),
            new ReactVideoPackage(),
        new VectorIconsPackage()
      );
    }
}
