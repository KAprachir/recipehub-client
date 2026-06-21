import { serverMutation } from '../core/server'

// Update Profile: Updates user profile settings (name and image url)
export const updateProfile = async (profileData) => {
  return serverMutation('/api/user/profile', profileData, 'PATCH')
}
