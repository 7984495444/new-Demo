import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { t } from "i18next";
import {
  tutorProfile,
  tutorProfileQuestion10To12,
  tutorProfileQuestion13To15,
  tutorProfileQuestion2,
} from "@/utils/data";
import { tutorProfileSubmitValidations } from "@/utils/validation";
import { useDispatch } from "react-redux";
import { addTutorFollowUpAction } from "../../../../redux/actions/followUpAction";
import {
  readNotificationAction,
  sendNotificationsAction,
} from "@/redux/actions/sendNotificationAction";
import { useRouter } from "next/router";
import { readToDoListAction } from "@/redux/actions/dashbordAction";

const StudentForEvlucation = ({ showStudentProfileHandal, studentInfo }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [profileInfo, setProfileInfo] = useState({});
  const [errors, setErrors] = useState({});

  const onChangeHandle = (field, value) => {
    setProfileInfo({
      ...profileInfo,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const reportSubmitHandal = () => {
    let formErrors = tutorProfileSubmitValidations(profileInfo);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      let field = {
        ...profileInfo,
        student: Number(studentInfo?.student_id),
        subject: Number(studentInfo?.subject_id),
      };
      dispatch(addTutorFollowUpAction(field));
      let sendNotificationField = {
        receiver: Number(studentInfo?.student_id),
        message_en:
          "NotificationType.TutorCreatesEvaluationForTheStudentSendStudent",
        message_fr:
          "NotificationType.TutorCreatesEvaluationForTheStudentSendStudent",
        notification_type: ["New matches are proposed", "Visual dot"],
        // source_id: 0,
        source_type: "tutor_create_evaluation_for_student",
        edit_session: 0,
      };
      let sendNotificationField1 = {
        receiver: Number(studentInfo?.student_parent_id),
        message_en: "NotificationType.TutorCreatesEvaluationForTheStudent",
        message_fr: "NotificationType.TutorCreatesEvaluationForTheStudent",
        notification_type: ["New matches are proposed", "Visual dot"],
        // source_id: 0,
        source_type: "tutor_create_evaluation_for_student",
        edit_session: 0,
      };
      if (router?.query?.notificationId) {
        let readField = {
          is_read: 1,
        };
        dispatch(
          readNotificationAction(router?.query?.notificationId, readField)
        );
      }
      if (router?.query?.toDoListId) {
        dispatch(readToDoListAction(Number(router?.query?.toDoListId)));
      }
      dispatch(sendNotificationsAction(sendNotificationField));
      dispatch(sendNotificationsAction(sendNotificationField1));
      showStudentProfileHandal();
    }
  };

  return (
    <>
      <Card className="border-0">
        <CardHeader className="bg-yellow h-20 h-sm-24 h-lg-32 h-xl-40 h-xl-48"></CardHeader>
        <CardBody>
          <Row className="gy-md-0 gy-4">
            <Col lg="10" md="9">
              <h5 className="mb-6">
                {`${t("TutorMyProfile.Header")} ${
                  studentInfo?.student_first_name
                } ${studentInfo?.student_last_name}`}
              </h5>
              <p className="text-light-blue-a">
                Veuillez répondre aux quelques questions ci-dessous afin de nous
                aider à mieux évaluer {studentInfo?.student_first_name}. Ce
                rapport de suivi ne vous prendra que 2 petites minutes et il est
                important que vous le remplissiez après chaque 10 heures de
                tutorat avec votre élève. Veuillez noter que ce rapport est
                destiné aux parents, aux intervenants de Succès Scolaire et aux
                intervenants de l`école de l’élève si les parents ont autorisé
                la collaboration avec celle-ci.
              </p>
              <p className="text-light-blue-a font-bolder mt-4">
                Pous toutes les questions, 10 signifie que vous êtes totalement
                d`accord et 1 signifie que vou êtes en désacord avec la
                proposition.
              </p>
            </Col>
            <Col lg="2" md="3" className="text-end">
              <Button
                color="none"
                className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
              >
                {t("TutorMyProfile.DoLaterBtn")}
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="mt-4">
        <CardBody>
          <Form>
            <Row className="gx-0 tutor-profile-form-col">
              <Col xl="2" xs="1">
                <div className="tutor-profile-form-col-count">
                  <span className="text-light-blue-a">Q1</span>
                </div>
              </Col>
              <Col xl="10" xs="11">
                <div className="tutor-profile-form-col-content">
                  <Label className="text-sm mb-5">
                    {t("TutorMyProfile.StudentGrade")}
                  </Label>
                  <Input
                    type="select"
                    className="select-light-blue-plain-text w-sm-32"
                    // value={profileInfo}
                    onChange={(e) => onChangeHandle("grade", e.target.value)}
                  >
                    <option>Leval 1</option>
                    <option>Leval 2</option>
                    <option>Leval 3</option>
                  </Input>
                  <p>{errors.grade}</p>
                </div>
              </Col>
            </Row>
            <Row className="gx-0 tutor-profile-form-col">
              <Col xl="2" xs="1">
                <div className="tutor-profile-form-col-count">
                  <span className="text-light-blue-a">Q2</span>
                </div>
              </Col>
              <Col xl="10" xs="11">
                <div className="tutor-profile-form-col-content">
                  <Label className="text-sm mb-5">
                    {t("TutorMyProfile.SubjectsWithStudent")}
                  </Label>
                  <Row className="gx-12 gy-6">
                    {tutorProfileQuestion2.map((val, index) => {
                      return (
                        <Col xs="6" sm="auto" className="w-sm-56" key={index}>
                          <FormGroup className="form-radio-1" check>
                            <Input
                              name="allSubjectWork"
                              id={val.id}
                              value={val.id}
                              type="checkbox"
                              className="rounded-10"
                              onChange={(e) =>
                                onChangeHandle(val.name, e.target.value)
                              }
                            />
                            <Label htmlFor={val.id} check>
                              {t(val.label)}
                            </Label>
                          </FormGroup>
                        </Col>
                      );
                    })}
                    <p className="text-danger">{errors.subjects}</p>
                  </Row>
                </div>
              </Col>
            </Row>
            {tutorProfile.map((val, index) => {
              return (
                <Row className="gx-0 tutor-profile-form-col" key={index}>
                  <Col xl="2" xs="1">
                    <div className="tutor-profile-form-col-count">
                      <span className="text-light-blue-a">{val.title}</span>
                    </div>
                  </Col>
                  <Col xl="10" xs="11">
                    <div className="tutor-profile-form-col-content">
                      <Label className="text-sm mb-5">{t(val.label)}</Label>
                      <div className="w-xl-max">
                        <div className="radio-inline-item-clickable back-border hstack gap-xxl-8 gap-xl-4 mb-5 justify-content-xl-start justify-content-between">
                          {Array.from({
                            length: 10,
                          }).map((_, ind) => {
                            return (
                              <div className="form-item-checkable" key={ind}>
                                <Input
                                  name={val.name}
                                  type="radio"
                                  id={`${val.id}${ind + 1}`}
                                  className="form-item-check"
                                  value={ind + 1}
                                  onChange={(e) =>
                                    onChangeHandle(
                                      val.name,
                                      Number(e.target.value)
                                    )
                                  }
                                />
                                <Label
                                  className="form-item"
                                  htmlFor={`${val.id}${ind + 1}`}
                                  check
                                >
                                  <span className="form-item-click">
                                    {ind + 1}
                                  </span>
                                </Label>
                              </div>
                            );
                          })}
                        </div>
                        <div className="hstack justify-content-between gap-2">
                          <span className="text-light-blue-a">
                            {t("TutorMyProfile.TotallyDisagree")}
                          </span>
                          <span className="text-light-blue-a">
                            {t("TutorMyProfile.TotallyAgree")}
                          </span>
                        </div>
                      </div>
                      <p className="text-danger">{errors[val?.name]}</p>
                    </div>
                  </Col>
                </Row>
              );
            })}
            {tutorProfileQuestion10To12.map((val, index) => {
              return (
                <Row className="gx-0 tutor-profile-form-col" key={index}>
                  <Col xl="2" xs="1">
                    <div className="tutor-profile-form-col-count">
                      <span className="text-light-blue-a">{val.title}</span>
                    </div>
                  </Col>
                  <Col xl="10" xs="11">
                    <div className="tutor-profile-form-col-content">
                      <Label className="text-sm mb-5">{t(val.label)}</Label>
                      <Row className="gy-6">
                        {val?.from.map((item, ind) => {
                          return (
                            <>
                              <Col
                                xs="6"
                                sm="auto"
                                className="w-sm-56"
                                key={ind}
                              >
                                <FormGroup className="form-radio-1" check>
                                  <Input
                                    name={val.name}
                                    id={item.id}
                                    type="radio"
                                    value={item.id}
                                    onChange={(e) =>
                                      onChangeHandle(val.name, e.target.value)
                                    }
                                  />
                                  <Label htmlFor={item.id} check>
                                    {t(item.label)}
                                  </Label>
                                </FormGroup>
                              </Col>
                            </>
                          );
                        })}
                        <p className="text-danger">{errors[val.name]}</p>
                      </Row>
                    </div>
                  </Col>
                </Row>
              );
            })}
            {/* text */}
            {tutorProfileQuestion13To15.map((val, index) => {
              return (
                <Row className="gx-0 tutor-profile-form-col" key={index}>
                  <Col xl="2" xs="1">
                    <div className="tutor-profile-form-col-count">
                      <span className="text-light-blue-a">{val.title}</span>
                    </div>
                  </Col>
                  <Col xl="10" xs="11">
                    <div className="tutor-profile-form-col-content">
                      <Label className="text-sm mb-5">{t(val.label)}</Label>
                      <Input
                        className="border-light-blue-b rounded-0 resize-none cursor-auto"
                        type="textarea"
                        rows="9"
                        placeholder={t("TutorMyProfile.placeholder")}
                        value={profileInfo.val?.name}
                        onChange={(e) =>
                          onChangeHandle(val.name, e.target.value)
                        }
                      />
                      <p className="text-danger">{errors[val.name]}</p>
                    </div>
                  </Col>
                </Row>
              );
            })}
            <Row className="gx-0">
              <Col xl="10" xs="11" className="ms-auto">
                <div className="tutor-profile-form-col-content pt-5">
                  <Button
                    color="dark-blue-c"
                    onClick={() => reportSubmitHandal()}
                  >
                    {t("TutorMyProfile.FollowUpBtn")}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default StudentForEvlucation;
