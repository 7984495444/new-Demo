import React from "react";
import { MdClose } from "react-icons/md";
import { Alert, Badge } from "reactstrap";
import { t } from "i18next";
import { useDispatch } from "react-redux";
import { BsHandIndexThumb } from "react-icons/bs";
import { readNotificationAction } from "@/redux/actions/sendNotificationAction";
import ShowImage from "../ShowImage";
const CreateSessionAlert = ({
  data,
  showCreateSessionRequestHandle,
  isTutor,
  isStudent,
  isParent,
}) => {
  const dispatch = useDispatch();
  const closeAlertHendle = (val) => {
    let field = {
      is_closed: false,
    };
    dispatch(readNotificationAction(val?.id, field));
  };

  return (
    <>
      <Alert
        className="position-relative d-flex flex-sm-row flex-column gap-4 align-items-start"
        isOpen={true}
        color="green"
      >
        <div className="alert-icon">
          <BsHandIndexThumb size={24} />
        </div>
        <div className="flex-fill vstack gap-2">
          <div className="d-flex gap-2 justify-content-between">
            <p className="alert-heading">
              {t("NotificationsTab.CreateSessionAlertTitle")}
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
                  ? data?.sender?.role_id?.id === 3
                    ? t(
                        "NotificationsTab.CreateSessionAlertTitleForTutorinParent"
                      )
                    : t("NotificationsTab.CreateSessionAlertTitleForTutor")
                  : isStudent
                  ? t("NotificationsTab.CreateSessionAlertTitleForStudent")
                  : t("NotificationsTab.CreateSessionAlertTitleForparent")}
              </span>
              {isParent && (
                <span>
                  <ShowImage
                    className="avatar avatar-xs rounded-circle bg-light-blue-a flex-none"
                    imageName={data?.source_id?.student?.profile_image}
                    width={100}
                    height={100}
                  />
                  <span className="text-light-blue-a ms-1">
                    {`${data?.source_id?.student?.first_name} ${data?.source_id?.student?.last_name}`}
                  </span>
                  <Badge
                    className="ms-2 bg-white text-dark-blue-c text-8 p-1 badge-text-break"
                    color="white"
                  >
                    {t("NotificationsTab.Student")}
                  </Badge>
                </span>
              )}
              <span>
                <ShowImage
                  className="avatar avatar-xs rounded-circle bg-light-blue-a flex-none"
                  imageName={data?.sender?.profile_image}
                  width={100}
                  height={100}
                />
                <span className="text-light-blue-a ms-1">{`${
                  data?.sender?.first_name
                } ${
                  isTutor
                    ? data?.sender?.last_name
                    : `${data?.sender?.last_name?.slice(0, 1).toUpperCase()}.`
                }`}</span>
                <Badge
                  className="ms-2 bg-white text-dark-blue-c text-8 p-1 badge-text-break"
                  color="white"
                >
                  {data?.sender?.role_id?.id === 2
                    ? t("NotificationsTab.Tutor")
                    : data?.sender?.role_id?.id === 4
                    ? t("NotificationsTab.Student")
                    : t("NotificationsTab.Parent")}
                </Badge>
              </span>{" "}
            </div>
            <div
              className="text-underline flex-none font-bold cursor-pointer"
              onClick={() => showCreateSessionRequestHandle(false, data)}
            >
              {t("NotificationsTab.ToConsult")}
            </div>
          </div>
        </div>
      </Alert>
    </>
  );
};

export default CreateSessionAlert;
