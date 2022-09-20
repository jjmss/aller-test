import useFetch from "./hooks/useFetch";
import { useEffect, useState } from "react";
import Row from "./components/Row";
import styled from "styled-components";

//#region Styles
const ModuleWrapper = styled.div`
	--gap: 1rem;
	display: flex;
	flex-direction: column;
	gap: var(--gap);

	max-width: 96rem;
	margin: auto;
	padding: 2rem;
`;
//#endregion

function App() {
	const [modules, setModules] = useState();
	const { data, loading } = useFetch(
		"https://storage.googleapis.com/aller-structure-task/test_data.json"
	);

	useEffect(() => {
		if (loading || !data) return;

		setModules(data[0]);
	}, [data, loading]);

	return (
		<ModuleWrapper className="App">
			{modules &&
				modules.map((module, index) => {
					switch (module.type) {
						case "Row":
							let key = `module:${module.type}:${index}`;
							return <Row key={key} id={key} columns={module.columns} />;
						default:
							console.warn(`No template for: ${module.type}`);
							return <></>;
					}
				})}
		</ModuleWrapper>
	);
}

export default App;
