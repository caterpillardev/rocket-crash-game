import {
  ApiController,
  AssetUtil,
  ConnectionController,
  Connector,
  ConnectorController,
  CoreHelperUtil,
  OptionsController,
  RouterController,
  StorageUtil,
  WcWallet,
} from "@web3modal/core";
import { IWalletStoreType } from "./typeUtils";

const getInjectedWidget = (
  setDatas: React.Dispatch<React.SetStateAction<IWalletStoreType[]>>
) => {
  const { connectors } = ConnectorController.state;

  const injectedConnectors = connectors.filter(
    (c) => c.type === "INJECTED" && c.name !== "Browser Wallet"
  );

  if (
    !injectedConnectors?.length ||
    (injectedConnectors.length === 1 &&
      injectedConnectors[0]?.name === "Browser Wallet" &&
      !CoreHelperUtil.isMobile())
  ) {
    return null;
  }

  injectedConnectors.map((connector: Connector) => {
    if (!CoreHelperUtil.isMobile() && connector.name === "Browser Wallet")
      return null;

    if (!ConnectionController.checkInstalled()) return null;

    const image = AssetUtil.getConnectorImage(connector);
    setDatas((prev) => [
      ...prev,
      {
        data: connector,
        type: "connector",
        img: image!,
        title: connector.name!,
      },
    ]);
  });
};

const getExternalWidget = (
  setDatas: React.Dispatch<React.SetStateAction<IWalletStoreType[]>>
) => {
  const { connectors } = ConnectorController.state;
  const externalConnectors = connectors.filter(
    (c) => !["WALLET_CONNECT", "INJECTED", "ANNOUNCED", "AUTH"].includes(c.type)
  );

  if (!externalConnectors.length) {
    return null;
  }

  externalConnectors.map((connector: Connector) => {
    const image = AssetUtil.getConnectorImage(connector);
    setDatas((prev: IWalletStoreType[]) => [
      ...prev,
      {
        data: connector,
        type: "connector",
        img: image!,
        title: connector.name!,
      },
    ]);
  });
};

const getWalletConnectWidget = (
  setDatas: React.Dispatch<React.SetStateAction<IWalletStoreType[]>>
) => {
  const { connectors } = ConnectorController.state;
  const connector = connectors.find((c) => c.type === "WALLET_CONNECT");

  if (!connector) {
    return null;
  }

  const image = AssetUtil.getConnectorImage(connector);
  setDatas((prev) => [
    ...prev,
    {
      data: connector,
      type: "wallet",
      img: image!,
      title: connector.name!,
    },
  ]);
};

const getRecommendedWidget = (
  setDatas: React.Dispatch<React.SetStateAction<IWalletStoreType[]>>
) => {
  const { connectors } = ConnectorController.state;
  const connector = connectors.find((c) => c.type === "WALLET_CONNECT");
  if (!connector) {
    return null;
  }
  const { recommended } = ApiController.state;
  const { customWallets, featuredWalletIds } = OptionsController.state;
  const recent = StorageUtil.getRecentWallets();

  const injected: Connector[] = connectors.filter(
    (c) => c.type === "INJECTED" || c.type === "ANNOUNCED"
  );
  const injectedWallets = injected.filter((i) => i.name !== "Browser Wallet");

  if (featuredWalletIds || customWallets || !recommended.length) {
    return null;
  }

  const overrideLength = injectedWallets.length + recent.length;
  const maxRecommended = Math.max(0, 2 - overrideLength);

  const wallets = filterOutDuplicateWallets(recommended, connectors).slice(
    0,
    maxRecommended
  );

  if (!wallets.length) {
    return null;
  }

  wallets.map((wallet: WcWallet) => {
    const image = AssetUtil.getWalletImage(wallet);
    setDatas((prev) => [
      ...prev,
      {
        data: wallet,
        type: "wallet",
        img: image!,
        title: wallet.name!,
      },
    ]);
    RouterController.push("ConnectingWalletConnect", { wallet });
  });
};

const filterOutDuplicateWallets = (
  wallets: WcWallet[],
  connectors: Connector[]
) => {
  const recent = StorageUtil.getRecentWallets();

  const connectorRDNSs = connectors
    .map((connector) => connector.info?.rdns)
    .filter(Boolean) as string[];

  const recentRDNSs = recent
    .map((wallet) => wallet.rdns)
    .filter(Boolean) as string[];
  const allRDNSs = connectorRDNSs.concat(recentRDNSs);
  if (allRDNSs.includes("io.metamask.mobile") && CoreHelperUtil.isMobile()) {
    const index = allRDNSs.indexOf("io.metamask.mobile");
    allRDNSs[index] = "io.metamask";
  }
  const filtered = wallets.filter(
    (wallet) => !allRDNSs.includes(String(wallet?.rdns))
  );

  return filtered;
};

export {
  getInjectedWidget,
  getExternalWidget,
  getWalletConnectWidget,
  getRecommendedWidget,
};
