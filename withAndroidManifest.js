const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function androidManifestPlugin(config) {
    return withAndroidManifest(config, async config => {
        let androidManifest = config.modResults.manifest;

        androidManifest.$ = {
            ...androidManifest.$,
            'xmlns:tools': 'http://schemas.android.com/tools',
        };

        androidManifest['application'] = androidManifest.application.map(app => {
            app.$['android:usesCleartextTraffic'] = 'false'
        });

        return config;
    });
};