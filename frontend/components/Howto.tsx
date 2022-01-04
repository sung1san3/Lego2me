import React from "react";

const Howto = () => {
  return (
    <div className="mx-10 mt-[10rem]">
      <div className="flex">
        <div className="w-1/4 bg-slate-100">
          <h2 className="mt-5 ml-5 lg:mt-10 lg:ml-10 text-xl lg:text-4xl font-bold font-Montserrat">
            How to start?
          </h2>
          <p>
            Our service is simple. Prepare a good full body picture. You can't
            hold something or take a picture of your body covered.
          </p>
        </div>
        <div className="w-1/4 bg-slate-200">
          <p>01</p>
          <h3>Upload a Picture</h3>
        </div>
        <div className="w-1/4 bg-slate-300">
          <p>02</p>
          <h3>customize your characters</h3>
        </div>
        <div className="w-1/4 bg-slate-400">
          <p>03</p>
          <h3>Save your characters and share them</h3>
        </div>
      </div>
    </div>
  );
};

export default Howto;
