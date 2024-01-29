import { useEffect } from "react";
import axios from 'axios' ; 
import {useState} from 'react'
export function Balance(){
    const [value , setValue] = useState(0) ; 
    useEffect(()=>{
        async function fetchData(){
            const res = await axios({
                method : 'get' , 
                url : "http://localhost:8000/api/v1/account/balance" , 
                headers : {
                    Authorization : "Bearer " + localStorage.getItem('token') , 
                }
            })
            console.log(res.data) ; 
            setValue(res.data['balance']) ; 
            
        }
        fetchData() ; 
    },[]) ; 
    return <div className = "mr-5  ml-5 mb-2 flex rounded-md  mt-4 justify-between p-1 ">
        <div className = "flex">
            <div className = "font-bold mr-2 ml-3 pr-2 text-medium bg-blue-200 rounded-xl">
                <div className = "ml-4">
                    Your Balance 
                </div>
            </div>
            <div className =  "font-bold ">
                RS {value} 
            </div>
        </div>
    </div>
}