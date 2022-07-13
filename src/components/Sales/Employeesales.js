import React,{useState, useEffect} from 'react'
import { db } from "../../firebase-config"
import {collection, getDocs} from "firebase/firestore"

const Employeesales = () =>{
    
    const [sales, setData] = useState([]);
    
    const t_sales = collection(db, "sales");
    useEffect(() => {
            const getSales = async () =>{
                const data = await getDocs(t_sales);
                setData(data.docs.map((doc) => ({ ...doc.data(),id: doc.id })))
            }
            getSales();
        }, []);

    return (
      <div>
          <table className="table table-striped" id="mytable1">
                <thead>
                     <tr>
                         <th scope="col">BUYER_ID</th>
                         <th scope="col">SELLER</th>
                         <th scope="col">PRODUCT</th>
                         <th scope="col">NUMBER OF LITRES</th>
                         <th scope="col">DATE OF SALE</th>
                     </tr>
                 </thead>
            <tbody>
                {sales.map(sale => {   
                        return(
                            <tr key={sale.buyer_id}>
                                 <td>
                                    <>{sale.buyer_id}</>
                                </td>
                                <td>
                                    <>{sale.seller}</>
                                </td>
                                 <td>
                                    <>{sale.tproduct}</>
                                </td>
                                <td>
                                    <>{sale.no_of_litres}</>
                                </td>
                                <td>
                                    <>{sale.date_refilled}</>
                                </td>
                            </tr>
                        );
                    })}               
            </tbody>
        </table>   
      </div>
    )
}
export default Employeesales