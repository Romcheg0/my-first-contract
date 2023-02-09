require('@nomicfoundation/hardhat-toolbox')
require('@nomiclabs/hardhat-etherscan')
let keys = require('./.env/keys.js')
// let keys = require('./.env/keys')
module.exports = {
	solidity: '0.8.17',
	networks: {
		goerli: {
			url: keys.goerli.url,
			accounts: keys.goerli.accounts,
		},
	},
	etherscan: {
		apiKey: keys.etherscan.apiKey,
	},
}
