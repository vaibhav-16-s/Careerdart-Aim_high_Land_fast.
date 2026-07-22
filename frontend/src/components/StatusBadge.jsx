function StatusBadge({ status }) {
    const normalized = (status || "").toLowerCase();
    let variant = "info";

    if (normalized === "accepted" || normalized === "active") variant = "accepted";
    else if (normalized === "pending") variant = "pending";
    else if (normalized === "rejected" || normalized === "inactive") variant = "rejected";

    return (
        <span className={`status-badge status-badge--${variant}`}>
            {status}
        </span>
    );
}

export default StatusBadge;
