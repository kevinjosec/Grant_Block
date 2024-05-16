import React, { useContext, useEffect, useState } from 'react'
import { db, addDoc, collection, doc } from '../../firebase';
import { documentId, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import CryptoJS from 'crypto-js';
import { CID, create } from 'ipfs-http-client'
import { IoIosArrowForward } from "react-icons/io";
import ApplicantForm from '../ApplicantForm/ApplicantForm';
import './ApplicantList.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { RiAccountBoxLine } from "react-icons/ri";
import dp from '../Assests/applicant-dp.svg'

const ApplicantList = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const schemeParameter = location.state?.schemeParameter;
  const [schemeActivated, setSchemeActivated] = useState(false);
  const [formData, setFormData] = useState([]);

  const ipfs = create({
    host: 'localhost',
    port: '5001',
    protocol: 'http',
  })

  const refresh = () => {
    window.location.reload();
  }

  //concatenateUint8arrays
  function concatenateUint8Arrays(a, b) {
    const result = new Uint8Array(a.length + b.length);
    result.set(a, 0);
    result.set(b, a.length);
    return result;
  }

  //uint8ArrayToString
  function uint8ArrayToString(uint8Array) {
    return new TextDecoder().decode(uint8Array);
  }
  const secretKey = 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxNpbdlhePxcSh78s2bx0eVczNYjTdScgpluZiDoVSWoAWDL8TSAZsytVSk1xhTZ+OyyslGlvIIp6NHeFuBbvqiEPqGdczB5vzAZeGE29/iqlvhfWUqx/vt8y8rx3q/LRmz1bpyZdoncEH2K291zpLSN1VzPWFma/YCUP112eWzDv7f6PKuD4W+g9Rl2Bf2MHApgmnqp1XpCWIgCYd7RKKoDkr3IuSRnF/+0T89t5Evwz2xebi6+PrdqAB2WCoipCs4/XQHmocaEsRGolfF4IaAWfsieKwuyPV1ek+RtavNJQ3Z0d7F3fDQlo3KbJOftXNIQGBmhiKQMvLForXjb2vAgMBAAECggEBAI9iHdsX7+RyHdDwljlq2eKLhXPAPAm4Au4znCBGo3SoqO4uTgOpyRkJXGS9uoc4KRt+I2CX3R8nc6W2QYmltg/jRSAK3GX7iCCsbw8adqJ5bPJBLxylAOgSjOM1xT02TjjJFgd/BrSsv1w74wexNwdm4z7i4NzCJtbjWEt3h+cn60Toa/RXrZWwYj40VKKSSOz341VppU2gf7vzYXauCw7diGm18rzx1Rb4DHWDqcQkNbIYXsPNUkkvvrxcM2ExIkMdsuSeRDJwXVlyjP58YNIFMmgOOhiSm/dQWShzlJ6XAOw9PQscCvVBke+NGxbziQz6o0yp6sdPBCX+7xj463ECgYEA4R6CdlrBHewTJHMs20gcaD6DGOUNavDhp9aqW5wt4clBIcEW/493LbPXso1pfT0qejwtysOAfp7g5DJCHQ8nnFqgWNyv8TwhVeJbpjD4nsCeaHu9Krrn9I0CtcBF7b2eTvSa9ouXC+uv44EmMMtHT5gXf3HEEhMe8zKcbJ4rhW0CgYEAyYXFZIdc25seujYRNfhUxqjIufLR51Agu66EkhQ3M6DbqZGJjeO3ON0Fa5Lrl7NnESEgijcsBnpy9FMp7MJfTCrKw1cXabkVDHuJlg44sPlIto3F8InXrn92+lOy2TuvqtAeBpDt1rHdQp0HjuUfP/0m3B+WkjIkxjxAMsCjygsCgYAI9Hy+FogeF5j/VzGOm4S9xNbUM7Bf86sWURy/viu5Epdrr1Gp4twbzk6jRKrQl5FMAX7U1QgUgV9y1Gj63PJ3bsd4IXdCQmEVGIcKymHpdsIWZ+2zeHHnsYBNGJPvjB5zB5nueskMaVi61RVe1YdFrEgrAqyJB4ewpu/ABl621QKBgDNXoo/XMOA+aBi3F7FxYF/wtpsxcysEriJC90GkZt//dpeAHdSJlK+nF+9tUhqnOXYSw5CTN+M6pTj8Sy0n5FGqgVg9QxjLb8JrYwVZADaOfGkOO8TpyYqKrQxf8KwJ2dqiBVRU7lOJoz6KdVeBpnGOFK12Ws1KezYKOaz0iYY7AoGACyrviPNm5jU2h/F+rMV98mgp8xaq96d5DWd5KB8riax/pxYGdBfy5pe9Mm36lq4bkT2fN9rD+ja6kSp92Tr/R3vRkhfjSeBZvWdMVCKm0Xi1hEC3uPQ8mgM04q5bjei5EMGW3PD/Ko5KqnLP7oMpEdefrJE+RG2IOjiBT4QvC+M=';

  useEffect(() => {
    //database retrival
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'schemeActivation', 'hk9qbigYr3rjrHi0RJ9t')
        const docRefSnapshot = await getDoc(docRef);
        if (docRefSnapshot.exists()) {
          const data = docRefSnapshot.data().activate;
          setSchemeActivated(data);
        }

        const collectionName = 'applicantForm';
        const collectRef = collection(db, collectionName);
        const snapshot = await getDocs(collectRef);
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            Submitted: doc.data().Submitted ? doc.data().Submitted.toDate() : null,
            ...doc.data(),
          };
        })
        //cid formation
       // Inside the fetchData function
