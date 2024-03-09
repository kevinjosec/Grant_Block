// SPDX-License-Identifier:MIT
pragma solidity ^0.8.13;

contract Evaluation {
    struct Applicant {
        uint256[12] marks; // Array to store marks for each field
    }

    mapping(address => Applicant) private applicantMapping;

    function calculateMarks(string[12] memory fields) public returns (uint256[12] memory) {
        uint256[12] memory marks; // Array to store marks for the current evaluation

        for (uint256 i = 0; i < fields.length; i++) {
            marks[i] = compareStrings(fields[i], "yes") ? 12 : 0;
        }

        applicantMapping[msg.sender] = Applicant(marks); // Store marks for the sender

        return marks; // Return the marks array
    }

    // Function to compare two strings
    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
}
