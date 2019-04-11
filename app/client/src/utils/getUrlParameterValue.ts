export const getUrlParameterValue = (url: string, key: string): string => {
  const urlParts = url.split('&')

  return urlParts.reduce((acc: string, current: string): string => {
    if (current.includes(key)) {
      return decodeURIComponent(current.split('=')[1])
    }

    return acc
  }, '')
}
