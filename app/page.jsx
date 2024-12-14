// import Navbar from "@/component/Navbar";
// import InfoBox from "@/components/InfoBox";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/infoBoxes";
import HomeProperties from "@/components/HomeProperties";
import connectDB from "@/config/database";
const HomePage = async () => {
  console.log(process.env.MONGODB_URI);
  await connectDB();
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
      {/* <InfoBox /> */}
    </>
  );
};

export default HomePage;
