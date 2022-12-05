import "./Filter.css"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Filter = (props) => {



    return(
        <div  className="searchcar-filter">
                <div className="filter-name">
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nama Mobil</Form.Label>
                             <Form.Control onChange={props.ishandleChangeName} className="input" type="email" placeholder=" Ketik Nama Mobil" />
                     </Form.Group>
                 </div>
                 <div className="filter-name">
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Kategori</Form.Label>
                            <Form.Select  onChange={props.ishandleCategory} className="input" aria-label="Default select example">
                                <option>Masukan Kapasitas</option>
                                <option value="small">2-4 Orang</option>
                                 <option value="Medium">4-6 Orang</option>
                                 <option value="large">6-8 Orang</option>
                             </Form.Select>
                     </Form.Group>
                
                </div>
                 <div className="filter-name">
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Harga</Form.Label>
                            <Form.Select onChange={props.ishandlePrice} className="input" aria-label="Default select example">
                                 <option>Masukan Harga</option>
                                 <option value="50000 75000 250000"> ‹ Rp.400.000 </option>
                                 <option value="400000 50000">Rp.400.000 - Rp.600.000</option>
                                 <option value=""> › Rp.600.000</option>
                             </Form.Select>
                     </Form.Group>
                
                </div>
                 <div className="filter-name">
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Status</Form.Label>
                            <Form.Select onChange={props.ishandleStatus} className="input" aria-label="Default select example">
                            <option>Status</option>
                                 <option value = "false">Disewa</option>
                                 <option value= "true">Tidak disewa</option>
                             </Form.Select>
                     </Form.Group>
                
                </div>
                <div>
                     <Button onClick={props.ishandleFilter} className="btn-success" variant="success">Cari Mobil</Button>
                </div>
             </div>
    )
}


export default Filter;