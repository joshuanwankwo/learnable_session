require("@nomicfoundation/hardhat-toolbox");



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://summer-black-diagram.ethereum-goerli.discover.quiknode.pro/70e7ff208e0f558a958d6671ac4f4c9cfd845665/",
      accounts: ["ae0fb1cbe85d6fd8dacb9434a60039686346d44f78d54f9aa1f496f11fd3183e"]
    },
  },
};


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
      console.log(account.address);
  }
});