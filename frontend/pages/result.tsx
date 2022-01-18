import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import ItemSelect from "../components/ItemSelect";
import { useRecoilState } from "recoil";
import { hairState, topState, bottomState } from "../recoil/states";
import ResultLego from "../components/ResultLego";

const Result: NextPage = () => {
  const [hair, setHairState] = useRecoilState(hairState);
  const [top, setTopState] = useRecoilState(topState);
  const [bottom, setBottomState] = useRecoilState(bottomState);

  console.log(`reesult ${top}`);
  console.log(`reesult ${bottom}`);

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
      img: "/legoItem/Top/Black_Shirts.png",
      title: "Black_Shirts",
    },
    {
      img: "/legoItem/Top/Blue_Shirts.png",
      title: "Blue_Shirts",
    },
    {
      img: "/legoItem/Top/Brown_Shirts.png",
      title: "Brown_Shirts",
    },
    {
      img: "/legoItem/Top/Green_Shirts.png",
      title: "Green_Shirts",
    },
    {
      img: "/legoItem/Top/Grey_Shirts.png",
      title: "Grey_Shirts",
    },
    {
      img: "/legoItem/Top/Orange_Shirts.png",
      title: "Orange_Shirts",
    },
    {
      img: "/legoItem/Top/Purple_Shirts.png",
      title: "Purple_Shirts",
    },
    {
      img: "/legoItem/Top/Red_Shirts.png",
      title: "Red_Shirts",
    },
    {
      img: "/legoItem/Top/White_Shirts.png",
      title: "White_Shirts",
    },
    {
      img: "/legoItem/Top/Yellow_Shirts.png",
      title: "Yellow_Shirts",
    },
  ];
  const bottomStyle = [
    {
      img: "/legoItem/Bottom/Black_Pants.png",
      title: "Black_Pants",
    },
    {
      img: "/legoItem/Bottom/Blue_Pants.png",
      title: "Blue_Pants",
    },
    {
      img: "/legoItem/Bottom/Brown_Pants.png",
      title: "Brown_Pants",
    },
    {
      img: "/legoItem/Bottom/Green_Pants.png",
      title: "Green_Pants",
    },
    {
      img: "/legoItem/Bottom/Grey_Pants.png",
      title: "Grey_Pants",
    },
    {
      img: "/legoItem/Bottom/Orange_Pants.png",
      title: "Orange_Pants",
    },
    {
      img: "/legoItem/Bottom/Purple_Pants.png",
      title: "Purple_Pants",
    },
    {
      img: "/legoItem/Bottom/Red_Pants.png",
      title: "Red_Pants",
    },
    {
      img: "/legoItem/Bottom/White_Pants.png",
      title: "White_Pants",
    },
    {
      img: "/legoItem/Bottom/Yellow_Pants.png",
      title: "Yellow_Pants",
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
            //setState={setHair}
          ></ItemSelect>
          <ItemSelect
            cardsData={topStyle}
            itemListTitle={"Top"}
            //setState={setTop}
          ></ItemSelect>
          <ItemSelect
            cardsData={bottomStyle}
            itemListTitle={"Bottom"}
            //setState={setBottom}
          ></ItemSelect>
        </article>
        <article className="w-full md:w-[50%] p-3">
          <ResultLego />
        </article>
      </section>
      <Footer></Footer>
    </div>
  );
};
// ssr

export default Result;
