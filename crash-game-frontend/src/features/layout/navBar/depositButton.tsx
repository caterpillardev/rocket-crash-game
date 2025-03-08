import S from "./depositButton.module.scss";
import { useWindowSize } from "@uidotdev/usehooks";
import { useApp } from "@context/AppContext";
import { DropButton } from "@features/ui";
import { Icon } from "@features/icon";
import { toast } from "react-toastify";

export const DepositButton = () => {
  const { width } = useWindowSize();
  const { app, setApp } = useApp();

  const openDipositModal = () => {
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

    setApp((prevState) => ({ ...prevState, openDeposit: true }));
  };

  return (
    <DropButton $filter="2px" onClick={openDipositModal}>
      <div className={S.body}>
        <Icon
          name="Deposit"
          width={width! > 1024 ? 60 : 20}
          height={width! > 1024 ? 60 : 20}
          viewBox="0 0 60 60"
        />
        <div className={S.title}>
          <h3>Deposit Now</h3>
          <span>Get $100 Bonus</span>
        </div>
      </div>
    </DropButton>
  );
};
