import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

//GET /api/messages
export const GET = async () => {
    try {
        await connectDB();
        const sessionUser = await getSessionUser();
        //Check if user is logged in
        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify({ message: "You must be logged in to send a message!" }), { status: 401 });
        }

        const { userId } = sessionUser;


        //structuring the messages in a way that unread messages are on top of read messages
        const readMessages = await Message.find({ recipient: userId, read: true })
            .sort({ createdAt: -1 })
            .populate("sender", "username").populate("property", "name")

        const unreadMessages = await Message.find({ recipient: userId, read: false })
            .sort({ createdAt: -1 })
            .populate("sender", "username").populate("property", "name")

        const messages = [...unreadMessages, ...readMessages];

        return new Response(JSON.stringify(messages), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response("Something went wrong!", { status: 500 });
    }
}

//POST/api/messages
export const POST = async (request) => {
    try {
        await connectDB();
        const { email, name, phone, message, property, recipient } = await request.json();

        const sessionUser = await getSessionUser();
        //Check if user is logged in
        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify({ message: "You must be logged in to send a message!" }), { status: 401 });
        }

        const { user } = sessionUser;
        //When user and property owner are same 
        if (user.id === recipient) {
            return new Response(JSON.stringify({ message: "You cannot message to yourself!" }), { status: 400 });
        }

        const newMessage = new Message({
            name,
            sender: user.id,
            recipient,
            property,
            email,
            phone,
            body: message
        });
        await newMessage.save();
        return new Response(JSON.stringify({ message: "Message sent successfully!" }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong!", { status: 500 });
    }
}