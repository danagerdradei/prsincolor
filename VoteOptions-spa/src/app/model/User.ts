export class User {
    id: string;
    email: string;
    roles: string;
    token?: string;
}


export class AuthenticateResponse {
    result: Result;
    targetUrl: string;
    success: string;
    error: string;
}

export class Result {
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: string;
    userId: string;
}