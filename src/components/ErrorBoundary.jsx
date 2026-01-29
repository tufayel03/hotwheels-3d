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
        console.error("Hero3D Check:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ color: 'red', padding: '20px', zIndex: 1000, position: 'relative', background: 'white' }}>
                    <h2>3D Scene Crashed</h2>
                    <pre>{this.state.error?.message}</pre>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
