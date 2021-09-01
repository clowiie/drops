export interface Props {
  isOpen: boolean
  onClose: () => void
  getToken: (token: string) => void
}
