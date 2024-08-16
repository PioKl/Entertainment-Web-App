import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/base/globals.scss";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
