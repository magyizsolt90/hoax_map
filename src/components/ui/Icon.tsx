import { ImageProps } from "../../types";

export default function Icon(props: ImageProps) {
  const baseClassName = "w-[14px] h-[14px]";
  return (
    <img
      className={`${baseClassName} ${props.className}`}
      src={props.src}
      alt={props.alt}
    />
  );
}
