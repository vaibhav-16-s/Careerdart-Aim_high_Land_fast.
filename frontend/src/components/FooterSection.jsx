function FooterSection() {
    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <span className="site-footer__brand">CareerDart</span>
                <p className="site-footer__copy">© {new Date().getFullYear()} CareerDart. All rights reserved.</p>
                <div className="site-footer__links">
                    <a href="/">Home</a>
                    <a href="#whyus">Why Us</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </div>
            </div>
        </footer>
    );
}

export default FooterSection;
