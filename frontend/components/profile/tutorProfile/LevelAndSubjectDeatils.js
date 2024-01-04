import { t } from "i18next";
import React from "react";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Badge,
  Button,
  Col,
  Input,
  Label,
  Row,
  UncontrolledAccordion,
} from "reactstrap";
import { levels_and_subjects_option } from "../../../utils/data";
import { MdClose } from "react-icons/md";
import { Edit } from "iconsax-react";
import i18n from "@/utils/i18nextInit";

const LevelAndSubjectDeatils = ({
  userInfoEdit,
  levelsAndSubjectInfoOnChangeHandle,
  levelsAndSubjectInfo,
  levelsAndSubjectDeleteElementHandle,
  userInfoSaveHandle,
  userInfoDiscardHandle,
  isEditable,
  userInfoEditHandle,
  getAllSchoolLevelSubject,
}) => {
  return (
    <Row className="gy-md-2 gy-4 gx-0 position-relative">
      <Col xxl="3" xl="3" lg="3" md="2" className="pe-md-8">
        <h6 className="text-pre-line">{t("Profile.Level&Subject")}</h6>
      </Col>
      <Col
        xxl="9"
        xl="9"
        lg="9"
        md="10"
        className="pb-10 border-bottom border-light-blue-b min-h-16"
      >
        <Row className="gx-md-6 gx-0">
          {userInfoEdit?.levelsAndSubjectsTaught ? (
            <>
              <Col xxl="8" xl="8" lg="9" md="9" sm="12" xs="12">
                <UncontrolledAccordion
                  stayOpen
                  className="accordian-custom-1"
                  flush
                >
                  <AccordionItem>
                    <AccordionHeader
                      targetId="pre-school-accordian"
                      className="font-bolder"
                    >
                      {t("Profile.PreSchool")}
                    </AccordionHeader>
                    <AccordionBody accordionId="pre-school-accordian">
                      <div className="mb-4">
                        <Label>{t("Profile.Material")}</Label>
                        <Input
                          type="select"
                          className="select-light-blue-plain-text text-black pe-4"
                          onChange={(e) =>
                            levelsAndSubjectInfoOnChangeHandle(
                              "Kindergarten",
                              Number(e.target.value)
                            )
                          }
                        >
                          <option defaultValue>
                            {t("TutorMyProfile.Selectionner")}
                          </option>
                          {getAllSchoolLevelSubject?.Kindergarten?.map(
                            (val, index) => {
                              return (
                                <option key={index} value={val?.setting_value}>
                                  {i18n.language === "en"
                                    ? val.name_en
                                    : val.name_fr}
                                </option>
                              );
                            }
                          )}
                        </Input>
                      </div>
                      <div className="hstack gap-2 flex-wrap mt-3">
                        {getAllSchoolLevelSubject?.Kindergarten?.map(
                          (val, index) => {
                            return (
                              levelsAndSubjectInfo?.Kindergarten?.includes(
                                val?.setting_value
                              ) && (
                                <Badge
                                  className="bg-light-blue-c text-dark-blue-c badge-text-break"
                                  color="none"
                                  key={index}
                                >
                                  {i18n.language === "en"
                                    ? val.name_en
                                    : val.name_fr}
                                  {/* {t(`TutorMyProfile.${val}`)} */}
                                  {/* {t("Profile.PreSchoolFrench")} */}
                                  <MdClose
                                    className="ms-1 cursor-pointer"
                                    onClick={() =>
                                      levelsAndSubjectDeleteElementHandle(
                                        "Kindergarten",
                                        val?.setting_value
                                        // index
                                      )
                                    }
                                  />
                                </Badge>
                              )
                            );
                          }
                        )}
                      </div>
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="primary-level-accordian">
                      {t("Profile.PrimaryLevel")}
                    </AccordionHeader>
                    <AccordionBody accordionId="primary-level-accordian">
                      <Row className="gy-6">
                        {levels_and_subjects_option?.primary_level_accordian?.map(
                          (item, index) => {
                            return (
                              <Col sm="6" xl="4" key={index}>
                                <p className="text-light-blue-a">
                                  {t(item?.title)}
                                </p>
                                <div className="mt-4">
                                  <Label>{t(item?.lable)}</Label>
                                  <Input
                                    type="select"
                                    className="select-light-blue-plain-text text-black pe-4"
                                    onChange={(e) =>
                                      levelsAndSubjectInfoOnChangeHandle(
                                        "primary",
                                        Number(e.target.value),
                                        item?.subObject
                                      )
                                    }
                                  >
                                    <option defaultValue>
                                      {t("TutorMyProfile.Selectionner")}
                                    </option>
                                    {getAllSchoolLevelSubject[
                                      item?.dbName
                                    ]?.map((val, ind) => (
                                      <option
                                        key={ind}
                                        value={val?.setting_value}
                                      >
                                        {i18n.language === "en"
                                          ? val.name_en
                                          : val.name_fr}
                                      </option>
                                    ))}
                                    {/* {item.option?.map((val, ind) => (
                                      <option key={ind} value={val}>
                                        {t(`TutorMyProfile.${val}`)}
                                      </option>
                                    ))} */}
                                  </Input>
                                </div>
                                <div className="hstack gap-2 flex-wrap mt-3">
                                  {getAllSchoolLevelSubject[item?.dbName]?.map(
                                    (val, ind) => {
                                      return (
                                        levelsAndSubjectInfo?.primary[
                                          item?.subObject
                                        ]?.includes(val?.setting_value) && (
                                          <Badge
                                            className="bg-light-blue-c text-dark-blue-c badge-text-break"
                                            color="none"
                                            key={ind}
                                          >
                                            {i18n.language === "en"
                                              ? val.name_en
                                              : val.name_fr}
                                            {/* {t(`TutorMyProfile.${val}`)} */}
                                            {/* {t("Profile.FifthYearFrench")} */}
                                            <MdClose
                                              className="ms-1 cursor-pointer"
                                              onClick={() =>
                                                levelsAndSubjectDeleteElementHandle(
                                                  "primary",
                                                  // ind,
                                                  val?.setting_value,
                                                  item?.subObject
                                                )
                                              }
                                            />
                                          </Badge>
                                        )
                                      );
                                    }
                                  )}
                                </div>
                              </Col>
                            );
                          }
                        )}
                      </Row>
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="secondary-level-accordian">
                      {t("Profile.SecondaryLevel")}
                    </AccordionHeader>
                    <AccordionBody accordionId="secondary-level-accordian">
                      <Row className="gy-6">
                        {levels_and_subjects_option?.secondary_level_accordian?.map(
                          (item, index) => {
                            return (
                              <Col sm="6" xl="4" key={index}>
                                <p className="text-light-blue-a">
                                  {t(item?.title)}
                                </p>
                                <div className="mt-4">
                                  <Label>{t(item?.label)}</Label>
                                  <Input
                                    type="select"
                                    className="select-light-blue-plain-text text-black pe-4"
                                    onChange={(e) =>
                                      levelsAndSubjectInfoOnChangeHandle(
                                        "secondary",
                                        Number(e.target.value),
                                        item?.subObject
                                      )
                                    }
                                  >
                                    <option defaultValue>
                                      {t("TutorMyProfile.Selectionner")}
                                    </option>
                                    {getAllSchoolLevelSubject[item?.dbName].map(
                                      (value, ind) => (
                                        <option
                                          key={ind}
                                          value={value?.setting_value}
                                        >
                                          {i18n.language === "en"
                                            ? value.name_en
                                            : value.name_fr}
                                          {/* {t(`TutorMyProfile.${value}`)} */}
                                        </option>
                                      )
                                    )}
                                  </Input>
                                </div>
                                <div className="hstack gap-2 flex-wrap mt-3">
                                  {getAllSchoolLevelSubject[item?.dbName]?.map(
                                    (val, ind) => {
                                      return (
                                        levelsAndSubjectInfo?.secondary[
                                          item?.subObject
                                        ]?.includes(val?.setting_value) && (
                                          <Badge
                                            className="bg-light-blue-c text-dark-blue-c badge-text-break"
                                            color="none"
                                            key={ind}
                                          >
                                            {i18n.language === "en"
                                              ? val.name_en
                                              : val.name_fr}
                                            {/* {t(`TutorMyProfile.${val}`)} */}
                                            {/* {t("Profile.FifthYearFrench")} */}
                                            <MdClose
                                              className="ms-1 cursor-pointer"
                                              onClick={() => {
                                                levelsAndSubjectDeleteElementHandle(
                                                  "secondary",
                                                  // ind,
                                                  val?.setting_value,
                                                  item?.subObject
                                                );
                                              }}
                                            />
                                          </Badge>
                                        )
                                      );
                                    }
                                  )}
                                </div>
                              </Col>
                            );
                          }
                        )}
                      </Row>
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="cegep">
                      {t("Profile.Cegep")}
                    </AccordionHeader>
                    <AccordionBody accordionId="cegep">
                      <div className="mb-4">
                        <Label>{t("Profile.Material")}</Label>
                        <Input
                          type="select"
                          className="select-light-blue-plain-text text-black pe-4"
                          onChange={(e) =>
                            levelsAndSubjectInfoOnChangeHandle(
                              "Cegep",
                              Number(e.target.value)
                            )
                          }
                        >
                          <option defaultValue>
                            {t("TutorMyProfile.Selectionner")}
                          </option>
                          {getAllSchoolLevelSubject?.Cegep?.map((item, ind) => (
                            <option key={ind} value={item?.setting_value}>
                              {i18n.language === "en"
                                ? item.name_en
                                : item.name_fr}
                              {/* {t(`TutorMyProfile.${item}`)} */}
                            </option>
                          ))}
                        </Input>
                      </div>
                      <div className="hstack gap-2 flex-wrap mt-3">
                        {getAllSchoolLevelSubject?.Cegep?.map((val, ind) => {
                          return (
                            levelsAndSubjectInfo?.Cegep?.includes(
                              val?.setting_value
                            ) && (
                              <Badge
                                className="bg-light-blue-c text-dark-blue-c badge-text-break"
                                color="none"
                                key={ind}
                              >
                                {i18n.language === "en"
                                  ? val.name_en
                                  : val.name_fr}
                                {/* {t(`TutorMyProfile.${val}`)} */}
                                <MdClose
                                  className="ms-1 cursor-pointer"
                                  onClick={() =>
                                    levelsAndSubjectDeleteElementHandle(
                                      "Cegep",
                                      val?.setting_value
                                      // ind
                                    )
                                  }
                                />
                              </Badge>
                            )
                          );
                        })}
                      </div>
                    </AccordionBody>
                  </AccordionItem>
                </UncontrolledAccordion>
              </Col>
              <Col xxl="4" xl="4" lg="3" md="3" sm="12" xs="12">
                <div className="d-flex align-items-start justify-content-end flex-wrap gap-2 pt-md-0 pt-4">
                  <Button
                    color="dark-blue-c"
                    onClick={(e) =>
                      userInfoSaveHandle("levelsAndSubjectsTaught", e)
                    }
                  >
                    {t("Common.SafeguardBtn")}
                  </Button>
                  <Button
                    color="orange"
                    onClick={() =>
                      userInfoDiscardHandle("levelsAndSubjectsTaught")
                    }
                  >
                    {t("Common.CancelBtn")}
                  </Button>
                </div>
              </Col>
            </>
          ) : (
            <>
              <Col xxl="8" xl="8" lg="10" md="7" sm="12" xs="12">
                <div>
                  <h6 className="text-pre-line">{t("Profile.PreSchool")}</h6>
                  <div className="hstack gap-2 flex-wrap mt-3">
                    {getAllSchoolLevelSubject?.Kindergarten?.map(
                      (val, index) => {
                        return (
                          levelsAndSubjectInfo?.Kindergarten?.includes(
                            val?.setting_value
                          ) && (
                            <Badge
                              className="bg-light-blue-c text-dark-blue-c badge-text-break"
                              color="none"
                              key={index}
                            >
                              {i18n.language === "en"
                                ? val.name_en
                                : val.name_fr}
                              {/* {t(`TutorMyProfile.${val}`)} */}
                              {/* {t("Profile.PreSchoolFrench")} */}
                              {/* <MdClose className="ms-1 cursor-pointer" /> */}
                            </Badge>
                          )
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="mt-8">
                  <h6 className="mb-2">{t("Profile.PrimaryLevel")}</h6>
                  <Row className="gy-6">
                    {levels_and_subjects_option.primary_level_accordian?.map(
                      (item, index) => {
                        return (
                          <Col sm="6" xl="4" key={index}>
                            <p className="text-light-blue-a">
                              {t(item?.title)}
                            </p>
                            <div className="hstack gap-2 flex-wrap mt-3">
                              {getAllSchoolLevelSubject[item?.dbName]?.map(
                                (val, ind) => {
                                  return (
                                    levelsAndSubjectInfo?.primary[
                                      item?.subObject
                                    ]?.includes(val?.setting_value) && (
                                      <Badge
                                        className="bg-light-blue-c text-dark-blue-c badge-text-break"
                                        color="none"
                                        key={ind}
                                      >
                                        {i18n.language === "en"
                                          ? val.name_en
                                          : val.name_fr}
                                        {/* {t(`TutorMyProfile.${val}`)} */}
                                        {/* {t("Profile.FifthYearFrench")} */}
                                      </Badge>
                                    )
                                  );
                                }
                              )}
                            </div>
                          </Col>
                        );
                      }
                    )}
                  </Row>
                </div>
                <div className="mt-8">
                  <h6 className="mb-2">{t("Profile.SecondaryLevel")}</h6>
                  <Row className="gy-6">
                    {levels_and_subjects_option.secondary_level_accordian?.map(
                      (item, index) => {
                        return (
                          <Col sm="6" xl="4" key={index}>
                            <p className="text-light-blue-a">
                              {t(item?.title)}
                            </p>
                            <div className="hstack gap-2 flex-wrap mt-3">
                              {getAllSchoolLevelSubject[item?.dbName]?.map(
                                (val, ind) => {
                                  return (
                                    levelsAndSubjectInfo?.secondary[
                                      item?.subObject
                                    ]?.includes(val?.setting_value) && (
                                      <Badge
                                        className="bg-light-blue-c text-dark-blue-c badge-text-break"
                                        color="none"
                                        key={ind}
                                      >
                                        {i18n.language === "en"
                                          ? val.name_en
                                          : val.name_fr}
                                        {/* {t(`TutorMyProfile.${val}`)} */}
                                        {/* {t("Profile.FifthYearFrench")} */}
                                      </Badge>
                                    )
                                  );
                                }
                              )}
                            </div>
                          </Col>
                        );
                      }
                    )}
                  </Row>
                </div>
                <div className="mt-8">
                  <h6 className="text-pre-line">{t("Profile.Cegep")}</h6>
                  <div className="hstack gap-2 flex-wrap mt-3">
                    {getAllSchoolLevelSubject?.Cegep?.map((val, index) => {
                      return (
                        levelsAndSubjectInfo?.Cegep?.includes(
                          val?.setting_value
                        ) && (
                          <Badge
                            className="bg-light-blue-c text-dark-blue-c badge-text-break"
                            color="none"
                            key={index}
                          >
                            {i18n.language === "en" ? val.name_en : val.name_fr}
                            {/* {t(`TutorMyProfile.${val}`)} */}
                            {/* {t("Profile.PreSchoolFrench")} */}
                            {/* <MdClose className="ms-1 cursor-pointer" /> */}
                          </Badge>
                        )
                      );
                    })}
                  </div>
                </div>
              </Col>
              <Col xxl="4" xl="4" lg="2" md="5" sm="12" xs="12">
                <div className="d-flex align-items-start justify-content-end flex-wrap gap-2 pt-md-0 pt-4">
                  {isEditable && (
                    <Button
                      color="unset"
                      size="sm"
                      className="btn-square bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                      onClick={() =>
                        userInfoEditHandle("levelsAndSubjectsTaught")
                      }
                    >
                      <Edit />
                    </Button>
                  )}
                </div>
              </Col>
            </>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default LevelAndSubjectDeatils;
