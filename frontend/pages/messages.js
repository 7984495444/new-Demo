import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
} from "reactstrap";
import {
  Layout,
  ShowImage,
  VideoAttachmentComponent,
  VideoPlayer,
} from "@/components";
import {
  SsIconRound,
  CurveVectorMessage,
  DotsSmallBg,
} from "@/assets/images/index";
import { MdClose } from "react-icons/md";
import {
  Send2,
  AttachSquare,
  SearchNormal1,
  Message2,
  ArrowLeft,
} from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchUser, getUserByRole } from "@/redux/actions/userAction";
import Moment from "react-moment";
import axios from "axios";
import FormData from "form-data";
import io from "socket.io-client";
import { userRoles } from "@/utils/data";
import withAuth from "./authRouter";
import moment from "moment";
import { t } from "i18next";
import { useRouter } from "next/router";
import { FaCamera, FaVideo } from "react-icons/fa";
import ImageViewer from "@/components/messages/ImageViewer";

//  connect socket
let socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  path: "/api/socket.io/",
  secure: true,
});

const Messages = () => {
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [file, setFile] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState("");
  const [chatDashboard, setChatDashboard] = useState(false);
  const [chatUserData, setChatUserData] = useState({});
  const [setserchingAllUserInChartId, setSerchingAllUserInChartId] =
    useState(0);
  const [searchActive, setSearchActive] = useState(false);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [todaysDate, settodaysDate] = useState(moment().format());
  const [atachmentErrorFlag, setAtachmentErrorFlag] = useState(false);
  const chatHistoryDate = new Set();
  const { roleWiseUserData, userData } = useSelector((state) => state.user);
  const [selectedChat, setselectedChat] = useState();
  // const [roleWiseUserDataFiltered, setRoleWiseUserDataFiltered] = useState([]);
  const [showSendingMessageBtn, setShowSendingMessageBtn] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [fullscreenImageModelVisibility, setFullscreenImageModelVisibility] =
    useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    if (router?.query?.id) {
      createChat(router?.query);
      router.push(router.pathname);
    } else {
      dispatch(getUserByRole(0));
    }
  }, [messages]);

  useEffect(() => {
    const handleFullscreenChange = (e) => {
      // e.target.classList.toggle("video-player");
      e.target.controls = !e.target.controls;
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [messages]);

  // useEffect(() => {
  //   let unseenChat = [];
  //   let currentChat = [];
  //   let seenChat = [];
  //   let emptyChat = [];
  //   let finalArray = [];
  //   if (roleWiseUserData?.length > 0) {
  //     roleWiseUserData?.map((val, ind) => {
  //       if (val?.chat.length > 0) {
  //         if (val.id === selectedChat?.id) {
  //           currentChat.push(val);
  //         } else if (val.chat[0].isSeen == 0) {
  //           unseenChat.push(val);
  //         } else {
  //           seenChat.push(val);
  //         }
  //       } else {
  //         emptyChat.push(val);
  //       }
  //     });
  //   }

  //   finalArray = finalArray.concat(
  //     unseenChat,
  //     currentChat,
  //     seenChat,
  //     emptyChat
  //   );

  //   setRoleWiseUserDataFiltered(finalArray);
  // }, [roleWiseUserData, selectedChat]);

  useEffect(() => {
    if (socket) {
      socket.on("messageReceive", (msg) => {
        if (msg.chat_id.id === chatId) {
          const Messages = [...messages, msg];
          setMessages(Messages);
        }
        dispatch(getUserByRole(setserchingAllUserInChartId));
      });
    }
  }, [messages]);

  const createChat = async (data) => {
    let createToChat = {
      user1_id: userData.id,
      user2_id: data.id,
    };
    setChatDashboard(true);
    setChatUserData(data);

    // setting selected chat user
    setselectedChat(data);

    // create chat user
    socket.emit("createToChat", createToChat);

    // receive current chat user
    socket.on("recCreateToChat", (receiveIds) => {
      if (
        receiveIds?.client?.user1_id === userData?.id ||
        receiveIds?.client?.user2_id === userData?.id
      ) {
        setChatId(receiveIds.client.id);
      }
    });

    // get Chat list using chat id
    socket.emit("getChatData", createToChat);
    socket.on("recGetChatData", (data2, chat_id) => {
      if (chat_id?.user1_id === userData?.id) {
        setMessages(data2);
      }
    });
    // dispatch(getUserByRole(setserchingAllUserInChartId));
  };

  const sendMessage = async () => {
    if (file.length > 0 || message.length > 0) {
      setShowSendingMessageBtn(true);
    }
    const tempImageVideo = (file_name, type) => {
      const formData = new FormData();
      for (let index = 0; index < file.length; index++) {
        const element = file[index];
        formData.append(file_name, element);
      }

      return {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/chat-message/${type}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formData,
      };
    };

    const image = async (split) => {
      const config = tempImageVideo("chat_image", "image");
      await axios(config)
        .then(async (result) => {
          const send_message = {
            user_id: userData.id,
            chat_id: chatId,
            message_type: split[0],
            message: message,
            attachment: result.data,
          };
          await socket.emit("messageToUser", send_message);
          setFile([]);
          setMessage("");
          setImagesUrl([]);
          setShowSendingMessageBtn(false);
        })
        .catch((error) => {
          console.log("error", error);
        });

      // var attachment = [];
      // for (let i = 0; i < file.length; i++) {
      //   attachment.push({
      //     attachment: file[i],
      //     extention: file[i].name.split(".")[1],
      //   });
      // }
      // const send_message = {
      //   user_id: userData.id,
      //   chat_id: chatId,
      //   message_type: split[0],
      //   message: message,
      //   attachment: attachment,
      // };
      // console.log("send_message ---> ", send_message);
      // await socket.emit(
      //   "messageToUser",
      //   send_message
      //   //   {
      //   //   user1_id: userData.id,
      //   //   user2_id: chatUserData.id,
      //   // }
      // );
      // setFile([]);
      // setMessage("");
      // setImagesUrl([]);
      // setShowSendingMessageBtn(false);
    };
    const video = async (split) => {
      const config = tempImageVideo("chat_video", "file");
      axios(config)
        .then(async (result) => {
          const send_message = {
            user_id: userData.id,
            chat_id: chatId,
            message_type: split[0],
            message: message,
            video_thumb: result.data,
          };
          socket.emit("messageToUser", send_message);
          setFile([]);
          setMessage("");
          setImagesUrl([]);
          setShowSendingMessageBtn(false);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    if (file.length > 0 && message.length > 0) {
      const split = file[0].type.split("/");
      if (split[0] === "video") {
        video(split);
      } else if (split[0] === "image") {
        image(split);
      }
    } else {
      if (file.length > 0) {
        const split = file[0].type.split("/");
        if (split[0] === "video") {
          video(split);
        } else if (split[0] === "image") {
          image(split);
        }
      } else if (message.length > 0) {
        const send_message = {
          user_id: userData.id,
          chat_id: chatId,
          message_type: "text",
          message: message,
        };
        socket.emit(
          "messageToUser",
          send_message
          // {
          //   user1_id: userData.id,
          //   user2_id: chatUserData.id,
          // }
        );

        setMessage("");
        setFile([]);
        setImagesUrl([]);
        setShowSendingMessageBtn(false);
      }
    }
    getRoleWiseUserHandle(setserchingAllUserInChartId);
  };

  const getRoleWiseUserHandle = (id, type) => {
    let userId = setserchingAllUserInChartId === id ? 0 : id;
    setSerchingAllUserInChartId(type ? id : userId);
    dispatch(getUserByRole(type ? id : userId));
  };

  const handleSearchUser = (name) => {
    if (name) {
      dispatch(getSearchUser(name, setserchingAllUserInChartId));
    } else {
      getRoleWiseUserHandle(setserchingAllUserInChartId, true);
    }
  };

  const handleActiveSearch = () => {
    setSearchActive(!searchActive);
  };

  // render date in chat screen
  const renderDate = (date) => {
    let dateToBeShown = "";
    // Add to Set so it does not render again
    chatHistoryDate.add(moment(date).format("DD/MM/YYYY"));
    if (moment(todaysDate).diff(date, "days") === 0) {
      dateToBeShown = t("Common.ToDay");
    } else if (moment(todaysDate).diff(date, "days") === 1) {
      dateToBeShown = t("Common.Yesterday");
    } else if (moment(todaysDate).diff(date, "days") > 1) {
      dateToBeShown = moment(date).format("DD MMMM YYYY");
    }

    return (
      <li key="chat-day-title">
        <div className="chat-day-title">
          <span className="title">{dateToBeShown}</span>
        </div>
      </li>
    );
  };

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (message !== "") {
        sendMessage();
      }
    }
  };

  // chat seen status update
  const updateStatus = (data) => {
    if (data.isSeen === 0) {
      socket.emit("updateChatSeenStatus", data.chat_id, {
        user_id: userData.id,
      });
    }
  };

  const showImages = (files, isEdit = false) => {
    var images = [];
    for (let i = 0; i < files.length; i++) {
      images.push({
        image: URL.createObjectURL(files[i]),
        name: files[i].type.split("/")[0],
      });
    }

    if (!isEdit) {
      setImagesUrl([...imagesUrl, ...images]);
      setFile([...file, ...files]);
    } else {
      setImagesUrl(images);
    }
  };

  useEffect(() => {
    if (imagesUrl?.length > 0) {
      let imgType = imagesUrl[0]?.name;
      for (let index = 0; index < imagesUrl.length; index++) {
        const element = imagesUrl[index];
        if (element.name !== imgType) {
          setAtachmentErrorFlag(true);
          break;
        } else {
          setAtachmentErrorFlag(false);
        }
      }
    }
  }, [imagesUrl]);

  const removeImage = (itemIndex) => {
    var filterItem = [];
    for (let i = 0; i < file.length; i++) {
      if (itemIndex !== i) {
        filterItem.push(file[i]);
      }
    }
    setFile(filterItem);
    showImages(filterItem, true);
  };

  // open image in full Screen in mobile
  const openFullscreen = (imageUrl) => {
    setFullscreenImage(imageUrl);
    setFullscreenImageModelVisibility(true);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    setFullscreenImageModelVisibility(false);
  };

  return (
    <Layout>
      <Row className="gy-lg-0 gy-6">
        {chatDashboard && (
          <Col md="">
            <Card className="chat-conversation border-0">
              <CardHeader
                className="hstack py-3 border-light-blue-c"
                style={{ ["--x-border-width"]: "1px" }}
              >
                <ArrowLeft
                  size={20}
                  className="me-4"
                  onClick={() => setChatDashboard(false)}
                />
                <ShowImage
                  className="avatar avatar-sm rounded-circle bg-light-blue-a me-2"
                  imageName={chatUserData?.profile_image}
                  width={68}
                  height={68}
                />
                {/* <Image
                  className="avatar avatar-sm rounded-circle bg-light-blue-a me-2"
                  src={
                    chatUserData?.profile_image === null ||
                    chatUserData?.profile_image === ""
                      ? profilePlaceholder
                      : `${process.env.NEXT_PUBLIC_API_URL}/users/profile-image/${chatUserData?.profile_image}`
                  }
                  width={68}
                  height={68}
                  alt="User Image"
                /> */}
                <h6 className="text-sm">
                  {chatUserData?.first_name + " " + chatUserData?.last_name}
                </h6>
              </CardHeader>
              <CardBody
                className="py-3 overflow-auto h-lg-calc h-md-calc h-calc"
                style={{
                  ["--x-h-lg"]: "305px",
                  ["--x-h-md"]: "310px",
                  ["--x-h"]: "440px",
                }}
              >
                <ul className="list-unstyled mb-0">
                  {messages?.map((item, index) => {
                    if (
                      userData.id !== item?.user_id?.id &&
                      item?.chat_id?.id === chatId &&
                      item?.isSeen === 0
                    ) {
                      updateStatus(item);
                    }
                    if (item?.chat_id?.id === chatId)
                      return (
                        <div key={index}>
                          {/* showing chat date */}
                          {chatHistoryDate.has(
                            moment(item?.created_at).format("DD/MM/YYYY")
                          )
                            ? null
                            : renderDate(item?.created_at)}
                          {item?.user_id?.id !== userData.id &&
                          item?.user_id?.id === Number(chatUserData.id) ? (
                            <li>
                              <div className="conversation-list">
                                <div className="chat-avatar">
                                  <ShowImage
                                    className="avatar rounded-circle bg-light-blue-a"
                                    imageName={item?.user_id.profile_image}
                                    width={68}
                                    height={68}
                                  />
                                </div>
                                <div className="user-chat-content">
                                  <div className="ctext-wrap">
                                    {item?.message_type === "text" ? (
                                      <p className="chat-text">
                                        {item.message}
                                      </p>
                                    ) : item?.message_type === "video" &&
                                      item?.message !== "" ? (
                                      <>
                                        <p className="chat-text">
                                          {item.message}
                                        </p>
                                        {item?.video_thumb.map(
                                          (data, index) => {
                                            return (
                                              <VideoPlayer
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/chat-message/video/${data?.video_thumb}`}
                                                poster={`${process.env.NEXT_PUBLIC_API_URL}/chat-message/video/thumb/${data?.thumb}`}
                                              />
                                            );
                                          }
                                        )}
                                      </>
                                    ) : item?.message_type === "image" &&
                                      item?.message !== "" ? (
                                      <>
                                        <p className="chat-text">
                                          {item.message}
                                        </p>
                                        {item?.attachment.map((data, index) => {
                                          return (
                                            <Image
                                              src={`${process.env.NEXT_PUBLIC_API_URL}/chat-message/image/${data?.attachment}`}
                                              alt={item.attachment}
                                              width={250}
                                              height={142}
                                              key={index}
                                              onClick={(e) =>
                                                openFullscreen(e.target.src)
                                              }
                                            />
                                          );
                                        })}
                                      </>
                                    ) : item?.message_type === "video" ? (
                                      item?.video_thumb.map((data, index) => {
                                        return (
                                          <VideoPlayer
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/chat-message/video/${data?.video_thumb}`}
                                            poster={`${process.env.NEXT_PUBLIC_API_URL}/chat-message/video/thumb/${data?.thumb}`}
                                          />
                                        );
                                      })
                                    ) : (
                                      item?.attachment.map((data, index) => {
                                        return (
                                          <Image
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/chat-message/image/${data?.attachment}`}
                                            alt={item.attachment}
                                            width={250}
                                            height={142}
                                            key={index}
                                            onClick={(e) =>
                                              openFullscreen(e.target.src)
                                            }
                                          />
                                        );
                                      })
                                    )}
                                    <p className="chat-time">
                                      <Moment format="hh:mm A">
                                        {item?.created_at}
                                      </Moment>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ) : (
                            item?.user_id?.id === userData.id &&
                            item?.user_id?.id !== Number(chatUserData.id) && (
                              <li className="right">
                                <div className="conversation-list">
                                  <div className="user-chat-content">
                                    <div className="ctext-wrap">
                                      {item?.message_type === "text" ? (
                                        <p className="chat-text">
                                          {item.message}
                                        </p>
                                      ) : item?.message_type === "video" &&
                                        item?.message !== "" ? (
                                        <>
                                          <p className="chat-text">
                                            {item.message}
                                          </p>
                                          {item?.video_thumb.map(
                                            (data, index) => {
                                              return (
                                                <VideoPlayer
                                                  src={`${process.env.NEXT_PUBLIC_API_URL}/chat-message/video/${data?.video_thumb}`}
                                                  poster={`${process.env.NEXT_PUBLIC_API_URL}/chat-message/video/thumb/${data?.thumb}`}
                                                />
                                              );
                                            }
                                          )}
                                        </>
                                      ) : item?.message_type === "image" &&
                                        item?.message !== "" ? (
                                        <>
                                          <p className="chat-text">
                                            {item.message}
                                          </p>
                                          {item?.attachment.map(
                                            (data, index) => {
                                              return (
                                                <Image
                                                  src={`${process.env.NEXT_PUBLIC_API_URL}/chat-message/image/${data?.attachment}`}
                                                  alt={item.attachment}
                                                  width={250}
                                                  height={142}
                                                  key={index}
                                                  onClick={(e) =>
                                                    openFullscreen(e.target.src)
                                                  }
                                                />
                                              );
                                            }
                                          )}
                                        </>
                                      ) : item?.message_type === "video" ? (
                                        item?.video_thumb.map((data, index) => {
                                          return (
                                            <VideoPlayer
                                              src={`${process.env.NEXT_PUBLIC_API_URL}/chat-message/video/${data?.video_thumb}`}
                                              poster={`${process.env.NEXT_PUBLIC_API_URL}/chat-message/video/thumb/${data?.thumb}`}
                                            />
                                          );
                                        })
                                      ) : (
                                        item?.attachment.map((data, index) => {
                                          return (
                                            <Image
                                              src={`${process.env.NEXT_PUBLIC_API_URL}/chat-message/image/${data?.attachment}`}
                                              alt={item.attachment}
                                              width={250}
                                              height={142}
                                              key={index}
                                              onClick={(e) =>
                                                openFullscreen(e.target.src)
                                              }
                                            />
                                          );
                                        })
                                      )}
                                      <p className="chat-time">
                                        <Moment format="hh:mm A">
                                          {item?.created_at}
                                        </Moment>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )
                          )}
                        </div>
                      );
                  })}
                  <AlwaysScrollToBottom />
                </ul>
              </CardBody>
              <CardFooter className="d-flex align-items-end gap-4 py-6">
                <div className="message-text-container flex-fill">
                  <Input
                    type="text"
                    className={`message-input border-0 shadow-none ${
                      showSendingMessageBtn
                        ? "pointer-event-none opacity-50"
                        : ""
                    }`}
                    placeholder={t("Messages.TypeMsg")}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    readOnly={showSendingMessageBtn ? true : false}
                  />
                  <>
                    {file.length > 0 && (
                      <div className="attachments d-flex flex-wrap gap-5 mt-6">
                        {imagesUrl.map((item, index) => {
                          return (
                            <span
                              className="single-attachment position-relative"
                              key={index}
                            >
                              {item.name === "image" ? (
                                <img
                                  className="object-cover-center h-xl-18 w-xl-18 h-lg-14 w-lg-14 h-10 w-10 flex-none rounded-2"
                                  alt="preview image"
                                  src={item.image}
                                />
                              ) : (
                                <div className="custom-video-player">
                                  <VideoAttachmentComponent
                                    src={item.image}
                                    alt={item.image}
                                  />
                                </div>
                              )}
                              <Button
                                disabled={showSendingMessageBtn ? true : false}
                                variant="neutral"
                                className="bg-white bg-light-blue-a-hover text-light-blue-a text-white-hover rounded-pill shadow-a border-0 p-0 h-5 w-5 d-flex align-items-center justify-content-center position-absolute translate-middle top-0 start-full"
                              >
                                <MdClose
                                  onClick={() => {
                                    removeImage(index);
                                  }}
                                />
                              </Button>
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </>
                </div>
                <div className="py-2">
                  <Button
                    className="border-0"
                    size="sm"
                    color="square"
                    onClick={() => inputFile.current.click()}
                    disabled={showSendingMessageBtn ? true : false}
                  >
                    <input
                      type="file"
                      ref={inputFile}
                      accept="image/*,video/*"
                      multiple="multiple"
                      onChange={(e) => {
                        showImages(e.target.files);
                      }}
                      hidden
                    />
                    <AttachSquare />
                  </Button>
                  <Button
                    className="border-0"
                    size="sm"
                    color="square"
                    onClick={() => (atachmentErrorFlag ? "" : sendMessage())}
                    disabled={showSendingMessageBtn ? true : false}
                  >
                    <Send2 />
                  </Button>
                </div>
              </CardFooter>
              {atachmentErrorFlag && (
                <p className="text-center pb-2 text-danger">
                  {t("Messages.attachementError")}
                </p>
              )}
            </Card>
          </Col>
        )}

        {!chatDashboard && !isMobile && (
          <Col md="">
            <Card className="border-0">
              <CardBody
                className="hstack justify-content-center overflow-hidden h-lg-calc h-md-calc overflow-hidden"
                style={{ ["--x-h-lg"]: "143px", ["--x-h-md"]: "158px" }}
              >
                <Card
                  className="flex-none w-full"
                  style={{ maxWidth: "442px" }}
                >
                  <Row className="g-0 position-relative overlap-20">
                    <Col
                      xs="2"
                      sm="3"
                      className="bg-yellow rounded-start-2 p-4 d-flex align-items-center justify-content-center"
                    >
                      <Image src={DotsSmallBg} alt="dots" />
                    </Col>
                    <Col xs="10" sm="9">
                      <CardBody className="bg-white border rounded-end-2 border-light-blue-c">
                        <Message2
                          size="32"
                          className="text-dark-blue-c mb-16"
                        />
                        <p style={{ fontSize: "18px", maxWidth: "216px" }}>
                          {t("Messages.SelectConversation")}
                        </p>
                      </CardBody>
                    </Col>
                  </Row>
                  <Image
                    className="position-absolute translate-middle mt-xl-n10 top-full start-full overlap-10"
                    src={CurveVectorMessage}
                    alt="CurveVectorMessage"
                  />
                </Card>
              </CardBody>
            </Card>
          </Col>
        )}
        {!chatDashboard && isMobile && (
          <Col md="auto" className="w-md-80 ms-lg-auto">
            <Card className="border-0">
              <CardBody
                className="rounded-top-6 p-0 h-lg-calc h-md-calc overflow-auto"
                style={{ ["--x-h-lg"]: "213px", ["--x-h-md"]: "314px" }}
              >
                <div className="bg-white position-lg-sticky top-0 overlap-10">
                  <div className="px-6 pb-4 pt-lg-0 pt-4">
                    <Row className="gy-4 gx-0">
                      <Col xs="10" className="hstack">
                        <h6 className="text-sm font-regular">
                          {[3, 4].includes(userData?.role_id?.id)
                            ? t("Messages.Tutors")
                            : t("Messages.Latest")}
                        </h6>
                      </Col>
                      {[1, 2].includes(userData?.role_id?.id) && (
                        <Col xs="10" className="hstack gap-1 flex-wrap">
                          {userRoles?.map((val, index) => {
                            {
                              return (
                                userData?.role_id?.id !== val.role_id && (
                                  <div key={index}>
                                    <Button
                                      size="sm"
                                      color="none"
                                      className={`btn btn-sm ${
                                        setserchingAllUserInChartId ===
                                        val.role_id
                                          ? "btn-orange"
                                          : "btn-outline-light-blue-a"
                                      }`}
                                      onClick={() => {
                                        getRoleWiseUserHandle(val.role_id);
                                        setSearchActive(false);
                                      }}
                                      key={index}
                                    >
                                      {t(val.disply_name)}
                                    </Button>
                                  </div>
                                )
                              );
                            }
                          })}
                        </Col>
                      )}
                      <Col xs="2" className="text-end ms-auto">
                        <Button
                          className={`ms-auto d-flex align-items-center justify-content-center ${
                            searchActive
                              ? "btn-outline-orange"
                              : "btn-outline-light-blue-a"
                          }`}
                          style={{ height: "30px", width: "32px" }}
                          color="none"
                          size="sm"
                          onClick={() => handleActiveSearch()}
                        >
                          <SearchNormal1
                            size="16"
                            style={{ marginLeft: "-1px" }}
                          />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  {searchActive && (
                    <div className="bg-light-blue-d position-relative px-6 py-4 overlap-10 mb-4">
                      <Input
                        placeholder={t("Messages.PersonOrKey")}
                        className="bg-light-blue-d border-light-blue-a rounded-2 pe-10"
                        onChange={(e) => handleSearchUser(e.target.value)}
                      />
                      <SearchNormal1
                        size="16"
                        color="#8497ab"
                        className="position-absolute cursor-pointer end-8 top-1/2 translate-middle-y"
                      />
                    </div>
                  )}
                </div>
                <ul className="chat-user-list list-unstyled mb-0">
                  {/* {roleWiseUserData?.map((item, index) => { */}
                  {roleWiseUserData?.map((item, index) => {
                    return (
                      <li
                        className={`chat-user px-6 ${
                          userData?.id !== item?.chat[0]?.user_id?.id &&
                          item?.chat[0]?.isSeen === 0 &&
                          "unread"
                        }`}
                        key={index}
                      >
                        <div
                          className="d-flex chat-user-wrapper"
                          onClick={() => createChat(item)}
                        >
                          <ShowImage
                            className="avatar w-8 h-8 rounded-circle flex-none me-2"
                            imageName={item?.profile_image}
                            width={68}
                            height={68}
                          />
                          <div className="flex-grow-1 overflow-hidden position-relative">
                            <h6 className="chat-user-name text-truncate">
                              {item.first_name + " " + item.last_name}
                            </h6>
                            {userData?.id !== item?.chat[0]?.user_id?.id &&
                              item?.chat[0]?.isSeen === 0 && (
                                <span className="p-1 bg-orange rounded-pill position-absolute end-0 top-1"></span>
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
                                    <span>{t("Messages.Media")}</span>
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
              <CardFooter
                className="border-top p-0"
                style={{ ["--x-border-width"]: "1px" }}
              >
                <ul className="chat-user-list list-unstyled m-0">
                  <li className="chat-user px-6 unread">
                    <div className="d-flex chat-user-wrapper">
                      <Image
                        className="avatar w-8 h-8 rounded-circle flex-none me-2"
                        src={SsIconRound}
                        alt="SsIconRound"
                        width=""
                        height=""
                      />
                      <div className="flex-grow-1 overflow-hidden position-relative">
                        <div className="d-flex">
                          <h6 className="chat-user-name text-truncate">
                            John Garnier
                          </h6>
                          <span className="chat-user-time">16m</span>
                        </div>
                        <p className="chat-user-text text-truncate">
                          Je vais devoir annuler notre prnotre prnotre prnotre
                          prnotre pr
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </CardFooter>
            </Card>
          </Col>
        )}
        {!isMobile && (
          <Col md="auto" className="w-md-80 ms-lg-auto">
            <Card className="border-0">
              <CardBody
                className="rounded-top-6 p-0 h-lg-calc h-md-calc overflow-auto"
                style={{ ["--x-h-lg"]: "213px", ["--x-h-md"]: "314px" }}
              >
                <div className="bg-white position-lg-sticky top-0 overlap-10">
                  <div className="px-6 pb-4 pt-lg-0 pt-4">
                    <Row className="gy-4 gx-0">
                      <Col xs="10" className="hstack">
                        <h6 className="text-sm font-regular">
                          {[3, 4].includes(userData?.role_id?.id)
                            ? t("Messages.Tutors")
                            : t("Messages.Latest")}
                        </h6>
                      </Col>
                      {[1, 2].includes(userData?.role_id?.id) && (
                        <Col xs="10" className="hstack gap-1 flex-wrap">
                          {userRoles?.map((val, index) => {
                            {
                              return (
                                userData?.role_id?.id !== val.role_id && (
                                  <div key={index}>
                                    <Button
                                      size="sm"
                                      color="none"
                                      className={`btn btn-sm ${
                                        setserchingAllUserInChartId ===
                                        val.role_id
                                          ? "btn-orange"
                                          : "btn-outline-light-blue-a"
                                      }`}
                                      onClick={() => {
                                        getRoleWiseUserHandle(val.role_id);
                                        setSearchActive(false);
                                      }}
                                      key={index}
                                    >
                                      {t(val.disply_name)}
                                    </Button>
                                  </div>
                                )
                              );
                            }
                          })}
                        </Col>
                      )}
                      <Col xs="2" className="text-end ms-auto">
                        <Button
                          className={`ms-auto d-flex align-items-center justify-content-center ${
                            searchActive
                              ? "btn-outline-orange"
                              : "btn-outline-light-blue-a"
                          }`}
                          style={{ height: "30px", width: "32px" }}
                          color="none"
                          size="sm"
                          onClick={() => handleActiveSearch()}
                        >
                          <SearchNormal1
                            size="16"
                            style={{ marginLeft: "-1px" }}
                          />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                  {searchActive && (
                    <div className="bg-light-blue-d position-relative px-6 py-4 overlap-10 mb-4">
                      <Input
                        placeholder={t("Messages.PersonOrKey")}
                        className="bg-light-blue-d border-light-blue-a rounded-2 pe-10"
                        onChange={(e) => handleSearchUser(e.target.value)}
                      />
                      <SearchNormal1
                        size="16"
                        color="#8497ab"
                        className="position-absolute cursor-pointer end-8 top-1/2 translate-middle-y"
                      />
                    </div>
                  )}
                </div>
                <ul className="chat-user-list list-unstyled mt-4 mb-0">
                  {/* {roleWiseUserData?.map((item, index) => { */}
                  {roleWiseUserData?.map((item, index) => {
                    return (
                      <li
                        className={`chat-user px-6 ${
                          userData?.id !== item?.chat[0]?.user_id?.id &&
                          item?.chat[0]?.isSeen === 0 &&
                          "unread"
                        }`}
                        key={index}
                      >
                        <div
                          className="d-flex chat-user-wrapper"
                          onClick={() => createChat(item)}
                        >
                          <ShowImage
                            className="avatar w-8 h-8 rounded-circle flex-none me-2"
                            imageName={item?.profile_image}
                            width={68}
                            height={68}
                          />
                          <div className="flex-grow-1 overflow-hidden position-relative">
                            <h6 className="chat-user-name text-truncate">
                              {item.first_name + " " + item.last_name}
                            </h6>
                            {userData?.id !== item?.chat[0]?.user_id?.id &&
                              item?.chat[0]?.isSeen === 0 && (
                                <span className="p-1 bg-orange rounded-pill position-absolute end-0 top-1"></span>
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
                                    <span>{t("Messages.Media")}</span>
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
              {/* <CardFooter
                className="border-top p-0"
                style={{ ["--x-border-width"]: "1px" }}
              >
                <ul className="chat-user-list list-unstyled m-0">
                  <li className="chat-user px-6 unread">
                    <div className="d-flex chat-user-wrapper">
                      <Image
                        className="avatar w-8 h-8 rounded-circle flex-none me-2"
                        src={SsIconRound}
                        alt="SsIconRound"
                        width=""
                        height=""
                      />
                      <div className="flex-grow-1 overflow-hidden position-relative">
                        <div className="d-flex">
                          <h6 className="chat-user-name text-truncate">
                            John Garnier
                          </h6>
                          <span className="chat-user-time">16m</span>
                        </div>
                        <p className="chat-user-text text-truncate">
                          Je vais devoir annuler notre prnotre prnotre prnotre
                          prnotre pr
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </CardFooter> */}
            </Card>
          </Col>
        )}
      </Row>
      {/* Render the image viewer when fullscreenImage is set */}
      {fullscreenImage && (
        <ImageViewer
          imageUrl={fullscreenImage}
          onClose={closeFullscreen}
          isOpen={fullscreenImageModelVisibility}
        />
      )}
    </Layout>
  );
};

export default withAuth(Messages);
