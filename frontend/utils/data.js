import {
  Profile2User,
  Message2,
  Home,
  MoneyRecive,
  MessageEdit,
  Copy,
  Like1,
  Calendar,
  User,
  Setting2,
  UserSquare,
  UserEdit,
  Notification,
  Book1,
  Lock1,
  Flag,
  Logout,
  Document,
  EmojiHappy,
  Diagram,
} from "iconsax-react";
import { t } from "i18next";

// tutor sidebar menu list with icon and navigations url
export const tuterSidebarMenu = [
  {
    id: 1,
    name: "Sidebar.Dashboard",
    icon: <Home />,
    nav: "/dashboard",
    asUrl: "/dashboard",
  },
  {
    id: 2,
    name: "Sidebar.Calendar",
    icon: <Calendar />,
    nav: "/calendar",
    asUrl: "/calendar",
  },
  {
    id: 3,
    name: "Sidebar.Students",
    icon: <Profile2User />,
    nav: "/student",
    asUrl: "/student",
  },
  {
    id: 4,
    name: "Sidebar.Messaging",
    icon: <Message2 />,
    nav: "/messages",
    asUrl: "/messages",
  },
  // {
  //   id: 5,
  //   name: "Sidebar.Payments",
  //   icon: <MoneyRecive />,
  //   nav: "/payment",
  //   asUrl: "/payment",
  // },
  {
    id: 6,
    name: "Sidebar.Ratings",
    icon: <Like1 />,
    nav: "/evaluations",
    asUrl: "/evaluations",
  },
];

// admin sidebar menu list with icon and navigations url
export const adminSidebarMenu = [
  {
    id: 1,
    name: "Sidebar.Dashboard",
    icon: <Home />,
    nav: "/dashboard",
    asUrl: "/dashboard",
  },
  {
    id: 2,
    name: "Sidebar.User",
    icon: <UserSquare />,
    nav: "/tuteursRices",
    option: [
      {
        id: 1,
        name: "Sidebar.TutorRices",
        nav: "/tutors",
        asUrl: "/tutors",
      },
      {
        id: 2,
        name: "Sidebar.Parents",
        nav: "/parents",
        asUrl: "/parents",
      },
      {
        id: 3,
        name: "Sidebar.Élèves",
        nav: "/student",
        asUrl: "/student",
      },
    ],
  },
  {
    id: 3,
    name: "Sidebar.Messaging",
    icon: <Message2 />,
    nav: "/messages",
    asUrl: "/messages",
  },
  {
    id: 4,
    name: "Sidebar.Twinning",
    icon: <Copy />,
    nav: "/jumelage",
    asUrl: "/jumelage",
  },
  {
    id: 5,
    name: "Sidebar.Ratings",
    icon: <Like1 />,
    nav: "/evaluations",
    asUrl: "/evaluations",
  },
  {
    id: 5,
    name: "Sidebar.AllStudents",
    icon: <UserSquare />,
    nav: "/matchmaking",
    asUrl: "/matchmaking",
  },
];

// student sidebar menu list with icon and navigations url
export const elevesSidebarMenu = [
  {
    id: 1,
    name: "Sidebar.Dashboard",
    icon: <Home />,
    nav: "/dashboard",
    asUrl: "/dashboard",
  },
  {
    id: 2,
    name: "Sidebar.Calendar",
    icon: <Calendar />,
    nav: "/calendar",
    asUrl: "/calendar",
  },
  // {
  //   id: 3,
  //   name: "Classe virtuelle",
  //   icon: "",
  //   nav: "/employe",
  //   asUrl: "/dashboard",
  // },
  {
    id: 4,
    name: "Sidebar.Messaging",
    icon: <Message2 />,
    nav: "/messages",
    asUrl: "/messages",
  },
  {
    id: 5,
    name: "Sidebar.Ratings",
    // icon: <MessageEdit />,
    icon: <Like1 />,
    nav: "/evaluations",
    asUrl: "/evaluations",
  },
  {
    id: 6,
    name: "Sidebar.Programs",
    icon: <Copy />,
    nav: "/programs",
    // asUrl: "/evaluations",
  },
];

// parent sidebar menu list with icon and navigations url
export const parentSidebarMenu = [
  {
    id: 1,
    name: "Sidebar.Dashboard",
    icon: <Home />,
    nav: "/dashboard",
    asUrl: "/dashboard",
  },
  {
    id: 2,
    name: "Sidebar.Calendar",
    icon: <Calendar />,
    nav: "/calendar",
    asUrl: "/calendar",
  },
  {
    id: 3,
    name: "Sidebar.MyStudents",
    icon: <Profile2User />,
    nav: "/student",
    asUrl: "/student",
  },
  {
    id: 4,
    name: "Sidebar.Messaging",
    icon: <Message2 />,
    nav: "/messages",
    asUrl: "/messages",
  },
  // {
  //   id: 5,
  //   name: "Sidebar.Billing",
  //   icon: <MoneyRecive />,
  //   nav: "/facturation",
  //   asUrl: "/facturation",
  // },
  {
    id: 6,
    name: "Sidebar.Ratings",
    // icon: <MessageEdit />,
    icon: <Like1 />,
    nav: "/evaluations",
    asUrl: "/evaluations",
  },
];

// Dyanamic Header name list
export const headerData = [
  {
    id: 1,
    name: "Header.Dashboard",
    icon: <Home size="20" className="me-2 flex-none" />,
    asUrl: "/dashboard",
  },
  {
    id: 2,
    name: "Header.TutorRices",
    icon: <UserSquare size="20" className="me-2 flex-none" />,
    asUrl: "/tutors",
  },
  {
    id: 3,
    name: "Header.AdminUserparent",
    icon: <UserSquare size="20" className="me-2 flex-none" />,
    asUrl: "/parents",
  },
  // {
  //   id: 4,
  //   name: "Header.Élèves",
  //   icon: <Profile2User size="20" className="me-2 flex-none" />,
  //   asUrl: "/student",
  //   // isOtherRole: true,
  // },
  {
    id: 5,
    name: "Header.Messaging",
    icon: <Message2 size="20" className="me-2 flex-none" />,
    asUrl: "/messages",
  },
  {
    id: 6,
    name: "Header.Twinning",
    icon: <Copy size="20" className="me-2 flex-none" />,
    asUrl: "/jumelage",
  },
  {
    id: 7,
    name: "Header.Ratings",
    icon: <Like1 size="20" className="me-2 flex-none" />,
    asUrl: "/evaluations",
  },
  {
    id: 8,
    name: "Header.MyStudents",
    icon: <Profile2User size="20" className="me-2 flex-none" />,
    asUrl: "/mystudent",
  },
  {
    id: 9,
    name: "Header.Billing",
    icon: <MoneyRecive size="20" className="me-2 flex-none" />,
    asUrl: "/facturation",
  },
  {
    id: 10,
    name: "Header.Payments",
    icon: <MoneyRecive size="20" className="me-2 flex-none" />,
    asUrl: "/payment",
  },
  {
    id: 11,
    name: "Header.Calendar",
    icon: <Calendar size="20" className="me-2 flex-none" />,
    asUrl: "/calendar",
  },
  {
    id: 12,
    name: "Header.Settings",
    icon: <Setting2 size="20" className="me-2 flex-none" />,
    asUrl: "/settings",
  },
  {
    id: 13,
    name: "Header.MyProfile",
    icon: null,
    asUrl: "/profile",
  },
  {
    id: 14,
    name: "Header.Payments",
    icon: <MoneyRecive size="20" className="me-2 flex-none" />,
    asUrl: "/my-payment-invoice",
  },
  {
    id: 15,
    name: "Header.AdminUserTutor",
    icon: <UserSquare size="20" className="me-2 flex-none" />,
    asUrl: "/tutors",
  },
  // {
  //   id: 16,
  //   name: "Header.AdminUserStudent",
  //   icon: <UserSquare size="20" className="me-2 flex-none" />,
  //   asUrl: "/student",
  //   isAdmin: true,
  // },
  {
    id: 16,
    name: "Header.Programs",
    icon: <Copy size="20" className="me-2 flex-none" />,
    asUrl: "/programs",
    // isAdmin: true,
  },
  {
    id: 16,
    name: "Header.AllStudents",
    icon: <UserSquare size="20" className="me-2 flex-none" />,
    asUrl: "/matchmaking",
    // isAdmin: true,
  },
];

