import { getFunctions, httpsCallable } from 'firebase/functions'
import type { GenericResponse, GenericRequest } from 'shared/shared'
import type { RequestResponseMapping } from 'shared/requests/requests'

// Initialize Firebase Functions
const functions = getFunctions()

async function callFunction<K extends keyof RequestResponseMapping>(
  requestType: K,
  payload: RequestResponseMapping[K]['request']
): Promise<GenericResponse<RequestResponseMapping[K]['response']>> {
  const sendRequest = httpsCallable<
    GenericRequest<RequestResponseMapping[K]['request']>,
    GenericResponse<RequestResponseMapping[K]['response']>
  >(functions, 'gameAction')

  const result = await sendRequest({ type: requestType, payload })

  return result.data
}

export default callFunction
