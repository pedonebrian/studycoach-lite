// lib/store.ts
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

type SessionState = { theme: "system" | "light" | "dark"; flags: Record<string, boolean> };
const initialState: SessionState = { theme: "system", flags: { aiHints: true } };

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setTheme: (s, a: PayloadAction<SessionState["theme"]>) => { s.theme = a.payload; },
    setFlag: (s, a: PayloadAction<{ key: string; value: boolean }>) => { s.flags[a.payload.key] = a.payload.value; }
  }
});

export const { setTheme, setFlag } = sessionSlice.actions;

export const store = configureStore({ reducer: { session: sessionSlice.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;