import { toast } from 'react-toastify'

import CheckedMarkIcon from 'common/components/Icon/icons/checked-mark'

const showSuccessToast = (msg: string) => {
  toast(
    <div className="flex items-center">
      <div className="bg-green-700 rounded-full text-white p-1">
        <CheckedMarkIcon size={18} />
      </div>
      <span className="text-green-700 pl-2">{msg}</span>
    </div>,
    {
      className: 'bg-green-50',
    },
  )
}

export default showSuccessToast
