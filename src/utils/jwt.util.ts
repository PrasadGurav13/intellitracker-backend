import jwt from "jsonwebtoken";

export const generateToken = async (payload: any, expiry: '30d') => {

    const secret = process.env['JWT_SECRET']
    const accessToken = jwt.sign(payload, secret, { expiresIn: expiry});
    return {
        accessToken
    };
}

export const verifyToken = async ( token: string) : Promise<any> => {

    const secret = process.env['JWT_SECRET']
    try {    
        const decodedToken = jwt.verify( token , secret, {complete: true, ignoreExpiration: false});
        return decodedToken;
    } catch(error) {
        console.error(error);
        throw error
    }
}