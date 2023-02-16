import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./Tiket.css"
import Rectangle36 from '../assets/Rectangle_36.jpg';
import BackSign from '../assets/fi_arrow-left.png';
import success from '../assets/success.png';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";



const Tiket = () => {
const [tiket, setTiket] = useState({});
const navigate = useNavigate()
const {id} = useParams()




const handleBack = () => {
    return  navigate(-1)
}

const handleOrderId = async() => {
    const token = localStorage.getItem("token")
    const config = {
        headers: {
            access_token: token
        },  
    }

    try {
        const res = await axios.get(`https://bootcamp-rent-cars.herokuapp.com/customer/order/${id}`,config)
        console.log(res.data)
         setTiket(res.data);
    } catch (error) {
        console.log(error.message);
    }
  }

    useEffect(() => {
      handleOrderId()
    },[])


    return (
        <div>
            <Navbar/>
            <div className='main-wrapper'>
                        <div className='container'> 
                            <div className='wrapper-detail-payment'>
                                <div className='wrapper-pembayaran-right'>
                                    <img onClick={handleBack} src={BackSign} />
                                    <a onClick={handleBack} href='#' className='button-back'>Tiket</a>
                                </div>
                                <div className='wrapper-pembayaran-left'>
                                <div className='method-payment'>
                                    <p className='payment-step-1'>1</p>
                                    <p>Pilih Metode</p>
                                    <img src={Rectangle36} />
                                </div>
                                <div className='method-payment'>
                                    <p className='payment-step-1'>2</p>
                                    <p>Bayar</p>
                                    <img src={Rectangle36} />
                                </div>
                                <div className='method-payment'>
                                    <p className='payment-step-1'>3</p>
                                    <p>Tiket</p>
                                </div>
                                </div>
                            </div>
                            <div className='order-id'>
                                {
                                    Object.entries(tiket).length ? (
                                        <p className='order-number'>Order Id: {tiket.id}</p>
                                    ) : null
                                }
                            </div>
                        </div>
                    </div>



                    <div className="invoice">
                        <div className="invoice-berhasil">
                            <div><img src={success}/></div>
                            <div>
                            <h6>Pembayaran Berhasil</h6>
                            <p>Tunjukan Invoice ini ke petugas BCR di titik temu</p>
                            </div>
                        </div>
                        <div className="invoice-unduh">
                            <div className="invoice-unduh-top">
                                <div><h6>Invoice</h6></div>
                                <div><button>Unduh</button></div>
                            </div>
                            <div className="invoice-unduh-bottom">

                            </div>
                        </div>
                    </div>

            <Footer/>
        </div>
    )
}

export default Tiket;