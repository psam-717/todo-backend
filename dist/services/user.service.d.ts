export declare const signupService: (fullName: string, email: string, password: string, confirmPassword: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/user.model").IUser, {}, {}> & import("../models/user.model").IUser & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export declare const loginService: (email: string, password: string) => Promise<{
    user: import("../models/user.model").IUser & Required<{
        _id: string;
    }> & {
        __v: number;
    };
    token: string;
}>;
export declare const getUserService: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("../models/user.model").IUser, {}, {}> & import("../models/user.model").IUser & Required<{
    _id: string;
}> & {
    __v: number;
}>;
//# sourceMappingURL=user.service.d.ts.map