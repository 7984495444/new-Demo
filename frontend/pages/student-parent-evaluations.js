import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { Layout } from "@/components";
import { useDispatch } from "react-redux";
import { readToDoListAction } from "@/redux/actions/dashbordAction";
import { t } from "i18next";
import { studentAndParentEvaluationsPage1To11 } from "@/utils/data";
import { studentAndParentEvaluationsPageValidations } from "@/utils/validation";
import {
  addStudentAndParentFollowUpAction,
  getParentEvaluateShowOrNotAction,
} from "@/redux/actions/followUpAction";
import {
  sendNotificationsAction,
  updateDeleteSessionNotification,
} from "@/redux/actions/sendNotificationAction";
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

const StudentAndParentEvaluationsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [profileInfo, setProfileInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [isParentSendNotificition, setIsParentSendNotificition] =
    useState(true);

  useEffect(() => {
    if (router?.query?.isParent === "true") {
      dispatch(
        getParentEvaluateShowOrNotAction(
          Number(router?.query?.tutor),
          Number(router?.query?.parent),
          Number(router?.query?.student),
          Number(router?.query?.subject)
        )
      );
    }
  }, []);

  const onChangeHandle = (field, value) => {
    if (field === "assessment_accessible" && value === "Non") {
      setIsParentSendNotificition(false);
    }

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
    let formErrors = studentAndParentEvaluationsPageValidations(profileInfo);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      let studentField = {
        ...profileInfo,
        student: Number(router?.query?.student),
        tutor: Number(router?.query?.tutor),
        subject: Number(router?.query?.subject),
      };

      let parentField = {
        ...profileInfo,
        student: Number(router?.query?.student),
        parent: Number(router?.query?.parent),
        tutor: Number(router?.query?.tutor),
        subject: Number(router?.query?.subject),
      };

      dispatch(
        addStudentAndParentFollowUpAction(
          JSON?.parse(router?.query?.isParent) ? parentField : studentField
        )
      );

      if (isParentSendNotificition) {
        let sendNotificationField = {
          receiver: Number(router?.query?.tutor),
          message_en: `${
            JSON?.parse(router?.query?.isParent)
              ? "NotificationType.ParentsCreateEvaluationsForTheTutor"
              : "NotificationType.StudentCreateEvalucationForTheTutor"
          }`,
          message_fr: `${
            JSON?.parse(router?.query?.isParent)
              ? "NotificationType.ParentsCreateEvaluationsForTheTutor"
              : "NotificationType.StudentCreateEvalucationForTheTutor"
          }`,
          notification_type: ["New matches are proposed", "Visual dot"],
          // source_id: 0,
          source_type: "student_parent_create_evaluation_for_tutor",
          edit_session: 0,
        };
        dispatch(sendNotificationsAction(sendNotificationField));
      }

      if (router?.query?.toDoListId) {
        dispatch(readToDoListAction(Number(router?.query?.toDoListId)));
        dispatch(
          updateDeleteSessionNotification(
            Number(router?.query?.tutor),
            Number(router?.query?.student),
            Number(router?.query?.session)
          )
        );
      }

      Router.push("./evaluations");
      setIsParentSendNotificition(true);
    }
  };

  return (
    <>
      <Layout>
        <Card className="border-0">
          <CardHeader className="bg-yellow h-20 h-sm-24 h-lg-32 h-xl-40 h-xl-48"></CardHeader>
          <CardBody>
            <Row className="gy-md-0 gy-4">
              <Col lg="10" md="9">
                <h5 className="mb-6">{`${t("TutorMyProfile.Header")} ${
                  router?.query?.tutor_name
                }`}</h5>
                <p className="text-light-blue-a">
                  {t("StudentEvaluation.EvaluationSummary1")}{" "}
                  {router?.query?.tutor_name}.{" "}
                  {t("StudentEvaluation.EvaluationSummary2")}
                </p>
                <p className="text-light-blue-a font-bolder mt-4">
                  {t("StudentEvaluation.EvaluationSummary3")}
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
              {studentAndParentEvaluationsPage1To11?.map((val, index) => {
                return (
                  <Row className="gx-0 tutor-profile-form-col" key={index}>
                    <Col xl="2" xs="1">
                      <div className="tutor-profile-form-col-count">
                        <span className="text-light-blue-a">{val.title}</span>
                      </div>
                    </Col>
                    <Col xl="10" xs="11">
                      <div className="tutor-profile-form-col-content">
                        <Label className="text-sm mb-5">
                          {val.id === "q11"
                            ? `${t(val.label)} ${router?.query?.tutor_name} ${
                                router?.query?.tutor_last_name
                              }`
                            : t(val.label)}
                        </Label>
                        {val.id === "q11" ? (
                          <>
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
                          </>
                        ) : val.id === "q2" ? (
                          <Row className="gx-0">
                            <Col xs="6" sm="auto" className="w-sm-56">
                              <FormGroup className="form-radio-1" check>
                                <Input
                                  name={val.name}
                                  type="radio"
                                  value="Oui"
                                  onChange={(e) =>
                                    onChangeHandle(val.name, e.target.value)
                                  }
                                />
                                <Label htmlFor={"item.id"} check>
                                  {t("Common.Yes")}
                                </Label>
                              </FormGroup>
                            </Col>
                            <Col xs="6" sm="auto" className="w-sm-56">
                              <FormGroup className="form-radio-1" check>
                                <Input
                                  name={val.name}
                                  type="radio"
                                  value="Non"
                                  onChange={(e) =>
                                    onChangeHandle(val.name, e.target.value)
                                  }
                                />
                                <Label htmlFor={"item.id"} check>
                                  {t("Common.No")}
                                </Label>
                              </FormGroup>
                            </Col>
                            <p className="text-danger">{errors[val?.name]}</p>
                          </Row>
                        ) : (
                          <>
                            <div className="w-xl-max">
                              <div className="first radio-inline-item-clickable back-border hstack gap-xl-8 mb-5 justify-content-xl-start justify-content-between">
                                {Array.from({
                                  length: 10,
                                }).map((_, ind) => {
                                  return (
                                    <div
                                      className="form-item-checkable"
                                      key={ind}
                                    >
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
                          </>
                        )}
                      </div>
                    </Col>
                  </Row>
                );
              })}
              <Row className="gx-0">
                <Col xl="10" xs="11" className="ms-auto">
                  <div className="tutor-profile-form-col-content pt-5">
                    <Button color="dark-blue-c" onClick={reportSubmitHandal}>
                      {t("TutorMyProfile.FollowUpBtn")}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Layout>
    </>
  );
};

export default StudentAndParentEvaluationsPage;
