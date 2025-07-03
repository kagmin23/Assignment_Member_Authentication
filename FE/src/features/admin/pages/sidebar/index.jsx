import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) =>
        location.pathname === path ? "is-active has-text-primary fw-bold" : "";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <aside className="menu p-3 d-flex flex-column justify-content-between" style={{ minHeight: "100vh" }}>
            <div>
                <p className="menu-label text-uppercase">Quản trị</p>
                <ul className="menu-list">
                    <li>
                        <Link to="/admin/accounts" className={isActive("/admin/accounts")}>
                            👥 Quản lý tài khoản
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/teams" className={isActive("/admin/teams")}>
                            ⚽ Quản lý đội bóng
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/players" className={isActive("/admin/players")}>
                            🧑‍🎯 Quản lý cầu thủ
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="mt-auto">
                <button className="button is-danger is-fullwidth mt-5" onClick={handleLogout}>
                    🚪 Đăng xuất
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
