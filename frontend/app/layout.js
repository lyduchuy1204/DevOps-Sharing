import "./globals.css";

export const metadata = {
  title: "DevOpsIntern Monorepo",
  description: "Sample Next.js static frontend for CI/CD demo"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}

