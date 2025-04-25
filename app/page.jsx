// import Navbar from "@/component/Navbar";
// import InfoBox from "@/components/InfoBox";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/infoBoxes";
import HomeProperties from "@/components/HomeProperties";
import connectDB from "@/config/database";
import FeaturedProperties from "@/components/FeaturedProperties";

const HomePage = async () => {
  console.log(process.env.MONGODB_URI)
  await connectDB();
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties/>
      <HomeProperties />
      {/* <InfoBox /> */}
    </>
  );
};

export default HomePage;
