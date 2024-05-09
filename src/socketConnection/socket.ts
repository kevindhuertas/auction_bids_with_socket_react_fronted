import { useState } from "react";
import io, { Socket } from "socket.io-client";

const socket = io("http://localhost:2000");

function getPaintings(): Socket {
  return socket.emit("get-paintings");
}

function sendNewBid(id: any, price: any): Socket {
  const newBidData = { id: id, price: price, client_id: socket.id };
  return socket.emit("new-bid", newBidData);
}

function getPainting(id: number): Socket {
  return socket.emit("get-painting", { id });
}

function checkAutions(): Socket {
  return socket.emit("active-auction");
}

export {
  socket as paintingSocket,
  getPaintings,
  sendNewBid,
  getPainting,
  checkAutions,
};
