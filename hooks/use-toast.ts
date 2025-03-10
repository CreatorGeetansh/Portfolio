type ToastType = "default" | "destructive" | "success"

interface ToastOptions {
  title: string
  description?: string
  variant?: ToastType
  duration?: number
}

export function toast(options: ToastOptions) {
  // In a real app, this would show a toast notification
  console.log("Toast:", options)

  // For demonstration purposes, we'll use browser's alert
  // In a real app, you'd use a proper toast component
  alert(`${options.title}\n${options.description || ""}`)
}

