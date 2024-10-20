import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Tooltip from "@radix-ui/react-tooltip";

import App from "./App.tsx";
import "destyle.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Tooltip.Provider>
			<App />
		</Tooltip.Provider>
	</StrictMode>,
);
