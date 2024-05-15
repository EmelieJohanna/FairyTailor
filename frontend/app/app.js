"use client";

import { AuthProvider } from "./contexts/AuthContext";

export function App({ children }) {
  return (
    <AuthProvider>
      {" "}
      <div className="min-h-screen bg-[#ddffe6] m-0 flex flex-col justify-center items-center">
        {children}
      </div>
    </AuthProvider>
  );
}

export default ({ children }) => <App>{children}</App>;
