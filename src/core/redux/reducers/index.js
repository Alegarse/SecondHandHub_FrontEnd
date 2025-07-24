import { combineReducers } from "redux";
import homePageComponentReducer from "../../../components/HomePageComponent/HomePageComponentReducer";
import dashboardComponentReducer from "../../../components/DashboardComponent/DashboardComponentReducer";
import menuComponentReducer from "../../../components/MenuComponent/MenuComponentReducer";
import profileComponentReducer from "../../../components/ProfileComponent/ProfileComponentReducer";
import productComponentReducer from "../../../components/ProductComponent/ProductComponentReducer";


const reducer = combineReducers({
    homePageComponentReducer,
    dashboardComponentReducer,
    menuComponentReducer,
    profileComponentReducer,
    productComponentReducer,
})

export default reducer