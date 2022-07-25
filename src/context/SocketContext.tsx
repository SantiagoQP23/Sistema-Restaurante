import React, { createContext, FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { useAppSelector } from "../hooks/useRedux";
import { useSocket } from "../hooks/useSocket";
import { selectAuth } from "../reducers";

interface ISocket{
  socket: Socket | null;
  online: boolean | undefined;
 
}

interface Props {
  children: React.ReactNode;
}

export const SocketContext = createContext({} as ISocket);



export const SocketProvider:FC<Props> = ({children}) => {

  const { socket, online, conectarSocket, desconectarSocket} = useSocket('http://192.168.1.45:5000');


  const {usuario, logged} = useAppSelector(selectAuth);

  useEffect(() => {

    //console.log(usuario?.online)
     
    if(!logged){

      console.log("Desconectando socket");
      desconectarSocket();
    }

  }, [logged, desconectarSocket]);
  

  useEffect(() => {
    
    if(logged){
      console.log("conectando socket");
      conectarSocket();

    }  

  }, [logged, conectarSocket])  



  return (

    <SocketContext.Provider value={{socket, online}}>
      {children}
    </ SocketContext.Provider>

  )
}