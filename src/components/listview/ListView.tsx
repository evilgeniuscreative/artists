import react from "react";
import './listView.css';



interface ListViewProps {
    data: {
        id:number
        value:string
        description:string
    }[],
}

 const ListView = ({data}: ListViewProps) => {

    return(
        <div>
            <h1>Hello This is list View</h1>
            <ul>
                {data.map((item) => {
                    return <li key={item.id}>{item.value}: {item.description}</li>
                })}
             </ul>
        </div>
    )
}



export { ListView }

