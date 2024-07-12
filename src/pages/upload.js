// pages/annual.js

import React from "react";
import FileUpload from "../components/FileUpload"

const AnnualReport = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column', // Added to align items vertically
            }}
        >
     
            <FileUpload />
        </div>
    );
};

export default AnnualReport;
