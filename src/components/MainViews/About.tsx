import { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PrivacyPolicy from './About/PrivacyPolicy';
import TermsOfService from './About/TermsOfService';
import ContactForm from './About/ContactForm';
import Faq from './About/Faq';

const About = () => {
    const privacyRef = useRef<HTMLDivElement>(null);
    const tosRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const faqRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState<any>(null);
    const observerRef = useRef<any>(null);
    const activeSectionRef = useRef(activeSection);
    const [isScrollingComplete, setIsScrollingComplete] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const debounceTimerRef = useRef<any>(null); // Debounce timer ref

    const sections = [
        { label: 'Contact', ref: contactRef, name: 'contact' },
        { label: 'FAQ', ref: faqRef, name: 'faq' },
        { label: 'Privacy Policy', ref: privacyRef, name: 'privacy' },
        { label: 'Terms of Service', ref: tosRef, name: 'terms' },
    ];

    useEffect(() => {
        // Update the ref whenever activeSection changes
        activeSectionRef.current = activeSection;
    }, [activeSection]);

    useEffect(() => {
        const sectionToScrollTo = sections.find((section) =>
            location.search.includes(section.name)
        );
        if (sectionToScrollTo && sectionToScrollTo.ref.current) {
            sectionToScrollTo.ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        const scrollTimeout = setTimeout(() => {
            console.log('Scrolling complete');
            setIsScrollingComplete(true);
        }, 500);

        return () => clearTimeout(scrollTimeout);
    }, [location.search, sections]);

    useEffect(() => {
        if (!isScrollingComplete) return;

        // Disconnect the observer if it already exists
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        // Create a new IntersectionObserver
        observerRef.current = new IntersectionObserver(
            (entries) => {
                const intersectingEntries = entries.filter((entry) => entry.isIntersecting);

                if (intersectingEntries.length > 0) {
                    // Sort entries to find the one closest to the top
                    intersectingEntries.sort(
                        (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
                    );

                    const topEntry = intersectingEntries[0];
                    const sectionName = topEntry.target.getAttribute('id');

                    // Debounce the URL update
                    if (debounceTimerRef.current) {
                        clearTimeout(debounceTimerRef.current);
                    }

                    debounceTimerRef.current = setTimeout(() => {
                        if (sectionName && sectionName !== activeSectionRef.current) {
                            setActiveSection(sectionName);
                            navigate(`?section=${sectionName}`, { replace: true });
                        }
                    }, 250); // Debounce time set to 250ms
                }
            },
            { threshold: 0.6 }
        );

        // Observe each section
        sections.forEach((section) => {
            if (section.ref.current) {
                observerRef.current.observe(section.ref.current);
            }
        });

        // Clean up the observer and debounce timer on unmount or when dependencies change
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [navigate, isScrollingComplete, sections]); // Removed activeSection from dependencies

    return (
        <div className='about'>
            <div className="about-section" ref={contactRef} id="contact">
                <ContactForm />
            </div>
            <div className="about-section" ref={faqRef} id="faq">
                <Faq />
            </div>
            <div className="about-section" ref={privacyRef} id="privacy">
                <PrivacyPolicy />
            </div>
            <div className="about-section" ref={tosRef} id="terms">
                <TermsOfService />
            </div>
        </div>
    );
};

export default About;