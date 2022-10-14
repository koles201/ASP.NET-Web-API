import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route element={<NavBar />}>
          <Route path="activities" element={<ActivityDashboard />} />
          <Route path="activities/:id" element={<ActivityDetails />} />
          {["createActivity", "manage/:id"].map((path, i) => (
            <Route key={i} path={path} element={<ActivityForm key={i} />} />
          ))}
          <Route path="/errors" element={<TestErrors />}></Route>
          <Route path="/server-error" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default observer(App);
