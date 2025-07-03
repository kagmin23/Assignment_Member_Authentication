import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../../utils/toast";
import { getTeams } from "../../../admin/api/teams/teams";
import { getPlayers } from "../../api/player";

const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [search, setSearch] = useState("");
    const [teamFilter, setTeamFilter] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPlayers({ name: search, team: teamFilter });
                setPlayers(data || []);
            } catch {
                showToast("❌ Không thể tải danh sách cầu thủ", "is-danger");
            }
        };

        fetchData();
    }, [search, teamFilter]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const data = await getTeams();
                setTeams(data);
            } catch {
                showToast("❌ Không thể tải danh sách đội", "is-danger");
            }
        };

        fetchTeams();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="title is-4 has-text-centered">📋 Danh sách cầu thủ</h1>

            {/* Bộ lọc */}
            <div className="field is-grouped mb-4">
                <div className="control is-expanded">
                    <input
                        className="input"
                        placeholder="Tìm theo tên cầu thủ..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="control">
                    <div className="select">
                        <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)}>
                            <option value="">Tất cả đội</option>
                            {teams.map((team) => (
                                <option key={team._id} value={team._id}>
                                    {team.teamName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Danh sách cầu thủ */}
            <div className="row">
                {players.map((player) => (
                    <div className="col-md-4 mb-4" key={player._id} onClick={() => navigate(`/player/${player._id}`)} style={{ cursor: "pointer" }}
                    >
                        <div className="card h-100 d-flex flex-column">
                            <img
                                src={player.image}
                                className="card-img-top"
                                alt={player.playerName}
                                style={{ objectFit: "cover", height: "200px" }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{player.playerName}</h5>
                                <p className="card-text">Đội: {player.team?.teamName}</p>
                                {player.isCaptain && (
                                    <div className="mt-2">
                                        <span className="badge bg-warning text-dark">Đội trưởng</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayerList;
