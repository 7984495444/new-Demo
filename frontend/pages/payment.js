import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  Badge,
  Table,
} from "reactstrap";
import Image from "next/image";
import { Layout, ShowImage } from "@/components";
import { MoneyRecive, ArrowCircleDown2 } from "iconsax-react";
import {
  TimeMoney,
  UserPlaceholderA,
  profilePlaceholder,
} from "@/assets/images/index";
import withAuth from "./authRouter";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAllPaymentDeductionsAction } from "../redux/actions/paymentAction";
import { PaginationComponent } from "@/components";
import moment from "moment";

const payment = [
  {
    uPicture: UserPlaceholderA,
    uName: "Allan Moulin",
    date: "04/Jan/23",
    details: "Tutoring Séances",
    status: "En attente",
    value: "90,00",
  },
  {
    uPicture: profilePlaceholder,
    uName: "John Garnier",
    date: "01/Jan/23",
    details: "Cancellation Penalties",
    status: "En attente",
    value: "84,00",
  },
];

function Payment() {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    dispatch(getAllPaymentDeductionsAction(currentPage, perPage));
  }, [currentPage]);

  const { getAllPymentDeducations } = useSelector((state) => state.payment);

  const changePageToNumberHandal = (val) => {
    setCurrentPage(val);
  };

  const nextAndPrevHandal = (val) => {
    if (val) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Layout>
        <Card>
          <CardBody>
            <h6 className="mb-5">
              {t("Payment.Heading")}{" "}
              <span>({getAllPymentDeducations?.totalUsers})</span>
            </h6>
            <Row className="gy-6">
              <Col xl="3" sm="6">
                <Card className="h-full border-light-blue-c">
                  <CardHeader className="px-5 pt-5 pb-2">
                    <p>{t("Payment.Rating")}</p>
                  </CardHeader>
                  <CardBody className="px-5 pt-2 pb-5">
                    <div className="hstack gap-5">
                      <span className="h-50px w-50px rounded-2 icon-wrapper wrapper-orange flex-none">
                        <MoneyRecive size="22" className="icon-main" />
                      </span>
                      <h2>389,00</h2>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="3" sm="6">
                <Card className="h-full border-light-blue-c">
                  <CardHeader className="px-5 pt-5 pb-2">
                    <Row>
                      <Col xs="auto">
                        <p>{t("Payment.Annual")}</p>
                      </Col>
                      <Col xs="auto" className="text-end ms-auto">
                        {/* <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}> */}
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                          <DropdownToggle
                            className="dropdown-caret-animate font-bold"
                            color="none"
                            tag={"span"}
                          >
                            <ArrowCircleDown2 size="12" className="mt-n1" />
                            <span className="mx-1 text-underline cursor-pointer">
                              {t("Payment.DownloadBtn")}
                            </span>
                          </DropdownToggle>
                          <DropdownMenu
                            style={{ ["--x-dropdown-min-width"]: "auto" }}
                            center
                          >
                            <DropdownItem>
                              <ArrowCircleDown2
                                size="14"
                                className="mt-n1 me-2"
                              />
                              <span className="text-light-blue-a">2022</span>
                            </DropdownItem>
                            <DropdownItem>
                              <ArrowCircleDown2
                                size="14"
                                className="mt-n1 me-2"
                              />
                              <span className="text-light-blue-a">2021</span>
                            </DropdownItem>
                            <DropdownItem>
                              <ArrowCircleDown2
                                size="14"
                                className="mt-n1 me-2"
                              />
                              <span className="text-light-blue-a">2020</span>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody className="px-5 pt-2 pb-5">
                    <div className="hstack gap-5">
                      <span className="h-50px w-50px rounded-2 icon-wrapper wrapper-green flex-none">
                        <MoneyRecive size="22" className="icon-main" />
                      </span>
                      <h2>370,00</h2>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="6" sm="12" className="ms-auto">
                <Card className="h-full border-light-blue-c">
                  <CardHeader className="px-5 pt-5 pb-2">
                    <p>{t("Payment.RateSchedule")} </p>
                  </CardHeader>
                  <CardBody className="px-5 pt-2 pb-5">
                    <div className="d-flex gap-4 align-items-sm-center flex-sm-row flex-column">
                      <span className="h-50px w-50px rounded-2 icon-wrapper wrapper-blue flex-none mb-">
                        <Image
                          className="icon-main"
                          src={TimeMoney}
                          alt="Time"
                        />
                      </span>
                      <Row lg="4" xs="2" className="flex-fill gy-4">
                        <Col>
                          <h2>20/h</h2>
                          <p>{t("Payment.Support")}</p>
                        </Col>
                        <Col>
                          <h2>30/h</h2>
                          <p>{t("Payment.CatchUp")}</p>
                        </Col>
                        <Col>
                          <h2>25/h</h2>
                          <p>{t("Payment.Preparing")}</p>
                        </Col>
                        <Col>
                          <h2>30/h</h2>
                          <p>{t("Payment.Enrichment")}</p>
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Table style={{ minWidth: "1064px" }} className="mt-5" responsive>
              <thead>
                <tr>
                  <th width="30%" className="font-bolder">
                    {t("Payment.Name")}
                  </th>
                  <th width="17%" className="font-bolder">
                    {t("Payment.SessionDate")}
                  </th>
                  <th width="16%" className="font-bolder">
                    {t("Payment.SessionDuration")}
                  </th>
                  <th width="16%" className="font-bolder">
                    {t("Payment.PayDetails")}
                  </th>
                  <th width="16%" className="font-bolder">
                    {t("Payment.Payments")}
                  </th>
                  <th width="5%" className="font-bolder">
                    {t("Payment.Value")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {getAllPymentDeducations &&
                  getAllPymentDeducations?.users?.map((val, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <ShowImage
                            className="avatar avatar-xs rounded-circle bg-light-blue-a flex-none"
                            imageName={val?.student?.profile_image}
                            width={100}
                            height={100}
                          />
                          <Image
                            className="avatar w-8 h-8 rounded-circle me-2"
                            src={
                              val?.tutor_id?.profile_image
                                ? `${process.env.NEXT_PUBLIC_API_URL}/users/profile-image/${val?.tutor_id?.profile_image}`
                                : profilePlaceholder
                            }
                            width={68}
                            height={68}
                            alt="profilePlaceholder"
                          />
                          <span>
                            {val.tutor_id?.first_name +
                              " " +
                              val.tutor_id?.last_name}
                          </span>
                        </td>
                        <td>{moment(val?.session_date).format("DD/MMM/YY")}</td>
                        <td>1h</td>
                        <td>{val.payment_details}</td>
                        <td>
                          {/* <Badge color="none" className="badge-orange"> */}
                          <Badge color="none" className="badge-green">
                            Payé
                          </Badge>
                        </td>
                        <td>{val.amount}</td>
                      </tr>
                    );
                  })}
                {/* <tr>
                    <td>
                      <Image
                        className="avatar w-8 h-8 rounded-circle me-2"
                        src={UserPlaceholderA}
                        alt="user Image"
                      />
                      <span>Allan Moulin</span>
                    </td>
                    <td>04/Jan/23</td>
                    <td>
                      Bonus
                      <span
                        className="bonus-tooltip ms-1 text-light-blue-a text-orange-hover cursor-pointer"
                        href=""
                        id="bonusTooltip"
                      >
                        <InfoCircle size="16" className="" />
                      </span>
                      <UncontrolledTooltip
                        placement="right"
                        target="bonusTooltip"
                        // trigger="click"
                      >
                        <div className="text-start">
                          <h6 className="text-sm mb-2">Bonus information</h6>
                          <p className="text-light-blue-a">
                            This bonus regards to lorem ipsum dolor sit amet.
                          </p>
                        </div>
                      </UncontrolledTooltip>
                    </td>
                    <td>
                      <Badge color="none" className="badge-green">
                        Payé
                      </Badge>
                    </td>
                    <td>90,00</td>
                    <td>
                      <Button
                        color="none"
                        className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                      >
                        <ArrowCircleDown2 size="18" className="me-2" />{" "}
                        {t("Payment.DownloadBtn")}
                      </Button>
                    </td>
                  </tr> */}
              </tbody>
            </Table>
          </CardBody>
          <CardFooter>
            <PaginationComponent
              totalPage={getAllPymentDeducations?.totalPages}
              page={currentPage}
              changePageToNumberHandal={(e) => changePageToNumberHandal(e)}
              nextAndPrevHandal={(e) => nextAndPrevHandal(e)}
            />
          </CardFooter>
        </Card>
      </Layout>
    </>
  );
}

export default withAuth(Payment);
