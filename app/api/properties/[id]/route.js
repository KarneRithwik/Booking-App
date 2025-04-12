import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";


// /Get /api/property/:id

export const GET = async (request, context) => {
  try {
    await connectDB();
    const params = await context.params;
    const property = await Property.findById(params.id);
    if (!property?.id) return new Response('Property Not Found!', { status: 404 });
    return new Response(JSON.stringify(property), {
      status: 200,
      //   headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (request, context) => {
  try {
    const params = await context.params;
    const propertyId = params.id;
    const sessionUser = await getSessionUser();

    //Check for Session
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is Required!", { status: 401 });
    }

    const { userId } = sessionUser;

    await connectDB();

    const property = await Property.findById(propertyId);
    if (!property) return new Response("Property Not Found!", { status: 404 });

    //Check if the property belongs to the user
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized!", { status: 401 });
    }

    await property.deleteOne();

    return new Response("Property Deleted", {
      status: 200,
    });

  } catch (error) {
    console.error("Error fetching property:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
