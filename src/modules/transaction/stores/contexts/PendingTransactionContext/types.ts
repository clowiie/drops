export interface ContextType {
    pendingHashes: string[]
    hasPendingHash: boolean
    setPendingHashes: (hashes: string[]) => void
  }
