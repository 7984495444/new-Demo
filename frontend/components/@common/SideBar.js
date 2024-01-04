import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { t } from "i18next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/authAction";
import { SsLogo } from "@/assets/images/index";
import { Setting2, ArrowRight, Logout, Danger } from "iconsax-react";
import {
  adminSidebarMenu,
  tuterSidebarMenu,
  elevesSidebarMenu,
  parentSidebarMenu,
} from "../../utils/data";
import ShowImage from "./ShowImage";

function SideBar({ user, serching }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [roles, setRole] = useState();

  useEffect(() => {
    function getSideBarField() {
      if (user?.role_id?.name === "admin") {
        setRole(adminSidebarMenu);
      } else if (user?.role_id?.name === "tutor") {
        setRole(tuterSidebarMenu);
      } else if (user?.role_id?.name === "student") {
        setRole(elevesSidebarMenu);
      } else if (user?.role_id?.name === "parent") {
        setRole(parentSidebarMenu);
      }
    }
    getSideBarField();
  }, [setRole, user]);

  const logoutHandle = async () => {
    localStorage.clear();
    await dispatch(logoutAction());
    router.push("/login");
  };

  return (
    <>
      <nav
        id="sidebar"
        className="navbar-main navbar show navbar-vertical bg-white h-lg-screen navbar-expand-lg px-0 py-lg-0 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg"
      >
        <div className="container-fluid gx-lg-8">
          <Link className="navbar-brand px-lg-6 pt-lg-3 pb-lg-5 py-0" href="/">
            <Image
              className="h-lg-auto h-10 w-lg-auto w-full"
              src={SsLogo}
              alt="Succes Scolaire Logo"
              priority
            />
          </Link>
          <div className="navbar-user gap-2 d-lg-none">
            <button
              className="navbar-toggler ms-2 px-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarCollapse"
              aria-controls="sidebarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <div
            className="collapse navbar-collapse menu-list"
            id="sidebarCollapse"
          >
            <div className="d-flex flex-column flex-fill menu-wrapper">
              <ul className="navbar-nav order-lg-1 order-2">
                {roles?.map((item, index) => {
                  return t(item.name) === t("Sidebar.User") ? (
                    <li className="nav-item" key={index}>
                      <Link
                        className="nav-link"
                        href="#sidebar-projects"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebar-projects"
                      >
                        {item.icon}
                        <span className="nav-text">{t(item.name)}</span>
                      </Link>
                      <div className="collapse" id="sidebar-projects">
                        <ul className="nav nav-sm flex-column">
                          {item.option.map((val, index) => {
                            return (
                              <li className="nav-item" key={index}>
                                <Link
                                  href={val.nav}
                                  // className="nav-link"
                                  className={`nav-link ${
                                    router.pathname == val.nav && "active"
                                  }`}
                                >
                                  {t(val.name)}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </li>
                  ) : (
                    <li className="nav-item " key={index}>
                      <Link
                        className={`nav-link ${
                          router.pathname == item.nav ? "active" : undefined
                        }`}
                        href={item.nav}
                        // as={item.asUrl}
                      >
                        {item.icon}
                        <span className="nav-text badge-text-break">
                          {t(item.name)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-lg-auto order-lg-2 order-3"></div>
              <ul className="navbar-nav order-lg-3 order-4">
                <li className="nav-item" key="Reporter">
                  <Link
                    className="nav-link"
                    target="_blank"
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfBAzeRVN6ivLh2TGnbMyLv51SuNUIUClEKcjh9PbgIstAKvw/viewform"
                  >
                    <span className="nav-icon">
                      <Danger />
                    </span>
                    <span className="nav-text">{t("Sidebar.Report")}</span>
                  </Link>
                </li>
                <li className="nav-item" key="Paramètres">
                  <Link className="nav-link" href="/settings" as={"settings"}>
                    <span className="nav-icon">
                      <Setting2 />
                    </span>
                    <span className="nav-text">{t("Sidebar.Settings")}</span>
                  </Link>
                </li>
                <li
                  className="nav-item d-lg-none"
                  key="Logout"
                  onClick={() => logoutHandle()}
                >
                  <Link className="nav-link" href="/">
                    <span className="nav-icon">
                      <Logout />
                    </span>
                    <span className="nav-text">{t("Sidebar.Logout")}</span>
                  </Link>
                </li>
                {/* <li className="nav-item mt-4 d-lg-none" key="Lorem ipsum">
                <button className="btn btn-dark-blue-c">
                  {t("TutorDeshbord.Loremipsum")}
                </button>
              </li> */}
              </ul>
              <div className="my-lg-4 mb-2 ps-lg-6 ps-0 pe-4 position-relative order-lg-4 order-1">
                <div className="d-flex w-full align-items-center">
                  <span className="me-3">
                    <ShowImage
                      className="avatar w-8 h-8 rounded-circle me-3"
                      imageName={user?.profile_image}
                      width={68}
                      height={68}
                    />
                  </span>
                  <div className="flex-fill">
                    <div className="hstack flex-lg-wrap gap-2">
                      <span>
                        {user?.first_name}{" "}
                        {user?.last_name?.slice(0, 1).toUpperCase()}.
                      </span>
                      <span
                        className="badge bg-light-blue-c text-dark-blue-c text-uppercase p-1"
                        style={{ ["--x-badge-font-size"]: "8px" }}
                      >
                        {user?.role_id?.name === "admin" && "admin"}
                        {user?.role_id?.name === "tutor" && "TUTOR"}
                        {user?.role_id?.name === "parent" && "parent"}
                        {user?.role_id?.name === "student" &&
                          t("StudentMyProfile.role")}
                      </span>
                    </div>
                    {user?.role_id?.name !== "parent" && (
                      <Link
                        className="link-light-blue-a"
                        href="/profile"
                        // as={"profile"}
                      >
                        {t("Sidebar.MyProfile")}
                        <ArrowRight size="16" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default SideBar;