// edit user informations
export const editUserInformations = [
  {
    label: "Common.FirstName",
    name: "first_name",
    placeholder: "Common.WriteHere",
    type: "text",
    disebles: false,
    col: 6,
  },
  {
    label: "Common.Surname",
    name: "last_name",
    placeholder: "Common.WriteHere",
    type: "text",
    disebles: false,
    col: 6,
  },
  {
    label: "Common.Phone",
    name: "phone_no",
    placeholder: "XXX XXX XXXX",
    type: "tel",
    disebles: false,
    col: 6,
  },
  {
    label: "Common.Email",
    name: "email",
    placeholder: "joe@mail.com",
    type: "email",
    disebles: true,
    col: 6,
  },
  {
    label: "Common.SocialNumber",
    name: "social_insurance_number",
    placeholder: "****************",
    type: "text",
    disebles: false,
    col: 6,
    forTutor: true,
  },
  // hide only student
  {
    label: "Common.Address",
    name: "address",
    placeholder: "Common.WriteHere",
    type: "text",
    disebles: false,
    col: 6,
    isStudentNo: true,
  },
  {
    label: "Common.Password",
    name: "password",
    placeholder: "Common.WriteHere",
    type: "password",
    disebles: false,
    col: 6,
  },
  {
    label: "Common.PasswordConfirmation",
    name: "confrom_password",
    placeholder: "***************",
    type: "password",
    disebles: false,
    col: 3,
    confromPass: true,
  },
  // show only student
  {
    label: "Common.Address",
    name: "address",
    placeholder: "Common.WriteHere",
    type: "text",
    disebles: false,
    col: 6,
    isStudent: true,
  },
  // new fields
  {
    label: "Common.DateOfBirth",
    name: "dob",
    placeholder: "XXXX-XX-XX",
    type: "date",
    disebles: false,
    col: 3,
  },
  {
    label: "Common.Language",
    name: "language",
    placeholder: "Common.WriteHere",
    type: "select",
    disebles: false,
    col: 3,
    isTutorNo: true,
  },
  {
    // label: "Common.Number",
    label: "Common.Apartment",
    name: "apartment",
    placeholder: "Common.WriteHere",
    type: "text",
    disebles: false,
    col: 2,
  },
  {
    label: "Common.PostalCode",
    name: "zip",
    placeholder: "XXXXXX",
    type: "text",
    disebles: false,
    col: 2,
  },
  {
    label: "Common.Province",
    name: "province",
    placeholder: "Common.WriteHere",
    type: "text",
    disebles: false,
    col: 2,
  },
];

// edit information Language select option
// export const languageOptions = ["English", "French"];
export const languageOptions = [
  { val: 1, label: "Common.English" },
  { val: 2, label: "Common.French" },
  { val: 3, label: "Common.Both" },
];

// add student in parent profile
export const addStudnetData = [
  {
    label: "Common.FirstName",
    name: "first_name",
    placeholder: "Écrire ici",
    type: "text",
  },
  {
    label: "Common.Surname",
    name: "last_name",
    placeholder: "Écrire ici",
    type: "text",
  },
  {
    label: "Common.Email",
    name: "email",
    placeholder: "joe@mail.com",
    type: "email",
  },
  {
    label: "Common.Password",
    name: "password",
    placeholder: "Écrire ici",
    type: "password",
  },
];
// Show student in parent profile
export const showStudnetData = [
  {
    label: "Prénom",
    name: "first_name",
    placeholder: "Écrire ici",
    type: "text",
  },
  {
    label: "Nom de famille",
    name: "last_name",
    placeholder: "Écrire ici",
    type: "text",
  },
  {
    label: "Courriel",
    name: "email",
    placeholder: "joe@mail.com",
    type: "email",
  },
  {
    label: "Mot de passe",
    name: "password",
    placeholder: "Écrire ici",
    type: "password",
  },
];
// show parent data in student profile
export const showParentsData = [
  {
    label: "Common.FirstName",
    name: "first_name",
    placeholder: "Écrire ici",
    type: "text",
  },
  {
    label: "Common.Surname",
    name: "last_name",
    placeholder: "Écrire ici",
    type: "text",
  },
  {
    label: "Common.Email",
    name: "email",
    placeholder: "joe@mail.com",
    type: "email",
  },
];

// setting page sidebar data
export const sidebarList = [
  {
    role_id: 1,
    name: "admin",
    disply_name: "Admin",
    tabList: [
      {
        target: "#notification-tab",
        logo: <Notification />,
        title: "Notifications",
      },
      {
        target: "#terms-and-condition-tab",
        logo: <Book1 />,
        title: "Login.T&cBtn",
      },
      {
        target: "#privacy-policy-tab",
        logo: <Lock1 />,
        title: "Login.PolicyBtn",
      },
      {
        target: "#anti-discrimination-policies-tab",
        logo: <Flag />,
        title: "AntiDiscriminationPoliciesTab.AntiDiscriminationPolicies",
      },
    ],
  },
  {
    role_id: 2,
    name: "tutor",
    disply_name: "Tuteurs",
    tabList: [
      {
        target: "#personal-information-tab",
        logo: <UserEdit />,
        title: "EditInformations.PersonalInformations",
      },
      // change for this task -> https://app.asana.com/0/0/1205456579642428/f
      // {
      //   target: "#notification-tab",
      //   logo: <Notification />,
      //   title: "Notifications",
      // },
      {
        target: "#documents-tab",
        logo: <Document />,
        title: "Documents",
      },
      {
        target: "#terms-and-condition-tab",
        logo: <Book1 />,
        title: "Login.T&cBtn",
      },
      {
        target: "#privacy-policy-tab",
        logo: <Lock1 />,
        title: "Login.PolicyBtn",
      },
      {
        target: "#anti-discrimination-policies-tab",
        logo: <Flag />,
        title: "AntiDiscriminationPoliciesTab.AntiDiscriminationPolicies",
      },
    ],
  },
  {
    role_id: 3,
    name: "parent",
    disply_name: "Parents",
    tabList: [
      {
        target: "#personal-information-tab",
        logo: <UserEdit />,
        title: "EditInformations.PersonalInformations",
      },
      {
        target: "#notification-tab",
        logo: <Notification />,
        title: "Sidebar.Notifications",
      },
      // {
      //   target: "#payments-tab",
      //   logo: <MoneyRecive />,
      //   title: "Sidebar.Payments",
      // },
      {
        target: "#terms-and-condition-tab",
        logo: <Book1 />,
        title: "Login.T&cBtn",
      },
      {
        target: "#privacy-policy-tab",
        logo: <Lock1 />,
        title: "Login.PolicyBtn",
      },
      {
        target: "#anti-discrimination-policies-tab",
        logo: <Flag />,
        title: "AntiDiscriminationPoliciesTab.AntiDiscriminationPolicies",
      },
    ],
  },
  {
    role_id: 4,
    name: "student",
    disply_name: "Élèves",
    tabList: [
      {
        target: "#personal-information-tab",
        logo: <UserEdit />,
        title: "EditInformations.PersonalInformations",
      },
      // {
      //   target: "#notification-tab",
      //   logo: <Notification />,
      //   title: "Notifications",
      // },
      {
        target: "#terms-and-condition-tab",
        logo: <Book1 />,
        title: "Login.T&cBtn",
      },
      {
        target: "#privacy-policy-tab",
        logo: <Lock1 />,
        title: "Login.PolicyBtn",
      },
      {
        target: "#anti-discrimination-policies-tab",
        logo: <Flag />,
        title: "AntiDiscriminationPoliciesTab.AntiDiscriminationPolicies",
      },
    ],
  },
];

// meassege in role wise user
export const userRoles = [
  {
    role_id: 4,
    name: "student",
    disply_name: "Common.Students",
  },
  {
    role_id: 3,
    name: "parent",
    disply_name: "Common.Parents",
  },
  {
    role_id: 2,
    name: "tutor",
    disply_name: "Common.Tutors",
  },
];

// tutor dashboard in show componet serching list
export const componentsSerchingList = [
  {
    name: " Utilisateur",
    disply_name: "user",
    active: false,
  },
  {
    name: "A faire",
    disply_name: "toDo",
    active: false,
  },
  {
    name: "Calendrier",
    disply_name: "calendar",
    active: false,
  },
];

// show alert messages
export const allAlertMessage = [
  // {
  //   type: "success",
  //   title: "Pending match!",
  //   message:
  //     "You've got a match proposal pending your approval at notifications.",
  //   link: "#",
  //   linkMessages: "Check match proposal",
  //   icon: <Copy />,
  //   color: "green",
  // },
  // {
  //   type: "warning",
  //   title: "User profile incomplete",
  //   message:
  //     "Your payment is overdue. Please, settle as soon as possible and avoid any disruption to your access.",
  //   link: "#",
  //   linkMessages: "Complete my profile",
  //   icon: <User />,
  //   color: "orange",
  // },
  // {
  //   type: "success",
  //   title: "Billing issues",
  //   message:
  //     "You've got a match proposal pending your approval at notifications.",
  //   link: "#",
  //   linkMessages: "Solve issue",
  //   icon: <MoneyRecive />,
  //   color: "red",
  // }
];
// show component list on header search
export const componentList = [
  {
    index: 0,
    text: "Sidebar.User",
    name: "user",
    isActive: false,
  },
  {
    index: 1,
    text: "TutorDeshbord.Calendar",
    name: "calendar",
    isActive: false,
  },
  {
    index: 2,
    text: "TutorDeshbord.Todo",
    name: "to do",
    isActive: false,
  },
];
// show component list on header search
export const componentListRoleWise = [
  {
    role_id: 1,
    role_name: "admin",
    componentsList: [
      { index: 0, text: " Utilisateur", name: "user", isActive: false },
      // {
      //   name: "A faire",
      //   disply_name: "toDo",
      //   active: false,
      // },
      // {
      //   name: "Calendrier",
      //   disply_name: "calendar",
      //   active: false,
      // },
    ],
  },
  {
    role_id: 2,
    role_name: "tutor",
    componentsList: [
      { index: 0, text: "Calendrier", name: "calendar", isActive: false },
      { index: 1, text: "A faire", name: "to do", isActive: false },
    ],
  },
  {
    role_id: 3,
    role_name: "parent",
    componentsList: [
      // {
      //   name: " Utilisateur",
      //   disply_name: "user",
      //   active: false,
      // },
      // {
      { index: 0, text: "Calendrier", name: "calendar", isActive: false },
      { index: 1, text: "A faire", name: "toDo", isActive: false },
    ],
  },
  {
    role_id: 4,
    role_name: "student",
    componentsList: [
      // {
      //   name: " Utilisateur",
      //   disply_name: "user",
      //   active: false,
      // },
      { index: 0, text: "A faire", name: "toDo", isActive: false },
      { index: 1, text: "Calendrier", name: "calendar", isActive: false },
    ],
  },
];

