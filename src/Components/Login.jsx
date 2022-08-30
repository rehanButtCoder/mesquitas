import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { login } from '../Services/Authentication';
import Swal from 'sweetalert2'


const Login = () => { 
  
  const ShowPass = () => {
    const input = document.querySelector(".login-pass input");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  }

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (fData) =>{
    debugger
    const resp = await login(fData);
    
    if(resp.data.code === 1){
      setTimeout(() => {
        navigate("/");
      }, 0);
    }

    if (resp.data.code === 0) {
      Swal.fire({
          title: 'Email or Password is wrong!',
          timer: 1500,
          icon: 'error',
          showConfirmButton: false,
      })
  }
  }

  return (
    <div className='login_Form'>
      <div className="login-content">
        <div className="login-img">
          <img src="/assets/images/Logo.png" alt="" />
        </div>
        <div className="login-header">
          <h2>Admin Login</h2>
          <p>Please Enter valid credentials to Continue.</p>
        </div>
        <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
          <div className="login-name mb-20">
            <input placeholder='Email' className='inputField' type="email" {...register("email", { required: true })} />
            {errors.email && <span className='eror'>Email is required</span>}
          </div>
          <div className="login-pass">
            <input className='inputField' placeholder='Password' type="password" {...register("password", { required: true })} />
            <img className='eye-pass' onClick={ShowPass} src="/assets/images/showpassword_login.png" alt="" />
            {errors.password && <span className='eror'>Password is required</span>}
          </div>
          <input className="login-button" type="submit" value='Login' />
        </form>
      </div>
    </div>
  )
}

export default Login