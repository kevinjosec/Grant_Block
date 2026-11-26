import React, { useEffect, useMemo, useState } from 'react'
import './GovResult.css'
import Web3 from 'web3';
import { db, doc } from '../../firebase';
import { setDoc, serverTimestamp } from 'firebase/firestore';
import { EVALUATION_ABI, EVALUATION_ADDRESS } from '../../contractConfig';

const NOTIFICATION_DOC = 'JRl9yPdlCNYgPbji4VJi';

const GovResult = () => {

    const web3 = useMemo(() => new Web3(window.ethereum), []);
    const evaluationContract = useMemo(
        () => (EVALUATION_ADDRESS ? new web3.eth.Contract(EVALUATION_ABI, EVALUATION_ADDRESS) : null),
        [web3]
    );
    const [applicants, setApplicants] = useState([]);
    const [publishing, setPublishing] = useState(false);

    useEffect(() => {
        const getFinalApplicants = async () => {
            if (!evaluationContract) {
                console.log('No evaluation contract address configured');
                return;
            }
            try {
                // Already sorted by marks on-chain.
                setApplicants(await evaluationContract.methods.getApplicants().call());
            } catch (e) {
                console.error(e);
            }
        }
        getFinalApplicants();
    }, [evaluationContract]);

    // Publishing only announces the list that is already on-chain.
    // It no longer writes the applicants back to the contract (which duplicated every entry).
    const publishResults = async () => {
        if (applicants.length === 0) {
            alert("There are no approved applicants to publish.");
            return;
        }
        if (!window.confirm('Publish this beneficiary list to all applicants?')) return;
        setPublishing(true);
        try {
            const results = applicants.map((a) => ({
                name: a.name,
                scheme_name: a.scheme_name,
                ward_number: Number(a.ward_number),
                marks_scored: Number(a.marks_scored),
            }));
            await setDoc(doc(db, 'notification', NOTIFICATION_DOC), {
                notify: true,
                results,
                publishedAt: serverTimestamp(),
            });
            alert("Results published.");
        }
        catch (e) {
            console.error(e);
            alert("Publishing failed. See the console for details.");
        }
        finally {
            setPublishing(false);
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
                    <button className="block-button" disabled={publishing} onClick={publishResults}>Publish Results</button>
                </div>
            </div>
        </div>
    )
}

export default GovResult;
