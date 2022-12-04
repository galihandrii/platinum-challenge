import "./Detailcar.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Cardesc from "../components/Cardescription"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cardescription from "../components/Cardescription";



const Detailcar = () => {
    
    return(
        <div>
            <Navbar/>
            <div className="div-add"></div>
            <div className="searchcar-filter">
                <div className="filter-name">
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nama Mobil</Form.Label>
                             <Form.Control   className="input" type="email" placeholder=" Ketik Nama Mobil" />
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
                     <Button  className="btn-success" variant="success">Cari Mobil</Button>
                </div>
             </div>
            <Cardescription/>
            <Footer/>
        </div>
    )
}

export default Detailcar;