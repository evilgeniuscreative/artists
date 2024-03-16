import react, {useEffect, useState} from "react"
import { useLocation,useNavigate } from "react-router-dom";
import axios from 'axios'
import './tableView.css';

type TableViewItem = {
        id:number
        value:string
        description:string
}

const TableView = () => {
   
const [data, setData] = useState<any[]>([]);
const [currentSource, setCurrentSource] = useState('http://localhost:5000/artists');

const {state} = useLocation();
const navigate = useNavigate();

useEffect(() => {

const fetchData = async () => {
    console.log('sources', currentSource);
    try {
        //TODO: change to state.src later
        const {data} = await axios.get(currentSource)
        setData((data as any[]))
    } catch(error){
        console.log("Error fetch data in TableView")
    }
}

fetchData()

},[]);

const modifiedData = data.map((data)=>({id:data.id,value: data.name, description: data.description}));


    return(
        <div>
            <h1>Hello This is Table View</h1>
            <table>
                <thead>
                    <tr>
                        <th>Value</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {modifiedData.map((item, index) => {
                    return (
                         <tr key={item.id}>
                               <td>{item.value}</td>
                               <td>{item.description}</td> 
                               <td><button onClick={()=> navigate('/form',{state:{editData: data[index]}})}>Edit</button></td>
                        </tr>
                    )
                })}
                </tbody>
             </table>
        </div>
    )
}




export { TableView }

