import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '#home';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div translate="no" className="notranslate min-h-screen bg-[#050505] text-[#e5e2e1] flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full bg-[#0c0c0e] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
            <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto text-2xl font-bold">
              ⚠️
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white tracking-tight">Admin Interface Recovery</h2>
              <p className="text-xs text-neutral-400 font-light">
                A DOM synchronization issue occurred (often caused by browser auto-translate plugins or extension scripts).
              </p>
            </div>

            {this.state.error && (
              <div className="text-[11px] text-red-400 font-mono bg-red-500/5 p-3.5 rounded-xl border border-red-500/10 text-left overflow-x-auto break-all max-h-28">
                {this.state.error.toString()}
              </div>
            )}

            <div className="pt-2 space-y-3">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className="w-full py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-[0.15em] rounded-xl hover:bg-neutral-200 transition-colors duration-200 cursor-pointer shadow-lg"
              >
                Reload Admin Panel
              </button>

              <button
                onClick={this.handleReset}
                className="w-full py-3 bg-transparent text-neutral-400 font-mono text-[10px] uppercase tracking-widest hover:text-white transition-colors cursor-pointer"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
