const { withProjectBuildGradle } = require('@expo/config-plugins');

const setGradleCompileSdkVersion = (buildGradle) => {
    const pattern = /compileSdkVersion = 31/g;
    if (buildGradle.match(pattern)) {
        return buildGradle;
    }
    return buildGradle.replace(/compileSdkVersion = 30/, 'compileSdkVersion = 31');
}
  
module.exports = function withCompileAndroidSdkVersion(config) {
    return withProjectBuildGradle(config, (config) => {
        if (config.modResults.language === 'groovy') {
            config.modResults.contents = setGradleCompileSdkVersion(config.modResults.contents);
        }
        else {
            throw new Error('Cannot set compileSdkVersion in the project because the project build.gradle is not groovy');
        }
        return config;
    });
};