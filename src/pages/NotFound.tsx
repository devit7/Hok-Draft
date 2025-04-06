import React from "react";
import "../styles/NotFound.css"; // You'll need to create this CSS file

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="error-icon">404</div>
                <h1>Halaman Tidak Ditemukan</h1>
                <p>Ngapain Banget? Halaman ini tidak ada. 😜</p>
                <button className="back-button" onClick={() => window.location.href = '/'}>
                    Kembali ke halaman utama
                </button>
            </div>
        </div>
    );
};

export default NotFound;
