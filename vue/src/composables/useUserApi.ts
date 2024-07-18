import callFunction from '@/FunctionCaller'
import type { UpdateProfileRequest } from 'shared/requests/user'

export function useUserApi() {
  async function updateProfile(request: UpdateProfileRequest) {
    const response = await callFunction('UpdateProfile', request)
    return response
  }

  return {
    updateProfile
  }
}
