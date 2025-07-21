import { combineReducers } from "redux";
import homePageComponentReducer from "../../../components/HomePageComponent/HomePageComponentReducer";
import dashboardComponentReducer from "../../../components/DashboardComponent/DashboardComponentReducer";
import menuComponentReducer from "../../../components/MenuComponent/MenuComponentReducer";
import profileComponentReducer from "../../../components/ProfileComponent/ProfileComponentReducer";


const reducer = combineReducers({
    homePageComponentReducer,
    dashboardComponentReducer,
    menuComponentReducer,
    profileComponentReducer
})

export default reducer