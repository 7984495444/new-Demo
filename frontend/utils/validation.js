import moment from "moment";
import { t } from "i18next";

const emailRegx =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phoneNumberRegx = /^[0-9]{10}$/;
const passwordRegx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const cardNumberRegx = /^\d{16}$/;
// const expDateRegx = /^((0[1-9])|(1[0-2]))[\/\.\-]*((0[8-9])|(1[1-9]))$/;
const expDateRegx = /^((0[1-9])|(1[0-2]))[\/\.\-]*((0[8-9])|(1[1-9]))$/;
const cvvrRegx = /^\d{3}$/;
// const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test("90210");
const isUSAZipCode = (str) => {
  return /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/.test(str);
};
const postalCodeRegex = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;

// login validation
export const validateUserForLogin = (user) => {
  const { email, password } = user;
  const errors = {};
  if (!email) {
    errors.email = t("Login.EmailError");
  } else if (!email.match(emailRegx)) {
    errors.email = t("Login.IsEmailValid");
  }
  if (!password) {
    errors.password = t("Login.PasswordError");
  }
  // else if (
  //   !password.match(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  //   )
  // ) {
  //   errors.password =
  //     "Please minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
  // }
  return errors;
};

// edit user information validation
export const validateEDitUserInfromation = (user) => {
  const {
    first_name,
    last_name,
    phone_no,
    password,
    confrom_password,
    address,
    dob,
    language,
    apartment,
    zip,
    province,
    social_insurance_number,
    school_level,
  } = user;

  const errors = {};
  if (!first_name) {
    errors.first_name = "Please enter first name!";
  }
  if (!last_name) {
    errors.last_name = "Please enter last name!";
  }
  if (!phone_no) {
    errors.phone_no = "Please enter phone number!";
  } else if (!phone_no.match(phoneNumberRegx)) {
    errors.phone_no = "Please enter valid phone number id!";
  }
  if (confrom_password) {
    if (!password) {
      errors.password = "Please enter password";
    } else if (password !== confrom_password) {
      errors.confrom_password = "Please enter valid confirm password";
    }
    // else {
    //     please enter your pass
    // }
  } else if (password) {
    if (!confrom_password) {
      errors.confrom_password = "Please enter confirm password";
    }
    // else {
    //     confirm_password enter your pass
    // }
  }
  // if (!password) {
  //   errors.password = "Please enter password";
  // } else if (password !== confrom_password) {
  //   errors.confrom_password = "Please enter valid password or confrom password";
  // }
  //  else if (!password.match(passwordRegx)) {
  //   errors.password =
  //     "Please minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
  // }
  if (user?.role_id?.id === 2) {
    if (!social_insurance_number) {
      errors.social_insurance_number = "Please enter social insurance number!";
    } else if (social_insurance_number.toString().length !== 9) {
      errors.social_insurance_number =
        "Please enter 9 digit social insurance number!";
    }
  }
  if (!address) {
    errors.address = "Please enter address!";
  }
  if (user?.role_id?.id !== 3) {
    if (!dob) {
      errors.dob = "Please Select Date of Birth!";
    }
  }
  if (user?.role_id?.id !== 2 && language === 0) {
    errors.language = "Please Select language!";
  }
  // if (!apartment) {
  //   errors.apartment = "Please enter apartment name!";
  // }
  if (!zip) {
    errors.zip = "Please enter zip code!";
  }
  //  else if (zip?.length != 6) {
  //   errors.zip = "Please enter valid Zip code! (Ex: 123456)";
  // }
  if (!province) {
    errors.province = "Please enter province!";
  }
  if (user?.role_id?.id === 4) {
    if (!school_level) {
      errors.school_level = "Please enter school level !";
    }
  }
  return errors;
};

// add student in parent validation
export const validateAddStudent = (user) => {
  const { first_name, last_name, email, password } = user;
  const errors = {};

  if (!first_name) {
    errors.first_name = "Please enter first name!";
  }
  if (!last_name) {
    errors.last_name = "Please enter last name!";
  }
  if (!email) {
    errors.email = "Please enter email id!";
  } else if (!email.match(emailRegx)) {
    errors.email = "Please enter valid email id!";
  }
  if (!password) {
    errors.password = "Please enter password!";
  }
  return errors;
};

