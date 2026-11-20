"use client";
import css from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className={css.header}>
      <div className={`container ${css.inner}`}>
        <Link href="/" className={css.logo}>
          <span>psychologists.</span>services
        </Link>
        <nav aria-label="Main Navigation" className={css.listNavigation}>
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
            {/* <li>
                <Link
                  href="/catalog"
                  className={css.link}
                  // data-active={pathname?.startsWith("/catalog")}
                >
                  Psychologists
                </Link>
              </li> */}
          </ul>
          <ul className={css.authGroup}>
            <li>
              <Link
                href="/login"
                className={css.linkLogin}
                // data-active={pathname?.startsWith("/catalog")}
              >
                Log in
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className={css.linkRegistretion}
                // data-active={pathname?.startsWith("/catalog")}
              >
                Registration
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
