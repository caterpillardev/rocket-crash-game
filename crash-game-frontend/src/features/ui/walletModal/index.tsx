import { IWalletStoreType } from "@utils/typeUtils";
import {
  getExternalWidget,
  getInjectedWidget,
  getRecommendedWidget,
  getWalletConnectWidget,
} from "@utils/walletUtils";
import {
  AccountController,
  ConnectionController,
  CoreHelperUtil,
} from "@web3modal/core";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { MainButton } from "../button";
import { DropBox } from "../dropBox";
import S from "./index.module.scss";
import { HiChevronDown, HiOutlineX } from "react-icons/hi";
import { WalletItem } from "./item";

interface IProps {
  setActiveModal: Dispatch<SetStateAction<boolean>>;
}

export const WalletModal: FC<IProps> = ({ setActiveModal }) => {
  const [datas, setDatas] = useState<IWalletStoreType[]>([]);
  const hasRun = useRef(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setActiveModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActiveModal]);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    getInjectedWidget(setDatas);
    getExternalWidget(setDatas);
    getWalletConnectWidget(setDatas);
    getRecommendedWidget(setDatas);
  }, []);

  const handleConnectWallet = async (item: any) => {
    if (AccountController.state.address) {
      await ConnectionController.disconnect();
    } else {
      if (item.type === "connector") {
        ConnectionController.connectExternal(item.data);
      } else if (item.type === "wallet") {
        const { mobile_link, desktop_link, webapp_link, injected, rdns } =
          item.data;
        let platforms: string[] = [];
        const injectedArray: { namespace: string; injected_id: string }[] =
          injected;
        const injectedIds = injectedArray
          .map(({ injected_id }) => injected_id)
          .filter(Boolean) as string[];
        const browserIds = rdns ? [rdns] : injectedIds ?? [];
        const isBrowser = browserIds.length;
        const isMobileWc = mobile_link;
        const isWebWc = webapp_link;
        const isBrowserInstalled =
          ConnectionController.checkInstalled(browserIds);
        const isBrowserWc = isBrowser && isBrowserInstalled;
        const isDesktopWc = desktop_link && !CoreHelperUtil.isMobile();

        if (isBrowserWc) {
          platforms.push("browser");
        }
        if (isMobileWc) {
          platforms.push(CoreHelperUtil.isMobile() ? "mobile" : "qrcode");
        }
        if (isWebWc) {
          platforms.push("web");
        }
        if (isDesktopWc) {
          platforms.push("desktop");
        }
        if (!isBrowserWc && isBrowser) {
          platforms.push("unsupported");
        }
      }
    }
    setActiveModal(false);
  };

  if (hasRun.current) {
    return (
      <div className={S.body}>
        <DropBox $filter="0.5px">
          <div ref={modalRef} className={S.wrapper}>
            <div className={S.header}>
              <div />
              <h3>connect wallet</h3>
              <MainButton
                $icon={<HiOutlineX size={16} />}
                $padding="8px"
                onClick={() => setActiveModal(false)}
                $filterWidth="2px"
              />
            </div>
            <div className={S.lists}>
              {datas.map((item, index) => (
                <WalletItem
                  key={index}
                  data={item}
                  onClick={() => handleConnectWallet(item)}
                />
              ))}
            </div>
            <div className={S.footer}>
              <MainButton
                $icon={<HiChevronDown size={16} />}
                $padding="8px 16px"
                $title="more"
                $fontWeight="bold"
                $fontSize="14px"
                $lineHeight="20px"
                $textTransform="uppercase"
                $fontFamily="Lato"
                $filterWidth="2px"
              />
            </div>
          </div>
        </DropBox>
      </div>
    );
  }
};
