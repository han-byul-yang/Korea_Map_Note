const debounce = (callback: React.Dispatch<React.SetStateAction<string>>, limit = 300) => {
  let timeout: NodeJS.Timeout

  return function debounceFunc(arg: string) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback(arg)
    }, limit)
  }
}

export default debounce
