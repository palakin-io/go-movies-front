import { useState } from "react";
import Input from "./form/Input";
import { useNavigate, useOutletContext } from "react-router-dom";

const LogIn = ()=> {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const navigate = useNavigate();

    const {setJwtToken} = useOutletContext();
    const {setAlertClass} = useOutletContext();
    const {setAlertMsg} = useOutletContext();

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("email/pass", email, pwd);
        if (email === "admin@example.com") {
            setJwtToken("abc");
            setAlertClass("d-none");
            setAlertMsg("");
            navigate("/");
        } else {
            setAlertClass("alert-danger");
            setAlertMsg("Invalid Credentials");
        }
    }

    
    return(
        <>
            <div className="col-md-6 offset-md-3">
                <h2>LogIn</h2>
                <hr></hr>
                <form onSubmit={handleSubmit}>
                    <Input title="Email Address" type="email" className="form-control" name="email" autoComplete="email-new" onChange={(event) => setEmail(event.target.value)}></Input>
                    <Input title="Password" type="password" className="form-control" name="password" autoComplete="pwd-new" onChange={(event) => setPwd(event.target.value)}></Input>
                    <hr/>
                    <input type="submit" className="btn btn-primary" value="Log In"></input>
                </form>
            </div>
        </>
    )
}

export default LogIn;