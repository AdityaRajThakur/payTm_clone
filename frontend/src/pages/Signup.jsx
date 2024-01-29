import { Heading } from "../components/Heading";
import axios  from "axios"
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
export function Signup() {
  const [firstName ,setFirstName] = useState("") ; 
  const [lastName ,setLastName] = useState("") ; 
  const [username ,setUsername] = useState("") ; 
  const [password,setPassword] = useState("") ; 
  const navigate = useNavigate() ; 
  return (
    <div className="w-1/4 mx-auto border p-2 shadow-md rounded-xl m-10"> 
      <div className="grid-rows-1">
        <Heading heading={"Sign Up"} />
        <SubHeading subheading={"Enter your information to create an account"}/>
        <InputBox onChange = {(e)=>{
          setFirstName(e.target.value) ; 
        }}label={"First Name"} placeholder={"Jon"} />
        <InputBox onChange = {(e)=>{
          setLastName(e.target.value) ; 
        }} label={"Last Name"} placeholder={"Doe"} />
        <InputBox onChange={(e)=>{
          setUsername(e.target.value) ; 
        }} label={"Email"} placeholder={"Jon@gmail.com"} />
        <InputBox onChange={(e)=>{
          setPassword(e.target.value) ; 
        }} label={"Password"} placeholder={"123"} />
        <Button label={"Sign up"} onClick={
          async ()=>{
          const res = await axios.post("http://localhost:8000/api/v1/user/signup" , {
            username,
            firstName,
            lastName,
            password,
          });
          localStorage.setItem("token" , res.data['token'])
          console.log(res.data) ; 
          navigate('/dashboard')
        }
        } />
        <BottomWarning label={"Already have an account?"} bottomText={"Sign in"} to={"/signin"}/>
      </div>
    </div>
  );
}
