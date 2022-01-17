import { useEffect } from "react";
import Image from "next/image";

const Banner: React.FunctionComponent = () => {
  return (
    <div className="flex mx-10 mt-10 rounded-t-[3rem] rounded-bl-[3rem] rounded-br-[15rem] lg:rounded-br-[20rem] h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] bg-gradient-to-r from-red-600 via-red-400 to-red-200">
      <div className="p-10 flex-auto">
        <h1 className="mb-5 xl:mb-20 text-2xl md:text-5xl lg:text-7xl xl:text-8xl font-Montserrat font-bold text-white">
          Try transforming into Lego!
        </h1>
        <p className="text-xs md:text-sm lg:text-xl xl:text-2xl font-Montserrat text-white">
          Upload your picture! Try our AI technology to make Lego characters by
          analyzing the clothes and physical gender you are wearing.
        </p>
      </div>
      <div className="flex w-[60%] m-10 mt-10 ml-10 relative">
        <div className="hidden xl:inline-block flex-shrink-0 hoverAnimation">
          <Image
            src="/images/lego2.png"
            width="238px"
            height="438px"
            alt="lego1"
          ></Image>
        </div>
        <div className="hidden xl:inline flex-shrink-0 mt-36 overflow-visible hoverAnimation">
          <Image
            src="/images/lego1.png"
            width="238px"
            height="438px "
            alt="lego2"
          ></Image>
        </div>
        <div className=" min-w-[150px] xl:hidden">
          <Image
            src="/images/lego2.png"
            width="238px"
            height="438px"
            alt="lego1"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default Banner;
