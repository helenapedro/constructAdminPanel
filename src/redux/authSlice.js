import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged
} from 'firebase/auth';

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Transform Firebase user
const transformFirebaseUser = (firebaseUser) => {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email,
    role: 'user', 
  };
};

// Thunks for authentication actions
export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return transformFirebaseUser(userCredential.user);
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return transformFirebaseUser(userCredential.user);
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
});

// Slice for authentication state
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to register';
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

// Authentication observer
export const authObserver = (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(transformFirebaseUser(user)));
    } else {
      dispatch(clearUser());
    }
  });
};

export default authSlice.reducer;
