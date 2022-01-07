import React from 'react';
import './signin.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Signin = () => {
    const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const PostData = ()=>{
      fetch("/signin",{
          method:"post",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              email,
              password
          })
      }).then(res=>res.json())
      .then(data=>{
          console.log(data)
          if(data.error){
             return console.log(data.error)
          }
          else{
              localStorage.setItem("jwt",data.token)
              localStorage.setItem("user",JSON.stringify(data.user))
              console.log(data.message)
                // history.push("./signin")
                navigate({pathname: '/'})
          }
      })
      .catch(err=>{
        console.log(err)
      })
  }
    return (
        <div className="total">
            <h1>Sign in</h1>
            <div className="card">
                <input value={email} onChange={(e)=>setEmail(e.target.value)} className="email" type="email" placeholder='Email'/>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} className="password" type="password" placeholder='Password'/>
                <button onClick={()=>PostData()} className="signin">Sign in</button>
            </div>
        </div>
    );
};



export default Signin;