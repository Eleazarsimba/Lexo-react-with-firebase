import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,Button } from 'react-bootstrap';
import { 
    createUserWithEmailAndPassword 
} from 'firebase/auth';
import { db, auth } from "../../firebase-config"
// import {addDoc, collection} from "firebase/firestore"
import { doc, setDoc } from "firebase/firestore";

const Newemployee = () => {
    const [passtype, setShow] = useState('password');
    const showPass = () =>{
        //set show or hide pass
        if(passtype === "password"){
            setShow("text");
        }else{
            setShow("password");
        }
    }
  
 //initialize form input
    const [regemail, setregemail] = useState("");
    const [regpassword, setregPassword] = useState("");
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [rsalary, setsalary] = useState(0);

    // const t_allusers = collection(db, "allusers");
    // const t_employees = collection(db, "employees");

    // const register = async (e) =>{
    //     e.preventDefault()
    //     try{
    //         await createUserWithEmailAndPassword(auth, regemail, regpassword)
    //         await addDoc(t_allusers, {email: regemail, role: "employee"})
    //         await addDoc(t_employees, {email: regemail, firstName: fname, lastName: lname, salary: rsalary})
    //         alert("New Employee added successfully");
    //     } catch (error) {
    //         console.log(error)
    //         alert(error)
    //     }
    // }

    const register = async (e) =>{
        e.preventDefault()
        try{
            await createUserWithEmailAndPassword(auth, regemail, regpassword)
            await setDoc(doc(db, "allusers", regemail), {email: regemail, role: "employee"})
            await setDoc(doc(db, "employees", regemail), {email: regemail, firstName: fname, lastName: lname, salary: rsalary})
            alert("New Employee added successfully");
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
    
    return (
        <Form className="newuserform">
            <h2>REGISTRATION FORM</h2>
            <h6>Create an account with Lexo Petrol station Kilifi</h6>
            <Form.Group className="mb-3" >
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" id="firstName" required
                onChange={(event) => {setfname(event.target.value)}} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" id="lastName" required
                onChange={(event) => {setlname(event.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" id="email" required 
                onChange={(event) => {setregemail(event.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Salary</Form.Label>
                <Form.Control type="number" placeholder="Enter salary" id="salary" required 
                onChange={(event) => {setsalary(event.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type={passtype} placeholder="Password" id="password" required 
                onChange={(event) => {setregPassword(event.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Check type="checkbox" label="Show password" onChange={showPass}/>
            </Form.Group>
    
            <Button variant="primary" type="submit" disabled={!fname || !lname || !regemail || !regpassword || !rsalary} onClick={register}>
                Submit
            </Button>
        </Form>
    )
}

export default Newemployee
