import { useMemo, useState } from "react";
import { VideoAddForm } from "./features/video-metadata/VideoAddForm";
import { PageAttributeEditForm } from "./features/page-attribute/PageAttributeEditForm";
import { useVideoMetadatas } from "./features/video-metadata/useVideoMetadatas";
import { VideoPlayer } from "./features/video-player/VideoPlayer";
import { Button } from "./components/Button";
import type { PageAttribute } from "./features/page-attribute/type";
import { FloatingActionButton } from "./components/FloatingActionButton";
import {
	IconBrandLine,
	IconBrandX,
	IconCopy,
	IconEdit,
	IconShare,
} from "@tabler/icons-react";
import { usePageAttributes } from "./features/page-attribute/usePageAttribute";
import { Dialog, DialogContent, DialogTrigger } from "./components/Dialog";
import { TextField } from "./components/TextField";
import { LinkButton } from "./components/LinkButton";

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

	const url = useMemo(() => {
		return `${window.location.origin}${window.location.pathname}?${pageAttributeToUrlParam()}${videoMetadatasToUrlParam()}`;
	}, [pageAttributeToUrlParam, videoMetadatasToUrlParam]);

	function handleCopy() {
		if (!navigator.clipboard) {
			return;
		}

		navigator.clipboard.writeText(url);
		console.log(`copied! ${url}`);
	}

	function handleAttrSubmit(attr: PageAttribute) {
		setPageAttribute(attr);
		setIsEditing(false);
	}

	return (
		<div className="max-w-screen-md min-h-screen m-auto flex flex-col gap-8 px-4">
			<div className="w-full bg-white py-4">
				{!isEditing ? (
					<div className="flex flex-col gap-2">
						<div className="flex gap-1 justify-between">
							<h1 className="text-2xl font-bold">
								{pageAttribute.title || (
									<span className="text-gray-400 select-none">
										タイトルなし
									</span>
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
					</div>
				) : (
					<PageAttributeEditForm
						attr={pageAttribute}
						onSubmit={handleAttrSubmit}
						onCancel={() => setIsEditing(false)}
					/>
				)}
			</div>
			<div className="flex flex-col gap-8 mb-auto">
				{videoMetadatas.map((metadata) => (
					<VideoPlayer
						key={metadata.id}
						metadata={metadata}
						onChange={editMetadata}
						onDelete={removeMetadata}
					/>
				))}
			</div>
			<div className="sticky bottom-0 flex flex-col gap-4 justify-end mt-16">
				<div className="absolute right-0 bottom-full mb-4">
					<Dialog>
						<DialogTrigger>
							<FloatingActionButton icon={IconShare}>共有</FloatingActionButton>
						</DialogTrigger>
						<DialogContent title="共有">
							<div className="flex flex-col gap-2">
								<div className="flex gap-2">
									<TextField value={url} readOnly />
									<Button icon={IconCopy} iconOnly onClick={handleCopy}>
										コピー
									</Button>
								</div>
								<h2 className="mt-4">SNSでシェア</h2>
								<div className="flex gap-2">
									<LinkButton
										href={`https://twitter.com/intent/tweet?url=${url}`}
										icon={IconBrandX}
										iconOnly
									>
										X
									</LinkButton>
									<LinkButton
										href={`https://social-plugins.line.me/lineit/share?url=${url}`}
										icon={IconBrandLine}
										iconOnly
									>
										Line
									</LinkButton>
								</div>
							</div>
						</DialogContent>
					</Dialog>
				</div>
				<div className="w-full bg-white border-t border-gray-200 py-4">
					<VideoAddForm onAdd={addMetadata} />
				</div>
			</div>
		</div>
	);
}

export default App;
