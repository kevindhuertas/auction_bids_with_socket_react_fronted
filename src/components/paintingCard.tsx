import React from "react";
import { Painting } from "../models/Painting";

const PaintingCard: React.FC<{ painting: Painting }> = ({ painting }) => {
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
          <span className="font-semibold">Status:</span>{" "}
          {painting.isSold ? "Sold" : "Available"}
        </p>
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
