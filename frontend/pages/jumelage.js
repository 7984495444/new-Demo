import React from "react";
import { Layout } from "@/components";
import withAuth from "./authRouter";
import { t } from "i18next";

const Jumelage = () => {
  return (
    <Layout>
      <div>{t("Jumelage.Twinning")}</div>
    </Layout>
  );
};

export default withAuth(Jumelage);
