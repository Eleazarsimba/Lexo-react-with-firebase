import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {FiMenu} from 'react-icons/fi'

import { 
    signInWithEmailAndPassword
} from 'firebase/auth'
import { db, auth } from "./../firebase-config"
import {collection, getDocs} from "firebase/firestore"

const Loginform = () => {
    const [passtype, setPass] = useState('password');
    const showPass = () =>{
     //set show or hide pass
    if(passtype === "password"){
        setPass("text");
    }else{
        setPass("password");
    }
}

const [show1, setShow] = useState('none');
const showMenu = () =>{
window.scrollTo({top: 0, behavior: 'smooth', display: 'block'}); 
//set show or hide pass
if(show1 === "none"){
    setShow("block");
}else{
    setShow("none");
}
}
// // initialize form values
const [loginemail, setloginEmail] = useState("");
const [loginpassword, setloginPassword] = useState("");

const [role1, setRole] = useState("");
const [userId, setuserId] = useState("");

const login = async (e) =>{
    e.preventDefault()
    try {
        await signInWithEmailAndPassword(auth, loginemail, loginpassword);
        const querySnapshot = await getDocs(collection(db, "allusers"));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.data().role, " => ", doc.data().email);

            if(doc.data().email === loginemail){
                // console.log(doc.data().role)
                window.localStorage.setItem('role', doc.data().role);
                setRole(doc.data().role);
            }
        });
        const queryemp = await getDocs(collection(db, "employees"));
        const querystaff = await getDocs(collection(db, "staff"));
        {role1 === "employee" ?
        queryemp.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.data().role, " => ", doc.data().email);

            if(doc.data().email === loginemail){
                // console.log(doc.data().role)
                window.localStorage.setItem('userid', doc.id);
                setuserId(doc.id);
            }
        })
        :
        querystaff.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.data().role, " => ", doc.data().email);

            if(doc.data().email === loginemail){
                // console.log(doc.data().role)
                window.localStorage.setItem('userid', doc.id);
                setuserId(doc.id);
            }
        });
    }
        // console.log(userId)
        {role1 === "staff" ? history.push("/admin") : history.push("/emp");}
    } catch (error) {
        console.log(error.message)
        alert(error.message)
    }
}
 // login user
const history = useHistory();
    const adminpage = () =>{
        history.push('/login')
    }
    const reLoad = () =>{
        window.location.reload(true)
    }
    const theHome = () =>{
        history.push('/')
    }
    const theproducts = () =>{
        history.push('/producthere')
    }
    return (
        <div>
            <div style={{marginTop:"70px"}}>
                 {/* title bar */}
          <div className="mainmenu">
            <div className="row">
              <div className="col-lg-2 col-md-2 col-4">
                  <h6 className="menup">
                  <img height="50px" width="100px" style={{cursor: "pointer"}}
                  src="logo192.png"
                  alt="First slide"
                  onClick={theHome}
                  />
                  </h6>
              </div>
              <div className="col-lg-10 col-md-10 col-4">
                  <div className="menu1"> 
                      <ul>
                          <li onClick={theHome}>Home</li>
                          <li onClick={reLoad}>Offers</li>
                          <li onClick={theproducts}>Products</li>
                          <li onClick={adminpage}>Management</li>
                      </ul>
                  </div>
              </div>
              <div className="col-lg-2 col-md-2 col-4">
                  <h6 id="menuicon"><FiMenu color="#00ff00" size="25" className="socialacc" onClick={showMenu} /></h6>
              </div>
          </div>
      {/* </div> */}
          <div className="menu2" style={{display: show1}}> 
              <ul>
                  <li onClick={theHome}>Home</li>
                  <li onClick={reLoad}>Offers</li>
                  <li onClick={theproducts}>Products</li>
                  <li onClick={adminpage}>Management</li>
              </ul>
          </div> 

    </div>
            </div>
        <div className="theloginpage">
               
           <Form className="loginform" >
               <div className="profheader">
                <h5>LOGIN FORM</h5>
                <p>Enter email and password to login</p>
               </div>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" id="email" required 
                    onChange={(event) => {setloginEmail(event.target.value)}}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type={passtype} placeholder="Password" id="password" required
                    onChange={(event) => {setloginPassword(event.target.value)}}
                     />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Check type="checkbox" label="Show password" onChange={showPass}/>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={!loginemail || !loginpassword} onClick={login}>
                    Submit
                </Button>
                <p>Forgot your password <Link to="/resetpass">RESET</Link></p>
            </Form>
        
    </div>
    </div>
    )
}

export default Loginform
