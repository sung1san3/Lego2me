import Image from "next/image";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-5 shadow-lg px-10">
      <div className="flex items-center flex-shrink-0 text-white mr-6 hover:scale-105 transistion duration-150">
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
      <button className="flex items-center w-48 h-14 px-10 border border-red-500 rounded-lg text-xl font-semibold text-red-500 hover:shadow-xl active:scale-90 transition duration-150">
        get Started
      </button>
    </nav>
  );
};

export default Nav;