for (let i = 0; i < data.length; i++) {
  const currentCID = data[i].CID;
  try {
    const ipfsContentGenerator = ipfs.cat(currentCID);
    let ipfsContent = new Uint8Array(0);
    for await (const chunk of ipfsContentGenerator) {
      ipfsContent = concatenateUint8Arrays(ipfsContent, chunk);
    }
    // Decryption
    const decryptedData = CryptoJS.AES.decrypt(uint8ArrayToString(ipfsContent), "secretKey").toString(CryptoJS.enc.Utf8);
    const application = JSON.parse(decryptedData);
    console.log("Parsed JSON:", application);
    application.CID = currentCID;
    console.log(application);
    if (!formData.find((item) => item.id === application.id)) {
      setFormData((prevData) => [...prevData, application]);
    }
  } catch (error) {
    console.error("Error fetching IPFS content:", error);
  }
}
      }
      catch (e) {
        console.error("ERROR : ", e);
      }
    };
    fetchData();
  }, []);

  const handleExportData = (data) => {
    if (data) {
      navigate('/ApplicantForm', { state: { formData: data } })
    }
  }
  return (
    <div className='applicant-list-main-body'>
      <h1 className='candidates-header'>
        Applicants List
      </h1>
      {schemeActivated ? (
          <div className='list-group'>
            {formData.length > 0 ? (
              formData.filter((form) => form.param === schemeParameter)
                .map((form, index) => (
                  <div key={index} >
                    <p className='input-Tag'
                      onClick={() => {
                        handleExportData(form)
                      }}>
                      <img src={dp} alt="Profile" className="applicant-list-dp" style={{ width: "2em" }} />
                      <span className='applicant-name'>{form.name}</span>
                      <span className='applicant-date'>Applied on : {form.Submitted ? form.Submitted.toDate().toLocaleString() : 'Date not available'} </span>
                      <IoIosArrowForward
                        className="arrow-icon"
                        size={"2rem"} />
                    </p>
                  </div>
                )
                ))
              : (
                <p>No Applicants found.</p>
              )}
          </div>
        ) : (
        <div>
          <p className="no-activated-schemes">No schemes are currently activate to view the applicants.<br /></p>
          <div className="refresh-container">
            <button className="refresh" onClick={() => {refresh()}}>Refresh page</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ApplicantList
