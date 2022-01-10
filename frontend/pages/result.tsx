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
      img: "/images/lego2me.png",
      title: "Outdoor getaways",
    },
    {
      img: "/images/lego2me.png",
      title: "Unique stays",
    },
    {
      img: "/images/lego2me.png",
      title: "Entire homes",
    },
    {
      img: "/images/lego2me.png",
      title: "Pet allowed",
    },
    {
      img: "/images/lego2me.png",
      title: "Outdoor getaways",
    },
    {
      img: "/images/lego2me.png",
      title: "Unique stays",
    },
    {
      img: "/images/lego2me.png",
      title: "Entire homes",
    },
    {
      img: "/images/lego2me.png",
      title: "Pet allowed",
    },
    {
      img: "/images/lego2me.png",
      title: "Outdoor getaways",
    },
    {
      img: "/images/lego2me.png",
      title: "Unique stays",
    },
    {
      img: "/images/lego2me.png",
      title: "Entire homes",
    },
    {
      img: "/images/lego2me.png",
      title: "Pet allowed",
    },
  ];

  return (
    <div>
      <Nav></Nav>
      <section className="flex-col-2 p-10 md:flex">
        <article className="w-full md:w-[50%] flex-sh bg-lime-300 p-3">
          {/* item select */}
          <ItemSelect
            cardsData={hairStyle}
            itemListTitle={"HairStyle"}
          ></ItemSelect>
          <ItemSelect cardsData={hairStyle} itemListTitle={"Top"}></ItemSelect>
          <ItemSelect
            cardsData={hairStyle}
            itemListTitle={"Bottom"}
          ></ItemSelect>
        </article>

        <article className="w-full md:w-[50%] bg-blue-200 p-3">
          <div>
            <h1 className="text-center text-Montserrat font-bold text-xl lg:text-2xl">
              It&apos;s your{" "}
              <em className="text-red-500 not-italic">character!</em>
            </h1>
            <div className="w-fit m-auto">
              {/* api 결괏값으로 이후 이미지 태그를 생성해줄 예정 */}
              <Image
                id="resultimg"
                src="/images/lego_result.png"
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
