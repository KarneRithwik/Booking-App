import connectDB from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // when a user logged in to app ok. From then whenever Login is clicked this google account is automatically selected.
            // so to prompt what account to use each time while logging in:
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        // invoked on successful signIn:
        async signIn({ profile }) {
            // 1.connect to db
            await connectDB();
            // 2. check if user trying to logging in exists
            const userExists = await User.findOne({ email: profile.email });
            // 3.if not=> add user to db and return true
            if (!userExists) {
                //truncate username if too long
                const username = profile.name.slice(0, 20);

                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture,
                });
            }
            // 4.else return true to allow signIn 
            return true;
        },
        // modifies the session object
        async session({ session }) {
            // 1.get user from db who is signed in
            const user = await User.findOne({ email: session.user.email });
            // 2.assign user id to session
            session.user.id = user._id.toString();
            // 3return this session
            return session;
        }
    }
};