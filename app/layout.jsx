import Navbar from "@/components/Navbar";
import "@/assets/styles/globals.css";
import Footer from "@/components/footer";
import AuthProvider from "@/components/AuthProvider";
// import Sample from "@/components/Sample";
import { GlobalProvider } from "@/context/GlobalContext";
import { ToastContainer } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css"

export const metadata = {
  title: "Booking.com",
  description: "Find Rental Properties",
  keywords: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
  <GlobalProvider>
    <AuthProvider>
    <html lang="en">
      <body>
        <Navbar />
        {/* <Sample /> */}
        <main>{children}</main>
        <Footer />
        <ToastContainer/>
      </body>
    </html>
    </AuthProvider>
  </GlobalProvider>
  );
};

export default MainLayout;
