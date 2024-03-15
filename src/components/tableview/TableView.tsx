import react from "react"
import './tableView.css';

interface TableViewProps {
    data: {
        id:number
        value:string
        description:string
    }[],
}

 const TableView = ({data}: TableViewProps) => {

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

