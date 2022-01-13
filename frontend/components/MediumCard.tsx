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
  const handleClick = () => {
    console.log(img);
    let originUrl = img;
    let splitUrl = originUrl.split("/");
    let FileName = splitUrl[splitUrl.length - 1];
    //console.log(FileName);
    let splitFileName = FileName.split(".");
    console.log(splitFileName[0]);
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
