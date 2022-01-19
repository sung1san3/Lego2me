import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { hairState, topState, bottomState } from "../recoil/states";
import "react-image-crop/dist/ReactCrop.css";
import UploadImgButton from "./UploadImgButton";

const Nav: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between flex-wrap bg-white p-5 shadow-lg px-10">
      <div
        onClick={() => router.push("/")}
        className="flex items-center flex-shrink-0 cursor-pointer text-white mr-6 hoverAnimation"
      >
        <Image
          className="fill-current h-8 w-8 mr-2"
          width="80"
          height="80"
          src="/images/lego2me.png"
          alt="lego2me logo"
        ></Image>
        <span className="ml-3 font-bold tracking-tight text-3xl text-black font-Montserrat">
          Lego2me
        </span>
      </div>
      <div>
        {/*FIXME: */}
        <UploadImgButton />
      </div>
    </nav>
  );
};

export default Nav;
