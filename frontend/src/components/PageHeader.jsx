function PageHeader({ eyebrow, title, subtitle, actions }) {
    return (
        <div className="page-header">
            {eyebrow && <p className="page-header__eyebrow">{eyebrow}</p>}
            <h1 className="page-header__title">{title}</h1>
            {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
            {actions && <div className="page-header__actions">{actions}</div>}
        </div>
    );
}

export default PageHeader;
