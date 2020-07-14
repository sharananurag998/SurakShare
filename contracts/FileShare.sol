pragma solidity >=0.4.25 <0.6.0;

contract FileShare
{
    mapping (address => mapping (address => bytes32)) fileHash;
    address owner;

    // constructor function
    constructor() public
    {
        owner = msg.sender;
    }

    // call this function to send a file
    function sendFile(address _to, bytes32 _fileHash) public
    {
        fileHash[msg.sender][_to] = _fileHash;
    }

    // call this function to receive a file
    function receiveFile(address _from, bytes32 _fileHash) public returns(bytes32)
    {   
        require(fileHash[_from][msg.sender].length > 0);

        return fileHash[_from][msg.sender];
    }
}