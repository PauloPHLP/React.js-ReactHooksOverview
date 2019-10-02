import React, { useState, useEffect } from 'react';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/PauloPHLP/repos');
    const data = await response.json();

    setRepositories(data);
  }, []);

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);

    document.title = `You have ${filtered.length} favorites!`;
  }, [repositories]);

  function handleFavorites(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo 
    });

    setRepositories(newRepositories);
  }

  return (
    <>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span> (Favorite) </span>}
            <button onClick={() => handleFavorites(repo.id)}>Favorites</button>
          </li>
        ))}
      </ul>
    </>
  )
}