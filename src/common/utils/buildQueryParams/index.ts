import qs from 'qs'

import parseQS from 'common/utils/parseQS'

const buildQueryParams = (query: Record<string, any>) => {
  const q = parseQS(window.location.search)

  return qs.stringify({ ...q, ...query }, { addQueryPrefix: true })
}

export default buildQueryParams
