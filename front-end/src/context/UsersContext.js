import React, { createContext, useState, useContext } from 'react';

const UsersContext = createContext();

export const useUsersContext = () => useContext(UsersContext);

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const updateUserList = (updatedUsers) => {
    setUsers(updatedUsers);
  };

  const updateUserBeingEdited = (user) => {
    setEditingUser(user);
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        editingUser,
        updateUserList,
        updateUserBeingEdited,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
