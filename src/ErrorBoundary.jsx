import { Component } from "react";

// No functional component equivalent to this functionality
// Must use class components for this and wrap around a func component
// EX: This one is wrapped around Details.jsx
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Typically you would log this to something like TrackJS or NewRelic
    console.log(`Error Boundary caught error: ${error} ${info}`);
  }

  render() {
    if (this.state.hasError) {
      return this.props.errorComponent;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
