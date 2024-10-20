type Props = {
	htmlFor: string;
	children: string;
};

export function Label(props: Props) {
	return (
		<label className="font-bold" htmlFor={props.htmlFor}>
			{props.children}
		</label>
	);
}
