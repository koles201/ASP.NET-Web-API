import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route element={<NavBar />}>
          <Route path="activities" element={<ActivityDashboard />} />
          <Route path="activities/:id" element={<ActivityDetails />} />
          {["createActivity", "manage/:id"].map((path, i) => (
            <Route key={i} path={path} element={<ActivityForm key={i} />} />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default observer(App);
