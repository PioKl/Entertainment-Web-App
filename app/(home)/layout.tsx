import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/base/globals.scss";
import styles from "../styles/layouts/homeLayout.module.scss";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={styles.home}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
