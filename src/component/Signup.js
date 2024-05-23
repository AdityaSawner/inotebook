import React, { useState }  from 'react'
import { useNavigate } from "react-router-dom";
import "../style/Signup.css"


const Signup = () => {
    
  const navigate = useNavigate();
  const[credentials,setCredentials]=useState({name :"", email:"",password:"", cpassword:""})

  const handlesubmit =async (e)=>{
   if(document.getElementById("password").value===document.getElementById("cpassword").value){
     const{name,email,password}=credentials
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
      else{
        alert('wrong credential')
       }
    }
      

    

  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }



  return (<>
  
  <div className='container'>
    <form onSubmit={handlesubmit}>
      <h2 className='heading'>SignUp</h2>
        <div className="form_input">
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" className="Sinput" id="name" name="name"  onChange={onChange}  placeholder="Enter name" />
        </div>
        <div className="form_input">
          <label htmlFor="email">Email address</label>
          <br />
          <input type="email" className="Sinput" id="email" name="email" onChange={onChange}  placeholder="Enter email" />
          <br />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form_input">
          <label htmlFor="password">Password</label>
          <br />
          <input type="password" className="Sinput" id="password" name='password'  onChange={onChange} placeholder="Password" minLength={5} required/>
          <br />
          <small id="emailHelp" className="form-text text-muted">password must be atleast of 5 character</small>

        </div>
        <div className="form_input">
          <label htmlFor="cpassword">Confirm Password</label>
          <br />
          <input type="password" className="Sinput" id="cpassword" name='cpassword'  onChange={onChange} placeholder="confirm Password" minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>


    {/* <div>
    <form onSubmit={handlesubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name"  onChange={onChange} aria-describedby="emailHelp" placeholder="Enter name" />
        </div>
        <div className="from-group">
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
    </div> */}
    
  </>
  )
  
}

export default Signup
