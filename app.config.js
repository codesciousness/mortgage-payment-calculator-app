import 'react-native-dotenv';

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
  },
  "extra": {
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID,
    firebaseMeasurementId: process.env.MEASUREMENT_ID
  }
}
