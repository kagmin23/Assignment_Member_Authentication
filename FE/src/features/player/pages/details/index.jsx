import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "../../../../utils/toast";
import { getPlayerDetail, sendFeedback } from "../../api/player";

const PlayerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [player, setPlayer] = useState(null);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1);

    const fetchPlayer = async () => {
        try {
            const data = await getPlayerDetail(id);
            setPlayer(data);
        } catch {
            showToast("Không thể tải thông tin cầu thủ", "danger");
        }
    };

    useEffect(() => {
        fetchPlayer();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendFeedback(id, { rating, content: comment });
            showToast("✅ Gửi nhận xét thành công", "success");
            setComment("");
            setRating(1);
            fetchPlayer(); // cập nhật lại sau khi gửi
        } catch (err) {
            showToast(err?.response?.data?.message || "❌ Không thể gửi nhận xét", "danger");
        }
    };

    if (!player) return <div className="text-center mt-5">Đang tải dữ liệu...</div>;

    return (
        <div className="container mb-5 mt-5">
            <button
                className="btn btn-outline-secondary mb-6"
                onClick={() => navigate(-1)}
            >
                &larr; Quay lại
            </button>

            <h1 className="mb-4 text-center fw-bold fs-3">
                Chi tiết cầu thủ: <span className="text-danger">{player.playerName}</span>
            </h1>

            <div className="row align-items-stretch">
                {/* Left: Info */}
                <div className="col-md-6 mb-4 d-flex">
                    <div className="card shadow-sm w-100 h-100">
                        <img
                            src={player.image}
                            className="card-img-top img-fluid"
                            alt={player.playerName}
                            style={{ objectFit: "cover", maxHeight: "500px" }}
                        />
                        <div className="card-body">
                            <h5 className="card-title fw-bold">{player.playerName}</h5>
                            <p className="card-text">
                                <strong>Thông tin:</strong> {player.infomation || "Không có"}
                            </p>
                            <p className="card-text">
                                <strong>Đội bóng:</strong> {player.team?.teamName || "Chưa rõ"}
                            </p>
                            <p className="card-text">
                                <strong>Đội trưởng:</strong>{" "}
                                {player.isCaptain ? (
                                    <span className="badge bg-warning text-dark">Đội trưởng</span>
                                ) : (
                                    <span className="badge bg-secondary">Không</span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Feedback form */}
                <div className="col-md-6 mb-4 d-flex">
                    <div className="card shadow-sm w-100 h-100">
                        <div className="card-body">
                            <h5 className="card-title">Gửi đánh giá</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nội dung nhận xét</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Số sao (1 - 3)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        min="1"
                                        max="3"
                                        value={rating}
                                        onChange={(e) => setRating(Number(e.target.value))}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Gửi đánh giá
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Danh sách nhận xét */}
            {player.comments?.length > 0 && (
                <div className="mt-5">
                    <h5 className="fw-bold mb-3">📋 Nhận xét trước đó</h5>
                    <ul className="list-group">
                        {player.comments.map((comment) => (
                            <li key={comment._id} className="list-group-item">
                                <div className="d-flex justify-content-between align-items-center">
                                    <strong>{comment.rating} ⭐</strong>
                                    <small className="text-muted">
                                        {new Date(comment.createdAt).toLocaleDateString("vi-VN")}
                                    </small>
                                </div>
                                <div className="mt-1">{comment.content}</div>
                                <div className="mt-1 text-end">
                                    <span className="text-muted" style={{ fontSize: "0.85rem" }}>
                                        — {comment.author?.name || comment.author?.membername || "Ẩn danh"}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PlayerDetail;
