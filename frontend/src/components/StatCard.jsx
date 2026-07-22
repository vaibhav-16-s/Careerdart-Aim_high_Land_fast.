function StatCard({ icon, label, value, description, variant = "blue", action }) {
    return (
        <div className={`stat-card stat-card--${variant}`}>
            {icon && <div className="stat-card__icon">{icon}</div>}
            <p className="stat-card__label">{label}</p>
            <p className="stat-card__value">{value}</p>
            {description && <p className="stat-card__desc">{description}</p>}
            {action}
        </div>
    );
}

export default StatCard;
