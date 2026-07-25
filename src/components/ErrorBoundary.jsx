import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Application render error", error, info);
  }

  reset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
          <div>
            <h1 className="text-xl font-semibold">Something went wrong</h1>
            <button
              type="button"
              onClick={this.reset}
              className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Try again
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
