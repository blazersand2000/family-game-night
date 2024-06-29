export function useLogger() {
  function log(...args: any[]) {
    console.log(...args)
  }

  return { log }
}
