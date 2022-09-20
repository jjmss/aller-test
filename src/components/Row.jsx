import styled from "styled-components";
import Article from "./Article";

//#region Styles
const StyledRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--gap);

	@media (min-width: 768px) {
		flex-direction: row;
	}
`;
//#endregion

function Row({ columns, id }) {
	return (
		<StyledRow>
			{columns.map(({ imageUrl, title, type, url, width }, index) => {
				const key = `${id}:${type}:${index}`;
				return (
					<Article
						key={key}
						id={key}
						imageUrl={imageUrl}
						title={title}
						url={url}
						width={width}
					/>
				);
			})}
		</StyledRow>
	);
}

export default Row;
