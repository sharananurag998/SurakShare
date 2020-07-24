const FileShare = artifacts.require('FileShare')

contract('FileShare', (accounts) => {
  const [sender, receiver, ...others] = accounts
  let fileShare

  before(async () => {
    fileShare = await FileShare.deployed()
  })

  describe('Deployment', async () => {
    it('Should deploy Successfully', async () => {
      const fileShareAdress = await fileShare.address
      assert.notEqual(fileShareAdress, 0x0)
      assert.notEqual(fileShareAdress, '')
      assert.notEqual(fileShareAdress, null)
      assert.notEqual(fileShareAdress, undefined)
    })
  })

  describe('Push file address', async () => {
    it('Should store file hash successfully', async () => {
      await fileShare.sendFile(
        'bafybeidbvtu665faoefb3o6zfac4utyalcjpnkbqa444qcokfnqrj2ilwu',
      )
      const fileHashList = await fileShare.receiveFile(sender)
      console.log('file hash: ', fileHashList)
      assert.equal(
        fileHashList[0],
        'bafybeidbvtu665faoefb3o6zfac4utyalcjpnkbqa444qcokfnqrj2ilwu',
      )
    })
  })
})
