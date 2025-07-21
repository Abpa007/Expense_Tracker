import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAuthValidation = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      if (!user || !user.token) return; // No user, skip validation

      try {
        await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/validate`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        // ✅ Token is valid, do nothing
      } catch (error) {
        console.error(
          "Token validation failed:",
          error?.response?.data || error.message
        );
        dispatch(logout());
        navigate("/login");
      }
    };

    validateToken();
  }, [user, dispatch, navigate]);
};

export default useAuthValidation;
