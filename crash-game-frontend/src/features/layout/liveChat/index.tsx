import { useApp } from "@context/AppContext";
import S from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { IMessage } from "@utils/typeUtils";
import { MainButton } from "@features/ui";
import { IoClose } from "react-icons/io5";
import { ChatItem } from "./item";
import {
  HiChatAlt2,
  HiOutlineEmojiHappy,
  HiPaperAirplane,
} from "react-icons/hi";
import { toast } from "react-toastify";
import { getAccessToken, removeAllTokens } from "@utils/axiosUtils";
import { ConnectionController } from "@web3modal/core";

export const LiveChat = () => {
  const { app, setApp } = useApp();

  const [connectedUsers, setConnectedUsers] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(scrollToBottom);
    if (chatRef.current) {
      observer.observe(chatRef.current, { childList: true });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const socketId = `${process.env.BACK_URL || "http://localhost:4000"}/chat`;

    const socket = io(socketId);
    if (!socket) return;
    setApp((prevState) => ({ ...prevState, liveSocket: socket }));

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (app.liveSocket) {
      if (app.user) {
        const token = getAccessToken();
        app.liveSocket.emit("auth", { address: app.user.crypto, token });
      }

      app.liveSocket.on("online-users", (data) => {
        setConnectedUsers(data);
      });

      app.liveSocket.on("auth-error", async (data) => {
        removeAllTokens();
        setApp((prevState) => ({ ...prevState, user: null }));
        await ConnectionController.disconnect();

        return toast.error(data, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });

      app.liveSocket.on("expire-error", async (data) => {
        removeAllTokens();
        setApp((prevState) => ({ ...prevState, user: null }));
        await ConnectionController.disconnect();

        return toast.error(data, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });

      app.liveSocket.emit("get-chat-history");

      app.liveSocket.on("chat-history", (data) => {
        setMessages(data);
      });
      return () => {};
    }
  }, [app]);

  const sendMessage = () => {
    if (!app.user) {
      return toast.error("Please sign in site.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (app.liveSocket) {
      app.liveSocket.emit("f-t-message", message);
      app.liveSocket.on("chat message", (data) => {
        setMessages((prevData) => [...prevData, data]);
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
      setMessage("");
    }
  };

  if (app.activeChat) {
    return (
      <div className={S.body}>
        <div className={S.header}>
          <MainButton
            $padding="8px"
            $backgroundColor="#FFEDC2"
            $icon={<IoClose size={16} />}
            onClick={() =>
              setApp((prevState) => ({ ...prevState, activeChat: false }))
            }
            $filterWidth="2px"
          />
          <span>Live Chat</span>
          <span className={S.count}>{connectedUsers}</span>
        </div>
        <div className={S.list} ref={chatRef}>
          {messages.map((message, index) => (
            <ChatItem key={index} data={message} />
          ))}
        </div>
        <div className={S.footer}>
          <HiOutlineEmojiHappy size={20} color="hsla(214, 14%, 41%, 1)" />
          <input
            type="text"
            name=""
            id=""
            placeholder="Type here"
            value={message}
            onKeyDown={handleKeyDown}
            onChange={(e) => setMessage(e.target.value)}
          />
          <HiPaperAirplane
            size={20}
            onClick={sendMessage}
            className={S.sendButton}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className={S.miniButton}>
        <MainButton
          $icon={<HiChatAlt2 size={16} />}
          $backgroundColor="#FFEDC2"
          onClick={() =>
            setApp((prevState) => ({ ...prevState, activeChat: true }))
          }
          $filterWidth="2px"
        />
      </div>
    );
  }
};
