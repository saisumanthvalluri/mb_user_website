import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoMdShare, IoIosHeartEmpty, IoMdDownload } from "react-icons/io";
// import { BsCheck2 } from "react-icons/bs";
import "./index.css";
import DynamicHeader from "../../Components/DynamicHeader";
// import JobFilters from "../Jobs/Filters";
import { jobsData } from "../../Config/constants";
import Footer from "../../Components/Footer";
import DynamicModal from "../../Components/DynamicModal";
import useApplicationStore from "../../Store/useApplicationStore";

const JobDetails = () => {
    const [searchParams] = useSearchParams();
    const paramValue = searchParams.get("job_id") || "No param provided";
    const jobData = jobsData[paramValue - 1];
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    // const [jobTabId, setJobTabId] = useState(2);

    const { setSelectedJob } = useApplicationStore();

    const handleJobApply = () => {
        if (!jobData?.otrFilled) {
            setOpen(true);
        } else {
            setSelectedJob(jobData);
            navigate("/apply-through-otr");
        }
    };

    const VacancyDetailsTable = (data) => (
        <table className="vac-det-tbl">
            <thead>
                <tr>
                    <th>Post Name</th>
                    <th>Total</th>
                    <th>Age</th>
                    <th>Category</th>
                    <th>Qualification</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.postName}>
                        <td>{item.postName}</td>
                        <td>{item.total}</td>
                        <td>{item.age}</td>
                        <td>{item.category}</td>
                        <td>{item.qulaification}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <>
            <DynamicHeader type="inner" />
            <div className="job-details-bg">
                <div className="inner-body">
                    {/* <JobFilters jobTabId={jobTabId} setJobTabId={setJobTabId} /> */}
                    <h3 className="job-title">{jobData?.title}</h3>
                    <div className="details">
                        <div className="job-desc">
                            <span>{jobData.company}</span>
                            <p>{jobData.jobDescription}</p>
                        </div>
                        <div className="job-details">
                            <p>
                                <span>Qualification:</span> {jobData.qualification}
                            </p>
                            <p>
                                <span>Post Date:</span> {jobData.post_date}
                            </p>
                            <p>
                                <span>Last Date:</span> {jobData.last_date}
                            </p>
                            <div className="more-item">
                                <p>Application Fee:</p>
                                <ul>
                                    {jobData?.applicationFee?.map((fee) => (
                                        <li key={fee.id}>{`>> ${fee.item}`}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="more-item">
                                <p>Important Dates:</p>
                                <ul>
                                    {jobData?.imp_dates?.map((date) => (
                                        <li key={date.id}>{date.item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="more-item">
                                <p>Age Limit (As on 21-05-2024):</p>
                                <ul>
                                    {jobData?.ageLimit?.map((age) => (
                                        <li key={age.id}>{age.item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="more-item">
                                <p>Qualification:</p>
                                <span>{jobData?.qualification_more}</span>
                                <span>For More Details Refer Notification.</span>
                            </div>
                            <div className="more-item">
                                <p>Vacancy Details:</p>
                                {VacancyDetailsTable(jobData?.vacancyDetails)}
                            </div>
                        </div>
                        <div className="job-actions">
                            <div>
                                <IoMdShare className="icon" />
                                <IoIosHeartEmpty className="icon" />
                            </div>
                            <div>
                                <button className="notif">
                                    <IoMdDownload /> Notification
                                </button>
                                <button onClick={handleJobApply}>Apply Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                {open && (
                    <DynamicModal setOpen={setOpen}>
                        {
                            !jobData?.otrFilled && (
                                <>
                                    <h3>
                                        Fill your <span>OTR Form</span> and Apply Your Favourite Exam Within two Minutes
                                    </h3>
                                    <div className="atn-btn-box">
                                        <button onClick={() => navigate("/otr")}>Register OTR Form</button>
                                    </div>
                                </>
                            )
                            // : (
                            //     <>
                            //         <div className="tick-box">
                            //             <BsCheck2 />
                            //         </div>
                            //         <h3>
                            //             <span>OTR Form</span> is Completed Successfully. Your SPN ID is{" "}
                            //             <span className="spn-id">AP125XXXXX</span>. Now you can start your Job Application
                            //             Form
                            //         </h3>
                            //         <div className="atn-btn-box">
                            //             <button onClick={() => setOpen(false)}>OK</button>
                            //             <button>Apply</button>
                            //         </div>
                            //     </>
                            // )
                        }
                    </DynamicModal>
                )}
                <Footer />
            </div>
        </>
    );
};

export default JobDetails;
