import React, { useEffect, useState } from "react";
import NotificationBar from "./NotificationBar";
import StudentAndParetCreateSessionModal from "../modal/session/StudentAndParetCreateSessionModal";
import { useRouter } from "next/router";
import { logoutAction } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import { componentList, headerData, ButtonNames } from "@/utils/data";
import { t } from "i18next";
import { getUserAction } from "../../redux/actions/userAction";
import { getAllNotificationsAction } from "@/redux/actions/sendNotificationAction";
import { getDemoLectureAction } from "../../redux/actions/lessonSpaceAction";
import { Button, Col, Container, Input, InputGroup, Row } from "reactstrap";
import {
  Notification,
  Logout,
  ArrowRight,
  SearchNormal1,
  Profile2User,
  UserSquare,
} from "iconsax-react";
import NewSessionModal from "../modal/session/NewSessionModal";

function Header({ componetSerching, setHideDefaultComponentes, role_id }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAction());
  }, []);

  const { userData } = useSelector((state) => state.user);
  const router = useRouter();
  const [showMe, setShowMe] = useState(false);
  const [addBtnName, setAddBtnName] = useState();
  const [addNewSessionMoadleShow, setAddNewSessionMoadleShow] = useState(false);
  const [buttonArray, setbuttonArray] = useState([]);
  const [searchQuery, setsearchQuery] = useState(null);
  const [titleData, settitleData] = useState();
  const [isShowingSerchResult, setisShowingSerchResult] = useState(false);
  const [showNotificationBar, setShowNotificationBar] = useState(false);

  useEffect(() => {
    if (userData && userData?.role_id && ButtonNames[userData?.role_id?.id]) {
      const buttonName = ButtonNames[userData?.role_id.id][router?.pathname];
      setAddBtnName(t(buttonName) || false);
    } else {
      setAddBtnName(false);
    }
  }, [userData, router?.pathname]);

  useEffect(() => {
    dispatch(getAllNotificationsAction());
    setbuttonArray(componentList);
  }, []);

  const { getSendNotifications } = useSelector(
    (state) => state.sendNotification
  );

  function toggle() {
    setShowMe(!showMe);
  }

  const logoutHandle = async () => {
    localStorage.removeItem("token");
    await dispatch(logoutAction());
    router.push("/login");
  };

  const addNewSessionMoadleShowHandle = () => {
    setAddNewSessionMoadleShow(!addNewSessionMoadleShow);
  };

  // change Button state on click
  const changeButtonState = (index, update) => {
    let buttonlist = buttonArray;
    buttonlist[index].isActive = !buttonlist[index].isActive;
    setbuttonArray([...buttonlist]);
    if (update) {
      setHideDefaultComponentes(true);
      typeof componetSerching === "function"
        ? componetSerching(buttonlist)
        : // ? componetSerching(buttonArray)
          "";
    }
  };

  useEffect(() => {
    let temp =
      headerData.find((element) => element.asUrl === router.route) || {};

    if (router.route === "/student") {
      temp = {
        name:
          userData?.role_id?.id === 1
            ? "Header.AdminUserStudent"
            : "Header.Student",
        icon:
          userData?.role_id?.id === 1 ? (
            <UserSquare size="20" className="me-2" />
          ) : (
            <Profile2User size="20" className="me-2" />
          ),
      };
    }

    settitleData(temp);
  }, [headerData, router.route, userData?.role_id?.id]);

  useEffect(() => {
    let temp = buttonArray.filter((val) => {
      if (val?.isActive) {
        return val;
      }
    });
    if (temp.length > 0) {
      setisShowingSerchResult(true);
    } else {
      setisShowingSerchResult(false);
    }
  }, [buttonArray]);

  const platefromEvaluationsHandal = () => {
    router.push("/platefrom-evaluations");
  };

  const myPaymentInvoicwHandal = () => {
    router.push("/my-payment-invoice");
  };

  const redirectPaymentHandle = () => {
    router.push({ pathname: "/settings", query: { payment: true } });
  };

  const redirectDemoLecture = () => {
    dispatch(getDemoLectureAction());
  };

  return (
    <>
      <header className="pt-lg-8 pb-lg-12 py-4 bg-light-blue-c">
        <Container className="position-relative" fluid>
          <Row className="justify-content-between gy-sm-0 gy-4">
            <Col className="hstack flex-wrap gap-2" sm="6" xs="auto">
              {titleData?.icon}
              <h6 className="flex-none">
                {isShowingSerchResult
                  ? "Résultats de recherche"
                  : t(titleData?.name)}
              </h6>
              <div
                className="gap-2 flex-none"
                style={{ display: showMe ? "none" : "flex" }}
              >
                {buttonArray?.map((val, index) => {
                  if (val?.isActive) {
                    return (
                      <Button
                        size="sm"
                        color="light-blue-a"
                        outline
                        key={index}
                      >
                        {t(val?.text)}
                        <MdClose
                          size="14"
                          onClick={() => changeButtonState(index, true)}
                        />
                      </Button>
                    );
                  }
                })}
              </div>
            </Col>
            <Col
              className="d-lg-flex align-items-lg-center gap-6 justify-content-lg-end text-end"
              sm="6"
              xs="auto"
            >
              <Button onClick={toggle} color="none" className="search-btn">
                <SearchNormal1 size="20" />
              </Button>
              <Button
                className="notification-btn position-lg-relative"
                color="none"
                active
                onClick={() => {
                  setShowNotificationBar(!showNotificationBar);
                }}
              >
                <Notification size="20" />
                <span
                  className="badge position-absolute rounded-pill bg-warning text-white font-bold w-4 h-4 d-flex align-items-center justify-content-center"
                  style={{ right: "-0px", top: "-4px", fontSize: "10px" }}
                >
                  {getSendNotifications?.length}
                </span>
              </Button>
              {addBtnName && (
                <Button
                  color="dark-blue-c"
                  className="flex-none"
                  onClick={
                    addBtnName === `${t("TutorDeshbord.Loremipsum")}`
                      ? addNewSessionMoadleShowHandle
                      : addBtnName === `${t("TutorDeshbord.EvalueSS")}`
                      ? platefromEvaluationsHandal
                      : addBtnName === `${t("TutorDeshbord.ViewMyInvoice")}`
                      ? myPaymentInvoicwHandal
                      : addBtnName === `${t("ParentDashboard.PaymentSetting")}`
                      ? redirectPaymentHandle
                      : addBtnName === `${t("TutorDeshbord.TestVirtualClass")}`
                      ? redirectDemoLecture
                      : ""
                  }
                >
                  {addBtnName}
                </Button>
              )}
              <Button
                color="none"
                className="logout-btn d-lg-inline-block d-none"
              >
                <Logout className="text-xl" onClick={() => logoutHandle()} />
              </Button>
            </Col>
          </Row>
          <div
            className="position-relative"
            style={{ display: showMe ? "block" : "none" }}
          >
            <div className="searchbar-main">
              <div className="searchbar-wrapper">
                <InputGroup className="searchbar-input-group">
                  <Input
                    value={searchQuery}
                    placeholder={t("TutorDeshbord.IResearch")}
                    onChange={(e) => {
                      setsearchQuery(e.target.value);
                    }}
                  />
                  <Button
                    color="dark-blue-c"
                    onClick={() => {
                      typeof componetSerching === "function" &&
                        componetSerching(buttonArray, searchQuery);
                      toggle();
                      setHideDefaultComponentes(false);
                    }}
                  >
                    <ArrowRight />
                  </Button>
                </InputGroup>
                <div className="trending-search-wrapper">
                  {
                    // !searchQuery.length &&
                    buttonArray?.map((value, index) => {
                      return (
                        <Button
                          color="none"
                          size="sm"
                          active={value.isActive ? true : false}
                          className="trending-search-btn"
                          onClick={() => {
                            changeButtonState(index);
                          }}
                          key={index}
                        >
                          {t(value.text)}
                        </Button>
                      );
                    })
                  }
                </div>
                {/* <ListGroup className="search-suggestion-wrapper shadow-3" flush>
                  {buttonArray
                    .filter((post) => {
                      if (searchQuery === "") {
                        // return post;
                        return null;
                      } else if (
                        post.text
                          .toLowerCase()
                          .includes(searchQuery?.toLowerCase())
                      ) {
                        return post;
                      }
                    })
                    .map((post, index) => (
                      <ListGroupItem
                        className="p-2 bg-light-blue-d-hover cursor-pointer"
                        key={index}
                      >
                        <p
                          className="text-dark-blue-c"
                          onClick={() => {
                            changeButtonState(post.index, true);
                            setsearchQuery("");
                            toggle();
                          }}
                        >
                          {t(post.text)}
                        </p>
                      </ListGroupItem>
                    ))}
                </ListGroup> */}
              </div>
            </div>
          </div>
        </Container>
      </header>
      <NotificationBar
        userData={userData}
        isShow={showNotificationBar}
        isClose={() => setShowNotificationBar(false)}
        getSendNotifications={getSendNotifications}
      />
      {/* tutor session create */}
      {addNewSessionMoadleShow && userData?.role_id?.id === 2 && (
        <NewSessionModal
          type={false}
          show={addNewSessionMoadleShow}
          hide={() => addNewSessionMoadleShowHandle()}
        />
      )}
      {/* student session create */}
      {addNewSessionMoadleShow &&
        (userData?.role_id?.id === 3 || userData?.role_id?.id === 4) && (
          <StudentAndParetCreateSessionModal
            userData={userData}
            isStudent={userData?.role_id?.id === 4 ? true : false}
            show={addNewSessionMoadleShow}
            hide={() => addNewSessionMoadleShowHandle()}
          />
        )}
    </>
  );
}

export default Header;
