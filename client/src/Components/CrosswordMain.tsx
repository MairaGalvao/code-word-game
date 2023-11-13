import React, { useState, useEffect } from 'react';
import Crossword from './Crossword';

interface Game {
  id: string;
  name: string;
}

function CrosswordMain() {
  const [receivedData, setReceivedData] = useState<Game | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataCrossword = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/crossword', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data, '<<<<')

          setReceivedData(data);
        } else {
          setError('Error: Unable to fetch data'); 
        }
      } catch (error) {
        setError(`Error: ${error}`); 
      }
    };

    fetchDataCrossword();
  }, []);

  useEffect(() => {
    if (receivedData) {
      console.log(receivedData, 'my data in front');
    }
    if (error) {
      console.error(error);
    }
  }, [receivedData, error]);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <Crossword  />
      )}
    </div>
  );
}

export default CrosswordMain;
