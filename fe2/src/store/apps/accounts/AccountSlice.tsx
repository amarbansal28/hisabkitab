import axios from "../../../utils/axios";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";

const API_URL = "http://localhost:3001/accounts";

interface StateType {
  accounts: any[];
  currentFilter: string;
  accountSearch: string;
}

const initialState = {
  accounts: [],
  currentFilter: "total_accounts",
  accountSearch: "",
};

export const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    getAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    SearchAccount: (state, action) => {
      state.accountSearch = action.payload;
    },
    DeleteAccount: (state: StateType, action) => {
      const index = state.accounts.findIndex(
        (account) => account.Id === action.payload
      );
      state.accounts.splice(index, 1);
    },
  },
});

export const {
  getAccounts,
  setVisibilityFilter,
  SearchAccount,
  DeleteAccount,
} = AccountSlice.actions;

export const fetchAccounts = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getAccounts(response.data));
  } catch (err: any) {
    throw new Error(err);
  }
};

export default AccountSlice.reducer;
