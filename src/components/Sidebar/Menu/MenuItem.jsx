import { NavLink } from "react-router";
import Icon from "../../Shared/Icon";

const MenuItem = ({ label, address, iconName }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center rounded-2xl px-4 py-2 transform cursor-pointer transition-colors duration-400 ${
          isActive
            ? " bg-[#F43F5E] text-[#ffffff]"
            : "text-[#606060] hover:text-[#F43F5E]"
        }`
      }
    >
      {iconName && <Icon name={iconName} className="w-5 h-5" />}
      <span className={`mx-2 text-md ${iconName ? "" : "ml-0"}`}>{label}</span>
    </NavLink>
  );
};

export default MenuItem;
