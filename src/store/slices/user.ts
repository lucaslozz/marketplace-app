import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface User {
  id: string;
  avatar: string;
  name: string;
  email: string;
  tel: string;
  created_at: Date;
  updated_at: Date;
}

interface UserState {
  token: string;
  user: User | null;
  'refresh-token': string;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  token: '',
  'refresh-token': '',
  isLoading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
      state.isLoading = false;
    },
  },
});

export const user = userSlice.reducer;

export const { save } = userSlice.actions;
