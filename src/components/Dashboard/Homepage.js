import React, {useState} from 'react'
import {FiMenu} from 'react-icons/fi'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery';
import { useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import {BiArrowToTop} from 'react-icons/bi'
import { Form,Button } from 'react-bootstrap';
import { db } from "../../firebase-config"
import {setDoc, doc} from "firebase/firestore"

const Homepage = () => {
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

const [s_email, sets_email] = useState("");

const Subscribe = async (e) => {
    e.preventDefault()
    try{
        const subRef = doc(db, 'subscribed_users', s_email);
        await setDoc(subRef, {email: s_email}, {merge: true})
        alert("You have successfully subscribed to Lexo promotions")
    } catch (error) {
        console.log(error)
        alert(error)
    }
}  

const history = useHistory();
const adminpage = () =>{
    history.push('/login')
}
const theOffers = () =>{
    history.push('/offerhere')
}
const theproducts = () =>{
    history.push('/producthere')
}
const reLoad = () =>{
    window.location.reload(true)
}

$(window).scroll(function(e){ 
    //this sets the navbar fixed on scroll
    var $el = $('.mainmenu'); 
    var isPositionFixed = ($el.css('position') === 'fixed');
    if ($(this).scrollTop() > 150 && !isPositionFixed){ 
    $el.css({'position': 'fixed', 'top': '0px'}); 
    }
    if ($(this).scrollTop() < 150 && isPositionFixed){
    $el.css({'position': 'static', 'top': '0px'}); 
    } 
});
// send to top
const toTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
}
    return (
        <div>
        <div>
            {/* top bar */}
            <div className="mainmenu">
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-4">
                        <h6 className="menup">
                        <img height="50px" width="100px" style={{cursor: "pointer"}}
                        src="logo192.png"
                        alt="First slide"
                        onClick={reLoad}
                        />
                        </h6>
                    </div>
                    <div className="col-lg-10 col-md-10 col-4">
                        <div className="menu1"> 
                            <ul>
                                <li onClick={reLoad}>Home</li>
                                <li onClick={theOffers}>Offers</li>
                                <li onClick={theproducts}>Products</li>
                                <li onClick={adminpage}>Management</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-4">
                        <h6 id="menuicon"><FiMenu color="#00ff00" size="25" className="socialacc" onClick={showMenu} /></h6>
                    </div>
                </div>
            </div>
                <div className="menu2" style={{display: show1}}> 
                    <ul>
                        <li onClick={reLoad}>Home</li>
                        <li onClick={theOffers}>Offers</li>
                        <li onClick={theproducts}>Products</li>
                        <li onClick={adminpage}>Management</li>
                    </ul>
                </div>

                {/* caurosel */}
                <div className="carouselpage">
            <Carousel>
                <Carousel.Item>
                    <img
                    // className="d-block w-100"
                    src="images/image4.png" width="100%" height="auto"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                        <h6>Our Slogan</h6>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    // className="d-block w-100"
                    src="images/image5.png" width="100%" height="auto"
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h6>Our Mission</h6>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    // className="d-block w-100"
                    src="images/image7.png" width="100%" height="auto"
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h6>Petrol Station</h6>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>

        {/* about us */}
        <div className="abtus">
            <h3>About us</h3>
            <p>Lexo petrol station Kilifi is located at: Mombasa-Malindi Highway, Kilifi North, Coast. It is located opposite Naivas supermarket in Kilifi along Bofa road</p>
            <p>We operate on daily basis with opening time being 5am and close at 11pm</p>
        </div>
        {/* Footer */}
        <div className="myfooter1">
            <div className="row">
                <div className="col-lg-4 col-md-4 col-6">
                    <img className="logohere"
                    src="logo192.png" width="80px" height="40px"
                    alt="First slide"
                    />
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label><p>Subscribe our website to get latest news update</p></Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" id="email" required
                            onChange={(event) => {sets_email(event.target.value)}}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit"
                        disabled={!s_email} onClick={Subscribe}
                        >
                            Subscribe
                        </Button>
                    </Form>
                </div>
            </div>
                    <div className="copyright">
                        <p>&#169; 2021 Refuel All rights reserved.</p>
                    </div>
        </div>

            {/* send to top */}
            <div className="totopicon">
                <BiArrowToTop color="#00ff00" size="40" onClick={toTop} />
            </div>
        </div>
        </div>
    )
}

export default Homepage
