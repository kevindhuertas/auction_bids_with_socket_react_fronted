import { useEffect } from "react";
import ShowPaintings from "./components/showPainting";
import { paintingSocket } from "./socketConnection/socket";
import Header from "./components/header";
import ActivePainting from "./components/activePainting";

function App() {
  useEffect(() => {
    if (!paintingSocket.connected) {
      paintingSocket.connect();
    }
    return () => {
      paintingSocket.disconnect();
    };
  }, []);

  return (
    <div className="p-8">
      <Header participantCode={paintingSocket.id}/>
      <h2 className="text-2xl font-bold text-blue-800">Pintura en subasta:</h2>
      <ActivePainting/>
      <h2 className="text-2xl font-bold text-blue-800">Pinturas Disponibles:</h2>
      <ShowPaintings /> 
    </div>
  );
}

export default App;
