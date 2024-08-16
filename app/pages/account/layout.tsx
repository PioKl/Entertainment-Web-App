import "../../styles/base/globals.scss";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
