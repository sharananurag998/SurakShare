const FileShare = artifacts.require('FileShare');

module.exports = function (deployer) {
  deployer.deploy(FileShare);
};
