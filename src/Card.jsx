import React from "react";
import plane from "./icons8-flight-50.png"
function Card({ cardData, origin, destination }) {
  return (
    <div className="flex flex-col gap-3 justify-center items-center p-3 border rounded-lg">
      <div>
        <img className="" src={plane} alt="logo" srcset="" /> {/* logo */}
      </div>
      <div className="flex flex-col gap-2">
        {/* flight name and origin */}
        <h2 className="text-3xl">{cardData.partner_program}</h2>
        <div>
          <h3 className="text-lg">
            {origin}&rarr;{destination}
          </h3>
          <p>2024-07-09 - 2024-10-07</p>
        </div>
      </div>
      <div>
        {cardData.min_business_miles === null ? (
          <h1 className="text-3xl">N/A</h1>
        ) : (
          <h1 className="text-3xl">
            {cardData.min_business_miles}
            <span className="text-base"> +${cardData.min_business_tax}</span>
          </h1>
        )}
        <p>Min Business Miles</p>
      </div>
      <div>
        {cardData.min_economy_miles === null ? (
          <h1 className="text-3xl">N/A</h1>
        ) : (
          <h1 className="text-3xl">
            {cardData.min_economy_miles}
            <span className="text-base"> +${cardData.min_economy_tax}</span>
          </h1>
        )}
        <p>Min Economy Miles</p>
      </div>
      <div>
        {cardData.min_first_miles === null ? (
          <h1 className="text-3xl">N/A</h1>
        ) : (
          <h1 className="text-3xl">
            {cardData.min_first_miles}
            <span className="text-base">+ ${cardData.min_first_tax}</span>
          </h1>
        )}
        <p>Min First Miles</p>
      </div>
      
    </div>
  );
}

export default Card;
