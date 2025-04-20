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
// /Delete /api/property/:id
//Delete property by id
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
// put /api/property/:id
//Update property by id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return new Response("Unauthorized", { status: 401 });
    // }

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("userId is required!", { status: 401 });
    }
    const { userId } = sessionUser;
    const { id } = params;
    const formData = await request.formData();
    // console.log(formData);

    //access all amenities from the formData
    const amenities = formData.getAll("amenities");

    // Get property to update
    const existingProperty = await Property.findById(id);
    if (!existingProperty) {
      return new Response("Property does not exist!", { status: 404 });
    }
    //verify ownership
    if (existingProperty.owner.toString() !== userId) {
      return new Response("Unauthorized!", { status: 401 });
    }

    //create a propertyData object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),

      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },

      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),

      amenities,

      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
      // images,
    };
    // console.log(propertyData);

    //update property in database
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);
    return new Response(JSON.stringify(updatedProperty), { status: 200 });
  }
  catch (error) {
    console.error("Error:", error);
    return new Response("Something went wrong! ", { status: 500 });
  }
};
