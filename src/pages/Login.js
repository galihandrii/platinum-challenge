import { Link, useNavigate } from "react-router-dom";
import "../pages/Login.css";
import Landingpage from "../assets/Landing page - Desktop.png"
import { useState } from "react";
import axios from "axios";
const Login = () => {
    const [Myemail, setMyemail] = useState('');
    const [pas, setpas] = useState('');
    const [Error, setError] = useState('');
    const navigate = useNavigate('');

    const Handleislogin = (e) => {
      setMyemail(e.target.value)
    }

    const Handleispas = (e) => {
        setpas(e.target.value)
    }

    const HandlesignIn = async() => {
        if(!Myemail && !pas) {
          setError('Masukkan email dan password terlebih dahulu')  
        } else {
            const payload = {
                email: Myemail,
                password: pas,
            }

          try {
            const res = await axios.post(`https://bootcamp-rent-cars.herokuapp.com/customer/auth/login`, payload)
            console.log(res)
            localStorage.setItem('token' , res.data.access_token)
            localStorage.setItem('email', res.data.email)
            alert('Welcome Customer Binar...')
            navigate('/Carimobil')
          } catch (error){
                console.log(error.response)
                setError(error.response.data.message)
          }
        }

        console.log(Error);
    }

    console.log(Myemail)
    console.log(pas)
    return (
        <div>
            <div className="div-content">
                <div className="div-loginAuth">
                  <div className="login-input">
                    <div>
                    <p className="p-graylogo"></p>
                    <p className="p-titlelogin">Welcome Back</p>
                    </div>
                    <div>
                    <p className="p-Emaillogin">Email</p>
                    <input type={"text"} className="input-emaillogin" placeholder="Masukkan Email" onChange={Handleislogin}/>
                    </div>
                    <div>
                    <p className="p-passwordlogin">Password</p>
                    <input type={"password"} className="input-paslogin" placeholder="Masukkan password" onChange={Handleispas}/>
                    </div>
                    <div className="div-button-login">
                     <button className="button-signin" onClick={HandlesignIn}>Sign In</button>
                    </div>
                    <div className="div-informationAuth">
                     <p className="p-informationAuth">Don’t have an account?</p>
                     <Link to={'/Register'} className="link-auth">
                     <p className="p-directsignUp">Sign Up</p>
                     </Link>
                    </div>

                     {Error ? <div className="div-handleerror">
                       <p>{Error}</p>
                      </div>
                       : null}
                  </div>


                 
                 
                 
                  
                 
                 
                </div>
                
                {/* bates-bates */}

                <div className="div-content2">
                  <div className="auth-img-content">
                  <div><p className="p-Auth-login">Binar Car Rental</p></div>
                  <div className="img-Auth"> <img src={Landingpage} className="img-Auth"/></div>
                  </div>
                </div>
            </div>
        </div>
    );
}
 
export default Login;