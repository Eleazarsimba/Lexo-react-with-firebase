import React,{useState, useEffect} from 'react'
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {FaPlus} from 'react-icons/fa'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { db } from "../../firebase-config"
import {collection, getDocs, doc, deleteDoc, updateDoc} from "firebase/firestore"

const Manageproducts = () => {
    const [productdesc, setproductdesc] = useState("");
    const [price, setprice] = useState("");

    const [products, setProduct] = useState([]);
    
    const t_product = collection(db, "products");
    useEffect(() => {
            const getProducts = async () =>{
                const data = await getDocs(t_product);
                setProduct(data.docs.map((doc) => ({ ...doc.data(),id: doc.id })))
            }
            getProducts();
        }, []);

    const deLete = async (id) => {
        const userR = doc(db, "products", id);
        await deleteDoc(userR);
        alert(`Product ${id} deleted successfully`)
    }

    const updateProduct = async(id) =>{
        
        const productDoc = doc(db, "products", id)
        const newfield = {product_desc: productdesc, _price: price}
        await updateDoc(productDoc, newfield)
        // // {role1 === "staff" ? await updateDoc(staffDoc, newfield) : await updateDoc(empDoc, newfield)}
        // console.log(productDoc)
        // console.log(newfield)
       alert("Product updated successfully")
    }

   return (
        <div className='empdash'>
            <div className="dashboardinfo">
            <h3>Manage Products</h3>
                <div className="newusericon">
                    <Link to="/addproduct"><FaPlus size="30" color="green" style={{marginRight: '5px', verticalAlign: 'middle', cursor: 'pointer'}} /></Link>
                    <div id="newusericontext">Add product</div>
                </div>
        <table className="table table-striped" id="mytable1">
                <thead>
                     <tr>
                         <th scope="col">Product Name</th>
                         <th scope="col">Description</th>
                         <th scope="col">Price</th>
                         <th scope="col">Edit</th>
                         <th scope="col">Remove</th>                         
                     </tr>
                 </thead>
            <tbody>
                {products.map(product => {   
                        return(
                            <tr key={product.product_desc}>
                                <td>{product.p_name}</td>
                                <td>{product.product_desc}</td>
                                <td>{product._price}</td>
                                <td>
                                    {/* <Editproduct prod={product}/> */}
                                    <Popup contentStyle={{width:'400px'}} trigger={<button type="button" className="btn btn-sm btn-info">Edit</button>} position="left center">
                                        <Form >
                                            <Form.Group className="mb-3" >
                                                <textarea className="form-control" id="productdesc" rows="2" 
                                                onChange={(event) => {setproductdesc(event.target.value)}}
                                                ></textarea>
                                            </Form.Group>  
                                            <Form.Group className="mb-3" >
                                                <Form.Label>Price Per Litre in Ksh.</Form.Label>
                                                <Form.Control type="number" id="price" required 
                                                onChange={(event) => {setprice(event.target.value)}}
                                                />
                                            </Form.Group>
                                    
                                            <button type="button" className="btn btn-sm btn-primary"
                                            disabled={!productdesc ||!price} onClick={() => {
                                                updateProduct(product.id)
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
                                        deLete(product.id);
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

export default Manageproducts
