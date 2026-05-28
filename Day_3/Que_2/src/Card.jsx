import React from 'react'

const Card = ({ user }) => {
  return (
    <div style={{ borderRadius: '8px', backgroundColor: '#585858', padding: '10px' }}>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>City: {user.address.city}</p>
    </div>
  )
}

export default Card