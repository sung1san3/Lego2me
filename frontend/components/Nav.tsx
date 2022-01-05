import Image from "next/image";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between flex-wrap bg-white p-5 shadow-lg px-10">
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
      {/* width48 h14 text-xl px-10 */}
      <button
        className="flex items-center  w-28 md:w-48 h-14 px-5 md:px-11 bg-red-500 rounded-lg 
      text-sm md:text-xl font-semibold text-white hover:shadow-xl active:scale-90 transition duration-150"
      >
        get Started
      </button>
    </nav>
  );
};

export default Nav;
