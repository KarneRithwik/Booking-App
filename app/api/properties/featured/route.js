import connectDB from "@/config/database";
import Property from "@/models/Property";

//Get /api/properties/featured/
export const GET = async (request) => {
    try {
        await connectDB(); // Ensure database connection
        const properties = await Property.find({
            is_featured: true,
        });

        return new Response(JSON.stringify(properties), {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching properties:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};