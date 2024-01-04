import React from "react";
import { MdClose } from "react-icons/md";
import { Alert, Badge } from "reactstrap";
import { t } from "i18next";
import { BsCheckCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { alertCloseAction } from "@/redux/actions/sendNotificationAction";
import ShowImage from "../ShowImage";

const UnconfirmedRequestShowAlert = ({
  data,
  showModifirdModalHandale,
  isTutor,
}) => {
  const dispatch = useDispatch();
  const closeAlertHendle = (val) => {
    dispatch(
      alertCloseAction(val?.sender?.id, val?.receiver?.id, val?.source_id?.id)
    );
  };
  return (
    <>
      <Alert
        className="position-relative d-flex flex-sm-row flex-column gap-4 align-items-start"
        isOpen={true}
        color="red"
      >
        <div className="alert-icon">
          <BsCheckCircle size={26} />
        </div>
        <div className="flex-fill vstack gap-2">
          <div className="d-flex gap-2 justify-content-between">
            <p className="alert-heading">
              {t("NotificationsTab.UnconfirmedRequestAlertTitle")}
            </p>
            <button
              className="btn btn-alert-close p-0 shadow-none border-0 position-sm-static position-absolute top-3 end-5"
              type="button"
              onClick={() => {
                closeAlertHendle(data);
              }}
            >
              <MdClose />
            </button>
          </div>
          <div className="d-flex flex-sm-row flex-column gap-2 justify-content-between mt-auto">
            <div className="d-flex flex-sm-row flex-column gap-2">
              <span>
                {isTutor
                  ? t(
                      "NotificationsTab.UnconfirmedRequestAlertSubTitleforTutor"
                    )
                  : t(
                      "NotificationsTab.UnconfirmedRequestAlertSubTitleforStudent"
                    )}
              </span>
              <span>
                <ShowImage
                  className="avatar avatar-xs rounded-circle bg-light-blue-a flex-none"
                  imageName={data?.sender?.profile_image}
                  width={100}
                  height={100}
                />
                <span className="text-light-blue-a ms-1">{`${data?.sender?.first_name} ${data?.sender?.last_name}`}</span>
                <Badge
                  className="ms-2 bg-white text-dark-blue-c text-8 p-1 badge-text-break"
                  color="white"
                >
                  {data?.sender?.role_id?.id === 4
                    ? t("NotificationsTab.Student")
                    : t("NotificationsTab.Tutor")}
                </Badge>
              </span>
            </div>
            <div
              className="text-underline flex-none font-bold cursor-pointer"
              onClick={() => showModifirdModalHandale(null, data)}
            >
              {t("NotificationsTab.SeeTheDetails")}
            </div>
          </div>
        </div>
      </Alert>
    </>
  );
};

export default UnconfirmedRequestShowAlert;
