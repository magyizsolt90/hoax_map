import React from "react";

export default function MobileView() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="bg-white p-2 rounded-full flex items-center justify-center w-[140px] h-[50px]">
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

      <div className="bg-white p-2 rounded-full flex items-center justify-center w-[140px] h-[50px]">
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
