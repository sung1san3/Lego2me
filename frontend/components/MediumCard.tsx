import React from "react";
import Image from "next/image";

interface MediumCardProps {
  img: string;
  title: string;
}

const MediumCard: React.FunctionComponent<MediumCardProps> = ({
  img,
  title,
}) => {
  return (
    <div className="cursor-pointer hover:scale-110 transform transition duration-300">
      <div className="relative h-32 w-32">
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
