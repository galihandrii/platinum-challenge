import "./Detailpesanan.css"


const Detailpesanan = () => {
    return (
    <div className="detail-pesanan">
        <div><h4>Detail Pesanan</h4></div>
        <div className="detail-pesanan-bottom">
            <div>
                <h6>Nama/Tipe Mobil</h6>
                <p>Innova</p>
            </div>
            <div>
            <h6>Kategori</h6>
                <p>6-8 orang</p>
            </div>
            <div>
            <h6>Tanggal Mulai Sewa</h6>
                <p>2 Juni 2022</p>
            </div>
            <div>
            <h6>Tanggal Akhir Sewa</h6>
                <p>6 Juni 2022</p>
            </div>
        </div>
    </div>
    )
}

export default Detailpesanan;