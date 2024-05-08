import io, { Socket } from "socket.io-client";

const socket = io("http://localhost:2000")

function getPaintings(): Socket {
    console.log("get-paintings");
    socket.emit("get-paintings")
    return socket;
}

function sendNewBid(): Socket {
    console.log("new-bid");
    const newBidData = { id: 1, price: 2000000014, client_id: socket.id };
    return socket.emit("new-bid", newBidData);
}

function getPainting(id: number): Socket {
    console.log("get-painting");
    return socket.emit("get-painting", { id });
}

export { socket as paintingSocket, getPaintings, sendNewBid, getPainting };
