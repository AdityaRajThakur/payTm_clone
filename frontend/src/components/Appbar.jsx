export function Appbar(){

    return <div className = "rounded-md shadow-xl m-1 flex justify-between p-1">
        <div className = "mt-3 text-sm font-semibold antialised">
            PayTM App 
        </div>
        <div className = "flex mr-4 ">
            <div className ="font-semibold flex justify-center mt-3 pr-2">
                Hello
            </div>
            <div className="hover:bg-purple-300 hover:shadow-xl rounded-full bg-purple-200 h-12 w-12">
                <div className = "flex justify-center mt-2 text-2xl">
                    U
                </div>
            </div>
        </div>
    </div>
}