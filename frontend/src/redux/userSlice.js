import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    otherUsers: [],
    selectedUser: null,
    // socket:null,
    onlineUser: null,
    searchData:null
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },

    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    


    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
    },

   
    SetSearchData: (state, action) => {
  state.searchData = action.payload; // ✅
}
  },
});

export const { setUserData, setOtherUsers, setSelectedUser,setOnlineUser,SetSearchData} =
  userSlice.actions;

export default userSlice.reducer;
