import React from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Image from "next/image";
import { Button } from "@mui/material";
import { saveAs } from "file-saver";
import MediumCard from "../components/MediumCard";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";
import ItemSelect from "../components/ItemSelect";

const result = () => {
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

  const hairStyle = [
    {
      img: "/items/hair/hair1_black.png",
      title: "hair1",
    },
    {
      img: "/items/hair/hair2_black.png",
      title: "hair2",
    },
    {
      img: "/items/hair/hair3_black.png",
      title: "hair3",
    },
  ];
  const topStyle = [
    {
      img: "/items/top/top1_orange.png",
      title: "top1",
    },
    {
      img: "/items/top/top2_green.png",
      title: "top2",
    },
    {
      img: "/items/top/top3_blue.png",
      title: "top3",
    },
  ];
  const bottomStyle = [
    {
      img: "/items/bottom/btm1_blue.png",
      title: "bottom1",
    },
    {
      img: "/items/bottom/btm2_red.png",
      title: "bottom2",
    },
    {
      img: "/items/bottom/btm3_orange.png",
      title: "bottom3",
    },
  ];

  return (
    <div>
      <Nav></Nav>
      <section className="flex-col-2 p-10 md:flex">
        <article className="w-full md:w-[50%] flex-sh  p-3">
          {/* item select */}
          <ItemSelect
            cardsData={hairStyle}
            itemListTitle={"HairStyle"}
          ></ItemSelect>
          <ItemSelect cardsData={topStyle} itemListTitle={"Top"}></ItemSelect>
          <ItemSelect
            cardsData={bottomStyle}
            itemListTitle={"Bottom"}
          ></ItemSelect>
        </article>

        <article className="w-full md:w-[50%] p-3">
          <div>
            <h1 className="text-center text-Montserrat font-bold text-xl lg:text-2xl">
              It&apos;s your{" "}
              <em className="text-red-500 not-italic">character!</em>
            </h1>
            <div className="w-fit m-auto">
              {/* api 결괏값으로 이후 이미지 태그를 생성해줄 예정 */}
              <Image
                id="resultimg"
                src="/items/lego_default.png"
                width="377px"
                height="377px"
                alt="result lego character"
              ></Image>
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
        </article>
      </section>
      <Footer></Footer>
    </div>
  );
};
// ssr

export default result;
