// ============================================================
// Error Boundary — catches unhandled React render errors
// and displays a user-friendly recovery screen instead of
// a blank page.
// ============================================================

import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  eventId: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, eventId: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, eventId: null };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    // In production you would send this to an error-tracking service.
    // For the demo we log to console with a structured format.
    console.error("[KarmSetu][ErrorBoundary] Unhandled render error:", {
      message: error.message,
      stack: error.stack,
      componentStack: info.componentStack,
    });
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null, eventId: null });
  };

  override render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          role="alert"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            background: "#0f172a",
            color: "#e2e8f0",
            fontFamily: "Inter, system-ui, sans-serif",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #ef4444, #b91c1c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
              fontSize: 24,
            }}
          >
            ⚠
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#94a3b8", maxWidth: 480, marginBottom: "0.5rem" }}>
            KarmSetu encountered an unexpected error. Your data is safe — this is
            a UI rendering issue only.
          </p>
          {this.state.error && (
            <pre
              style={{
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: 8,
                padding: "0.75rem 1rem",
                fontSize: "0.7rem",
                color: "#94a3b8",
                maxWidth: 560,
                overflowX: "auto",
                margin: "1rem 0",
                textAlign: "left",
              }}
            >
              {this.state.error.message}
            </pre>
          )}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            <button
              type="button"
              onClick={this.handleReset}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: 8,
                background: "linear-gradient(135deg, #1a74ff, #0058d4)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.85rem",
              }}
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => window.location.assign("/dashboard")}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: 8,
                background: "#1e293b",
                color: "#94a3b8",
                border: "1px solid #334155",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.85rem",
              }}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
