import "./Detailcar.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Cardescription from "../components/Cardescription";
import Filterdisable from "../components/Filterdisable";




const Detailcar = (props) => {
    
     
    return(
        <div>
            <Navbar/>
            <div className="div-add"></div>
            <Filterdisable />
            <Cardescription/>
            <Footer/>
        </div>
    )
}

export default Detailcar;