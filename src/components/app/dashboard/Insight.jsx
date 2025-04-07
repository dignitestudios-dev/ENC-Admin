import React from "react";
import { cardData } from "../../../static/CardData";

export default function Insight() {
  return (
    <div className="grid grid-cols-4  gap-4">
      {cardData.map(card => (
        <div
          key={card.id}
          className={`flex items-center gap-2 p-4 bg-[#FFFFFF] rounded-[12px] shadow-sm  ${card.borderColor} ${
            card.borderColor && "border-2"
          }`}
        >
          <div className="">
            <img src={card.icon} className="w-10" alt={card.description} />
          </div>
          <div>
            <p className="text-[16px] font-[600]">{card.value}</p>
            <p className="font-[400] text-[#0A150F80] text-[13px] ">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
