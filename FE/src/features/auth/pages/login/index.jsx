import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../../utils/toast";
import { login } from "../../api/auth";

const Login = () => {
    const [form, setForm] = useState({ membername: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(form);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            showToast(data.message || "Đăng nhập thành công!", "is-success");

            if (data.user?.isAdmin) {
                navigate("/admin/accounts");
            } else {
                navigate("/player-list");
            }
        } catch (err) {
            const errorMsg = err?.response?.data?.message || "Đăng nhập thất bại.";
            showToast(errorMsg, "is-danger");
        }
    };

    return (
        <div className="container is-flex is-justify-content-center is-align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card p-5" style={{ maxWidth: "400px", width: "100%" }}>
                <h1 className="title is-4 has-text-centered mb-4">🔐 Đăng nhập</h1>
                <form onSubmit={handleLogin}>
                    <div className="field">
                        <label className="label">Tên đăng nhập</label>
                        <div className="control">
                            <input className="input" name="membername" onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Mật khẩu</label>
                        <div className="control">
                            <input type="password" className="input" name="password" onChange={handleChange} required />
                        </div>
                    </div>

                    <button className="button is-success is-fullwidth mt-4" type="submit">
                        Đăng nhập
                    </button>
                </form>

                <p className="has-text-centered mt-3">
                    Chưa có tài khoản?{" "}
                    <a onClick={() => navigate("/register")} className="has-text-link" style={{ cursor: "pointer" }}>
                        Đăng ký
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
