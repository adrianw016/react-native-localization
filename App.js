import React, { useState, useEffect } from 'react';
import Translate from './Translate2'

export default function App() {
  const [state, setstate] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setstate(true)
    }, 200);

  }, [])

  return ( 
    state && <Translate/>
  );
}


