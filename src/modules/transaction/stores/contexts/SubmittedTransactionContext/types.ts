export interface ContextType {
  submittedHash: string
  setSubmittedHash: (hash: string) => void
  clearSubmitted: () => void
}
