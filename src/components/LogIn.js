import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import Input from "./form/Input";

const LogIn = ()=> {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const navigate = useNavigate();

    const {setJwtToken} = useOutletContext();
    const {setAlertClass} = useOutletContext();
    const {setAlertMsg} = useOutletContext();
    const { toggleRefresh } = useOutletContext();
    const {jwtToken} = useOutletContext();

    useEffect(() => {
      if (jwtToken !== "") {
        navigate("/");
        return; 
      }
    })

    const handleSubmit = async (e) =>{
        e.preventDefault();
        // build the request payload

        // let payload = {
        //     email: email,
        //     password: pwd,
        // }

        // const requestOptions = {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     credentials: 'include',
        //     body: JSON.stringify(payload),
        // }

        // fetch(`http://localhost:8080/authenticate`, requestOptions)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         if (data.error) {
        //             setAlertClass("alert-danger");
        //             setAlertMsg(data.message);
        //         } else {
        //             setJwtToken(data.access_token);
        //             setAlertClass("d-none");
        //             setAlertMsg("");
        //             navigate("/");
        //         }
        //     })
        //     .catch(error => {
        //         setAlertClass("alert-danger");
        //         setAlertMsg(error);
        //     })

        try {
            // Build the request payload
            let payload = {
              email: email,
              password: pwd,
            };
      
            const response = await axios.post('http://localhost:8080/authenticate', payload, {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            });
      
            const data = response.data;
            if (data.error) {
              setAlertClass('alert-danger');
              setAlertMsg(data.message);
            } else {
              setJwtToken(data.access_token);
              setAlertClass('d-none');
              setAlertMsg('');
              navigate('/');
              toggleRefresh(true);
            }
        } catch (error) {
            setAlertClass('alert-danger');
            setAlertMsg(error.message);
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