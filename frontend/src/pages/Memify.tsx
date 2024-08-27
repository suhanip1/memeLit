import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import './Memify.css';
import image from '../assets/images/upload.png';
import audio from '../assets/images/audio-file.png';
import file from '../assets/images/file.png';
import bin from '../assets/images/bin.png';
import babyGif from '../assets/images/babyGif.avif';
import Loading from '../components/Loading';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false); 


  const handleFileUpload = (file, type) => {
    if (file) {
      setUploadedFiles((prevFiles) => ({
        ...prevFiles,
        [type]: file,
      }));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      const fileType = file.type.includes('audio') ? audio : file.type.includes('pdf') ? file : '';
      handleFileUpload(file, fileType);
    }
  };

  const handleMemeButton = () => {
    if (Object.keys(uploadedFiles).length === 0){
      alert("need files");
      return;
    }
    setLoading(true);

  };

  const handleDelete = (name) => {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = { ...prevFiles };
      Object.keys(updatedFiles).forEach((key) => {
        if (updatedFiles[key].name === name) {
          delete updatedFiles[key];
        }
      });
      return updatedFiles;
    });
  };

  return (
    <div>
      {loading ? <Loading /> : (
      <Box
        sx={{
          height: '400px',
          width: '900px',
          bgcolor: 'white',
          padding: '3rem',
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '20px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box
          sx={{
            border: isDragOver ? '3px dashed #FF6347' : '3px dashed #6495ED',
            borderRadius: '10px',
            padding: '1rem',
            marginLeft: '3rem',
            width: '400px',
            height: '360px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: isDragOver ? '#f0f8ff' : 'transparent',
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <img
            src={image}
            alt="Upload Icon"
            style={{ width: '60px', height: '60px', margin: '1.5rem' }}
          />
          <p>Drag and drop files to upload </p>
          <p style={{alignItems: 'flex-start'}}> or </p>
      
          <Button
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: '0.5rem',
              height: '50px',
              width: '150px',
              bgcolor: 'black',
              margin: '10px',
            }}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileUpload(e.target.files[0], file)}
            />
          </Button>
          <Button
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: '0.5rem',
              height: '50px',
              width: '150px',
              bgcolor: 'black',
              margin: '10px',
            }}
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload audio
            <VisuallyHiddenInput
              type="file"
              accept="audio/mp3"
              onChange={(e) => handleFileUpload(e.target.files[0], audio)}
            />
          </Button>
          <div style={{ marginTop: '20px', color: 'grey' }}>Supported files: PDF, MP3</div>
        </Box>
        <Box style={{ marginLeft: '50px', maxWidth: '400px', height: '150px'}}>
          <div style={{ maxWidth: '400px', height: '200px'}}>
            <h3 >Uploaded Files</h3>
            <ul>
              {Object.entries(uploadedFiles).map(([fileType, file], index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    marginBottom: '20px',
                  }}
                > 
                  <img
                    src={fileType}
                    alt="Upload Icon"
                    style={{ width: '35px', height: '35px' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {file.name}
                  </div>
                  <button  
                    className='delete-button'
                    onClick={() => handleDelete(file.name)}
                    style={{ 
                      display: 'flex',
                      width: '35px', 
                      height: '35px', 
                      alignItems: 'center' , 
                      justifyContent: 'center', 
                      border: 'none', 
                      background: 'transparent', 
                      cursor: 'pointer',
                      }}> 
                    <img
                      src={bin}
                      alt="Upload Icon"
                      style={{ width: '25px', height: '25px', margin: '1.5rem' }}>
                    </img> 
                  </button>
                </div>
              ))}
            </ul>
          </div>
          <div className='memify'>
          <button className="memify-button" onClick={handleMemeButton}>
            <img src={babyGif} alt="Upload Icon" />
            <h2 className='memify-text'> Memify</h2>
        </button>
          </div>
        </Box>
      </Box>
      )}
    </div>
  );
}
