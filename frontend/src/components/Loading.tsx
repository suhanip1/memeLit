import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useState, useEffect, useRef } from 'react';
import pic1 from '../assets/memes/loading/funny.jpg';
import pic2 from '../assets/memes/loading/easy.avif';
import pic3 from "../assets/memes/loading/using-bells-on-twitter-how-does-he-do-that-photo-u1.jpeg";
import pic4 from "../assets/memes/loading/83.webp";
import pic5 from "../assets/memes/loading/pic5.jpg";
import pic6 from "../assets/memes/loading/pic6.webp";
import pic7 from "../assets/memes/loading/pic7.jpeg";
import pic8 from "../assets/memes/loading/pic8.webp";
import pic9 from "../assets/memes/loading/pic9.jpg";

const Loading = () =>  {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [list] =
   useState([pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9]);
  const [currentItem, setCurrentItem] = useState(list[0]);
  const [fadeIn, setFadeIn] = useState(true);

  const progressRef = useRef(() => {});

  useEffect(() => {
    progressRef.current = () => {
      if (progress >= 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  }, [progress]);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(progressTimer);
    };
  }, []);

  useEffect(() => {
    const listTimer = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * list.length);
        setCurrentItem(list[randomIndex]);
        setFadeIn(true);
      }, 300); 
    }, 7000);

    return () => {
      clearInterval(listTimer);
    };
  }, [list]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '500px',
        bgcolor: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}
    >
      <h3 style={{ margin: 0, fontSize: '2rem', color: '#333', fontFamily: 'monospace', marginBottom: '20px'}}>Loading...</h3>
      <LinearProgress
        variant="buffer"
        value={progress}
        valueBuffer={buffer}
        sx={{
          width: '80%',
          maxWidth: '600px',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'black',
          },
          '& .MuiLinearProgress-barBuffer': {
            backgroundColor: 'black',
          },
          marginBottom: '1rem'
        }}
      />
      
      <img
        src={currentItem}
        alt="Loading"
        style={{
          width: '80%',
          maxWidth: '400px',
          height: 'auto',
          maxHeight: '200px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          opacity: fadeIn ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          marginTop: '1rem'
        }}
      />
    </Box>
  );
}
export default Loading;