import connectDB from "@/config/database";
import Property from "@/models/Property";

//Get /api/property/
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    
    const property = await Property.findById(params.id);
    if(!property) return new Response('Property Not Found!',{ status:404 }); 
    return new Response(JSON.stringify(property), {
      status: 200,
    //   headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
