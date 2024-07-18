import { GenericResponse } from "shared/shared";
import { ReceivedRequest, RequestHandler } from "@/mediation";
import { UpdateProfileRequest, UpdateProfileResponse } from "shared/requests/user";
export declare class UpdateProfileHandler implements RequestHandler<UpdateProfileRequest, UpdateProfileResponse> {
    handle(request: ReceivedRequest<UpdateProfileRequest>): Promise<GenericResponse<UpdateProfileResponse>>;
}
