import React from "react";
import { Layout } from "@/components";
import withAuth from "./authRouter";
import { t } from "i18next";

const Parents = () => {
  return (
    <Layout>
      <div>{t("Parents.Parents")}</div>
    </Layout>
  );
};

export default withAuth(Parents);
