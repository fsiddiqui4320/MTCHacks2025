export type MainTitleProps = {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  zIndex?: number;
  className?: string;
};

export default function MainTitle({
  src,
  alt,
  width,
  height,
  zIndex = 1000,
  className,
}: MainTitleProps) {
  return (
    <img
      src={src}
      alt={alt ?? ""}
      style={{ zIndex }}
      className={`main-title ${className ?? ""}`.trim()}
      width={width}
      height={height}
    />
  );
}
