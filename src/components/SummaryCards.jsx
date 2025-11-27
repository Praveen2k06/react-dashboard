import React from "react";
import {BiFemale, BiMale} from "react-icons/bi";
import {FaFemale} from "react-icons/fa";

const SummaryCards = ({data}) => {
    return <div className="row g-3 mb-4 border rounded shadow-sm">
        <div className="col-md-2 mb-3">
            <div className="d-flex flex-column ps-3">
                <p className="m-0 text-nowrap">Total Learner Enrolled</p>
                <h4 className="fw-bold">{data?.totalLearners}</h4>
            </div>
        </div>
        <div className="col-md-2 mb-3">
            <div className="d-flex" style={{borderLeft: "3px solid #5ECDFA"}}>
                <BiMale style={{color: "#5ECDFA", fontSize: "55px"}}/>
                <div>
                    <p className=" m-0">Male</p>
                    <h4 className="fw-bold">{data?.male}</h4>
                </div>
            </div>
        </div>
        <div className="col-md-2 mb-3">
            <div className="d-flex" style={{borderLeft: "3px solid #F35BC4"}}>
                <BiFemale style={{color: "#F35BC4", fontSize: "55px"}}/>
                <div>
                    <p className=" m-0">Female</p>
                    <h4 className="fw-bold">{data?.female}</h4>
                </div>
            </div>
        </div>
        <div className="col-md-2 mb-3">
            <div className="d-flex" style={{borderLeft: "3px solid #D7A6FF"}}>
                <FaFemale style={{color: "#D7A6FF", fontSize: "48px"}}/>
                <div>
                    <p className=" m-0">Others</p>
                    <h4 className="fw-bold">{data?.others}</h4>
                </div>
            </div>
        </div>
        <div className="col-md-2 mb-3">
            <div className="d-flex flex-column align-items-center" style={{borderLeft: "3px solid #3ed790"}}>
                <p className=" m-0">Active Learners</p>
                <h4 className="fw-bold" style={{color: "#3ed790"}}>{data?.activeLearners}</h4>
            </div>
        </div>
        <div className="col-md-2 mb-3">
            <div className="d-flex flex-column align-items-center" style={{borderLeft: "3px solid #f79861"}}>
                <p className=" m-0">Engaged Learners</p>
                <h4 className="fw-bold" style={{color: "#f79861"}}>{data?.engagedLearners}</h4>
            </div>
        </div>
    </div>;
}

export default SummaryCards;