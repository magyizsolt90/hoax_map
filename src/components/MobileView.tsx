import React from "react";
import Icon from "./ui/Icon";

export default function MobileView() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <Icon
        className="absolute top-[30px] left-1/2 transform -translate-x-1/2 w-[110px] h-[110px] z-50 cursor-pointer fill-white"
        src="/icons/hoax.svg"
        alt="Hoax"
      />
      <span className="font-rubik text-slate-200 font-thin text-sm">
        HOAX coffee
      </span>
      <span className="font-rubik text-slate-200 font-black text-xl">
        SPECIALTY LOKÁTOR
      </span>
      <br />
      <br />
      <div className="bg-white mb-3 p-2 rounded-full flex items-center justify-center w-[180px] h-[50px]">
        <a
          href="https://apps.apple.com/app/hoax-coffee/id6443516503"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="w-[100px] h-auto"
            src="/icons/btn_ios.svg"
            alt="Download on the App Store"
          />
        </a>
      </div>

      <div className="bg-white p-2 rounded-full flex items-center justify-center w-[180px] h-[50px]">
        <a
          href="https://play.google.com/store/apps/details?id=com.hoax.hoax"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="w-[100px] h-auto"
            src="/icons/btn_android.svg"
            alt="Get it on Google Play"
          />
        </a>
      </div>
    </div>
  );
}
