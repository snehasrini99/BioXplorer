import React, { useState } from 'react';
import axios from 'axios';
import ScrollableBox from './ScrollableBox';
const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [abstractText,setAbstractText] = useState('');
    const [title,setTitle] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('No file selected');
            return;
        }


        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:5001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setUploadStatus('File uploaded successfully');
            setSelectedFile(null); 
            console.log("response.data",response.data)
            const cleanedAbstractText = response.data.abstract.replace(/[\r\n]+/g, ' ');
            setAbstractText(cleanedAbstractText)
            setTitle(response.data.title)
            
        } catch (error) {
            setUploadStatus('File upload failed');
        };
    }

    return (<>
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50%',
                flexDirection: 'column',
                backgroundColor: ' #b4d3b2', // Fill the box with green color
                width: '60%', // Set the width to be smaller
                padding: '50px', // Add some padding inside the box
                borderRadius: '10px', // Optional: add rounded corners
                boxSizing: 'border-box' // Ensure padding is included in the width
            }}
        >
            <h2 style={{ color: 'white', marginBottom: '80px' }}>File Upload</h2>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>

                <input className="button-27" style={{ width: '80%' }} type='file' onChange={handleFileChange} />
                <div style={{ paddingRight: '10px' }} />
                <button className="button-27" onClick={handleUpload}>Upload</button>
            </div>
            {uploadStatus && <p>{uploadStatus}</p>}
            <ScrollableBox title={abstractText} />
        </div>
    </>);

}

export default FileUpload;


