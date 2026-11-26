import poultry from './Assests/poultry.jpg'
import milk from './Assests/milk.jpg'
import disabled from './Assests/disabled.jpg'
import rennovation from './Assests/rennovation.jpg'
import construction from './Assests/construction.jpg'
import { db, doc } from '../firebase';
import { increment, updateDoc } from 'firebase/firestore';

const scheme = [
    {
        id: 1,
        name: "Poultry breeding",
        image: poultry,
        content: "Applicants should be women permanent residents of the panchayat. Annual income should not exceed 5 lakhs. 5 chicks will be provided free of cost (subsidy maximum Rs. 600). Should have scientifically constructed cage. Preference will be given to families with income below poverty line. In case of increase in the price of chicks during the project period, the increased amount should be borne by the beneficiaries.",
    },
    {
        id: 2,
        name: "Subsidy for milk",
        image: milk,
        content: "Annual income should not exceed 5 lakhs Preference for existing cow breeders Applicants should be female permanent residents of Vazhapally Grampa Nachayat..Dairy farmers cooperating with veterinary vaccinations..Scientifically constructed cowshed, dung and urine treatment system..Cow should be purchased less than 3 months after calving. 30000 as pillar consumer share is to be paid",
    },
    {
        id: 3,
        name: "Fodder subsidy",
        image: poultry,
        content: "Content for Poultry breeding grant",
    },
    {
        id: 4,
        name: "Scholarship for challenged",
        image: disabled,
        content: "Content for Poultry breeding grant",
    },
    {
        id: 5,
        name: "Home renovation",
        image: rennovation,
        content: "Content for Poultry breeding grant",
    },
    {
        id: 6,
        name: "Life mission",
        image: construction,
        content: "Content for Poultry breeding grant",
    },
];

// Atomic +1/-1 (no read-modify-write race). The Firestore rules only let applicants
// change `count` by exactly +1, so this must stay a single-step increment.
const updateApplicantCount = async (schemeName, up) => {
    try {
      await updateDoc(doc(db, 'scheme', schemeName), { count: increment(up ? 1 : -1) });
    } catch (e) {
      console.error(e.message);
    }
  };
  
export {scheme, updateApplicantCount};