function ContactSection() {
    return (
        <section className="contact-section" id="contact">
            <div className="page-container">
                <h2 className="contact-section__title">Get in Touch</h2>
                <p className="contact-section__subtitle">
                    Have questions? Our team is here to help you succeed in your career journey.
                </p>
                <div className="contact-grid">
                    <div className="contact-item">
                        <div className="contact-item__icon">✉️</div>
                        <p className="contact-item__label">Email</p>
                        <p className="contact-item__value">
                            <a href="mailto:support@careerdart.com">support@careerdart.com</a>
                        </p>
                    </div>
                    <div className="contact-item">
                        <div className="contact-item__icon">📞</div>
                        <p className="contact-item__label">Phone</p>
                        <p className="contact-item__value">+1 (212) 555-0174</p>
                    </div>
                    <div className="contact-item">
                        <div className="contact-item__icon">📍</div>
                        <p className="contact-item__label">Address</p>
                        <p className="contact-item__value">CareerDart Headquarters, New York</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;
