import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.scss";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AuthProvider2 } from "./context/AuthContext2.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <AuthProvider2>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
      </AuthProvider2>
    </AuthProvider>
  </BrowserRouter>
);
