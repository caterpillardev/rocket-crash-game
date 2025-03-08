import { useApp } from "@context/AppContext";
import { DepositModal } from "@features/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PageRouter } from "@utils/routerUtils";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";

const queryClient = new QueryClient();
const projectId = "77f57a9b82d0c79fe3ba281603fc6581";

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [sepolia] as const;

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
});

function App() {
  const { app, setApp } = useApp();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    if (path === "crash" || path === "mine" || path === "flip") {
      setApp((prevState) => ({ ...prevState, game: path }));
    } else {
      setApp((prevState) => ({ ...prevState, link: path, game: "" }));
    }
  }, [location]);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <PageRouter />
        {app.openDeposit && <DepositModal />}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
