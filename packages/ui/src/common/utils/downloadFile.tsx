export function downloadFile(filename: string, downloadHref: string) {
  const a = document.createElement('a')
  a.download = filename
  a.href = downloadHref
  a.click()
}
