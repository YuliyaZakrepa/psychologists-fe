"use client";

import { useEffect } from "react";
import { getCurrentUser } from "@/lib/api/users";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession } from "@/lib/api/auth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    const init = async () => {
      try {
        const isActive = await checkSession();
        if (isActive) {
          const res = await getCurrentUser();
          if (res.data) {
            setUser(res.data);
            return;
          }
        }
        clearUser();
      } catch {
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [setUser, clearUser, setLoading]);

  return <>{children}</>;
}
