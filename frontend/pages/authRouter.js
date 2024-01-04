import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedJwt = parseJwt(token);

        if (decodedJwt.exp * 1000 < Date.now()) {
          localStorage.clear();
          Router.push("/login");
          setVerified(false);
        } else {
          setVerified(true);

          if (router.pathname === "/") {
            Router.push("/dashboard");
          }
        }
      } else {
        Router.push("/login");
        setVerified(false);
      }
    }, [setVerified]);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;
