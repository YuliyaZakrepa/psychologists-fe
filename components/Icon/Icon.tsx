interface IconProps {
  name: string;
  size?: number;
  className?: string;
}
export default function Icon({ name, size, className }: IconProps) {
  return (
    <svg width={size} height={size} aria-hidden="true" className={className}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}
