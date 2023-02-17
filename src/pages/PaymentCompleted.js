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
import ReactCountdown1 from '../components/ReactCountdown1';

const PaymentCompleted = (props) => {
    const [image, setImage] = useState(null)
    const [car, setCar] = useState({})
    const {id} = useParams()
    const bank = localStorage.getItem("bank")
    const [confirm, setConfirm] = useState(false);
    const navigate = useNavigate()
    const [atm, setAtm] = useState(true)
    const [mBanking, setMBanking] = useState(false)
    const [clickBca, setClickBca] = useState(false)
    const [iBanking, setIBanking] = useState(false)


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
  
    function displayDeadline() {
        const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1)

    let hour = tomorrow.getHours()
    let minute = tomorrow.getMinutes()

    const dispDate = new Intl.DateTimeFormat('id-ID', { dateStyle: 'full'}).format(tomorrow); 
    const dispTime = `Jam ${hour}:${minute}`
    return (
        <p className='judul-1'>{dispDate} {dispTime}</p>
    )
    }
    

    




    function dotCurrency(number) {
        const currency = number;
        return new Intl.NumberFormat('de-DE').format(currency)
    }
    
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

      const handleAtm = () => {
        setAtm(true)
        setMBanking(false)
        setClickBca(false)
        setIBanking(false)
    }

    const handleMBanking = () => {
        setAtm(false)
        setMBanking(true)
        setClickBca(false)
        setIBanking(false)
    }

    const handleClickBca = () => {
        setAtm(false)
        setMBanking(false)
        setClickBca(true)
        setIBanking(false)
    }

    const handleIBanking = () => {
        setAtm(false)
        setMBanking(false)
        setClickBca(false)
        setIBanking(true)
    }

    function displayAtm(){
        return (
            <ul className='display-function'>
                                            <li>Masukkan kartu ATM, lalu PIN</li>
                                            <li>Pilih menu “Transaksi Lainnya” – ‘Transfer” – “Ke Rek BCA Virtual Account”</li>
                                            <li>Masukkan nomor BCA Virtual Account: 70020+Order ID<br />
                                            Contoh:<br />
                                            No. Peserta: 12345678, maka ditulis 7002012345678</li>
                                            <li>Layar ATM akan menampilkan konfirmasi, ikuti instruksi untuk menyelesaikan transaksi</li>
                                            <li>Ambil dan simpanlah bukti transaksi tersebut</li>
                                        </ul>
        )
    }

    function displayMbca() {
        return(
            <ul className='display-function'>
            <li>Login dengan akun Mbanking Anda</li>
            <li>Pilih menu “m-Transfer”, pilih “BCA Virtual Account”</li>
            <li>Input Kode Virtual Account: 39107+20+NRP<br />
            Contoh:<br />
            No. Peserta: 12345678, maka ditulis 7002012345678</li>
            <li>Klik menu “Simpan Daftar Transfer” untuk menyimpan nomor pembayaran</li>
            <li>Klik OK kemudian Kirim/Send</li>
            <li>Input PIN BCA untuk mengotorisasi</li>
            <li>Ikuti instruksi untuk menyelesailkan transaksi</li>
        </ul>
        )
    }

    function displayKlikBca() {
        return(
            <ul className='display-function'>
            <li>Buka halaman BCAKlikPay</li>
            <li>Pilih menu Registrasi</li>
            <li>Baca Syarat dan Ketentuan</li>
            <li>Isi data dengan benar</li>
            <li>Pilih sumber dana pembayaran. Untuk saat ini DTKP hanya mendukung metode pembayaran BCA KlikPay dengan sumber dana dari KlikBCA</li>
            <li>Anda akan menerima kode aktivasi lewat email dan SMS</li>
        </ul>
        )
    }

    function displayInternetBanking(){
        return(
            <ul className='display-function'>
                                            <li>Login ke KlikBCA Individual</li>
                                            <li>Pilih Menu “Transfer”</li>
                                            <li>Pilih Menu “Transfer ke BCA Virtual Account”</li>
                                            <li>Input Kode Virtual Account: 39107+20+NRP<br />
                                            Contoh:<br />
                                            No. Peserta: 12345678, maka ditulis 7002012345678</li>
                                            <li>Pilih “Lanjutkan” untuk melanjutkan pembayaran</li>
                                            <li>Masukkan Respon KeyBCA Apply 1</li>
                                            <li>Ikuti instruksi untuk menyelesaikan transaksi</li>
                                        </ul>
        )
    }




    
  return (
        <div>
            <Navbar />

                <div className='main-wrapper'>
                        <div className='container'> 
                            <div className='wrapper-detail-payment'>
                                <div className='wrapper-pembayaran-right'>
                                    <img onClick={handleBack} className='button-back' src={BackSign} />
                                    
                                    {(()=>{
                                 if ( bank === "bca"){
                                    return<a onClick={handleBack} className='button-back'>BCA Transfer</a>
                                } else if ( bank === "bni"){
                                    return<a onClick={handleBack} className='button-back'>BNI Transfer</a>
                                } else if ( bank === "mandiri"){
                                    return<a onClick={handleBack} className='button-back'>Mandiri Transfer</a>
                                } else  {
                                    return<p>-</p>
                                }
                                })()
                                }
                                    
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
                                
                                    <div className='pc-left-paybefore'>
                                        <div className='kelas-pembayaran'>
                                            <div className='bagian1-kelas-pembayaran'>
                                                <p className='judul'>Lakukan Pembayaran Sebelum</p>
                                                <p className='judul-1'>{displayDeadline()}</p>
                                            </div>
                                            <div className='bagian2-kelas-pembayaran'>
                                                <ReactCountdown />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='pc-left-copyclip'>
                                        <div className='lakukan-transfer'>
                                            <p className='judul-lakukan-transfer'>Lakukan Transfer Ke</p>

                                            <div className='lakukan-transfer-bank'>
                                                <div className='opsi-1'>
                                                    <p className='font'>
                                                    {(()=>{
                                                        if (localStorage.getItem("bank") === "bca"){
                                                            return<p>BCA</p>
                                                        } else if (localStorage.getItem("bank") === "bni"){
                                                            return<p>BNI</p>
                                                        } else if (localStorage.getItem("bank") === "mandiri"){
                                                            return<p>Mandiri</p>
                                                        }
                                                   })()
                                                     }
                                                    </p>
                                                </div>
                                                <div className='opsi-2'>
                                                    
                                                    {(()=>{
                                                        if (localStorage.getItem("bank") === "bca"){
                                                            return<p className='font-1'>BCA Transfer</p>
                                                        } else if (localStorage.getItem("bank") === "bni"){
                                                            return<p className='font-1'>BNI Transfer</p>
                                                        } else if (localStorage.getItem("bank") === "mandiri"){
                                                            return<p className='font-1'>Mandiri Transfer</p>
                                                        }
                                                    })()}
                                                    
                                                    <p className='font-2'>a.n Binar Car Rental</p>
                                                </div>
                                            </div>

                                            <div className='copas-thecode'>
                                                <div className='input-title'><p>Nomor Rekening</p></div>
                                                <div>
                                                    <input className='input-rek' placeholder='543272829' onClick={copyToClipboard} />
                                                   
                                                   
                                                </div>
                                                <div className='input-title-2'><p>Total Bayar</p></div>
                                                <div className='copy-thecode'>
                                                    {
                                                        Object.entries(car).length ? (
                                                            <p onClick={copyToClipboard} className='detail-thecode'>Rp. {dotCurrency(car.total_price)}</p>
                                                        ) : null
                                                    }
                                                   <CopyToClipboardButton  />
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='pc-left-instruksi'>
                                        <div className='instruksi-pembayaran'>
                                            <div><h5 className='upside'>Instruksi Pembayaran</h5></div>
                                            
                                            <div className='cara2pembayaran'>
                                                <div  className={atm ? "cara-2":"cara-1"} onClick={handleAtm} ><h6>ATM BCA</h6></div>
                                                <div  className={mBanking ? "cara-2":"cara-1"}onClick={handleMBanking}><h6>M-BCA</h6></div>
                                                <div  className={clickBca ? "cara-2":"cara-1"}onClick={handleClickBca}><h6>BCA Klik</h6></div>
                                                <div  className={iBanking ? "cara-2":"cara-1"}onClick={handleIBanking}><h6>Internet Banking</h6></div>
                                                
                                            </div>
                                            <div className='penjelasan-pembayaran'>
                                                                {(() => {
                                                    if(atm === true){
                                                        return(
                                                            displayAtm()
                                                        )
                                                    } else if(mBanking === true){
                                                        return(
                                                        displayMbca()
                                                        )
                                                    } else if(clickBca === true){
                                                        return(
                                                        displayKlikBca()
                                                        )
                                                    } else if(iBanking === true){
                                                        return(
                                                            displayInternetBanking()
                                                        )
                                                    }
                                                })()}
                                            </div>
                                            
                                        </div>
                                    </div>

                                </div>
                                <div className='content-right'>

                                    <div className='card mb-5'>
                                        <div className='kelas-pembayarankanan'>
                                                    
                                              
                                            {
                                                confirm ? (
                                                    <>
                                                        <div className='konfirmasi-pembayaran'>
                                                            <h6>Konfirmasi Pembayaran</h6>
                                                            <ReactCountdown1 />
                                                        </div>
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
                                                ) :
                                                <>
                                                    <p  className='judul-kanan'>Klik konfirmasi pembayaran untuk mempercepat proses pengecekan</p>
                                                    <button className='btn btn-success w-100 tombol-kanan' onClick={handleConfirm}>Konfirmasi Pembayaran</button>
                                                </>
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