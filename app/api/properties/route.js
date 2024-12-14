import connectDB from "@/config/database";
import Property from "@/models/Property";

//Get /api/properties/
export const GET = async (request) => {
  try {
    await connectDB(); // Ensure database connection
    const properties = await Property.find({}); // Fetch all properties
    return new Response(JSON.stringify(properties), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
