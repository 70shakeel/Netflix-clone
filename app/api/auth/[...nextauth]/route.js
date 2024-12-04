import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { supabase } from '@/app/lib/supabase'; // import your Supabase client

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                console.log("User info:", user); // Log user info to ensure it's being received

                // Store the user's Google ID and other information in the token
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.image = user.image;

                try {
                    // Check if the user already exists in the Supabase database
                    const { data: existingUser, error: selectError } = await supabase
                        .from('users')
                        .select('*')
                        .eq('google_id', user.id)
                        .single();

                    // Check for errors and handle the case where no user exists
                    if (selectError && selectError.code !== 'PGRST100') {
                        console.error('Error checking for existing user:', selectError.message);
                    }

                    // If no user exists, insert them into Supabase
                    if (!existingUser) {
                        console.log("Inserting user into Supabase"); // Log insertion attempt

                        const { data, error: insertError } = await supabase
                            .from('users')
                            .insert([
                                {
                                    google_id: user.id,
                                    email: user.email,
                                    name: user.name,
                                    image: user.image,
                                },
                            ])
                            .single();

                        if (insertError) {
                            console.error('Error inserting user:', insertError.message);
                        } else {
                            console.log("User inserted into Supabase:", data); // Log successful insertion
                        }
                    }
                } catch (error) {
                    console.error('Error during JWT callback:', error.message);
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
            session.user.image = token.image;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
