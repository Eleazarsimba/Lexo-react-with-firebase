import React, {useState} from 'react'
import { Form,Button } from 'react-bootstrap';
import { db, storage } from "../../firebase-config"
import {addDoc, collection} from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage";

const Addoffer = () => {
    const [imageUpload, setImageUpload] = useState(null);
    const [offerdesc, setofferdesc] = useState("");
    const [pname, setpname] = useState("");

    const t_offers = collection(db, "offers");
    const addoffer = async (e) => {
        e.preventDefault()
        if(imageUpload == null) return;
        const imageRef = ref(storage, `offers/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("Offer added");
        })
        try{
            await addDoc(t_offers, {image_desc: imageUpload.name, product_name: pname, offer_desc: offerdesc})
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
    return (
       
            <div className="card" style={{padding: '10px', width: '50%'}}>
            <Form >
                <h3>New Offer</h3>
                <Form.Group className="mb-3" >
                    <Form.Label>Image description</Form.Label>
                    <Form.Control type="file" accept="image/*" id="image" required 
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
                    <textarea className="form-control" id="offerdesc" rows="2" placeholder="Type offer description here..." 
                    onChange={(event) => {setofferdesc(event.target.value)}}
                    ></textarea>
                </Form.Group>      
                <Button variant="primary" type="submit" disabled={!offerdesc ||!pname} onClick={addoffer}>
                    Add offer
                </Button>
            </Form>  
            </div>
    )
}

export default Addoffer

