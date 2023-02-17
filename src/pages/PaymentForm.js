import React, { useState } from 'react'
import Rectangle36 from '../assets/Rectangle_36.jpg';
import BackSign from '../assets/fi_arrow-left.png';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import moment from "moment/moment";
import 'moment/locale/id'
import './Paymentf.css'
import { FiUser ,FiChevronDown, FiCheck} from "react-icons/fi";


const PaymentForm = (props) => {
    const [car, setCar] = useState({})
    const startRent = moment(car.start_rent_at).format('LL')
    const endRent = moment(car.finish_rent_at).format('LL')
    const [isDisabled, setIsDisabled] = useState(true)
    const dateStart = moment(localStorage.getItem("start"))
    const dateEnd = moment(localStorage.getItem("end"))
    const longDate = (Math.round((dateEnd - dateStart) / (1000 * 60 * 60 * 24))) + 1
    const {id} = useParams()
    const navigate = useNavigate()
    const [isBcaTrue, setIsBcaTrue] = useState(false)
    const [isBniTrue, setIsBniTrue] = useState(false)
    const [isMandiriTrue, setIsMandiriTrue] = useState(false)

    console.log(id)

    const PaymentButton = () => {
      const [isDisabled, setIsDisabled] = useState(true)
    }
    const handleClick = () => {
        setIsDisabled(false);
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
             setCar(res.data);
        } catch (error) {
            console.log(error.message);
        }
      }

        useEffect(() => {
          handleOrderId()
        },[])

        function dotCurrency(number) {
          const currency = number;
          return new Intl.NumberFormat('de-DE').format(currency)
      }

      const handlePayNow = () => {
        navigate(`/payment-completed/${id}`)
    }
      const handleBack = () => {
          return navigate(-1);
       }

       const handleBca = () => {
        setIsBcaTrue(true)
        setIsBniTrue(false)
        setIsMandiriTrue(false)
        localStorage.setItem("bank", "bca")
        handleClick()
    }

    const handleBni = () => {
        setIsBcaTrue(false)
        setIsBniTrue(true)
        setIsMandiriTrue(false)
        localStorage.setItem("bank", "bni")
        handleClick()
    }

    const handleMandiri = () => {
        setIsBcaTrue(false)
        setIsBniTrue(false)
        setIsMandiriTrue(true)
        localStorage.setItem("bank", "mandiri")
        handleClick()
    }


  return (
    <>
    <Navbar />
    <div className='first-wrapper'>
    
      <div className='main-wrapper'>
          

          <div className='container'> 
            <div className='wrapper-detail-payment'>
                <div className='wrapper-pembayaran-right'>
                    <img className='button-back' src={BackSign} />
                    <a href='#'onClick={handleBack} className='button-back'>Pembayaran</a>
                </div>
                <div className='wrapper-pembayaran-left'>
                  <div className='method-payment'>
                    <p className='payment-step-1'>1</p>
                    <p>Pilih Metode</p>
                    <img src={Rectangle36} />
                  </div>
                  <div className='method-payment'>
                    <p className='payment-step'>2</p>
                    <p>Bayar</p>
                    <img src={Rectangle36} />
                  </div>
                  <div className='method-payment'>
                    <p className='payment-step'>3</p>
                    <p>Tiket</p>
                  </div>
                </div>
            </div>
          </div>

      </div>

      <div className='container '>
        <div className='detail-order'>
          <div className='card'>
              <div className='card-detail'>
                <h6 className='judul-detail'>Detail Pesananmu</h6>
              </div>

            {
              Object.entries(car).length ? (

                <div className='container'>
                <div className='row'>
                    <div className='col-lg-3 col-md-6'>
                      <div className='tipe-mobil'>
                        <h6>Tipe Mobil</h6>
                        <p className='deskripsi-detail-mobil'>{car.Car.name}</p>
                      </div> 
                    </div>

                    <div className='col-lg-3 col-md-6'>
                      <div className='kategori-mobil'>
                        <h6>Kategori</h6>
                        
                        
                          {(() => {
                              if (car.Car.category === "small") {
                              return <p className='deskripsi-detail-mobil'>2-4 Orang</p>
                          } else if (car.Car.category === "Medium") {
                              return <p className='deskripsi-detail-mobil'>4-6 Orang</p>
                          } else if (car.Car.category === "large") {
                              return <p className='deskripsi-detail-mobil'>6-8 Orang</p>
                          } else {
                              return '-'
                              }
                          })
                          () }  
                      </div>
                    </div>

                    <div className='col-lg-3 col-md-6'>
                      <div className='tanggal-mulai'>
                        <h6>Tanggal Mulai Sewa</h6>
                        <p className='deskripsi-detail-mobil'>{startRent}</p>
                      </div>
                    </div>

                    <div className='col-lg-3 col-md-6'>
                      <div className='tanggal-akhir'>
                        <h6 >Tanggal Akhir Sewa</h6>
                        <p className='deskripsi-detail-mobil'>{endRent}</p>
                      </div>
                    </div>

                </div>
              </div>
              ) : null
            }

              
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>

            <div className='col-lg-8 col-md-12 mb-2 pilih-bank'>
              <div className='card'>
                <div className='kotak-pembayaran'>
                  <h5 className='menu-pembayaran'>Pilih Bank Transfer</h5>
                  <p className='desk-menu-pembayaran'>Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau Mobile Banking</p>

                  <div className="bd-left-bank" onClick={handleBni} >
                <div className="bank-name"><h6>BNI</h6></div>
                <div className="bank-trf"><h6>BNI Transfer</h6></div>
                {
                    isBniTrue ? <div className='check-div'><FiCheck size={30} className="check-icon-bank"/></div> : null
                   }
                </div>
                <div className="bd-left-bank" onClick={handleBca}>
                <div className="bank-name"><h6>BCA</h6></div>
                <div className="bank-trf"><h6>BCA Transfer</h6></div>
                {
                    isBcaTrue ? <div className='check-div'><FiCheck size={30} className="check-icon-bank"/></div> : null
                   }
                </div>
                <div className="bd-left-bank" onClick={handleMandiri}>
                <div className="bank-name"><h6>Mandiri</h6></div>
                <div className="bank-trf"><h6>Mandiri Transfer</h6></div>
                {
                    isMandiriTrue ? <div className='check-div-mandiri'><FiCheck size={30} className="check-icon-bank"/></div> : null
                   }
                </div>
                 
                </div>
              </div>
            </div>


            {
              Object.entries(car).length ? (

                <div className='col-lg-4 col-md-12'>
              <div className='card'>
                <div className='deskripsi-pesanan'>
                  <h4>{car.Car.name}</h4>
                  <p className='pesanan-kategori'>
                     {(() => {
                                        if (car.Car.category === "small") {
                                            return <p>2 - 4 orang</p>
                                        } else if (car.Car.category === "Medium") {
                                            return <p>4 - 6 orang</p>
                                        } else if (car.Car.category === "large") {
                                            return <p>6 - 8 orang</p>
                                        } else {
                                            return <p>-</p>
                                        }
                                    })()
                    }
                  </p>
                  <div className='deskripsi-total'>
                      <p>Total :</p>
                      <p className='menu-pembayaran'>Rp. {dotCurrency(car.total_price)}</p>
                  </div>
                  <p className='menu-pembayaran'>Harga</p>
                  <div className='deskripsi-total'>
                    <p className='desk-menu-pembayaran'>Sewa Mobil Rp. {dotCurrency(car.Car.price)} x {longDate} Hari</p>
                    <p className='harga-total-dikalihari'>Rp. {dotCurrency(car.total_price)}</p>
                  </div>

                  <p className='menu-pembayaran'>Biaya Lainya</p>
                  <div className='deskripsi-total'>
                    <ul className='desk-menu-pembayaran'><li>Pajak</li></ul>
                    <p className='biaya-lain'>Termasuk</p>
                  </div>
                  <div className='deskripsi-total'>
                    <ul className='desk-menu-pembayaran'><li>Biaya Makan Sopir</li></ul>
                    <p className='biaya-lain'>Termasuk</p>
                  </div>

                  <p className='menu-pembayaran'>Belum Termasuk</p>
                  <ul className='desk-menu-pembayaran'><li>Bensin</li></ul>
                  <ul className='desk-menu-pembayaran'><li>Tol dan parkir</li></ul>

                  <div className='deskripsi-total'>
                    <p className='menu-pembayaran'>Total</p>
                    <p className='menu-pembayaran'>Rp. {dotCurrency(car.total_price)}</p>
                  </div>
                  
                  
                  {/* <Link to={`/payment-completed/${id}`}>  */}
                    <button disabled={isDisabled}  onClick={handlePayNow} className='btn btn-success w-100'>Bayar</button>
                    {/* </Link> */}
                 
                 
                 
                  
                 
                   

                </div>
              </div>
            </div>

              ) : null
            }

            
        </div>
      </div>
    
      
    </div>
    <Footer />
    </>
  )
}

export default PaymentForm