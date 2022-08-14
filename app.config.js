export default {
  "expo": {
    "name": "Mortgage Payment Calculator",
    "slug": "mortgage-payment-calculator-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "owner": "codesciousness",
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.codesciousness.mortgagepaymentcalculatorapp"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 31,
            "buildToolsVersion": "31.0.0"
          }
        }
      ],
      "./withCompileAndroidSdkVersion"
    ]
  },
  "react-native-google-mobile-ads": {
    "android_app_id": "ca-app-pub-7298976665565402~8630267393",
    "ios_app_id": "ca-app-pub-7298976665565402~8630267393"
  }
}