// common
import Header from "./@common/Header";
import SideBar from "./@common/SideBar";
import PaginationComponent from "./@common/PaginationComponent";
import NotificationBar from "./@common/NotificationBar";
import Layout from "./@common/Layout";
import { showTimeHandal } from "../utils/TimeShowFuncations";
import { show1HourTime } from "../utils/TimeShowFuncations";
import { show24HourTime } from "../utils/TimeShowFuncations";
import DashboardInShowWeekCalender from "./@common/DashboardInShowWeekCalender";
import ShowAllAlertInDashboard from "./@common/ShowAllAlertInDashboard";
import ShowSendComfirmationAlert from "./@common/alert/ShowSendComfirmationAlert";
import SessionModificationRequestAlert from "./@common/alert/SessionModificationRequestAlert";
import CreateSessionAlert from "./@common/alert/CreateSessionAlert";
import EvaluationReportAlert from "./@common/alert/EvaluationReportAlert";
import SessionCanceledAlert from "./@common/alert/SessionCanceledAlert";
import CompletedSessionShowAlert from "./@common/alert/CompletedSessionShowAlert";
import UnconfirmedRequestShowAlert from "./@common/alert/UnconfirmedRequestShowAlert";
import CloseIconInModal from "./@common/CloseIconInModal";
import SearchInput from "./@common/inputs/SearchInput";
import StudentListForDemo from "./@common/StudentListForDemo";
import ShowAllTutorList from "./@common/ShowAllTutorList";
import MatchedStudentScore from "./@common/MatchedStudentScore";
import LabelWithInput from "./@common/inputs/LabelWithInput";
import SelectInput from "./@common/inputs/SelectInput";
import ShowImage from "./@common/ShowImage";
// modal
import NewSessionModal from "./modal/session/NewSessionModal";
import AddPaymentCardModal from "./modal/AddPaymentCardModal";
import CompleteSessionModal from "./modal/session/CompleteSessionModal";
import NotificationSettingsModal from "./modal/NotificationSettingsModal";
import RefuseModal from "./modal/RefuseModal";
import TwinningModal from "./modal/TwinningModal";
import NotificationModifiedSession from "./modal/session/modifySession/NotificationModifiedSession";
import DeclineTheMeetingModification from "./modal/session/modifySession/DeclineTheMeetingModification";
import SessionCancelledDetailsModal from "./modal/session/deleteSession/SessionCancelledDetailsModal";
import CertificateModal from "./modal/CertificateModal";
import ShowDeclineTheMeetingModificationDetais from "./modal/session/modifySession/showDetails/ShowDeclineTheMeetingModificationDetais";
import StudentAndParetCreateSessionModal from "./modal/session/StudentAndParetCreateSessionModal";
import CreateSessionRequest from "./modal/session/createSession/CreateSessionRequest";
import CreateSessionRefuseRequest from "./modal/session/createSession/CreateSessionRefuseRequest";
import ShowCreateSessionAcceptRequestDetails from "./modal/session/createSession/showDetails/ShowCreateSessionAcceptRequestDetails";
import ShowCreateSessionRefuseRequestDetails from "./modal/session/createSession/showDetails/ShowCreateSessionRefuseRequestDetails";
import ShowModificationAcceptRequestDetails from "./modal/session/modifySession/showDetails/ShowModificationAcceptRequestDetails";
import DeleteSessionModal from "./modal/session/deleteSession/DeleteSessionModal";

// dashboard
import TutorCard from "./dashboard/TutorCard";
import StudentStatistics from "./dashboard/StudentStatistics";
import StudentToDoList from "./dashboard/StudentToDoList";
import TutorToDoList from "./dashboard/TutorToDoList";
import ContactSS from "./dashboard/ContactSS";
import UserCard from "./dashboard/UserCard";
import SuggestedStudentList from "./dashboard/SuggestedStudentList";
import AlertCard from "./AlertCard";
import ToDoCard from "./ToDoCard";
import AdminDashboard from "./dashboard/users/AdminDashboard";
import ParentDashboard from "./dashboard/users/ParentDashboard";
import StudentDashboard from "./dashboard/users/StudentDashboard";
import TutorDashboard from "./dashboard/users/TutorDashboard";

// setting page all components
import EditInformationsTab from "./@settings/pages/UserInformasitons";
import NotificationTab from "./@settings/pages/Notifications";
import PaymentTab from "./@settings/pages/Payment";
import TermsAndConditionsTab from "./@settings/pages/TermsAndConditions";
import PrivacyPolicyTab from "./@settings/pages/PolicyPolicy";
import AntiDiscriminationPoliciesTab from "./@settings/pages/AntiDiscriminationPolicies";
import DocumentsTab from "./@settings/pages/Documents";
import RateAndSchedule from "./@settings/RateAndSchedule";
import MyParents from "./@settings/MyParents";
import MyStudents from "./@settings/MyStudents";
import ProfileImageUpdate from "./@settings/ProfileImageUpdate";
import DeletePaymentCardModal from "./modal/DeletePaymentCardModal";
import ModifyAndCloseBtn from "./@settings/ModifyAndCloseBtn";

