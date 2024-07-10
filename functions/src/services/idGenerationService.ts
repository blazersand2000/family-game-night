import { v4 as uuidv4, v1 as uuidv1 } from "uuid"

export function generateSecureUniqueId() {
   // Concatenate UUID v4 and UUID v1, removing hyphens from the UUID v1 part
   return uuidv4().concat(uuidv1()).replace(/-/g, "")
}
