import React from "react";

export default function Stores() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 absolute bg-black bottom-[42px] left-0 w-full ">
      <span className="font-rubik font-semibold">többre is kíváncsi vagy?</span>
      <div className="flex flex-row items-center justify-center gap-5">
        <a href="https://apps.apple.com/app/idYOUR_APP_ID" target="_blank">
          <img
            className="w-[100px] h-[30px]"
            src="/icons/apple.svg"
            alt="Download on the App Store"
          />
        </a>

        <a
          href="https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME"
          target="_blank"
        >
          <img
            className="w-[100px] h-auto"
            src="/icons/google.png"
            alt="Get it on Google Play"
          />
        </a>
      </div>
    </div>
  );
}
