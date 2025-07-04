import { useEffect, useRef, useState } from "react";
import { showToast } from "../../../../utils/toast";
import {
    addPlayer,
    deletePlayer,
    getPlayers,
    updatePlayer,
} from "../../api/players/players";
import { getTeams } from "../../api/teams/teams";

const Player = () => {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [newPlayer, setNewPlayer] = useState({
        playerName: "",
        image: "",
        teamId: "",
        isCaptain: false,
    });

    const [playerToDelete, setPlayerToDelete] = useState(null); // lưu player sắp bị xoá
    const modalRef = useRef(null);

    const fetchPlayers = async () => {
        try {
            const data = await getPlayers();
            setPlayers(data);
        } catch {
            showToast("Không thể tải cầu thủ", "is-danger");
        }
    };

    const fetchTeams = async () => {
        try {
            const data = await getTeams();
            setTeams(data);
        } catch {
            showToast("Không thể tải đội", "is-danger");
        }
    };

    const handleSave = async () => {
        if (!newPlayer.playerName || !newPlayer.teamId) {
            return showToast("Vui lòng nhập đủ thông tin!", "is-warning");
        }

        try {
            if (editingId) {
                await updatePlayer(editingId, {
                    playerName: newPlayer.playerName,
                    image: newPlayer.image,
                    team: newPlayer.teamId,
                    isCaptain: newPlayer.isCaptain,
                });
                showToast("✅ Cập nhật thành công!", "is-success");
            } else {
                await addPlayer({
                    playerName: newPlayer.playerName,
                    image: newPlayer.image,
                    teamId: newPlayer.teamId,
                    isCaptain: newPlayer.isCaptain,
                });
                showToast("✅ Thêm cầu thủ thành công!", "is-success");
            }

            setNewPlayer({ playerName: "", image: "", teamId: "", isCaptain: false });
            setEditingId(null);
            fetchPlayers();
        } catch {
            showToast("❌ Lưu cầu thủ thất bại", "is-danger");
        }
    };

    const confirmDelete = (player) => {
        setPlayerToDelete(player);
        modalRef.current.classList.add("is-active");
    };

    const handleDeleteConfirmed = async () => {
        try {
            await deletePlayer(playerToDelete._id);
            showToast("🗑️ Đã xoá!", "is-info");
            fetchPlayers();
        } catch {
            showToast("Không thể xoá cầu thủ", "is-danger");
        } finally {
            closeModal();
        }
    };

    const closeModal = () => {
        modalRef.current.classList.remove("is-active");
        setPlayerToDelete(null);
    };

    const handleEdit = (player) => {
        setEditingId(player._id);
        setNewPlayer({
            playerName: player.playerName,
            image: player.image,
            teamId: player.team?._id || player.team,
            isCaptain: player.isCaptain,
        });
    };

    const handleCancel = () => {
        setNewPlayer({ playerName: "", image: "", teamId: "", isCaptain: false });
        setEditingId(null);
    };

    useEffect(() => {
        fetchPlayers();
        fetchTeams();
    }, []);

    return (
        <div className="container">
            <h2 className="title is-4">⚽ Quản lý Cầu thủ</h2>

            {/* Form Thêm/Sửa */}
            <div className="box">
                <div className="field">
                    <label className="label">Tên cầu thủ</label>
                    <input
                        className="input"
                        value={newPlayer.playerName}
                        onChange={(e) => setNewPlayer({ ...newPlayer, playerName: e.target.value })}
                    />
                </div>
                <div className="field">
                    <label className="label">Ảnh (URL)</label>
                    <input
                        className="input"
                        value={newPlayer.image}
                        onChange={(e) => setNewPlayer({ ...newPlayer, image: e.target.value })}
                    />
                </div>
                <div className="field">
                    <label className="label">Đội bóng</label>
                    <div className="select is-fullwidth">
                        <select
                            value={newPlayer.teamId}
                            onChange={(e) => setNewPlayer({ ...newPlayer, teamId: e.target.value })}
                        >
                            <option value="">-- Chọn đội --</option>
                            {teams.map((team) => (
                                <option key={team._id} value={team._id}>
                                    {team.teamName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="field">
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            checked={newPlayer.isCaptain}
                            onChange={(e) => setNewPlayer({ ...newPlayer, isCaptain: e.target.checked })}
                        />{" "}
                        Là đội trưởng?
                    </label>
                </div>
                <div className="buttons mt-2">
                    <button className="button is-link" onClick={handleSave}>
                        {editingId ? "💾 Cập nhật" : "➕ Thêm cầu thủ"}
                    </button>
                    {editingId && (
                        <button className="button is-light" onClick={handleCancel}>
                            ❌ Huỷ
                        </button>
                    )}
                </div>
            </div>

            {/* Danh sách */}
            <table className="table is-fullwidth is-striped">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Hình ảnh</th>
                        <th>Tên</th>
                        <th>Đội</th>
                        <th className="has-text-right" style={{ paddingLeft: "3rem" }}>Đội trưởng</th>
                        <th className="has-text-right" style={{ paddingRight: "2.4rem" }}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((p, i) => (
                        <tr key={p._id}>
                            <td>{i + 1}</td>
                            <td>
                                <img src={p.image} width="50" alt={p.playerName} />
                            </td>
                            <td>{p.playerName}</td>
                            <td>{p.team?.teamName}</td>
                            <td className="has-text-right">{p.isCaptain ? "✅" : "❌"}</td>
                            <td className="has-text-right">
                                <div className="buttons is-right">
                                    <button className="button is-small is-info" onClick={() => handleEdit(p)}>
                                        ✏️ Sửa
                                    </button>
                                    <button className="button is-small is-danger" onClick={() => confirmDelete(p)}>
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
                        Bạn có chắc muốn xoá cầu thủ{" "}
                        <strong>{playerToDelete?.playerName}</strong> không?
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

export default Player;
