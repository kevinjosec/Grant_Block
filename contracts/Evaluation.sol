// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Evaluation {
    uint256[12] public marks; 
    uint256 public totalMarks; 
    event MarksCalculated(uint256[12] marks, uint256 totalMarks);  
    event ApplicantRetrieved (Applicant[] applicants);

    struct Applicant {
        string name;
        uint256 number; 
        string add;
        string scheme_name; 
        uint256 marks_scored;
        uint256 ward_number; 
        uint256 house_number; 
    }

    Applicant[] public applicants;

    function addFinalApplicants (Applicant[] memory newApplicants)public{
        for(uint256 i=0;i<newApplicants.length;i++)
        {
            applicants.push(newApplicants[i]);
        }
        sortApplicants();
    }

    function getApplicants () public  returns (Applicant[] memory ){
        emit ApplicantRetrieved(applicants);
        return applicants;
    }

    function getApplicantsLength() public view returns (uint256) {
        return applicants.length;
    }

     function addApplicant (string memory _name, uint256 _number, string memory _add, string memory _scheme_name, uint256 _ward_number, uint256 _house_number, uint256 _marks_scored) public {
        uint256 applicant_total_marks = _marks_scored;
        Applicant memory newApplicant = Applicant(_name, _number, _add,  _scheme_name, applicant_total_marks, _ward_number, _house_number);
        applicants.push(newApplicant);
        sortApplicants();
    }  

    function sortApplicants() internal {
        for (uint256 i = 0; i < applicants.length; i++) {
            for (uint256 j = i + 1; j < applicants.length; j++) {
                if (applicants[i].marks_scored < applicants[j].marks_scored) {
                    Applicant memory temp = applicants[i];
                    applicants[i] = applicants[j];
                    applicants[j] = temp;
                }
            }
        }
    }

    function calculateMarks(string[12] memory fields) public {
        totalMarks = 0;
        for (uint256 i = 0; i < fields.length; i++) {
            marks[i] = evaluateField(fields[i]); 
            totalMarks += marks[i];
            emit MarksCalculated(marks, totalMarks);
        }
    }

    function getMarks() public view returns (uint256[12] memory, uint256) {
        return (marks, totalMarks);
    }

    function evaluateField(
        string memory field
    ) internal pure returns (uint256) {
        if (compareStrings(field, "yes")) {
            return 20; 
        } else if (compareStrings(field, "BPL")) {
            return 20;
        } else if (compareStrings(field, "public")) {
            return 20;
        } else if (isInteger(field)) {
            uint256 value = parseInt(field);
            if (value >= 0 && value <= 10000) {
                return 20; 
            }
        }
        return 0;
    }

    function compareStrings(
        string memory a,
        string memory b
    ) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function isInteger(string memory value) internal pure returns (bool) {
        bytes memory strBytes = bytes(value);
        for (uint256 i = 0; i < strBytes.length; i++) {
            if ((uint8(strBytes[i]) < 48) || (uint8(strBytes[i]) > 57)) {
                return false;
            }
        }
        return true;
    }

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