// day name
export const allDay = [
  {
    name: "WeekDays.Monday", //monday
  },
  {
    name: "WeekDays.Tuesday",
  },
  {
    name: "WeekDays.Wednesday",
  },
  {
    name: "WeekDays.Thursday",
  },
  {
    name: "WeekDays.Friday",
  },
  {
    name: "WeekDays.Saturday",
  },
  {
    name: "WeekDays.Sunday",
  },
];

// complete session durections
export const sessionDurections = [
  {
    time: "30m",
  },
  {
    time: "45m",
  },
  {
    time: "1h00",
  },
  {
    time: "1h15",
  },
  {
    time: "1h30",
  },
  {
    time: "1h45",
  },
  {
    time: "2h00",
  },
  {
    time: "2h15",
  },
  {
    time: "2h30",
  },
  {
    time: "2h45",
  },
  {
    time: "3h00",
  },
];

// tutor profile review question 2
export const tutorProfileQuestion2 = [
  {
    id: "preschoo_english",
    label: "TutorProfileQuestions.Q2Option1",
    name: "subjects",
  },
  {
    id: "preschool_french",
    label: "TutorProfileQuestions.Q2Option2",
    name: "subjects",
  },
  {
    id: "preschool_math",
    label: "TutorProfileQuestions.Q2Option3",
    name: "subjects",
  },
];

// tutor profile review question 3 to 9
export const tutorProfile = [
  {
    id: "q3",
    title: "Q3",
    label: "TutorProfileQuestions.Questions3",
    name: "is_attentive",
  },
  {
    id: "q4",
    title: "Q4",
    label: "TutorProfileQuestions.Questions4",
    name: "does_homework",
  },
  {
    id: "q5",
    title: "Q5",
    label: "TutorProfileQuestions.Questions5",
    name: "is_motivated",
  },
  {
    id: "q6",
    title: "Q6",
    label: "TutorProfileQuestions.Questions6",
    name: "is_organized",
  },
  {
    id: "q7",
    title: "Q7",
    label: "TutorProfileQuestions.Questions7",
    name: "brings_equipment",
  },
  {
    id: "q8",
    title: "Q8",
    label: "TutorProfileQuestions.Questions8",
    name: "ask_questions",
  },
  {
    id: "q9",
    title: "Q9",
    label: "TutorProfileQuestions.Questions9",
    name: "respect_schedule",
  },
];

// tutor profile review question  10 to 12
export const tutorProfileQuestion10To12 = [
  {
    id: "q10",
    title: "Q10",
    label: "TutorProfileQuestions.Questions10",
    name: "no_of_meeting",
    from: [
      {
        id: "one_time_week",
        label: "TutorProfileQuestions.Q10Option1",
      },
      {
        id: "two_Time_week",
        label: "TutorProfileQuestions.Q10Option2",
      },
      {
        id: "three_time_week",
        label: "TutorProfileQuestions.Q10Option3",
      },
      {
        id: "four_time_week",
        label: "TutorProfileQuestions.Q10Option4",
      },
      {
        id: "fiveor_Plus_time_week",
        label: "TutorProfileQuestions.Q10Option5",
      },
    ],
  },
  {
    id: "q11",
    title: "Q11",
    label: "TutorProfileQuestions.Questions11",
    name: "length_of_session",
    from: [
      {
        id: "1h",
        label: "1h",
      },
      {
        id: "1h15",
        label: "1h15",
      },
      {
        id: "1h30",
        label: "1h30",
      },
      {
        id: "1h45",
        label: "1h45",
      },
      {
        id: "2h",
        label: "2h",
      },
      {
        id: "2h15",
        label: "2h15",
      },
      {
        id: "2h30 et plus",
        label: "TutorProfileQuestions.Q11Option7",
      },
    ],
  },
  {
    id: "q12",
    title: "Q12",
    label: "TutorProfileQuestions.Questions12",
    name: "concentration_level_duration",
    from: [
      {
        id: "sufficient_time",
        label: "TutorProfileQuestions.Q12Option1",
      },
      {
        id: "insufficient_time",
        label: "TutorProfileQuestions.Q12Option2",
      },
      {
        id: "too_long_time",
        label: "TutorProfileQuestions.Q12Option3",
      },
    ],
  },
];

// tutor profile review question  13 to 15
export const tutorProfileQuestion13To15 = [
  {
    id: "q13",
    title: "Q13",
    label: "TutorProfileQuestions.Questions13",
    name: "session_duration_suggestion",
  },
  {
    id: "q14",
    title: "Q14",
    label: "TutorProfileQuestions.Questions14",
    name: "progress_of_student",
  },
  {
    id: "q15",
    title: "Q15",
    label: "TutorProfileQuestions.Questions15",
    name: "points_to_work",
  },
];

// Evaluation of a parent/student of the guardian review question 1 to 10
export const studentAndParentEvaluationsPage1To11 = [
  {
    id: "q1",
    title: "Q1",
    label: "StudentAndParentEvaluations.EvaluationQ1",
    name: "general_appreciation",
  },
  {
    id: "q2",
    title: "Q2",
    label: "StudentAndParentEvaluations.EvaluationQ2",
    name: "assessment_accessible",
  },
  {
    id: "q3",
    title: "Q3",
    label: "StudentAndParentEvaluations.EvaluationQ3",
    name: "good_bond",
  },
  {
    id: "q4",
    title: "Q4",
    label: "StudentAndParentEvaluations.EvaluationQ4",
    name: "pleasant_climate",
  },
  {
    id: "q5",
    title: "Q5",
    label: "StudentAndParentEvaluations.EvaluationQ5",
    name: "attentive_tutor",
  },
  {
    id: "q6",
    title: "Q6",
    label: "StudentAndParentEvaluations.EvaluationQ6",
    name: "comfortable_subject",
  },
  {
    id: "q7",
    title: "Q7",
    label: "StudentAndParentEvaluations.EvaluationQ7",
    name: "informed_progress",
  },
  {
    id: "q8",
    title: "Q8",
    label: "StudentAndParentEvaluations.EvaluationQ8",
    name: "useful_suggestions",
  },
  {
    id: "q9",
    title: "Q9",
    label: "StudentAndParentEvaluations.EvaluationQ9",
    name: "well_prepared",
  },
  {
    id: "q10",
    title: "Q10",
    label: "StudentAndParentEvaluations.EvaluationQ10",
    name: "punctual_tutor",
  },
  {
    id: "q11",
    title: "Q11",
    label: "StudentAndParentEvaluations.EvaluationQ11",
    name: "general_comments",
  },
];

// Evaluation of a parent/student of the guardian review question 1 to 10
export const studentAndParentEvaluationsPage1To11ForParent = [
  {
    id: "q1",
    title: "Q1",
    label: "StudentAndParentEvaluations.EvaluationQ1",
    name: "general_appreciation",
  },
  // {
  //   id: "q2",
  //   title: "Q2",
  //   label: "StudentAndParentEvaluations.EvaluationQ2",
  //   name: "assessment_accessible",
  // },
  {
    id: "q3",
    title: "Q2",
    label: "StudentAndParentEvaluations.EvaluationQ3",
    name: "good_bond",
  },
  {
    id: "q4",
    title: "Q3",
    label: "StudentAndParentEvaluations.EvaluationQ4",
    name: "pleasant_climate",
  },
  {
    id: "q5",
    title: "Q4",
    label: "StudentAndParentEvaluations.EvaluationQ5",
    name: "attentive_tutor",
  },
  {
    id: "q6",
    title: "Q5",
    label: "StudentAndParentEvaluations.EvaluationQ6",
    name: "comfortable_subject",
  },
  {
    id: "q7",
    title: "Q6",
    label: "StudentAndParentEvaluations.EvaluationQ7",
    name: "informed_progress",
  },
  {
    id: "q8",
    title: "Q7",
    label: "StudentAndParentEvaluations.EvaluationQ8",
    name: "useful_suggestions",
  },
  {
    id: "q9",
    title: "Q8",
    label: "StudentAndParentEvaluations.EvaluationQ9",
    name: "well_prepared",
  },
  {
    id: "q10",
    title: "Q9",
    label: "StudentAndParentEvaluations.EvaluationQ10",
    name: "punctual_tutor",
  },
  {
    id: "q11",
    title: "Q10",
    label: "StudentAndParentEvaluations.EvaluationQ11",
    name: "general_comments",
  },
];

