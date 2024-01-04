import { t } from "i18next";
import { Like1 } from "iconsax-react";
import { useRouter } from "next/router";
import React from "react";
import { Button, Card, CardBody } from "reactstrap";

const ContactSS = () => {
  const router = useRouter();

  const platefromEvaluationsHandal = () => {
    router.push("/platefrom-evaluations");
  };

  return (
    <>
      {/* <Card>
        <CardHeader className="pb-0">
          <div className="pb-2 border-bottom border-light-blue-c">
            <Message2 size="20" className="me-2" />
            <span className="font-bolder">
              {t("StudentDashboard.ContactSS")}
            </span>
          </div>
        </CardHeader>
        <CardBody className="py-2">
          <ul className="chat-user-list list-unstyled m-0">
            <li className="chat-user">
              {" "}
              {/* Add unread class when msg is Unread 
              <div className="chat-user-wrapper d-flex bg-white py-2">
                <Image
                  src={SsIconRound}
                  className="avatar w-8 h-8 rounded-circle flex-none me-2"
                  alt="profile"
                />
                <div className="flex-grow-1 overflow-hidden position-relative">
                  <div className="d-flex">
                    <h6 className="chat-user-name text-truncate">
                      {t("StudentDashboard.SuccesScolaire")}
                    </h6>
                    <span className="chat-user-time">16m</span>
                  </div>
                  <p className="chat-user-text text-truncate">
                    Je vais devoir annuler notre prnotre prnotre prnotre prnotre
                    pr
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </CardBody>
      </Card> */}
      <Card className="bg-light-blue-b">
        <CardBody className="py-3">
          <div className="hstack flex-wrap gap-3 mb-3">
            <span className="h-50px w-50px rounded-2 bg-light-blue-c hstack justify-content-center">
              <Like1 size="22" className="text" />
            </span>
            <div>
              <h6 className="mb-1">{t("StudentDashboard.Evaluation")}</h6>
              <p>{t("StudentDashboard.CompletingAnEvaluation")}</p>
            </div>
          </div>
          <Button
            color="dark-blue-c"
            className="w-full"
            onClick={() => platefromEvaluationsHandal()}
          >
            {t("StudentDashboard.EvalueSS")}
          </Button>
        </CardBody>
      </Card>
    </>
  );
};

export default ContactSS;
