// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ActivityCertificate {
    string private _name = "Activity Certificate";
    string private _symbol = "ACTCERT";

    address public owner;
    uint256 private _nextTokenId = 1;

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    mapping(uint256 => string) private _tokenURIs;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    modifier exists(uint256 tokenId) {
        require(_owners[tokenId] != address(0), "Token does not exist");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // ===== PERBAIKAN: Fungsi Tambahan =====
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner is zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
    // ======================================

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function tokenURI(uint256 tokenId) public view exists(tokenId) returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function balanceOf(address account) public view returns (uint256) {
        require(account != address(0), "Invalid address");
        return _balances[account];
    }

    function ownerOf(uint256 tokenId) public view exists(tokenId) returns (address) {
        return _owners[tokenId];
    }

    function approve(address to, uint256 tokenId) public exists(tokenId) {
        address tokenOwner = _owners[tokenId];
        require(msg.sender == tokenOwner || isApprovedForAll(tokenOwner, msg.sender), "Not authorized");
        _tokenApprovals[tokenId] = to;
        emit Approval(tokenOwner, to, tokenId);
    }

    function getApproved(uint256 tokenId) public view exists(tokenId) returns (address) {
        return _tokenApprovals[tokenId];
    }

    function setApprovalForAll(address operator, bool approved) public {
        require(operator != msg.sender, "Cannot approve self");
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function isApprovedForAll(address tokenOwner, address operator) public view returns (bool) {
        return _operatorApprovals[tokenOwner][operator];
    }

    function transferFrom(address from, address to, uint256 tokenId) public exists(tokenId) {
        address tokenOwner = _owners[tokenId];
        require(tokenOwner == from, "Not token owner");
        require(msg.sender == tokenOwner || msg.sender == _tokenApprovals[tokenId] || isApprovedForAll(tokenOwner, msg.sender), "Not authorized");
        require(to != address(0), "Invalid address");

        _tokenApprovals[tokenId] = address(0);
        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public {
        transferFrom(from, to, tokenId);
    }

    function mintCertificate(address to, string memory uri) public onlyOwner returns (uint256) {
        require(to != address(0), "Invalid address");
        uint256 tokenId = _nextTokenId;
        _nextTokenId += 1;

        _owners[tokenId] = to;
        _balances[to] += 1;
        _tokenURIs[tokenId] = uri;
        emit Transfer(address(0), to, tokenId);
        return tokenId;
    }
}

