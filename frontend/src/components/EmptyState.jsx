function EmptyState({ icon = "📭", title, text, action }) {
    return (
        <div className="empty-state">
            <div className="empty-state__icon">{icon}</div>
            <h3 className="empty-state__title">{title}</h3>
            {text && <p className="empty-state__text">{text}</p>}
            {action}
        </div>
    );
}

export default EmptyState;
