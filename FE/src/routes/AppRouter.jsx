import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { Navbar } from "../components";
import {
    Accounts,
    AdminLayout,
    ChangePassword,
    Login,
    Player,
    PlayerDetail,
    PlayerList,
    Profile,
    Register,
    Teams,
} from "../features";
import { AdminRoute, MemberRoute } from "./ProtectedRouter";

function LayoutWrapper() {
    const location = useLocation();

    // Kiểm tra nếu là route không cần navbar
    const hideNavbar =
        location.pathname.startsWith("/login") ||
        location.pathname.startsWith("/register") ||
        location.pathname.startsWith("/admin");

    return (
        <>
            {!hideNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Member routes */}
                <Route
                    path="/player-list"
                    element={
                        <MemberRoute>
                            <PlayerList />
                        </MemberRoute>
                    }
                />
                <Route
                    path="/player/:id"
                    element={
                        <MemberRoute>
                            <PlayerDetail />
                        </MemberRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <MemberRoute>
                            <Profile />
                        </MemberRoute>
                    }
                />
                <Route
                    path="/change-password"
                    element={
                        <MemberRoute>
                            <ChangePassword />
                        </MemberRoute>
                    }
                />

                {/* Admin layout */}
                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminLayout />
                        </AdminRoute>
                    }
                >
                    <Route path="accounts" element={<Accounts />} />
                    <Route path="teams" element={<Teams />} />
                    <Route path="players" element={<Player />} />
                </Route>
            </Routes>
        </>
    );
}

export default function AppRouter() {
    return (
        <Router>
            <LayoutWrapper />
        </Router>
    );
}
