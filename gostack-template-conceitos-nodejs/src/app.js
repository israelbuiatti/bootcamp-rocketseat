const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
	response.json(repositories);
});

app.post("/repositories", (request, response) => {
	const {title, url, techs} = request.body;

	const repositorie = {id:uuid(), title, url, techs, likes:0}

	repositories.push(repositorie);

	response.json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
  
	const { id } =  request.params;
    const {title, url, techs} = request.body;

    const index = repositories.findIndex(repositorie => repositorie.id == id);

    if (index < 0) {
        return response.status(400).json({error: 'Repositorie not found.'})
    }

    const repositorie = {
        id,
        title,
		url,
		techs, 
		likes: repositories[index].likes
    }

    repositories[index] = repositorie;

	return response.json(repositorie);
	
});

app.delete("/repositories/:id", (request, response) => {

	const { id } =  request.params;

    const index = repositories.findIndex(repositorie => repositorie.id == id);

    if (index < 0) {
        return response.status(400).json({error: 'Repositorie not found.'})
    }

    repositories.splice(index, 1);

	return response.status(204).json([]);
	
});

app.post("/repositories/:id/like", (request, response) => {

	const { id } =  request.params;
    const {title, url, techs} = request.body;

    const index = repositories.findIndex(repositorie => repositorie.id == id);

    if (index < 0) {
        return response.status(400).json({error: 'Repositorie not found.'})
    }
	
	repositories[index].likes += 1;

	return response.json(repositories[index]);

});

module.exports = app;
