
import React from 'react'
import './applicationForm.css'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import {CID , create} from 'ipfs-http-client'





const ApplicationForm = () => {


    const ipfs = create({
        host:'localhost',
        port:'5001',
        protocol:'http',
    })
    const[landOwnership, setLandOwnership] = useState('');
    const handlelandOwnership = (e) => {
        setLandOwnership(e.target.value);
        formik.values.land=e.target.value;
    }

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
                try{
                    const applicatiionData = {
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
                const applicationDataJson =JSON.stringify(applicatiionData);
                const cid = await ipfs.add(applicationDataJson);
                console.log("File uploaded with CID:  ", cid);
            }
            catch(error){
                console.log("error", error);
            }
              },  
    });
  

        const [profilePic, setProfilePic] = useState(null);
        const handleProfilePic = (e) => {
            const file = e.target.files[0];
            if (file)
            {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setProfilePic(e.target.result);
                };
                reader.readAsDataURL(file);
            }  
        };

  return (
    <div>
        <div className='mainBody'>
            <form className='applicationForm' onSubmit={formik.handleSubmit}>
                <div className='header'>
            <h1>
                Application Form
            </h1>
            </div>
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
                <input type='file' className='documentTag' name='rationPic' onBlur={formik.handleBlur} value={formik.values.rationPic || ''} onChange={formik.handleChange} />
                {formik.touched && formik.errors.rationPic ? (<div className='error'>{formik.errors.rationPic}</div>):null}
                {formik.touched.rationNo && formik.errors.rationNo ? (<div className='error'>{formik.errors.rationNo}</div>):null} 
                <br/>
                <label htmlFor='adharNo' className='label1'>
                    Adhar Card No
                </label>
                <br/>
                <input  id='adharNo' type='text' className='inputTag1' style={{height:"35px", width:"400px"}} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.adharNo}/>
                <input type='file' className='documentTag' name ='adharPic' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.adharPic || ''}/>
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
                <input type='file' className='documentTag' name='incomePic' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.incomePic}/>
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
                    <input type='file' className='documentTag' name='landPic' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.landPic || ''}/>
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
        </div>
    </div>
  )
}

export default ApplicationForm
