import React, { useEffect, useState } from 'react'
import { db, addDoc, collection, doc } from '../../firebase';
import { documentId, getDoc, getDocs } from 'firebase/firestore';
import CryptoJS from 'crypto-js';
import {CID , create} from 'ipfs-http-client'
import GoNavbar from '../GovNavbar/GoNavbar'
import { IoIosArrowForward } from "react-icons/io";
import ApplicantForm from '../ApplicantForm/ApplicantForm';
import './ApplicantList.css'
import { useNavigate} from 'react-router-dom';


const ApplicantList = ({onExportdata}) => {

    const navigate = useNavigate();
    const ipfs = create({
        host:'localhost',
        port:'5001',
        protocol:'http',
    })
    const [formData, setFormData] = useState([]);
    const [contentID, setContentID] = useState(null);

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
      
      useEffect(()=>{
        //database retrival
        const collectionName = 'applicantForm';
        const fetchData = async() =>{
            try{
                const collectRef = collection(db, collectionName);
                const snapshot = await getDocs(collectRef);
                const data = snapshot.docs.map((doc)=>({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("CIDs : ",data);
                //decryption key
    
    //cid formation
    for (let i = 0; i < data.length; i++) {
      const currentCID = data[i].CID;
      console.log("Current CID : ", currentCID);
      const ipfsContentGenerator = ipfs.cat(currentCID);
      let ipfsContent = new Uint8Array(0);
    
      for await (const chunk of ipfsContentGenerator) {
        ipfsContent = concatenateUint8Arrays(ipfsContent, chunk);
      }
    
      console.log("IPFS Content : ", ipfsContent);
    
      // Decryption
      const decryptedData = CryptoJS.AES.decrypt(uint8ArrayToString(ipfsContent), "secretKey").toString(CryptoJS.enc.Utf8);
      const application = JSON.parse(decryptedData);
    
      // Check if the application data is not already in the state
      if (!formData.find((item) => item.id === application.id)) {
        setFormData((prevData) => [...prevData, application]);
      }
    }
    
            }
            catch(e){
                console.log("ERROR : ",e);
            }
        };
        fetchData();
    },[]);
   
    const handleExportData = (data) => {
        if(data)
        {
            setFormData (data);
            navigate('/ApplicantForm' , { state: { formData: data } } )
        }
    }

  return (
    <div>
          <GoNavbar/>
          <h1 className='candidates-header'>
            Candidates
          </h1>
          <div className='list-group'>
         {formData.length > 0 ? formData.map((form, index)=> ( 
          <div key={index} >
            <button className='input-Tag' 
                onClick={()=>handleExportData(form)}> 
                {form.name}
                 <IoIosArrowForward 
                className="arrow-icon" 
                size={"2rem"}/>
            </button>
            <br/>
            <br/>
            <br/>
            </div>
            )
) : (
  <p>No Applicants found.</p>
)}
    </div>
    </div>
  )
}

export default ApplicantList
