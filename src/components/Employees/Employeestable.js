import React,{useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate'
import {FaPlus} from 'react-icons/fa'
import { db } from "../../firebase-config"
import {collection, getDocs} from "firebase/firestore"

const Employeestable = () => {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState([1]);
    const [postsPerPage] = useState([10]);
    
    const t_employees = collection(db, "employees");
    useEffect(() => {
            const getEmployees = async () =>{
                const data = await getDocs(t_employees);
                setEmployees(data.docs.map((doc) => ({ ...doc.data(),id: doc.id })))
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

    const filtered =  employees.filter((person) => {
        if (searchTerm === "") {
            return person
            // filter by first name
        }else if (person.firstName.toString().toLowerCase().includes(searchTerm.toLowerCase())){
            return person
        }
            // filter by last name
        else if (person.lastName.toString().toLowerCase().includes(searchTerm.toLowerCase())){
            return person
        }
            // filter by email
        else if (person.email.toString().toLowerCase().includes(searchTerm.toLowerCase())){
            return person
        }
    })

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
                         <th scope="col">FIRST NAME</th>
                         <th scope="col">LAST NAME</th>
                         <th scope="col">EMAIL</th>
                         <th scope="col">SALARY</th>
                    </tr>
                 </thead>
            <tbody>
           
               {filtered.slice(indexOfFirstPost, indexOfLastPost).map(person => {   
                        return(
                            <tr key={person.email}>
                                <td>{person.firstName}</td>
                                <td>{person.lastName}</td>
                                <td>{person.email}</td>
                                <td>{person.salary}</td>
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
  
           {/* <ul className="pagination" id="paginationT2">
               {pageNumbers.map(number => {
                   return(
                   <li key={number} className="page-items">
                       <a onClick={() => paginate(number)} className="page-link" style={{cursor:'pointer'}}>
                           {number}
                       </a>
                   </li>)
               })}
           </ul> */}
       </div>
        </div>
    )
}

export default Employeestable
