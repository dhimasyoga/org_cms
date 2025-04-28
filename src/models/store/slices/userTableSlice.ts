import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserFilterParams } from '@/modules/constants/types/userList.types';

interface UserTableState {
  currentPage: number;
  params: UserFilterParams;
}

const initialState: UserTableState = {
  currentPage: 0,
  params: {
    username: '',
    phone: '',
    department: null,
    role: null,
    skip: 0,
    limit: 10,
  },
}

export const userTableSlice = createSlice({
  name: 'userTable',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    resetCurrentPage: (state) => {
      state.currentPage = 0
    },
    setGlobalParams: (state, action: PayloadAction<UserFilterParams>) => {
      state.params = action.payload;
    },
    resetGlobalParams: (state) => {
      state.params = initialState.params;
    },
  }
})

export const {
  setCurrentPage,
  resetCurrentPage,
  setGlobalParams,
  resetGlobalParams
} = userTableSlice.actions;

export default userTableSlice.reducer;
