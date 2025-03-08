import { ConnectionController } from "@web3modal/core";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import S from "./index.module.scss";
import { HeaderLinks, UnauthLinks } from "@utils/dataUtils";
import { HeaderItem } from "./item";
import { Icon } from "@features/icon";
import { DropBox, MainButton, WalletModal } from "@features/ui";
import { HiPlus } from "react-icons/hi";
import { formatUsername } from "@utils/formatUtils";
import { useAccount } from "wagmi";
import { useApp } from "@context/AppContext";
import { axiosPost, setAccessToken } from "@utils/axiosUtils";
import logoImg from "@assets/logo.webp";
import minilogoImg from "@assets/minilogo.webp";

const Header = () => {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [_, setAuthModal] = useState<boolean>(false);
  const [certainName, setCertainName] = useState<string>("");
  const [viewDrop, setViewDrop] = useState<boolean>(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const { app, setApp } = useApp();

  const { address } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    const signUpUser = async () => {
      const res = await axiosPost([
        "/auth/signin",
        { data: { address: address } },
      ]);

      if (res.auth) {
        setAccessToken(res.auth);
      }

      if (res) {
        setApp((prevState) => ({
          ...prevState,
          user: {
            id: res.id || "",
            crypto: res.walletAddress,
            amount: res.amount,
            avatar: res.avatar,
            nickname: res.nickname || "",
            username: res.username || "",
          },
          logged: true,
        }));
      }
    };

    if (address && !app.user) {
      signUpUser();
    }
  }, [address, app]);

  useEffect(() => {
    setCertainName(
      (app.user?.nickname ? app.user?.nickname : app.user?.crypto) as string
    );
  }, [app.user]);

  useEffect(() => {
    const handleLeave = (event: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(event.target as Node)) {
        setViewDrop(false);
      }
    };

    document.addEventListener("mousedown", handleLeave);

    return () => {
      document.removeEventListener("mousedown", handleLeave);
    };
  }, [dropRef]);

  const handleDisconnect = async () => {
    await ConnectionController.disconnect();
    setApp((prevState) => ({ ...prevState, logged: false, user: null }));
  };

  const handleClickItem = (type: string) => {
    setViewDrop(false);
    if (type === "disconnect") {
      handleDisconnect();
    } else if (type === "auth") {
      setAuthModal(true);
    } else if (type === "profile") {
      // ActiveSend({ type: "ACTIVE_USER_PROFILE", value: true });
      navigate("profile");
    }
  };

  const handleOpenDepositModal = () => {
    setApp((prevState) => ({ ...prevState, openDeposit: true }));
  };

  return (
    <>
      <div className={S.body}>
        <div className={S.wrapper}>
          <div className={S.logo}>
            <img
              src={logoImg}
              alt="Boom bet Logo image"
              className={S.logo_full}
            />
            <img
              src={minilogoImg}
              alt="Boom bet Logo image"
              className={S.logo_mini}
            />
          </div>
          <div className={S.group}>
            <div className={S.links}>
              {app.logged
                ? HeaderLinks.map((link, index) => (
                    <HeaderItem key={index} data={link} />
                  ))
                : UnauthLinks.map((link, index) => (
                    <HeaderItem key={index} data={link} />
                  ))}
            </div>
            <div className={S.infoGroup}>
              {app.logged ? (
                <>
                  <div className={S.balance}>
                    <Icon
                      name="Hold"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                    />
                    <p>
                      {app.user?.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <MainButton
                      $icon={<HiPlus size={16} />}
                      $padding="4px"
                      $backgroundColor="#80EED3"
                      $filterWidth="1.5px"
                      onClick={handleOpenDepositModal}
                    />
                  </div>
                  <MainButton
                    $icon={
                      <Icon
                        name="Notification"
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                      />
                    }
                    $padding="8px"
                    $filterWidth="2px"
                  />
                  <div className={S.user} onMouseOver={() => setViewDrop(true)}>
                    <DropBox $filter="2px" className={S.avatar}>
                      <img src={app.user?.avatar} alt="" />
                    </DropBox>
                    <div className={S.name}>
                      <p>{formatUsername(certainName, 4)}</p>
                      <span>{formatUsername(app.user?.crypto!, 5)}</span>
                    </div>
                    {viewDrop && (
                      <div className={S.dropMenu} ref={dropRef}>
                        {/* <MainButton
                          className={S.menuItem}
                          onClick={() => handleClickItem("profile")}
                        >
                          User Profile
                        </MainButton> */}
                        <MainButton
                          className={S.menuItem}
                          onClick={() => handleClickItem("disconnect")}
                        >
                          Disconnect
                        </MainButton>
                        {/* <MainButton
                          className={S.menuItem}
                          onClick={() => handleClickItem("auth")}
                        >
                          Login
                        </MainButton> */}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <MainButton
                  $title="Connect Wallet"
                  $padding="10px 16px"
                  $backgroundColor="hsla(165, 76%, 72%, 1)"
                  $fontFamily="MS Sans Serif Bold"
                  $fontSize="16px"
                  $lineHeight="17px"
                  $fontWeight="400"
                  $textTransform="uppercase"
                  $icon={
                    <Icon
                      name="Wallet"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                    />
                  }
                  $filterWidth="2px"
                  onClick={() => setActiveModal(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {activeModal && <WalletModal setActiveModal={setActiveModal} />}
      {/* {authModal && (
        <Modal
          type={modalType}
          onClick={handleChangeType}
          onClose={handleClose}
        />
      )} */}
    </>
  );
};

export default Header;
