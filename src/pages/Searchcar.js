import Header from "../components/Header"
import Footer from "../components/Footer"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./Searchcar.css"
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Searchcar = () => {
    const [carData,setCardata] = useState([]);
    const [fName,setFname] = useState("");

    useEffect(()=>{
        axios
        .get("https://bootcamp-rent-cars.herokuapp.com/customer/v2/car")
        .then((res)=>{
            //console.log(res);
            setCardata(res.data.cars);
        })
        .catch((err)=> console.log(err.message))
    },[]);
    //console.log(carData);

    const handleChangeName = (e) => {
        setFname(e.target.value);
    };
    //console.log(fName);
    const handleFilter = (e) => {
        axios
        .get(`https://bootcamp-rent-cars.herokuapp.com/customer/v2/car?name=${fName}`)
        .then((res)=>{
            //console.log(res);
            setCardata(res.data.cars);
        })
        .catch((err)=> console.log(err.message))
    }

    return (
        <div>
            <Header/>
            <div className="searchcar-filter">
                <div className="filter-name">
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nama Mobil</Form.Label>
                             <Form.Control  onChange={handleChangeName}  className="input" type="email" placeholder=" Ketik Nama Mobil" />
                     </Form.Group>
                 </div>
                 <div className="filter-name">
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Kategori</Form.Label>
                            <Form.Select  className="input" aria-label="Default select example">
                                <option>Masukan Kategori</option>
                                 <option value="1">One</option>
                                 <option value="2">Two</option>
                                 <option value="3">Three</option>
                             </Form.Select>
                     </Form.Group>
                
                </div>
                 <div className="filter-name">
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Harga</Form.Label>
                            <Form.Select className="input" aria-label="Default select example">
                                 <option>Masukan Harga</option>
                                 <option value="1">One</option>
                                 <option value="2">Two</option>
                                 <option value="3">Three</option>
                             </Form.Select>
                     </Form.Group>
                
                </div>
                 <div className="filter-name">
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Status</Form.Label>
                            <Form.Select className="input" aria-label="Default select example">
                                <option>Disewa</option>
                                 <option value="1">One</option>
                                 <option value="2">Two</option>
                             </Form.Select>
                     </Form.Group>
                
                </div>
                <div>
                     <Button onClick={handleFilter} className="btn-success" variant="success">Cari Mobil</Button>
                </div>
             </div>
             <div className="card-wraper">
             {
                !!carData.length ? carData.map(function(item){
                    return (
                        <div className="card-car">
                            <div className="img-car"><img src={item.image}/></div>
                            <div className="item-con">
                                 <h1>{item.name}</h1>
                                <p>{item.price}/hari</p>
                            </div>
                            <div>
                                    <Link to={`/Detailmobil/${item.id}`}>
                                    <button className="btn-detail">Pilih Mobil</button>
                                    </Link>
                            </div>
                        </div>
                    )
                }) : null
             }
             </div>
            <Footer/>
        </div>
    )
}
export default Searchcar;