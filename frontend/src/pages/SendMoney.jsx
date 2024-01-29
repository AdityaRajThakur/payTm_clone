import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const username = searchParams.get("name");
  const [amount, setAmount] = useState("");
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div class="flex flex-col space-y-1.5 p-6">
            <h2 class="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div class="p-6">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span class="text-2xl text-white">A</span>
              </div>
              <h3 class="text-2xl font-semibold capitalize">{username}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  type="number"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Enter amount"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </div>
              <button onClick={()=>{
                async function sendData(){
                    const res = await axios({
                        method : 'post' , 
                        url : 'http://localhost:8000/api/v1/account/transfer', 
                        data : {
                            to : id , 
                            amount : Number(amount) , 
                        },
                        headers:{ 
                            Authorization : 'Bearer ' + localStorage.getItem('token') 
                        }
                    })
                    alert(`Transfer of ${amount} to ${id} is successfull`) ; 
                    console.log(res) ; 
                }
                sendData() ; 
              }} className="hover:bg-green-600 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
