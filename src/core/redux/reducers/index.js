import { combineReducers } from "redux";
import homePageComponentReducer from "../../../components/HomePageComponent/HomePageComponentReducer";
import dashboardComponentReducer from "../../../components/DashboardComponent/DashboardComponentReducer";


const reducer = combineReducers({
    homePageComponentReducer,
    dashboardComponentReducer
})

export default reducer