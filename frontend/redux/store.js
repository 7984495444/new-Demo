import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import auth from "./reducers/authReducer";
import user from "./reducers/userReducer";
import tutor from "./reducers/tutorReducer";
import subject from "./reducers/subjectReducer";
import payment from "./reducers/paymentReducer";
import notifications from "./reducers/notificationReducer";
import followUp from "./reducers/followUpReducer";
import document from "./reducers/documentReducer";
import platefrom from "./reducers/platefromEvaluationsReducer";
import sendNotification from "./reducers/sendNotificationReducer";
import dashboard from "./reducers/dashbordReducer";
import lessonSpace from "./reducers/lessonSpaceReducer";
import schoolLevel from "./reducers/schoolLevelReducer";
import allStudents from "./reducers/allStudentReducer";

// reducer list
const rootReducer = combineReducers({
  auth,
  user,
  tutor,
  subject,
  payment,
  notifications,
  followUp,
  document,
  platefrom,
  sendNotification,
  dashboard,
  lessonSpace,
  schoolLevel,
  allStudents,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
