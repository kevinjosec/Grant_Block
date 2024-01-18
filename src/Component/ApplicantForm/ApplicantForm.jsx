import React, { useEffect, useState } from 'react'
import { db, addDoc, collection, doc } from '../../firebase';
import { documentId, getDoc, getDocs } from 'firebase/firestore';
import CryptoJS from 'crypto-js';
import {CID , create} from 'ipfs-http-client'
import { useLocation } from 'react-router-dom';
import './ApplicantForm.css'
import GoNavbar from '../GovNavbar/GoNavbar';

const ApplicantForm = ({exportedData}) => {
    const location = useLocation();
    const [formData, setFormData] = useState(location.state?.formData || null);

     useEffect(() => {
    if (exportedData) {
      setFormData(exportedData);
    }
  }, [exportedData]); 

  return (
    <div>
      <GoNavbar/>
         {formData.length > 0 ? formData.map((form, index)=> ( 
          <div key={index} className='form-group'>
            <label>
              Name : 
            </label>
            <input type='text' className='input-tag'
            value = {form.name}/>
            <br/>
            <label>
              Address : 
            </label>
            <input type='text' className='input-tag'
            value = {form.address}/>
            <br/>
            <label>
              Phone Number : 
            </label>
            <input type='text' className='input-tag'
            value = {form.phoneNo}/>
            <br/>
            <label>
              Ration Number : 
            </label>
            <input type='text' className='input-tag'
            value = {form.rationNo}/>
            <br/>
            <label>
              Adhar Number  : 
            </label>
            <input type='text' className='input-tag'
            value = {form.adharNo}/>
            <br/>
            <label>
              Ward Number : 
            </label>
            <input type='text'  className='input-tag'
            value = {form.wardNo}/>
            <br/>
            <label>
              House Number : 
            </label>
            <input type='text' className='input-tag'
            value = {form.houseNo}/>
            <br/>
            <label>
              Kudumbasree : 
            </label>
            <input type='text' className='input-tag'
            value = {form.kudumbasree}/>
            <br/>
            <label>
              Disabled : 
            </label>
            <input type='text' className='input-tag'
            value = {form.disable}/>
            <br/>
            <label>
              Government : 
            </label>
            <input type='text' className='input-tag'
            value = {form.government}/>
            <br/>
            <label>
              Income : 
            </label>
            <input type='text' className='input-tag'
            value = {form.income}/>
            <br/>
            <label>
              Poverty Line : 
            </label>
            <input type='text' className='input-tag'
            value = {form.pl}/>
            <br/>
            <label>
              Land : 
            </label>
            <input type='text' className='input-tag'
            value = {form.land}/>
            <br/>
            <label>
              Village : 
            </label>
            <input type='text' className='input-tag'
            value = {form.village || 'nil'}/>
            <br/>
            <label>
              Survey Number : 
            </label>
            <input type='text' className='input-tag'
            value = {form.surveyNo || 'nil'}/>
            <br/>
            <label>
              Area : 
            </label>
            <input type='text' className='input-tag'
            value = {form.area  || 'nil'}/>
            <br/>
            <label>
              Toilet : 
            </label>
            <input type='text' className='input-tag'
            value = {form.toilet}/>
            <br/>
            <label>
              Water : 
            </label>
            <input type='text' className='input-tag'
            value = {form.water}/>
            <br/>
            <label>
              Ration Card : 
            </label>
            <iframe 
    title="Income PDF"
    src={`data:application/pdf;base64,${form.rationPic || ''}`}
    width="100px"
    height="100px"
    onError={(e) => console.error("Error loading PDF:", e)}
  />
            <br/>
            <label>
              Adhar Card : 
            </label>
            <iframe 
    title="Income PDF"
    src={`data:application/pdf;base64,${form.adharPic || ''}`}
    width="100px"
    height="100px"
    onError={(e) => console.error("Error loading PDF:", e)}
  />
            <br/>
            <label>
              Income Certificate : 
            </label>
            <iframe 
    title="Income PDF"
    src={`data:application/pdf;base64,${form.incomePic || ''}`}
    width="100px"
    height="100px"
    onError={(e) => console.error("Error loading PDF:", e)}
  />
            <br/>
            <label>
              Land Image : 
            </label>
            <iframe 
    title="Income PDF"
    src={`data:application/pdf;base64,${form.landPic || ''}`}
    width="100px"
    height="100px"
    onError={(e) => console.error("Error loading PDF:", e)}
  />
            <br/>

  </div>)
) : (
  <p>No PDF data found.</p>
)}
    </div>
  )
}

export default ApplicantForm
// two times