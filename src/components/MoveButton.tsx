export default function MoveButton() {
  return (
    <div className="flex flex-col items-center justify-center z-50 p-4 rounded-lg shadow-lg absolute bottom-3 right-3">
      <span className="text-white font-bold font-rubik">
        specialty kávézód van?
      </span>
      <a href="https://www.hoaxcoffee.com/partners">
        <button className="bg-white w-[180px]  px-4 py-2 mt-2 rounded-[40px] font-rubik font-medium">
          itt regisztrálj
        </button>
      </a>
    </div>
  );
}
