import { Header, SideBar } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserAction } from "@/redux/actions/userAction";
import { Container } from "reactstrap";

function Layout({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAction());
  }, []);
  // get local timeZone
  // useEffect(() => {
  //   getUserTimeZone();
  // }, []);

  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <main className="d-flex flex-column flex-lg-row h-lg-full min-h-screen h-lg-screen bg-light-blue-c">
        <SideBar user={userData} />
        <div className="content-main flex-lg-1 h-lg-screen overflow-y-lg-auto vstack px-lg-4">
          <Header />
          <div className="flex-fill pb-sm-6 pb-20 overlap-10">
            <Container fluid>{children}</Container>
          </div>
        </div>
      </main>
    </>
  );
}

export default Layout;
