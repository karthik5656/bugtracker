import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//Get all projects action
export const getAllProjects = createAsyncThunk("getProjects", async (args, {rejectWithValue }) => {
  try{
  const response = await fetch('https://bugtrackerprojects.azurewebsites.net/api/project/getallprojects');
  const result= await response.json();
  return result;
  }catch(err){
    return rejectWithValue("Found an error!",err.response.data)
  }
})

//Add new Project
export const addNewProject =createAsyncThunk("addProject",async(data,{rejectWithValue})=>{
  try{
  const response=await fetch('https://bugtrackerprojects.azurewebsites.net/api/project/addproject',{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode:'cors',
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}catch(err){
  return rejectWithValue("Found an error!",err.response.data)
}
}); 

export const Projects = createSlice({ 
  name:'projects',
  initialState: {      
    data: [], 
    loading: false,
    error: null, 
  }, 
  reducers: {},  
  extraReducers: {
    [getAllProjects.pending]: (state) => {
      state.loading = true;
    },
    [getAllProjects.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getAllProjects.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addNewProject.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action",action);
      state.data.push(action.meta.arg);
    },
  },

});
export default Projects.reducer;