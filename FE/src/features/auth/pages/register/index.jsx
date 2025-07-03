import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../../utils/toast";
import { register } from "../../api/auth";

const Register = () => {
    const [form, setForm] = useState({
        membername: "",
        password: "",
        name: "",
        YOB: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(form); // gọi BE API
            showToast(`🎉 ${res.message || "Đăng ký thành công!"}`, "is-success");
            navigate("/login");
        } catch (err) {
            const message =
                err?.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại!";
            showToast(`❌ ${message}`, "is-danger");
        }
    };

    return (
        <div
            className="container is-flex is-justify-content-center is-align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="card p-5" style={{ maxWidth: "450px", width: "100%" }}>
                <h1 className="title is-4 has-text-centered mb-4">📝 Đăng ký thành viên</h1>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">Tên đăng nhập</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                name="membername"
                                value={form.membername}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Mật khẩu</label>
                        <div className="control">
                            <input
                                type="password"
                                className="input"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Họ tên</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Năm sinh</label>
                        <div className="control">
                            <input
                                type="number"
                                className="input"
                                name="YOB"
                                value={form.YOB}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button className="button is-primary is-fullwidth mt-4" type="submit">
                        Đăng ký
                    </button>
                </form>

                <p className="has-text-centered mt-3">
                    Đã có tài khoản?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="has-text-link"
                        style={{ cursor: "pointer" }}
                    >
                        Đăng nhập
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
