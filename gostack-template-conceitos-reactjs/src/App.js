import React, { useState, useEffect } from "react";
import api from "./services/api"

import "./styles.css";

function App() {

	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		api.get('repositories').then(response => {
			setRepositories(response.data);
		})
	},[]);

	async function handleAddRepository() {

		const response = await api.post('repositories', {
			url: "https://github.com/Rocketseat/umbriel",
			title: `Umbriel ${Date.now()}`,
			techs: ["Node", "Express", "TypeScript"]
		});

		setRepositories([...repositories, response.data]);
		
	}

	async function handleRemoveRepository(id) {

		api.delete(`repositories/${id}`).then(res => {
			let list = [...repositories];
			const index = list.findIndex(repositorie => repositorie.id == id);
			list.splice(index, 1);
			setRepositories(list);
		}).catch(err => console.log("An error has occurred."));

	}

	return (
		<div>
			<ul data-testid="repository-list">
				{repositories.map(repositorie =>
					<li key={repositorie.id}> {repositorie.title} <button onClick={() => handleRemoveRepository(repositorie.id)}> Remover </button> </li>
				)}
			</ul>

			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
		);
	}

export default App;
