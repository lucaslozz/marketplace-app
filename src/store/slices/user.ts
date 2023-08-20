import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

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
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state['refresh-token'] = action.payload['refresh-token'];
      state.isLoading = false;
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${action.payload.token}`;
    },
    remove: (state) => {
      state.user = null;
      state.token = '';
      state['refresh-token'] = '';
      state.isLoading = false;
    },
  },
});

export const user = userSlice.reducer;

export const { save, remove } = userSlice.actions;
