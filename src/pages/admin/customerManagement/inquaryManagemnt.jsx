import React, { useEffect, useState } from "react";
import "../client/client.css";
import axios from "axios";
import ClientValidation from "../../../validation/ClientValidation";
import VueSweetalert2 from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from 'react-router-dom';
import { useParams} from "react-router-dom";

import logo from "../../../../src/assets/images/logoBrandLarge.png";

const Service = () => {

    const [service_category, setService_category] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [feedback, setFeedback] = useState('');
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [itemId, setItemId] = useState();
    const [formData, setFormData] = useState({});

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

    useEffect(() => {
        axios.get('http://localhost:8000/api/user/inq/all')
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);

    const handleDelete = (item) => {
        console.log(item._id);
        axios.delete(`http://localhost:8000/api/user/inq/${item._id}`)
        .then(() => {
          setData(data.filter((d) => d.id !== item._id));
          
        });
        
      };

      const handleEdit = (item) => {
        setIsEditing(true);
        setItemId(item._id);
        setService_category(item.service_category);
        setEmail(item.email);
        setName(item.name);
        setDate(item.date);
        setFeedback(item.feedback);
      };

      const handleUpdate = (event) => {
        event.preventDefault();
        console.log(id)
        
        axios.put(`http://localhost:8000/api/user/inq/${itemId}`, { service_category, email, name, date, feedback }).then(() => {
          setData(data.map((item) => (item.id === itemId ? { id: itemId, service_category, email, name, date, feedback } : item)));
          setIsEditing(false);
          setService_category('');
          setEmail('');
          setName('');
          setDate('');
          setFeedback('');
        });
      
      };

      const handleCreate = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/user/inq/', { service_category, email, name, date, feedback }).then((response) => {
          setData([...data, { id: response.data.id, service_category, email, name, date, feedback }]);
          setService_category('');
          setEmail('');
          setName('');
          setDate('');
          setFeedback('');
        });
      };


    const displayAllClients = () => {
        return data.map(user => (
            <tr key={user.id}>

                <td>{user.service_category}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.date}</td>
                <td>{user.feedback}</td>
                <td>
                <button  className="btn btn-success" onClick={() => handleEdit(user)}>Edit</button>
                {/* <button onClick={() => handleUpdate(item)}>Edit</button> */}
                <button className="btn btn-danger" onClick={() => handleDelete(user)}>Delete</button>
              </td>




            </tr>
        ));
    };

    const generatePDF = () => {
        const specialElementHandlers = {
            '.no-export': function (element, renderer) {
                return true;
            }
        };
        const doc = new jsPDF('p', 'pt', 'a4');

          // Add logo
           
          const logoImage =logo; // Replace with your logo image path

            const logoWidth = 80; // Adjust the width of the logo as needed
          
            const logoHeight = 20; // Adjust the height of the logo as needed
          
            doc.addImage(logoImage, 'PNG', 160, 10, logoWidth, logoHeight);
          
            <br/>


        doc.text(305, 20, 'Client Details', 'center');

        const head = [[ 'Service Category', 'Email',
            'Name', 'Date', 'Feedback']];
        const elements = data.map(client => [client.service_category, client.email,
            client.name, client.date, client.feedback]);

        autoTable(doc, {
            head: head,
            body: elements,
        })
        doc.save("clientDetails.pdf");
    }



    return (
        <div>
            <div className="main_container">
                <br />
                <div className="item fw-bold">Client Management</div>


                <div className="item">
                    <div className="row mt-5 ps-3">
                        <div className="row">
                            <div className=" col-lg-6 col-md-12 col-sm-12">
                                <div className="row">
                                <div className="d-flex justify-content-start align-items-center">
                                        <button onClick={() => {
                                            generatePDF()
                                        }} id="btn-generate-report" className="btn me-3">Generate Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-6">


                        <div className="table-responsive">
                            <table className="table table-striped custom-table" id="assignLabsTable">
                                <thead>
                                    <tr>
                                        <th scope="col">Service Category</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Feedback</th>
                                        <th scope="col">Action</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayAllClients()}
                                </tbody>
                            </table>
                        </div>


                        <div className="col">
                            <br />  <br />  <br />
                            <h1><b>Edit Service Details</b></h1>
                            <div className="row mt-5 px-3">



                                <form id="clientForm" onSubmit={isEditing ? handleUpdate : handleCreate}>

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
                                                className="btn btnRegister"

                                            >
                                                {isEditing ? 'Update' : 'Create'}
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
