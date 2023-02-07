require('@nomicfoundation/hardhat-toolbox')
require('@nomiclabs/hardhat-etherscan')
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: '0.8.17',
	networks: {
		goerli: {
			url: `https://eth-goerli.g.alchemy.com/v2/3BlIal7MCnFDqwP0cHKKmO2Xg7UkCK68`,
			accounts: [
				'5bb7314467fade39b3ef20a4c003a08029e18ae4445d982216b8da1c8e8d68a5',
			],
		},
	},
	etherscan: {
		apiKey: 'Z7JJCPRUTQH4NQX8C9AHZBZBGRP1MT3IX2',
	},
}
