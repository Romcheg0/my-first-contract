const { expect } = require('chai')
describe('Initial balance', function () {
	it('Should make an initial balance', async function () {
		const MyFirstContract = await ethers.getContractFactory('MyFirstContract')
		const myFirstContract = await MyFirstContract.deploy(1000000)
		expect(
			await myFirstContract.balanceOf(
				'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
			)
		).to.equal('1000000')
	})
})
describe('makeTransfers validation', function () {
	it("Shouldn't work with empty arrays", async function () {
		const MyFirstContract = await ethers.getContractFactory('MyFirstContract')
		const myFirstContract = await MyFirstContract.deploy(1000000)
		await myFirstContract.makeTransfers([], [])
		expect(
			await myFirstContract.balanceOf(
				'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
			)
		).to.equal('1000000')
	})
	it("Shouldn't work with different sizes of arrays", async function () {
		const MyFirstContract = await ethers.getContractFactory('MyFirstContract')
		const myFirstContract = await MyFirstContract.deploy(1000000)
		await myFirstContract.makeTransfers(
			[
				'0x1be1faf129e8ce0b9bb633db66876df6c42acac2',
				'0x1be1faf129e8ce0b9bb633db66876df6c42acac2',
			],
			[1]
		)
		expect(
			await myFirstContract.balanceOf(
				'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
			)
		).to.equal('1000000')
	})
	it("Shouldn't work with different sizes of arrays", async function () {
		const MyFirstContract = await ethers.getContractFactory('MyFirstContract')
		const myFirstContract = await MyFirstContract.deploy(1000000)
		await myFirstContract.makeTransfers(
			['0x1be1faf129e8ce0b9bb633db66876df6c42acac2'],
			[1, 2]
		)
		expect(
			await myFirstContract.balanceOf(
				'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
			)
		).to.equal('1000000')
	})
	it("Shouldn't work when balance < amount", async function () {
		const MyFirstContract = await ethers.getContractFactory('MyFirstContract')
		const myFirstContract = await MyFirstContract.deploy(1000000)
		await myFirstContract.makeTransfers(
			['0x1be1faf129e8ce0b9bb633db66876df6c42acac2'],
			[2000000]
		)
		expect(
			await myFirstContract.balanceOf(
				'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
			)
		).to.equal('1000000')
	})
	it('Should work', async function () {
		const MyFirstContract = await ethers.getContractFactory('MyFirstContract')
		const myFirstContract = await MyFirstContract.deploy(1000000)
		await myFirstContract.makeTransfers(
			['0x1be1faf129e8ce0b9bb633db66876df6c42acac2'],
			[600000]
		)
		expect(
			await myFirstContract.balanceOf(
				'0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
			)
		).to.equal('400000')
	})
})
