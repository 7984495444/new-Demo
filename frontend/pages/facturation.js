import React, { useState } from "react";
import {
  UncontrolledTooltip,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Badge,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Table,
  Dropdown,
} from "reactstrap";
import Image from "next/image";
import { Layout, PaginationComponent } from "@/components";
import {
  MoneyRecive,
  ArrowCircleDown2,
  InfoCircle,
  ArrowDown2,
} from "iconsax-react";
import {
  profilePlaceholder,
  UserPlaceholderB,
  UserPlaceholderC,
} from "@/assets/images/index";
import withAuth from "./authRouter";
import Select, { components } from "react-select";
import { t } from "i18next";
import Link from "next/link";

const Facturation = ({ direction, ...args }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  let curr = new Date().getFullYear();
  let nextYears = [];
  for (let i = 0; i <= 3; i++) {
    let y = curr - i;
    nextYears.push({ y });
  }

  const dropdownOptions = [
    {
      label: "Élève",
      options: [
        {
          value: "1",
          avatar: profilePlaceholder,
          label: "Mes élèves",
        },
        {
          value: "2",
          avatar: UserPlaceholderB,
          label: "John Garnier",
        },
        {
          value: "3",
          avatar: UserPlaceholderC,
          label: "Avril Dupont",
        },
      ],
    },
  ];

  const formatOptionLabel = ({ avatar, label }) => (
    <div className="hstack gap-3 p-0 cursor-pointer">
      <Image
        src={avatar}
        className="avatar avatar-xs rounded-pill flex-none"
        alt="avatar"
      />
      <div className="flex-fill">
        <h6 className="text-base">{label}</h6>
        <span className="text-neutral-secondary"></span>
      </div>
    </div>
  );

  // Toggle active state for Tab
  const [currentActiveTab, setCurrentActiveTab] = useState("MyPayments");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInfo, setSearchInfo] = useState("");
  const [perPage] = useState(10);

  const navToggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <ArrowDown2 size={10} />
      </components.DropdownIndicator>
    );
  };

  return (
    <Layout>
      <Card>
        <CardBody>
          <div className="nav-tab-custom">
            <Nav className="gap-4 mb-8">
              <NavItem>
                <Link
                  className={`tab-link ${
                    currentActiveTab === "MyPayments" ? "active" : ""
                  }`}
                  onClick={() => {
                    navToggle("MyPayments");
                  }}
                  href=""
                >
                  {t("Facturation.MyPayments")}
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  className={`tab-link ${
                    currentActiveTab === "MonthlyStatements" ? "active" : ""
                  }`}
                  onClick={() => {
                    navToggle("MonthlyStatements");
                  }}
                  href=""
                >
                  {t("Facturation.MonthlyStatements")}
                </Link>
              </NavItem>
            </Nav>
          </div>
          <TabContent activeTab={currentActiveTab}>
            <TabPane tabId="MyPayments">
              <Row className="gy-6">
                <Col xxl="3" xl="4" sm="6">
                  <Card className="h-full border-light-blue-c">
                    <CardHeader className="px-5 pt-5 pb-2">
                      <p>{t("Facturation.Account")}</p>
                    </CardHeader>
                    <CardBody className="px-5 pt-2 pb-5">
                      <div className="hstack gap-5">
                        <span className="h-50px w-50px rounded-2 icon-wrapper wrapper-orange flex-none">
                          <MoneyRecive size="22" className="icon-main" />
                        </span>
                        <h2>120,00</h2>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col xxl="3" xl="4" sm="6">
                  <Card className="h-full border-light-blue-c">
                    <CardHeader className="px-5 pt-5 pb-2">
                      <p>{t("Facturation.LastStatementDate")}</p>
                    </CardHeader>
                    <CardBody className="px-5 pt-2 pb-5">
                      <div className="hstack gap-5">
                        <span className="h-50px w-50px rounded-2 icon-wrapper wrapper-green flex-none">
                          <MoneyRecive size="22" className="icon-main" />
                        </span>
                        <h2>04/Fév</h2>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col xxl className="px-0 hstack d-xxl-flex d-none">
                  <hr className="w-full text-light-blue-c opacity-100" />
                </Col>
                <Col xxl="3" xl="4" sm="6">
                  <Card className="h-full border-light-blue-c">
                    <CardHeader className="px-5 pt-5 pb-2">
                      <Row className="align-items-center">
                        <Col xs="6">
                          <Select
                            openMenuOnClick={true}
                            defaultValue={dropdownOptions[0].options[0]}
                            formatOptionLabel={formatOptionLabel}
                            options={dropdownOptions}
                            isSearchable={false}
                            classNamePrefix="react-select-type-1"
                            className="react-select-type-1"
                            // defaultMenuIsOpen
                            components={{
                              IndicatorSeparator: () => null,
                              DropdownIndicator,
                            }}
                            styles={{
                              control: (provided) => ({
                                ...provided,
                                minHeight: "auto",
                              }),
                              dropdownIndicator: (provided, state) => ({
                                ...provided,
                                transform:
                                  state.selectProps.menuIsOpen &&
                                  "rotate(180deg)",
                              }),
                              valueContainer: (provided) => ({
                                ...provided,
                                padding: "0",
                              }),
                            }}
                            classNames={{
                              control: () =>
                                "shadow-none border-0 bg-transparent",
                              dropdownIndicator: () =>
                                "font-regular text-xs text-dark-blue-a cursor-pointer",
                              option: () => "bg-white py-1",
                              menu: () => "border-0 rounded-2 shadow-a",
                              menuList: () => "py-0 rounded-2",
                            }}
                          />
                        </Col>
                        <Col xs="6" className="text-end">
                          <Dropdown
                            isOpen={dropdownOpen}
                            toggle={toggle}
                            direction={direction}
                          >
                            <DropdownToggle
                              className="dropdown-caret-animate font-bold"
                              color="none"
                              tag={"span"}
                            >
                              <ArrowCircleDown2 size="12" className="mt-n1" />
                              <span className="mx-1 text-underline">
                                {t("Facturation.Download")}
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
                                <span className="text-light-blue-a">2023</span>
                              </DropdownItem>
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
                        <div>
                          <p>Sommaire annuel</p>
                          <h2>370,00</h2>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <div
                className="min-h-lg-calc min-h-xl-calc py-6"
                style={{ ["--x-h-lg"]: "550px", ["--x-h-xl"]: "436px" }}
              >
                <Table
                  className="table-nowrap"
                  style={{ minWidth: "1300px" }}
                  responsive
                >
                  <thead>
                    <tr>
                      <th width="10%">
                        <span className="font-bolder">
                          {t("Facturation.PayDate")}
                        </span>
                      </th>
                      <th width="10%">
                        <span className="font-bolder">
                          {t("Facturation.Payment")}
                        </span>
                      </th>
                      <th width="10%">
                        <span className="font-bolder">
                          {t("Facturation.PayDetails")}
                        </span>
                      </th>
                      <th width="10%">
                        <span className="font-bolder">
                          {t("Facturation.SessionDate")}
                        </span>
                      </th>
                      <th width="15%">
                        <span className="font-bolder">
                          {t("Facturation.SessionDuration")}
                        </span>
                      </th>
                      <th width="15%">
                        <span className="font-bolder">
                          {t("Facturation.Student")}
                        </span>
                      </th>
                      <th width="8%">
                        <span className="font-bolder">
                          {t("Facturation.Amount")} ($)
                        </span>
                      </th>
                      <th width="15%">
                        <span className="font-bolder">
                          {t("Facturation.Actions")}
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-bold">04/Jan/23</td>
                      <td>
                        <Badge color="none" className="badge-green font-bold">
                          Payé
                        </Badge>
                      </td>
                      <td>
                        <span className="font-bold">Bonus</span>
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
                        >
                          <div className="text-start">
                            <h6 className="text-sm mb-2">Bonus information</h6>
                            <p className="text-light-blue-a">
                              This bonus regards to lorem ipsum dolor sit amet.
                            </p>
                          </div>
                        </UncontrolledTooltip>
                      </td>
                      <td className="font-bold">04/Dec/22</td>
                      <td className="font-bold">1h</td>
                      <td>
                        <div className="hstack gap-2">
                          <Image
                            src={profilePlaceholder}
                            className="avatar avatar-sm rounded-pill flex-none"
                            alt="avatar"
                          />
                          <span className="font-bold">John Garnier</span>
                        </div>
                      </td>
                      <td className="font-bold">90,00</td>
                      <td>
                        <Button
                          color="none"
                          className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                        >
                          <ArrowCircleDown2 size="18" className="me-2" />{" "}
                          {t("Facturation.DownloadStatement")}
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <PaginationComponent />
            </TabPane>
            <TabPane tabId="MonthlyStatements">
              <div
                className="min-h-lg-calc pb-6"
                style={{ ["--x-h-lg"]: "290px" }}
              >
                <Table responsive>
                  <thead>
                    <tr>
                      <th width="10%">
                        <span className="font-bolder">
                          {t("Facturation.Month")}
                        </span>
                      </th>
                      <th width="75%">
                        <span className="font-bolder">
                          {t("Facturation.Year")}
                        </span>
                      </th>
                      <th width="15%">
                        <span className="font-bolder">
                          {t("Facturation.Actions")}
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>
                        <span className="font-semibold">Janvier</span>
                      </th>
                      <td>
                        <span className="font-semibold">2023</span>
                      </td>
                      <td>
                        <Button
                          color="none"
                          className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                        >
                          <ArrowCircleDown2 size="18" className="me-2" />{" "}
                          {t("Facturation.DownloadStatement")}
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <PaginationComponent />
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default withAuth(Facturation);
