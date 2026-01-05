import "./globals.css";

export const metadata = {
  title: "Discover Our Products | Appscrip Task",
  description:
    "SSR product listing page with filters and responsive layout built using Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
