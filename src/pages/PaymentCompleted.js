import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
//import DropZone from '../components/DropZone';
import CopyToClipboardButton from '../components/TextToClipboard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Rectangle36 from '../assets/Rectangle_36.jpg';
import BackSign from '../assets/fi_arrow-left.png';
import axios from 'axios';
import Check from '../assets/check.svg';
import './Paymentcompleted.css'
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactCountdown from '../components/ReactCountdown'

const PaymentCompleted = (props) => {
    const [image, setImage] = useState(null)
    const [car, setCar] = useState({})
    const {id} = useParams()
    
    const [confirm, setConfirm] = useState(false);
    const navigate = useNavigate()

    const handleUpload = () => {
        setConfirm(false)
    }
    const handleImage = (e) => {
        setImage(e.target.files[0]);
        console.log(e.target.files[0])
    }
    
    const handleConfirm = () => {
        setConfirm(true);
    }

    
    const [files, setFiles] = useState([]);
    console.log(files);
  
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
      accept: 'image/*',
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
      }
    });
  
    const style = {
      borderColor: '#6c757d',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      borderWidth: 2,
      borderRadius: 5,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      transition: 'border .2s ease-in-out'
    };
  

    
    
    const copyToClipboard = async () => {
        try {
          await navigator.clipboard.writeText(text);
          alert('Copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
    };

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

      const uploadPaymentSlip = () => {

        const token = localStorage.getItem('token');

        const configurasi = {
            headers: {
                access_token: token,
            },
        };

        const formData = new FormData();
        formData.append('slip', files[0]);

        axios
            .put(`https://bootcamp-rent-cars.herokuapp.com/customer/order/${id}/slip`,formData, configurasi)
            .then((res) => {
                console.log(res)
                navigate(`/tiket/${res.data.id}`)
            })
            .catch((err) => console.log(err))
      }


      const handleBack = () => {
         return navigate(-1);
      }
    
  return (
        <div>
            <Navbar />

                <div className='main-wrapper'>
                        <div className='container'> 
                            <div className='wrapper-detail-payment'>
                                <div className='wrapper-pembayaran-right'>
                                    <img onClick={handleBack} src={BackSign} />
                                    <a onClick={handleBack} href='#' className='button-back'>BCA Transfer</a>
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
                                    <p className='payment-step'>3</p>
                                    <p>Tiket</p>
                                </div>
                                </div>
                            </div>
                            <div className='order-id'>
                                {
                                    Object.entries(car).length ? (
                                        <p className='order-number'>Order Id: {car.id}</p>
                                    ) : null
                                }
                            </div>
                        </div>
                    </div>

                    <div className='main-content'>
                        
                            
                                <div className='content-left'>
                                
                                    <div className='card mb-2'>
                                        <div className='kelas-pembayaran'>
                                            <div className='bagian1-kelas-pembayaran'>
                                                <p className='judul'>Lakukan Pembayaran Sebelum</p>
                                                <p className='judul-1'>Rabu, 19 Mei 2022 jam 13.00 WIB</p>
                                            </div>
                                            <div className='bagian2-kelas-pembayaran'>
                                                <ReactCountdown />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='card mb-2'>
                                        <div className='lakukan-transfer'>
                                            <p className='judul-lakukan-transfer'>Lakukan Transfer Ke</p>

                                            <div className='lakukan-transfer-bank'>
                                                <div className='opsi-1'>
                                                    <p className='font'>BCA</p>
                                                </div>
                                                <div className='opsi-2'>
                                                    <p className='font-1'>BCA Transfer</p>
                                                    <p className='font-1'>a.n Binar Car Rental</p>
                                                </div>
                                            </div>

                                            <div className='copas-thecode'>
                                                <p className='title'>Nomor Rekeninng</p>
                                                <div className='copy-thecode'>
                                                    <p className='detail-thecode'>14521</p>
                                                    <CopyToClipboardButton />
                                                </div>

                                                <p className='title'>Total Bayar</p>
                                                <div className='copy-thecode'>
                                                    {
                                                        Object.entries(car).length ? (
                                                            <p onClick={copyToClipboard} className='detail-thecode'>{car.total_price}</p>
                                                        ) : null
                                                    }
                                                    <CopyToClipboardButton />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='card mb-2'>
                                        <div className='instruksi-pembayaran'>
                                            <h5 className='upside'>Instruksi Pembayaran</h5>
                                            <div className='cara2pembayaran'>
                                                <p className='cara-1'>ATM BCA</p>
                                                <p className='cara-2'>M-BCA</p>
                                                <p className='cara-2'>BCA Klik</p>
                                                <p className='cara-2'>Internet Banking</p>
                                            </div>
                                            <p className='langkahpembayaran'>Masukan kartu ATM, lalu PIN</p>
                                            <p className='langkahpembayaran'>Pilih menu kemudian transfer </p><p className='langkahpembayaran'>Lakukan saja apa yang anda lakukan</p><p className='langkahpembayaran'>Sekarepmu dewe</p>
                                        </div>
                                    </div>

                                </div>
                                <div className='content-right'>

                                    <div className='card mb-5'>
                                        <div className='kelas-pembayarankanan'>
                                            <p className='judul-kanan'>Klik konfirmasi pembayaran untuk mempercepat proses pengecekan</p>

                                            {
                                                confirm ? (
                                                    <>
                                                        <p className='judul-kanan'>Terima kasih telah melakukan konfirmasi pembayaran. Pembayaranmu akan segera kami cek tunggu kurang lebih 10 menit untuk mendapatkan konfirmasi.</p>
                                                        <p className='judul-kanan'>Upload Bukti Pembayaran</p>
                                                        <p className='judul-kanan'>Untuk membantu kami lebih cepat melakukan pengecekan. Kamu bisa upload bukti bayarmu</p>

                                                        {/* <DropZone type='file' onChange={handleImage} /> */}
                                                        <div {...getRootProps()} className="dropzone" style={style}>
                                                            <input {...getInputProps()} />
                                                            {isDragActive ?
                                                                <p>Drop the files here ...</p> :
                                                                <p>Drag and drop your files here, or click to select files</p>
                                                            }
                                                            {files.map(file => (
                                                                <img
                                                                key={file.name}
                                                                src={file.preview}
                                                                alt={file.name}
                                                                style={{height: 100, margin: 10}}
                                                                />
                                                            ))}
                                                        </div>
                                                        
                                                        <button className='btn btn-success w-100' onClick={uploadPaymentSlip}>Upload</button>
                                                    </>
                                                ) : <button className='btn btn-success w-100 tombol-kanan' onClick={handleConfirm}>Konfirmasi Pembayaran</button>
                                            }

                                            
                                        </div>
                                    </div>
                                </div>
                            
                        
                    </div>

            <Footer />
        </div>
  )
}


export default PaymentCompleted;