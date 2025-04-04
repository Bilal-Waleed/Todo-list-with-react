import "./globals.css";

export const metadata = {
  title: "My Todo App",
  description: "A simple and smart todo app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
