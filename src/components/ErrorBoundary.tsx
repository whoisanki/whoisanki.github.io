import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Portfolio ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#08090d] text-zinc-100 flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-zinc-900 border border-white/10 space-y-4">
            <div className="text-4xl">⚡</div>
            <h2 className="text-2xl font-bold text-white">Ankith Mahindrakar Portfolio</h2>
            <p className="text-sm text-zinc-400">
              A temporary render hiccup occurred. Refreshing the browser will restore the interactive 3D scene.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition cursor-pointer"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
