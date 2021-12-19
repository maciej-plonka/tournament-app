import NextAuth, {User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import {createRepository} from "../../../server/repository";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";

const repository = createRepository(new PrismaClient())
export default NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: 'Credentials',
            credentials: {
                login: {label: 'Login', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials, req): Promise<User | null> {
                if (!credentials) {
                    return null;
                }
                const player = await repository.findPlayerByLogin(credentials.login)
                if (!player) {
                    return null;
                }
                const match = await bcrypt.compare(credentials.password, player.password);
                if (!match) {
                    return null;
                }
                return {
                    id: player.id + '',
                    name: player.name
                }
            }
        })
    ]
})
