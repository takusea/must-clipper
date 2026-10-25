import * as Tooltip from "@radix-ui/react-tooltip";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./main.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error('Root element with id "root" was not found.');
}

createRoot(rootElement).render(
	<StrictMode>
		<Tooltip.Provider>
			<App />
		</Tooltip.Provider>
	</StrictMode>,
);
