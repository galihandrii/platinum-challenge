import "./Paymentmethod.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Detailpesanan from "./DetailPesanan";


const Paymentmethod = () => {
    return (
        <div>
            <Navbar/>
            <div className="pembayaran-method">
                <div>← Pembayaran</div>
                <div>
                    <ul>
                        <li>pilih metode</li>
                        <li>Bayar</li>
                        <li>Tiket</li>
                    </ul>
                </div>
            </div> 
            <Detailpesanan/>
            <Footer/>
        </div>
    )
}

export default Paymentmethod;