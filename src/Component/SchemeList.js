import poultry from './Assests/poultry.jpg'
import milk from './Assests/milk.jpg'
import disabled from './Assests/disabled.jpg'
import rennovation from './Assests/rennovation.jpg'
import construction from './Assests/construction.jpg'
import { db, addDoc, collection, doc } from '../firebase';
import { documentId, getDoc, getDocs, updateDoc } from 'firebase/firestore';

const scheme = [
    {
        id: 1,
        name: "Poultry breeding",
        image: poultry,
        content: "Content for Poultry breeding grant",
    },
    {
        id: 2,
        name: "Subsidy for milk",
        image: milk,
        content: "Content for Poultry breeding grant",
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

const updateApplicantCount = async (schemeName) =>{
    try{
        const schemeDocRef = doc(db,'scheme',schemeName);
        const schemeDocSnapshot = await getDoc(schemeDocRef);
        if(schemeDocSnapshot.exists()){
            const currentCount = schemeDocSnapshot.data().count || 0;
            await updateDoc(schemeDocRef,{count:currentCount+1});
        }
        else{
            console.log("No Scheme found")
        }
    }
    catch(e){
        console.error(e.message);
    }
}

export {scheme, updateApplicantCount};