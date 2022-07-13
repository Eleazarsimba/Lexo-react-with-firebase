import React, {useState, useEffect} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Form } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import {FaPlus} from 'react-icons/fa'
import { db } from "../../firebase-config"
import {collection, getDocs, doc, deleteDoc, updateDoc} from "firebase/firestore"

const Manageoffers = () => {
    const [offerdesc, setofferdesc] = useState("");
    const [offers, setOffer] = useState([]);
    
    const t_offers = collection(db, "offers");
    useEffect(() => {
            const getProducts = async () =>{
                const data = await getDocs(t_offers);
                setOffer(data.docs.map((doc) => ({ ...doc.data(),id: doc.id })))
            }
            getProducts();
        }, []);

    const deLete = async (id) => {
        const userR = doc(db, "offers", id);
        await deleteDoc(userR);
        alert(`Offers ${id} deleted successfully`)
    }

    const updateOffer = async(id) =>{
        
        const offerDoc = doc(db, "offers", id)
        const newfield = {offer_desc: offerdesc}
        await updateDoc(offerDoc, newfield)
        // // {role1 === "staff" ? await updateDoc(staffDoc, newfield) : await updateDoc(empDoc, newfield)}
        // console.log(productDoc)
        // console.log(newfield)
       alert("Offer updated successfully")
    }


    return (
        <div className='empdash'>
            <div className="dashboardinfo">
            <h3>Manage Offers</h3>
                <div className="newusericon">
                    <Link to="/offers"><FaPlus size="30" color="green" style={{marginRight: '5px', verticalAlign: 'middle', cursor: 'pointer'}} /></Link>
                    <div id="newusericontext">Add offer</div>
                </div>
        <table className="table table-striped" id="mytable1">
                <thead>
                     <tr>
                         <th scope="col">Product</th>
                         <th scope="col">Description</th>
                         <th scope="col">Edit</th>
                         <th scope="col">Remove</th>                         
                     </tr>
                 </thead>
            <tbody>
           
                {offers.map(offer => {   
                        return(
                            <tr key={offer.offer_desc}>
                                <td>{offer.product_name}</td>
                                {/* <td><img src={`/images/${offer.imgdesc}`}  alt="no image" width='50px' height="50px" /></td> */}
                                <td>{offer.offer_desc}</td>
                                <td>
                                    {/* <Editproduct prod={product}/> */}
                                    <Popup contentStyle={{width:'400px'}} trigger={<button type="button" className="btn btn-sm btn-info">Edit</button>} position="left center">
                                        <Form >
                                            <Form.Group className="mb-3" >
                                                <textarea className="form-control" id="productdesc" rows="2" 
                                                onChange={(event) => {setofferdesc(event.target.value)}}
                                                ></textarea>
                                            </Form.Group>                                    
                                            <button type="button" className="btn btn-sm btn-primary"
                                            disabled={!offerdesc} onClick={() => {
                                                updateOffer(offer.id)
                                            }}
                                            >
                                                Update
                                            </button>
                                        </Form>
                                    </Popup>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-sm btn-danger" 
                                    onClick={() => {
                                        deLete(offer.id);
                                        }} 
                                    >DELETE</button>
                                </td>
                            </tr>
                        );
                    })}  
            
            </tbody>
        </table>
</div>
</div>
    )
}

export default Manageoffers
