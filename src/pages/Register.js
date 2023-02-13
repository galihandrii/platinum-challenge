import "../pages/Register.css";
import Landingpage from "../assets/Landing page - Desktop.png";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
 const [Email, setEmail] = useState('');
 const [pas, setpas]= useState('');
 const [Error, setError] = useState('');
 const navigate = useNavigate('');

 const Handleemail = (e) => {
   setEmail(e.target.value)
 }

 const Handlepas = (e) => {
   setpas(e.target.value)
 }

 const HandlesignUp = async() => {
   if(!Email.length && !pas.length) {
    setError("Masukkan name , email dan password terlebih dahulu")
   } else {
     const payload = {
        email: Email,
        password: pas,
        role: "Admin",
     }
     try {
      const res = await axios.post(`https://bootcamp-rent-cars.herokuapp.com/customer/auth/register`, payload)
      console.log(res)
      alert('Registrasi berhasil...');
      navigate('/login');
     } catch (error){
       if(error.response.status === 400) {
          setError(error.response.data.message)
       } else if(error.response.status === 500) {
          setError(error.response.data.errors[0].message)
       }
      }
   }
 }

 console.log(Email)
 console.log(pas)
    return (
        <div className="div-authregister">
            <div className="div-content">
            <div className="div-Authcontent1">

            <div className="auth-input-data">
              <div>
               <p className="p-authcontent"></p>
               <p className="p-titleauth">Sign up</p>
              </div>
              <div>
               <p className="p-nameAuth">Name</p>
               <input type={'text'} className="input-name" placeholder="Masukkan nama"/>
              </div>
              <div>
               <p className="p-EmailAuth">Email</p>
               <input type={'text'} className="input-name" placeholder="Masukkan Email terlebih dahulu" onChange={Handleemail}/> 
              </div>
              <div>
              <p className="p-EmailAuth">Create Password</p>
               <input type={"password"} className="input-name" placeholder="Masukkan Password" onChange={Handlepas}/>
              </div>
              <div className="div-button-regis">
               <button className="button-signup" onClick={HandlesignUp}>Sign Up</button>
               </div>
               <div className="div-informationAuth">
                 <p>Already have an account?</p>
                 <Link to={"/login"} className="link-auth">
                 <p className="p-directSignIn">Sign In here</p>
                 </Link>
               </div>
              {Error ?  
              <div className="div-handleerror">
                <p className="p-error">{Error}</p>
               </div> 
               : null}
            </div>
            </div>

              {/* bates-bates */}

            <div className="div-Authcontent2">
              <div className="auth-img-content">
                <div><p className="p-Auth-register">Binar Car Rental</p></div>
                <div className="img-Auth"><img src={Landingpage}/></div>
              </div>
            </div>
            </div>
        </div>
    );
}
 
export default Register;