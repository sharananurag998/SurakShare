module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['@babel/preset-react', 'module:metro-react-native-babel-preset', 'module:react-native-dotenv'],
    };
};
