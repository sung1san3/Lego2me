import React from "react";
import Image from "next/Image";

interface MediumCardProps {
  img: string;
  title: string;
}

const MediumCard: React.FunctionComponent<MediumCardProps> = ({
  img,
  title,
}) => {
  return (
    <div className="cursor-pointer hover:scale-105 transform transition duration-300">
      <div className="relative h-20 w-20">
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
