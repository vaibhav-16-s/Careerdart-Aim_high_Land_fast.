import ContactSection from "./ContactSection";
import FooterSection from "./FooterSection";

function PageLayout({
    navbar,
    children,
    showContact = false,
    showFooter = true,
    flush = false,
}) {
    return (
        <div className="app-shell">
            <header>{navbar}</header>
            <main className={flush ? "page-main page-main--flush" : "page-main"}>
                {children}
            </main>
            {showContact && <ContactSection />}
            {showFooter && <FooterSection />}
        </div>
    );
}

export default PageLayout;
