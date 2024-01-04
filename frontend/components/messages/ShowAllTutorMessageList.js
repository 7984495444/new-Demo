import { Message2 } from "iconsax-react";
import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { ShowImage, showTimeHandal } from "../index";
import { FaCamera, FaVideo } from "react-icons/fa";
import { t } from "i18next";
import { useSelector } from "react-redux";

const ShowAllTutorMessageList = ({ allMessage, handleClickMessageUser }) => {
  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <Card>
        <CardHeader className="pb-1">
          <Message2 size="18" />
          <span className="ms-3"> {t("TutorCalendar.Messaging")}</span>
        </CardHeader>
        <CardBody
          className="pt-1 pb-2 h-lg-calc overflow-y-lg-auto"
          style={{ ["--x-h-lg"]: "34.5rem" }}
        >
          <ul className="chat-user-list calendar-chats list-unstyled mb-0">
            {allMessage?.map((item, index) => {
              return (
                <li
                  className={`chat-user ${
                    userData?.id !== item?.chat[0]?.user_id?.id &&
                    item?.chat[0]?.isSeen === 0 &&
                    "unread"
                  }`}
                  onClick={() => handleClickMessageUser(item)}
                  key={index}
                >
                  <div className="d-flex chat-user-wrapper">
                    <ShowImage
                      className="avatar h-8 w-8 flex-none rounded-circle bg-light-blue-a me-2"
                      imageName={item?.profile_image}
                      width={68}
                      height={68}
                    />
                    <div className="flex-grow-1 overflow-hidden position-relative">
                      <h6 className="chat-user-name text-truncate">
                        {item?.first_name + " " + item?.last_name}
                      </h6>
                      {item.id === item?.chat[0]?.user_id?.id &&
                      item?.chat[0]?.isSeen === 0 ? (
                        <span className="p-1 bg-orange rounded-pill position-absolute end-0 top-1"></span>
                      ) : (
                        <p
                          xs="2"
                          className="text-end position-absolute end-0 top-1"
                        >
                          {item?.chat[0] &&
                            showTimeHandal(item?.chat[0]?.created_at)}
                        </p>
                      )}
                      {item?.chat?.length > 0 && (
                        <p className="chat-user-text text-truncate hstack">
                          {item?.chat[0]?.message_type === "video" ? (
                            <>
                              <FaVideo className="me-1" size={16} />{" "}
                              <span>{t("Messages.Media")}</span>
                            </>
                          ) : item?.chat[0]?.message_type === "image" ? (
                            <>
                              <FaCamera className="me-1" size={16} />
                              <span className="mt-1">
                                {t("Messages.Media")}
                              </span>
                            </>
                          ) : (
                            <>{item.chat[0].message}</>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </CardBody>
      </Card>
    </>
  );
};

export default ShowAllTutorMessageList;
