import { useEffect, useRef, useState } from "react";
import { showToast } from "../../../../utils/toast";
import {
    addTeam,
    deleteTeam,
    getTeams,
    updateTeam,
} from "../../api/teams/teams";

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [teamName, setTeamName] = useState("");
    const [editingTeamId, setEditingTeamId] = useState(null);
    const [teamToDelete, setTeamToDelete] = useState(null);

    const modalRef = useRef(null);

    const fetchTeams = async () => {
        try {
            const data = await getTeams();
            setTeams(data);
        } catch {
            showToast("Không thể tải danh sách đội", "is-danger");
        }
    };

    const handleSave = async () => {
        if (!teamName) return showToast("Vui lòng nhập tên đội!", "is-warning");

        try {
            if (editingTeamId) {
                await updateTeam(editingTeamId, { teamName });
                showToast("✅ Cập nhật thành công!", "is-success");
            } else {
                await addTeam({ teamName });
                showToast("✅ Thêm đội thành công!", "is-success");
            }
            setTeamName("");
            setEditingTeamId(null);
            fetchTeams();
        } catch {
            showToast("❌ Lưu thất bại", "is-danger");
        }
    };

    const confirmDelete = (team) => {
        setTeamToDelete(team);
        modalRef.current.classList.add("is-active");
    };

    const handleDeleteConfirmed = async () => {
        try {
            await deleteTeam(teamToDelete._id);
            showToast("🗑️ Đã xoá!", "is-info");
            fetchTeams();
        } catch {
            showToast("Không thể xoá đội", "is-danger");
        } finally {
            closeModal();
        }
    };

    const closeModal = () => {
        modalRef.current.classList.remove("is-active");
        setTeamToDelete(null);
    };

    const handleEditClick = (team) => {
        setTeamName(team.teamName);
        setEditingTeamId(team._id);
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <div className="container">
            <h2 className="title is-4">🏆 Quản lý Đội bóng</h2>

            {/* Form thêm/sửa đội */}
            <div className="field has-addons mb-4">
                <div className="control is-expanded">
                    <input
                        className="input"
                        placeholder="Nhập tên đội..."
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                </div>
                <div className="control">
                    <button className="button is-primary" onClick={handleSave}>
                        💾 {editingTeamId ? "Lưu" : "Thêm"}
                    </button>
                </div>
                {editingTeamId && (
                    <div className="control">
                        <button
                            className="button is-light"
                            onClick={() => {
                                setTeamName("");
                                setEditingTeamId(null);
                            }}
                        >
                            ❌ Huỷ
                        </button>
                    </div>
                )}
            </div>

            {/* Danh sách đội */}
            <table className="table is-fullwidth is-striped">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên đội</th>
                        <th className="has-text-right" style={{ paddingRight: "2.4rem" }}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team, idx) => (
                        <tr key={team._id}>
                            <td>{idx + 1}</td>
                            <td>{team.teamName}</td>
                            <td className="has-text-right">
                                <div className="buttons is-right">
                                    <button
                                        className="button is-small is-info"
                                        onClick={() => handleEditClick(team)}
                                    >
                                        ✏️ Sửa
                                    </button>
                                    <button
                                        className="button is-small is-danger"
                                        onClick={() => confirmDelete(team)}
                                    >
                                        🗑️ Xoá
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal xác nhận xoá */}
            <div className="modal" ref={modalRef}>
                <div className="modal-background" onClick={closeModal}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Xác nhận xoá</p>
                        <button className="delete" aria-label="close" onClick={closeModal}></button>
                    </header>
                    <section className="modal-card-body">
                        Bạn có chắc muốn xoá đội{" "}
                        <strong>{teamToDelete?.teamName}</strong> không?
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-danger mr-3" onClick={handleDeleteConfirmed}>
                            Xác nhận
                        </button>
                        <button className="button" onClick={closeModal}>
                            Huỷ
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Teams;
