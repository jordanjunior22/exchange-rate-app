import '../app/globals.css'
import React, { useState, useEffect } from "react";

export default function Page() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    
      return () => clearInterval(intervalId);
    }, []);
    
  
  return (
    <p className="small-text">
      {currentTime.toLocaleString()}
    </p>
  )
}

//const NoSSR = dynamic(() => import('../components/no-ssr'), { ssr: false })
