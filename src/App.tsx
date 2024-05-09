import { useEffect, useState } from "react";
import ShowPaintings from "./components/showPainting";
import {
  getPainting,
  paintingSocket,
  sendNewBid,
} from "./socketConnection/socket";
import Header from "./components/header";
import ActivePainting from "./components/activePainting";
import PaintingCard from "./components/paintingCard";
import { Painting } from "./models/Painting";
import { Socket } from "socket.io-client";

function App() {
  const [activeAuction, setActiveAuction] = useState<boolean>(false);
  const [activePaintingAuction, setActivePaintingAuction] = useState<
    Painting | undefined
  >();
  const [seconds, setSeconds] = useState(6);
  const [socket, setSocket] = useState<Socket | undefined>();
  const [clientId, setClientId] = useState<string | undefined>();

  const handleGetActiveAuction = (payload: {
    active: boolean;
    painting_id: any;
    timer: any;
  }) => {
    console.log("ActiveAuction", payload);
    if (payload.active) {
      setActiveAuction(payload.active);

      if (seconds != payload.timer) {
        setSeconds(payload.timer);
        if (payload.painting_id) {
          const socket = getPainting(payload.painting_id);
          socket.on("get-painting", (payload) => {
            setActivePaintingAuction(payload.painting);
          });
        }
      }
    } else {
      setActiveAuction(payload.active);
      setActivePaintingAuction(undefined);
    }
  };

  const new_oferta = (painting_id: any, price: any) => {
    console.log("oferta:", price, "Pintura Id", painting_id);
    const sendBit = sendNewBid(painting_id, price);
  };

  useEffect(() => {
    paintingSocket.connect();
    setSocket(paintingSocket);
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("active-auction", handleGetActiveAuction);
    const handleConnect = () => {
      console.log("Conectado", socket, "ID:", socket.id);
      setClientId(socket.id);
    };
    socket.on("connect", handleConnect);
  }, [socket]);

  return (
    <div className="p-8">
      <Header participantCode={clientId} />
      <h2 className="text-2xl font-bold text-blue-800">
        Pintura en subasta:
        {activeAuction && (
          <span className="font-bold text-red-500">
            Tiempo Restante: {seconds}
          </span>
        )}
      </h2>
      <div className="w-full flex items-center justify-center">
        {activePaintingAuction ? (
          <PaintingCard ofertar={new_oferta} painting={activePaintingAuction} />
        ) : (
          <ActivePainting />
        )}
      </div>
      <h2 className="text-2xl font-bold text-blue-800">
        Pinturas Disponibles:
      </h2>
      <ShowPaintings />
    </div>
  );
}

export default App;
