import { createElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useImage from "../hooks/useImage";

//#region Styles
const StyledArticle = styled.article`
	flex: ${(p) => p.width || 1};
	text-align: left;

	.article-wrapper {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.article-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.article-content {
		padding: 1rem;
		background-color: lightgrey;

		&.edit-mode {
			display: flex;
			flex-direction: column;
		}
	}

	.title-input {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}
`;

const StyledButton = styled.button`
	top: 0 !important;
	cursor: pointer;
`;

//#endregion

// Creates a wrapper to be able to swap between <a> and <div> to prevent glitches when editing (dragging selected text)
const ArticleContentWrapper = ({ tag, children, ...props }) => {
	return createElement(tag, props, children);
};

function Article({ imageUrl, title, url, width, id }) {
	// Sets the title to the saved title or the original title if it is not modified
	const [savedTitle, setSavedTitle] = useState(localStorage.getItem(`title_${id}`) || title);
	const [modifiedTitle, setModifiedTitle] = useState(savedTitle);
	const [editMode, setEditMode] = useState(false);
	const { image } = useImage(imageUrl, {
		defaultWidth: (window.innerWidth / 12) * width,
		defaultHeight: 350,
	});
	const inputRef = useRef();

	// Set the input in focus when edit mode is enabled
	useEffect(() => {
		if (editMode) {
			inputRef.current.focus();
		}
	}, [editMode]);

	// Allow to use keyboard shortcuts to save/exit the editor mode
	const handleInputKeydown = (e) => {
		if (e.key === "Enter") {
			saveEdit();
		} else if (e.key === "Escape") {
			cancelEdit();
		}
	};

	// Reset the edit if it is modified
	const resetEdit = () => {
		localStorage.removeItem(`title_${id}`);
		setModifiedTitle(title);
		setSavedTitle(title);
		setEditMode(false);
	};

	// Cancel the current edit and revert to the saved title
	const cancelEdit = () => {
		setModifiedTitle(savedTitle);
		setEditMode(false);
	};

	const saveEdit = () => {
		if (modifiedTitle !== title) {
			// Save the title in localStorage if it is modified
			localStorage.setItem(`title_${id}`, modifiedTitle);
		} else {
			// Removes the the title if it uses the original title to prevent useless storage :)
			localStorage.removeItem(`title_${id}`);
		}

		setSavedTitle(modifiedTitle);
		setEditMode(false);
	};

	return (
		<StyledArticle>
			<ArticleContentWrapper
				tag={editMode ? "div" : "a"}
				href={url}
				className="article-wrapper"
				target="_blank"
				onClick={(e) => {
					if (editMode || e.target.nodeName === "BUTTON") {
						e.preventDefault();
					}
				}}
			>
				<img className="article-image" src={image} alt={savedTitle} />
				<div className={`article-content ${editMode && "edit-mode"}`}>
					{!editMode ? (
						<>
							<h1>{savedTitle}</h1>
							<StyledButton onClick={() => setEditMode(true)}>Edit</StyledButton>
						</>
					) : (
						<>
							<input
								ref={inputRef}
								className="title-input"
								value={modifiedTitle}
								onChange={(e) => setModifiedTitle(e.target.value)}
								onKeyDown={(e) => handleInputKeydown(e)}
							/>
							<div>
								<StyledButton onClick={() => cancelEdit()}>Cancel</StyledButton>
								<StyledButton onClick={() => saveEdit()}>Save</StyledButton>
								{modifiedTitle !== title && (
									<StyledButton onClick={() => resetEdit()}>Reset</StyledButton>
								)}
							</div>
						</>
					)}
				</div>
			</ArticleContentWrapper>
		</StyledArticle>
	);
}

export default Article;
