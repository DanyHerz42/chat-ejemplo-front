import React, { useState, useEffect} from 'react';
import '../App.css'

const MensajeComp = ({actualUser, to, from, message}) => {
  const [boole, setboole] = useState(false);

  useEffect(() => {
    if(to === actualUser){
      setboole(true)
    }else if(to !== actualUser){
      setboole(false)
    }
    console.log(to, from)
  }, [])
  
  return (
    <div>
      <div className={boole ? "toMs" : "fromMs"} >{message}</div>
    </div>
  )
}

export default MensajeComp;
