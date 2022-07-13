import React, {useState, useEffect} from 'react'

import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'; 
import { onAuthStateChanged, deleteUser } from 'firebase/auth';
import { db, auth } from "../../firebase-config"
import {doc, updateDoc} from "firebase/firestore"

const Updateprofile = () => {
    const [user, setUser] = useState("")

    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");

    const role1 = localStorage.getItem('role');
    const userID = localStorage.getItem('userid');

    const history = useHistory();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })        
    }, []);

    const ProFile = async(userID) =>{
        const staffDoc = doc(db, "staff", userID)
        const empDoc = doc(db, "employees", userID)
        const newfield = {firstName: fname, lastName: lname}
        {role1 === "staff" ? await updateDoc(staffDoc, newfield) : await updateDoc(empDoc, newfield)}
        alert("User's profile updated successfully")
    }
//delete your account
    const Deleteaccount = () =>{
        deleteUser(user).then(() => {
            // User deleted.
            localStorage.clear();
            history.push('/')
            alert("Your account has been deleted")
          }).catch((error) => {
            // An error ocurred
            console.log(error.message)
            alert(error.message)
          });
    }
    
    return (
        <div id="updates" style={{display:"block"}} >
            <div className="card" style={{padding: '10px', width: '50%'}} >
                <Form>
                    <h3>Update Profile</h3>
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
                    <button type="button" className="btn btn-sm btn-primary"
                    disabled={!fname ||!lname} 
                     onClick={() => {ProFile(userID)}}
                    >
                        Update
                    </button>
                </Form>     
            </div> 
            {role1 === "staff" ? "" :
            <p style={{cursor: "pointer", color: "#0000ff"}} onClick={() => {Deleteaccount(userID)}}
                    >
                        <u>Delete my account</u>
            </p>  
            }
        </div>
    )
}

export default Updateprofile
