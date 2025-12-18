import { useNavigate } from "react-router";
import Icon from "../Icon";

const Button = ({
  label,
  onClick,
  to,
  disabled,
  outline,
  small,
  iconName,
  iconPosition = "left",
  className = "",
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (disabled) return;

    if (to) {
      navigate(to);
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`
        flex items-center justify-center gap-2
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-xl
        transition
        cursor-pointer
        px-4
        ${outline ? "bg-white" : "bg-[#F43F5E]"}
        ${outline ? "border-[#F43F5E]" : "border-none"}
        ${outline ? "text-[#F43F5E]" : "text-white"}
        ${
          outline
            ? "hover:border-[#0E172A] hover:text-[#0E172A]"
            : "hover:bg-[#0E172A]"
        }
        ${small ? "text-sm py-1" : "text-md py-2"}
        ${small ? "font-light" : "font-medium"}
        ${small ? "border" : "border-2"}
        ${className}
      `}
    >
      {iconName && iconPosition === "left" && <Icon name={iconName} size={18} />}
      {label}
      {iconName && iconPosition === "right" && <Icon name={iconName} size={18} />}
    </button>
  );
};

export default Button;
