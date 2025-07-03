import { useEffect, useState } from "react";
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

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn chắc chắn muốn xoá đội này?")) return;
        try {
            await deleteTeam(id);
            showToast("🗑️ Đã xoá!", "is-info");
            fetchTeams();
        } catch {
            showToast("Không thể xoá đội", "is-danger");
        }
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
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team, idx) => (
                        <tr key={team._id}>
                            <td>{idx + 1}</td>
                            <td>{team.teamName}</td>
                            <td>
                                <button
                                    className="button is-small is-info mr-2"
                                    onClick={() => handleEditClick(team)}
                                >
                                    ✏️ Sửa
                                </button>
                                <button
                                    className="button is-small is-danger"
                                    onClick={() => handleDelete(team._id)}
                                >
                                    🗑️ Xoá
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Teams;
