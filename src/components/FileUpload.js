import React, { useState } from 'react';
import axios from 'axios';
import ScrollableBox from './ScrollableBox';
import { FaUpload } from 'react-icons/fa';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [abstractText, setAbstractText] = useState('');
    const [title, setTitle] = useState('');
    const [prediction, setPrediction] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setAbstractText('');
        setTitle('');
        setPrediction([]);
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
            const cleanedAbstractText = response.data.abstract.replace(/[\r\n]+/g, ' ');
            setAbstractText(cleanedAbstractText);
            setTitle(response.data.title);
        } catch (error) {
            setUploadStatus('File upload failed');
        }
    }

    const handlePrediction = async () => {
        if (!title || !abstractText) {
            setUploadStatus('No title or abstract to predict');
            return;
        }

        setLoading(true);
        const data = {
            title: title,
            abstract_text: abstractText
        };

        try {
            const response = await axios.post('http://localhost:5003/predict', data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const predictionText = response.data.prediction
                .match(/(?<=\[).+?(?=\])/g)[0]
                .split(',')
                .map(term => term.trim().replace(/['"]/g, ''));

            setPrediction(predictionText);
        } catch (error) {
            console.error('Prediction failed:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                padding: '20px',
                boxSizing: 'border-box',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <div
                style={{
                    backgroundColor: '#b4d3b2',
                    width: '100%',
                    height: '70px', // Increased height
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: '2px',
                    borderStyle: 'solid', // Ensure border style is set
                    borderColor: '#b4d3b2',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    boxSizing: 'border-box'
                }}
            >
                <h2 style={{ color: 'black', margin: 0 }}>Personalized Medical Literature Curation</h2>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    height: '80vh',
                    flexDirection: 'row',
                    gap: '20px',
                    width: '100%',
                }}
            >
                {/* Left Box */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: '#b4d3b2',
                        width: '30%',
                        height: '100%',
                        padding: '20px',
                        borderWidth: '2px',
                        borderRadius: '10px',
                        borderColor: '#b4d3b2',
                        borderStyle: 'solid',
                        boxSizing: 'border-box',
                        position: 'relative'
                    }}
                >
                    {uploadStatus && (
                        <p style={{ fontSize: '14px', marginBottom: '10px' }}>{uploadStatus}</p>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <input className="button-27" style={{ flex: 1 }} type='file' onChange={handleFileChange} />
                        <FaUpload
                            onClick={handleUpload}
                            style={{ marginLeft: '10px', cursor: 'pointer', color: 'white', fontSize: '20px' }}
                        />
                    </div>
                    <div style={{ marginTop: '20px', position: 'absolute', bottom: '20px', width: '100%' }}>
                        <button className="button-27" onClick={handlePrediction} disabled={!abstractText}>Predict</button>
                    </div>
                </div>

                {/* Right Box */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: '#b4d3b2',
                        width: '70%',
                        height: '100%',
                        padding: '20px',
                        borderWidth: '2px',
                        borderRadius: '10px',
                        borderColor: '#b4d3b2',
                        borderStyle: 'solid',
                        boxSizing: 'border-box',
                        overflowY: 'auto',
                        position: 'relative'
                    }}
                >
                    {title && (
                        <h3 style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            color: 'black',
                        }}>
                            {title}
                        </h3>
                    )}
                    {abstractText && (
                        <div
                            style={{
                                border: '1px solid #696969',
                                padding: '10px',
                                borderRadius: '10px',
                                maxHeight: '600px', // Increased height
                                overflowY: 'auto',
                                marginBottom: '20px'
                            }}
                        >
                            <ScrollableBox title={abstractText} />
                        </div>
                    )}
                    <div style={{ position: 'absolute', bottom: '20px', width: '100%' }}>
                        {loading ? (
                            <p>Loading prediction...</p>
                        ) : (
                            prediction.length > 0 && (
                                <div style={{ marginTop: '20px' }}>
                                    {/* <h5>Predicted MESH Terms</h5> */}
                                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px' }}>
                                        {prediction.map((term, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    backgroundColor: '#69a765',
                                                    color: 'black',
                                                    padding: '10px 15px',
                                                    borderRadius: '20px',
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                }}
                                            >
                                                {term}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileUpload;
