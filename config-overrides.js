const { configPaths, alias, aliasJest } = require("react-app-rewire-alias");
const { useBabelRc } = require("customize-cra");

const aliasMap = configPaths("./tsconfig.paths.json");

module.exports = function override(config) {
  let modifiedConfig = alias(aliasMap)(config);
  modifiedConfig = useBabelRc()(config);
  return modifiedConfig;
};

module.exports.jest = function overrideJest(config) {
  let modifiedConfig = aliasJest(aliasMap)(config);
  modifiedConfig = useBabelRc()(config);
  return modifiedConfig;
};
