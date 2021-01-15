import StatusCard from "components/StatusCard";
import { ITEM_TYPES } from "global";
import React, { useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import Campaign from "screens/Campaign";
import update from "immutability-helper";

import "./styles.scss";

export interface Item {
  id: number;
  text: string;
}

interface StatusContainerState {
  cards: Item[];
}

const StatusContainer = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "Write a cool JS library",
    },
    {
      id: 2,
      text: "Make it generic enough",
    },
    {
      id: 3,
      text: "Write README",
    },
    {
      id: 4,
      text: "Create some examples",
    },
    {
      id: 5,
      text:
        "Spam in Twitter and IRC to promote it (note that this element is taller than the others)",
    },
    {
      id: 6,
      text: "???",
    },
    {
      id: 7,
      text: "PROFIT",
    },
  ]);

  const [, drop] = useDrop({ accept: ITEM_TYPES.CARD });
  // useEffect(()=>{
  //   console.log(drop)
  // },[])

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [cards]
  );

  const renderCard = (card: { id: number; text: string }, index: number) => {
    return (
      <StatusCard
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
      />
    );
  };

  return (
    <div className="StatusContainer" ref={drop}>
      {cards.map((card, i) => renderCard(card, i))}
    </div>
  );
};

export default StatusContainer;
