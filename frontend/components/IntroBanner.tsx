import React from "react";
import Image from "next/image";
const IntroBanner = () => {
  return (
    <section className="mt-72">
      <div className="flex bg-red-50 p-5 md:p-10">
        <div className="w-[50%] bg-slate-100">
          <div className="w-[100%] h-[100%]">
            <Image
              src="/images/Saly-10.png"
              width="676px"
              height="676px"
              alt="saly-10"
            ></Image>
          </div>
        </div>
        <div className="flex-auto bg-blue-100">
          <h2 className="inline-block">
            We thought about making more fun use of AI
          </h2>
          <p>
            Our service was created through the AI Application Development by
            Silicon Valley Engineering program organized by Headstart Silicon
            Valley. For more information, visit GitHub!
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroBanner;
