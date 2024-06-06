import React, { useContext, useEffect, useState } from 'react'
import './GovResult.css'
import Web3 from 'web3';
import EvaluationABI from '../../Evaluation.json';
import { authContext } from '../AuthContext'
import { db, addDoc, collection, doc, auth } from '../../firebase';
import { documentId, getDoc, getDocs, updateDoc } from 'firebase/firestore';


const GovResult = () => {

    const { setApplicant } = useContext(authContext);

    const evaluationABI = EvaluationABI.abi;
    const contractAddress = '0x0516BD10641FcC85d5716026b56a4Cc2b27c0a86';
    const web3 = new Web3(window.ethereum);
    const evaluationContract = new web3.eth.Contract(evaluationABI, contractAddress);
    const [accounts, setAccounts] = useState([]);
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const accounts = await web3.eth.getAccounts();
                    setAccounts(accounts[0]);
                }
                catch (e) {
                    console.log(e);
                }
            }
            else {
                console.log("Meta mask is not available");
            }
        }
        initWeb3();
        getFinalApplicants();
    }, [])

    const getFinalApplicants = async () => {
        if (!evaluationContract) {
            console.log('No evaluation Contract');
            return;
        }
        else {
            try {
                const count = await evaluationContract.methods.getApplicantsLength().call();
                const fetchedApplicants = [];
                for (let i = 0; i < count; i++) {
                    const applicant = await evaluationContract.methods.applicants(i).call();
                    fetchedApplicants.push(applicant);
                }
                console.log("Result: ", fetchedApplicants);
                setApplicants(fetchedApplicants);
                setApplicants(fetchedApplicants);
            } catch (e) {
                console.error(e);
            }
        }
    }

    const addFinalApplicants = async () => {
        try {
            await evaluationContract.methods.addFinalApplicants(applicants).send({ from: accounts });
            console.log("Block added succesfully");

            const schemesRef = doc(db, 'notification', 'JRl9yPdlCNYgPbji4VJi');
            const schemesRefSnapshot = await getDoc(schemesRef);
            if (schemesRefSnapshot.exists()) {
                const { notified } = schemesRefSnapshot.data();
                await updateDoc(schemesRef, {
                    notify: true,
                });
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <div className='result-main-body'>
            <h1 className="result-header">Final Results</h1>
            <div className="result-content">
                <p className="result-content-header">Beneficiary List</p>
                {applicants.map((applicant, index) => (
                    <div key={index} className="result-body-container">
                        <p className="result-serial"><strong>{index + 1}</strong>.</p>
                        <p className="result-name">{applicant.name.toUpperCase()}</p>
                        <p className="result-number">{`${applicant.number}`}</p>
                        <p className="result-address"><strong>Address:  </strong>{applicant.add}</p>
                        <p className="result-house-no"><strong>House no:</strong>   #{`${applicant.house_number}`}</p>
                        <p className="result-ward-no"><strong>Ward no:</strong>   #{`${applicant.ward_number}`}</p>
                        <p className="result-scheme-name"><strong>Scheme name:  </strong>{applicant.scheme_name}</p>
                        <p className="result-total-marks"><strong>Total marks:  </strong>{`${applicant.marks_scored}`}</p>
                    </div>
                ))}

                <div className="bc-button">
                    <button className="block-button" onClick={() => { addFinalApplicants() }}>Publish Results</button>
                </div>
            </div>
        </div>
    )
}

export default GovResult;
