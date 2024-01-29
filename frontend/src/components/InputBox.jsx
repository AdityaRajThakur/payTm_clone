export function InputBox({label , placeholder ,onChange}){
    return <div className="grid grid-cols-1">
        <div className = " pb-2 py-1 font-medium text-sm  text-left">
        {label}
        </div>
        <input onChange = {onChange} className = "hover:ring-1 p-1 rounded shadow-lg border mb-4" placeholder={placeholder}></input>
    </div>
}