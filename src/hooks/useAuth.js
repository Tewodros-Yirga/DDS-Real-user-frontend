import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isPilot = false;
  let isAdmin = false;
  let status = "Customer";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;

    isAdmin = roles.includes("Admin");
    isPilot = roles.includes("Pilot");

    if (isAdmin) status = "Admin";
    if (isPilot) status = "Pilot";

    return { username, roles, status, isPilot, isAdmin };
  }

  return { username: "", roles: [], isPilot, isAdmin, status };
};
export default useAuth;
