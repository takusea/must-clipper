import { useEffect, useState } from "react";
import type { PageAttribute } from "./type";

export function usePageAttributes() {
	const [pageAttribute, setPageAttribute] = useState<PageAttribute>({
		title: "",
		description: "",
	});

	useEffect(init, []);

	function init() {
		const query = window.location.search;
		const params = new URLSearchParams(query);

		setPageAttribute({
			title: params.get("t") ?? "",
			description: params.get("d") ?? "",
		});
	}

	function pageAttributeToUrlParam() {
		const title = pageAttribute?.title
			? `t=${encodeURIComponent(pageAttribute.title)}&`
			: "";
		const description = pageAttribute?.title
			? `d=${encodeURIComponent(pageAttribute.description)}&`
			: "";

		return `${title}${description}`;
	}

	return {
		pageAttribute,
		setPageAttribute,
		pageAttributeToUrlParam,
	};
}
