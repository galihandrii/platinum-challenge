import Navbar from "./Navbar";
import Banner from "./Banner";

const Header = () =>{
    return (
        <div>
           <Navbar/>
            <Banner isBtnShow={true}/>
        </div>
    )
}

export default Header;