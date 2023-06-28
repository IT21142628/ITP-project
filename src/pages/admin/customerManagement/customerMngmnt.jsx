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

    const [customer_name, setCustomer_name] = useState('');
    const [email, setEmail] = useState('');
    const [nic, setNic] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [itemId, setItemId] = useState();
    const [formData, setFormData] = useState({});

    

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

    useEffect(() => {
        axios.get('http://localhost:8000/api/user/all')
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);

    const handleDelete = (item) => {
        console.log(item._id);
        axios.delete(`http://localhost:8000/api/user/${item._id}`)
        .then(() => {
          setData(data.filter((d) => d.id !== item._id));
          
        });
        
      };

      const handleEdit = (item) => {
        setIsEditing(true);
        setItemId(item._id);
        setCustomer_name(item.customer_name);
        setEmail(item.email);
        setNic(item.nic);
        setPhone_number(item.phone_number);
        setPassword(item.password);
      };

      const handleUpdate = (event) => {
        event.preventDefault();
        console.log(id)
        
        axios.put(`http://localhost:8000/api/user/${itemId}`, { customer_name, email, nic, phone_number, password }).then(() => {
          setData(data.map((item) => (item.id === itemId ? { id: itemId, customer_name, email, nic, phone_number, password } : item)));
          setIsEditing(false);
          setCustomer_name('');
          setEmail('');
          setNic('');
          setPhone_number('');
          setPassword('');
        });
      
      };

      const handleCreate = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/user/', { customer_name, email, nic, phone_number, password }).then((response) => {
          setData([...data, { id: response.data.id, customer_name, email, nic, phone_number, password }]);
          setCustomer_name('');
          setEmail('');
          setNic('');
          setPhone_number('');
          setPassword('');
        });
      };


    const displayAllClients = () => {
        return data.map(user => (
            <tr key={user.id}>

                <td>{user.customer_name}</td>
                <td>{user.email}</td>
                <td>{user.nic}</td>
                <td>{user.phone_number}</td>
                <td>{user.password}</td>
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

        const logoImage =logo; // Replace with your logo image path

          const logoWidth = 80; // Adjust the width of the logo as needed
        
          const logoHeight = 20; // Adjust the height of the logo as needed
        
          doc.addImage(logoImage, 'PNG', 160, 10, logoWidth, logoHeight);
        
          <br/>

        doc.text(305, 20, 'Client Details', 'center');

        const head = [[ 'Customer Name', 'Email',
            'NIC', 'Phone Number', 'Password']];
        const elements = data.map(client => [client.customer_name, client.email,
            client.nic, client.phone_number, client.password]);

        autoTable(doc, {
            head: head,
            body: elements,
        })
        doc.save("clientDetails.pdf");
    }

    const handleMobileChange = (event) => {
        const input = event.target.value;
        if (input.length <= 10) {
            setPhone_number(input);
        }
      };
    const handleNICChange = (event) => {
        const input = event.target.value;
        if (input.length <= 20) {
            setNic(input);
        }
      };




    return (
        <div>
            <div className="main_container">
                <br/>
                
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
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">NIC</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Password</th>
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
                            <h1><b>Edit Customer Details</b></h1>
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
                                                type="text"
                                                className="form-control"
                                                placeholder="NIC"
                                                value={nic}
                                                onChange={handleNICChange}
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
                                                readOnly
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
