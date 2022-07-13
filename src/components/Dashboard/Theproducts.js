import React, {useState, useEffect} from 'react'

import {FiMenu} from 'react-icons/fi'
import { useHistory } from 'react-router-dom';

import { db } from "../../firebase-config"
import {collection, getDocs} from "firebase/firestore"

// import {storage} from '../firebase-storage';
// import { 
//     ref,
//     getDownloadURL,
//     listAll,
//     list, 
// } from "firebase/storage";
const Theproducts = () => {

    // const [imageList, setImageList] = useState([]);
    // const imagesListRef = ref(storage, "products/");
    const t_products = collection(db, "products");

    const [products, setProduct] = useState([]);

    // useEffect(() => {
    //     listAll(imagesListRef).then((response) => {
    //       response.items.forEach((item) => {
    //         getDownloadURL(item).then((url) => {
    //           setImageList((prev) => [...prev, url]);
    //         });
    //       });
    //     });
    //   }, []); 
    useEffect(() => {
        const getProducts = async () =>{
            const data = await getDocs(t_products);
            setProduct(data.docs.map((doc) => ({ ...doc.data(),id: doc.id })))
        }
        getProducts();
        }, [])  
        

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
        const theoffers = () =>{
            history.push('/offerhere')
        }

        
    return ( 
        <div>
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
                                <li onClick={theoffers}>Offers</li>
                                <li onClick={reLoad}>Products</li>
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
                        <li onClick={theHome}>Home</li>
                        <li onClick={theoffers}>Offers</li>
                        <li onClick={reLoad}>Products</li>
                        <li onClick={adminpage}>Management</li>
                    </ul>
                </div> 

                {/* set offers   */}
            <div className="container" style={{marginTop:"50px"}}>
                {/* <div id="freeoffer">
                    <div className="col-lg-8 col-md-8 col-sm-8" > */}
                    {/* {imageList.map((url) => {
                        return(
                        <div>
                            <img src={url} />;
                            <p style={{padding:"20px"}}>Hi aam here</p>
                        </div>
                        );
                    })}  */}
                    <table className="table table-striped" id="mytable1">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {/* {imageList.map((url) => { */}
                            {products.map((product) => {
                                return(
                                    <tr key={product.product_desc}>
                                        <td>{product.p_name}</td>
                                        <td>{product.product_desc}</td>
                                        <td>{product._price}</td>
                                    </tr>
                                        // {/* <img src={url} />; */}
                                    
                                    );
                            })}
                                        {/* })}  */}
                                        {/* </div>
                                    </div>
                                </div> */}
                        </tbody>
                    </table>
                    </div>
                {/* </div>
            </div> */}
        </div>
    )
}
export default Theproducts
