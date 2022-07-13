import React,{useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Form } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate'
import {FaPlus} from 'react-icons/fa'

import { db } from "../../firebase-config"
import {collection, getDocs, doc, deleteDoc, updateDoc} from "firebase/firestore"

const Manageemployee = () => {
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [psalary, setsalary] = useState("");

    const [employees, setEmployee] = useState([]);
    const [currentPage, setCurrentPage] = useState([1]);
    const [postsPerPage] = useState([10]);

    const t_employees = collection(db, "employees");

    useEffect(() => {
        const getEmployees = async () =>{
            const data = await getDocs(t_employees);
            setEmployee(data.docs.map((doc) => ({ ...doc.data(),id: doc.id })))
        }
        getEmployees();
    }, []);

    //get current item
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentItem = data.slice(indexOfFirstPost, indexOfLastPost);

    //creating pagination
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(employees.length / postsPerPage); i++){
        pageNumbers.push(i)
    }
    //change page
    const handlePage = (number) => {
        setCurrentPage(number.selected + 1)
    }
    const [searchTerm, setTerm] = useState("")

    const filtred = employees.filter((person) => {
        if (searchTerm === "") {
            return person
        }
            // filter by email
        else if (person.email.toString().toLowerCase().includes(searchTerm.toLowerCase())){
            return person
        }
    })

    const deLete = async (id) => {
        const userR = doc(db, "employees", id);
        const mainR = doc(db, "allusers", id);
        await deleteDoc(userR);
        await deleteDoc(mainR);
        alert(`User ${id} deleted successfully`)
    }
    const updateEmp = async(id) =>{
        
        const employeeDoc = doc(db, "employees", id)
        const newfield = {firstName: fname, lastName: lname, salary: psalary}
        await updateDoc(employeeDoc, newfield)
        // // {role1 === "staff" ? await updateDoc(staffDoc, newfield) : await updateDoc(empDoc, newfield)}
        // console.log(productDoc)
        // console.log(newfield)
       alert(`Employee ${id} updated successfully`)
    }

    return (
        <div>
            <div className="newusersearch">
                <div className="newusericon">
                    <Link to="/newemployee"><FaPlus size="30" color="green" style={{marginRight: '5px', verticalAlign: 'middle', cursor: 'pointer'}} /></Link>
                    <div id="newusericontext">Add employee</div>
                </div>
                <div className="input-group" id="searcharea">
                    <form>
                        <input type="search" className="form-control rounded" placeholder="&#128270; Search" aria-label="Search" id="searchvalue"
                        aria-describedby="search-addon" onChange={event => {setTerm(event.target.value)}} />
                    </form>
                </div>
            </div>
          <table className="table table-striped" id="mytable1">
                <thead>
                     <tr>
                         <th scope="col">EMAIL</th>
                         <th scope="col">EDIT</th>
                         <th scope="col">DELETE</th>
                    </tr>
                 </thead>
            <tbody>
            
                {filtred.slice(indexOfFirstPost, indexOfLastPost).map(person => {   
                        return(
                            <tr key={person.email}>
                                <td>{person.email}</td>
                                <td>
                                <Popup contentStyle={{width:'400px'}} trigger={<button type="button" className="btn btn-sm btn-info">Edit</button>} position="left center">
                                    <Form >
                                        <Form.Group className="mb-3" >
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter first name" id="firstName" required 
                                            onChange={(event) => {setfname(event.target.value)}}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter last name" id="lastName" required 
                                            onChange={(event) => {setlname(event.target.value)}}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Salary</Form.Label>
                                            <Form.Control type="text" placeholder="Enter salary" id="salary" required
                                            onChange={(event) => {setsalary(event.target.value)}}
                                            />
                                        </Form.Group>
                                
                                        <button type="button" className="btn btn-sm btn-primary"
                                            disabled={!fname ||!lname ||!psalary} onClick={() => {
                                                updateEmp(person.id)
                                            }}
                                            >
                                                Update
                                        </button>
                                    </Form>
                                </Popup>
                                </td>
                                <td>
                                    {/* <Deleteemployee email={person.email}/> */}
                                    <button type="button" className="btn btn-sm btn-danger" 
                                    onClick={() => {
                                        deLete(person.id);
                                        }} 
                                    >DELETE</button>
                                </td>
                            </tr>
                        );
                    })}  
            
            </tbody>
        </table>   

        <div>
            <ReactPaginate 
                previousLabel={'Previous'}
                nextLabel={'next'}
                breakLabel={''}
                marginPagesDisplayed={0}
                pageCount={Math.ceil(employees.length / postsPerPage)}
                pageRangeDisplayed={3}
                onPageChange={handlePage}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </div>
    </div>
    )
}

export default Manageemployee
