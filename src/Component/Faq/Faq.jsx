import React from 'react';
import './Faq.css';

function Faq() {
  return (
    <div className="usebbbody">
      <div className="dg-main">
      <div className='dg'>
        <div className="fAQ">FAQ</div>
        <div className="para1">Find answers to commonly asked questions</div>
        <div className="question">
          <div className="para1">How do I apply?</div>
          <div className="para2">
            To apply for a grant, you can visit our website and fill out the online application form. Make sure to provide all the required information and supporting documents.
          </div>
        </div>
        <br/>
        <div className="question">
          <div className="para1">What are eligibility criteria?</div>
          <div className="para2">
            The eligibility criteria for grants differ depending on the specific program. Generally, applicants must meet certain income requirements and demonstrate a genuine need for financial assistance.
          </div>
        </div>
        <br/>
        <div className="question">
          <div className="para1">How long does the application process take?</div>
          <div className="para2">
            The applications process typically takes 4-6 weeks. However, the processing time may vary depending on the volume of applications received and the complexity of the grant program.
          </div>
        </div>
        <br/>
        <div className="question">
          <div className="para1">What happens after I submit my applications?</div>
          <div className="para2">
            After you submit your application, it will be received by our team. If your application meets the eligibility criteria and funding is available, you will be notified about the status of your grant.
          </div>
        </div>
        <br/>
        <div className="question">
          <div className="para1">Can I apply for multiple grants?</div>
          <div className="para2">
            Yes, you can apply for multiple grants as long as you meet the eligibility criteria for each program. However, please note that receiving one grant does not guarantee approval for other grants.
          </div>
        </div>
        <br/>
        <div className="question">
          <div className="para1">Still have questions?</div>
          <div className="para2">
            Contact us for more information 0481-272265,0481-272285
          </div>
        </div>
        <br/>
      </div>
      </div>
    </div>
  );
}

export default Faq;