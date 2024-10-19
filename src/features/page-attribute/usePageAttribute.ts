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
			title: params.get("title") ?? "",
			description: params.get("description") ?? "",
		});
	}

	function pageAttributeToUrlParam() {
		const title = pageAttribute?.title ? `title=${pageAttribute.title}&` : "";
		const description = pageAttribute?.title
			? `description=${pageAttribute.description}&`
			: "";
		return `${title}${description}`;
	}

	return {
		pageAttribute,
		setPageAttribute,
		pageAttributeToUrlParam,
	};
}
