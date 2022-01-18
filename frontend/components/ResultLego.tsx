import React from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { useRecoilValue } from "recoil";
import { hairState, topState, bottomState } from "../recoil/states";
import { saveAs } from "file-saver";

const ResultLego: React.FunctionComponent = () => {
  // 구독하는 아톰의 값만 반환한다.
  const hairStateValue = useRecoilValue(hairState);
  const topStateValue = useRecoilValue(topState);
  const bottomStateValue = useRecoilValue(bottomState);

  const onDownload = () => {
    element: HTMLImageElement; /* Defining element */
    const img = document.querySelector("#resultimg");
    if (img !== null) {
      let imgSrc = (img as HTMLImageElement).src;
      saveAs(imgSrc, "image.png");
    } else {
      window.alert("Error! try upload again");
    }
  };
  return (
    <div>
      <h1 className="text-center text-Montserrat font-bold text-xl lg:text-2xl">
        It&apos;s your <em className="text-red-500 not-italic">character!</em>
      </h1>
      <div className="w-fit m-auto relative">
        <div>
          <Image
            id="resultimg"
            src="/items/lego_default.png"
            width="377px"
            height="377px"
            alt="result lego character"
          ></Image>
        </div>
        <div className=" absolute w-[377px] h-[377px] top-0 left-0">
          <Image
            id="hat"
            src={hairStateValue}
            width="377px"
            height="377px"
            alt="result lego HairStyle"
          ></Image>
        </div>
        <div className=" absolute w-[377px] h-[377px] top-0 left-0">
          <Image
            id="hat"
            src={topStateValue}
            width="377px"
            height="377px"
            alt="result lego HairStyle"
          ></Image>
        </div>
        <div className=" absolute w-[377px] h-[377px] top-0 left-0">
          <Image
            id="hat"
            src={bottomStateValue}
            width="377px"
            height="377px"
            alt="result lego HairStyle"
          ></Image>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={onDownload}
          variant="contained"
          color="error"
          component="span"
          className="mt-4"
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default ResultLego;
