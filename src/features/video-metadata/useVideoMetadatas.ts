import { useEffect, useState } from "react";
import type { VideoMetadata } from "./type";

export function useVideoMetadatas() {
	const [videoMetadatas, setVideoMetadatas] = useState<VideoMetadata[]>([]);

	useEffect(init, []);

	function init() {
		const query = window.location.search;
		const params = new URLSearchParams(query);

		const metadatas: VideoMetadata[] = Array.from(params)
			.filter(([key, _]) => !Number.isNaN(Number.parseInt(key)))
			.map(([_, value]) => {
				const arr = value.split(" ");
				return {
					type: arr[0],
					id: arr[1],
					seconds: arr[2] ?? Number(arr[2]),
					title: arr[3] ?? arr[3],
				} as unknown as VideoMetadata;
			});

		setVideoMetadatas(metadatas);
	}

	function editMetadata(id: string, newMetadata: VideoMetadata) {
		setVideoMetadatas((metadatas) =>
			metadatas.map((metadata) =>
				metadata.id === id ? { ...metadata, ...newMetadata } : metadata,
			),
		);
	}

	function addMetadata(newMetadata: VideoMetadata) {
		if (videoMetadatas.some((metadata) => metadata.id === newMetadata.id)) {
			editMetadata(newMetadata.id, newMetadata);
		} else {
			setVideoMetadatas((metadatas) => [...metadatas, newMetadata]);
		}
	}

	function removeMetadata(id: number | string) {
		setVideoMetadatas((metadatas) =>
			metadatas.filter((metadata) => metadata.id !== id),
		);
	}

	function videoMetadatasToUrlParam() {
		return videoMetadatas
			.map((metadata, index) => {
				const title = metadata.title ? `+${metadata.title}` : "";
				return `${index}=${metadata.type}+${metadata.id}+${metadata.seconds}${title}`;
			})
			.join("&");
	}

	return {
		videoMetadatas,
		addMetadata,
		removeMetadata,
		editMetadata,
		videoMetadatasToUrlParam,
	};
}
