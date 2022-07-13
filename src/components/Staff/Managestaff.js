import React,{useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate'
import {FaPlus} from 'react-icons/fa'

import { db, auth } from "../../firebase-config"
import {collection, getDocs, doc, deleteDoc} from "firebase/firestore"

import { onAuthStateChanged } from 'firebase/auth';

const Managestaff = () => {
    const [staffs, setStaff] = useState([]);
    const [currentPage, setCurrentPage] = useState([1]);
    const [postsPerPage] = useState([10]);

    const [user, setUser] = useState({});

    const t_staff = collection(db, "staff");
    useEffect(() => {
        const getProducts = async () =>{
            const data = await getDocs(t_staff);
            setStaff(data.docs.map((doc) => ({ ...doc.data(),id: doc.id })))
        }
            getProducts();
        },
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        }), []);
    
    //get current item
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentItem = data.slice(indexOfFirstPost, indexOfLastPost);

    //creating pagination
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(staffs.length / postsPerPage); i++){
        pageNumbers.push(i)
    }
    //change page
    const handlePage = (number) => {
        setCurrentPage(number.selected + 1)
    }
    const [searchTerm, setTerm] = useState("")

    const filtred = staffs.filter((person) => {
        if (searchTerm === "") {
            return person
        }
            // filter by email
        else if (person.email.toString().toLowerCase().includes(searchTerm.toLowerCase())){
            return person
        }
    })

    const deLete = async (id) => {
        const userR = doc(db, "staff", id);
        const mainR = doc(db, "allusers", id);
        await deleteDoc(userR);
        await deleteDoc(mainR);
        alert(`Staff ${id} deleted successfully`)
    }

    return (
        <div>
            <div className="newusersearch">
                <div className="newusericon">
                    <Link to="/newadmin"><FaPlus size="30" color="green" style={{marginRight: '5px', verticalAlign: 'middle', cursor: 'pointer'}} /></Link>
                    <div id="newusericontext">Add admin</div>
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
                         <th scope="col">POSITION</th>
                         <th scope="col">DELETE</th>
                     </tr>
                 </thead>
            <tbody>
            {/* <Fragment> */}
                {filtred.slice(indexOfFirstPost, indexOfLastPost).map(person => {   
                        return(
                            <tr key={person.email}>
                                <td>{user.email === person.email ? "" :
                                    <>{person.email}</>}
                                </td>
                                <td>{user.email === person.email ? "" :
                                    <>{person.position}</>}
                                </td>
                                <td>{user.email === person.email ? "" :
                                    <button type="button" className="btn btn-sm btn-danger" 
                                    onClick={() => {
                                        deLete(person.id);
                                        }} 
                                    >DELETE</button>}
                                </td>
                            </tr>
                        );
                    })}  
            {/* </Fragment>  */}
            </tbody>
        </table>   

        <div>
            <ReactPaginate 
                previousLabel={'Previous'}
                nextLabel={'next'}
                breakLabel={''}
                marginPagesDisplayed={0}
                pageCount={Math.ceil(staffs.length / postsPerPage)}
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

export default Managestaff
