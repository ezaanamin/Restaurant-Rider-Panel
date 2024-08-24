import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const LoginRider = createAsyncThunk(
  'post/postRequest',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`BASE_URL/riders/login`, data);
      console.log("Response:", response);
      return response.data;
    } catch (error) {
      if (!error.response) {
        // Network error or other non-HTTP error occurred
        throw error;
      }
      
      // Handle HTTP errors (e.g., 4xx, 5xx)
      return rejectWithValue(error.response.data);
    }
  }
);
export const RiderInformation = createAsyncThunk(
  'post/RiderInformation',
  async ({ rejectWithValue, token }) => {
    try {
      const response = await axios.post(`BASE_URL/riders/information`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        // Network error or other non-HTTP error occurred
        throw error;
      }
      
      // Handle HTTP errors (e.g., 4xx, 5xx)
      return rejectWithValue(error.response.data);
    }
  }
);

export const NewOrdersDisplay = createAsyncThunk(
  'post/NewOrdersDisplay',
  async ({ rejectWithValue, token }) => {
    try {
      const response = await axios.post(`BASE_URL/new_orders`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        // Network error or other non-HTTP error occurred
        throw error;
      }
      
      // Handle HTTP errors (e.g., 4xx, 5xx)
      return rejectWithValue(error.response.data);
    }
  }
);

export const UpdateOrders = createAsyncThunk(
  'post/UpdateOrders',
  async ({ rejectWithValue, token, status,order_number }) => {
    // console.log(token,status,order_number);

    try {
      const response = await axios.post(`BASE_URL/riders/update`, {status:status,order_number:order_number}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        // Network error or other non-HTTP error occurred
        throw error;
      }
      
      // Handle HTTP errors (e.g., 4xx, 5xx)
      return rejectWithValue(error.response.data);
    }
  }
);

export const RiderReviewData = createAsyncThunk(
  'post/RiderReviewData',
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`BASE_URL/riders/review`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        // Network error or other non-HTTP error occurred
        throw error;
      }
      
      // Handle HTTP errors (e.g., 4xx, 5xx)
      return rejectWithValue(error.response.data);
    }
  }
);


export const RiderReviewCustomers = createAsyncThunk(
  'post/RiderReviewCustomers',
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`BASE_URL/riders/customers/rider/review`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        // Network error or other non-HTTP error occurred
        throw error;
      }
      
      // Handle HTTP errors (e.g., 4xx, 5xx)
      return rejectWithValue(error.response.data);
    }
  }
);

export const GetAllCustomersRiderReview = createAsyncThunk(
  'post/GetAllCustomersRiderReview',
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`BASE_URL/riders/customers/review`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        // Network error or other non-HTTP error occurred
        throw error;
      }
      
      // Handle HTTP errors (e.g., 4xx, 5xx)
      return rejectWithValue(error.response.data);
    }
  }
);



export const APISlice = createSlice({
  name: 'API',
  initialState: { data: [], error: null, status: 'idle', verifiedStatus: null }, // Fixed typo in "verfiedStatus" to "verifiedStatus"
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginRider.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LoginRider.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(LoginRider.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      builder
      .addCase(RiderInformation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(RiderInformation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(RiderInformation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      builder
      .addCase(NewOrdersDisplay.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(NewOrdersDisplay.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(NewOrdersDisplay.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      builder
      .addCase(UpdateOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(UpdateOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
      builder
      .addCase(RiderReviewData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(RiderReviewData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(RiderReviewData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
      builder
      .addCase(RiderReviewCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(RiderReviewCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(RiderReviewCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default APISlice.reducer;
