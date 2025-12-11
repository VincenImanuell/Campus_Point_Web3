// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ICampusPoint {
    function mint(address to, uint256 amount) external;
    function balanceOf(address account) external view returns (uint256);
}

interface IActivityCertificate {
    function mintCertificate(address to, string memory uri) external returns (uint256);
}

contract ActivityManager {
    struct Activity {
        uint256 id;
        string  name;
        uint256 pointReward;
        bool    isActive;
    }

    address public owner;
    ICampusPoint public campusPoint;
    IActivityCertificate public activityCert;

    uint256 public nextActivityId = 1;
    mapping(uint256 => Activity) public activities;

    event ActivityCreated(uint256 indexed id, string name, uint256 pointReward);
    event StudentRewarded(uint256 indexed activityId, address indexed student, uint256 pointReward);
    event CertificateMinted(uint256 indexed activityId, address indexed student, uint256 tokenId, string uri);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    constructor(address campusPointAddress, address activityCertAddress) {
        owner = msg.sender;
        campusPoint = ICampusPoint(campusPointAddress);
        activityCert = IActivityCertificate(activityCertAddress);
    }

    function createActivity(string calldata name, uint256 pointReward) external onlyOwner {
        uint256 activityId = nextActivityId;
        nextActivityId += 1;

        activities[activityId] = Activity({
            id: activityId,
            name: name,
            pointReward: pointReward,
            isActive: true
        });

        emit ActivityCreated(activityId, name, pointReward);
    }

    function setActivityActive(uint256 activityId, bool active) external onlyOwner {
        require(activities[activityId].id != 0, "Activity not found");
        activities[activityId].isActive = active;
    }

    function getActivity(uint256 activityId)
        external
        view
        returns (uint256 id, string memory name, uint256 pointReward, bool isActive)
    {
        Activity memory a = activities[activityId];
        return (a.id, a.name, a.pointReward, a.isActive);
    }

    // Berikan poin ke mahasiswa untuk suatu kegiatan
    function rewardStudent(uint256 activityId, address student) external onlyOwner {
        Activity memory a = activities[activityId];
        require(a.id != 0, "Activity not found");
        require(a.isActive, "Activity not active");
        require(student != address(0), "Invalid student address");

        campusPoint.mint(student, a.pointReward);
        emit StudentRewarded(activityId, student, a.pointReward);
    }

    // Mint sertifikat NFT untuk mahasiswa
    function mintCertificate(uint256 activityId, address student, string calldata uri) external onlyOwner {
        Activity memory a = activities[activityId];
        require(a.id != 0, "Activity not found");
        require(student != address(0), "Invalid student address");

        uint256 tokenId = activityCert.mintCertificate(student, uri);
        emit CertificateMinted(activityId, student, tokenId, uri);
    }
}

