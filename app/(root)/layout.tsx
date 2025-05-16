export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {/* Header */}
      {children}
      {/* Footer */}
    </main>
  );
}
