import React, { useState, useEffect } from 'react';
import { getUsersList, deleteUser } from '../../services/user'; // Import the getUsersList and deleteUser functions

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsersList(); 
      if (response['status'] === 'success') {
        setUsers(response['data']);
      } else {
        console.error('Error fetching users:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await deleteUser(userId); // Call the deleteUser function
      if (response['status'] === 'success') {
        // Update the users list after successful deletion
        const updatedUsers = users.filter(user => user.user_id !== userId);
        setUsers(updatedUsers);
      } else {
        console.error('Error deleting user:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            {user.firstName} {user.lastName} - {user.email}
            <button onClick={() => handleDeleteUser(user.user_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;