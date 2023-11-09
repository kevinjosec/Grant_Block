// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.18;

contract ApplicationStorage{
    struct Application {
        string name;
        string add;
        string phone;
        string ration;
        string adhar;
        string ward;
        string house;
        string disable;
        string government;
        string income;
        string pl;
        string land;
        string village;
        string survey;
        string area;
    }
    mapping(address => Application) public Applications;

    event ApplicationAdded(address indexed applicant, string name);

    function addApplication(
        string memory _name,
        string memory _add,
        string memory _phone,
        string memory _ration,
        string memory _adhar,
        string memory _ward,
        string memory _house,
        string memory _disable,
        string memory _government,
        string memory _income,
        string memory _pl,
        string memory _land,
        string memory _village,
        string memory _survey,
        string memory _area ) public { 
            Application storage newApplication = Applications[msg.sender];
        newApplication.name = _name;
        newApplication.add = _add;
        newApplication.phone = _phone;
        newApplication.ration = _ration;
        newApplication.adhar = _adhar;
        newApplication.ward = _ward;
        newApplication.house = _house;
        newApplication.disable = _disable;
        newApplication.government = _government;
        newApplication.income = _income;
        newApplication.pl = _pl;
        newApplication.land = _land;
        newApplication.village = _village;
        newApplication.survey = _survey;
        newApplication.area = _area;

        emit ApplicationAdded(msg.sender, _name);
        } 
}