import React, {useState, useEffect} from 'react'
import { db, auth } from "../../firebase-config"
import {addDoc, collection} from "firebase/firestore"
import { onAuthStateChanged} from 'firebase/auth';
import {v4} from "uuid"

const Employeedash = () => {

    const [no_oflts, setno_oflts] = useState(0);
    const [_product, set_product] = useState("");

    const t_sales = collection(db, "sales");

    const [user, setUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
    }, []);

    const rsales = async(e) => {
        e.preventDefault()

        //user currently logged in
        const b_id = v4();

        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        // console.log(user?.email)
        // console.log(no_oflts)
        // console.log(_product)
        // console.log(date)
        try{
            await addDoc(t_sales, {buyer_id: b_id,seller: user.email, no_of_litres: no_oflts, tproduct: _product, date_refilled: date})
            alert("Record added successfully")
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
        
    return (
        <div className='empdash'>
        <div className="dashboardinfo">
            <h3>Sales Record</h3>
            
            <form>
                {/* <input type="hidden" name="sender_Id" value="Name" /> */}
                    <div className="form-group">
                        <p>Product Name 
                            <select id="product1" style={{width:"200px", marginLeft:"20px"}} 
                            onChange={(event) => {set_product(event.target.value)}}
                            >
                                <option defaultValue="Petrol">Select option</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Kerosene">Kerosene</option>
                            </select>
                        </p>
                    </div>
                    <div className="form-group">
                        <p>No of litres 
                            <input type="number" placeholder="Amount sold" style={{width:"200px", marginLeft:"45px"}} 
                            id="no_of_ltrs" required 
                            onChange={(event) => {setno_oflts(event.target.value)}}
                            />
                        </p>
                    </div>
                    {/* <input type="hidden" name="sender_Id" value="text" /> */}
                <div className="savesaves">
                    <button type="submit" className="btn btn-md btn-primary" disabled={!_product ||!no_oflts} onClick={rsales}>Save</button>
                </div>
            </form>  
        </div>

</div>
    )
}

export default Employeedash
