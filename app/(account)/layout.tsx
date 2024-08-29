import Link from "next/link";
import "../styles/base/globals.scss";
import styles from "../styles/layouts/accountLayout.module.scss";
import LogoIcon from "../images/logo.svg";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={`${styles.account} wrapper`}>
        <header className={styles.header}>
          <nav>
            <Link href="/">
              <LogoIcon />
            </Link>
          </nav>
        </header>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}
