import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const AdminLayout = () => {
  return (
    <div className="columns is-gapless" style={{ minHeight: "100vh" }}>
      <div className="column is-2 has-background-light">
        <Sidebar />
      </div>
      <div className="column is-10">
        <Navbar />
        <section className="section">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default AdminLayout;
