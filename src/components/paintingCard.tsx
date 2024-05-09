import React, { useState } from "react";
import { Painting } from "../models/Painting";

const PaintingCard: React.FC<{
  painting: Painting;
  ofertar: (painting_id: any, price: any) => void;
}> = ({ painting, ofertar }) => {
  const [offerAmount, setOfferAmount] = useState<number>(0);

  const handleOffer = () => {
    if (offerAmount > painting.price) {
      ofertar(painting.id, offerAmount);
    } else {
      alert(
        "La cantidad de la oferta debe ser mayor que el precio de la pintura."
      );
    }
  };

  return (
    <div className="max-w-sm rounded-md overflow-hidden bg-slate-100 /">
      <img
        className="w-full object-cover h-40"
        src={painting.image}
        alt={painting.title}
      />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{painting.title}</div>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Painter:</span> {painting.painter}
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Year:</span> {painting.year}
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Price:</span> $
          {painting.price.toLocaleString()}
        </p>
        <p className="text-gray-700 text-base">
          <span
            className={
              painting.isSold ? " text-red-500 font-semibold" : "font-semibold"
            }
          >
            Status:
          </span>{" "}
          <span
            className={painting.isSold ? " text-red-500 font-semibold" : ""}
          >
            {painting.isSold ? "Sold" : "Available"}
          </span>
        </p>
      </div>
      <div className="px-6  gap-1 flex flex-nowrap">
        <input
          type="number"
          disabled={painting.isSold}
          placeholder="Oferta"
          value={offerAmount || painting.price}
          onChange={(e) => setOfferAmount(parseFloat(e.target.value))}
          className="border border-gray-300 px-3 py-1  w-full rounded-md"
        />
        <button
          onClick={handleOffer}
          disabled={painting.isSold}
          className={
            painting.isSold
              ? "bg-slate-600 text-white font-bold  px-3 rounded "
              : "bg-sky-600 hover:bg-sky-800 text-white font-bold  px-3 rounded "
          }
        >
          Ofertar
        </button>
      </div>

      {painting.lastBidID !== null && (
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            Last Bid ID: {painting.lastBidID}
          </span>
        </div>
      )}
    </div>
  );
};

export default PaintingCard;
