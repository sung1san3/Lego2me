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
    {
      img: "/items/top/red_shirts.png",
      title: "top4",
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
    {
      img: "/items/bottom/black_pants.png",
      title: "bottom4",
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
