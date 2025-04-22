import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

//GET /api/messages/unread-count
export const GET = async (request) => {
    try {
        await connectDB();
        const sessionUser = await getSessionUser();

        // Check if sessionUser is null or undefined
        // console.log("sessionUser", sessionUser);
        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify("User Id is required!"), { status: 401 });
        }

        const userId = sessionUser.user.id;

        // console.log("userId", userId);

        const count = await Message.countDocuments({
            recipient: userId,
            read: false,
        });

        return new Response(JSON.stringify(count), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", { status: 500 });
    }
};
