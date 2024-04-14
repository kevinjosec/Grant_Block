// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Evaluation {
    uint256[12] public marks; // Public array to store marks for the current evaluation
    uint256 public totalMarks; // Public variable to store the total marks
    event MarksCalculated(uint256[12] marks, uint256 totalMarks); // Event to record calculated marks

    function calculateMarks(string[12] memory fields) public {
        totalMarks = 0; // Reset totalMarks before calculating
        for (uint256 i = 0; i < fields.length; i++) {
            marks[i] = evaluateField(fields[i]); // Evaluate each field and assign marks accordingly
            totalMarks += marks[i]; // Add each mark to the total
            emit MarksCalculated(marks, totalMarks);
        }
    }

    // Getter function to retrieve the calculated marks and total marks
    function getMarks() public view returns (uint256[12] memory, uint256) {
        return (marks, totalMarks);
    }

    // Function to evaluate a single field and assign marks based on its value
    function evaluateField(
        string memory field
    ) internal pure returns (uint256) {
        if (compareStrings(field, "yes")) {
            return 20; // Assign 20 marks if the field is "yes"
        } else if (compareStrings(field, "BPL")) {
            return 20;
        } else if (compareStrings(field, "public")) {
            return 20;
        } else if (isInteger(field)) {
            uint256 value = parseInt(field);
            if (value >= 0 && value <= 10000) {
                return 20; // Assign marks equal to the integer value if it's between 0 and 100
            }
        }
        // If the field doesn't match any condition, assign 0 marks
        return 0;
    }

    // Function to compare two strings
    function compareStrings(
        string memory a,
        string memory b
    ) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    // Function to check if a string represents an integer
    function isInteger(string memory value) internal pure returns (bool) {
        bytes memory strBytes = bytes(value);
        for (uint256 i = 0; i < strBytes.length; i++) {
            if ((uint8(strBytes[i]) < 48) || (uint8(strBytes[i]) > 57)) {
                return false;
            }
        }
        return true;
    }

    // Function to parse an integer from a string
    function parseInt(string memory value) internal pure returns (uint256) {
        uint256 result = 0;
        bytes memory strBytes = bytes(value);
        for (uint256 i = 0; i < strBytes.length; i++) {
            if ((uint8(strBytes[i]) >= 48) && (uint8(strBytes[i]) <= 57)) {
                result = result * 10 + (uint8(strBytes[i]) - 48);
            }
        }
        return result;
    }
}