// document
import DocumentCard from "./document/DocumentCard";
import DocumentUploadBlock from "./document/DocumentUploadBlock";
import { CompleteSessionDownloadDocHandal } from "./document/CompleteSessionDownloadDoc";

// loading page
import FollowUpReportLoading from "./loadingPage/FollowUpReportLoading";
import FollowUpReportListLoading from "./loadingPage/FollowUpReportListLoading";

// evlucation components
import EvaluationCard from "./evaluation/EvaluationCard";
import FollowUpListTable from "./evaluation/FollowUpListTable";
import FollowUpRapportsCardList from "./evaluation/FollowUpRapportsCardList";
import FollowUpRapportDetails from "./evaluation/FollowUpRapportDetails";
import ShowRepportForStudent from "./evaluation/ShowRepportForStudent";
import RatingReceivedDetails from "./evaluation/RatingReceivedDetails";
import RatingReceivedCardList from "./evaluation/RatingReceivedCardList";
import ShowReportForTutor from "./evaluation/ShowReportForTutor";
import ParentRatingsGiven from "./evaluation/ParentRatingsGiven";
import ShowNoEvlucationForMessage from "./evaluation/ShowNoEvlucationForMessage";
import ParentEvaluationDashboard from "./evaluation/users/parent/ParentEvaluationDashboard";
import StudentEvaluationDashboard from "./evaluation/users/student/StudentEvaluationDashboard";
import TutorEvaluationDashboard from "./evaluation/users/tutor/TutorEvaluationDashboard";

// my student
import MyStudentList from "./myStudent/MyStudentList";
import SessionShowCalender from "./myStudent/SessionShowCalender";
import SessionHistoryList from "./myStudent/SessionHistoryList";
import ShowSessionDetails from "./myStudent/ShowSessionDetails";
import ParentStudentDashboard from "./myStudent/users/parent/ParentStudentDashboard";
import TutorStudentDashboard from "./myStudent/users/tutor/TutorStudentDashboard";
import AdminStudentDashboard from "./myStudent/users/admin/AdminStudentDashboard";

// parent
import MyStudentCard from "./myStudent/MyStudentCard";

// calender
import CalendarSlider from "./calender/CalendarSlider";
import CalendarSyncFooter from "./calender/CalendarSyncFooter";
import LectureCard from "./calender/LectureCard";
import LectureCardForParents from "./calender/LectureCardForParents";
import LectureCardForStudent from "./calender/LectureCardForStudent";
import TodayLectureCard from "./calender/TodayLectureCard";
import TutorCalendarDashboard from "./calender/TutorCalendarDashboard";
import CompleteSessionDocuments from "./calender/CompleteSessionDocuments";
import ParentCalendar from "./calender/users/ParentCalendar";
import StudentCalendar from "./calender/users/StudentCalendar";
import TutorCalendar from "./calender/users/TutorCalendar";

// messages
import VideoPlayer from "./messages/VideoPlayer";
import ImageViewer from "./messages/ImageViewer";
import VideoAttachmentComponent from "./messages/VideoAttachmentComponent";
import ShowAllTutorMessageList from "./messages/ShowAllTutorMessageList";

// profile
import AdminProfile from "./profile/AdminProfile";
import TutorProfile from "./profile/TutorProfile";
import StudentProfile from "./profile/StudentProfile";
import StudentBagicDetails from "./profile/studentProfile/StudentBagicDetails";
import MySchoolDetails from "./profile/studentProfile/MySchoolDetails";
import MyNeedsDetails from "./profile/studentProfile/MyNeedsDetails";
import DifficultiesDetails from "./profile/studentProfile/DifficultiesDetails";
import AtSchoolDetails from "./profile/studentProfile/AtSchoolDetails";
import MyPersonalityDetails from "./profile/studentProfile/MyPersonalityDetails";
import InterestsDeatils from "./profile/studentProfile/InterestsDeatils";
import AvailabilityDetails from "./profile/studentProfile/AvailabilityDetails";
import TutorDetails from "./profile/tutorProfile/TutorDetails";
import WitchUserDetails from "./profile/tutorProfile/WitchUserDetails";
import TutorAvailabilityDetails from "./profile/tutorProfile/AvailabilityDetails";
import LevelAndSubjectDeatils from "./profile/tutorProfile/LevelAndSubjectDeatils";
import MasterylevelDeatils from "./profile/tutorProfile/MasterylevelDeatils";
import PersonalityDetail from "./profile/tutorProfile/PersonalityDetail";
import InterestsDetails from "./profile/tutorProfile/InterestsDetails";
import EducationDetails from "./profile/tutorProfile/EducationDetails";
import ExperienceProfessional from "./profile/tutorProfile/ExperienceProfessional";
import TutorExperienceDetails from "./profile/tutorProfile/TutorExperienceDetails";
import StudentExperienceDetails from "./profile/tutorProfile/StudentExperienceDetails";

