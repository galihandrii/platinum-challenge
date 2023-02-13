import "./Navbar.css";
import logo from "../assets/logo.png"
import {Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "../pages/Login";


const Navbar = () => {
    const [login, setlogin] = useState(false);
    const [isemail, setemail] = useState('');
    const navigate = useNavigate('');
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        const Email = localStorage.getItem('email')

    if(!token) {
        setlogin(false)
    } else {
        setlogin(true)
    }

    if(Email) {
        setemail(Email)
    } else {
        setemail()
    }
})

  const Handleremove = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    navigate('/');
  }
    return (
        <div className="navbar">
                <div className="logo"><Link to="/"><img src={logo}/></Link></div>
                 <div className="nav-list">
                     <ul>
                         <li><a className="a-href" href="#ourservice">Our Service</a></li>
                         <li><a className="a-href"  href="#whyus">Why Us</a></li>
                         <li><a className="a-href"  href="#testimonial">Testimonial</a></li>
                         <li><a className="a-href"  href="#faq">FAQ</a></li>
                         {login ?
                         <button className="button-navbar" onClick={Handleremove}>Logout</button>
                          : 
                         <Link to={"/Register"}>
                         <button className="button-navbar">Register</button>
                         </Link>}
                         {login ?  <div className="profile-navbar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                     <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                    <p className="p-profile">{isemail}</p>
                     </div> : null}
                     </ul>
                   
                 </div>
            </div>
        
    )
}

export default Navbar;