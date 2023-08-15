import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

import { mount as mountDevTools } from "@latticexyz/dev-tools";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { App } from "./App";
import WalletConnection from './components/WalletConnection';
import { MUDProvider } from "./context/MUDContext";
import { setup } from "./mud/setup";

const rootElement = document.getElementById("react-root");
if (!rootElement) throw new Error("React root not found");
const root = ReactDOM.createRoot(rootElement);

// TODO: figure out if we actually want this to be async or if we should render something else in the meantime
setup().then((result) => {
  root.render(
    <WalletConnection>
      <MUDProvider value={result}>
        <App />
        <ToastContainer position="bottom-right" draggable={false} theme="dark" />
      </MUDProvider>
    </WalletConnection>
  );
  mountDevTools();
});
