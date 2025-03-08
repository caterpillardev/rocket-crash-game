import S from "./item.module.scss";
import { DropButton } from "../dropButton";
import { IWalletStoreType } from "@utils/typeUtils";

export const WalletItem = ({
  data,
  onClick,
}: {
  data: IWalletStoreType;
  onClick: (data: any) => void;
}) => {
  return (
    <DropButton $filter="2px">
      <div className={S.body} onClick={onClick}>
        <div className={S.logo}>
          <img src={data.img} alt="" />
        </div>
        <h4>{data.title}</h4>
      </div>
    </DropButton>
  );
};
