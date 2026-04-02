import { usePathname } from "next/navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";



const AppLayout = ({ children }) => {
  const pathName = usePathname();
  const isAdmin = pathName.startsWith("/admin")
  return (
    <div className="app-layout">
      {!isAdmin && <Header />}
      <main className="content">{children}</main>
      {!isAdmin && <Footer />}
    </div>
  );
};

export default AppLayout