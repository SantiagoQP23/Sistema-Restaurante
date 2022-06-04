
import { io, Socket } from "socket.io-client";
import { useMemo, useEffect, useState } from "react";
import { ClientToServerEvents, ServerToClientEvents } from "../interfaces/sockets";


export const useSocket = (serverPath: string) => {
  
  const socket : Socket<ServerToClientEvents, ClientToServerEvents>  = useMemo(() => io(serverPath, {
    transports: ['websocket'],
    autoConnect: true
  }), [serverPath]);
  
  const [online, setOnline] = useState(false);


  useEffect(() => {

    setOnline(socket.connected);
  }, [socket]);


  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    });

  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    });

  }, [socket]);


  return {
    socket,
    online
  }

}