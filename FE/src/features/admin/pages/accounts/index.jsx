import { useEffect, useState } from "react";
import { showToast } from "../../../../utils/toast";
import { getAccounts } from "../../api/accounts/accounts";

const Accounts = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const data = await getAccounts();
                setMembers(data);
            } catch {
                showToast("Không thể tải danh sách tài khoản", "is-danger");
            }
        };

        fetchAccounts();
    }, []);

    return (
        <div className="container">
            <h2 className="title is-4">👥 Danh sách Thành viên</h2>
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tài khoản</th>
                        <th>Họ tên</th>
                        <th>Năm sinh</th>
                        <th>Admin?</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((m, i) => (
                        <tr key={m._id}>
                            <td>{i + 1}</td>
                            <td>{m.membername}</td>
                            <td>{m.name}</td>
                            <td>{m.YOB}</td>
                            <td>{m.isAdmin ? "✅" : "❌"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Accounts;
