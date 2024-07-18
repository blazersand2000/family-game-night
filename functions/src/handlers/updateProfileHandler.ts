import { GenericResponse } from "shared/shared"
import { ReceivedRequest, RequestHandler } from "@/mediation"
import { UpdateProfileRequest, UpdateProfileResponse } from "shared/requests/user"
import { updateProfile } from "@/services/userDataService"

export class UpdateProfileHandler
   implements RequestHandler<UpdateProfileRequest, UpdateProfileResponse>
{
   async handle(
      request: ReceivedRequest<UpdateProfileRequest>
   ): Promise<GenericResponse<UpdateProfileResponse>> {
      try {
         await updateProfile(request)
         return { success: true, payload: {} }
      } catch (error) {
         console.log(error)
         return {
            success: false,
            error: "Failed to update profile",
         }
      }
   }
}
