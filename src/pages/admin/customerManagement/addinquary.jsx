import React, { useEffect, useState } from "react";
import "../client/client.css";
import axios from "axios";
import ClientValidation from "../../../validation/ClientValidation";
import VueSweetalert2 from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from 'react-router-dom';

const Service = () => {

    const [service_category, setService_category] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [feedback, setFeedback] = useState('');
    const [data, setData] = useState([]);

    const currentDate = new Date().toISOString().split('T')[0];
    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = { service_category, email, name, date, feedback };
        axios.post('http://localhost:8000/api/user/inq/', newUser)
            .then(response => console.log(response))
            .catch(error => console.log(error));
            setService_category('');
            setEmail('');
            setName('');
            setDate('');
            setFeedback('');

    };

  

    const handleClear = () => {
        //  clear input value
        setService_category('');
        setEmail('');
        setName('');
        setDate('');
        setFeedback('');
      };

    useEffect(() => {
        axios.get('http://localhost:8000/api/user/inq/all')
          .then(response => setData(response.data))
          .catch(error => console.log(error))
      }, []);


      const displayAllClients = () => {
        return data.map(user => (
            <tr key={user.id}>
               
                    
                        <td>{user.service_category}</td>
                        <td>{user.feedback}</td>
                        
            </tr>
                ));
    };





    return (
        <div>
            <div className="main_container">
                <br />
                <div className="item fw-bold">Feedback Management</div>

                
                <div className="item">
                    <div className="row mt-5 ps-3">
                        <div className="row">
                            <div className=" col-lg-6 col-md-12 col-sm-12">
                                <div className="row">

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-6">
                        <div className="col">
                        <h1>Add feedback</h1>
                            <div className="row mt-5 px-3">

                                
                                
                                <form id="clientForm" onSubmit={handleSubmit}>
                                    
                                    <div className="row">
                                        <div className="col d-flex justify-content-end align-items-center">
                                            <div className="col d-flex justify-content-end">
                                                
                                                <div>
                                                    
                                                    <button
                                                        hidden
                                                        className="btn btnEditImg"
                                                        id="btnEditImg"
                                                        type="button"
                                                    >
                                                        <i className="fa-solid fa-pen text-white" />
                                                    </button>
                                                    <button
                                                        hidden
                                                        className="btn btnImgDelete"
                                                        id="btnImgDelete"
                                                        type="button"
                                                    >
                                                        <i className="fa-solid fa-trash-can d-inline text-white" />
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>


                                    

                                    <div className="row mt-4">
                                        <div className="col">
                                            
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Service Category"
                                                value={service_category}
                                                onChange={(event) => setService_category(event.target.value)}

                                            />
                                        </div>
                                        </div>

                                        <div className="row mt-4">
                                        <div className="col">
                                            
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(event) => setEmail(event.target.value)}

                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col">
                                            
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Full Name"
                                                value={name}
                                                onChange={(event) => setName(event.target.value)}

                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col">
                                            
                                            <input
                                                type="date"
                                                className="form-control"
                                                placeholder="Date"
                                                value={date}
                                                min={currentDate} 
                                                onChange={(event) => setDate(event.target.value)}

                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-12">
                                            <textarea
                                                className="form-control"
                                                placeholder="Feedback"
                                                value={feedback}
                                                onChange={(event) => setFeedback(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    


                                    <div className="row mt-5">
                                        <div className="d-flex justify-content-around align-items-center">
                                            <button
                                                type="submit"
                                                className="btn btn-success"

                                            >
                                                Add to Service
                                            </button>
                                            <Link to="/admin/inqupdate">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                
                                                onClick={() => { }}
                                            >
                                                View
                                            </button>
                                            </Link>
                                            <button
                                                
                                                type="button"
                                                className="btn btn-danger"

                                                onClick={handleClear}
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div className="col">

                        <h1>Previous feedback</h1>
                        <div className="table-responsive">
                            <table className="table table-striped custom-table" id="assignLabsTable">
                                <thead>
                                <tr>
                                    
                                    <th scope="col">Service Category</th>
                                    <th scope="col">Service Description</th>
                                    <th scope="col"/>
                                </tr>
                                </thead>
                                <tbody>
                                {displayAllClients()}
                                </tbody>
                            </table>
                        </div>





                        </div>
                    </div>





                </div>
            </div>
        </div>
    );
};

export default Service;
