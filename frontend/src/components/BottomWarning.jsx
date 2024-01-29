import { Link } from "react-router-dom"; 


export function BottomWarning({label , bottomText , to}){
  return <div className = "flex justify-center text-sm font-medium antialised">
    <div className = "pr-2">
      {label} 
    </div>
    <Link className = "underline pointer cursor-pointer" to = {to}>
      {bottomText}
    </Link>
  </div>
}