// add payment card validation
export const addPaymentCardValidations = (user) => {
  const { card_holder_name, card_no, year, month, cvc } = user;
  const errors = {};
  if (!card_holder_name) {
    errors.card_holder_name = "Please enter first name!";
  }
  if (!card_no) {
    errors.card_no = "Please enter card number!";
  } else if (!card_no.match(cardNumberRegx)) {
    errors.card_no = "Please enter valid card number!";
  }
  if (!month) {
    errors.month = "Please select month!";
  }
  if (!year) {
    errors.year = "Please select year!";
  }
  // if (!exp_date) {
  //   errors.exp_date = "Please enter exprid date!";
  // } else if (
  //   moment(exp_date).format("DD/MM/YY") < moment().format("DD/MM/YY")
  // ) {
  //   errors.exp_date = "Please enter valid exprid date!";
  // }
  if (!cvc) {
    errors.cvc = "Please enter cvc!";
  } else if (!cvc.match(cvvrRegx)) {
    errors.cvc = "Please enter valid cvc!";
  }
  return errors;
};

// edit payment card validation
export const editPaymentCardValidations = (user) => {
  const { card_holder_name, exp_date, year, month } = user;
  const errors = {};

  if (!card_holder_name) {
    errors.card_holder_name = "Please enter first name!";
  }
  if (!month) {
    errors.month = "Please select month!";
  }
  if (!year) {
    errors.year = "Please select year!";
  }
  // if (!exp_date) {
  //   errors.exp_date = "Please enter exprid date!";
  // } else if (
  //   moment(exp_date).format("DD/MM/YY") < moment().format("DD/MM/YY")
  // ) {
  //   errors.exp_date = "Please enter valid exprid date!";
  // }
  return errors;
};

// add/edit Session validation
export const addSessionValidation = (data, isEditingSession, userData) => {
  const { date, hour, student, duration, subject, reason, description } = data;
  const errors = {};

  if (!date) {
    errors.date = "NewSessionError.DateError";
  }
  if (!hour) {
    errors.hour = "NewSessionError.HourError";
  }
  if (!student) {
    errors.student = `${
      userData?.role_id?.id === 4
        ? "NewSessionError.TutorError"
        : "NewSessionError.StudentError"
    }`;
  }
  if (!duration) {
    errors.duration = "NewSessionError.DurationError";
  }
  if (!subject) {
    errors.subject = "NewSessionError.SubjectError";
  }

  if (isEditingSession) {
    if (!reason) {
      errors.reason = "Please select reason!";
    }
    // if (!description) {
    //   errors.description = "Please enter description!";
    // }
  }

  return errors;
};

// tutor profile report submit
export const tutorProfileSubmitValidations = (user) => {
  const {
    grade,
    subjects,
    is_attentive,
    does_homework,
    is_motivated,
    is_organized,
    brings_equipment,
    ask_questions,
    respect_schedule,
    no_of_meeting,
    length_of_session,
    concentration_level_duration,
    session_duration_suggestion,
    progress_of_student,
    points_to_work,
  } = user;
  const errors = {};
  if (!grade) {
    errors.grade = "Please select grade!";
  }
  if (!subjects) {
    errors.subjects = "Please select subjects!";
  }
  if (!is_attentive) {
    errors.is_attentive = "Please select is attentive!";
  }
  if (!does_homework) {
    errors.does_homework = "Please select homework!";
  }
  if (!is_motivated) {
    errors.is_motivated = "Please select motivated!";
  }
  if (!is_organized) {
    errors.is_organized = "Please select organized!";
  }
  if (!brings_equipment) {
    errors.brings_equipment = "Please select brings equipment!";
  }
  if (!ask_questions) {
    errors.ask_questions = "Please select ask questions!";
  }
  if (!respect_schedule) {
    errors.respect_schedule = "Please select respect schedule!";
  }
  if (!no_of_meeting) {
    errors.no_of_meeting = "Please select no of the meeting!";
  }
  if (!length_of_session) {
    errors.length_of_session = "Please select length of session!";
  }
  if (!concentration_level_duration) {
    errors.concentration_level_duration =
      "Please select concentration level duration!";
  }
  if (!session_duration_suggestion) {
    errors.session_duration_suggestion =
      "Please select session duration suggestion!";
  }
  if (!progress_of_student) {
    errors.progress_of_student = "Please select progress of student!";
  }
  if (!points_to_work) {
    errors.points_to_work = "Please select points to work!";
  }
  return errors;
};

