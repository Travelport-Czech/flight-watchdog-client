export type CreateImageCallback = (
  html: string,
  width: number,
  height: number,
  backgroundColor: string
) => Promise<string>
