import React, { useEffect, useState } from 'react'
import { db, addDoc, collection, doc } from '../../firebase';
import { documentId, getDoc, getDocs } from 'firebase/firestore';
import CryptoJS from 'crypto-js';
import {CID , create} from 'ipfs-http-client'

const ApplicantForm = () => {
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
    for(let i=0;i<data.length; i++)
    {
      const currentCID = data[i].CID;
      console.log("Current CID : ",currentCID);
      const ipfsContentGenerator = ipfs.cat(currentCID);
      let ipfsContent = new Uint8Array(0); 
      for await (const chunk of ipfsContentGenerator) {
        ipfsContent = concatenateUint8Arrays(ipfsContent, chunk);
      }
      console.log("IPFS Content : ", ipfsContent);
      //decryption
      const decryptedData = CryptoJS.AES.decrypt(uint8ArrayToString(ipfsContent),"secretKey").toString(CryptoJS.enc.Utf8);
      const application = JSON.parse(decryptedData); 
      setFormData(prevData => [...prevData,application]); 
    } 
            }
            catch(e){
                console.log("ERROR : ",e);
            }
        };
        fetchData();
    },[]);
       
  return (
    <div>
         {formData.length > 0 ? formData.map((form, index)=> ( 
  <iframe 
    key={index}
    title="Income PDF"
    src={`data:application/pdf;base64,${form.incomePic || ''}`}
    width="100%"
    height="600px"
    onError={(e) => console.error("Error loading PDF:", e)}
  />)
) : (
  <p>No PDF data found.</p>
)}
    </div>
  )
}

export default ApplicantForm
// two times