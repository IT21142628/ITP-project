import React, { useEffect, useState } from "react";
import "../client/client.css";
import axios from "axios";
import ClientValidation from "../../../validation/ClientValidation";
import VueSweetalert2 from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from 'react-router-dom';

const Service = () => {

    const [customer_name, setCustomer_name] = useState('');
    const [email, setEmail] = useState('');
    const [nic, setNic] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = { customer_name, email, nic, phone_number, password };
        axios.post('http://localhost:8000/api/user/', newUser)
            .then(response => console.log(response))
            .catch(error => console.log(error));
            setCustomer_name('');
            setEmail('');
            setNic('');
            setPhone_number('');
            setPassword('');

    };



    const handleClear = () => {
        //  clear input value
        setCustomer_name('');
        setEmail('');
        setNic('');
        setPhone_number('');
        setPassword('');
    };

    const handleMobileChange = (event) => {
        const input = event.target.value;
        if (input.length <= 10) {
            setPhone_number(input);
        }
      };
    const handleNIChange = (event) => {
        const input = event.target.value;
        if (input.length <= 20) {
            setNic(input);
        }
      };

    return (
        <div>
            <div className="main_container">
                <br />
                <br />
                <div className="item fw-bold">Welcome New User</div>


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
                        <div className="col-6">
                           
                            <div className="table-responsive">
                                <img src="https://thumbs.dreamstime.com/b/online-registration-sign-up-concept-young-woman-signing-login-to-account-smartphone-app-user-interface-secure-password-194944775.jpg" />
                            </div>
                        </div>

                        <div className="col">
                            <h1>Register as New Customer</h1>
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
                                                placeholder="Full Name"
                                                value={customer_name}
                                                onChange={(event) => setCustomer_name(event.target.value)}

                                            />
                                        </div>
                                        
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-12">
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
                                                type="number"
                                                className="form-control"
                                                placeholder="NIC"
                                                value={nic}
                                                // onChange={(event) => setNic(event.target.value)}
                                                onChange={handleNIChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Phone"
                                                value={phone_number}
                                                // onChange={(event) => setPhone_number(event.target.value)}
                                                onChange={handleMobileChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col">
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(event) => setPassword(event.target.value)}
                                            />
                                        </div>
                                    </div>


                                    <div className="row mt-5">
                                        <div className="d-flex justify-content-around align-items-center">
                                            <button
                                                type="submit"
                                                className="btn btn-success"

                                            >
                                                Register
                                            </button>
                                            <Link to="/admin/update">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"

                                                    onClick={() => { }}
                                                >
                                                    Login
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

                    </div>





                </div>
            </div>
        </div>
    );
};

export default Service;
