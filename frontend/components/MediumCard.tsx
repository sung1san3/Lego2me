import React from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { hairState, topState, bottomState } from "../recoil/states";

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
    //console.log(img);
    let originUrl = img;
    // let splitUrl = originUrl.split("/");
    // let FileName = splitUrl[splitUrl.length - 1];
    // let splitFileName = FileName.split(".");
    //console.log("itemListTitle : " + itemListTitle);
    // HairStyle selct event
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
    <div className="cursor-pointer hover:scale-110 transform transition duration-300">
      <div className="relative h-32 w-32" onClick={handleClick}>
        <Image
          src={img}
          alt="image"
          layout="fill"
          className=" rounded-lg"
        ></Image>
      </div>
    </div>
  );
};

export default MediumCard;
