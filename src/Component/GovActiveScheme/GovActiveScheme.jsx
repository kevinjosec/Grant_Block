import React, { useContext, useEffect, useState } from 'react'
import './GovActiveScheme.css'
import { scheme, updateApplicantCount } from '../SchemeList'
import { db, addDoc, collection, doc } from '../../firebase';
import { documentId, getDoc, getDocs, updateDoc } from 'firebase/firestore';

const GovActiveScheme = () => {

    const [schemeCount, setSchemeCount] = useState({});
    const [schemeActivated, setSchemeActivated] = useState(false);

    useEffect(() => {
        const fetchSchemeCount = async () => {
            const counts = {};
            for (const schemeID of scheme) {
                const count = await getSchemeCount(schemeID.name);
                counts[schemeID.name] = count;
            }
            const docRef = doc(db, 'schemeActivation', 'hk9qbigYr3rjrHi0RJ9t')
            const docRefSnapshot = await getDoc(docRef);
            if (docRefSnapshot.exists()) {
                const data = docRefSnapshot.data().activate;
                console.log(data);
                setSchemeActivated(data);
            }
            setSchemeCount(counts);
        }
        fetchSchemeCount();
    }, []);

    async function getSchemeCount(schemeName) {
        const DocRef = doc(db, 'scheme', schemeName);
        const DocRefSnapshot = await getDoc(DocRef);
        if (DocRefSnapshot.exists()) {
            return DocRefSnapshot.data().count;
        }
        else {
            return (0);
        }
    }
    return (
        <div className='gov-active-scheme-main-body'>
            {schemeActivated ? (
                <div className='gov-active-scheme-body'>
                    <h2 className="gov-active-scheme-body-header">Active Schemes</h2>
                    <p className="gov-active-scheme-body-subheader">Browse and manage all active schemes</p>
                    <div className="gov-active-scheme-container">
                        <div className="gov-active-scheme-grid"><span className='gov-active-scheme-grid-header'>Scheme Name</span></div>
                        <div className="gov-active-scheme-grid"><span className='gov-active-scheme-grid-header'>Applicants</span></div>
                        <div className="gov-active-scheme-grid"><span className='gov-active-scheme-grid-header'>Deadline</span></div>
                    </div>
                    {
                        scheme.map((schemes, index) => (
                            <div className="gov-active-scheme-container" key={index}>
                                <div className="gov-active-scheme-grid"><span className='gov-active-scheme-name'>{schemes.name}</span></div>
                                <div className="gov-active-scheme-grid">{schemeCount[schemes.name] ? schemeCount[schemes.name] : "0"}</div>
                                <div className="gov-active-scheme-grid">29-02-2023</div>
                            </div>
                        ))}
                </div>
            ) : (
                <p className='no-active-schemes'>
                    Currently no schems have been activated. <br />
                    Please activate all the schemes to view all the applicants
                </p>
            )}
        </div>
    )
}

export default GovActiveScheme
