import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUserData: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
