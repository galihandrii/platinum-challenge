import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./Tiket.css"
import Rectangle36 from '../assets/Rectangle_36.jpg';
import BackSign from '../assets/fi_arrow-left.png';
import success from '../assets/success.png';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import 'moment/locale/id'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



const Tiket = () => {
const [tiket, setTiket] = useState({});
const navigate = useNavigate()
const {id} = useParams()
const getEmail = localStorage.getItem('email')


function dotCurrency(number) {
    const currency = number;
    return new Intl.NumberFormat('de-DE').format(currency)
}

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

    const startRent = moment(tiket.start_rent_at).format('LL')
    const endRent = moment(tiket.finish_rent_at).format('LL')


    const handleDownloadPdf = () => {
        const input = document.getElementById('Invoice'); // id yang sama dengan line 128
        html2canvas(input).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'pt', 'a6');
          pdf.addImage(imgData, 'JPEG', 10, 50);
          pdf.save('InvoiceMobil'); //nama PDF setelah download
        });
      };
    


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


                    {
                        Object.entries(tiket).length ? (
                        <div className="invoice mt-5">
                            <div className="invoice-berhasil">
                                <div><img src={success}/></div>
                                <div>
                                <h6>Pembayaran Berhasil</h6>
                                <p>Tunjukan Invoice ini ke petugas BCR di titik temu</p>
                                </div>
                            </div>
                            <div className="wrapper-invoice">
                                <div className='card p-3'>
                                    <div className="invoice-unduh">
                                        <div className="invoice-unduh-top">
                                            <h6 className="title">Invoice</h6>
                                            <button onClick={handleDownloadPdf} className="button-unduh">Unduh</button>
                                        </div>
                                        <div className="invoice-unduh-bottom">
                                            <p className="no-invoice">No.Invoice</p>
                                        </div>
                                    </div>
                                    <div className="display-invoice" id="Invoice">
                                    <h4>BINAR CAR RENTAL INVOICE</h4>

                                        <div className="detail-invoice"> 
                                        <div className="detail-invoice-info">
                                            <p>Order ID     : {tiket.id}</p>
                                            <p>Email        : {getEmail}</p>
                                            <p>Jenis Mobil  : {tiket.Car.name}</p>
                                            <p>Total Bayar  : Rp. {dotCurrency(tiket.total_price)},-</p>
                                            <p>Mulai Sewa   : {startRent}</p>
                                            <p>Akhir Sewa   : {endRent}</p>
                                            <p>?? Binar Car Rental</p>
                                        </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ): null
                    }
                    

            <Footer/>
        </div>
    )
}

export default Tiket;