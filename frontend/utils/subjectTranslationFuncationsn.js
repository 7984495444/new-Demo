import i18n from "i18next";

export const subjectTranslationHandle = (val) => {
  if (i18n.language === "fr") {
    return (
      val?.subject_name_fr ||
      val?.name_fr ||
      val?.student_subject_name_fr ||
      val?.ts_subject_name_fr ||
      val?.program_name_fr
    );
  } else {
    return (
      val?.subject_name_en ||
      val?.name_en ||
      val?.student_subject_name_en ||
      val?.ts_subject_name_en ||
      val?.program_name_en
    );
  }
};
