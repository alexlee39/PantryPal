import { AuthProvider } from "@/lib/actions/AuthContext";
import { geist } from "@/style/fonts";
import Footer from "@/ui/footer";
import "@/ui/global.css";
import Navbar from "@/ui/navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`} >
        <AuthProvider>
          <Navbar/>
          {children}
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}