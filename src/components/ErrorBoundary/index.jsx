import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div class="flex flex-col items-center justify-center min-h-[400px] p-5 max-w-md mx-auto bg-red-100 text-red-800 border border-red-200 rounded-lg text-center mt-12">
          <h1 class="text-xl font-semibold mb-2">אירעה שגיאה בטעינת האתר</h1>
          <p>אם השגיאה חוזרת על עצמה, אנא עדכן אותנו בכתובת האימייל שלנו:</p>
          <a
            href="mailto:a47546@gmail.com"
            class="text-blue-600 font-medium hover:underline"
          >
            a47546@gmail.com
          </a>
          <p class="mt-2">תודה.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
