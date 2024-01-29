import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {Button} from '../components/Button' ; 
import { useEffect, useState } from 'react';
export function Users(){
    const [users , setUsers] = useState([]) ; 
    const [username , setUserName] = useState("") ; 
    useEffect(()=>{
        async function fetchData(){
            const res = await axios({
                method : 'get' , 
                url : `http://localhost:8000/api/v1/user/bulk?filter=${username}` , 
                headers:{ 
                    Authorization : 'Bearer ' + localStorage.getItem('token') 
                }
            })
            // console.log(res.data.user) ; 
            setUsers(res.data.user) ; 
            
        } 
        fetchData() ; 
    } , [username]); 
    return <div className = "ml-5  mr-5"> 
        <div className = "font-bold">
            Users
        </div>
        <div className = "w-full">
            <input onChange={(e)=>{
                setUserName(e.target.value); 
            }} className = "hover:shadow-md rounded p-2 w-full mt-2 " placeholder="Serach Users"></input>
        </div>
        <div className = "">
            {users.map(user => <User key = {user._id} user = {user}/>)} 
        </div>
    </div>
}

function User({user}){
    const navigate = useNavigate() ; 
    return <div className = "flex justify-between   hover:shadow-xl hover:rounded-md p-2 mt-2 ">
        <div className = "flex">
            <div className = "bg-green-200 rounded-full  h-12 w-12">
                <div className = "flex justify-center mt-2 text-xl font-thin">
                    {user.firstName[0].toUpperCase()} 
                </div>
            </div>
            <div className = "p-2 font-medium mt-1 capitalize">
                {`${user.firstName} ${user.lastName}`} 
            </div>
        </div>
        <div className = "flex flex-col  justify-center h-full">
            <Button onClick={()=>{
                navigate(`/send?id=${user._id}&name=${user.firstName}`) ; 
            }} label={"Send Money"}></Button>
        </div> 
    </div>
}