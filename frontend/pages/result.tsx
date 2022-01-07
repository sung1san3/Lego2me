import React from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Image from "next/image";
import { Button } from "@mui/material";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

const result = () => {
  const onDownload = () => {
    element: HTMLImageElement; /* Defining element */
    const img = document.querySelector("#resultimg");
    if (img != null) {
      let imgSrc = (img as HTMLImageElement).src;
      saveAs(imgSrc, "image.png");
    } else {
      window.alert("Error! try upload again");
    }
  };

  return (
    <div>
      <Nav></Nav>
      <section className="flex-col-2 p-10 md:flex">
        <article className="w-full md:w-[50%] flex-sh bg-lime-300 p-3">
          <div className="bg-red-100">
            <h1>Hair</h1>
            <div>horizontal</div>
          </div>
          <div className="bg-red-100">
            <h1>Top</h1>
            <div>horizontal</div>
          </div>
          <div className="bg-red-100">
            <h1>Bottom</h1>
            <div>horizontal</div>
          </div>
        </article>

        <article className="w-full md:w-[50%] bg-blue-200 p-3">
          <div>
            <h1 className="text-center">It&apos;s your character!</h1>
            <div className="w-fit m-auto">
              <Image
                id="resultimg"
                src="/images/lego_result.png"
                width="377px"
                height="377px"
                alt="result lego character"
              ></Image>
            </div>
            <div className="flex">
              <div className="flex-initial w-64">
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
              <div className="flex-initial w-32">2</div>
              <div className="flex-initial w-32">3</div>
              <div className="flex-initial w-32">4</div>
            </div>
          </div>
        </article>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default result;
