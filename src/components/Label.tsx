import * as LabelPrimitive from "@radix-ui/react-label";
import type { ReactNode } from "react";

type Props = {
	htmlFor: string;
	children: ReactNode;
};

export function Label(props: Props) {
	return (
		<LabelPrimitive.Root className="font-semibold" htmlFor={props.htmlFor}>
			{props.children}
		</LabelPrimitive.Root>
	);
}
