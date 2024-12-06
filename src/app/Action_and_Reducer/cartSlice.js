import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:4000/api/cart';



// Async thunk for fetching cart items
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (User_Id = 100) => {
  const response = await fetch(`${API_URL}?User_Id=${User_Id}`);
  if (!response.ok) throw new Error('Failed to fetch cart items');
  const data = await response.json();
  return data;
});

// Async thunk for adding item to cart
export const addItemToCart = createAsyncThunk('cart/addItemToCart', async (item, { rejectWithValue }) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      // Handle specific case if the item is already in the cart (example logic)
      const data = await response.json();
      if (data.message === "already") {
        return rejectWithValue('already');
      }
      throw new Error('Failed to add item to cart');
    }

    alert('added');

    const data = await response.json();
    return { item, message: data.message };

  } catch (error) {
    return rejectWithValue(error.message);
  }
});


// Async thunk for removing item from cart
export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async ({ User_Id, Product_ID, Product_Type }) => {
  const response = await fetch(API_URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ User_Id, Product_ID, Product_Type }),
  });
  if (!response.ok) throw new Error('Failed to remove item from cart');
  return { User_Id, Product_ID, Product_Type };
});

// Async thunk for clearing the cart
export const clearCartItems = createAsyncThunk('cart/clearCartItems', async (userId) => {
  const response = await fetch(`${API_URL}/clear`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  if (!response.ok) throw new Error('Failed to clear cart');
  return userId;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    message :'',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchCartItems
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

       // Handle addItemToCart
       .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload.item);
        state.message = action.payload.message; // Store the success message
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        // Check for specific rejection cases
        if (action.payload === 'already') {
          state.message = 'This item is already in your cart'; // Custom message for already in cart
        } else {
          state.error = action.error.message || 'Failed to add item to cart'; // Store generic error message
        }
      })
  

      // Handle removeItemFromCart
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        // state.items = state.items.filter((item) => item.Product_ID !== action.payload);
        // state.items = state.items.filter(
        //   (item) => item.Product_ID !== action.payload.Product_ID && item.Product_Type !== action.payload.Product_Type
        // );
        state.items = state.items.filter(
          (item) =>
            item.User_Id !== action.payload.User_Id || 
            item.Product_ID !== action.payload.Product_ID || 
            item.Product_Type !== action.payload.Product_Type
        );
        state.message = 'Item removed from cart';
      })

      // Handle clearCartItems
      .addCase(clearCartItems.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
