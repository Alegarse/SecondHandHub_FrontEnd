import { combineReducers } from "redux";
import homePageComponentReducer from "../../../components/HomePageComponent/HomePageComponentReducer";
import dashboardComponentReducer from "../../../components/DashboardComponent/DashboardComponentReducer";
import menuComponentReducer from "../../../components/MenuComponent/MenuComponentReducer";


const reducer = combineReducers({
    homePageComponentReducer,
    dashboardComponentReducer,
    menuComponentReducer
})

export default reducer