import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import "./signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");

  const PostData = ()=>{
      fetch("/signup",{
          method:"post",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              name,
              email,
              city,
              password
          })
      }).then(res=>res.json())
      .then(data=>{
          if(data.error){
             return console.log(data.error)
          }
          else{
              console.log(data.message)
                // history.push("./signin")
                navigate({pathname: '/signin'})
          }
      })
      .catch(err=>{
        console.log(err)
      })
  }


  return (
    <div className="total">
      <div className="card">
        <input value={name} onChange={(e)=>setName(e.target.value)} className="name" type="text" placeholder="Name" />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="email" type="email" placeholder="Email" />
        <input value={city} onChange={(e)=>setCity(e.target.value)} className="city" type="text" placeholder="City" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} className="password" type="password" placeholder="Password" />
        <button onClick={()=>PostData()} className="signin">Sign up</button>
      </div>
    </div>
  );
};

export default Signup;
