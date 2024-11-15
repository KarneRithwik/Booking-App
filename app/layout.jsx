import Navbar from "@/components/Navbar";
import "@/assets/styles/globals.css";
import Footer from "@/components/footer";
// import Sample from "@/components/Sample";
export const metadata = {
  title: "Booking.com",
  description: "Find Rental Properties",
  keywords: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {/* <Sample /> */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
