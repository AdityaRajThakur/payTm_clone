import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

export function Signin() {
  return (
    <div className="w-1/4 mx-auto border p-2 shadow-md rounded-xl mt-10 "> 
      <div className="grid-rows-1">
        <Heading heading={"Sign In"} />
        <SubHeading
          subheading={"Enter your Credentials to access your account"}
        />
        <InputBox label={"Email"} placeholder={"johndoe@gmail.com"} />
        <InputBox label={"Password"} placeholder="123123" />
        <Button label={"Sign In"} />
        <BottomWarning
          label={"Don't have an account "}
          bottomText={"Sign Up"}
          to={"/signup"}
        />
      </div>
    </div>
  );
}
