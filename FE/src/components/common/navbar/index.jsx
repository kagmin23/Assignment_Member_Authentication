import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const modalRef = useRef(null);
    const navigate = useNavigate();

    const handleLogoutConfirm = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        window.location.href = "/login";
    };

    const showModal = () => {
        if (modalRef.current) {
            const modal = new window.bootstrap.Modal(modalRef.current);
            modal.show();
        }
    };

    const handleHome = () => {
        navigate("/player-list");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <span className="navbar-brand" style={{ cursor: "pointer" }} onClick={handleHome}>
                        ⚽ Player Soccer
                    </span>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <span
                                    className="nav-link"
                                    onClick={() => navigate("/profile")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Hồ sơ
                                </span>
                            </li>
                            <li className="nav-item">
                                <span
                                    className="nav-link text-danger ms-3"
                                    onClick={showModal}
                                    style={{ cursor: "pointer" }}
                                >
                                    Đăng xuất
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div
                className="modal fade"
                ref={modalRef}
                id="logoutModal"
                tabIndex="-1"
                aria-labelledby="logoutModalLabel"
                aria-hidden="true"
                style={{ zIndex: 9999 }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="logoutModalLabel">
                                Xác nhận đăng xuất
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Bạn có chắc chắn muốn đăng xuất không?
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Hủy
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleLogoutConfirm}
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
