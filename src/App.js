import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {

      const repository = response.data;

      setRepositories(repository);
    });
  }, []);

  async function handleAddRepository() {

    try {
      const response = await api.post('/repositories', {
        "title": `Desafio ${Date.now()}`,
        "url": "http://github.com/julio-maluf",
        "techs": ["Node.js", "ReactJS", "React Native"],
        "likes": 0
      });

      const repository = response.data;

      setRepositories([ ...repositories, repository ]);

    } catch(e) {
      console.log(e);
    }
  }

  async function handleRemoveRepository(id) {

    try {
      await api.delete(`/repositories/${id}`);

      setRepositories(repositories.filter(repository => repository.id !== id));

    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id} >
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
