import connectDB from "@/config/database";
import Property from "@/models/Property";

//GET /api/properties/user/userId
export const GET = async (request, context) => {
    try {
        await connectDB(); // Ensure database connection

        // const userId =params.userId;
        const params = await context.params; // Await params before accessing

        // if(!userId)
        if (!params?.userId) {
            return new Response("User ID is required!", { status: 400 });
        }

        const userId = params.userId;
        // console.log("Fetching properties for userId:", userId);

        // Fetch all properties belonging to the user
        const properties = await Property.find({ owner: userId });

        return new Response(JSON.stringify(properties), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching properties:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};