import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Country {
  name: string;
  code: string;
}

interface CountryState {
  selectedCountry: Country | null;
}

// Load saved country from localStorage (if available)
const loadFromStorage = (): Country | null => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('selectedCountry');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Failed to load country from storage:", e);
      return null;
    }
  }
  return null;
};

const initialState: CountryState = {
  selectedCountry: loadFromStorage(),
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<Country>) => {
      state.selectedCountry = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedCountry', JSON.stringify(action.payload));
      }
    },
  },
});

export const { setCountry } = countrySlice.actions;
export const countryReducer = countrySlice.reducer;
