import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../../utils/toast";
import { getProfile } from "../../api/profile";

const Profile = () => {
    const [name, setName] = useState("");
    const [YOB, setYOB] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setFetching(true);
                const data = await getProfile();
                setName(data.name || "");
                setYOB(data.YOB || "");
            } catch (error) {
                showToast("Lấy thông tin hồ sơ thất bại", "error");
                console.error(error);
            } finally {
                setFetching(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            showToast("✅ Cập nhật hồ sơ thành công!", "success");
        }, 2000);
    };

    const handleChangePassword = () => {
        navigate("/change-password");
    };

    if (fetching) {
        return (
            <div className="min-vh-100 d-flex justify-content-center align-items-center">
                <div className="spinner-border" role="status" aria-hidden="true"></div>
                <span className="ms-2">Đang tải thông tin hồ sơ...</span>
            </div>
        );
    }

    return (
        <div className="min-vh-100 bg-light p-6">
            <div className="container-fluid py-5">
                <div className="row">
                    <div className="col-lg-5 col-md-6 col-sm-8">
                        {/* Header Section */}
                        <div style={{ marginBottom: "3rem" }}>
                            <div className="d-flex align-items-center mb-3">
                                <div
                                    className="bg-primary rounded-circle me-3 d-flex align-items-center justify-content-center"
                                    style={{ width: "50px", height: "50px" }}
                                >
                                    {/* ... SVG icon ... */}
                                </div>
                                <div>
                                    <h3 className="mb-1">Thông tin cá nhân</h3>
                                    <p className="text-muted mb-0 small">Cập nhật thông tin hồ sơ</p>
                                </div>
                            </div>
                        </div>

                        {/* Profile Form Section */}
                        <div className="mb-4">
                            {/* Họ và tên */}
                            <div className="mb-5">
                                <label className="form-label fw-semibold text-dark">
                                    {/* SVG icon */}
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nhập họ và tên"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            {/* Năm sinh */}
                            <div className="mb-5">
                                <label className="form-label fw-semibold text-dark">
                                    {/* SVG icon */}
                                    Năm sinh
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={YOB}
                                    onChange={(e) => setYOB(e.target.value)}
                                    placeholder="Nhập năm sinh"
                                    min="1900"
                                    max="2024"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        Đang cập nhật...
                                    </>
                                ) : (
                                    <>
                                        {/* SVG icon */}
                                        Cập nhật thông tin
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Divider */}
                        <hr className="my-5" />

                        {/* Security Section */}
                        <div style={{ marginBottom: "3rem" }}>
                            <h5 className="fw-semibold text-dark mb-2">Cài đặt bảo mật</h5>
                            <p className="text-muted mb-3 small">Quản lý mật khẩu và bảo mật tài khoản</p>

                            <button
                                className="btn btn-outline-secondary"
                                onClick={handleChangePassword}
                                disabled={loading}
                            >
                                {/* SVG icon */}
                                Đổi mật khẩu
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid pt-6 border-top mt-3">
                <div className="d-flex justify-content-center align-items-center">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="me-2 mt-1"
                        style={{ color: '#0d6efd' }}
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <path
                            d="M12 16V12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 8H12.01"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <p
                        className="text-muted mb-0 small"
                        style={{ whiteSpace: "nowrap" }}
                    >
                        Thông tin của bạn được bảo mật và chỉ được sử dụng để cải thiện trải nghiệm dịch vụ.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
