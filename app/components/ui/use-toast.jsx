import * as React from "react"
import ToastContext from "./toast-context"

export default function useToast() {
    const { toasts, setToasts } = React.useContext(ToastContext)
  
    const toast = React.useCallback(
      ({ title, description, action, ...props }) => {
        const id = Math.random().toString(36).substr(2, 9)
        setToasts((prev) => [...prev, { id, title, description, action, ...props }])
        setTimeout(() => {
          setToasts((prev) => prev.filter((toast) => toast.id !== id))
        }, 5000)
      },
      [setToasts],
    )
  
    return { toast, toasts }
  }