import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { saveStorage } from '../../storage/storage';
import { userToken_storage, user_storage } from '../../storage/storageConfig';

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
}

const initialState: UserState = {
  user: null,
  token: '',
  'refresh-token': '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state['refresh-token'] = action.payload['refresh-token'];

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${action.payload.token}`;
      saveStorage(user_storage, state.user);
      saveStorage(userToken_storage, state.token);
    },
    remove: (state) => {
      state.user = null;
      state.token = '';
      state['refresh-token'] = '';
    },
  },
});

export const user = userSlice.reducer;

export const { save, remove } = userSlice.actions;
