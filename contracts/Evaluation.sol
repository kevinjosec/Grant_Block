// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// Scores grant applications and keeps the approved beneficiaries sorted by marks.
///
/// Field order expected by calculateMarks / addApplicant (12 entries, 20 marks each, max 240):
///   0 agriculture  "yes"     -> agriculture is the only income
///   1 pl           "BPL"     -> below poverty line
///   2 widow        "yes"
///   3 disabled     "yes"     -> disabled family member
///   4 disease      "yes"
///   5 unmarried    "yes"     -> unmarried daughters
///   6 previous     "no"      -> has NOT received a scheme before
///   7 caste        "SC"/"ST"
///   8 government   "no"      -> no government-employed family member
///   9 land         "no"      -> owns no land
///  10 water        "public"  -> depends on public water
///  11 toilet       "no"      -> no private toilet
/// Each field earns marks only for the answer that indicates greater need.
contract Evaluation {
    uint256 public constant FIELD_COUNT = 12;
    uint256 public constant MARKS_PER_FIELD = 20;
    uint256 public constant MAX_MARKS = FIELD_COUNT * MARKS_PER_FIELD;

    struct Applicant {
        string name;
        uint256 number;
        string add;
        string scheme_name;
        uint256 marks_scored;
        uint256 ward_number;
        uint256 house_number;
    }

    address public owner;
    Applicant[] public applicants;
    // keccak256(phone number, scheme) => already approved
    mapping(bytes32 => bool) public isAdded;

    event ApplicantAdded(uint256 indexed position, string scheme_name, uint256 marks_scored);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Evaluation: caller is not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Evaluation: zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    /// Pure scoring: free to call (no transaction, no gas), and no shared state between officers.
    function calculateMarks(string[12] memory fields)
        public
        pure
        returns (uint256[12] memory marks, uint256 total)
    {
        for (uint256 i = 0; i < FIELD_COUNT; i++) {
            if (_isNeedAnswer(i, fields[i])) {
                marks[i] = MARKS_PER_FIELD;
                total += MARKS_PER_FIELD;
            }
        }
    }

    /// Adds an approved applicant. Marks are computed here from the answers,
    /// so the caller cannot submit an arbitrary score.
    function addApplicant(
        string memory _name,
        uint256 _number,
        string memory _add,
        string memory _scheme_name,
        uint256 _ward_number,
        uint256 _house_number,
        string[12] memory _fields
    ) external onlyOwner {
        bytes32 key = keccak256(abi.encode(_number, _scheme_name));
        require(!isAdded[key], "Evaluation: applicant already added for this scheme");
        isAdded[key] = true;

        (, uint256 total) = calculateMarks(_fields);
        uint256 position = _insertSorted(
            Applicant(_name, _number, _add, _scheme_name, total, _ward_number, _house_number)
        );
        emit ApplicantAdded(position, _scheme_name, total);
    }

    function getApplicants() external view returns (Applicant[] memory) {
        return applicants;
    }

    function getApplicantsLength() external view returns (uint256) {
        return applicants.length;
    }

    /// Keeps `applicants` sorted by marks (highest first) with a single O(n) shift,
    /// instead of re-sorting the whole array (O(n^2)) on every insert.
    /// Ties keep approval order.
    function _insertSorted(Applicant memory newApplicant) internal returns (uint256 i) {
        applicants.push(newApplicant);
        i = applicants.length - 1;
        while (i > 0 && applicants[i - 1].marks_scored < newApplicant.marks_scored) {
            applicants[i] = applicants[i - 1];
            i--;
        }
        applicants[i] = newApplicant;
    }

    function _isNeedAnswer(uint256 index, string memory value) internal pure returns (bool) {
        if (index == 1) return _eq(value, "BPL");
        if (index == 7) return _eq(value, "SC") || _eq(value, "ST");
        if (index == 10) return _eq(value, "public");
        if (index == 6 || index == 8 || index == 9 || index == 11) return _eq(value, "no");
        return _eq(value, "yes"); // 0, 2, 3, 4, 5
    }

    function _eq(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }
}
