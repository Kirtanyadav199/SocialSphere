import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { getMe } from "../../features/auth/services/auth.api";

const ProtectedRoute = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        async function verifyUser() {

            try {

                await getMe();

                setAuthenticated(true);

            } catch (err) {

                setAuthenticated(false);

            } finally {

                setLoading(false);

            }
        }

        verifyUser();

    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;