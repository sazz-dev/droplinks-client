const Icon = ({ name, size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    className={className}
    aria-hidden="true"
  >
    <use href={`/sprite.svg#icon-${name}`} />
  </svg>
);

export default Icon;
