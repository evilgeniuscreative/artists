import react, {useEffect, useState} from "react"
import { useLocation } from "react-router-dom";
import axios from 'axios'
import { Artist } from "../../types";
import './tableView.css';

type TableViewItem = {
        id:number
        value:string
        description:string
}

const TableView = () => {
   
const [data, setData] = useState<TableViewItem[]>([]);
const {state} = useLocation();

useEffect(() => {
const fetchData = async () => {
    try {
        const {data} = await axios.get(state.src)
        setData((data as any[]).map((data)=>({id:data.id,value: data.name, description: data.description})))
    } catch(error){
        console.log("Error fetch data in TableView")
    }
}

fetchData()

},[]);


    return(
        <div>
            <h1>Hello This is Table View</h1>
            <table>
                <thead>
                    <tr>
                        <th>Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item) => {
                    return (
                         <tr key={item.id}>
                               <td>{item.value}</td>
                               <td>{item.description}</td> 
                        </tr>
                    )
                })}
                </tbody>
             </table>
        </div>
    )
}



export { TableView }

