'use babel'

const CHUNK_TEST_REGEX = /:/
const CHUNK_SPLIT_REGEX = /:/g

export function getByPath(path, container) {
  let parameters = container
  const parsed = parsePath(path)
  for (const chunk of parsed.key.split('.')) {
    if (parameters.hasOwnProperty(chunk)) {
      parameters = parameters[chunk]
    } else return null
  }

  if (parameters && typeof parameters === 'object') {
    throw new Error(`Cannot use non-stringish value in template: ${path}`)
  }
  parameters = parameters.toString()
  if (typeof parsed.start === 'number' && typeof parsed.end === 'number') {
    return parameters.slice(parsed.start, parsed.end)
  } else if (typeof parsed.start === 'number') {
    return parameters.slice(parsed.start)
  } else return parameters
}

export function parsePath(path) {
  if (!CHUNK_TEST_REGEX.test(path)) {
    return {key: path, start: null, end: null}
  }
  const parts = path.split(CHUNK_SPLIT_REGEX)
  if (parts.length === 2) {
    return {key: parts[0], start: parseInt(parts[1]) || 0, end: null}
  } else if (parts.length === 3) {
    return {key: parts[0], start: parseInt(parts[1]) || 0, end: parseInt(parts[2]) || 0}
  }
  return null
}
