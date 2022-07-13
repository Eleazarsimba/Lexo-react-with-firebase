import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,Button } from 'react-bootstrap';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Resetpass = () => {
    const [r_email, setremail] = useState("");

    const auth = getAuth();

    const resetPass = async (e) =>{
        e.preventDefault()
        sendPasswordResetEmail(auth, r_email)
        .then(() => {
            alert("Password reset email sent!")
        })
        .catch((error) => {
            console.log(error.message)
            alert(error.message)
        });
    }
       
    return (
        <div className="resetlink">
            <p>Enter your email to receive reset link</p>
            <Form className="loginform" style={{marginLeft:"20px"}}>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" id="email" required 
                    onChange={(event) => {setremail(event.target.value)}}
                    />
                </Form.Group>
                <Button variant="primary" type="submit"
                disabled={!r_email} onClick={resetPass}
                >
                    Submit
                </Button>
                <p>Back to login <Link to="/login">Login</Link></p>
            </Form>
        </div>
    )
}

export default Resetpass
