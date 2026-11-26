import React from 'react';
import './Contact.css';

// District Mission Coordinator, Life Mission – phone numbers
const DISTRICT_CONTACTS = [
  ['Thiruvananthapuram', '9400953533'],
  ['Kollam', '7025958296'],
  ['Pathanamthitta', '9495233779'],
  ['Alappuzha', '9995119389'],
  ['Kottayam', '8606729960'],
  ['Idukki', '9446195781'],
  ['Ernakulam', '7306567346'],
  ['Thrissur', '9447008120'],
  ['Palakkad', '8075650342'],
  ['Malappuram', '9946362777'],
  ['Kozhikode', '9497499193'],
  ['Wayanad', '9446310251'],
  ['Kannur', '9562242370'],
  ['Kasargod', '7034327862'],
];

function Contact() {
  return (
    <div className="usebbody">
      <div className="dISTRICTMISSIONCOORDINATORPHON">
        <div className="textBlock">DISTRICT MISSION COORDINATOR PHONE NUMBERS</div>
        <ul className="contact-info-container">
          {DISTRICT_CONTACTS.map(([district, phone]) => (
            <li key={district} className="contact-row">
              <span>District Mission Coordinator, Life Mission - {district}</span>
              <a className="contact-phone" href={`tel:+91${phone}`}>{phone}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Contact;
