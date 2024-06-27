import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "../style/Login.css"


const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://inotebook-hr9g.onrender.com/api/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });

    const json = await response.json();

    console.log(json);
    if (json.success) {
      //
      localStorage.setItem('token', json.authtoken)
      navigate('/');

    }
    else {
      alert('wrong credential')
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <>

      <div className="loginContainer">
        <form onSubmit={handlesubmit}>
          <div className="headlogin">
            <h2>Login kro</h2>
          </div>
          <div className="loginform">
            <label htmlFor="email">Email address</label>
            <br />
            <input type="email" className="logininput" id="email" name="email" value={credentials.email} onChange={onChange} placeholder="Enter email" />
          </div>
          <div className="loginform">
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" className="logininput" id="password" name='password' value={credentials.password} onChange={onChange} placeholder="Password" />
          </div>
          <div className="LSubmit">
            <button type="submit" className="loginSubmit" >Submit</button>

          </div>
        </form>
      </div>


      {/* <div>
    <form onSubmit={handlesubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} placeholder="Password" />
        </div>
        <div className="form-check">
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div> */}
    </>
  )
}

export default Login