import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser"

// import nextDynamic from "next/dynamic";
export const dynamic = "force-dynamic";

export const POST = async (request) => {
    try {
        await connectDB();
        const { propertyId } = await request.json();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response(JSON.stringify({ message: "User ID is required!" }), { status: 401 });
        }

        const { userId } = sessionUser;

        //find user in database
        // const user = await User.findOne(_id, userId);
        const user = await User.findById(userId);

        //check if the property is bookmarked by the user
        let isBookmarked = user.bookmarks.includes(propertyId);

        let message;
        if (isBookmarked) {
            //remove property from user's bookmark
            user.bookmarks.pull(propertyId);
            message = "Bookmark removed successfully!";
            isBookmarked = false;
        }
        else {
            //add property to user's bookmarks
            user.bookmarks.push(propertyId);
            message = "Property Added successfully!";
            isBookmarked = true;
        }
        //save user
        await user.save();
        return new Response(JSON.stringify({ message, isBookmarked }), { status: 200 });
    }
    catch (error) {
        console.log(error);
        return new Response("Something went wrong!", { status: 500 });
    }
};