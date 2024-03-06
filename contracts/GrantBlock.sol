// SPDX-License-Identifier:MIT
pragma solidity ^0.8.24;

contract applicationEvaluation {

    struct FieldMark {
        string fieldName;
        uint256 fieldMark;
    }

    struct FormData {
        uint256 income;
        string kudumbasree;
        string disabled;
        string pl;
        string government;
        string water;
        string toilet;
        string land;
        string area;
    }

    function calculateMarks (FormData memory formData) public pure returns (FieldMark[] memory) {
        FieldMark[] memory marks = new FieldMark[](9);
        marks[0] = FieldMark("income",0);
        marks[1] = FieldMark("kudumbasree",0);
        marks[2] = FieldMark("disabled",0);
        marks[3] = FieldMark("pl",0);
        marks[4] = FieldMark("government",0);
        marks[5] = FieldMark("water",0);
        marks[6] = FieldMark("toilet",0);
        marks[7] = FieldMark("land",0);
        marks[8] = FieldMark("area",0);

        return marks;
    }

}