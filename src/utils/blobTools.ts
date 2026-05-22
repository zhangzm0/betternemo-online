export function downloadString(content: string, fileName: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })

  const downloadUrl = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = downloadUrl
  a.download = fileName

  document.body.appendChild(a)
  a.click()

  document.body.removeChild(a)
  URL.revokeObjectURL(downloadUrl)
}

export function downloadBlob(blob: Blob, fileName: string) {
  const downloadUrl = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = downloadUrl
  a.download = fileName

  document.body.appendChild(a)
  a.click()

  document.body.removeChild(a)
  URL.revokeObjectURL(downloadUrl)
}
