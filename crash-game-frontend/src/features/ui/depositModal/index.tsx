import { useEffect, useRef, useState } from "react";
import { DropBox } from "../dropBox";
import S from "./index.module.scss";
import { MainButton } from "../button";
import { HiOutlineX } from "react-icons/hi";
import { useWriteContract } from "wagmi";
import { TOKEN_ABI, TOKEN_ADDRESS } from "@utils/contract";
import { parseUnits } from "ethers";
import { toast } from "react-toastify";
import { useApp } from "@context/AppContext";
import { axiosPost } from "@utils/axiosUtils";
import clsx from "clsx";

const GAME_ADDRESS =
  process.env.GAME_ADDRESS! || "0x736d51C8938581292778A6bA9Dc61f0E29D660f6";

export const DepositModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [amount, setAmount] = useState<string>("0");
  const [hash, setHash] = useState<string>("");
  const { app, setApp } = useApp();
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<"deposit" | "withdraw">("deposit");

  const { writeContractAsync, isSuccess } = useWriteContract();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDiposit = async () => {
    try {
      setLoading(true);
      const res = await writeContractAsync({
        abi: TOKEN_ABI,
        address: TOKEN_ADDRESS,
        functionName: "transfer",
        args: [GAME_ADDRESS, parseUnits(amount, "ether")],
      });
      setHash(res);
    } catch (error) {
      console.error(error);
      setApp((prevState) => ({ ...prevState, openDeposit: false }));
    }
  };

  const handleWithdraw = async () => {
    try {
      // await axiosPost([
      //   "/aiuser/generate",
      //   { data: { number: 18 } },
      // ]);
      // console.log("Fake user logger", res);
      if (Number(amount) < app.user?.amount!) {
        setLoading(true);
        await axiosPost([
          "/user/approve",
          { data: { address: app.user?.crypto, amount: Number(amount) } },
        ]);
        setApp((prevState) => ({
          ...prevState,
          user: {
            id: prevState.user?.id || "",
            amount: (prevState.user?.amount || 0) - Number(amount),
            crypto: prevState.user?.crypto || "",
            avatar: prevState.user?.avatar || "",
            nickname: prevState.user?.nickname || "",
            username: prevState.user?.username || "",
          },
          openDeposit: false,
        }));
      } else {
        toast.warning("Your wallet enough", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
      setApp((prevState) => ({ ...prevState, openDeposit: false }));
    }
  };

  const handleClose = () => {
    setApp((prevState) => ({ ...prevState, openDeposit: false }));
  };

  useEffect(() => {
    const updateData = async () => {
      try {
        if (type === "deposit") {
          await axiosPost([
            "/user/deposit",
            {
              data: {
                txHash: hash,
                amount: Number(amount),
                address: app.user?.crypto,
              },
            },
          ]);

          toast.success(`Successfully deposited ${amount}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setApp((prevState) => ({
            ...prevState,
            user: {
              id: prevState.user?.id || "",
              amount: (prevState.user?.amount || 0) + Number(amount),
              crypto: prevState.user?.crypto || "",
              avatar: prevState.user?.avatar || "",
              nickname: prevState.user?.nickname || "",
              username: prevState.user?.username || "",
            },
            openDeposit: false,
          }));
        } else if (type === "withdraw") {
          const res = await axiosPost([
            "/user/withdraw",
            {
              data: {
                txHash: hash,
                amount: Number(amount),
                address: app.user?.crypto,
              },
            },
          ]);

          toast.success(`Successfully withdraw ${amount}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setApp((prevState) => ({
            ...prevState,
            user: {
              id: prevState.user?.id || "",
              amount: (prevState.user?.amount || 0) - res.amount,
              crypto: prevState.user?.crypto || "",
              avatar: prevState.user?.avatar || "",
              nickname: prevState.user?.nickname || "",
              username: prevState.user?.username || "",
            },
            openDeposit: false,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (isSuccess && hash) {
      updateData();
    }
  }, [isSuccess, hash]);

  const changeDepositType = (type: "deposit" | "withdraw") => {
    setType(type);
  };

  return (
    <div className={S.body}>
      <DropBox $filter="0.5px">
        <div ref={modalRef} className={S.body_wrapper}>
          <div className={S.body_header}>
            <div className={S.body_header_nav}>
              <MainButton
                $padding="8px"
                onClick={() => changeDepositType("deposit")}
                $filterWidth="2px"
                $title={"Deposit"}
                className={S.body_header_nav_btn}
                $active={type === "deposit"}
                $activeBgColor="#f7f7f7"
              />
              <MainButton
                $padding="8px"
                onClick={() => changeDepositType("withdraw")}
                $filterWidth="2px"
                $title={"Withdraw"}
                className={S.body_header_nav_btn}
                $active={type === "withdraw"}
                $activeBgColor="#f7f7f7"
              />
            </div>
            <MainButton
              $icon={<HiOutlineX size={16} />}
              $padding="8px"
              onClick={handleClose}
              $filterWidth="2px"
            />
          </div>
          <div className={S.body_main}>
            <label htmlFor="amount" className={S.body_main_input}>
              {type === "deposit" ? "Deposit" : "Withdraw"} amount
              <input
                type="number"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
          </div>
          <div className={S.body_footer}>
            <MainButton
              $width="100px"
              $padding="8px"
              $title={type === "deposit" ? "Deposit" : "Withdraw"}
              onClick={
                !loading
                  ? type === "deposit"
                    ? handleDiposit
                    : handleWithdraw
                  : undefined
              }
              $filterWidth="2px"
              className={clsx(S.body_footer_deposit, loading && S.active)}
            />
          </div>
        </div>
      </DropBox>
    </div>
  );
};
