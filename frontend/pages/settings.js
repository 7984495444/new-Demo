import withAuth from "./authRouter";
import Link from "next/link";
import moment from "moment";
import i18next from "i18next";
import { Danger, LanguageCircle, Logout } from "iconsax-react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserAction } from "@/redux/actions/userAction";
import { changeLanguageAction, logoutAction } from "@/redux/actions/authAction";
import { sidebarList } from "@/utils/data";
import { getAllTutorDocumentsAction } from "@/redux/actions/documentAction";
import { useTranslation } from "react-i18next";
import {
  Layout,
  AddPaymentCardModal,
  EditInformationsTab,
  PaymentTab,
  TermsAndConditionsTab,
  PrivacyPolicyTab,
  AntiDiscriminationPoliciesTab,
  DocumentsTab,
} from "@/components";
import {
  Row,
  Col,
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  Input,
} from "reactstrap";

const Settings = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();

  const [tabList, settabList] = useState([]);
  const [documentTabShow, setDocumentTabShow] = useState(false);
  const [activeTabIndex, setactiveTabIndex] = useState(
    router?.query?.payment ? 2 : 0
  );

  useEffect(() => {
    dispatch(getUserAction());
    // dispatch(getPaymentCardAction());
    // if (userData?.role_id?.id === 2) {
    dispatch(getAllTutorDocumentsAction()); // call only tutor
    // }
  }, []);

  const { userData } = useSelector((state) => state.user);
  const { getAllTutorDocumnet } = useSelector((state) => state.document);
  // const { allPaymentCard } = useSelector((state) => state.payment);

  useEffect(() => {
    if (getAllTutorDocumnet || getAllTutorDocumnet == []) {
      setDocumentTabShow(true);
    }
  }, [getAllTutorDocumnet]);

  useEffect(() => {
    let temp = sidebarList.filter((val) => {
      if (userData?.role_id.id && userData?.role_id.id === val?.role_id) {
        return val?.tabList;
      }
    });
    settabList(...temp);
  }, [userData]);

  const logoutHandle = async () => {
    localStorage.clear();
    await dispatch(logoutAction());
    router.push("/login");
  };

  const languageChangeHandle = (e) => {
    moment.locale(e.target.value);
    dispatch(getUserAction());
    dispatch(changeLanguageAction(e.target.value));
    i18n.changeLanguage(e.target.value);
    router.push(router.pathname, router.asPath);
  };

  return (
    <>
      <Layout>
        <Row className="gy-lg-0 gy-6">
          <Col lg="4" xl="3">
            <Card>
              <CardHeader className="p-6">
                <h6>{t("Settings.Select")}</h6>
              </CardHeader>
              <CardBody
                className="vstack p-0 h-lg-calc overflow-auto"
                style={{ ["--x-h-lg"]: "364px" }}
              >
                <div className="settings-btns flex-1 vstack" role="tablist">
                  {tabList?.tabList &&
                    tabList.tabList.map((val, ind) => {
                      return (
                        <button
                          key={ind}
                          className={`nav-link ${
                            activeTabIndex === ind && "active"
                          }`} // active
                          data-bs-toggle="pill"
                          data-bs-target={val?.target}
                          type="button"
                          role="tab"
                          onClick={() => setactiveTabIndex(ind)}
                        >
                          <span className="nav-link-icon">{val?.logo}</span>
                          <span className="nav-link-text">{t(val?.title)}</span>
                        </button>
                      );
                    })}
                  <Link
                    className="nav-link"
                    target="_blank"
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfBAzeRVN6ivLh2TGnbMyLv51SuNUIUClEKcjh9PbgIstAKvw/viewform"
                  >
                    <span className="nav-link-icon">
                      <Danger className="me-4" />
                    </span>
                    <span className="nav-link-text">
                      {t("Settings.Report")}
                    </span>
                  </Link>
                </div>
              </CardBody>
              <CardFooter className="p-0">
                <div className="px-0 py-2 border-top border-light-blue-c settings-btns">
                  <div className="nav-link">
                    <span className="nav-link-icon">
                      <LanguageCircle />
                    </span>
                    <span className="nav-link-text">
                      {t("Common.Language1")}
                    </span>
                    <Input
                      name="language"
                      type="select"
                      className="ms-auto w-auto py-0 ps-0 pe-5 border-0 shadow-none text-black"
                      style={{ backgroundPosition: "right center" }}
                      defaultValue={i18next.resolvedLanguage}
                      onChange={(e) => languageChangeHandle(e)}
                    >
                      <option value={"en"}>EN</option>
                      <option value={"fr"}>FR</option>
                    </Input>
                  </div>
                </div>
                <div className="px-0 py-2 border-top border-light-blue-c settings-btns">
                  <button
                    className="nav-link"
                    type="button"
                    role="button"
                    onClick={logoutHandle}
                  >
                    <span className="nav-link-icon">
                      <Logout />
                    </span>
                    <span className="nav-link-text">
                      {t("Settings.LogOutBtn")}
                    </span>
                  </button>
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="8" xl="9">
            <div className="tab-content">
              <div
                className={`tab-pane fade show ${
                  userData?.role_id.id !== 1 &&
                  !router?.query?.payment &&
                  "active"
                }`} // active
                id="personal-information-tab"
                role="tabpanel"
              >
                <EditInformationsTab userData={userData} />
              </div>
              <div
                className={`tab-pane fade show ${
                  userData?.role_id.id === 1 && "active"
                }`}
                id="notification-tab"
                role="tabpanel"
              >
                {/* <NotificationTab
                  userData={userData}
                  activeTabIndex={activeTabIndex}
                /> */}
              </div>
              <div className="tab-pane fade" id="documents-tab" role="tabpanel">
                {documentTabShow && (
                  <DocumentsTab getAllTutorDocumnet={getAllTutorDocumnet} />
                )}
              </div>
              <div
                className={`tab-pane fade ${
                  router?.query?.payment && "active show"
                }`}
                id="payments-tab"
                role="tabpanel"
              >
                {/* {allPaymentCard && ( */}
                <PaymentTab
                // allPaymentCard={allPaymentCard}
                />
                {/* )} */}
              </div>
              <div
                className="tab-pane fade"
                id="terms-and-condition-tab"
                role="tabpanel"
              >
                <TermsAndConditionsTab userData={userData} />
              </div>
              <div
                className="tab-pane fade"
                id="privacy-policy-tab"
                role="tabpanel"
              >
                <PrivacyPolicyTab userData={userData} />
              </div>
              <div
                className="tab-pane fade"
                id="anti-discrimination-policies-tab"
                role="tabpanel"
              >
                <AntiDiscriminationPoliciesTab />
              </div>
            </div>
          </Col>
        </Row>
      </Layout>
      <AddPaymentCardModal />
    </>
  );
};

export default withAuth(Settings);
