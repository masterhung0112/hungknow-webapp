export function getMonthLong(locale: string): string {
  if (locale === 'ko') {
    // Long and short are equivalent in Korean except long has a bug on IE11/Windows 7
    return 'short'
  }

  return 'long'
}

export function t(v: string): string {
  return v
}
