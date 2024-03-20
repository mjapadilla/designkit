import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.warn('Uncaught error:', error, errorInfo); // eslint-disable-line
  }

  public render() {
    const { hasError } = this.state;

    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div className="bg-white fixed inset-0 z-50 h-screen w-screen bg-opacity-100">
          <div className="bg-white h-full w-full bg-opacity-100">
            <div className="flex h-full flex-col items-center justify-center gap-12">
              <div className="space-y-3 text-center">
                <div className="text-2xl font-bold">Internal Server Error</div>
                <div className="text-sm font-light">
                  Sorry, something went wrong in our end.
                </div>

                <Link to="/">
                  <button className="primary md btn !mt-5 px-5" type="button">
                    Go to Homepage
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    const { children } = this.props;
    return children;
  }
}

export default ErrorWrapper;
