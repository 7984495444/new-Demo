import React, { useState } from "react";
import { t } from "i18next";
import Image from "next/image";
import { Layout, PaginationComponent } from "@/components";
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";
import {
  ArrowDown2,
  ArrowLeft,
  ArrowUp,
  SearchNormal1,
  User,
} from "iconsax-react";
import { Rating } from "react-simple-star-rating";
import { TimeMoney, profilePlaceholder } from "@/assets/images";
import Select, { components } from "react-select";
import withAuth from "./authRouter";
import Link from "next/link";
import { MdClose, MdDone } from "react-icons/md";

const Tutors = () => {
  const [showProfile, setShowProfile] = useState(false);

  const setShowProfileHandle = () => {
    setShowProfile(!showProfile);
  };

  const detailTypeOptions = [
    { value: "first-last-name", label: "Prénom/nom" },
    { value: "id", label: "ID" },
    { value: "admin-ssociate", label: "Admin Associé" },
    { value: "phone", label: "Téléphone" },
    { value: "email", label: "Couriel" },
    { value: "program-date-strat-end", label: "Date du programme (début/fin)" },
    { value: "levels/subjects", label: "Niveaux/Matières" },
    { value: "home-school", label: "École de provenance" },
    { value: "program-title", label: "Titre programme" },
    { value: "status-active-inactive", label: "Status (actif/inactif)" },
    {
      value: "activation-date-start-end",
      label: "Date d’activation (début/fin)",
    },
  ];

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <ArrowDown2 size={16} className="text-dark-blue-a" />
      </components.DropdownIndicator>
    );
  };

  // Toggle active state for Tab
  const [currentActiveTab, setCurrentActiveTab] = useState("PersonalInfo");

  const navToggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  return (
    <Layout>
      {showProfile ? (
        <Card>
          <CardBody>
            <div className="d-flex gap-3 mb-4 position-lg-absolute top-lg-0 start-lg-0 mt-lg-n10 w-full">
              <span
                className="cursor-pointer"
                onClick={() => setShowProfileHandle()}
              >
                <ArrowLeft size={18} />
              </span>
              <Breadcrumb>
                <BreadcrumbItem active>Norman Parker</BreadcrumbItem>
              </Breadcrumb>
            </div>
            <Row className="gx-lg-12">
              <Col xxl="3" xl="3" lg="3" md="12" sm="12" xs="12">
                <div className="position-lg-sticky top-5">
                  <div className="hstack gap-4 pb-6 mb-6 border-bottom">
                    <Image
                      src={profilePlaceholder}
                      className="avatar h-18 w-18 rounded-pill"
                      alt="avatar"
                    />
                    <div>
                      <h6>Norman Parker</h6>
                      <Badge
                        className="bg-light-blue-c text-dark-blue-c mt-2"
                        color
                      >
                        Tuteur
                      </Badge>
                    </div>
                  </div>
                  <Nav className="gap-2" vertical>
                    <NavItem>
                      <NavLink
                        className={`px-0 ${
                          currentActiveTab === "PersonalInfo"
                            ? "text-dark-blue-a font-bold"
                            : ""
                        }`}
                        onClick={() => {
                          navToggle("PersonalInfo");
                        }}
                        href=""
                      >
                        Personal Info
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={`px-0 ${
                          currentActiveTab === "TutorProfile"
                            ? "text-dark-blue-a font-bold"
                            : ""
                        }`}
                        onClick={() => {
                          navToggle("TutorProfile");
                        }}
                        href=""
                      >
                        Tutor Profile
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={`px-0 ${
                          currentActiveTab === "AssociatedStudents"
                            ? "text-dark-blue-a font-bold"
                            : ""
                        }`}
                        onClick={() => {
                          navToggle("AssociatedStudents");
                        }}
                        href=""
                      >
                        Associated Students
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={`px-0 ${
                          currentActiveTab === "Calendar"
                            ? "text-dark-blue-a font-bold"
                            : ""
                        }`}
                        onClick={() => {
                          navToggle("Calendar");
                        }}
                        href=""
                      >
                        Calendar
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={`px-0 ${
                          currentActiveTab === "Accounting"
                            ? "text-dark-blue-a font-bold"
                            : ""
                        }`}
                        onClick={() => {
                          navToggle("Accounting");
                        }}
                        href=""
                      >
                        Accounting
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={`px-0 ${
                          currentActiveTab === "Comments"
                            ? "text-dark-blue-a font-bold"
                            : ""
                        }`}
                        onClick={() => {
                          navToggle("Comments");
                        }}
                        href=""
                      >
                        Comments
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={`px-0 ${
                          currentActiveTab === "Evaluations"
                            ? "text-dark-blue-a font-bold"
                            : ""
                        }`}
                        onClick={() => {
                          navToggle("Evaluations");
                        }}
                        href=""
                      >
                        Evaluations
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={`px-0 ${
                          currentActiveTab === "Documents"
                            ? "text-dark-blue-a font-bold"
                            : ""
                        }`}
                        onClick={() => {
                          navToggle("Documents");
                        }}
                        href=""
                      >
                        Documents
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Col>
              <Col
                xxl="9"
                xl="9"
                lg="9"
                md="12"
                sm="12"
                xs="12"
                className="border-start-lg min-h-lg-calc"
                style={{ ["--x-h-lg"]: "145px" }}
              >
                <TabContent activeTab={currentActiveTab}>
                  <TabPane tabId="PersonalInfo">
                    <Row
                      xs="auto"
                      className="align-items-center justify-content-between mb-5"
                    >
                      <Col>
                        <h6>Info personelles</h6>
                      </Col>
                      <Col>
                        <Button
                          color="none"
                          className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                        >
                          Modifier
                        </Button>
                      </Col>
                    </Row>
                    <div className="hstack gap-4 mb-6">
                      <span className="avatar h-18 w-18 rounded-pill bg-light-blue-c">
                        <User />
                      </span>
                      <div>
                        <p className="mb-2">Profile Image</p>
                        <Button color="dark-blue-c" size="sm">
                          Upload photo
                        </Button>
                      </div>
                    </div>
                    <Row sm="2" xs="1" className="gx-sm-12 gy-6">
                      <Col>
                        <Label>Prénom</Label>
                        <Input
                          className="custom-input-1"
                          plaintext={true}
                          value="James"
                          type="text"
                          disabled="true"
                        />
                      </Col>
                      <Col>
                        <Label>Nom de famille</Label>
                        <Input
                          className="custom-input-1"
                          plaintext={true}
                          value="Torin"
                          type="text"
                          disabled="true"
                        />
                      </Col>
                      <Col>
                        <Label>Téléphone</Label>
                        <Input
                          className="custom-input-1"
                          plaintext={true}
                          value="123 098 345"
                          type="text"
                          disabled="true"
                        />
                      </Col>
                      <Col>
                        <Label>Courriel</Label>
                        <Input
                          className="custom-input-1"
                          plaintext={true}
                          value="Jamest1990@email.com"
                          type="text"
                          disabled="true"
                        />
                      </Col>
                      <Col>
                        <Label>Numéro d'assurance social (NAS)</Label>
                        <Input
                          className="custom-input-1"
                          plaintext={true}
                          value="*********"
                          type="text"
                          disabled="true"
                        />
                      </Col>
                      <Col>
                        <Label>Street Address</Label>
                        <Input
                          className="custom-input-1"
                          plaintext={true}
                          value="1039 Broad Street"
                          type="text"
                          disabled="true"
                        />
                      </Col>
                      <Col>
                        <Row xs="2">
                          <Col>
                            <Label>Mot de passe</Label>
                            <Input
                              className="custom-input-1"
                              plaintext={true}
                              value="**********"
                              type="text"
                              disabled="true"
                            />
                          </Col>
                          <Col>
                            <Label>Confirmation du mot de passe </Label>
                            <Input
                              className="custom-input-1"
                              plaintext={true}
                              value="**********"
                              type="text"
                              disabled="true"
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Row xs="3">
                          <Col>
                            <Label>Apartment N.</Label>
                            <Input
                              className="custom-input-1"
                              plaintext={true}
                              value="123"
                              type="text"
                              disabled="true"
                            />
                          </Col>
                          <Col>
                            <Label>ZIP Code</Label>
                            <Input
                              className="custom-input-1"
                              plaintext={true}
                              value="15205"
                              type="text"
                              disabled="true"
                            />
                          </Col>
                          <Col>
                            <Label>Province</Label>
                            <Input
                              className="custom-input-1"
                              plaintext={true}
                              value="Québec"
                              type="text"
                              disabled="true"
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Row xs="2">
                          <Col>
                            <Label>Date of birth</Label>
                            <Input
                              className="custom-input-1"
                              plaintext={true}
                              value="15 Mars 2023"
                              type="text"
                              disabled="true"
                            />
                          </Col>
                          <Col>
                            <Label>Language</Label>
                            <Input
                              className="custom-input-1"
                              plaintext={true}
                              value="English"
                              type="text"
                              disabled="true"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Card className="border mt-8" style={{ maxWidth: "800px" }}>
                      <CardBody className="p-5">
                        <p className="mb-4">
                          Taux/Horaire (Editable by admin only)
                        </p>
                        <Row className="align-items-end gy-4">
                          <Col sm="auto" xs="12">
                            <span className="h-50px w-50px rounded-2 icon-wrapper wrapper-blue flex-none bg-light-blue-c">
                              <Image
                                className="icon-main"
                                src={TimeMoney}
                                alt="Time"
                              />
                            </span>
                          </Col>
                          <Col sm="auto" xs="6">
                            <Label>Accompagnement</Label>
                            <div className="position-relative">
                              <Input
                                className="custom-input-1 py-2"
                                maxLength="4"
                                value="20"
                                plaintext={true}
                                type="text"
                                autoComplete="off"
                                disabled="true"
                              />
                              <span className="position-absolute bottom-0 start-8 px-2 bg-white bottom-1 lh-loose">
                                /heure
                              </span>
                            </div>
                          </Col>
                          <Col sm="auto" xs="6">
                            <Label>Rattrapage</Label>
                            <div className="position-relative">
                              <Input
                                className="custom-input-1 py-2"
                                maxLength="4"
                                value="25"
                                plaintext={true}
                                type="text"
                                autoComplete="off"
                                disabled="true"
                              />
                              <span className="position-absolute bottom-0 start-8 px-2 bg-white bottom-1 lh-loose">
                                /heure
                              </span>
                            </div>
                          </Col>
                          <Col sm="auto" xs="6">
                            <Label>Préparation à un examen</Label>
                            <div className="position-relative">
                              <Input
                                className="custom-input-1 py-2"
                                maxLength="4"
                                value="30"
                                plaintext={true}
                                type="text"
                                autoComplete="off"
                                disabled="true"
                              />
                              <span className="position-absolute bottom-0 start-8 px-2 bg-white bottom-1 lh-loose">
                                /heure
                              </span>
                            </div>
                          </Col>
                          <Col sm="auto" xs="6">
                            <Label>Enrichissement</Label>
                            <div className="position-relative">
                              <Input
                                className="custom-input-1 py-2"
                                maxLength="4"
                                value="30"
                                plaintext={true}
                                type="text"
                                autoComplete="off"
                                disabled="true"
                              />
                              <span className="position-absolute bottom-0 start-8 px-2 bg-white bottom-1 lh-loose">
                                /heure
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </TabPane>
                  <TabPane tabId="TutorProfile">
                    <Row xs="auto" className="gx-20">
                      <Col>
                        <h6 style={{ minHeight: "26px" }}>
                          Norman Parker
                          <Badge
                            color="none"
                            className="bg-light-blue-c text-dark-blue-c text-8 p-1 ms-8"
                          >
                            TUTEUR
                          </Badge>
                        </h6>
                        <p className="text-light-blue-a">Québec, Canada</p>
                      </Col>
                      <Col>
                        <h6 style={{ minHeight: "26px" }}>Language</h6>
                        <p className="text-light-blue-a">
                          English, French, Spanish
                        </p>
                      </Col>
                      <Col>
                        <h6 style={{ minHeight: "26px" }}>N. d’élèves</h6>
                        <p className="text-light-blue-a">2/4 </p>
                      </Col>
                    </Row>
                    <div className="py-10 border-bottom">
                      <h6 className="mb-8">Who am I</h6>
                      <p className="text-light-blue-a">
                        Hello, I'm a tutor of mathematics and physics with a
                        passion for helping students achieve their academic
                        goals. I have always loved these subjects and enjoy
                        sharing my knowledge and expertise with others. I hold a
                        degree in Physics and have several years of experience
                        teaching both math and physics to students of various
                        ages and skill levels.
                      </p>
                    </div>
                    <div className="py-10 border-bottom">
                      <h6 className="mb-8">Availability</h6>
                      <Row className="gy-6">
                        <Col sm="6">
                          <div
                            className="hstack gap-2 mb-2"
                            style={{ minHeight: "32px" }}
                          >
                            <h6 className="font-semibold text-sm">
                              Regular Availability
                            </h6>
                          </div>
                          <div className="vstack gap-4">
                            <div>
                              <span className="text-sm">Lundi — </span>
                              <span className="text-light-blue-a">
                                8:00 to 9:00 / 11:00 to 15:00
                              </span>
                            </div>
                            <div>
                              <span className="text-sm">Mardi — </span>
                              <span className="text-light-blue-a">
                                15:00 to 16h00
                              </span>
                            </div>
                            <div>
                              <span className="text-sm">Mercredi — </span>
                              <span className="text-light-blue-a">
                                18:00 to 19:00
                              </span>
                            </div>
                            <div>
                              <span className="text-sm">Jeudi — </span>
                              <span className="text-light-blue-a">
                                8:00 to 9:00 / 11:00 to 15:00
                              </span>
                            </div>
                            <div>
                              <span className="text-sm">Vendredi — </span>
                              <span className="text-light-blue-a">
                                15:00 to 16h00 / 17:00 to 18:00
                              </span>
                            </div>
                            <div>
                              <span className="text-sm">Samedi — </span>
                              <span className="text-light-blue-a">
                                8:00 to 11:00 / 15:00 to 16h00
                              </span>
                            </div>
                            <div>
                              <span className="text-sm">Dimanche — </span>
                              <span className="text-light-blue-a">
                                8:00 to 11:00
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col sm="6">
                          <div
                            className="hstack gap-3 mb-2"
                            style={{ minHeight: "32px" }}
                          >
                            <h6 className="font-semibold text-sm">
                              Special Availability
                            </h6>
                            <Badge
                              className="bg-light-blue-c text-dark-blue-c"
                              color
                            >
                              Mars 4 — Avril 19
                            </Badge>
                          </div>
                          <div className="vstack gap-4">
                            <div>
                              <span className="text-sm">Lundi — </span>
                              <span className="text-light-blue-a">
                                8:00 to 9:00
                              </span>
                            </div>
                            <div>
                              <span className="text-sm">Mardi — </span>
                              <span className="text-light-blue-a">
                                8:00 to 11:00 / 17:00 to 18:00
                              </span>
                            </div>
                            <div>
                              <span className="text-sm">Mercredi — </span>
                              <span className="text-light-blue-a">
                                8:00 to 9:00 / 11:00 to 15:00
                              </span>
                            </div>
                            <div>
                              <span className="text-sm">Jeudi — </span>
                              <span className="text-light-blue-a">
                                8:00 to 9:00 / 11:00 to 15:00
                              </span>
                            </div>
                            <div>
                              <span className="text-sm">Vendredi — </span>
                              <span className="text-light-blue-a">
                                8:00 to 11:00
                              </span>
                            </div>
                            <div>
                              <span className="text-sm">Samedi — </span>
                              <span className="text-light-blue-a">
                                17:00 to 18:00
                              </span>
                            </div>
                            <div>
                              <span className="text-sm">Dimanche — </span>
                              <span className="text-light-blue-a">
                                15:00 to 16h00 / 17:00 to 18:00
                              </span>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="py-10 border-bottom">
                      <h6 className="mb-8">Niveaux et matières enseignées</h6>
                      <div>
                        <h6 className="mb-4">Préscolaire</h6>
                        <div className="hstack gap-2 flex-wrap">
                          <Badge className="bg-light-blue-c" color>
                            Français préscolaire
                          </Badge>
                          <Badge className="bg-light-blue-c" color>
                            Mathématique préscolaire
                          </Badge>
                          <Badge className="bg-light-blue-c" color>
                            Anglais préscolaire
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-8">
                        <h6 className="mb-1">Primaire</h6>
                        <Row>
                          <Col sm="6" xl="4">
                            <Label className="text-light-blue-a">
                              Cinquième année
                            </Label>
                            <div className="hstack gap-2 flex-wrap mt-2">
                              <Badge className="bg-light-blue-c" color>
                                Français
                              </Badge>
                              <Badge className="bg-light-blue-c" color>
                                Mathématique
                              </Badge>
                            </div>
                          </Col>
                          <Col sm="6" xl="4">
                            <Label className="text-light-blue-a">
                              Sixième année
                            </Label>
                            <div className="hstack gap-2 flex-wrap mt-2">
                              <Badge className="bg-light-blue-c" color>
                                Français
                              </Badge>
                              <Badge className="bg-light-blue-c" color>
                                Mathématique
                              </Badge>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div className="mt-8">
                        <h6 className="mb-1">{t("Profile.SecondaryLevel")}</h6>
                        <Row className="gy-8">
                          <Col sm="6" xl="4">
                            <Label className="text-light-blue-a">
                              Secondaire 1
                            </Label>
                            <div className="hstack gap-2 flex-wrap mt-2">
                              <Badge className="bg-light-blue-c" color>
                                Français
                              </Badge>
                              <Badge className="bg-light-blue-c" color>
                                Français langue seconde
                              </Badge>
                              <Badge className="bg-light-blue-c" color>
                                Mathématique
                              </Badge>
                            </div>
                          </Col>
                          <Col sm="6" xl="4">
                            <Label className="text-light-blue-a">
                              Secondaire 2
                            </Label>
                            <div className="hstack gap-2 flex-wrap mt-2">
                              <Badge className="bg-light-blue-c" color>
                                Français
                              </Badge>
                              <Badge className="bg-light-blue-c" color>
                                Français langue seconde
                              </Badge>
                              <Badge className="bg-light-blue-c" color>
                                Mathématique
                              </Badge>
                            </div>
                          </Col>
                          <Col sm="6" xl="4">
                            <Label className="text-light-blue-a">
                              Secondaire 3
                            </Label>
                            <div className="hstack gap-2 flex-wrap mt-2">
                              <Badge className="bg-light-blue-c" color>
                                Français
                              </Badge>
                              <Badge className="bg-light-blue-c" color>
                                Français langue seconde
                              </Badge>
                              <Badge className="bg-light-blue-c" color>
                                Mathématique
                              </Badge>
                            </div>
                          </Col>
                          <Col sm="6" xl="4">
                            <Label className="text-light-blue-a">
                              Secondaire 4
                            </Label>
                            <div className="hstack gap-2 flex-wrap mt-2">
                              <Badge className="bg-light-blue-c" color>
                                Français
                              </Badge>
                              <Badge className="bg-light-blue-c" color>
                                Français langue seconde
                              </Badge>
                              <Badge className="bg-light-blue-c" color>
                                Mathématique
                              </Badge>
                            </div>
                          </Col>
                          <Col sm="6" xl="4">
                            <Label className="text-light-blue-a">
                              Secondaire 5
                            </Label>
                            <div className="hstack gap-2 flex-wrap mt-2">
                              <Badge className="bg-light-blue-c" color>
                                Français
                              </Badge>
                              <Badge className="bg-light-blue-c" color>
                                Français langue seconde
                              </Badge>
                              <Badge className="bg-light-blue-c" color>
                                Mathématique
                              </Badge>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <div className="py-10 border-bottom">
                      <h6 className="mb-8">
                        Maîtrise des difficultés d'apprentissage
                      </h6>
                      <table className="text-sm lh-loose w-full">
                        <thead>
                          <tr>
                            <th className="text-start pb-4" width="40%">
                              Difficultés
                            </th>
                            <th className="text-center pb-4" width="15%">
                              Oui
                            </th>
                            <th className="text-center pb-4" width="15%">
                              Non
                            </th>
                            <th className="text-center pb-4" width="15%">
                              Ne sais pas
                            </th>
                            <th className="text-center pb-4" width="15%"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-start text-light-blue-a">
                              Déficit d’attention (avec ou sans hyperactivité)
                            </td>
                            <td className="text-center">
                              <MdDone className="text-xl text-dark-blue-c" />
                            </td>
                            <td className="text-center">
                              <MdClose className="text-xl text-light-a" />
                            </td>
                            <td className="text-center">
                              <MdClose className="text-xl text-light-a" />
                            </td>
                            <td className="text-center"></td>
                          </tr>
                          <tr>
                            <td className="text-start text-light-blue-a">
                              Dysphasie
                            </td>
                            <td className="text-center">
                              <MdDone className="text-xl text-light-a" />
                            </td>
                            <td className="text-center">
                              <MdClose className="text-xl text-orange" />
                            </td>
                            <td className="text-center">
                              <MdClose className="text-xl text-light-a" />
                            </td>
                            <td className="text-center"></td>
                          </tr>
                          <tr>
                            <td className="text-start text-light-blue-a">
                              Autisme / Trouble du spectre autistique (TSA)
                            </td>
                            <td className="text-center">
                              <MdDone className="text-xl text-light-a" />
                            </td>
                            <td className="text-center">
                              <MdClose className="text-xl text-light-a" />
                            </td>
                            <td className="text-center">
                              <MdClose className="text-xl text-light-blue-a" />
                            </td>
                            <td className="text-center"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="py-10 border-bottom">
                      <h6 className="mb-8">Ma personnalité</h6>
                      <table className="text-sm lh-loose w-full">
                        <thead>
                          <tr>
                            <th className="text-start pb-4" width="40%">
                              Je suis...
                            </th>
                            <th className="text-center pb-4" width="15%">
                              Très
                            </th>
                            <th className="text-center pb-4" width="15%">
                              Assez
                            </th>
                            <th className="text-center pb-4" width="15%">
                              Peu
                            </th>
                            <th className="text-center pb-4" width="15%">
                              Pas de tout
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-start text-light-blue-a">
                              Timide
                            </td>
                            <td className="text-center">
                              <MdDone className="text-xl text-dark-blue-c" />
                            </td>
                            <td className="text-center">
                              <MdClose className="text-xl text-light-a" />
                            </td>
                            <td className="text-center">
                              <MdClose className="text-xl text-light-a" />
                            </td>
                            <td className="text-center">
                              <MdClose className="text-xl text-light-a" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="py-10 border-bottom">
                      <h6 className="mb-8">Intérêts</h6>
                      <Row sm="4" xs="2" className="gy-4">
                        <Col>
                          <h6 className="text-sm font-semibold">Sports</h6>
                        </Col>
                        <Col>
                          <h6 className="text-sm font-semibold">Jeux Video</h6>
                        </Col>
                        <Col>
                          <h6 className="text-sm font-semibold">Cinéma</h6>
                        </Col>
                        <Col>
                          <h6 className="text-sm font-semibold">Voyage</h6>
                        </Col>
                      </Row>
                    </div>
                    <div className="py-10 border-bottom">
                      <h6 className="mb-8">Education</h6>
                      <Row sm="4" xs="2" className="gy-4">
                        <Col>
                          <h6 className="text-sm font-semibold mb-2">
                            Physics degree
                          </h6>
                          <p className="text-light-blue-a">
                            Lorem Ipsum University
                          </p>
                          <p className="text-light-blue-a">2010-2014</p>
                        </Col>
                        <Col>
                          <h6 className="text-sm font-semibold mb-2">
                            Physics PG
                          </h6>
                          <p className="text-light-blue-a">
                            Lorem Ipsum University
                          </p>
                          <p className="text-light-blue-a">2015-2017</p>
                        </Col>
                        <Col>
                          <h6 className="text-sm font-semibold mb-2">
                            Mathematiques degree
                          </h6>
                          <p className="text-light-blue-a">
                            Lorem Ipsum University
                          </p>
                          <p className="text-light-blue-a">2017-2021</p>
                        </Col>
                      </Row>
                    </div>
                    <div className="py-10 border-bottom">
                      <h6 className="mb-8">Expériences proffessionelles</h6>
                      <Row sm="4" xs="2" className="gy-4">
                        <Col>
                          <h6 className="text-sm font-semibold mb-2">
                            PExpériences proffessionelles
                          </h6>
                          <p className="text-light-blue-a">
                            Lorem Ipsum University
                          </p>
                          <p className="text-light-blue-a">2010-2014</p>
                        </Col>
                        <Col>
                          <h6 className="text-sm font-semibold mb-2">
                            Mathemariques teacher
                          </h6>
                          <p className="text-light-blue-a">
                            Lorem Ipsum University
                          </p>
                          <p className="text-light-blue-a">2015-2017</p>
                        </Col>
                      </Row>
                    </div>
                    <div className="py-10 border-bottom">
                      <h6 className="mb-8">Expériences de tutorat</h6>
                      <p className="text-light-blue-a">
                        Hello, I'm a tutor of mathematics and physics with a
                        passion for helping students achieve their academic
                        goals. I have always loved these subjects and enjoy
                        sharing my knowledge and expertise with others. I hold a
                        degree in Physics and have several years of experience
                        teaching both math and physics to students of various
                        ages and skill levels.
                      </p>
                    </div>
                    <div className="py-10">
                      <h6 className="mb-8">Expériences auprès des enfants</h6>
                      <p className="text-light-blue-a">
                        Hello, I'm a tutor of mathematics and physics with a
                        passion for helping students achieve their academic
                        goals. I have always loved these subjects and enjoy
                        sharing my knowledge and expertise with others. I hold a
                        degree in Physics and have several years of experience
                        teaching both math and physics to students of various
                        ages and skill levels.
                      </p>
                    </div>
                  </TabPane>
                  <TabPane tabId="AssociatedStudents">
                    <h6 className="mb-6">Élèves associés</h6>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th className="font-bolder">ID</th>
                          <th className="font-bolder">Élève</th>
                          <th className="font-bolder">Admin associé</th>
                          <th className="font-bolder">Titre du programme</th>
                          <th className="font-bolder">
                            Progression du programme
                          </th>
                          <th className="font-bolder">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>#9495</td>
                          <td>
                            <Image
                              className="avatar w-8 h-8 rounded-circle me-3"
                              src={profilePlaceholder}
                              alt="User Image"
                            />
                            <span>Allan Moulin</span>
                          </td>
                          <td>
                            <Image
                              className="avatar w-8 h-8 rounded-circle me-3"
                              src={profilePlaceholder}
                              alt="User Image"
                            />
                            <span>John Garnier</span>
                          </td>
                          <td>Acompagnement</td>
                          <td>2/8</td>
                          <td>
                            <Button
                              color="light-blue-c"
                              className="text-dark-blue-c"
                            >
                              <User className="me-1" size={16} />
                              Voir détails
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </TabPane>
                  <TabPane tabId="Calendar">Calendar</TabPane>
                  <TabPane tabId="Accounting">Accounting</TabPane>
                  <TabPane tabId="Comments">Comments</TabPane>
                  <TabPane tabId="Evaluations">Evaluations</TabPane>
                  <TabPane tabId="Documents">Documents</TabPane>
                </TabContent>
              </Col>
            </Row>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardHeader className="pb-2">
            <Row className="align-items-center gy-4">
              <Col xs="12" sm="4">
                <h6 className="text-base">Tuteur.ices (Tutor)</h6>
              </Col>
              <Col xs="12" sm="8">
                <div className="hstack justify-content-end gap-4 w-max px-4 border rounded-2 border-light-blue-a ms-auto">
                  <Select
                    // menuIsOpen
                    isSearchable={false}
                    menuPortalTarget={document.body}
                    options={detailTypeOptions}
                    components={{
                      IndicatorSeparator: () => null,
                      DropdownIndicator,
                    }}
                    styles={{
                      menuPortal: (base) => ({
                        ...base,
                        zIndex: 9999,
                      }),
                      IndicatorsContainer: (provided) => ({
                        ...provided,
                        padding: "0",
                      }),
                      valueContainer: (provided) => ({
                        ...provided,
                        padding: "0px",
                      }),
                      control: (provided) => ({
                        ...provided,
                        minHeight: "auto",
                        border: "none",
                      }),
                      dropdownIndicator: (provided, state) => ({
                        ...provided,
                        transform:
                          state.selectProps.menuIsOpen && "rotate(180deg)",
                      }),
                      option: (base) => ({
                        ...base,
                        cursor: "pointer",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.16)",
                        margin: "4px 0 0 0",
                        borderRadius: "10px",
                        overflow: "hidden",
                        width: "max-content",
                      }),
                      menuList: (provided) => ({
                        ...provided,
                        maxHeight: "auto",
                        padding: "0",
                      }),
                    }}
                    classNames={{
                      valueContainer: () => "w-20",
                      control: () => "shadow-none",
                      dropdownIndicator: () => "font-regular",
                      option: (state) =>
                        `ps-2 pe-4 w-56 cusror-pointer ${
                          state.isSelected
                            ? "bg-light-blue-c text-dark-blue-c"
                            : "text-black"
                        }`,
                      singleValue: () => "text-dark-blue-a",
                    }}
                  />
                  <Input
                    type="text"
                    placeholder="Type here"
                    className="w-20"
                    plaintext
                  />
                  <SearchNormal1 size={16} className="cursor-pointer" />
                </div>
              </Col>
            </Row>
          </CardHeader>
          <CardBody
            className="pt-2 min-h-lg-calc"
            style={{ ["--x-h-lg"]: "298px" }}
          >
            <Table responsive>
              <thead>
                <tr>
                  <th className="font-bolder">ID</th>
                  <th className="font-bolder">Tuteur</th>
                  <th className="font-bolder">Nombre d’élèves actifs</th>
                  <th className="font-bolder">Nombre d’élèves souhaités</th>
                  <th className="font-bolder">Note aux évaluations</th>
                  <th className="font-bolder">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#123</td>
                  <td>
                    <Image
                      className="avatar w-8 h-8 rounded-circle me-3"
                      src={profilePlaceholder}
                      alt="User Image"
                    />
                    <span>Allan Moulin</span>
                  </td>
                  <td>
                    8 <ArrowUp size={10} className="ms-2 text-green" />
                  </td>
                  <td>10</td>
                  <td>
                    <Rating
                      size={20}
                      fillColor="#FECA36"
                      emptyColor="#D9D9D9"
                      allowFraction={true}
                      iconsCount={5}
                      initialValue={4}
                      readonly
                      transition
                      label
                    />
                  </td>
                  <td>
                    <Button
                      color="light-blue-c"
                      className="text-dark-blue-c"
                      onClick={() => setShowProfileHandle()}
                    >
                      Accéder au dossier
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
          <CardFooter>
            <PaginationComponent />
          </CardFooter>
        </Card>
      )}
    </Layout>
  );
};

export default withAuth(Tutors);
