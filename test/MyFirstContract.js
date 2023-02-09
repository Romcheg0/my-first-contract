let { expect, assert } = require('chai')
describe('Initial balance & reverts: ', function () {
	let MyFirstContract
	let myFirstContract
	before(async () => {
		MyFirstContract = await ethers.getContractFactory('MyFirstContract')
		return (myFirstContract = await MyFirstContract.deploy(1000000))
	})
	it('Should perform an initial balance', async () => {
		expect(
			await myFirstContract.balanceOf(
				'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
			)
		).to.be.equal(1000000)
	})
	it('Should revert on empty array(s)', async () => {
		await expect(
			myFirstContract.makeTransfers([], [1, 2, 3])
		).to.be.revertedWith('Different lengths of arrays!')
	})
	it('Should revert on different sizes of arrays', async function () {
		const MyFirstContract = await ethers.getContractFactory('MyFirstContract')
		const myFirstContract = await MyFirstContract.deploy(1000000)
		await expect(
			myFirstContract.makeTransfers(
				[
					'0x1be1faf129e8ce0b9bb633db66876df6c42acac2',
					'0x1be1faf129e8ce0b9bb633db66876df6c42acac2',
				],
				[1]
			)
		).to.be.revertedWith('Different lengths of arrays!')
	})
	it('Should reject on bad parameters', async () => {
		await expect(myFirstContract.makeTransfers(['a'], true)).to.be.rejected
	})
})
describe('Transactions: ', () => {
	beforeEach(async () => {
		MyFirstContract = await ethers.getContractFactory('MyFirstContract')
		return (myFirstContract = await MyFirstContract.deploy(1000000))
	})
	it('Should work # 1', async function () {
		let initialBalance = await myFirstContract.balanceOf(
			myFirstContract.signer.address
		)
		myFirstContract.makeTransfers(
			['0x1be1faf129e8ce0b9bb633db66876df6c42acac2'],
			[600000]
		)
		await expect(
			await myFirstContract.balanceOf(myFirstContract.signer.address)
		).to.be.equal(initialBalance - 600000)
		await expect(
			await myFirstContract.balanceOf(
				'0x1be1faf129e8ce0b9bb633db66876df6c42acac2'
			)
		).to.be.equal(600000)
	})
	it('Should work # 2', async function () {
		let initialBalance = await myFirstContract.balanceOf(
			myFirstContract.signer.address
		)
		myFirstContract.makeTransfers(
			[
				'0x1be1faf129e8ce0b9bb633db66876df6c42acac2',
				'0x1be1faf129e8ce0b9bb633db66876df6c42acac3',
				'0x1be1faf129e8ce0b9bb633db66876df6c42acac4',
			],
			[600000, 100000, 200000]
		)
		await expect(
			await myFirstContract.balanceOf(myFirstContract.signer.address)
		).to.be.equal(initialBalance - 900000)
		await expect(
			await myFirstContract.balanceOf(
				'0x1be1faf129e8ce0b9bb633db66876df6c42acac2'
			)
		).to.be.equal(600000)
		await expect(
			await myFirstContract.balanceOf(
				'0x1be1faf129e8ce0b9bb633db66876df6c42acac3'
			)
		).to.be.equal(100000)
		await expect(
			await myFirstContract.balanceOf(
				'0x1be1faf129e8ce0b9bb633db66876df6c42acac4'
			)
		).to.be.equal(200000)
	})
})
// 	it("Shouldn't work with different sizes of arrays", async function () {
// 		const MyFirstContract = await ethers.getContractFactory('MyFirstContract')
// 		const myFirstContract = await MyFirstContract.deploy(1000000)
// 		await myFirstContract.makeTransfers(
// 			['0x1be1faf129e8ce0b9bb633db66876df6c42acac2'],
// 			[1, 2]
// 		)
// 		expect(
// 			await myFirstContract.balanceOf(
// 				'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
// 			)
// 		).to.equal('1000000')
// 	})
// 	it("Shouldn't work when balance < amount", async function () {
// 		const MyFirstContract = await ethers.getContractFactory('MyFirstContract')
// 		const myFirstContract = await MyFirstContract.deploy(1000000)
// 		await myFirstContract.makeTransfers(
// 			['0x1be1faf129e8ce0b9bb633db66876df6c42acac2'],
// 			[2000000]
// 		)
// 		expect(
// 			await myFirstContract.balanceOf(
// 				'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
// 			)
// 		).to.equal('1000000')
// 	})
// 	it('Should work', async function () {
// 		const MyFirstContract = await ethers.getContractFactory('MyFirstContract')
// 		const myFirstContract = await MyFirstContract.deploy(1000000)
// 		await myFirstContract.makeTransfers(
// 			['0x1be1faf129e8ce0b9bb633db66876df6c42acac2'],
// 			[600000]
// 		)
// 		expect(
// 			await myFirstContract.balanceOf(
// 				'0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
// 			)
// 		).to.equal('400000')
// 	})
// })
