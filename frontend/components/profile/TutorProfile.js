import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { languageOptions, learningDifficultiesList } from "@/utils/data";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserProfileAction,
  getUserProfileAction,
} from "@/redux/actions/userAction";
import TutorDetails from "./tutorProfile/TutorDetails";
import WitchUserDetails from "./tutorProfile/WitchUserDetails";
import {
  EducationDetails,
  ExperienceProfessional,
  InterestsDetails,
  LevelAndSubjectDeatils,
  MasterylevelDeatils,
  PersonalityDetail,
  StudentExperienceDetails,
  TutorAvailabilityDetails,
  TutorExperienceDetails,
} from "..";
import { getAllSchoolLevelSubjectsAction } from "@/redux/actions/schoolLevelAction";
import { t } from "i18next";

const TutorProfile = ({ userData, isEditable }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfileAction(userData?.id));
    dispatch(getAllSchoolLevelSubjectsAction());
  }, []);

  const { getUserProfileData } = useSelector((state) => state.user);
  const { getAllSchoolLevelSubject } = useSelector(
    (state) => state.schoolLevel
  );
  useEffect(() => {
    if (getUserProfileData) {
      //Setting All the Values
      setNoOfStudents(getUserProfileData?.no_of_students);
      setTutorStudentLength(getUserProfileData?.tutor_student);
      setLanguage(getUserProfileData?.language);
      setWhoIAm(getUserProfileData?.who_am_i);
      setRegularAvailability(getUserProfileData?.regular_availability);
      setSpecialAvailability(getUserProfileData?.special_availability);
      setLearningDifficulties(getUserProfileData?.difficulties);
      setPersonalityValues(getUserProfileData?.personality);
      setInterestValues(getUserProfileData?.interests);
      setEducationValues(getUserProfileData?.education);
      setProfessionalExperienceValues(
        getUserProfileData?.professional_experience
      );
      setTutoringExperiences(getUserProfileData?.tutoring_experience);
      setExperiencesWithChildren(getUserProfileData?.experiences_with_children);
      setLevelsAndSubjectInfo(getUserProfileData?.levels_and_subjects);
    }
  }, [getUserProfileData]);

  // //////////////////////
  const [userInfoEdit, setUserInfoEdit] = useState({
    userInfo: false,
    userDetails: false,
    availability: false,
    levelsAndSubjectsTaught: false,
    masteryOfLearningDifficulties: false,
    myPersonality: false,
    interests: false,
    education: false,
    professionalExperiences: false,
    tutoringExperiencesField: false,
    experiencesWithChildrenField: false,
  });

  // ////////////////////////////////////////////////

  const [unsavedChanges, setUnsavedChanges] = useState({});
  const [previouslyUpadtedSection, setPreviouslyUpadtedSection] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const [noOfStudents, setNoOfStudents] = useState(0);
  const [tutorStudentLength, setTutorStudentLength] = useState(0);
  const [language, setLanguage] = useState(1);
  const [showlanguage, setShowlanguage] = useState();

  const [whoIAm, setWhoIAm] = useState("");
  const [regularAvailability, setRegularAvailability] = useState([
    { monday: [] },
    { tuesday: [] },
    { wednesday: [] },
    { thursday: [] },
    { friday: [] },
    { saturday: [] },
    { sunday: [] },
  ]);

  const [specialAvailability, setSpecialAvailability] = useState({
    status: false,
    start_date: "",
    end_date: "",
    weekDays: [
      { monday: [] },
      { tuesday: [] },
      { wednesday: [] },
      { thursday: [] },
      { friday: [] },
      { saturday: [] },
      { sunday: [] },
    ],
  });
  const [learningDifficulties, setLearningDifficulties] = useState({
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
  });
  const [managingLearningDifficulties, setManagingLearningDifficulties] =
    useState(learningDifficultiesList);
  const [newLearningDifficulty, setNewLearningDifficulty] = useState("");

  const [personalityValues, setPersonalityValues] = useState({
    shy: 1,
    curious: 1,
    gossipy: 1,
    distracted: 3,
    sociable: 2,
    calme: 2,
    creative: 3,
    senseOfMood: 1,
  });

  const [interestValues, setInterestValues] = useState({
    sports: 0,
    art: 0,
    music: 0,
    photography: 0,
    video_game: 0,
    reading: 0,
    animals: 0,
    technology: 0,
    movie: 1,
    kitchen: 0,
    journey: 0,
    fashion: 0,
  });

  const [educationValues, setEducationValues] = useState([]);
  const [professionalExperienceValues, setProfessionalExperienceValues] =
    useState([]);
  const [educationFormData, setEducationFormData] = useState({
    job_title: "",
    school_name: "",
    joining_date: "",
    end_date: "",
  });
  const [professionalExperienceFormData, setProfessionalExperienceFormData] =
    useState({
      experience_title: "",
      institution: "",
      joining_date: "",
      end_date: "",
    });

  const [tutoringExperiences, setTutoringExperiences] = useState("");
  const [experiencesWithChildren, setExperiencesWithChildren] = useState("");

  const [levelsAndSubjectInfo, setLevelsAndSubjectInfo] = useState({
    Cegep: [],
    primary: {
      "1st year": [],
      "2nd year": [],
      "3rd year": [],
      "4th year": [],
      "5th year": [],
      "6th year": [],
    },
    secondary: {
      "Secondary 1": [],
      "Secondary 2": [],
      "Secondary 3": [],
      "Secondary 4": [],
      "Secondary 5": [],
    },
    Kindergarten: [],
  });

  // to set default language
  useEffect(() => {
    selectLanguage(language);
  }, [language]);

  const userInfoSaveHandle = (field, e) => {
    setIsSaved(true);
    switch (field) {
      case "userInfo":
        {
          let temp = { language: language, noOfStudents: noOfStudents };
          setUnsavedChanges({ ...unsavedChanges, ...temp });
        }
        break;

      case "userDetails":
        {
          let temp = { whoIAm: whoIAm };
          setUnsavedChanges({ ...unsavedChanges, ...temp });
        }
        break;

      case "availability":
        removeEmptyTimeSlots();
        removeEmptySpecialTimeSlots();
        {
          let temp = {
            regularAvailability: regularAvailability,
            specialAvailability: specialAvailability,
          };
          setUnsavedChanges({ ...unsavedChanges, ...temp });
        }
        break;

      case "levelsAndSubjectsTaught":
        {
          let temp = { levelsAndSubjectInfo: levelsAndSubjectInfo };
          setUnsavedChanges({ ...unsavedChanges, ...temp });
        }
        break;

      case "masteryOfLearningDifficulties":
        {
          let temp = { learningDifficulties: learningDifficulties };
          setUnsavedChanges({ ...unsavedChanges, ...temp });
        }
        break;

      case "myPersonality":
        {
          let temp = { personalityValues: personalityValues };
          setUnsavedChanges({ ...unsavedChanges, ...temp });
        }
        break;

      case "interests":
        {
          let temp = { interestValues: interestValues };
          setUnsavedChanges({ ...unsavedChanges, ...temp });
        }
        break;

      case "education":
        {
          let temp = { educationValues: educationValues };
          setUnsavedChanges({ ...unsavedChanges, ...temp });
        }
        break;

      case "professionalExperiences":
        {
          let temp = {
            professionalExperienceValues: professionalExperienceValues,
          };
          setUnsavedChanges({ ...unsavedChanges, ...temp });
        }
        break;

      case "tutoringExperiencesField":
        {
          let temp = { tutoringExperiences: tutoringExperiences };
          setUnsavedChanges({ ...unsavedChanges, ...temp });
        }
        break;

      case "experiencesWithChildrenField":
        {
          let temp = { experiencesWithChildren: experiencesWithChildren };
          setUnsavedChanges({ ...unsavedChanges, ...temp });
        }
        break;

      default:
        break;
    }

    let fields = {
      who_am_i: whoIAm,
      regular_availability: regularAvailability,
      special_availability: specialAvailability,
      levels_and_subjects: levelsAndSubjectInfo,
      difficulties: learningDifficulties,
      personality: personalityValues,
      interests: interestValues,
      education: educationValues,
      professional_experience: professionalExperienceValues,
      tutoring_experience: tutoringExperiences,
      experiences_with_children: experiencesWithChildren,
      no_of_students: parseInt(noOfStudents),
      language: language,
    };
    dispatch(editUserProfileAction(userData?.id, fields));

    userInfoEditViewHandle(field);
  };
  const userInfoDiscardHandle = (field) => {
    setIsSaved(false);
    unsavedChangesReset(field);
    let temp = {};
    setUnsavedChanges(temp);
    userInfoEditViewHandle(field, false);
  };
  const userInfoEditHandle = (field) => {
    let tempField = {};
    tempField[field] = field;
    switch (field) {
      case "userInfo":
        {
          let temp = { language: language, noOfStudents: noOfStudents };
          setUnsavedChanges({ ...unsavedChanges, ...temp, ...tempField });
        }
        break;

      case "userDetails":
        {
          let temp = { whoIAm: whoIAm };
          setUnsavedChanges({ ...unsavedChanges, ...temp, ...tempField });
        }
        break;

      case "availability":
        {
          removeEmptyTimeSlots();
          removeEmptySpecialTimeSlots();
          let temp = {
            regularAvailability: regularAvailability,
            specialAvailability: specialAvailability,
          };
          setUnsavedChanges({ ...unsavedChanges, ...temp, ...tempField });
        }
        break;

      case "levelsAndSubjectsTaught":
        {
          let temp = { levelsAndSubjectInfo: levelsAndSubjectInfo };
          setUnsavedChanges({ ...unsavedChanges, ...temp, ...tempField });
        }
        break;

      case "masteryOfLearningDifficulties":
        {
          let temp = { learningDifficulties: learningDifficulties };
          setUnsavedChanges({ ...unsavedChanges, ...temp, ...tempField });
        }
        break;

      case "myPersonality":
        {
          let temp = { personalityValues: personalityValues };
          setUnsavedChanges({ ...unsavedChanges, ...temp, ...tempField });
        }
        break;

      case "interests":
        {
          let temp = { interestValues: interestValues };
          setUnsavedChanges({ ...unsavedChanges, ...temp, ...tempField });
        }
        break;

      case "education":
        {
          let temp = { educationValues: educationValues };
          setUnsavedChanges({ ...unsavedChanges, ...temp, ...tempField });
        }
        break;

      case "professionalExperiences":
        {
          let temp = {
            professionalExperienceValues: professionalExperienceValues,
          };
          setUnsavedChanges({ ...unsavedChanges, ...temp, ...tempField });
        }
        break;

      case "tutoringExperiencesField":
        {
          let temp = { tutoringExperiences: tutoringExperiences };
          setUnsavedChanges({ ...unsavedChanges, ...temp, ...tempField });
        }
        break;

      case "experiencesWithChildrenField":
        {
          let temp = { experiencesWithChildren: experiencesWithChildren };
          setUnsavedChanges({ ...unsavedChanges, ...temp, ...tempField });
        }
        break;

      default:
        break;
    }
    userInfoEditViewHandle(field, true);
    setPreviouslyUpadtedSection(field);
  };

  const unsavedChangesReset = (field) => {
    switch (field) {
      case "userInfo":
        {
          setLanguage(unsavedChanges.language);
          setNoOfStudents(unsavedChanges.noOfStudents);
        }
        break;

      case "userDetails":
        {
          setWhoIAm(unsavedChanges.whoIAm);
        }
        break;

      case "availability":
        {
          removeEmptyTimeSlots();
          removeEmptySpecialTimeSlots();
          setRegularAvailability(unsavedChanges.regularAvailability);
          setSpecialAvailability(unsavedChanges.specialAvailability);
        }
        break;

      case "levelsAndSubjectsTaught":
        {
          setLevelsAndSubjectInfo(unsavedChanges.levelsAndSubjectInfo);
        }
        break;

      case "masteryOfLearningDifficulties":
        {
          setLearningDifficulties(unsavedChanges.learningDifficulties);
        }
        break;

      case "myPersonality":
        {
          setPersonalityValues(unsavedChanges.personalityValues);
        }
        break;

      case "interests":
        {
          setInterestValues(unsavedChanges.interestValues);
        }
        break;

      case "education":
        {
          setEducationValues(unsavedChanges.educationValues);
        }
        break;

      case "professionalExperiences":
        {
          setProfessionalExperienceValues(
            unsavedChanges.professionalExperienceValues
          );
        }
        break;

      case "tutoringExperiencesField":
        {
          setTutoringExperiences(unsavedChanges.tutoringExperiences);
        }
        break;

      case "experiencesWithChildrenField":
        {
          setExperiencesWithChildren(unsavedChanges.experiencesWithChildren);
        }
        break;

      default:
        break;
    }
  };
  ///////////////////////////////////////////////////

  const userInfoEditViewHandle = (val, reset) => {
    const updatedUserInfoEdit = {};

    for (const key in userInfoEdit) {
      if (Object.hasOwnProperty.call(userInfoEdit, key)) {
        updatedUserInfoEdit[key] = key === val ? !userInfoEdit[key] : false;
      }
    }
    if (unsavedChanges.hasOwnProperty(previouslyUpadtedSection) && reset) {
      unsavedChangesReset(previouslyUpadtedSection);
    }
    setUserInfoEdit(updatedUserInfoEdit);
  };

  // to show languange
  const selectLanguage = (val) => {
    val = parseInt(val);
    setLanguage(val);
    if (val === 1) {
      setShowlanguage(languageOptions.find((option) => option.val === 1).label);
    } else if (val === 2) {
      setShowlanguage(languageOptions.find((option) => option.val === 2).label);
    } else if (val === 3) {
      // If language is 3, return a combination of labels
      // const selectedLanguages = languageOptions
      //   .filter((option) => [1, 2].includes(option.val))
      //   .map((option) => option.label);
      // setShowlanguage(selectedLanguages.join(", "));
      setShowlanguage(languageOptions.find((option) => option.val === 3).label);
    }
  };
  // for reguler availability
  const handleSelectChange = (dayIndex, timeIndex, selectedTime) => {
    const updatedAvailability = [...regularAvailability];
    updatedAvailability[dayIndex][
      Object.keys(updatedAvailability[dayIndex])[0]
    ][timeIndex] = selectedTime;
    setRegularAvailability(updatedAvailability);
  };
  const handleAddRow = (dayOfWeek) => {
    const dayIndex = regularAvailability.findIndex(
      (day) => Object.keys(day)[0] === dayOfWeek
    );
    if (dayIndex !== -1) {
      const updatedAvailability = [...regularAvailability];
      updatedAvailability[dayIndex][dayOfWeek].push("");
      setRegularAvailability(updatedAvailability);
    }
  };
  const removeEmptyTimeSlots = () => {
    const updatedAvailability = [...regularAvailability];

    updatedAvailability.forEach((day) => {
      for (const key in day) {
        if (Object.hasOwnProperty.call(day, key)) {
          day[key] = day[key].filter((timeSlot) => timeSlot !== "");
        }
      }
    });

    setRegularAvailability(updatedAvailability);
  };
  const removeRegularTimeSlot = (dayIndex, timeIndex) => {
    const updatedRegularAvailability = [...regularAvailability];
    const dayOfWeek = Object.keys(updatedRegularAvailability[dayIndex])[0];
    updatedRegularAvailability[dayIndex][dayOfWeek].splice(timeIndex, 1);
    setRegularAvailability(updatedRegularAvailability);
  };

  // for special availability
  const handleStartDateChange = (date) => {
    setSpecialAvailability({ ...specialAvailability, start_date: date[0] });
  };

  const handleEndDateChange = (date) => {
    setSpecialAvailability({ ...specialAvailability, end_date: date[0] });
  };

  const toggleStatus = () => {
    setSpecialAvailability({
      ...specialAvailability,
      status: !specialAvailability.status,
    });
  };

  const handleAddTimeSlot = (dayIndex) => {
    const updatedWeekDays = [...specialAvailability.weekDays];
    const dayOfWeek = Object.keys(updatedWeekDays[dayIndex])[0];
    updatedWeekDays[dayIndex][dayOfWeek].push("");
    setSpecialAvailability({
      ...specialAvailability,
      weekDays: updatedWeekDays,
    });
  };

  const handleTimeSlotChange = (dayIndex, timeIndex, selectedTime) => {
    const updatedWeekDays = [...specialAvailability.weekDays];
    const dayOfWeek = Object.keys(updatedWeekDays[dayIndex])[0];
    updatedWeekDays[dayIndex][dayOfWeek][timeIndex] = selectedTime;
    setSpecialAvailability({
      ...specialAvailability,
      weekDays: updatedWeekDays,
    });
  };
  const removeEmptySpecialTimeSlots = () => {
    const updatedWeekDays = [...specialAvailability.weekDays];
    updatedWeekDays.forEach((day) => {
      for (const key in day) {
        if (Object.hasOwnProperty.call(day, key)) {
          day[key] = day[key].filter((timeSlot) => timeSlot !== "");
        }
      }
    });

    setSpecialAvailability({
      ...specialAvailability,
      weekDays: updatedWeekDays,
    });
  };
  const removeTimeSlot = (dayIndex, timeIndex) => {
    const updatedWeekDays = [...specialAvailability.weekDays];
    const dayOfWeek = Object.keys(updatedWeekDays[dayIndex])[0];
    updatedWeekDays[dayIndex][dayOfWeek].splice(timeIndex, 1);
    const updatedSpecialAvailability = {
      ...specialAvailability,
      weekDays: updatedWeekDays,
    };
    setSpecialAvailability(updatedSpecialAvailability);
  };

  // for handeling 'learning Difficulty' section
  const difficultiesOnChangeHandle = (filed, value) => {
    setLearningDifficulties({
      ...learningDifficulties,
      [filed]: value,
    });
  };
  const addLearningDifficulty = () => {
    if (newLearningDifficulty.trim() !== "") {
      setLearningDifficulties({
        ...learningDifficulties,
        [newLearningDifficulty]: 1, // Set the default value here
      });
      // Add the new learning difficulty to the managingLearningDifficulties array
      setManagingLearningDifficulties([
        ...managingLearningDifficulties,
        {
          name: newLearningDifficulty,
          label: newLearningDifficulty,
        },
      ]);
      setNewLearningDifficulty("");
    }
  };

  // 'personality' section
  const handlePersonalityChange = (field, value) => {
    setPersonalityValues({
      ...personalityValues,
      [field]: value,
    });
  };

  // 'interests' section
  // Function to handle checkbox changes
  const handleCheckboxChange = (interest) => {
    setInterestValues((prevValues) => ({
      ...prevValues,
      [interest]: prevValues[interest] === 0 ? 1 : 0, // Toggle between 0 and 1
    }));
  };

  // 'Education' section
  const handleEducationChange = (name, value) => {
    setEducationFormData({ ...educationFormData, [name]: value });
  };

  const handleEducationSubmit = () => {
    if (
      educationFormData.job_title.trim() === "" ||
      educationFormData.school_name.trim() === "" ||
      educationFormData.joining_date === "" ||
      educationFormData.end_date === ""
    ) {
      // Handle validation or show an error message here
      return;
    }

    // Append the new education entry to the state
    setEducationValues([...educationValues, educationFormData]);

    // Clear the form fields
    setEducationFormData({
      job_title: "",
      school_name: "",
      joining_date: "",
      end_date: "",
    });
  };

  const handleDeleteEducation = (index) => {
    // Remove an education item from the state based on its index
    const updatedEducation = [...educationValues];
    updatedEducation.splice(index, 1);
    setEducationValues(updatedEducation);
  };

  // 'Professional Experience' section
  const handleProfessionalExperienceChange = (name, value) => {
    setProfessionalExperienceFormData({
      ...professionalExperienceFormData,
      [name]: value,
    });
  };

  const handleProfessionalExperienceSubmit = () => {
    if (
      professionalExperienceFormData.experience_title.trim() === "" ||
      professionalExperienceFormData.institution.trim() === "" ||
      professionalExperienceFormData.joining_date === "" ||
      professionalExperienceFormData.end_date === ""
    ) {
      // Handle validation or show an error message here
      return;
    }

    // Append the new education entry to the state
    setProfessionalExperienceValues([
      ...professionalExperienceValues,
      professionalExperienceFormData,
    ]);

    // Clear the form fields
    setProfessionalExperienceFormData({
      experience_title: "",
      institution: "",
      joining_date: "",
      end_date: "",
    });
  };

  const handleDeleteProfessionalExperience = (index) => {
    // Remove an education item from the state based on its index
    const updatedEducation = [...professionalExperienceValues];
    updatedEducation.splice(index, 1);
    setProfessionalExperienceValues(updatedEducation);
  };

  // levels and subject onChange handle
  const levelsAndSubjectInfoOnChangeHandle = (type, value, editObject) => {
    if (type === "Kindergarten" && value !== "- Selectionner -") {
      if (!levelsAndSubjectInfo?.Kindergarten.includes(value)) {
        setLevelsAndSubjectInfo({
          ...levelsAndSubjectInfo,
          Kindergarten: [...levelsAndSubjectInfo.Kindergarten, value],
        });
      }
    } else if (type === "Cegep" && value !== "- Selectionner -") {
      if (!levelsAndSubjectInfo.Cegep.includes(value)) {
        setLevelsAndSubjectInfo({
          ...levelsAndSubjectInfo,
          Cegep: [...levelsAndSubjectInfo.Cegep, value],
        });
      }
    } else if (value !== "- Selectionner -") {
      let data = levelsAndSubjectInfo[type][editObject];
      if (!data.includes(value)) {
        setLevelsAndSubjectInfo({
          ...levelsAndSubjectInfo,
          [type]: {
            ...levelsAndSubjectInfo[type],
            [editObject]: [...data, value],
          },
        });
      }
    }
  };

  // levels and subject onChange handle
  const levelsAndSubjectDeleteElementHandle = (
    type,
    indexToRemove,
    editObject
  ) => {
    if (type === "Kindergarten") {
      const newArray = levelsAndSubjectInfo?.Kindergarten?.filter(
        (val, index) => val !== indexToRemove
      );
      setLevelsAndSubjectInfo({
        ...levelsAndSubjectInfo,
        Kindergarten: newArray,
      });
    } else if (type === "Cegep") {
      const newArray = levelsAndSubjectInfo?.Cegep?.filter(
        (val, index) => val !== indexToRemove
      );
      setLevelsAndSubjectInfo({
        ...levelsAndSubjectInfo,
        Cegep: newArray,
      });
    } else {
      const newArray = levelsAndSubjectInfo[type][editObject]?.filter(
        (val, index) => val !== indexToRemove
      );
      setLevelsAndSubjectInfo({
        ...levelsAndSubjectInfo,
        [type]: {
          ...levelsAndSubjectInfo[type],
          [editObject]: newArray,
        },
      });
    }
  };

  return (
    <>
      <TutorDetails
        userData={userData}
        userInfoEdit={userInfoEdit}
        language={language}
        selectLanguage={selectLanguage}
        noOfStudents={noOfStudents}
        tutorStudentLength={tutorStudentLength}
        setNoOfStudents={setNoOfStudents}
        userInfoSaveHandle={(e, t) => userInfoSaveHandle(e, t)}
        userInfoDiscardHandle={(e) => userInfoDiscardHandle(e)}
        showlanguage={showlanguage}
        isEditable={isEditable}
        userInfoEditHandle={(e) => userInfoEditHandle(e)}
      />
      <Card className="mt-4">
        <CardBody className="vstack gap-10 pb-8">
          <WitchUserDetails
            userInfoEdit={userInfoEdit}
            whoIAm={whoIAm}
            setWhoIAm={setWhoIAm}
            userInfoSaveHandle={(e, t) => userInfoSaveHandle(e, t)}
            userInfoDiscardHandle={(e) => userInfoDiscardHandle(e)}
            isEditable={isEditable}
            userInfoEditHandle={(e) => userInfoEditHandle(e)}
          />
          <TutorAvailabilityDetails
            userInfoEdit={userInfoEdit}
            regularAvailability={regularAvailability}
            handleSelectChange={(d, t, s1) => handleSelectChange(d, t, s1)}
            removeRegularTimeSlot={(d, t) => removeRegularTimeSlot(d, t)}
            handleAddRow={(d) => handleAddRow(d)}
            specialAvailability={specialAvailability}
            toggleStatus={() => toggleStatus()}
            handleStartDateChange={(d) => handleStartDateChange(d)}
            handleEndDateChange={(d) => handleEndDateChange(d)}
            handleTimeSlotChange={(s, t, s1) => handleTimeSlotChange(s, t, s1)}
            removeTimeSlot={(d, t) => removeTimeSlot(d, t)}
            handleAddTimeSlot={(d) => handleAddTimeSlot(d)}
            userInfoSaveHandle={(e, t) => userInfoSaveHandle(e, t)}
            userInfoDiscardHandle={(e) => userInfoDiscardHandle(e)}
            isEditable={isEditable}
            userInfoEditHandle={(e) => userInfoEditHandle(e)}
          />
          {getAllSchoolLevelSubject && (
            <LevelAndSubjectDeatils
              userInfoEdit={userInfoEdit}
              levelsAndSubjectInfoOnChangeHandle={(t, v, s) =>
                levelsAndSubjectInfoOnChangeHandle(t, v, s)
              }
              levelsAndSubjectInfo={levelsAndSubjectInfo}
              levelsAndSubjectDeleteElementHandle={(t, e, i) =>
                levelsAndSubjectDeleteElementHandle(t, e, i)
              }
              userInfoSaveHandle={(e, t) => userInfoSaveHandle(e, t)}
              userInfoDiscardHandle={(e) => userInfoDiscardHandle(e)}
              isEditable={isEditable}
              userInfoEditHandle={(e) => userInfoEditHandle(e)}
              getAllSchoolLevelSubject={getAllSchoolLevelSubject}
            />
          )}
          <MasterylevelDeatils
            userInfoEdit={userInfoEdit}
            managingLearningDifficulties={managingLearningDifficulties}
            difficultiesOnChangeHandle={(f, v) =>
              difficultiesOnChangeHandle(f, v)
            }
            learningDifficulties={learningDifficulties}
            newLearningDifficulty={newLearningDifficulty}
            setNewLearningDifficulty={setNewLearningDifficulty}
            addLearningDifficulty={() => addLearningDifficulty()}
            userInfoSaveHandle={(e, t) => userInfoSaveHandle(e, t)}
            userInfoEditViewHandle={(e, v) => userInfoEditViewHandle(e, v)}
            isEditable={isEditable}
            userInfoEditHandle={(e) => userInfoEditHandle(e)}
          />
          <PersonalityDetail
            userInfoEdit={userInfoEdit}
            handlePersonalityChange={(f, v) => handlePersonalityChange(f, v)}
            personalityValues={personalityValues}
            userInfoSaveHandle={(e, t) => userInfoSaveHandle(e, t)}
            userInfoDiscardHandle={(e) => userInfoDiscardHandle(e)}
            isEditable={isEditable}
            userInfoEditHandle={(e) => userInfoEditHandle(e)}
          />
          <InterestsDetails
            userInfoEdit={userInfoEdit}
            interestValues={interestValues}
            handleCheckboxChange={(e) => handleCheckboxChange(e)}
            userInfoSaveHandle={(e, t) => userInfoSaveHandle(e, t)}
            userInfoDiscardHandle={(e) => userInfoDiscardHandle(e)}
            isEditable={isEditable}
            userInfoEditHandle={(e) => userInfoEditHandle(e)}
          />
          <EducationDetails
            userInfoEdit={userInfoEdit}
            educationFormData={educationFormData}
            handleEducationChange={(n, v) => handleEducationChange(n, v)}
            educationValues={educationValues}
            handleDeleteEducation={(i) => handleDeleteEducation(i)}
            userInfoSaveHandle={(e, t) => userInfoSaveHandle(e, t)}
            userInfoDiscardHandle={(e) => userInfoDiscardHandle(e)}
            handleEducationSubmit={() => handleEducationSubmit()}
            isEditable={isEditable}
            userInfoEditHandle={(e) => userInfoEditHandle(e)}
          />
          <ExperienceProfessional
            userInfoEdit={userInfoEdit}
            userInfoSaveHandle={(e, t) => userInfoSaveHandle(e, t)}
            userInfoDiscardHandle={(e) => userInfoDiscardHandle(e)}
            professionalExperienceFormData={professionalExperienceFormData}
            handleProfessionalExperienceChange={(n, v) =>
              handleProfessionalExperienceChange(n, v)
            }
            professionalExperienceValues={professionalExperienceValues}
            handleProfessionalExperienceSubmit={
              handleProfessionalExperienceSubmit
            }
            handleDeleteProfessionalExperience={(e) =>
              handleDeleteProfessionalExperience(e)
            }
            isEditable={isEditable}
            userInfoEditHandle={(e) => userInfoEditHandle(e)}
          />
          <TutorExperienceDetails
            userInfoEdit={userInfoEdit}
            tutoringExperiences={tutoringExperiences}
            setTutoringExperiences={setTutoringExperiences}
            userInfoSaveHandle={(e, t) => userInfoSaveHandle(e, t)}
            userInfoDiscardHandle={(e) => userInfoDiscardHandle(e)}
            isEditable={isEditable}
            userInfoEditHandle={(e) => userInfoEditHandle(e)}
          />
          <StudentExperienceDetails
            userInfoEdit={userInfoEdit}
            experiencesWithChildren={experiencesWithChildren}
            setExperiencesWithChildren={setExperiencesWithChildren}
            userInfoSaveHandle={(e, t) => userInfoSaveHandle(e, t)}
            userInfoDiscardHandle={(e) => userInfoDiscardHandle(e)}
            isEditable={isEditable}
            userInfoEditHandle={(e) => userInfoEditHandle(e)}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default TutorProfile;
