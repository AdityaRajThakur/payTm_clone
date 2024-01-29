import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
export function Dashboard(){

    return <div className = "mt-9" >
        <div className = "w-1/2 mx-auto">
            <Appbar/>
            <Balance /> 
            <Users />
        </div>
    </div>
}