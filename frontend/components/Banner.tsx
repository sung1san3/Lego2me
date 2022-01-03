import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex mx-10 mt-10 rounded-t-[3rem] rounded-bl-[3rem] rounded-br-[15rem] lg:rounded-br-[20rem] h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] bg-gradient-to-r from-red-600 via-red-400 to-red-200">
      <div className="p-10 flex-initial w-[70%]">
        <h1 className="mb-10 xl:mb-20 text-6xl lg:text-8xl xl:text-9xl font-Montserrat font-bold text-red-100">
          Try transforming into Lego!
        </h1>
        <p className="text-xl xl:text-2xl font-Montserrat text-red-100">
          Upload your picture! Try our AI technology to make Lego characters by
          analyzing the clothes and physical gender you are wearing.
        </p>
      </div>
      <div className="flex-auto relative">
        <div className="hover:scale-105 transition transform duration-150 ease-out">
          <Image
            src="/images/lego1.png"
            width="282px"
            height="508px"
            alt="lego1"
          ></Image>
        </div>
        <div className=" absolute top-80 left-60 overflow-visible hover:scale-105 transition transform duration-150 ease-out">
          <Image
            src="/images/lego2.png"
            width="282px"
            height="508px"
            alt="lego2"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default Banner;
