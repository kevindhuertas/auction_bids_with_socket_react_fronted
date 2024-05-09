import React, { useEffect, useState } from "react";
import { getPaintings, sendNewBid } from "../socketConnection/socket";
import PaintingCard from "./paintingCard";

const ShowPaintings: React.FC = () => {
  const [paintings, setPaintings] = useState<any[]>([]);

  const new_oferta = (painting_id: any, price: any) => {
    console.log("oferta:", price, "Pintura Id", painting_id);
    const sendBit = sendNewBid(painting_id, price);
  };

  useEffect(() => {
    const socket = getPaintings();
    const handleGetPaintings = (payload: any) => {
      console.log("Handle", payload.bidding_model);
      setPaintings(payload.bidding_model);
    };
    socket.on("get-paintings", handleGetPaintings);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {paintings.map((painting) => (
        <PaintingCard
          key={painting.id}
          ofertar={new_oferta}
          painting={painting}
        />
      ))}
    </div>
  );
};

export default ShowPaintings;
