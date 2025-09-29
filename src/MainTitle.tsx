export type MainTitleProps = {
  src: string;
  x: number;
  y: number;
  alt?: string;
  width?: number | string;
  height?: number | string;
  zIndex?: number;
  className?: string;
};

export default function MainTitle({
  src,
  x,
  y,
  alt,
  width,
  height,
  zIndex = 1000,
  className,
}: MainTitleProps) {
  const style = {
    position: "absolute" as const,
    left: x,
    top: y,
    zIndex,
  };

  return (
    <img
      src={src}
      alt={alt ?? ""}
      style={style}
      className={className}
      width={width}
      height={height}
    />
  );
}
