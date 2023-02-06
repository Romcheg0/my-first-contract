const { expect } = require('chai')

describe('Initial balance', function () {
	it('Should make an initial balance', async function () {
		const MyFirstContract = await ethers.getContractFactory('MyFirstContract')
		const myFirstContract = await MyFirstContract.deploy(1000000)
		expect(await myFirstContract.getBalance()).to.equal(1000000)
	})
})
