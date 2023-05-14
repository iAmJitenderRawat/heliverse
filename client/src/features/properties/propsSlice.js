import { createSlice } from "@reduxjs/toolkit";

export const propsSlice = createSlice({
  name: "getProps",
  initialState: {
    domains: "",
    genders: "",
    availables: "",
    search: "",
  },
  reducers: {
    setDomains: (state, action) => {
      state.domains = action.payload;
    },
    setGenders: (state, action) => {
      state.genders = action.payload;
    },
    setAvailables: (state, action) => {
      state.availables = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setDomains, setGenders, setAvailables, setSearch } =
  propsSlice.actions;

export default propsSlice.reducer;