// student and parent  profile report submit
export const studentAndParentEvaluationsPageValidations = (user, isParent) => {
  const {
    general_appreciation,
    assessment_accessible,
    good_bond,
    pleasant_climate,
    attentive_tutor,
    comfortable_subject,
    informed_progress,
    useful_suggestions,
    well_prepared,
    punctual_tutor,
    general_comments,
  } = user;
  const errors = {};
  if (!general_appreciation) {
    errors.general_appreciation =
      "Veuillez sélectionner l'option qui correspond le mieux à cette option";
  }
  if (!assessment_accessible) {
    errors.assessment_accessible =
      "Veuillez sélectionner l'option qui correspond le mieux à cette option";
  }
  if (!good_bond) {
    errors.good_bond =
      "Veuillez sélectionner l'option qui correspond le mieux à cette option";
  }
  if (!pleasant_climate) {
    errors.pleasant_climate =
      "Veuillez sélectionner l'option qui correspond le mieux à cette option";
  }
  if (!attentive_tutor) {
    errors.attentive_tutor =
      "Veuillez sélectionner l'option qui correspond le mieux à cette option";
  }
  if (!comfortable_subject) {
    errors.comfortable_subject =
      "Veuillez sélectionner l'option qui correspond le mieux à cette option";
  }
  if (!informed_progress) {
    errors.informed_progress =
      "Veuillez sélectionner l'option qui correspond le mieux à cette option";
  }
  if (!useful_suggestions) {
    errors.useful_suggestions =
      "Veuillez sélectionner l'option qui correspond le mieux à cette option";
  }
  if (!well_prepared) {
    errors.well_prepared =
      "Veuillez sélectionner l'option qui correspond le mieux à cette option";
  }
  if (!punctual_tutor) {
    errors.punctual_tutor =
      "Veuillez sélectionner l'option qui correspond le mieux à cette option";
  }
  // if (!general_comments) {
  //   errors.general_comments = "Please select general comments!";
  // }
  return errors;
};

// rating users
export const ratingUserPageValidations = (user) => {
  const {
    grades,
    motivation,
    self_esteem,
    recommend_school,
    general_comments,
  } = user;
  const errors = {};
  if (!grades) {
    errors.grades = "Please select grade improvement!";
  }
  if (!motivation) {
    errors.motivation = "Please select positive effect on motivation!";
  }
  if (!self_esteem) {
    errors.self_esteem = "Please select positive effect on self esteem!";
  }
  if (!recommend_school) {
    errors.recommend_school = "Please select recommend school success!";
  }
  if (!general_comments) {
    errors.general_comments = "Please select general comments!";
  }

  return errors;
};

//tutor  in document back information validation
export const backAccountInfoVlidations = (info) => {
  const { transit_no, institution_no, account_no } = info;
  const errors = {};
  if (!transit_no) {
    errors.transit_no = "Veuillez entrer N. de Transit";
  } else if (transit_no.toString().length !== 5) {
    errors.transit_no = "Veuillez entrer le nombre exact pour ce champ";
  }
  if (!institution_no) {
    errors.institution_no = "Veuillez entrer N. d’ínstitution";
  } else if (institution_no.toString().length !== 3) {
    errors.institution_no = "Veuillez entrer le nombre exact pour ce champ";
  }
  if (!account_no) {
    errors.account_no = "Veuillez entrer N. de compte";
  } else if (
    account_no.toString().length < 6 ||
    account_no.toString().length >= 14
  ) {
    errors.account_no = "Veuillez entrer le nombre exact pour ce champ";
  }
  return errors;
};

// student profile in my need in
export const StudentProfileInMyNeedVlidations = (info) => {
  const { exam_date, more_details_on_materials } = info;
  const errors = {};
  if (!exam_date) {
    errors.exam_date = "please select exam date";
  }
  if (!more_details_on_materials) {
    errors.more_details_on_materials =
      "please add more details on the material covered in the exam";
  }
  return errors;
};
