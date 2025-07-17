import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "../../pages/Home/HomePage";
import DashboardPage from "../../pages/Dashboard/DashBoardPage";
import { checkUserToken } from "../../core/services/api";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../core/services/userFetch";
import { dataUserLoggedAction } from "../DashboardComponent/DashboardComponentActions";

const HomePageComponent = () => {
  
  const userLoggedState = useSelector(
    (state) => state.homePageComponentReducer.isLogged
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      try {
        const res = await checkUserToken();
        if (res.status === 'Success') {
          const userData = await getUserProfile()
          dispatch(
                    dataUserLoggedAction({
                      userDataLogged: userData,
                    })
                  );
          navigate("/dashboard");
        } else {
          console.log("Invalid or expired token");
          localStorage.clear();
        }
      } catch (error) {
        console.error("Failed to verify access token", error);
        localStorage.clear();
      }
    };
    verifyToken();
  }, [navigate]);

  return (
    <div className="principal-container">
      {userLoggedState === false ? <HomePage /> : <DashboardPage />}
    </div>
  );
};

export default HomePageComponent;
