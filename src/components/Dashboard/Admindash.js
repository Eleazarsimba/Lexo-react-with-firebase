import React from 'react'
import {MdManageAccounts} from 'react-icons/md'

import { Link } from 'react-router-dom';

const Admindash = () => {
    return (
        <div className="dashboardinfo">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6" id="shadowbox" >
                        <Link to="/manageemployee" style={{textDecoration: 'none', color: 'white'}}>
                            {/* <h4>{allemploe.length}</h4> */}
                            <p>Manage employees</p>
                            <MdManageAccounts size="60" style={{marginRight: '5px', verticalAlign: 'middle'}}/>
                        </Link>
                    </div>
                
                    <div className="col-lg-6 col-md-6 col-sm-6" id="shadowbox" >
                        <Link to="/managestaff" style={{textDecoration: 'none', color: 'white'}}>
                            {/* <h4>{allstaff.length}</h4> */}
                            <p>Manage admins</p>
                            <MdManageAccounts size="60" style={{marginRight: '5px', verticalAlign: 'middle'}}/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admindash
