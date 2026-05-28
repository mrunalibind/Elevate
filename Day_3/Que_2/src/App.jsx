import React from 'react'
import { useState, useEffect } from 'react';
import Card from './Card';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        console.log(data);
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("Error: something went wrong");
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="Search users..."
        style={{
          marginBottom: '20px',
          padding: '8px',
          width: '240px',
          display: 'block',
          margin: 'auto',
        }}
      />

      {!loading && !error && (
        <p style={{ textAlign: 'center', marginTop: '0', fontWeight: '600' }}>
          Showing {filteredUsers.length} user{filteredUsers.length === 1 ? '' : 's'}
        </p>
      )}

      {loading && <p>Loading users...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            // marginTop: '20px',
            width: '80%',
            margin: 'auto',
          }}
        >
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => <Card key={user.id} user={user} />)
          ) : (
            <p style={{ textAlign: 'center' }}>
              No users found.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default App