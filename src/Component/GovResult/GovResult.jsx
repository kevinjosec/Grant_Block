import React from 'react'
import './GovResult.css'

const GovResult = () => {
    return (
        <div className='result-main-body'>
            <h1 className="result-header">Final Results</h1>
            <div className="result-content">
                <p className="result-content-header">Beneficiary List</p>
                <div className="result-body-container">
                    <div className="result-body serial">1</div>
                    <div className="result-body name">Kevin Jose</div>
                    <div className="result-body number">7994495225</div>
                    <div className="result-body marks"> 100</div>
                </div>
            </div>
        </div>
    )
}

export default GovResult