// tutor profile review question  10 to 12
export const ratingFromUsersPage = [
  {
    id: "q1",
    title: "Q1",
    label: "RatingFromUsersPage.RatingQ1",
    name: "grades",
    from: [
      {
        id: "q1-1",
        label: "RatingFromUsersPage.RatingOption1",
        name: "0",
      },
      {
        id: "q1-2",
        label: "RatingFromUsersPage.RatingOption2",
        name: "0-5",
      },
      {
        id: "q1-3",
        label: "RatingFromUsersPage.RatingOption3",
        name: "6-10",
      },
      {
        id: "q1-4",
        label: "RatingFromUsersPage.RatingOption4",
        name: "11-15",
      },
      {
        id: "q1-5",
        label: "RatingFromUsersPage.RatingOption5",
        name: "16-20",
      },
      {
        id: "q1-6",
        label: "RatingFromUsersPage.RatingOption6",
        name: "20-100",
      },
    ],
  },
  {
    id: "q2",
    title: "Q2",
    label: "RatingFromUsersPage.RatingQ2",
    name: "motivation",
    from: [
      {
        id: "q2-1",
        label: "Common.Yes",
        name: "yes",
      },
      {
        id: "q2-2",
        label: "Common.No",
        name: "no",
      },
      {
        id: "q2-3",
        label: "Common.IDontKnow",
        name: "nope",
      },
    ],
  },
  {
    id: "q3",
    title: "Q3",
    label: "RatingFromUsersPage.RatingQ3",
    name: "self_esteem",
    from: [
      {
        id: "q3-1",
        label: "Common.Yes",
        name: "yes",
      },
      {
        id: "q3-2",
        label: "Common.No",
        name: "no",
      },
      {
        id: "q3-3",
        label: "Common.IDontKnow",
        name: "nope",
      },
    ],
  },
  {
    id: "q4",
    title: "Q4",
    label: "RatingFromUsersPage.RatingQ4",
    name: "recommend_school",
    from: [
      {
        id: "q4-1",
        label: "Common.Yes",
        name: "yes",
      },
      {
        id: "q4-2",
        label: "Common.No",
        name: "no",
      },
    ],
  },
  {
    id: "q5",
    title: "Q5",
    label: "RatingFromUsersPage.RatingQ5",
    name: "general_comments",
  },
];

// resion for modifications
export const resain = [
  {
    name: "Je ne veux plus de nouveaux élèves pour l'instant",
  },
  {
    name: "Je ne peux pas enseigner les matières demandées",
  },
  {
    name: "Je ne peux pas enseigner les matières demandéesJe ne peux pas répondre aux difficultés d'apprentissage de cet élève",
  },
  {
    name: "Je ne pense pas pouvoir répondre aux besoins généraux de cet élève",
  },
];

