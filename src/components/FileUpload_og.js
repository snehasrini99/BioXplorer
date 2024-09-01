import React, { useState } from 'react';
import axios from 'axios';
import ScrollableBox from './ScrollableBox';
const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [abstractText, setAbstractText] = useState('');
    const [title, setTitle] = useState('');
    const [prediction, setPrediction] = useState(null);

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
            console.log("response.data", response.data)
            const cleanedAbstractText = response.data.abstract.replace(/[\r\n]+/g, ' ');
            setAbstractText(cleanedAbstractText)
            setTitle(response.data.title)
            await handlePrediction(response.data.title, cleanedAbstractText);

        } catch (error) {
            setUploadStatus('File upload failed');
        };
    }

    const handlePrediction = async (title, abstract) => {
        const data = {
            title: title,
            abstract_text: abstract
        };

        console.log("inside Prediction")

        try {
            const response = await axios.post('http://localhost:5003/predict', data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setPrediction(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Prediction failed:', error);
        }
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
            {prediction && <div>
                <h3>Prediction Results</h3>
                <pre>{JSON.stringify(prediction, null, 2)}</pre>
            </div>}
        </div>
    </>);

}

export default FileUpload;


