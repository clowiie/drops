import { toast } from 'react-toastify'

import CrossIcon from 'common/components/Icon/icons/cross'

const showErrorToast = (errMsg: string) => {
  toast(
    <div className="flex items-center">
      <div className="bg-red-700 rounded-full text-white p-2">
        <CrossIcon size={12} />
      </div>
      <span className="text-red-700 pl-2">{errMsg}</span>
    </div>,
    {
      className: 'bg-red-50',
    },
  )
}

export default showErrorToast
