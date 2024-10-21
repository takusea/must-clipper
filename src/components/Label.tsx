import * as LabelPrimitive from "@radix-ui/react-label";

type Props = {
	htmlFor: string;
	children: string;
};

export function Label(props: Props) {
	return (
		<LabelPrimitive.Root className="font-semibold" htmlFor={props.htmlFor}>
			{props.children}
		</LabelPrimitive.Root>
	);
}
