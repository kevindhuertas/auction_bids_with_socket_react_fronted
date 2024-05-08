import React, { useEffect, useState } from 'react';
import { getPaintings } from '../socketConnection/socket';
import PaintingCard from './paintingCard';

const ShowPaintings: React.FC = () => {
    const [paintings, setPaintings] = useState<any[]>([]);

    useEffect(() => {
        console.log("Inicia")
        const socket = getPaintings();

        // Escuchar el evento 'get-paintings' del socket y actualizar el estado con las pinturas recibidas
        const handleGetPaintings = (payload: any) => {
            
            console.log("Handle",payload.bidding_model        )
            setPaintings(payload.bidding_model            );
        };

        // Suscribirse al evento 'get-paintings'
        socket.on('get-paintings', handleGetPaintings);

        // Limpiar el listener cuando el componente se desmonte
        return () => {
            socket.off('get-paintings', handleGetPaintings);
        };
    }, []); 

    return (
        <div className="grid grid-cols-4 gap-4">
            {paintings.map((painting) => (
                <PaintingCard key={painting.id} painting={painting} />
            ))}
        </div>
    );
};

export default ShowPaintings;
