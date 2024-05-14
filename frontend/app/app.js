"use client";

import { AuthProvider } from "./contexts/AuthContext";

export function App({ children }) {
  return <AuthProvider><div className="max-w-[1200px] flex-col m-auto mb-10">{children}</div></AuthProvider>;
}

export default ({ children }) => <App>{children}</App>;
