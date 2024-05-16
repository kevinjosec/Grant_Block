import React, { useContext, useEffect, useState } from 'react'
import './GovActiveScheme.css'
import { scheme, updateApplicantCount } from '../SchemeList'
import { db, addDoc, collection, doc, onSnapshot } from '../../firebase';
import { documentId, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import noscheme from '../Assests/noscheme.svg'

const GovActiveScheme = () => {

    const [schemeCount, setSchemeCount] = useState({});
    const [schemeActivated, setSchemeActivated] = useState(false);
    const navigate = useNavigate();

    const redirectApplicant = (parameter) => {
        console.log(parameter)
        navigate('/ApplicantList', { state: { schemeParameter: parameter } });
    }

    const refresh = () => {
        window.location.reload();
    }

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
                setSchemeActivated(data);
            }
            setSchemeCount(counts);
        }
        fetchSchemeCount();
    }, [scheme]);


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
                            <div className="gov-active-scheme-container two" key={index} onClick={() => redirectApplicant(schemes.name)}>
                                <div className="gov-active-scheme-grid"><span className='gov-active-scheme-name'>{schemes.name}</span></div>
                                <div className="gov-active-scheme-grid">{schemeCount[schemes.name] ? schemeCount[schemes.name] : "0"}</div>
                                <div className="gov-active-scheme-grid">29-02-2023</div>
                            </div>
                        ))}
                </div>
            ) : (
                <div>
                    <div className="no-scheme-container">
                        <img src={noscheme} alt="Schemes are currently closed" className="no-scheme-icon" />
                    </div>
                    <p className='no-active-schemes'>
                        Currently no schems have been activated. <br />
                        Please activate all the schemes to view all the applicants
                    </p>
                    <div className="refresh-container gov">
                        <button className="refresh gov" onClick={()=>{refresh()}}>Refresh page</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GovActiveScheme
