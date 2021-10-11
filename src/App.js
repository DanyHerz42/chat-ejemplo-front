import React, { useState } from 'react'
import Socket from './components/Socket';
import './App.css';
import Chat from './components/Chat';

function App() {
  //se definen 3 estados iniciales: el primero guarda el nombre del usuario que enviara mensajes
  //el segundo es una simple validacion para pasar a la ventana de chat
  //el tercero se encarga de guardar para quien sera el mensaje
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);
  const [to, setTo] = useState("");
  
  const registrar = (e) => {
    e.preventDefault();
    if (nombre !== "") {
      setRegistrado(true);
    }
    if(nombre === "user1"){
      setTo("user2")
    }else{
      setTo("user1")
    }
  }

  return (
    <div className="App">
      {

        !registrado &&

        <form onSubmit={registrar}>
          <label>Introduzca su nombre</label>
          <select value={nombre} onChange={e => setNombre(e.target.value)}>
            <option value="---">---</option>
            <option value="user1">user1</option>
            <option value="user2">user2</option>
            
          </select>

          <button >Ir al chat</button>
        </form>
      }

      {

        registrado &&

        <Chat nombre={nombre} to={to} />

      }
    </div>
  );
}

export default App;
