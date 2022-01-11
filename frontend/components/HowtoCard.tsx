import React from "react";
import Image from "next/image";
const Howto = () => {
  return (
    <section className="m-10 pt-10 md:pt-20 lg:pt-32">
      <div className="flex flex-wrap justify-between space-x-3 space-y-32 xl:space-y-0">
        <div className="w-[300px] h-fit ">
          <h2 className="text-4xl mb-10 font-bold font-Montserrat text-red-500 hoverAnimation hover:cursor-pointer">
            How to start?
          </h2>
          <p className="text-lg text-gray-900 font-Montserrat leading-relaxed">
            Our service is simple. Prepare a good full body picture. You
            can&apos;t hold something or take a picture of your body covered.
          </p>
        </div>

        <div className="relative w-[300px] h-[400px] p-10 bg-white rounded-3xl shadow-lg hoverAnimation">
          <span className="text-3xl font-extrabold fonr-Montserrat text-red-500 border-b-4 border-solid border-red-500 pb-1">
            01
          </span>
          <h3 className="mt-10 text-gray-900 text-4xl font-Montserrat font-bold">
            Upload a Picture.
          </h3>
          <div className="absolute w-[100%] h-[100%] top-[180px] left-[100px]">
            <Image
              src="/images/Saly-7.png"
              width="349px"
              height="334px"
              alt="Saly7"
            ></Image>
          </div>
        </div>

        <div className="relative w-[300px] h-[400px] px-10 pt-40  bg-white rounded-3xl shadow-lg hoverAnimation">
          <div className="absolute w-[100%] h-[100%] left-[100px] top-[-60px]">
            <Image
              src="/images/Saly-38.png"
              width="324px"
              height="294px"
              alt="Saly38"
            ></Image>
          </div>
          <span className="text-3xl font-extrabold fonr-Montserrat text-red-500 border-b-4 border-solid border-red-500 pb-1">
            02
          </span>
          <h3 className="mt-10 text-gray-900 text-4xl font-Montserrat font-bold">
            customize your characters.
          </h3>
        </div>

        <div className="relative w-[300px] h-[400px] pt-10 pl-10 bg-white rounded-3xl shadow-lg hoverAnimation">
          <span className="text-3xl font-extrabold fonr-Montserrat text-red-500 border-b-4 border-solid border-red-500 pb-1">
            03
          </span>
          <h3 className="mt-10 text-gray-900 text-4xl font-Montserrat font-bold">
            Save your characters and share them.
          </h3>
          <div className="absolute w-[100%] h-[100%] top-[220px] left-[120px]">
            <Image
              src="/images/Saly-14.png"
              width="247px"
              height="439px"
              alt="Saly1"
            ></Image>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Howto;
