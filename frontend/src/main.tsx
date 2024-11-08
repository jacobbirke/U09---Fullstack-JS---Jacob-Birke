import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { store, persistor } from "./Redux/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

serviceWorkerRegistration.register();
