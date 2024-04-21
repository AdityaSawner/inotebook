import React, { useState }  from 'react'
import { useNavigate } from "react-router-dom";


const Signup = () => {
    
  const navigate = useNavigate();
  const[credentials,setCredentials]=useState({name :"", email:"",password:"", cpassword:""})

  const handlesubmit =async (e)=>{
    const{name,email,password,cpassword}=credentials
       e.preventDefault();
      
       const response = await fetch('http://localhost:5000/api/auth/createUser', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({name,email,password}),
       });
  
       const json=await response.json();

      console.log(json);

        if(json.success){
        //
        localStorage.setItem('token',json.authtoken)
        navigate('/');

      }
      else{
        alert('wrong credential')
      }
      }

    

  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }



  return (
  
    <div>
    <form onSubmit={handlesubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name"  onChange={onChange} aria-describedby="emailHelp" placeholder="Enter name" />
        </div>
        <div className="">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name='password'  onChange={onChange} placeholder="Password" minLength={5} required/>
          <small id="emailHelp" className="form-text text-muted">password must be atleast of 5 character</small>

        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword'  onChange={onChange} placeholder="confirm Password" minLength={5} required/>
        </div>
        <div className="form-check">
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
    
  )
  
}

export default Signup
