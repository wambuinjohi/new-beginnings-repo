import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeMetaPixel, initializeGoogleAnalytics } from "./lib/retargeting";

// Initialize retargeting pixels
initializeGoogleAnalytics();
initializeMetaPixel();

createRoot(document.getElementById("root")!).render(<App />);
