import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
const IntroBanner: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <section className="mt-72">
      <div className="flex-col-2 justify-center lg:flex md:items-center bg-red-50 px-10 pb-10">
        <div className="flex-shrink-0 relative h-[400px] w-[400px] md:h-[500px] md:w-[500px] m-auto hoverAnimation">
          <Image
            src="/images/Saly-10.png"
            layout="fill"
            objectFit="cover"
            alt="saly-10"
          ></Image>
        </div>
        <div className="p-5">
          <div className="hover:scale-105 transform transition duration-300 hover:cursor-pointer">
            <h2 className="inline-block text-gray-900 font-Montserrat font-bold text-3xl md:text-4xl xl:text-5xl">
              We thought about making
            </h2>
            <br></br>
            <h2 className="inline-block text-red-500 font-Montserrat font-bold text-3xl md:text-4xl xl:text-5xl">
              more fun use of AI
            </h2>
          </div>

          <p className="pt-10 text-md lg:text-lg font-Montserrat text-gray-900">
            Our service was created through the AI Application Development by
            Silicon Valley Engineering program organized by Headstart Silicon
            Valley. For more information, visit GitHub!
          </p>
          <button
            onClick={() => router.push("https://github.com/sung1san3/Lego2me")}
            className="flex items-center mt-6 w-28 md:w-48 h-14 px-5 md:px-12 bg-red-500 rounded-lg 
      text-sm md:text-xl font-semibold text-white hover:shadow-xl active:scale-90 transition duration-150"
          >
            Go github
          </button>
        </div>
      </div>
    </section>
  );
};

export default IntroBanner;
