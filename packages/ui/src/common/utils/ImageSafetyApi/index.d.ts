interface ImageSafetyApi {
  blacklist: (jsonPath: { query: (json: any) => string[] }) => Promise<string[]>
  report: (url: string) => Promise<Response>
}

export const ImageSafetyApi: ImageSafetyApi
