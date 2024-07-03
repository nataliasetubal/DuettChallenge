import React, { createContext, useState, useContext } from 'react';

const UsersContext = createContext();

export const useUsersContext = () => useContext(UsersContext);

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const updateUserList = (updatedUsers) => {
    setUsers(updatedUsers);
  };

  const updateUserBeingEdited = (editUser) => {
    setEditingUser(editUser);
  };
  const updatedUser = (user) => {
    setUser(user)
  }
  return (
    <UsersContext.Provider
      value={{
        users,
        editingUser,
        user,
        updateUserList,
        updateUserBeingEdited,
        updatedUser,

      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
