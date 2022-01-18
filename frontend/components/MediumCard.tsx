import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { hairState, topState, bottomState } from "../recoil/states";
import { Skeleton } from "antd";

interface MediumCardProps {
  img: string;
  title: string;
  itemListTitle: string;
}

const MediumCard: React.FunctionComponent<MediumCardProps> = ({
  img,
  title,
  itemListTitle,
}) => {
  const [hair, setHairState] = useRecoilState(hairState);
  const [top, setTopState] = useRecoilState(topState);
  const [bottom, setBottomState] = useRecoilState(bottomState);

  const handleClick = () => {
    if (itemListTitle === "HairStyle") {
      console.log(img);
      if (hair === img) {
        setHairState("/items/item_default.png");
      } else {
        setHairState(img);
      }
      // Top select Event
    } else if (itemListTitle === "Top") {
      if (top === img) {
        setTopState("/items/item_default.png");
        console.log(top);
      } else {
        setTopState(img);
      }
      // Bottom select Event
    } else if (itemListTitle === "Bottom") {
      if (bottom === img) {
        setBottomState("/items/item_default.png");
        console.log(bottom);
      } else {
        setBottomState(img);
      }
      // error
    } else {
      console.log("item select err");
    }
  };

  return (
    <div className="cursor-pointer bg-white rounded-xl hover:shadow-xl active:scale-90 transition duration-150">
      <div className="relative h-32 w-32" onClick={handleClick}>
        <Image
          src={img}
          alt="image"
          layout="fill"
          className=" rounded-lg"
          quality={10}
          blurDataURL={img}
          placeholder="blur"
        />
      </div>
    </div>
  );
};

export default MediumCard;
