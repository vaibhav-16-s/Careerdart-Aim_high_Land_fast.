function LoadingSpinner({ text = "Loading..." }) {
    return (
        <div className="loading-state">
            <div className="loading-spinner" />
            <p>{text}</p>
        </div>
    );
}

export default LoadingSpinner;
