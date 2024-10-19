import { useState } from "react";
import { VideoAddForm } from "./features/video-metadata/VideoAddForm";
import { PageAttributeEditForm } from "./features/page-attribute/PageAttributeEditForm";
import { useVideoMetadatas } from "./features/video-metadata/useVideoMetadatas";
import { VideoPlayer } from "./features/video-player/VideoPlayer";
import { Button } from "./components/Button";
import type { PageAttribute } from "./features/page-attribute/type";
import { FloatingActionButton } from "./components/FloatingActionButton";
import { IconEdit, IconShare } from "@tabler/icons-react";
import { usePageAttributes } from "./features/page-attribute/usePageAttribute";

function App() {
	const {
		videoMetadatas,
		addMetadata,
		removeMetadata,
		editMetadata,
		videoMetadatasToUrlParam,
	} = useVideoMetadatas();
	const { pageAttribute, setPageAttribute, pageAttributeToUrlParam } =
		usePageAttributes();
	const [isEditing, setIsEditing] = useState(false);

	function handleShare() {
		if (!navigator.clipboard) {
			return;
		}

		const url = `${window.location.origin}${window.location.pathname}?${pageAttributeToUrlParam()}${videoMetadatasToUrlParam()}`;

		navigator.clipboard.writeText(url);
		console.log(`copied! ${url}`);
	}

	function handleAttrSubmit(attr: PageAttribute) {
		setPageAttribute(attr);
		setIsEditing(false);
	}

	return (
		<div className="max-w-screen-md min-h-screen m-auto flex flex-col gap-8 px-4">
			<div className="w-full bg-white py-4 flex flex-col gap-2">
				{!isEditing ? (
					<>
						<div className="flex gap-1 justify-between">
							<h1 className="text-2xl font-bold">
								{pageAttribute.title ? (
									pageAttribute.title
								) : (
									<span className="text-gray-400">タイトルなし</span>
								)}
							</h1>
							<Button
								onClick={() => setIsEditing(true)}
								icon={IconEdit}
								iconOnly
							>
								編集
							</Button>
						</div>
						<p className="">{pageAttribute.description}</p>
					</>
				) : (
					<PageAttributeEditForm
						attr={pageAttribute}
						onSubmit={handleAttrSubmit}
						onCancel={() => setIsEditing(false)}
					/>
				)}
			</div>
			{videoMetadatas.map((metadata) => (
				<VideoPlayer
					key={metadata.id}
					metadata={metadata}
					onChange={editMetadata}
					onDelete={removeMetadata}
				/>
			))}
			<div className="mt-auto sticky bottom-0 flex flex-col gap-4 justify-end">
				<FloatingActionButton onClick={handleShare} icon={IconShare}>
					共有
				</FloatingActionButton>
				<div className="w-full bg-white border-t border-gray-200 py-4">
					<VideoAddForm onAdd={addMetadata} />
				</div>
			</div>
		</div>
	);
}

export default App;
