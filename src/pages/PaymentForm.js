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


const PaymentForm = (props) => {
    const [car, setCar] = useState({})
    const startRent = moment(car.start_rent_at).format('LL')
    const endRent = moment(car.finish_rent_at).format('LL')
    const [isDisabled, setIsDisabled] = useState(true)
    const dateStart = moment(localStorage.getItem("start"))
    const dateEnd = moment(localStorage.getItem("end"))
    const {id} = useParams()
    const navigate = useNavigate()

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

  return (
    <>
    <Navbar />
    <div className='first-wrapper'>
    
      <div className='main-wrapper'>
          

          <div className='container'> 
            <div className='wrapper-detail-payment'>
                <div className='wrapper-pembayaran-right'>
                    <img src={BackSign} />
                    <a href='/Carimobil' className='button-back'>Pembayaran</a>
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

      <div className='container'>
        <div className='detail-order'>
          <div className='card'>
              <div className='card-detail'>
                <p className='judul-detail'>Detail Pesananmu</p>
              </div>

            {
              Object.entries(car).length ? (

                <div className='container'>
                <div className='row'>
                    <div className='col-lg-3 col-md-6'>
                      <div className='tipe-mobil'>
                        <p className='judul-detail-mobil'>Tipe Mobil</p>
                        <p className='deskripsi-detail-mobil'>{car.Car.name}</p>
                      </div> 
                    </div>

                    <div className='col-lg-3 col-md-6'>
                      <div className='kategori-mobil'>
                        <p className='judul-detail-mobil'>Kategori</p>
                        <p className='deskripsi-detail-mobil'></p> 
                        
                          {(() => {
                              if (car.Car.category === "small") {
                              return <p>2-4 Orang</p>
                          } else if (car.Car.category === "Medium") {
                              return <p>4-6 Orang</p>
                          } else if (car.Car.category === "large") {
                              return <p>6-8 Orang</p>
                          } else {
                              return '-'
                              }
                          })
                          () }  
                      </div>
                    </div>

                    <div className='col-lg-3 col-md-6'>
                      <div className='tanggal-mulai'>
                        <p className='judul-detail-mobil'>Tanggal Mulai Sewa</p>
                        <p className='deskripsi-detail-mobil'>{startRent}</p>
                      </div>
                    </div>

                    <div className='col-lg-3 col-md-6'>
                      <div className='tanggal-akhir'>
                        <p className='judul-detail-mobil'>Tanggal Akhir Sewa</p>
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

            <div className='col-lg-8 col-md-12 mb-2'>
              <div className='card'>
                <div className='kotak-pembayaran'>
                  <h5 className='menu-pembayaran'>Pilih Bank Transfer</h5>
                  <p className='desk-menu-pembayaran'>Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau Mobile Banking</p>

                  <div className='tipe-bank'>
                    <p className='bni-bank'>BCA</p>
                    <a onClick={handleClick} className='desk-bank desk-menu-pembayaran'>BCA Transfer</a>
                  </div>

                  <div className='tipe-bank'>
                    <p className='bni-bank'>BNI</p>
                    <a onClick={handleClick} className='desk-bank desk-menu-pembayaran'>BNI Transfer</a>
                  </div>

                  <div className='tipe-bank'>
                    <p className='bni-bank'>BRI</p>
                    <a onClick={handleClick} className='desk-bank desk-menu-pembayaran'>BRI Transfer</a>
                  </div>
                </div>
              </div>
            </div>


            {
              Object.entries(car).length ? (

                <div className='col-lg-4 col-md-12'>
              <div className='card'>
                <div className='deskripsi-pesanan'>
                  <h5 className='menu-pembayaran'>{car.Car.name}</h5>
                  <p className='pesanan-kategori'>{car.Car.category}</p>
                  <div className='deskripsi-total'>
                      <p>Total</p>
                      <p className='menu-pembayaran'>{car.Car.price}</p>
                  </div>
                  <p className='menu-pembayaran'>Harga</p>
                  <div className='deskripsi-total'>
                    <p className='desk-menu-pembayaran'>Sewa Mobil Rp.500.000 x 7 Hari</p>
                    <p>{car.total_price}</p>
                  </div>

                  <p className='menu-pembayaran'>Biaya Lainya</p>
                  <div className='deskripsi-total'>
                    <p className='desk-menu-pembayaran'>Pajak</p>
                    <p>Termasuk</p>
                  </div>

                  <p className='menu-pembayaran'>Belum Termasuk</p>
                  <p className='desk-menu-pembayaran'>Bensin</p>
                  <p className='desk-menu-pembayaran'>Tol Dan Parkir</p>

                  <div className='deskripsi-total'>
                    <p className='menu-pembayaran'>Total</p>
                    <p className='menu-pembayaran'>{car.total_price}</p>
                  </div>
                  <Link to={`/payment-completed/${id}`}>
                    <button disabled={isDisabled} className='menu-pembayaran btn btn-success w-100'>Bayar</button>
                  </Link>

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