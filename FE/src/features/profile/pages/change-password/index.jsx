import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../../utils/toast";
import { changePassword } from "../../api/profile";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await changePassword({ oldPassword, newPassword });
            showToast("✅ Đổi mật khẩu thành công", "success");
            setOldPassword("");
            setNewPassword("");
            navigate("/profile");
        } catch (err) {
            showToast(err?.response?.data?.message || "❌ Đổi mật khẩu thất bại", "danger");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 bg-light p-5">
            <div className="container-fluid py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7 col-sm-9">
                        {/* Back button */}
                        <button
                            className="btn btn-outline-secondary mb-6"
                            onClick={() => navigate(-1)}
                        >
                            &larr; Quay lại
                        </button>

                        {/* Header */}
                        <div style={{ marginBottom: "3rem" }}>
                            <h3 className="mb-1">Đổi mật khẩu</h3>
                            <p className="text-muted mb-0 small">Bảo vệ tài khoản của bạn bằng mật khẩu mới</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="oldPassword" className="form-label fw-semibold text-dark">
                                    Mật khẩu cũ
                                </label>
                                <input
                                    id="oldPassword"
                                    type="password"
                                    className="form-control"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                    placeholder="Nhập mật khẩu cũ"
                                />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="newPassword" className="form-label fw-semibold text-dark">
                                    Mật khẩu mới
                                </label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                    placeholder="Nhập mật khẩu mới"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        Đang xử lý...
                                    </>
                                ) : (
                                    "Đổi mật khẩu"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
