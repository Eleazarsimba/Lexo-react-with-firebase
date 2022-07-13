import React, {useState} from 'react'
import { Form,Button } from 'react-bootstrap';
import { db, storage } from "../../firebase-config"
import {addDoc, collection} from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage";
import {v4} from "uuid"

const Addproduct = () => {
    const [imageUpload, setImageUpload] = useState(null);
    
    const [pname, setpname] = useState("");
    const [productdesc, setproductdesc] = useState("");
    const [price, setprice] = useState(0);

    const t_product = collection(db, "products");

    const rproduct = async (e) => {
        e.preventDefault()
        if(imageUpload == null) return;
        const imageRef = ref(storage, `products/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("Product added");
        })
        try{
            await addDoc(t_product, {image_desc: imageUpload.name + v4(), p_name: pname, product_desc: productdesc, _price: price})
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
    
    return (
       
            <div className="card" style={{padding: '10px', width: '50%'}}>
            <Form>
                <h3>New Product</h3>
                <Form.Group className="mb-3" >
                    <Form.Label>Image description</Form.Label>
                    <Form.Control type="file" accept="image/*" id="image" 
                    onChange={(event) => {
                        setImageUpload(event.target.files[0])
                    }}
                    />
                </Form.Group> 
                <Form.Group className="mb-3" >
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" placeholder="Product Name" id="pname" required 
                    onChange={(event) => {setpname(event.target.value)}}
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <textarea className="form-control" id="productdesc" rows="2" placeholder="Type product description here..." 
                    onChange={(event) => {setproductdesc(event.target.value)}}
                    ></textarea>
                </Form.Group>  
                <Form.Group className="mb-3" >
                    <Form.Label>Price Per Litre in Ksh.</Form.Label>
                    <Form.Control type="number" placeholder="Price" id="price" required 
                    onChange={(event) => {setprice(event.target.value)}}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!price || !productdesc || !pname} onClick={rproduct}>
                    Add product
                </Button>
            </Form>  
            </div>
    )
}

export default Addproduct

