"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/authStore";
import Icon from "../Icon/Icon";
import css from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, clearUser } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      clearUser();
      router.push("/");
    }
  };

  return (
    <header className={css.header}>
      <div className={`container ${css.inner}`}>
        <Link href="/" className={css.logo}>
          <span>psychologists.</span>services
        </Link>
        <nav
          aria-label="Main Navigation"
          className={`${css.listNavigation} ${!isAuthenticated ? css.listNavigationGuest : ""}`}
        >
          <ul className={css.navGroup}>
            <li>
              <Link
                href="/"
                className={css.link}
                // data-active={pathname === "/"}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/psychologists"
                className={css.link}
                data-active={pathname?.startsWith("/psychologists")}
              >
                Psychologists
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link
                  href="/favorites"
                  className={css.link}
                  data-active={pathname?.startsWith("/favorites")}
                >
                  Favorites
                </Link>
              </li>
            )}
          </ul>

          {!isLoading && (
            <ul
              className={`${css.authGroup} ${!isAuthenticated ? css.authGroupGuest : ""}`}
            >
              {isAuthenticated && user ? (
                <>
                  <li className={css.user}>
                    <span className={css.avatar}>
                      <Icon name="icon-user" size={24} />
                    </span>
                    <span className={css.userName}>{user.name}</span>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={css.linkLogout}
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" className={css.linkLogin}>
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className={css.linkRegistretion}>
                      Registration
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}
