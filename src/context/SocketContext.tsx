import React, { createContext, FC } from "react";
import { Socket } from "socket.io-client";
import { useSocket } from "../hooks/useSocket";

interface ISocket{
  socket: Socket;
  online: boolean;
 
}

interface Props {
  children: React.ReactNode;
}

export const SocketContext = createContext({} as ISocket);



export const SocketProvider:FC<Props> = ({children}) => {

  const { socket, online } = useSocket('http://192.168.1.45:5000');

  return (

    <SocketContext.Provider value={{socket, online}}>
      {children}
    </ SocketContext.Provider>

  )
}