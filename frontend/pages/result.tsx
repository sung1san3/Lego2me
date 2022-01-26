import type { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import ItemSelect from "../components/ItemSelect";
import { useRecoilState } from "recoil";
import { hairState, topState, bottomState } from "../recoil/states";
import ResultLego from "../components/ResultLego";
import { useRouter } from "next/router";
import { styled, SxProps, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";

const Result: NextPage = () => {
  const [hair, setHairState] = useRecoilState(hairState);
  const [top, setTopState] = useRecoilState(topState);
  const [bottom, setBottomState] = useRecoilState(bottomState);

  console.log(`result ${top}`);
  console.log(`result ${bottom}`);

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

  //TODO: TaskId 받아오기
  const router = useRouter();
  console.log(`taskId : ${router.query.taskId}`);

  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //modal style
  const sxBox: SxProps<Theme> = (theme: Theme) => {
    return {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
  };

  // 별점
  const [value, setValue] = React.useState<number | null>(2);

  // rating 서버 전송 함수
  const handleRatingSubmit = () => {
    const taskQuery = router.query.taskId;
    console.log(value);
    axios
      .post("http://35.225.137.222:80/api/scores/", {
        id: taskQuery,
        score: value,
      })
      .then((res) => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <article className="w-full md:w-[50%] p-3" id="ResultLego">
          <ResultLego />
          <div className="flex justify-center">
            <div>
              <Button
                component="span"
                variant="contained"
                color="error"
                onClick={handleOpen}
                className="font-Montserrat"
              >
                Open modal
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={sxBox} className="rounded-xl">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    className="font-Montserrat font-bold"
                  >
                    Rating & Review
                  </Typography>
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  >
                    <Rating
                      className="animate-bounce mt-4"
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Box>
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 1 }}
                    className="font-Montserrat"
                  >
                    Please leave a rating and hit the submit button!
                  </Typography>
                  <button
                    className="mt-4 bg-transparent rounded-full hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent font-Montserrat"
                    type="button"
                    onClick={handleRatingSubmit}
                  >
                    Submit
                  </button>
                </Box>
              </Modal>
            </div>
          </div>
        </article>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default Result;
