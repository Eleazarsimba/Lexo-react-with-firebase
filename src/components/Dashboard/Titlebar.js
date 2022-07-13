import React, {useState, useEffect} from 'react'
import { Link, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'; 
import $ from 'jquery';
import {FaUserCircle, FaCaretDown} from 'react-icons/fa'
import {FiLogOut, FiGift} from 'react-icons/fi'
import {BsPeople} from 'react-icons/bs'
import {RiDashboardFill} from 'react-icons/ri'
import {AiOutlineShop} from 'react-icons/ai'
// import loggeduser from '../../images/1638272709471.jpg';

import Admindash from './Admindash';
import Employeestable from '../Employees/Employeestable';
import Newemployee from '../Employees/Newemployee';
import Manageemployee from '../Employees/Manageemployee';
import Managestaff from '../Staff/Managestaff';
import Newstaff from '../Staff/Newstaff';
import Updateprofile from '../Actions/Updateprofile';
// import Thesales from '../Sales/Thesales';
import Employeesales from '../Sales/Employeesales';
import Employeedash from './Employeedash';

import Addoffer from '../Sales/Addoffer';
import Manageoffers from '../Sales/Manageoffers';
import Manageproducts from '../Sales/Manageproducts';
import Addproduct from '../Sales/Addproduct';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';

const Titlebar = () => {
    const [user, setUser] = useState({});
   
    // set title bar to remain fixed after scroll 
    $(window).scroll(function(e){ 
        var $el = $('.maintopbar'); 
        var isPositionFixed = ($el.css('position') === 'fixed');
        if ($(this).scrollTop() > 150 && !isPositionFixed){ 
          $el.css({'position': 'fixed', 'top': '0px'}); 
        }
        if ($(this).scrollTop() < 150 && isPositionFixed){
          $el.css({'position': 'static', 'top': '0px'}); 
        } 
      });
       // set nav bar to remain fixed after scroll 
       $(window).scroll(function(e){ 
        var $el = $('.dashboard1');  
        var isPositionFixed = ($el.css('position') === 'fixed');
        if ($(this).scrollTop() > 150 && !isPositionFixed){ 
          $el.css({'position': 'fixed', 'top': '70px', 'width': '200px'}); 
        }
        if ($(this).scrollTop() < 150 && isPositionFixed){
          $el.css({'position': 'static', 'top': '0px', 'width': '200px'}); 
        } 
      });
       // set caret box disappear with scroll 
       $(window).scroll(function(e){  
        var $caret = $('.thecaretbox'); 
          $caret.css({'display': 'none'})
        });

    // set show and hide menu
    var $eleb = $('.shadowbox'); 
    var $elebe = $('.maindashboard'); 
    var $eleben = $('.shadowboxmainbody');
    const [showorhidemenu, setShowMenu] = useState("");

    const history = useHistory();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })        
    }, []);
    
    const showMenu = () =>{
            if(showorhidemenu === "none"){
                if($(window).width() >= 690) {
                    // if larger or equal
                    $eleben.css({'display': 'flex', 'width': '100%'});
                    $eleb.css({'width': '30%'});
                    setShowMenu("block");
                }
                // if smaller
                else{
                    $eleben.css({'display': 'block', 'width': '100%'});
                    $eleb.css({'width': '80%'});
                    setShowMenu("block");
                }
               
            }else{
                // if larger
                if($(window).width() >= 690) {
                    // if larger or equal
                    $eleben.css({'display': 'flex', 'width': '100%', 'marginLeft': '0px'});
                    $eleb.css({'width': '30%'});
                    setShowMenu("none");
                }
                // if smaller
                else{
                    $eleben.css({'display': 'flex', 'width': '100%'});
                    $elebe.css({'width': '100%'});
                    $eleb.css({'width': '30%'});
                    setShowMenu("none");
                }
            }
        }

     // set show and hide logged account
     const [showorhideLoggedaccount, setShowLogged] = useState("none");
     const showLoggedaccount = () =>{
             {showorhideLoggedaccount === "none" ? setShowLogged("block") : setShowLogged("none")}
         }

    const logout = () =>{
        signOut(auth)
        localStorage.clear();
        history.push('/')
    }
    const role1 = localStorage.getItem('role');
    
    return (
        <div className="titleandnav">
            <div className="maintopbar">
                <div className="maintopbartittle">
                    <span id="titlename">Lexo Pump</span>
                </div>
                <div className="maintopbarmenu" onClick={showMenu}>
                    <div className="menuicon"></div>
                    <div className="menuicon"></div>
                    <div className="menuicon"></div>
                </div>
                <div className="maintopbarlog">
                    <FaUserCircle size="20" style={{marginRight: '5px', verticalAlign: 'middle'}}/>
                    <span  id="theuser1">{user?.email}</span>                
                        {/* caret options */}
                    <FaCaretDown size="25" onClick={showLoggedaccount} id="thecareticon1" style={{verticalAlign: 'middle', cursor: 'pointer'}} />
                        <div className="thecaretbox" id="thecaretbox" style={{display:showorhideLoggedaccount}}>
                            <ul>
                                <Link to="/updateprofile">
                                    <li><FaUserCircle size="20" style={{marginRight: '5px', verticalAlign: 'middle'}}/>Profile</li>
                                </Link>
                                <li onClick={logout}><FiLogOut size="20" style={{marginRight: '5px', verticalAlign: 'middle'}}/>Sign out</li>
                            </ul>
                        </div>
                </div>
            </div> 
            <div className="bodymain">
                {/* navigation bar */}
                <div className="sidebar" style={{display:showorhidemenu}}>
                        <span className="loggedimage" >
                            {/* <img src={mydp} alt="Set profile" />   */}
                            {/* <img src="images/1638272709471.jpg" alt="image not found" />   */}
                        </span>
                        <span className="onlineemail">{role1}</span>
                        <div className="onlinetab">
                            <div className="onlineactive"></div>
                            <div id="onlinetag">Online</div>
                        </div>
                    <ul className="dashboard1">
                    {role1 === "staff" ? 
                        <li>
                             <Nav.Link as={NavLink} to="/admin" id="thenavlink">
                                <RiDashboardFill size="20" style={{marginRight: '5px', verticalAlign: 'middle'}}/>
                                DASHBOARD
                            </Nav.Link>
                        </li> : ""
                    }
                    {role1 === "employee" ? 
                        <li>
                            <Nav.Link as={NavLink} to="/emp" id="thenavlink">
                                <RiDashboardFill size="20" style={{marginRight: '5px', verticalAlign: 'middle'}}/>
                                DASHBOARD
                            </Nav.Link>
                        </li> : ""
                    }
                      
                    {role1 === "staff" ? 
                        <li>
                            <Nav.Link as={NavLink} to="/employees" id="thenavlink">
                                <BsPeople size="20" style={{marginRight: '5px', verticalAlign: 'middle'}}/>
                                EMPLOYEES
                            </Nav.Link>
                        </li> : ""
                    }
                        <li>
                            <Nav.Link as={NavLink} to="/sales" id="thenavlink">
                                <AiOutlineShop size="20" style={{marginRight: '5px', verticalAlign: 'middle',  color: 'white'}}/>
                                SALES
                            </Nav.Link>
                        </li>
                    {role1 === "staff" ? 
                        <li>
                            <Nav.Link as={NavLink} to="/products" id="thenavlink">
                                <AiOutlineShop size="20" style={{marginRight: '5px', verticalAlign: 'middle'}}/>
                                PRODUCTS
                            </Nav.Link>
                        </li> : ""
                    }
                    {role1 === "staff" ? 
                        <li>
                            <Nav.Link as={NavLink} to="/alloffers" id="thenavlink">
                                <FiGift size="20" style={{marginRight: '5px', verticalAlign: 'middle'}}/>
                                MANAGE OFFERS
                            </Nav.Link>
                        </li>: ""
                    }
                    </ul>
            
                </div>
                <div className="maindashboard">
                    <Route exact path="/admin" component={Admindash} />
                    <Route exact path="/emp" component={Employeedash} />
                    <Route exact path="/employees" component={Employeestable} />
                    <Route exact path="/newemployee" component={Newemployee} />
                    <Route exact path="/manageemployee" component={Manageemployee} />
                    <Route exact path="/managestaff" component={Managestaff} />
                    <Route exact path="/newadmin" component={Newstaff} />
                    {/* <Route exact path="/offers" component={Offers} /> */}
                    <Route exact path="/updateprofile" component={Updateprofile} />
                    <Route exact path="/sales" component={Employeesales} />
                                                           
                    <Route exact path="/alloffers" component={Manageoffers} />
                    <Route exact path="/offers" component={Addoffer} />
                    <Route exact path="/products" component={Manageproducts} />
                    <Route exact path="/addproduct" component={Addproduct} />
                </div>
            </div>
        </div>
    )
}

export default Titlebar
