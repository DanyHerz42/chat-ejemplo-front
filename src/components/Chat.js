import React, { useState, useEffect, useRef } from 'react';
import MensajeComp from './Mensaje'
import Socket from './Socket';
import '../App.css';

const Chat = ({ nombre, to }) => {

  //Estados iniciales: el primero almacenara los mensajes antiguos, el segundo
  //captura el nuevo mensaje y el tercero toda la conversacion
  const [msgAnt, setmsgAnt] = useState()
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  //Hook que carga los mensajes antiguos
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/mensajes/get-messages")
      const data = await response.json();
      setmsgAnt(data.mensajes)

    }
    fetchData()
  }, [])

  //hook que conecta con el socket
  useEffect(() => {
    Socket.emit("conectado", nombre)
  }, [nombre])

  //Este hook nos trae los nuevos mensajes, al final se usa socket.off() para que no quede abierto
  useEffect(() => {
    Socket.on('mensajes', mensaje => {
      setMensajes([...mensajes, mensaje])
    })
    return () => { Socket.off() }
  }, [mensajes])

  //FUncion submit que captura el mensaje
  const submit = (e) => {
    e.preventDefault();
    Socket.emit('mensaje', { from: nombre, to , mensaje })
  }




  return (
    <div>
      <h1>Yo soy: {nombre}</h1>

      <div className="chat">
        {
          msgAnt ? msgAnt.map((e, i) => <MensajeComp key={i} to={e.to} from={e.from} actualUser={nombre} message={e.message}/>) : false
        }
        {mensajes.map((e, i) => <MensajeComp key={i} to={e.to} from={e.from} actualUser={nombre} message={e.message}/>)}
      </div>
      <form onSubmit={submit}>
        <label>Escriba su msj</label>
        <textarea cols="30" rows="5" value={mensaje} onChange={e => setMensaje(e.target.value)}>


        </textarea>
        <button>Enviar</button>
      </form>

    </div>

  )
}

export default Chat
