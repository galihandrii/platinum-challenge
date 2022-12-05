import "./Detailcar.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Cardescription from "../components/Cardescription";
import Filter from "../components/Filter";




const Detailcar = (props) => {
    
     
    return(
        <div>
            <Navbar/>
            <div className="div-add"></div>
            <Filter />
            <Cardescription/>
            <Footer/>
        </div>
    )
}

export default Detailcar;