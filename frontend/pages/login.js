import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/module/login.module.scss";
import i18n from "@/utils/i18nextInit";
import i18next, { t } from "i18next";
import { useRouter } from "next/router";
import { FiFacebook } from "react-icons/fi";
import { getUserTimeZone } from "@/utils/timeZoneConvert";
import { LabelWithInput } from "../components";
import { validateUserForLogin } from "@/utils/validation";
import { useEffect, useState } from "react";
import { Youtube, Instagram } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguageAction, loginAction } from "@/redux/actions/authAction";
import { Container, Card, CardBody, Row, Col, Input, Button } from "reactstrap";
import {
  SsLogo,
  BlueShape,
  GreyShape,
  YellowShape,
  LoginBg,
  DotsBg,
} from "@/assets/images/index";

const Login = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const { errMsg } = useSelector((state) => state.auth);

  // get local timeZone
  useEffect(() => {
    getUserTimeZone();

    if (navigator && navigator.language && typeof window !== "undefined") {
      localStorage.setItem(
        "i18nextLng",
        localStorage.getItem("i18nextLng") || navigator.language
      );
    }
  }, []);

  // onChange Handle
  const onChangeHandal = (field, value) => {
    setUser({
      ...user,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  //  loginHandle
  const loginHandle = async () => {
    let formErrors = validateUserForLogin(user);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      dispatch(loginAction(user));
    }
  };

  const languageChangeHandle = (e) => {
    dispatch(changeLanguageAction(e.target.value));
    i18n.changeLanguage(e.target.value);
    router.push(router.pathname, router.asPath);
    // router.reload();
  };

  return (
    <>
      <section
        className={styles.loginMain}
        style={{ backgroundImage: `url('${LoginBg.src}')` }}
      >
        <div
          className={styles.loginBlue}
          style={{ backgroundImage: `url('${BlueShape.src}')` }}
        >
          <div
            className={`${styles.loginYellow} vstack`}
            style={{ backgroundImage: `url('${YellowShape.src}')` }}
          >
            <nav className={`${styles.loginHeader} navbar pb-0`}>
              <Container className="gx-0">
                <Link href="" className="navbar-brand">
                  <Image src={SsLogo} alt="Succes Scolaire Logo" />
                </Link>
                <ul className="navbar-nav gap-3 flex-row ms-auto">
                  <li className="nav-item">
                    <Link className="link-dark-blue-c" href="" target="_blank">
                      <Youtube size="18" />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="link-dark-blue-c" href="" target="_blank">
                      <FiFacebook size="16" />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="link-dark-blue-c" href="" target="_blank">
                      <Instagram size="18" />
                    </Link>
                  </li>
                </ul>
              </Container>
            </nav>
            <div className={`${styles.loginBody} flex-fill py-4 hstack`}>
              <Container>
                <div className="w-md-screen-sm w-5/6 mx-auto position-relative">
                  <Image
                    className={styles.loginGrey}
                    src={GreyShape}
                    alt="Grey Shape"
                  />
                  <Card className="overflow-hidden">
                    <CardBody className="p-0">
                      <Row className="gx-0">
                        <Col
                          lg="3"
                          md="2"
                          className={`${styles.loginLeft}`}
                          style={{ backgroundImage: `url('${DotsBg.src}')` }}
                        ></Col>
                        <Col lg="9" md="10" className="py-10">
                          <Row className="gx-0">
                            <Col lg="9" xs="10" className="mx-auto">
                              <div className="mb-lg-14 mb-8">
                                <h5 className="font-regular">
                                  {t("Login.WelcomeText")}
                                </h5>
                                <h2 className="font-bolder">
                                  {t("Login.Header")}
                                </h2>
                              </div>
                              <div className="mb-md-10 mb-6">
                                <LabelWithInput
                                  lable={t("Login.Email")}
                                  lableClassName={"text-md"}
                                  plaintext={true}
                                  className={"custom-input-1"}
                                  type={"email"}
                                  name={"email"}
                                  placeholder={t("Login.EmailId")}
                                  value={user?.email}
                                  onChangeHandal={(e, t) =>
                                    onChangeHandal(e, t)
                                  }
                                  autoComplete="off"
                                  disabled={false}
                                  errors={errors}
                                />
                              </div>
                              <div className="mb-md-10 mb-6">
                                <LabelWithInput
                                  lable={t("Login.Password")}
                                  lableClassName={"text-md"}
                                  plaintext={true}
                                  className={"custom-input-1"}
                                  type={"password"}
                                  name={"password"}
                                  placeholder={t("Login.PasswordValue")}
                                  value={user?.password}
                                  onChangeHandal={(e, t) =>
                                    onChangeHandal(e, t)
                                  }
                                  autoComplete="off"
                                  disabled={false}
                                  errors={errors}
                                />
                              </div>
                              <div>
                                <Link className="text-underline" href="">
                                  {t("Login.ForgotPasswordBtn")}
                                </Link>
                              </div>
                              <Button
                                color="dark-blue-c"
                                className="mt-lg-8 mt-6"
                                onClick={() => loginHandle()}
                              >
                                {t("Login.LoginBtn")}
                              </Button>
                              {errMsg && (
                                <p className="text-danger mt-2">
                                  {t(`Login.${errMsg}`)}
                                </p>
                              )}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </div>
              </Container>
            </div>
            <footer className={`${styles.loginFooter} pb-lg-4 pb-8`}>
              <Container>
                <Row className="gy-lg-0 gy-4">
                  <Col lg="5">
                    <p className="text-grey-c text-lg-start text-center">
                      {t("Login.CopyRight")}
                    </p>
                  </Col>
                  <Col
                    lg="7"
                    className="d-flex flex-wrap align-items-lg-center justify-content-center justify-content-lg-end gap-sm-4 gap-3"
                  >
                    <Link className="link-light-blue-a" href="">
                      {t("Login.T&cBtn")}
                    </Link>
                    <Link className="link-light-blue-a" href="">
                      {t("Login.PolicyBtn")}
                    </Link>
                    <Link className="link-light-blue-a" href="">
                      {t("Login.ContactUsBtn")}
                    </Link>
                    <Input
                      name="language"
                      type="select"
                      className="ms-auto w-auto py-0 ps-0 pe-5 border-0 shadow-none  text-light-blue-a"
                      style={{ backgroundPosition: "right center" }}
                      defaultValue={i18next.resolvedLanguage}
                      onChange={(e) => {
                        languageChangeHandle(e);
                      }}
                    >
                      <option value={"en"}>EN</option>
                      <option value={"fr"}>FR</option>
                    </Input>
                  </Col>
                </Row>
              </Container>
            </footer>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
