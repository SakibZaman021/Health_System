import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { fetchDoctorList } from './api';
import Header from './include/Header';
import Loader from './include/Loader';
import Sidebar from './include/Sidebar';

function DoctorList(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isSearch, setSearch] = useState("");
    const [isData, setData] = useState([]);
    const [isSearchLoading, setSearchLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        async function fetchData() {
            const response = await fetchDoctorList();
            setData(response);
            setIsLoading(false);
        }
        fetchData();
    }, []);
    
    function searchDoctor(event) {
        let keyword = event.target.value;
        setSearch(keyword);
        setSearchLoading(true);
        async function fetchData() {
            const response = await fetchDoctorList(keyword);
            setData(response);
            setSearchLoading(false);
        }
        fetchData();
    }

    return (
        <div className="main-wrapper">
            {
                isLoading
                    ?
                    <Loader />
                    :
                    null
            }
            <Header data={props} />
            <Sidebar data={props} />

            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h3 className="page-title">Doctor</h3>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item active">Doctor List</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row filter-row">
                        <div className="col-sm-6 col-md-4">
                            <div className="form-group form-focus">
                                <input type="text" className="form-control floating" defaultValue={isSearch} onChange={(e) => searchDoctor(e)} />
                                <label className="focus-label">Search by Doctor Name</label>
                            </div>
                        </div>
                    </div>


                    <div className="row staff-grid-row">
                        {
                            !isLoading
                                ?
                                isData.data.length > 0
                                    ?
                                    isSearchLoading
                                        ?
                                        <div className="col-md-12">
                                            <h4>Loading...</h4>
                                        </div>
                                        :
                                        isData.data.map(function (data) {
                                            return (
                                                <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3" key={data.id}>
                                                    <div className="profile-widget">
                                                        <h4 className="user-name m-t-10 mb-0 text-ellipsis"><Link to={'/doctor_details/' + data.id}>{data.name}</Link></h4>
                                                        <h5 className="user-name m-t-10 mb-0 text-ellipsis"><a href={'mailto:' + data.email}>{data.email}</a></h5>
                                                        <h5 className="user-name m-t-10 mb-0 text-ellipsis"><a href={'tel:' + data.mobile}>{data.mobile}</a></h5>
                                                        
                                                        <Link to={'/doctor_details/' + data.id} className="btn btn-white btn-sm m-t-10">View Profile</Link>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    :
                                    <div className="col-md-12">
                                        <h4>No record found...</h4>
                                    </div>
                                :
                                null
                        }

                    </div>
                </div>
            </div>
        </div >
    )
}

export default DoctorList;