export {
  // common
  Header,
  SideBar,
  PaginationComponent,
  NotificationBar,
  Layout,
  showTimeHandal,
  show1HourTime,
  show24HourTime,
  DashboardInShowWeekCalender,
  ShowAllAlertInDashboard,
  ShowSendComfirmationAlert,
  SessionModificationRequestAlert,
  SessionCanceledAlert,
  EvaluationReportAlert,
  CreateSessionAlert,
  CompletedSessionShowAlert,
  UnconfirmedRequestShowAlert,
  CloseIconInModal,
  SearchInput,
  StudentListForDemo,
  ShowAllTutorList,
  MatchedStudentScore,
  LabelWithInput,
  SelectInput,
  ShowImage,
  // modal
  NewSessionModal,
  AddPaymentCardModal,
  CompleteSessionModal,
  NotificationSettingsModal,
  RefuseModal,
  TwinningModal,
  NotificationModifiedSession,
  DeclineTheMeetingModification,
  SessionCancelledDetailsModal,
  CertificateModal,
  ShowDeclineTheMeetingModificationDetais,
  StudentAndParetCreateSessionModal,
  CreateSessionRequest,
  CreateSessionRefuseRequest,
  ShowCreateSessionAcceptRequestDetails,
  ShowCreateSessionRefuseRequestDetails,
  ShowModificationAcceptRequestDetails,

  //dashboard
  StudentStatistics,
  TutorCard,
  StudentToDoList,
  TutorToDoList,
  ContactSS,
  UserCard,
  SuggestedStudentList,
  TutorDashboard,
  StudentDashboard,
  ParentDashboard,
  AdminDashboard,

  //
  AlertCard,
  ToDoCard,

  // setting page all components
  EditInformationsTab,
  NotificationTab,
  PaymentTab,
  TermsAndConditionsTab,
  PrivacyPolicyTab,
  AntiDiscriminationPoliciesTab,
  DocumentsTab,
  RateAndSchedule,
  MyParents,
  MyStudents,
  ProfileImageUpdate,
  DeleteSessionModal,
  DeletePaymentCardModal,
  ModifyAndCloseBtn,

  // document
  DocumentCard,
  CompleteSessionDownloadDocHandal,
  DocumentUploadBlock,

  // loading page
  FollowUpReportLoading,
  FollowUpReportListLoading,

  // evlucation components
  EvaluationCard,
  FollowUpListTable,
  FollowUpRapportsCardList,
  FollowUpRapportDetails,
  ShowRepportForStudent,
  RatingReceivedDetails,
  RatingReceivedCardList,
  ShowReportForTutor,
  ParentRatingsGiven,
  ShowNoEvlucationForMessage,
  TutorEvaluationDashboard,
  StudentEvaluationDashboard,
  ParentEvaluationDashboard,

  // my student
  MyStudentList,
  SessionShowCalender,
  SessionHistoryList,
  ShowSessionDetails,
  MyStudentCard,
  ParentStudentDashboard,
  AdminStudentDashboard,
  TutorStudentDashboard,

  // calender
  CalendarSlider,
  CalendarSyncFooter,
  LectureCard,
  LectureCardForParents,
  LectureCardForStudent,
  TodayLectureCard,
  TutorCalendarDashboard,
  CompleteSessionDocuments,
  TutorCalendar,
  StudentCalendar,
  ParentCalendar,

  // message
  VideoPlayer,
  VideoAttachmentComponent,
  ShowAllTutorMessageList,

  // profile
  AdminProfile,
  TutorProfile,
  StudentProfile,
  StudentBagicDetails,
  MySchoolDetails,
  MyNeedsDetails,
  DifficultiesDetails,
  AtSchoolDetails,
  MyPersonalityDetails,
  InterestsDeatils,
  AvailabilityDetails,
  TutorDetails,
  WitchUserDetails,
  TutorAvailabilityDetails,
  LevelAndSubjectDeatils,
  MasterylevelDeatils,
  PersonalityDetail,
  InterestsDetails,
  EducationDetails,
  ExperienceProfessional,
  TutorExperienceDetails,
  StudentExperienceDetails,
};
