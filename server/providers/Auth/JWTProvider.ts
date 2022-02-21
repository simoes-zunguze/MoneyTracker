import jwt, { JwtPayload } from "jsonwebtoken";
import { Token } from "../../app/models/Token";
import { User } from "../../app/models/User";

const tokenTTL= "5m"
function generateTokens(user: User, tokenSecret: string, refreshTokenSecret: string): {token: string, refreshToken: string}{
    const token  = jwt.sign( {email : user.email} , tokenSecret, {expiresIn : tokenTTL} );
    const refreshToken  = jwt.sign( {email : user.email} , refreshTokenSecret, {expiresIn : "15m"} );
    saveRefreshToken(refreshToken);
    return {token: token, refreshToken: refreshToken};
}

function generateToken(user: User, tokenSecret: string):  string  {
    const token  = jwt.sign( {email : user.email} , tokenSecret, {expiresIn : tokenTTL} );
    return token;
}

function verifyToken(token: string, tokenSecret: string): Boolean | JwtPayload{
    let payload: boolean | JwtPayload = false;
    
    jwt.verify( token , tokenSecret,  function(err, decoded){
        if(decoded){
            payload = decoded;            
        }
    });
    return payload;
}


async function saveRefreshToken(refreshToken: string){
    const token =  new Token();
    token.token = refreshToken;
    await token.save();
}

async function deleteRefreshToken(refreshToken: string){
    const token = await  Token.findOne({token: refreshToken});
    if (token) {
        token.remove();
    }else{
        
    }
}
export {generateToken, generateTokens, verifyToken};