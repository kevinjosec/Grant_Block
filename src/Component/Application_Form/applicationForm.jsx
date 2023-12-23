import React from 'react'
import CryptoJS from 'crypto-js';
import './applicationForm.css'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import {CID , create} from 'ipfs-http-client'
import UserNavbar from '../UserNavbar/UserNavbar';



const ApplicationForm = () => {
    function concatenateUint8Arrays(a, b) {
        const result = new Uint8Array(a.length + b.length);
        result.set(a, 0);
        result.set(b, a.length);
        return result;
      }
      
      function uint8ArrayToString(uint8Array) {
        return new TextDecoder().decode(uint8Array);
      }
    const uint8ArrayToBase64 = (uint8Array) => {
        let binary = '';
        Uint8Array.from(uint8Array).forEach((byte) => {
          binary += String.fromCharCode(byte);
        });
        return window.btoa(binary);
      };
      
    const ipfs = create({
        host:'localhost',
        port:'5001',
        protocol:'http',
    })
  
    const [formData,setFormData] = useState(null);
    const [landOwnership, setLandOwnership] = useState('');
    const handlelandOwnership = (e) => {
        setLandOwnership(e.target.value);
        formik.values.land=e.target.value;
    }
    const convertFileToBuffer = async (file) => {
        try {
          return new Promise((resolve, reject) => {
            if (!file || !(file instanceof Blob)) {
              resolve(null);
            }
      
            const reader = new FileReader();
      
            reader.onload = () => {
              const arrayBuffer = reader.result;
              const uint8Array = new Uint8Array(arrayBuffer);
              resolve(uint8Array);
            };
      
            reader.onerror = (error) => {
              reject(error);
            };
      
            reader.readAsArrayBuffer(file);
          });
        } catch (e) {
          console.error("Error: ", e);
        }
      };
    
    const formik = useFormik(
        {
            initialValues:{
                name:'',
                address:'',
                phoneNo:'',
                rationNo:'',
                adharNo:'',
                wardNo:'',
                houseNo:'',
                kudumbasree:'',
                disable:'',
                government:'',
                income:'',
                pl: '',
                land: '',
                village:'',
                surveyNo:'',
                area:'', 
                toilet:'',   
                water:'',
                rationPic:'',
                adharPic:'',
                incomePic:'',
                landPic:'',
                
            },

                validationSchema : Yup.object({
                name: Yup.string().matches(/^[A-Za-z\s]+$/, 'Invalid').min(2, 'Too short').required('Name is required'),
                address: Yup.string().matches(/^[A-Za-z0-9\s]+$/).required('Address is required'),
                phoneNo: Yup.string().matches(/^[0-9]{10}$/, 'Invalid').required('Phone number is required'),
                rationNo: Yup.string().matches(/^\d{11}$/, 'Invalid').required('Ration Card Number Required is required'),
                adharNo: Yup.string().matches(/^\d{12}$/, 'Invalid').required('Adhar Card Number Required'),
                wardNo: Yup.string().matches(/^\d{1,2}$/, 'Invalid').required('Ward Number is required is required'),
                houseNo: Yup.string().matches(/^\d{1,2}$/, 'Invalid').required('House Number is required is required'),
                disable: Yup.string().required('Choose an option'),
                government: Yup.string().required('Choose an option'),
                income: Yup.string().matches(/^[0-9]{1,5}$/, 'Ineligible to apply').required('Income is required'),
                pl: Yup.string().required('Choose an option'),
                water: Yup.string().required('Choose an option'),
                kudumbasree: Yup.string().required('Choose an option'),
                land: Yup.string().required('Choose an option'),
                village:Yup.string().when('land',{
                    is: (value) => value === 'yes',
                    then:(schema)=> schema.matches(/^[A-Za-z]{0,26}$/, 'Invalid').required('Enter Village name'),
                    otherwise: (schema)=>schema,
                }
                ),
                area:Yup.string().when('land',{
                    is: (value) => value === 'yes',
                    then:(schema)=> schema.matches(/^[0-9]{0,26}$/, 'Invalid').required('Enter Village name'),
                    otherwise: (schema)=>schema,
                }
                ),
                surveyNo:Yup.string().when('land',{
                    is: (value) => value === 'yes',
                    then:(schema)=> schema.matches(/^[A-Za-z]{0,26}$/, 'Invalid').required('Enter Village name'),
                    otherwise: (schema)=>schema,
                }
                ),
                toilet: Yup.string().required('choose an option'),
                rationPic:Yup.mixed().required("Ration card image is required"),
                adharPic:Yup.mixed().required("Adhar card image is required"),
                incomePic:Yup.mixed().required("Income certificate is required"),
                landPic:Yup.mixed().when('land',{
                    is:(value)=> value === 'yes',
                    then:(schema)=>schema.mixed().required("Adharam is required"),
                    otherwise:(schema)=>schema,
                })
              }),

             onSubmit: async(values)=>{
                console.log('Submitting form data...');                
                  try {
                    const bufferRationPic = await convertFileToBuffer(values.rationPic);
                    values.rationPic = uint8ArrayToBase64(new Uint8Array(bufferRationPic));
                    const bufferAdharPic = await convertFileToBuffer(values.adharPic);
                    values.adharPic = uint8ArrayToBase64(new Uint8Array(bufferAdharPic));
                    const bufferIncomePic = await convertFileToBuffer(values.incomePic);
                    values.incomePic = uint8ArrayToBase64(new Uint8Array(bufferIncomePic));
                    const bufferLandPic = await convertFileToBuffer(values.landPic);
                    values.landPic = uint8ArrayToBase64(new Uint8Array(bufferLandPic));
                       
                    const applicationData = {
                        name:values.name,
                        address:values.address,
                        phoneNo:values.phoneNo,
                        rationNo:values.rationNo,
                        adharNo:values.adharNo,
                        wardNo:values.wardNo,
                        houseNo:values.houseNo,
                        disabled:values.disable,
                        government:values.government,
                        income:values.income,
                        pl:values.pl,
                        water:values.water,
                        kudumbasreed:values.kudumbasree,
                        village:values.village,
                        area:values.area,
                        surveyNo:values.surveyNo,
			            land:values.land,
			            toilet:values.toilet,
                        rationPic:values.rationPic,
                        adharPic:values.adharPic,
                        incomePic:values.incomePic,
                        landPic:values.landPic
                };      
                const secretKey = 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxNpbdlhePxcSh78s2bx0eVczNYjTdScgpluZiDoVSWoAWDL8TSAZsytVSk1xhTZ+OyyslGlvIIp6NHeFuBbvqiEPqGdczB5vzAZeGE29/iqlvhfWUqx/vt8y8rx3q/LRmz1bpyZdoncEH2K291zpLSN1VzPWFma/YCUP112eWzDv7f6PKuD4W+g9Rl2Bf2MHApgmnqp1XpCWIgCYd7RKKoDkr3IuSRnF/+0T89t5Evwz2xebi6+PrdqAB2WCoipCs4/XQHmocaEsRGolfF4IaAWfsieKwuyPV1ek+RtavNJQ3Z0d7F3fDQlo3KbJOftXNIQGBmhiKQMvLForXjb2vAgMBAAECggEBAI9iHdsX7+RyHdDwljlq2eKLhXPAPAm4Au4znCBGo3SoqO4uTgOpyRkJXGS9uoc4KRt+I2CX3R8nc6W2QYmltg/jRSAK3GX7iCCsbw8adqJ5bPJBLxylAOgSjOM1xT02TjjJFgd/BrSsv1w74wexNwdm4z7i4NzCJtbjWEt3h+cn60Toa/RXrZWwYj40VKKSSOz341VppU2gf7vzYXauCw7diGm18rzx1Rb4DHWDqcQkNbIYXsPNUkkvvrxcM2ExIkMdsuSeRDJwXVlyjP58YNIFMmgOOhiSm/dQWShzlJ6XAOw9PQscCvVBke+NGxbziQz6o0yp6sdPBCX+7xj463ECgYEA4R6CdlrBHewTJHMs20gcaD6DGOUNavDhp9aqW5wt4clBIcEW/493LbPXso1pfT0qejwtysOAfp7g5DJCHQ8nnFqgWNyv8TwhVeJbpjD4nsCeaHu9Krrn9I0CtcBF7b2eTvSa9ouXC+uv44EmMMtHT5gXf3HEEhMe8zKcbJ4rhW0CgYEAyYXFZIdc25seujYRNfhUxqjIufLR51Agu66EkhQ3M6DbqZGJjeO3ON0Fa5Lrl7NnESEgijcsBnpy9FMp7MJfTCrKw1cXabkVDHuJlg44sPlIto3F8InXrn92+lOy2TuvqtAeBpDt1rHdQp0HjuUfP/0m3B+WkjIkxjxAMsCjygsCgYAI9Hy+FogeF5j/VzGOm4S9xNbUM7Bf86sWURy/viu5Epdrr1Gp4twbzk6jRKrQl5FMAX7U1QgUgV9y1Gj63PJ3bsd4IXdCQmEVGIcKymHpdsIWZ+2zeHHnsYBNGJPvjB5zB5nueskMaVi61RVe1YdFrEgrAqyJB4ewpu/ABl621QKBgDNXoo/XMOA+aBi3F7FxYF/wtpsxcysEriJC90GkZt//dpeAHdSJlK+nF+9tUhqnOXYSw5CTN+M6pTj8Sy0n5FGqgVg9QxjLb8JrYwVZADaOfGkOO8TpyYqKrQxf8KwJ2dqiBVRU7lOJoz6KdVeBpnGOFK12Ws1KezYKOaz0iYY7AoGACyrviPNm5jU2h/F+rMV98mgp8xaq96d5DWd5KB8riax/pxYGdBfy5pe9Mm36lq4bkT2fN9rD+ja6kSp92Tr/R3vRkhfjSeBZvWdMVCKm0Xi1hEC3uPQ8mgM04q5bjei5EMGW3PD/Ko5KqnLP7oMpEdefrJE+RG2IOjiBT4QvC+M=';
                console.log("Before : ",applicationData);
                const applicationFormJSON = JSON.stringify(applicationData);
                const encryptedData = CryptoJS.AES.encrypt(applicationFormJSON,"secretKey").toString();
                const cid = (await ipfs.add(encryptedData)).path;
                console.log("CID : ",cid);
                const gatewayURL = 'https://gateway.ipfs.io/ipfs/';
                const fileURL = gatewayURL + cid;
                console.log("File : ", fileURL); 
                const ipfsContentGenerator = ipfs.cat(cid);
                let ipfsContent = new Uint8Array(0); 
                for await (const chunk of ipfsContentGenerator) {
                  ipfsContent = concatenateUint8Arrays(ipfsContent, chunk);
                }
                console.log("IPFS Content : ",ipfsContent);
                const decryptedData = CryptoJS.AES.decrypt(uint8ArrayToString(ipfsContent),"secretKey").toString(CryptoJS.enc.Utf8);
                const application = JSON.parse(decryptedData); 
                setFormData(application);  
                console.log("After : ",application);  
                      
            }
            catch(error){
                console.log("error", error);
            }
              },   
    });
  return (
    <div>
        <UserNavbar/>
        <div className='mainBody'>
            <form className='applicationForm' onSubmit={formik.handleSubmit}>
                <div className='header'>
            <h1>
                Application Form
            </h1>
            </div>
            <br/>
            <br/>
                <label htmlFor='name'>
                    Full Name
                </label>
                <br/>
                <input id='name' name='name' type='text' className='inputTag' style={{height:"35px", width:"400px"}} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
                {formik.touched.name && formik.errors.name ? (<div className='error'>{formik.errors.name}</div>): null}
            <br/>
                <label htmlFor='address'>
                    Enter you Address
                </label>
                <br/>
                <input id='address' name='address' type='text' className='inputTag' style={{height:"35px", width:"400px"}} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address}/>
                {formik.touched.address && formik.errors.address ? (<div className='error'>{formik.errors.address}</div>): null}
                <br/>
                <label htmlFor='phoneNo'>
                    Enter your Phone No.
                </label>
                <br/>
                <input id='phoneNo' type='text' className='inputTag' style={{height:"35px", width:"400px"}} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phoneNo}/>
                {formik.touched.phoneNo && formik.errors.phoneNo ? (<div className='error'>{formik.errors.phoneNo}</div>) : null}
                <br/>
                <label htmlFor='rationNo'>
                    Ration Card No.
                </label>
                <br/>
                <input  id='rationNo' type='text' className='inputTag' style={{height:"35px", width:"400px"}} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rationNo}/>
                <input
  type="file" accept='.pdf' className="documentTag" name="rationPic" onBlur={formik.handleBlur}
  onChange={(event) => {
    formik.setFieldValue('rationPic', event.currentTarget.files[0]);
  }}/>
 {formik.touched && formik.errors.rationPic ? (<div className='error'>{formik.errors.rationPic}</div>):null}
                {formik.touched.rationNo && formik.errors.rationNo ? (<div className='error'>{formik.errors.rationNo}</div>):null} 
                <br/>
                <label htmlFor='adharNo' className='label1'>
                    Adhar Card No
                </label>
                <br/>
                <input  id='adharNo' type='text' className='inputTag1' style={{height:"35px", width:"400px"}} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.adharNo}/>
                <input type='file' accept=".pdf" className='documentTag' name ='adharPic' onBlur={formik.handleBlur} onChange={(event) => {
    formik.setFieldValue('adharPic', event.currentTarget.files[0]);
  }}/>
                {formik.touched && formik.errors.adharPic ? (<div className='error'>{formik.errors.adharPic}</div>):null}
                {formik.touched.adharNo && formik.errors.adharNo ? (<div className='error'>{formik.errors.adharNo}</div>):null}
               <br/>
                <label htmlFor='wardNo'>
                    Ward No.
                </label>
                <br/>
                <input  id='wardNo' type='text' className='inputTag' style={{height:"35px", width:"400px"}} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.wardNo}/>
                {formik.touched.wardNo && formik.errors.wardNo ? (<div className='error'>{formik.errors.wardNo}</div>):null}
                <br/>
                <label htmlFor='houseNo'>
                    House No
                </label>
                <br/>
                <input  id='houseNo' type='text' className='inputTag' style={{height:"35px", width:"400px"}} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.houseNo}/>
                <br/>
                {formik.touched.houseNo && formik.errors.houseNo ? (<div className='error'>{formik.errors.houseNo}</div>):null}
                <br/>
                <label>
                    Kudumbasree
                </label>
                <br/>
                <label  htmlFor='yesKudumbasree'>
                <input type='radio' name='kudumbasree' id='yesKudumbasree' onChange={formik.handleChange} onBlur={formik.handleBlur} value="yes" />
                Yes
                </label>
                <br/>
                <label  htmlFor='noKudumbasree'>
                <input type='radio' name='kudumbasree' id='noKudumbasree'  onChange={formik.handleChange} onBlur={formik.handleBlur} value="no"  />
                No
                </label>
                <br/>
                {formik.touched && formik.errors.kudumbasree ? (<div className='error'>{formik.errors.kudumbasree}</div>):null}
                <br/>
                <label >
                    Disabled member
                </label>
                <br/>
                <label htmlFor='yesdisabled'>
                    <input type='radio' name='disable' id='yesdisabled' onChange={formik.handleChange} onBlur={formik.handleBlur} value="yes" />
                    Yes
                </label>
                <br/>
                <label htmlFor='nodisabled'>
                    <input type='radio' name='disable' id='nodisabled'  onChange={formik.handleChange} onBlur={formik.handleBlur} value="no" />
                    No
                </label>
                <br/>
                {formik.touched && formik.errors.disable ? (<div className='error'>{formik.errors.disable}</div>):null}
                <br/>
                <label>
                    Government employed member
                </label>
                <br/>
                <label htmlFor='yesgovernment'>
                    <input type='radio' name='government' id='yesgovernment'  onChange={formik.handleChange} onBlur={formik.handleBlur} value="yes" />
                    Yes
                </label>
                <br/>
                <label htmlFor='nogovernment' >
                    <input type='radio' name='government' id='nogovernment' onChange={formik.handleChange} onBlur={formik.handleBlur} value="no"  />
                    No
                </label>
                <br/>
                {formik.touched && formik.errors.government ? (<div className='error'>{formik.errors.government}</div>):null}
                <br/>
                <label htmlFor='income'>
                    Annual Income
                </label>
                <br/>
                <input type='text' id='income' style={{height:"35px", width:"400px"}} className='inputTag' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.income}/>
                {formik.touched && formik.errors.income ? (<div className='error'>{formik.errors.income}</div>):null}
                <input type='file' accept=".pdf" className='documentTag' name='incomePic' onBlur={formik.handleBlur} onChange={(event) => {
    formik.setFieldValue('incomePic', event.currentTarget.files[0]);
  }}/>
                {formik.touched && formik.errors.incomePic ? (<div className='error'>{formik.errors.incomePic || ''}</div>):null}
                <br/>
                <label htmlFor='yesAPL'>
                    <input type='radio' name='pl' id= 'yesAPL' value="APL" checked={formik.values.pl === 'APL'} onChange={formik.handleChange} />
                    APL
                    </label>
                    <label htmlFor='yesBPL'>
                    <input type='radio' name='pl' id='yesBPL' value="BPL" checked={formik.values.pl === 'BPL'} onChange={formik.handleChange} />
                    BPL
                    </label>
                    <br/>
                    {formik.touched && formik.errors.pl ? (<div className='error'>{formik.errors.pl}</div>):null}
                    <br/>
                    <label >
                        Land Owned
                    </label>
                    <br/>
                    <label htmlFor='yesland'>
                    <input  type='radio' name='land' id='yesland'  value="yes"  checked={landOwnership === 'yes'} onChange={handlelandOwnership}  />
                    Yes
                    </label>
                    <br/>
                    <label htmlFor='noland'>
                    <input  type='radio' name='land'  id='noland'  value="no" checked={landOwnership === 'no'} onChange={handlelandOwnership} />
                    No
                    <br/>
                    <br/>
                    </label>
                    {landOwnership ==='yes' && (
                        <div>
                        <label htmlFor='village'>
                        Village
                    </label>
                    <br/>
                    <input type='text' id='village' style={{height:"35px", width:"400px"}} className='inputTag1' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.village}/>
                    {formik.touched && formik.errors.village ? (<div className='error'>{formik.errors.village}</div>):null}
 
                    <br/>
                    <label htmlFor='surveyNo'>
                        Survey Number                        
                        </label>
                    <br/>
                    <input type='text' id='surveyNo'  style={{height:"35px", width:"400px"}} className='inputTag1' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.surveyNo}/> 
                    {formik.touched && formik.errors.surveyNo ? (<div className='error'>{formik.errors.surveyNo}</div>):null}

                    <br/>
                    <label htmlFor='area'>
                        Area                        
                        </label>
                    <br/>
                    <input type='text' id='area'  style={{height:"35px", width:"400px"}} className='inputTag1' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.area}/> 
                    {formik.touched && formik.errors.area ? (<div className='error'>{formik.errors.area}</div>):null}
                    <br/>
                    <input type='file' accept=".pdf" className='documentTag' name='landPic' onBlur={formik.handleBlur} onChange={(event) => {
    formik.setFieldValue('landPic', event.currentTarget.files[0]);
  }}/>
                    {formik.touched && formik.errors.landPic ? (<div className='error'>{formik.errors.landPic}</div>):null}
                    </div>
                    )} 
                    <br/>
                    <br/>
                        <label >
                            Water
                        </label>
                        <br/>
                        <label htmlFor='yeswater'>
                        <input type='radio' name='water' id='yeswater' value="private"  checked={formik.values.water === 'private'} onChange={formik.handleChange}/> 
                        Private water
                        <br/>
                        </label>
                        <label htmlFor='nowater'>
                        <input type='radio' name='water'id='nowater' value="public"  checked={formik.values.water === 'public'} onChange={formik.handleChange}/> 
                        Public water
                        <br/>
                        </label>
                        <br/>
                        {formik.touched && formik.errors.water ? (<div className='error'>{formik.errors.water}</div>):null}
                        <br/>
                        <label>
                            Toilet
                        </label>
                        <br/>
                        <label htmlFor='yestoilet'>
                        <input type='radio' name='toilet'id='yestoilet' value="yes"  checked={formik.values.toilet === 'yes'} onChange={formik.handleChange}/> 
                        Yes
                        <br/>
                        </label>
                        <label htmlFor='notoilet'>
                        <input type='radio' name = 'toilet'id='notoilet' value="no"  checked={formik.values.toilet === 'no'} onChange={formik.handleChange} /> 
                        No
                        <br/>
                        </label>
                        <br/>
                        {formik.touched && formik.errors.toilet ? (<div className='error'>{formik.errors.toilet}</div>):null}
                        <br/>
                        <input type='submit' className='submitButton' onSubmit={formik.handleSubmit}>
                        </input>
                        <br/>
                        <br/>
            </form>
            {formData ? (
  <iframe
    title="Income PDF"
    src={`data:application/pdf;base64,${formData.incomePic}`}
    width="100%"
    height="600px"
    onError={(e) => console.error("Error loading PDF:", e)}
  />
) : (
  <p>No PDF data found.</p>
)}

        </div>
    </div>
  )
}

export default ApplicationForm
