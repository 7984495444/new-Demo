import React, { useState } from "react";
import withAuth from "./authRouter";
import Router from "next/router";
import { Layout } from "@/components";
import { t } from "i18next";
import { ratingFromUsersPage } from "@/utils/data";
import { ratingUserPageValidations } from "@/utils/validation";
import { useDispatch } from "react-redux";
import { addPlatefromEvaluationsAction } from "@/redux/actions/platefromEvaluationsAction";
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

const PlatefromEvaluations = () => {
  const dispatch = useDispatch();
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
    let formErrors = ratingUserPageValidations(profileInfo);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      let field = {
        ...profileInfo,
        student: 3,
      };
      dispatch(addPlatefromEvaluationsAction(field));
      Router.push("./evaluations");
    }
  };

  return (
    <>
      <Layout>
        <Card className="border-0">
          <CardHeader className="position-relative bg-yellow h-20 h-sm-24 h-lg-32 h-xl-40 h-xl-48"></CardHeader>
          <CardBody className="pt-16 pb-8 position-relative">
            <Row className="gy-sm-6 gy-6">
              <Col lg="7" sm="8" xs="12">
                <h5 className="font-bolder mb-3">
                  {t("PlatefromEvaluations.MainHeader")}
                </h5>
              </Col>
              <Col lg="5" sm="4" xs="12" className="text-end">
                <Button
                  className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                  color
                >
                  {t("PlatefromEvaluations.DoItBtn")}
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card className="mt-4">
          <CardBody>
            <Form>
              {ratingFromUsersPage.map((val, index) => {
                return (
                  <Row className="gx-0 tutor-profile-form-col" key={index}>
                    <Col xl="2" xs="1">
                      <div className="tutor-profile-form-col-count">
                        <span className="text-light-blue-a">{val.title}</span>
                      </div>
                    </Col>
                    <Col xl="10" xs="11">
                      {val.id === "q5" ? (
                        <div className="tutor-profile-form-col-content">
                          <Label className="text-sm font-semibold mb-5">
                            {t(val.label)}
                          </Label>
                          <Input
                            className="border-light-blue-b rounded-0 resize-none cursor-auto"
                            type="textarea"
                            rows="9"
                            placeholder={t("PlatefromEvaluations.Placeholder")}
                            value={profileInfo.val?.name}
                            onChange={(e) =>
                              onChangeHandle(val.name, e.target.value)
                            }
                          />
                          <p className="text-danger">{errors[val.name]}</p>
                        </div>
                      ) : (
                        <div className="tutor-profile-form-col-content">
                          <Label className="text-sm font-semibold mb-5">
                            {t(val.label)}
                          </Label>
                          <Row className="gx-0 gy-6">
                            {val?.from.map((item, ind) => {
                              return (
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
                                      value={item.name}
                                      onChange={(e) =>
                                        onChangeHandle(val.name, e.target.value)
                                      }
                                    />
                                    <Label htmlFor={item.id} check>
                                      {t(item.label)}
                                    </Label>
                                  </FormGroup>
                                </Col>
                              );
                            })}
                            <p className="text-danger">{errors[val.name]}</p>
                          </Row>
                        </div>
                      )}
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

export default withAuth(PlatefromEvaluations);
