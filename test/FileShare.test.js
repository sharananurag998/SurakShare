const chai = require('chai').use(require('chai-as-promised'));
const should = chai.should();

const FileShare = artifacts.require('FileShare');

contract('FileShare', (accounts) => {
	const [sender, receiver, ...others] = accounts;
	let fileShare;

	before(async () => {
		fileShare = await FileShare.deployed();
	});

	describe('Deployment', async () => {
		it('Should deploy Successfully', async () => {
			const fileShareAdress = await fileShare.address;
			assert.notEqual(fileShareAdress, 0x0);
			assert.notEqual(fileShareAdress, '');
			assert.notEqual(fileShareAdress, null);
			assert.notEqual(fileShareAdress, undefined);
		});
	});

	describe('Push file address', async () => {
		it('Should store file hash successfully', async () => {
			await fileShare.storeHash('/ipfs/bafybeid5msgylushpffdfla54vcjz6t2zm7k2xwelmygugyynj5togeyfy', { from: sender });
			await fileShare.storeHash('/ipfs/xafybeidjysgylushpffdfla54vsjz6t2zm7k2xwelmygugyynj5togf25f', { from: sender });
			const fileHashList = await fileShare.receiveHash(sender);
			assert.equal(fileHashList[0], '/ipfs/bafybeid5msgylushpffdfla54vcjz6t2zm7k2xwelmygugyynj5togeyfy');
		});
	});
	describe('Clear sotred hashes', async () => {
		it('Should clear all hashes', async () => {
			await fileShare.clearStoredHashes({ from: sender });
			await fileShare.receiveHash(sender).should.be.rejected;
		});
	});
});
