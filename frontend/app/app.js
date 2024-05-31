"use client";

import { AuthProvider } from "./contexts/AuthContext";
import { StoryProvider } from "./contexts/StoryContext";

export function App({ children }) {
  return (
    <AuthProvider>
      <StoryProvider>
        <div className="min-h-screen bg-[#e6fef7] m-0 flex flex-col justify-center items-center">
          {children}
        </div>
      </StoryProvider>
    </AuthProvider>
  );
}

export default ({ children }) => <App>{children}</App>;
