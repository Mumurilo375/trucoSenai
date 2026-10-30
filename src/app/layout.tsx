import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Truco Paulista — A mesa está aberta",
  description: "Truco Paulista online para jogar com seu parceiro.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
