pragma solidity >=0.4.25 <0.6.0;
pragma experimental ABIEncoderV2;

contract FileShare
{
    mapping (address => string[]) fileHash;
    mapping (address => string) senderID;
    address owner;

    // constructor function
    constructor() public
    {
        owner = msg.sender;
    }

    function setThreadID(string memory threadID) public
    {
        senderID[msg.sender] = threadID;
    }

    function getThreadID(address _sender) public view returns(string memory)
    {
        return senderID[_sender];
    }

    // call this function to send a file
    function storeHash(string memory _fileHash) public
    {
        fileHash[msg.sender].push(_fileHash);
    }

    // call this function to receive a file
    function receiveHash(address _from) public view returns(string[] memory)
    {   
        return fileHash[_from];
    }

    function clearStoredHashes() public
    {
        delete fileHash[msg.sender];
        delete senderID[msg.sender];
    }
}