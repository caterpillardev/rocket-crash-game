import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "@context/AppContext.tsx";
import { CrashProvider } from "@context/CrashContext.tsx";
import { MineProvider } from "@context/MineContext.tsx";
import { CoinflipProvider } from "@context/CoinflipContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <CrashProvider>
          <MineProvider>
            <CoinflipProvider>
              <App />
            </CoinflipProvider>
          </MineProvider>
        </CrashProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
