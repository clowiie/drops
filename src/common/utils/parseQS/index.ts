import qs from 'qs'

const parseQS = (query: string) => qs.parse(query, { ignoreQueryPrefix: true })

export default parseQS
