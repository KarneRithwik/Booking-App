import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

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

export const POST = async (request) => {
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

    const formData = await request.formData();
    // console.log(formData);
    const amenities = formData.getAll("amenities");

    const images = formData.getAll("images")
      //check if image input is present
      .filter((image) => image.name != "");
    // console.log(amenities, images);

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


    //Upload image(s) to the Cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      //convert the image data into base64
      const imageBase64 = imageData.toString("base64");

      //Make request to upload to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: "Booking" }
      );
      imageUploadPromises.push(result.secure_url);
    }
    //wait for all images to upload
    const uploadedImages = await Promise.all(imageUploadPromises);
    //add uploaded images to the propertyData object
    propertyData.images = uploadedImages;

    const newProperty = new Property(propertyData);
    await newProperty.save();

    //add data to the localhost:3000/properties/propertyId
    return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);

    // return new Response(JSON.stringify({ message: "Success" }), {
    //   status: 200,
    // });
  }
  catch (error) {
    console.error("Error:", error);
    return new Response("Something went wrong! ", { status: 500 });
  }
};
