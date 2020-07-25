pragma solidity >=0.4.25 <0.6.0;
pragma experimental ABIEncoderV2;

contract FileShare
{
    mapping (address => string[]) fileHash;
    address owner;

    // constructor function
    constructor() public
    {
        owner = msg.sender;
    }

    // call this function to send a file
    function storeHash(string memory _fileHash) public
    {
        fileHash[msg.sender].push(_fileHash);
    }

    function clearStoredHashes() public
    {
        require(fileHash[msg.sender].length > 0);

        delete fileHash[msg.sender];
    }

    // call this function to receive a file
    function receiveHash(address _from) public view returns(string[] memory)
    {   
        require(fileHash[_from].length > 0);

        return fileHash[_from];
    }
}