import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";
import { AuthRoute } from "./routes/authentication/AuthRoutes";
import { AppRoute } from "./routes/app/AppRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/auth/login"} />}>
      </Route>
      <Route path="/" element={<DashboardLayout />}>
        {AppRoute?.map((Link, i) => (
          <Route path={Link.url} key={i} element={Link.page} />
        ))}
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        {AuthRoute?.map((Link, i) => (
          <Route path={Link.url} key={i} element={Link.page} />
        ))}
      </Route>

      <Route
        path="*"
        element={<div className="text-7xl">Page Not Found</div>}
      />
    </Routes>
  );
}

export default App;