// notification bar today / week /  month
export const notificationData = [
  {
    id: 1,
    title: "NotificationBar.ToDay",
  },
  {
    id: 2,
    title: "NotificationBar.ThisWeek",
    format: "week",
  },
  {
    id: 1,
    title: "NotificationBar.ThisMonth",
    format: "month",
  },
  {
    id: 1,
    title: "NotificationBar.Older",
  },
];
// notification settings for each user
//
//
// mainNotificationSettings: [
//   {
//     text: "Me notifier quand:",
//     subTypesOfNotification: [
//       {
//         text: "Rendez-vous",
//         notificationSettingsList: [
//           { id: 1, isChecked: false, name: "name", text: "text" },
//           { id: 2, isChecked: false, name: "name", text: "text" },
//         ],
//       },
//     ],
//   },
// ],
export const notificationSettingsUserWise = [
  {
    role_id: 1,
    role_name: "admin",
    mainNotificationSettings: [
      {
        text: "NotificationsTab.NotifyWhen",
        subTypesOfNotification: [
          {
            text: "NotificationsTab.General",
            notificationSettingsList: [
              {
                id: 1,
                isChecked: false,
                name: "New matches are proposed",
                text: "notificationSettingsList.NewMatches",
              },
              {
                id: 1,
                isChecked: false,
                name: "Updates on current matches",
                text: "notificationSettingsList.UpdatesOnMatches",
              },
              {
                id: 1,
                isChecked: false,
                name: "Admin messages",
                text: "notificationSettingsList.AdminMsg",
              },
              {
                id: 1,
                isChecked: false,
                name: "New Élèves on the platform",
                text: "notificationSettingsList.NewStudents",
              },
              {
                id: 1,
                isChecked: false,
                name: "Invitations to events",
                text: "notificationSettingsList.EventInvite",
              },
              {
                id: 1,
                isChecked: false,
                name: "Terms and conditions updates",
                text: "notificationSettingsList.TermsAndConditions",
              },
            ],
          },
        ],
      },
      {
        text: "NotificationsTab.NotifyVia",
        subTypesOfNotification: [
          {
            text: "NotificationsTab.General",
            notificationSettingsList: [
              {
                id: 1,
                isChecked: false,
                name: "Email",
                text: "notificationSettingsList.Email",
                subText: "jamest1990@email.com",
              },
              {
                id: 2,
                isChecked: false,
                name: "SMS",
                text: "notificationSettingsList.Sms",
                subText: "123098345",
              },
              {
                id: 2,
                isChecked: false,
                name: "Platform notifications only",
                text: "notificationSettingsList.PlatformNotificationsOnly",
              },
            ],
          },
        ],
      },
      {
        text: "NotificationsTab.AlertType2",
        subTypesOfNotification: [
          {
            text: "NotificationsTab.General",
            notificationSettingsList: [
              {
                id: 1,
                isChecked: false,
                name: "Sound only",
                text: "notificationSettingsList.SoundOnly",
              },
              {
                id: 2,
                isChecked: false,
                name: "Visual dot",
                text: "notificationSettingsList.VisualDot",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    role_id: 2,
    role_name: "tutor",
    mainNotificationSettings: [
      {
        text: "NotificationsTab.NotifyWhen",
        subTypesOfNotification: [
          {
            text: "NotificationsTab.MakeAppointment",
            notificationSettingsList: [
              {
                id: 1,
                isChecked: false,
                name: "Demande de rendez-vous",
                text: "NotificationsTab.MakeAppointment",
              },
              {
                id: 2,
                isChecked: false,
                name: "Demande de modification de rendez-vous",
                text: "NotificationsTab.RequestChangeAppointment",
              },
              {
                id: 3,
                isChecked: false,
                name: "Rendez-vous annulé",
                text: "NotificationsTab.AppointmentCancel",
              },
            ],
          },
          {
            text: "NotificationsTab.Students",
            notificationSettingsList: [
              // {
              //   id: 1,
              //   isChecked: false,
              //   name: "Nouveau jumelage proposé",
              //   text: "Nouveau jumelage proposé",
              // },
              {
                id: 2,
                isChecked: false,
                name: "Rapport de suivi à compléter",
                text: "NotificationsTab.FollowupReportCompleted",
              },
              {
                id: 2,
                isChecked: false,
                name: "Évaluation disponible De la part d’un parent/élève",
                text: "NotificationsTab.EvaluationAvailableParentStudent",
                breakLine: "De la part d’un parent/élève",
              },
              {
                id: 2,
                isChecked: false,
                name: "Nouvelle évaluation d’enseignant disponible",
                text: "NotificationsTab.NewTeacherEvaluation",
              },
            ],
          },
          {
            text: "NotificationsTab.Messaging",
            notificationSettingsList: [
              {
                id: 1,
                isChecked: false,
                name: "Nouveau message",
                text: "NotificationsTab.NewMessage",
              },
            ],
          },
          {
            text: "NotificationsTab.AccountManagement",
            notificationSettingsList: [
              {
                id: 1,
                isChecked: false,
                name: "Nouveau paiement",
                text: "NotificationsTab.NewPayment",
              },
              {
                id: 2,
                isChecked: false,
                name: "Nouveau badge disponible",
                text: "NotificationsTab.NewBadgeAvailable",
              },
              {
                id: 2,
                isChecked: false,
                name: "Rappel: Mise à jour nombre d’élèves",
                text: "NotificationsTab.ReminderUpdateStudents",
              },
              {
                id: 2,
                isChecked: false,
                name: "Rappel: Mise à jour des disponibilités",
                text: "NotificationsTab.ReminderAvailabilityUpdate",
              },
              {
                id: 2,
                isChecked: false,
                name: "Nouveau mandat proposé",
                text: "NotificationsTab.ProposedNewMandate",
              },
            ],
          },
        ],
      },
      {
        text: "NotificationsTab.NotifyVia",
        subTypesOfNotification: [
          {
            text: "NotificationsTab.General",
            notificationSettingsList: [
              {
                id: 1,
                isChecked: false,
                name: "Email",
                text: "NotificationsTab.Email",
                subText: "jamest1990@email.com",
              },
              {
                id: 2,
                isChecked: false,
                name: "SMS",
                text: "NotificationsTab.Sms",
                subText: "123098345",
              },
              {
                id: 2,
                isChecked: false,
                name: "Platform notifications only",
                text: "NotificationsTab.PlatformNotificationsOnly",
              },
            ],
          },
        ],
      },
      // {
      //   text: "Alert type:",
      //   subTypesOfNotification: [
      //     {
      //       text: "Général",
      //       notificationSettingsList: [
      //         {
      //           id: 1,
      //           isChecked: false,
      //           name: "Sound only",
      //           text: "Son seulement",
      //         },
      //         {
      //           id: 2,
      //           isChecked: false,
      //           name: "Visual dot",
      //           text: "Points visuel",
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
  {
    role_id: 3,
    role_name: "parent",
    mainNotificationSettings: [
      {
        text: "NotificationsTab.NotifyWhen",
        subTypesOfNotification: [
          {
            text: "NotificationsTab.MakeAppointment",
            notificationSettingsList: [
              {
                id: 1,
                isChecked: false,
                name: "Demande de rendez-vous",
                text: "NotificationsTab.RequestAppointment",
              },
              {
                id: 2,
                isChecked: false,
                name: "Demande de modification de rendez-vous",
                text: "NotificationsTab.RequestChangeAppointment",
              },
              {
                id: 3,
                isChecked: false,
                name: "Rendez-vous annulé",
                text: "NotificationsTab.AppointmentCancel",
              },
            ],
          },
          {
            text: "NotificationsTab.Students",
            notificationSettingsList: [
              {
                id: 1,
                isChecked: false,
                name: "Nouveau jumelage proposé",
                text: "NotificationsTab.ProposedNewMatch",
              },
              {
                id: 1,
                isChecked: false,
                name: "Évaluation à compléter",
                text: "NotificationsTab.AssessmentToComplete",
              },
              {
                id: 1,
                isChecked: false,
                name: "Nouvelle évaluation d’enseignant disponible",
                text: "NotificationsTab.NewTeacherEvaluation",
              },
              {
                id: 1,
                isChecked: false,
                name: "Rapport de suivi disponible",
                text: "NotificationsTab.MonitoringReport",
              },
              {
                id: 1,
                isChecked: false,
                name: "Évaluation du tuteur à compléter",
                text: "NotificationsTab.TutorAssessmentComplete",
              },
            ],
          },
          // {
          //   text: "Messagerie",
          //   notificationSettingsList: [
          //     {
          //       id: 1,
          //       isChecked: false,
          //       name: "Nouveau message",
          //       text: "Nouveau message",
          //     },
          //   ],
          // },
          {
            text: "NotificationsTab.MakeAppointment",
            notificationSettingsList: [
              {
                id: 1,
                isChecked: false,
                name: "Nouveau prélèvement",
                text: "NotificationsTab.NewCollection",
              },
              {
                id: 1,
                isChecked: false,
                name: "Nouvel état de compte disponible",
                text: "NotificationsTab.NewAccoutStatement",
              },
              {
                id: 1,
                isChecked: false,
                name: "Nouveau message",
                text: "NotificationsTab.NewMessage",
              },
            ],
          },
        ],
      },
      {
        text: "NotificationsTab.NotifyVia",
        subTypesOfNotification: [
          {
            text: "NotificationsTab.General",
            notificationSettingsList: [
              {
                id: 1,
                isChecked: false,
                name: "Email",
                text: "NotificationsTab.Email",
                subText: "jamest1990@email.com",
              },
              {
                id: 2,
                isChecked: false,
                name: "SMS",
                text: "NotificationsTab.Sms",
                subText: "123098345",
              },
              {
                id: 2,
                isChecked: false,
                name: "Platform notifications only",
                text: "NotificationsTab.PlatformNotificationsOnly",
              },
            ],
          },
        ],
      },
      // {
      //   text: "Alert type:",
      //   subTypesOfNotification: [
      //     {
      //       text: "Général",
      //       notificationSettingsList: [
      //         {
      //           id: 1,
      //           isChecked: false,
      //           name: "Sound only",
      //           text: "Son seulement",
      //         },
      //         {
      //           id: 2,
      //           isChecked: false,
      //           name: "Visual dot",
      //           text: "Points visuel",
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
  {
    role_id: 4,
    role_name: "student",
    mainNotificationSettings: [
      {
        text: "NotificationsTab.NotifyWhen",
        subTypesOfNotification: [
          {
            text: "NotificationsTab.MakeAppointment",
            notificationSettingsList: [
              {
                id: 1,
                isChecked: false,
                name: "Demande de rendez-vous",
                text: "NotificationsTab.RequestAppointment",
              },
              {
                id: 2,
                isChecked: false,
                name: "Demande de modification de rendez-vous",
                text: "NotificationsTab.RequestChangeAppointment",
              },
              {
                id: 3,
                isChecked: false,
                name: "Rendez-vous annulé",
                text: "NotificationsTab.AppointmentCancel",
              },
            ],
          },
          {
            text: "NotificationsTab.MyJourney",
            notificationSettingsList: [
              {
                id: 1,
                isChecked: false,
                name: "Nouveau jumelage proposé",
                text: "NotificationsTab.ProposedNewMatch",
              },
              {
                id: 1,
                isChecked: false,
                name: "Autoévaluation à compléter",
                text: "NotificationsTab.SelfAssessmentComplete",
              },
              {
                id: 1,
                isChecked: false,
                name: "Évaluation du tuteur à compléter",
                text: "NotificationsTab.TutorAssessmentComplete",
              },
              {
                id: 1,
                isChecked: false,
                name: "Rapport de suivi disponible",
                text: "NotificationsTab.MonitoringReport",
              },
              {
                id: 1,
                isChecked: false,
                name: "Nouvelle évaluation d’enseignant disponible",
                text: "NotificationsTab.NewTeacherEvaluation",
              },
              {
                id: 1,
                isChecked: false,
                name: "Nouveaux devoirs ajoutés",
                text: "NotificationsTab.NewWorkAdded",
              },
            ],
          },
          {
            text: "NotificationsTab.Messaging",
            notificationSettingsList: [
              {
                id: 1,
                isChecked: false,
                name: "Nouveau message",
                text: "NotificationsTab.NewMessage",
              },
            ],
          },
        ],
      },
      {
        text: "NotificationsTab.NotifyVia",
        subTypesOfNotification: [
          {
            text: "NotificationsTab.General",
            notificationSettingsList: [
              {
                id: 1,
                isChecked: false,
                name: "Email",
                text: "NotificationsTab.Email",
                subText: "jamest1990@email.com",
              },
              {
                id: 2,
                isChecked: false,
                name: "SMS",
                text: "NotificationsTab.Sms",
                subText: "123098345",
              },
              {
                id: 2,
                isChecked: false,
                name: "Platform notifications only",
                text: "NotificationsTab.PlatformNotificationsOnly",
              },
            ],
          },
        ],
      },
      // {
      //   text: "Alert type:",
      //   subTypesOfNotification: [
      //     {
      //       text: "Général",
      //       notificationSettingsList: [
      //         {
      //           id: 1,
      //           isChecked: false,
      //           name: "Sound only",
      //           text: "Son seulement",
      //         },
      //         {
      //           id: 2,
      //           isChecked: false,
      //           name: "Visual dot",
      //           text: "Points visuel",
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
];

export const adminRightSecondData = [
  {
    id: 1,
    label: "Family satisfaction",
    theme: "blue",
    icon: <EmojiHappy size="20" className="icon-main" />,
    value: "89%",
  },
  {
    id: 2,
    label: "New programs",
    theme: "orange",
    icon: <Diagram size="20" className="icon-main" />,
    value: "312",
  },
  {
    id: 3,
    label: "Family satisfaction",
    theme: "blue",
    icon: <EmojiHappy size="20" className="icon-main" />,
    value: "89%",
  },
  {
    id: 4,
    label: "New programs",
    theme: "orange",
    icon: <Diagram size="20" className="icon-main" />,
    value: "312",
  },
];

export const paymentsData = [
  {
    id: 1,
    label: "ParentDashboard.AccountBalance",
    theme: "green",
    value: "120,00",
  },
  {
    id: 2,
    label: "ParentDashboard.NextPaymentDate",
    theme: "orange",
    value: "04/Fév.",
  },
  {
    id: 3,
    // label: "ParentDashboard.LastPaymentHistory",

    label: `${"ParentDashboard.LastPaymentHistory"} - ` + "04 janv.",
    theme: "blue",
    value: "160,00",
  },
];

// tutor profile
export const tutorProfileInfo = [
  {
    id: 1,
    title: t("Profile.WhichUser"),
    name: "userDetails",
  },
  {
    id: 2,
    title: t("Profile.Availability"),
    name: "availability",
  },
  {
    id: 3,
    title: t("Profile.Level&Subject"),
    name: "levelsAndSubjectsTaught",
  },
  {
    id: 4,
    title: t("Profile.MasteryLevel"),
    name: "masteryOfLearningDifficulties",
  },
  {
    id: 5,
    title: t("Profile.Personality"),
    name: "myPersonality",
  },
  {
    id: 6,
    title: t("Profile.Interests"),
    name: "interests",
  },
  {
    id: 7,
    title: t("Profile.Education"),
    name: "education",
  },
  {
    id: 8,
    title: t("Profile.ExperienceProfessional"),
    name: "professionalExperiences",
  },
  {
    id: 9,
    title: t("Profile.TutorExperience"),
    name: "tutoringExperiences",
  },
  {
    id: 10,
    title: t("Profile.StudentExperience"),
    name: "experiencesWithChildren",
  },
];

// header all role button data
const tuterBtn = [
  {
    id: 1,
    path: "/calendar",
    btnName: "Nouvelle séance",
  },
  {
    id: 2,
    path: "/dashboard",
    btnName: "Tester la classe virtuelle",
  },
  {
    id: 3,
    path: "/evaluations",
    btnName: "Évaluer Succès Scolaire",
  },
  {
    id: 4,
    path: "/payment",
    btnName: "Voir mes factures",
  },
];

const studentBtn = [
  {
    id: 1,
    path: "/dashboard",
    btnName: "Tester la classe virtuelle",
  },
  {
    id: 2,
    path: "/evaluations",
    btnName: "Évaluer Succès Scolaire",
  },
];

const parentBtn = [
  {
    id: 1,
    path: "/dashboard",
    btnName: "Tester la classe virtuelle",
  },
  {
    id: 2,
    path: "/evaluations",
    btnName: "Évaluer Succès Scolaire",
  },
  {
    id: 3,
    path: "/facturation",
    btnName: "Paramètres paiements",
  },
];

// tutor profile

// tutor Profile data
export const tutorAvailabilityTimeRange = [
  "08:00 to 09:00",
  "09:00 to 10:00",
  "10:00 to 11:00",
  "11:00 to 12:00",
  "12:00 to 13:00",
  "13:00 to 14:00",
  "14:00 to 15:00",
  "15:00 to 16:00",
];
export const tutorAvailabilityTimeRangeNew = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
];
export const weekDays = [
  t("WeekDays.Monday"),
  t("WeekDays.Tuesday"),
  t("WeekDays.Wednesday"),
  t("WeekDays.Thursday"),
  t("WeekDays.Friday"),
  t("WeekDays.Saturday"),
  t("WeekDays.Sunday"),
];
// export const interests = [
//   "sports",
//   "art",
//   "music",
//   "photography",
//   "video_game",
//   "reading",
//   "animals",
//   "technology",
//   "movie",
//   "kitchen",
//   "journey",
//   "fashion"
// ];

// MasteryLevel
export const learningDifficultiesList = [
  {
    id: 1,
    name: "attention_deficit",
    label: "Profile.AttentionDeficit",
  },
  {
    id: 2,
    name: "dyslexia",
    label: "Profile.Dyslexia",
  },
  {
    id: 3,
    name: "dysortographie",
    label: "Profile.Dysorthographia",
  },
  {
    id: 4,
    name: "dyscalculia",
    label: "Profile.Dyscalculia",
  },
  {
    id: 5,
    name: "dysphasia",
    label: "Profile.Dysphasia",
  },
  {
    id: 6,
    name: "dyspraxia",
    label: "Profile.Dyspraxie",
  },
  {
    id: 7,
    name: "memory_problems",
    label: "Profile.MemoryProblems",
  },
  {
    id: 8,
    name: "asperger_syndrome",
    label: "Profile.AspergerSyndrome",
  },
  {
    id: 9,
    name: "autism_spectrum_disorder",
    label: "Profile.Autism",
  },
  {
    id: 10,
    name: "tourette_syndrome",
    label: "Profile.TouretteSyndrome",
  },
];

export const learningDifficultiesFollowed = [
  {
    id: 1,
    name: "remedial_teacher",
    label: "Profile.Orthopedagogue",
  },
  {
    id: 2,
    name: "speech_therapist",
    label: "Profile.SpeechTherapist",
  },
  {
    id: 3,
    name: "occupational_therapist",
    label: "Profile.OccupationalTherapist",
  },
];

export const atSchools = [
  {
    id: 1,
    name: "demonstrates_ability_to_concentrate",
    label: "Profile.DemonstratesAbilityToConcentrate",
  },
  {
    id: 2,
    name: "motivated_at_school",
    label: "Profile.AmMotivatedAtSchool",
  },
  {
    id: 3,
    name: "interested_in_school_subjects",
    label: "Profile.AmInterestedInSchoolSubjects",
  },
  {
    id: 4,
    name: "pay_attention_in_class",
    label: "Profile.PayAttentionInClass",
  },
  {
    id: 5,
    name: "enjoy_new_challenges",
    label: "Profile.EnjoyNewChallenges",
  },
  {
    id: 6,
    name: "expresses_ideas_well",
    label: "Profile.ExpressYourIdeasWell",
  },
  {
    id: 7,
    name: "class_question_section",
    label: "Profile.InClassQuestionsSection",
  },
];

export const personalitys = [
  {
    id: 1,
    name: "shy",
    label: "Profile.Shy",
  },
  {
    id: 2,
    name: "curious",
    label: "Profile.Curious",
  },
  {
    id: 3,
    name: "gossipy",
    label: "Profile.Talkative",
  },
  {
    id: 4,
    name: "distracted",
    label: "Profile.Distracted",
  },
  {
    id: 5,
    name: "sociable",
    label: "Profile.Sociable",
  },
  {
    id: 6,
    name: "calme",
    label: "Profile.Calm",
  },
  {
    id: 7,
    name: "creative",
    label: "Profile.Creative",
  },
  {
    id: 8,
    name: "senseOfMood",
    label: "Profile.SenseOfMood",
  },
];

export const levels_and_subjects_option = {
  pre_school_accordian: [
    "Anglais préscolaire",
    "Mathématique préscolaire",
    "Français préscolaire",
  ],
  primary_level_accordian: [
    {
      id: 1,
      title: "TutorMyProfile.FirstYear",
      lable: "TutorMyProfile.Materials",
      subObject: "1st year",
      dbName: "1st year",
      option: [
        "Anglais",
        "Français",
        "Éthique et culture religieuse",
        "Mathématique",
      ],
    },
    {
      id: 2,
      title: "TutorMyProfile.SecondYear",
      lable: "TutorMyProfile.Materials",
      subObject: "2nd year",
      dbName: "2nd year",
      option: [
        "Anglais",
        "Français",
        "Éthique et culture religieuse",
        "Mathématique",
      ],
    },
    {
      id: 3,
      title: "TutorMyProfile.ThirdYear",
      lable: "TutorMyProfile.Materials",
      subObject: "3rd year",
      dbName: "3rd year",
      option: [
        "Anglais",
        "Français",
        "Éthique et culture religieuse",
        "Mathématique",
        "Histoire et éducation à la citoyenneté",
        "Géographie",
        "Science et technologie",
      ],
    },
    {
      id: 4,
      title: "TutorMyProfile.FourthYear",
      lable: "TutorMyProfile.Materials",
      subObject: "4th year",
      dbName: "4th year",
      option: [
        "Anglais",
        "Français",
        "Éthique et culture religieuse",
        "Mathématique",
        "Histoire et éducation à la citoyenneté",
        "Géographie",
        "Science et technologie",
      ],
    },
    {
      id: 5,
      title: "TutorMyProfile.FifthYear",
      lable: "TutorMyProfile.Materials",
      subObject: "5th year",
      dbName: "5th year",
      option: [
        "Anglais",
        "Français",
        "Éthique et culture religieuse",
        "Mathématique",
        "Histoire et éducation à la citoyenneté",
        "Géographie",
        "Science et technologie",
        "Préparation aux examens d'admission au secondaire",
      ],
    },
    {
      id: 6,
      title: "TutorMyProfile.SixthYear",
      lable: "TutorMyProfile.Materials",
      subObject: "6th year",
      dbName: "6th year",
      option: [
        "Anglais",
        "Français",
        "Éthique et culture religieuse",
        "Mathématique",
        "Histoire et éducation à la citoyenneté",
        "Géographie",
        "Science et technologie",
        "Préparation aux examens d'admission au secondaire",
      ],
    },
  ],
  secondary_level_accordian: [
    {
      id: 1,
      title: "Profile.Secondary1",
      lable: "Profile.Material",
      subObject: "Secondary 1",
      dbName: "Secondary 1",
      option: [
        "Anglais",
        "Français",
        "Éthique et culture religieuse",
        "Mathématique",
        "Histoire et éducation à la citoyenneté",
        "Géographie",
        "Science et technologie",
        "Anglais langue seconde",
        "Français langue seconde",
      ],
    },
    {
      id: 2,
      title: "Profile.Secondary2",
      lable: "Profile.Material",
      subObject: "Secondary 2",
      dbName: "Secondary 2",
      option: [
        "Anglais",
        "Français",
        "Éthique et culture religieuse",
        "Mathématique",
        "Histoire et éducation à la citoyenneté",
        "Géographie",
        "Science et technologie",
        "Anglais langue seconde",
        "Français langue seconde",
        "Espagnol",
      ],
    },
    {
      id: 3,
      title: "Profile.Secondary3",
      lable: "Profile.Material",
      subObject: "Secondary 3",
      dbName: "Secondary 3",
      option: [
        "Anglais",
        "Français",
        "Éthique et culture religieuse",
        "Mathématique",
        "Histoire et éducation à la citoyenneté",
        "Science et technologie (ST)",
        "Science et technologie (ATS)",
        "Anglais langue seconde",
        "Français langue seconde",
        "Espagnol",
      ],
    },
    {
      id: 4,
      title: "Profile.Secondary4",
      lable: "Profile.Material",
      subObject: "Secondary 4",
      dbName: "Secondary 4",
      option: [
        "Anglais",
        "Français",
        "Éthique et culture religieuse",
        "Mathématique culture, société et technique (CST)",
        "Histoire et éducation à la citoyenneté",
        "Science et technologie (ST)",
        "Science et technologie (ATS)",
        "Anglais langue seconde",
        "Français langue seconde",
        "Espagnol",
        "Science et technologie (STE)",
        "Science et technologie (ATS-SE)",
        "Mathématique technico-sciences (TS)",
        "Mathématique sciences naturelles (SN)",
        "Histoire du Quebec et du Canada",
      ],
    },
    {
      id: 5,
      title: "Profile.Secondary5",
      lable: "Profile.Material",
      subObject: "Secondary 5",
      dbName: "Secondary 5",
      option: [
        "Anglais",
        "Français",
        "Éthique et culture religieuse",
        "Mathématique culture, société et technique (CST)",
        "Anglais langue seconde",
        "Français langue seconde",
        "Espagnol",
        "Physique",
        "Chimie",
        "Mathématique technico-sciences (TS)",
        "Mathématique sciences naturelles (SN)",
        "Monde contemporain",
      ],
    },
  ],
  cegep_level_accordian: [
    "Écriture et littérature - Français 1",
    "Algèbre linéaire et géométrie vectorielle",
    "Biologie 1",
    "Calcul avancé",
    "Calcul intégral",
    "Chimie de solutions",
    "Économie",
    "Espagnol avancé",
    "Espagnol intermédiaire",
    "Initiation pratique à la méthodologie des sciences humaines",
    "Littérature québécoise - Français 3",
    "Méthodes quantitatives",
    "Ondes et physique moderne",
    "Physique",
    "Anglais 1",
    "Anglais 2",
    "Biologie 2",
    "Calcul différentiel",
    "Chimie",
    "Chimie organique",
    "Électricité et Magnétisme",
    "Espagnol débutant",
    "Éthique et politique",
    "L'être humain (philosophie)",
    "Littérature et imaginaire - Français 2",
    "Mécanique",
    "Méthodes quantitatives avancées",
    "Méthodes quantitatives en sciences humaines",
    "Philosophie et rationalité",
    "Statistiques",
  ],
};

export const interests = [
  {
    id: 1,
    name: "sports",
    label: "Profile.Sports",
  },
  {
    id: 2,
    name: "art",
    label: "Profile.Art",
  },
  {
    id: 3,
    name: "music",
    label: "Profile.Music",
  },
  {
    id: 4,
    name: "photography",
    label: "Profile.Photography",
  },
  {
    id: 5,
    name: "video_game",
    label: "Profile.VideoGames",
  },
  {
    id: 6,
    name: "reading",
    label: "Profile.Reading",
  },
  {
    id: 7,
    name: "animals",
    label: "Profile.Animals",
  },
  {
    id: 8,
    name: "technology",
    label: "Profile.Technology",
  },
  {
    id: 9,
    name: "movie",
    label: "Profile.MovieTheater",
  },
  {
    id: 10,
    name: "kitchen",
    label: "Profile.Kitchen",
  },
  {
    id: 11,
    name: "journey",
    label: "Profile.Fashion",
  },
  {
    id: 12,
    name: "fashion",
    label: "Profile.Journey",
  },
];

// school lavel
export const schoolLavels = [
  {
    name: "Profile.1stYear",
    value: 1,
  },
  {
    name: "Profile.2stYear",
    value: 2,
  },
  {
    name: "Profile.3stYear",
    value: 3,
  },
  {
    name: "Profile.4stYear",
    value: 4,
  },
  {
    name: "Profile.5stYear",
    value: 5,
  },
  {
    name: "Profile.6stYear",
    value: 6,
  },
  {
    name: "Profile.Secondary1",
    value: 7,
  },
  {
    name: "Profile.Secondary2",
    value: 8,
  },
  {
    name: "Profile.Secondary3",
    value: 9,
  },
  {
    name: "Profile.Secondary4",
    value: 10,
  },
  {
    name: "Profile.Secondary5",
    value: 11,
  },
  {
    name: "Profile.cegep",
    value: 12,
  },
];

export const myNeedDroupDownOptions = [
  {
    name: "StudentProfileMyNeedOptions.PreschoolEnglish",
    value: 1,
    isShow: [0],
  },
  {
    name: "StudentProfileMyNeedOptions.PreschoolMathematics",
    value: 2,
    isShow: [0],
  },
  {
    name: "StudentProfileMyNeedOptions.PreschoolFrench",
    value: 3,
    isShow: [0],
  },
  {
    name: "StudentProfileMyNeedOptions.English",
    value: 4,
    isShow: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  {
    name: "StudentProfileMyNeedOptions.French",
    value: 5,
    isShow: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  {
    name: "StudentProfileMyNeedOptions.EthicsAndReligiousCulture",
    value: 6,
    isShow: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  {
    name: "StudentProfileMyNeedOptions.Mathematical",
    value: 7,
    isShow: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    name: "StudentProfileMyNeedOptions.HistoryAndCitizenshipEducation",
    value: 8,
    isShow: [3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    name: "StudentProfileMyNeedOptions.Geography",
    value: 9,
    isShow: [3, 4, 5, 6, 7, 8],
  },
  {
    name: "StudentProfileMyNeedOptions.ScienceAndTechnology",
    value: 10,
    isShow: [3, 4, 5, 6, 7, 8],
  },
  {
    name: "StudentProfileMyNeedOptions.PreparationForSecondarySchoolEntranceExams",
    value: 11,
    isShow: [5, 6],
  },
  {
    name: "StudentProfileMyNeedOptions.EnglishAsASecondLanguage",
    value: 12,
    isShow: [7, 8, 9, 10, 11],
  },
  {
    name: "StudentProfileMyNeedOptions.FrenchAsASecondLanguage",
    value: 13,
    isShow: [7, 8, 9, 10, 11],
  },
  {
    name: "StudentProfileMyNeedOptions.Spanish",
    value: 14,
    isShow: [8, 9, 10, 11],
  },
  {
    name: "StudentProfileMyNeedOptions.MathematicalCultureSocietyAndTechnologyCST",
    value: 15,
    isShow: [10, 11],
  },
  {
    name: "StudentProfileMyNeedOptions.ScienceAndTechnologyST",
    value: 16,
    isShow: [9, 10],
  },
  {
    name: "StudentProfileMyNeedOptions.ScienceAndTechnologyATS",
    value: 17,
    isShow: [9, 10],
  },
  {
    name: "StudentProfileMyNeedOptions.ScienceAndTechnologySTE",
    value: 18,
    isShow: [10],
  },
  {
    name: "StudentProfileMyNeedOptions.ScienceAndTechnologyATS-SE",
    value: 19,
    isShow: [10],
  },
  {
    name: "StudentProfileMyNeedOptions.MathematicsTechnicalSciencesTS",
    value: 20,
    isShow: [10, 11],
  },
  {
    name: "StudentProfileMyNeedOptions.MathematicsNaturalSciencesSN",
    value: 21,
    isShow: [10, 11],
  },
  {
    name: "StudentProfileMyNeedOptions.HistoryOfQuebecAndCanada",
    value: 22,
    isShow: [10],
  },
  {
    name: "StudentProfileMyNeedOptions.Physical",
    value: 23,
    isShow: [11, 12],
  },
  {
    name: "StudentProfileMyNeedOptions.Chemistry",
    value: 24,
    isShow: [11, 12],
  },
  {
    name: "StudentProfileMyNeedOptions.TheContemporaryWorld",
    value: 25,
    isShow: [11],
  },
  {
    name: "StudentProfileMyNeedOptions.WritingAndLiteratureFrench1",
    value: 26,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.LinearAlgebraAndVectorGeometry",
    value: 27,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.Biology1",
    value: 28,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.AdvancedCalculation",
    value: 29,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.IntegralCalculation",
    value: 30,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.ChemistryOfSolutions",
    value: 31,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.Economy",
    value: 32,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.AdvancedSpanish",
    value: 33,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.IntermediateSpanish",
    value: 34,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.PracticalIntroductionToHumanSciencesMethodology",
    value: 35,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.QuebecliteratureFrench3",
    value: 36,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.QuantitativeMethods",
    value: 37,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.WavesAndModernPhysics",
    value: 38,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.English1",
    value: 39,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.English2",
    value: 40,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.Biology2",
    value: 41,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.DifferentialCalculation",
    value: 42,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.OrganicChemistry",
    value: 43,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.ElectricityAndMagnetism",
    value: 44,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.BeginnerSpanish",
    value: 45,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.EthicsAndPolitics",
    value: 46,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.TheHumanBeingPhilosophy",
    value: 47,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.LiteratureAndImaginationFrench2",
    value: 48,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.Mechanical",
    value: 49,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.AdvancedQuantitativeMethods",
    value: 50,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.QuantitativeMethodsInTheHumanSciences",
    value: 51,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.PhilosophyAndRationality",
    value: 52,
    isShow: [12],
  },
  {
    name: "StudentProfileMyNeedOptions.Statistics",
    value: 53,
    isShow: [12],
  },
];

// frequency options
export const frequencyOptions = [
  {
    name: "StudentProfileMyNeedOptions.OnePerWeek",
    value: 1,
  },
  {
    name: "StudentProfileMyNeedOptions.TwoPerWeek",
    value: 2,
  },
  {
    name: "StudentProfileMyNeedOptions.ThreePerWeek",
    value: 3,
  },
  {
    name: "StudentProfileMyNeedOptions.FourPerWeek",
    value: 4,
  },
  {
    name: "StudentProfileMyNeedOptions.FiveOrMorePerWeek",
    value: 5,
  },
];

// student profile static value
export const userInfoEditStatic = {
  mySchool: false,
  myNeeds: false,
  learningDisabilities: false,
  atSchool: false,
  myPersonality: false,
  interests: false,
  availability: false,
};

export const mySchoolInfoStatic = {
  my_school: "",
  authorization: false,
  teachers: [],
};
export const learningDifficultiesStatic = {
  attention_deficit: 1,
  dyslexia: 1,
  dysortographie: 2,
  dyscalculia: 2,
  dysphasia: 3,
  dyspraxia: 3,
  memory_problems: 3,
  asperger_syndrome: 1,
  autism_spectrum_disorder: 2,
  tourette_syndrome: 3,
};
export const learningDifficultiesFollowedByStatic = {
  remedial_teacher: 1,
  speech_therapist: 2,
  occupational_therapist: 3,
};
export const atSchoolIStatic = {
  demonstrates_ability_to_concentrate: 4,
  motivated_at_school: 1,
  interested_in_school_subjects: 2,
  pay_attention_in_class: 4,
  enjoy_new_challenges: 3,
  expresses_ideas_well: 4,
  class_question_section: 2,
};
export const personalityValuesStatic = {
  shy: 1,
  curious: 1,
  gossipy: 1,
  distracted: 3,
  sociable: 2,
  calme: 2,
  creative: 3,
  senseOfMood: 1,
};
export const interestValuesStatic = {
  sports: 1,
  art: 0,
  music: 0,
  photography: 1,
  video_game: 0,
  reading: 0,
  animals: 0,
  technology: 0,
  movie: 0,
  kitchen: 0,
  journey: 0,
  fashion: 0,
};
export const regularAvailabilityStatic = [
  { monday: ["10:00 to 11:00", "14:00 to 16:00"] },
  { tuesday: ["10:00 to 11:00"] },
  { wednesday: ["10:00 to 11:00"] },
  { thursday: ["10:00 to 11:00"] },
  { friday: ["10:00 to 11:00"] },
  { saturday: ["10:00 to 11:00"] },
  { sunday: ["10:00 to 11:00"] },
];
export const myNeedInfoStatic = {
  matter: [],
  frequency: "",
  duration: "",
  support: false,
  catch_up: false,
  preparing_for_exam: false,
  enrichment: false,
  exam_date: null,
  more_details_on_materials: "",
};

export const atSchoolInAddTeachersDetails = [
  {
    label: "Nom",
    name: "name",
  },
  {
    label: "Email",
    name: "email",
  },
];

export const myNeedInSelectOptionDetails = [
  // {
  //   label: "StudentMyProfile.matter",
  //   name: "matter",
  //   options: myNeedDroupDownOptions,
  // },
  {
    label: "StudentMyProfile.frequency",
    name: "frequency",
    options: frequencyOptions,
  },
  {
    label: "StudentMyProfile.duration",
    name: "duration",
    options: sessionDurections,
  },
];

export const myNeedInfoInCheckBoxWithDetails = [
  {
    id: "support",
    name: "support",
    lable: "StudentMyProfile.support",
    info: [
      "StudentMyProfile.supportOption1",
      "StudentMyProfile.supportOption2",
      "StudentMyProfile.supportOption3",
    ],
  },
  {
    id: "remedial",
    name: "catch_up",
    lable: "StudentMyProfile.catchUp",
    info: ["StudentMyProfile.catchUpList"],
  },
  {
    id: "exam-preparation",
    name: "preparing_for_exam",
    lable: "StudentMyProfile.examPreparation",
    info: [
      "StudentMyProfile.examPreparationList1",
      "StudentMyProfile.examPreparationList2",
    ],
  },
  {
    id: "enrichment",
    name: "enrichment",
    lable: "StudentMyProfile.enrichment",
    info: ["StudentMyProfile.enrichmentList"],
  },
];

export const atSchoolInDetails = [
  {
    id: 1,
    title: "StudentMyProfile.i",
    // subtitale: "",
    info: atSchools,
    // dbName: "",
    valueName: "atSchoolI",
    name: "i",
    options: [
      {
        oName: "StudentMyProfile.often",
        value: 1,
      },
      {
        oName: "StudentMyProfile.inGeneral",
        value: 2,
      },
      {
        oName: "StudentMyProfile.rarely",
        value: 3,
      },
      {
        oName: "StudentMyProfile.never",
        value: 4,
      },
    ],
  },
  {
    id: 2,
    title: "StudentMyProfile.relation",
    // subtitale: "Ma relation avec mon enseignant(e) est",
    info: [
      {
        id: 1,
        name: "relationship_with_teacher",
        label: "StudentMyProfile.relationWithTeacher",
      },
    ],
    valueName: "atSchoolRelation",
    // dbName: "relationship_with_teacher",
    name: "relation",
    options: [
      {
        oName: "StudentMyProfile.excellent",
        value: 1,
      },
      {
        oName: "StudentMyProfile.good",
        value: 2,
      },
      {
        oName: "StudentMyProfile.difficult",
        value: 3,
      },
      {
        oName: "StudentMyProfile.bad",
        value: 4,
      },
    ],
  },
  {
    id: 2,
    title: "StudentMyProfile.situation",
    // subtitale: " Je suis présentement en situation d’échec",
    info: [
      {
        id: 1,
        name: "currently_in_situation_failure",
        label: "StudentMyProfile.currentlyInFailure",
      },
    ],
    valueName: "atSchoolSituation",
    // dbName: "currently_in_situation_failure",
    name: "situation",
    options: [
      {
        oName: "Profile.DifficultiesYes",
        value: 1,
      },
      {
        oName: "Profile.DifficultiesNo",
        value: 2,
      },
    ],
  },
];

export const atSchoolInOnlyShowDetails = [
  {
    tableHeader: [
      {
        widths: "50%",
        title: "StudentMyProfile.iAm",
      },
      {
        widths: "12%",
        title: "StudentMyProfile.often",
      },
      {
        widths: "12%",
        title: "StudentMyProfile.inGeneral",
      },
      {
        widths: "12%",
        title: "StudentMyProfile.rarely",
      },
      {
        widths: "14%",
        title: "StudentMyProfile.never",
      },
    ],
    name: "",
    info: atSchools,
    filedLength: 4,
  },
  {
    tableHeader: [
      {
        widths: "50%",
        title: "StudentMyProfile.relation",
      },
      {
        widths: "12%",
        title: "StudentMyProfile.excellent",
      },
      {
        widths: "12%",
        title: "StudentMyProfile.good",
      },
      {
        widths: "12%",
        title: "StudentMyProfile.difficult",
      },
      {
        widths: "14%",
        title: "StudentMyProfile.bad",
      },
    ],
    name: "relationship_with_teacher",
    info: [
      {
        id: 1,
        name: "demonstrates_ability_to_concentrate",
        label: "StudentMyProfile.relationWithTeacher",
      },
    ],
    filedLength: 4,
  },
  {
    tableHeader: [
      {
        widths: "50%",
        title: "StudentMyProfile.situation",
      },
      {
        widths: "12%",
        title: "Profile.DifficultiesYes",
      },
      {
        widths: "12%",
        title: "Profile.DifficultiesNo",
      },
      {
        widths: "12%",
        title: "",
      },
      {
        widths: "14%",
        title: "",
      },
    ],
    name: "currently_in_situation_failure",
    info: [
      {
        id: 1,
        name: "demonstrates_ability_to_concentrate",
        label: "StudentMyProfile.currentlyInFailure",
      },
    ],
    filedLength: 2,
  },
  // {
  //   tableHeader: [
  //     {
  //       widths: "50%",
  //       title: "StudentMyProfile.subjectForFailure",
  //     },
  //   ],
  //   name: "",
  //   info: [],
  //   filedLength: 0,
  // },
];

// day name
export const allDayUseProfile = {
  monday: "WeekDays.Monday", //monday
  tuesday: "WeekDays.Tuesday",
  wednesday: "WeekDays.Wednesday",
  thursday: "WeekDays.Thursday",
  friday: "WeekDays.Friday",
  saturday: "WeekDays.Saturday",
  sunday: "WeekDays.Sunday",
};

export const ButtonNames = {
  2: {
    "/calendar": "TutorDeshbord.Loremipsum",
    "/dashboard": "TutorDeshbord.TestVirtualClass",
    "/evaluations": "TutorDeshbord.EvalueSS",
    "/payment": "TutorDeshbord.ViewMyInvoice",
  },
  3: {
    "/facturation": "ParentDashboard.PaymentSetting",
    "/evaluations": "TutorDeshbord.EvalueSS",
    "/dashboard": "TutorDeshbord.TestVirtualClass",
    "/calendar": "TutorDeshbord.Loremipsum",
  },
  4: {
    "/evaluations": "TutorDeshbord.EvalueSS",
    "/dashboard": "TutorDeshbord.TestVirtualClass",
    "/calendar": "TutorDeshbord.Loremipsum",
  },
};

export const studentPointes = [
  {
    name: "langauge_score",
    lable: "MatchAllStudents.Language",
  },
  {
    name: "school_level",
    lable: "MatchAllStudents.SchoolingLevel",
  },
  {
    name: "level_lesson",
    lable: "MatchAllStudents.SameLevelLessons",
  },
  {
    name: "same_schedule",
    lable: "MatchAllStudents.AvailabilitySameSchedule",
  },
  {
    name: "length_of_lessons",
    lable: "MatchAllStudents.AvailabilityLengthOfLessons",
  },
  {
    name: "frequency_of_lessons",
    lable: "MatchAllStudents.AvailablityFrequencyoflessons",
  },
  {
    name: "learning_issues",
    lable: "MatchAllStudents.LearningIssues",
  },
  {
    name: "interests",
    lable: "MatchAllStudents.Interests",
  },
  {
    name: "workload_varience",
    lable: "MatchAllStudents.WorkloadVarience",
  },
  {
    name: "tutor_activation_bonus",
    lable: "MatchAllStudents.TutorActivationBonus",
  },
];
