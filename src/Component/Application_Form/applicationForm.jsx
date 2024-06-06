import React, { useContext, useEffect } from 'react'
import CryptoJS from 'crypto-js';
import './applicationForm.css'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { CID, create } from 'ipfs-http-client'
import UserNavbar from '../UserNavbar/UserNavbar';
import { db, addDoc, collection, doc } from '../../firebase';
import { documentId, getDoc, getDocs } from 'firebase/firestore';
import { authContext } from '../AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import userbg from '../Assests/user-bg.jpg'
import { scheme, updateApplicantCount } from '../SchemeList'

const ApplicationForm = () => {

  const location = useLocation();
  const param = location.state?.param;

  const { updateFormData } = useContext(authContext);
  const navigate = useNavigate();
  const [secretKey, setSecretKey] = useState();

  useEffect(() => {
    const fetchSecretKey = async () => {
      const docRef = doc(db, 'secretKey', '0wP9TC9QAOkdvquWPYuS');
      const docRefsnapshot = await getDoc(docRef);
      if (docRefsnapshot.exists()) {
        const secretdata = docRefsnapshot.data().secretkey.
          setSecretKey(secretdata);
      }
      else {
        console.log("Not present");
      }
      console.log(secretKey);
    }
  }, [])

  //for ipfs.cat()
  function concatenateUint8Arrays(a, b) {
    const result = new Uint8Array(a.length + b.length);
    result.set(a, 0);
    result.set(b, a.length);
    return result;
  }

  //for PDFs
  function uint8ArrayToString(uint8Array) {
    return new TextDecoder().decode(uint8Array);
  }

  //for PDFs
  const uint8ArrayToBase64 = (uint8Array) => {
    let binary = '';
    Uint8Array.from(uint8Array).forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return window.btoa(binary);
  };

  //for PDFs
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

  //ipfs create function
  const ipfs = create({
    host: 'localhost',
    port: '5001',
    protocol: 'http',
  })
  //conditional validation for land
  const [landOwnership, setLandOwnership] = useState('');
  const handlelandOwnership = (e) => {
    const newLandOwnership = e.target.value;
    setLandOwnership(newLandOwnership);
    formik.setFieldValue('land', newLandOwnership);
  }

  // for validation purposes
  const formik = useFormik(
    {
      initialValues: {
        name: '',
        address: '',
        phoneNo: '',
        rationNo: '',
        adharNo: '',
        wardNo: '',
        houseNo: '',
        kudumbasree: '',
        disable: '',
        government: '',
        income: '',
        pl: '',
        land: '',
        village: '',
        surveyNo: '',
        area: '',
        toilet: '',
        water: '',
        rationPic: '',
        adharPic: '',
        incomePic: '',
        landPic: '',
        param: param || '',
        agriculture: '',
        widow: '',
        disease: '',
        unmarried: '',
        previous: '',
        caste: '',
        castePic: '',
      },

      //validation schema
      validationSchema: Yup.object().shape({
        name: Yup.string().matches(/^[A-Za-z\s]+$/, 'Invalid').min(2, 'Too short').required('Full name is required'),
        address: Yup.string().matches(/^[a-zA-Z0-9\s,.'-]{5,100}$/).required('Address is required'),
        phoneNo: Yup.string().matches(/^[0-9]{10}$/, 'Invalid').required('Phone no. is required'),
        rationNo: Yup.string().matches(/^\d{11}$/, 'Invalid').required('Ration no. is required'),
        adharNo: Yup.string().matches(/^\d{12}$/, 'Invalid').required('Adhar no. is required'),
        wardNo: Yup.string().matches(/^\d{1,2}$/, 'Invalid').required('Ward no. is required'),
        houseNo: Yup.string().matches(/^\d{1,2}$/, 'Invalid').required('House no. is required'),
        disable: Yup.string().required('Choose an option'),
        government: Yup.string().required('Choose an option'),
        income: Yup.string().matches(/^[0-9]{1,5}$/, 'Ineligible to apply').required('Income is required'),
        pl: Yup.string().required('Choose an option'),
        agriculture: Yup.string().required('Choose an option'),
        widow: Yup.string().required('Choose an option'),
        disease: Yup.string().required('Choose an option'),
        unmarried: Yup.string().required('Choose an option'),
        caste: Yup.string().matches(/^[A-Za-z\s]+$/, 'Invalid').required('Enter your caste'),
        previous: Yup.string().required('Required Field'),
        water: Yup.string().required('Choose an option'),
        kudumbasree: Yup.string().required('Choose an option'),
        land: Yup.string().required('Choose an option'),
        village: Yup.string().test({
          test: function (value) {
            return this.parent.land === 'yes' ? Yup.string().matches(/^[A-Za-z]{0,26}$/, 'Invalid').required('Enter Village name').isValidSync(value) : true;
          },
          message: 'Invalid Village name',
        }),
        area: Yup.string().test({
          test: function (value) {
            return this.parent.land === 'yes' ? Yup.string().matches(/^[0-9]{0,26}$/, 'Invalid').required('Enter Area').isValidSync(value) : true;
          },
          message: 'Invalid Area',
        }),
        surveyNo: Yup.string().test({
          test: function (value) {
            return this.parent.land === 'yes' ? Yup.string().matches(/^[0-9]{0,26}$/, 'Invalid').required('Enter Survey no.').isValidSync(value) : true;
          },
          message: 'Invalid Survey no.',
        }),
        landPic: Yup.mixed().test({
          test: function (value) {
            return this.parent.land === 'yes' ? Yup.mixed().required('Adharam is required').isValidSync(value) : true;
          },
          message: 'Adharam is required',
        }),
        toilet: Yup.string().required('Choose an option'),
        rationPic: Yup.mixed().required("Ration card is required"),
        adharPic: Yup.mixed().required("Adhar card is required"),
        incomePic: Yup.mixed().required("Income certificate is required"),
        castePic: Yup.mixed().required("Caste certificate is required"),
      }),

      //submit function
      onSubmit: async (values) => {
        console.log('Submitting form data...');
        try {
          const bufferRationPic = await convertFileToBuffer(values.rationPic);
          values.rationPic = uint8ArrayToBase64(new Uint8Array(bufferRationPic));

          const bufferCastePic = await convertFileToBuffer(values.castePic);
          values.castePic = uint8ArrayToBase64(new Uint8Array(bufferCastePic));

          const bufferAdharPic = await convertFileToBuffer(values.adharPic);
          values.adharPic = uint8ArrayToBase64(new Uint8Array(bufferAdharPic));

          const bufferIncomePic = await convertFileToBuffer(values.incomePic);
          values.incomePic = uint8ArrayToBase64(new Uint8Array(bufferIncomePic));

          const bufferLandPic = await convertFileToBuffer(values.landPic);
          values.landPic = uint8ArrayToBase64(new Uint8Array(bufferLandPic));

          const applicationData = {
            name: values.name,
            address: values.address,
            phoneNo: values.phoneNo,
            rationNo: values.rationNo,
            adharNo: values.adharNo,
            wardNo: values.wardNo,
            houseNo: values.houseNo,
            disabled: values.disable,
            government: values.government,
            income: values.income,
            pl: values.pl,
            water: values.water,
            kudumbasreed: values.kudumbasree,
            village: values.village,
            area: values.area,
            surveyNo: values.surveyNo,
            land: values.land,
            toilet: values.toilet,
            rationPic: values.rationPic,
            adharPic: values.adharPic,
            incomePic: values.incomePic,
            landPic: values.landPic,
            agriculture: values.agriculture,
            widow: values.widow,
            disease: values.disease,
            unmarried: values.unmarried,
            previous: values.previous,
            caste: values.caste,
            castePic: values.castePic,
            param: values.param,
          };
          //onSubmit functionality 
          console.log("Before : ", applicationData);
          const applicationFormJSON = JSON.stringify(applicationData);
          const encryptedData = CryptoJS.AES.encrypt(applicationFormJSON, "secretKey").toString();
          const cid = (await ipfs.add(encryptedData)).path;
          console.log("CID : ", cid);
          const gatewayURL = 'https://gateway.ipfs.io/ipfs/';
          const fileURL = gatewayURL + cid;
          console.log("File : ", fileURL);
          //database addition
          const collectionReference = collection(db, 'applicantForm');
          const dataToAdd = {
            Submitted: new Date(),
            CID: cid,
          };
          await addDoc(collectionReference, dataToAdd);
          updateApplicantCount(param, true);
          navigate('/Schemes')
        }

        catch (error) {
          console.log("error", error);
        }
      },
    });

  //validation and submit function ends here

  return (
    <div className='application-form-body'>
      <UserNavbar backgroundColor="transparent" />
      <h1 className='header'>
        Application Form
      </h1>
      <form className='application-form' onSubmit={formik.handleSubmit}>
        <br />
        {/* Personal details begins */}
        <div className='personal-details-para'>1. Personal details</div>
        <div className="personal-details">
          <div className="application-form-grid">
            <br />
            <input id='name' name='name' type='text' className='inputTag full-name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder='Full name' />
            {formik.touched.name && formik.errors.name ? (<div className='application-form-error'>{formik.errors.name}</div>) : null}
            <br />
          </div>

          <div className="application-form-grid">
            <br />
            <input id='address' name='address' type='text' className='inputTag address'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              placeholder='Address' />
            {formik.touched.address && formik.errors.address ? (<div className='application-form-error'>{formik.errors.address}</div>) : null}
            <br />
          </div>

          <div className="application-form-grid">
            <br />
            <input id='phoneNo' type='text' className='inputTag phone-number'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNo}
              placeholder='Phone No' />
            {formik.touched.phoneNo && formik.errors.phoneNo ? (<div className='application-form-error'>{formik.errors.phoneNo}</div>) : null}
            <br />
          </div>

          <div className="application-form-grid">
            <br />
            <input id='wardNo' type='text' className='inputTag ward-number'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.wardNo}
              placeholder='Ward No' />
            {formik.touched.wardNo && formik.errors.wardNo ? (<div className='application-form-error'>{formik.errors.wardNo}</div>) : null}
            <br />
          </div>

          <div className="application-form-grid">
            <br />
            <input id='houseNo' type='text' className='inputTag house-number'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.houseNo}
              placeholder='House No' />
            <br />
            {formik.touched.houseNo && formik.errors.houseNo ? (<div className='application-form-error'>{formik.errors.houseNo}</div>) : null}
            <br />
          </div>

          <div className="application-form-grid">
            <br />
            <input id='rationNo' type='text' className='inputTag ration-card-number'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rationNo}
              placeholder='Ration No' />
            {formik.touched.rationNo && formik.errors.rationNo ? (<div className='application-form-error'>{formik.errors.rationNo}</div>) : null}
            <input
              type="file" accept='.pdf' className="documentTag" name="rationPic" onBlur={formik.handleBlur}
              onChange={(event) => {
                formik.setFieldValue('rationPic', event.currentTarget.files[0]);
              }} />
            {formik.touched.rationPic && formik.errors.rationPic ? (<div className='application-form-error'>{formik.errors.rationPic}</div>) : null}
            <br />
          </div>

          <div className="application-form-grid">
            <br />
            <input id='adharNo' type='text' className='inputTag adhar-card-number'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.adharNo}
              placeholder='Adhar No' />
            {formik.touched.adharNo && formik.errors.adharNo ? (<div className='application-form-error'>{formik.errors.adharNo}</div>) : null}
            <input type='file' accept=".pdf" className='documentTag adhar-pic' name='adharPic' onBlur={formik.handleBlur} onChange={(event) => {
              formik.setFieldValue('adharPic', event.currentTarget.files[0]);
            }} />
            {formik.touched.adharPic && formik.errors.adharPic ? (<div className='application-form-error'>{formik.errors.adharPic}</div>) : null}
            <br />
          </div>

          <div className="application-form-grid">
            <input type='text' id='income' className='inputTag annual-income'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.income}
              placeholder='Annual Income' />
            {formik.touched.income && formik.errors.income ? (<div className='application-form-error'>{formik.errors.income}</div>) : null}
            <input type='file' accept=".pdf" className='documentTag' name='incomePic' onBlur={formik.handleBlur} onChange={(event) => {
              formik.setFieldValue('incomePic', event.currentTarget.files[0]);
            }} />
            {formik.touched.incomePic && formik.errors.incomePic ? (<div className='application-form-error'>{formik.errors.incomePic || ''}</div>) : null}
            <br />
          </div>

          <div className="application-form-grid">
            <input type='text' id='caste' className='inputTag caste'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.caste}
              placeholder='Caste' />
            {formik.touched.caste && formik.errors.caste ? (<div className='application-form-error'>{formik.errors.caste}</div>) : null}
            <input type='file' accept=".pdf" className='documentTag' name='castePic' onBlur={formik.handleBlur} onChange={(event) => {
              formik.setFieldValue('castePic', event.currentTarget.files[0]);
            }} />
            {formik.touched.castePic && formik.errors.castePic ? (<div className='application-form-error'>{formik.errors.castePic || ''}</div>) : null}
            <br />
          </div>

          <div className="application-form-grid">
            <label htmlFor="scheme" className="application-form-label scheme-header">
              Scheme
              <input type="text" id="scheme" className="inputTag Scheme-name"
                value={formik.values.param}
                readOnly />
            </label>
          </div>
        </div>
        <br /><br /><br />
        {/* personal details ends */}
        <br />

        {/* general-details */}
        <div className="general-details-para">2. General Details</div><br />

        <div className="general-details">

          <div className="general-details-grid">
            <label className='application-form-label'>
              Are you currently a member of any kudumbasree unit?
            </label>
            <br />
            <label htmlFor='yesKudumbasree'>
              <input type='radio' name='kudumbasree' id='yesKudumbasree'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value="yes" />
              Yes
            </label>
            <br />
            <label htmlFor='noKudumbasree'>
              <input type='radio' name='kudumbasree' id='noKudumbasree'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value="no" />
              No
            </label>
            <br />
            {formik.touched.kudumbasree && formik.errors.kudumbasree ? (<div className='application-form-error'>{formik.errors.kudumbasree}</div>) : null}
          </div>

          <div className="general-details-grid">
            <label className='application-form-label'>
              Do you have any disabled member in your family?
            </label>
            <br />
            <label htmlFor='yesdisabled'>
              <input type='radio' name='disable' id='yesdisabled'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value="yes" />
              Yes
            </label>
            <br />
            <label htmlFor='nodisabled'>
              <input type='radio' name='disable' id='nodisabled'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value="no" />
              No
            </label>
            <br />
            {formik.touched.disable && formik.errors.disable ? (<div className='application-form-error'>{formik.errors.disable}</div>) : null}
          </div>

          <div className="general-details-grid">
            <label className='application-form-label'>
              Do you have a government employed member in your family?
            </label>
            <br />
            <label htmlFor='yesgovernment'>
              <input type='radio' name='government' id='yesgovernment'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value="yes" />
              Yes
            </label>
            <br />
            <label htmlFor='nogovernment' >
              <input type='radio' name='government' id='nogovernment'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value="no" />
              No
            </label>
            <br />
            {formik.touched.government && formik.errors.government ? (<div className='application-form-error'>{formik.errors.government}</div>) : null}
          </div>

          <div className="general-details-grid">
            <label className='application-form-label'>
              Do you belong to APL or BPL?
            </label>
            <br />
            <label htmlFor='yesAPL'>
              <input type='radio' name='pl' id='yesAPL'
                value="APL"
                checked={formik.values.pl === 'APL'}
                onChange={formik.handleChange} />
              APL
            </label>
            <br />
            <label htmlFor='yesBPL'>
              <input type='radio' name='pl' id='yesBPL'
                value="BPL"
                checked={formik.values.pl === 'BPL'}
                onChange={formik.handleChange} />
              BPL
            </label>
            <br />
            {formik.touched.pl && formik.errors.pl ? (<div className='application-form-error'>{formik.errors.pl}</div>) : null}
          </div>

          <div className="general-details-grid">
            <label className='application-form-label'>
              Do you own any plot of land?
            </label>
            <br />
            <label htmlFor='yesland'>
              <input type='radio' name='land' id='yesland'
                value="yes"
                checked={landOwnership === 'yes'}
                onChange={handlelandOwnership} />
              Yes
            </label>
            <br />
            <label htmlFor='noland'>
              <input type='radio' name='land' id='noland'
                value="no"
                checked={landOwnership === 'no'}
                onChange={handlelandOwnership} />
              No
              <br />
              {formik.touched.land && formik.errors.land ? (<div className='application-form-error'>{formik.errors.land}</div>) : null}
              <br />
            </label>
            {landOwnership === 'yes' && (
              <div>
                <br />
                <input type='text' id='village' className='inputTag1'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.village}
                  placeholder='Village No' />
                {formik.touched.village && formik.errors.village ? (<div className='application-form-error'>{formik.errors.village}</div>) : null}
                <br />
                <input type='text' id='surveyNo' className='inputTag1'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.surveyNo}
                  placeholder='Survey No' />
                {formik.touched.surveyNo && formik.errors.surveyNo ? (<div className='application-form-error'>{formik.errors.surveyNo}</div>) : null}
                <br />
                <input type='text' id='area' className='inputTag1'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.area}
                  placeholder='Area name' />
                {formik.touched.area && formik.errors.area ? (<div className='application-form-error'>{formik.errors.area}</div>) : null}
                <br />
                <input type='file' accept=".pdf" className='documentTag' name='landPic' onBlur={formik.handleBlur} onChange={(event) => {
                  formik.setFieldValue('landPic', event.currentTarget.files[0]);
                }} />
                {formik.touched.landPic && formik.errors.landPic ? (<div className='application-form-error'>{formik.errors.landPic}</div>) : null}
              </div>
            )}
          </div>

          <div className="general-details-grid">
            <label className='application-form-label' >
              Please select your source of water
            </label>
            <br />
            <label htmlFor='yeswater'>
              <input type='radio' name='water' id='yeswater' value="private" checked={formik.values.water === 'private'} onChange={formik.handleChange} />
              Private water
              <br />
            </label>
            <label htmlFor='nowater'>
              <input type='radio' name='water' id='nowater' value="public" checked={formik.values.water === 'public'} onChange={formik.handleChange} />
              Public water
              <br />
            </label>
            <br />
            {formik.touched.water && formik.errors.water ? (<div className='application-form-error'>{formik.errors.water}</div>) : null}
          </div>

          <div className="general-details-grid">
            <label className='application-form-label'>
              Do you have the facilities for a private toilet?
            </label>
            <br />
            <label htmlFor='yestoilet'>
              <input type='radio' name='toilet' id='yestoilet' value="yes" checked={formik.values.toilet === 'yes'} onChange={formik.handleChange} />
              Yes
              <br />
            </label>
            <label htmlFor='notoilet'>
              <input type='radio' name='toilet' id='notoilet' value="no" checked={formik.values.toilet === 'no'} onChange={formik.handleChange} />
              No
              <br />
            </label>
            <br />
            {formik.touched.toilet && formik.errors.toilet ? (<div className='application-form-error'>{formik.errors.toilet}</div>) : null}
          </div>

          <div className="general-details-grid">
            <label className='application-form-label'>
              Is agriculture the only source of your income?
            </label>
            <br />
            <label htmlFor='yesagriculture'>
              <input type='radio' name='agriculture' id='yesagriculture' value="yes" checked={formik.values.agriculture === 'yes'} onChange={formik.handleChange} />
              Yes
              <br />
            </label>
            <label htmlFor='noagriculture'>
              <input type='radio' name='agriculture' id='noagriculture' value="no" checked={formik.values.agriculture === 'no'} onChange={formik.handleChange} />
              No
              <br />
            </label>
            <br />
            {formik.touched.agriculture && formik.errors.agriculture ? (<div className='application-form-error'>{formik.errors.agriculture}</div>) : null}
          </div>

          <div className="general-details-grid">
            <label className='application-form-label'>
              Are you a widow/divorced?
            </label>
            <br />
            <label htmlFor='yeswidow'>
              <input type='radio' name='widow' id='yeswidow' value="yes" checked={formik.values.widow === 'yes'} onChange={formik.handleChange} />
              Yes
              <br />
            </label>
            <label htmlFor='nowidow'>
              <input type='radio' name='widow' id='nowidow' value="no" checked={formik.values.widow === 'no'} onChange={formik.handleChange} />
              No
              <br />
            </label>
            <br />
            {formik.touched.widow && formik.errors.widow ? (<div className='application-form-error'>{formik.errors.widow}</div>) : null}
          </div>

          <div className="general-details-grid">
            <label className='application-form-label'>
              Are you infected by any disease?
            </label>
            <br />
            <label htmlFor='yesdisease'>
              <input type='radio' name='disease' id='yesdisease' value="yes" checked={formik.values.disease === 'yes'} onChange={formik.handleChange} />
              Yes
              <br />
            </label>
            <label htmlFor='nowidow'>
              <input type='radio' name='disease' id='nodisease' value="no" checked={formik.values.disease === 'no'} onChange={formik.handleChange} />
              No
              <br />
            </label>
            <br />
            {formik.touched.disease && formik.errors.disease ? (<div className='application-form-error'>{formik.errors.disease}</div>) : null}
          </div>

          <div className="general-details-grid">
            <label className='application-form-label'>
              Do you have unmarried daughters?
            </label>
            <br />
            <label htmlFor='yesunmarried'>
              <input type='radio' name='unmarried' id='yesunmarried' value="yes" checked={formik.values.unmarried === 'yes'} onChange={formik.handleChange} />
              Yes
              <br />
            </label>
            <label htmlFor='nounmarried'>
              <input type='radio' name='unmarried' id='nounmarried' value="no" checked={formik.values.unmarried === 'no'} onChange={formik.handleChange} />
              No
              <br />
            </label>
            <br />
            {formik.touched.unmarried && formik.errors.unmarried ? (<div className='application-form-error'>{formik.errors.unmarried}</div>) : null}
          </div>

          <div className="general-details-grid">
            <br />
            <input id='previous' name='previous' type='text' className='inputTag previous'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.previous}
              placeholder='Previously granted schemes (If so any)' />
            {formik.touched.previous && formik.errors.previous ? (<div className='application-form-error'>{formik.errors.previous}</div>) : null}
            <br />
          </div>

        </div>
        {/* general ends */}

        <br />
        <button type='submit' className='application-submit-button' onSubmit={formik.handleSubmit}>
          SUBMIT
        </button>
        <br />
        <br />
      </form>
    </div>
  )
}

export default ApplicationForm
