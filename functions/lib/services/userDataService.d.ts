import { ReceivedRequest } from "@/mediation";
import { UpdateProfileRequest } from "shared/requests/user";
import { User } from "shared/models/user";
export declare function updateProfile(request: ReceivedRequest<UpdateProfileRequest>): Promise<void>;
export declare function getUserData(userId: string): Promise<User | null>;
