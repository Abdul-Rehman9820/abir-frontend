import { useSession } from 'next-auth/react';

export function useAuth() {
    const { data: session, status } = useSession();

    return {
        session,
        token: session?.accessToken || null,
        isLoading: status === "loading",
        isAuthenticated: status === "authenticated",
    };
}
