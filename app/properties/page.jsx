// import properties from "@/properties.json";
import PropertySearchForm from "@/components/PropertySearchForm";
// import { fetchProperties } from "@/utils/requests";
import Properties from "@/components/Properties";

const PropertiesPage = async () => {
  // const properties = await fetchProperties();
  // //sort properties by date
  // properties.sort((a, b) => new Date(b.ctreatedAt) - new Date(a.ctreatedAt));

  return (
    <>
        <section className="bg-blue-700 py-4">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-star sm:px-6 lg:px-8">
                <PropertySearchForm/>
            </div>
        </section>
      <Properties/>
    </>
  );
};
export default PropertiesPage;
