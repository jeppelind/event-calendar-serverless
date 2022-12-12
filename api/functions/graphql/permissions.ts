import { GraphQLError } from "graphql"

export enum Roles {
    READ,
    WRITE,
    MODIFY,
}

type user = {
    role: number,
}

export const authorize = (user: user, requiredRole: number) => {
    if (!user) {
        throw new GraphQLError('Unauthenticated user', {
            extensions: {
                code: 'UNAUTHENTICATED'
            }
        });
    }
    if (user.role < requiredRole) {
        throw new GraphQLError('Unauthorized', {
            extensions: {
                code: 'UNAUTHORIZED'
            }
        });
    }
}