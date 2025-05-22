// babel.config.js
module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    ],
    plugins: [
      "react-native-reanimated/plugin", // Keep this if you use Reanimated
      // REMOVE "expo-router/babel" from here
    ],
  };
};