import './NavBar.css';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from "../../public/website_logo.png"; // Add your profile icon image
import { Link as ScrollLink } from 'react-scroll';


const scrollToSection = (id) => {
  const element = document.getElementById(id);
  const offset = 70; // adjust this value to your navbar height
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = element.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
};

const navItems = [
  { text: "About", icon: "fas fa-user", link: "#about" },
  { text: "Skills", icon: "fas fa-code", link: "#skills" },
  { text: "Education", icon: "fas fa-graduation-cap", link: "#education" },
  { text: "Experience", icon: "fas fa-briefcase", link: "#experience" },
  { text: "Résumé", icon: "fas fa-download", link: "/resume.pdf", download: true},
];

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 992);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile) setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={isOpen}
      onToggle={(val) => setIsOpen(val)}
      bg={scrolled ? "dark" : "light"}
      variant={scrolled ? "dark" : "light"}
      className={`transition-navbar ${scrolled ? "navbar-scrolled" : ""}`}
    >
      <Container fluid className="px-2.5 px-lg-5">
        <Navbar.Brand>
          <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{delay:0.4,duration:0.8}}
          >
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="d-flex align-items-center"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                
                <Image
                  src={profileIcon}
                  rounded
                  fluid
                  alt="Profile"
                  className="me-2"
                  style={{ maxWidth: '50px', height: 'auto' }}
                />  
                <span onClick={scrollToTop} className="fs-3 fw-light">Thamaru Jalthotage</span>
              </Link>
            </motion.div>
        </Navbar.Brand>

        <Navbar.Toggle onClick={toggleNavbar} aria-controls='navbarScroll' className='ms-auto custom-toggle-navbar'></Navbar.Toggle>

        <Navbar.Collapse id='navbarScroll'>
          {/* Desktop Nav with animation */}
        <Nav className="ms-auto d-none d-lg-flex align-items-center">
          {navItems.map((item, index) => (
            <motion.div
              key={item.next}
              className="nav-item "
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{  delay: index * 0.15, duration: 0.35}}
            >
              {item.download ? (
                <a href={item.link} download className="nav-link">
                  <i className={`${item.icon} me-0`}></i> {item.text}
                </a>
              ) : (
                <button
                  className="nav-link btn btn-link p-0"
                  onClick={() =>
                    item.link.startsWith("#")
                      ? scrollToSection(item.link.substring(1))
                      : window.location.assign(item.link)
                  }
                >
                  <i className={`${item.icon} me-0`}></i> {item.text}
                </button>
              )}
            </motion.div>
          ))}
        </Nav>


         {/* Mobile Nav with icons and animation */}
          {isMobile && (
            <Nav className="ms-auto d-flex flex-column align-items-start w-100">
              {isOpen && navItems.map((item, index) => (
                <motion.div
                  key={item.text}
                  className="nav-item w-100"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.35 }}
                >
                  {item.download ? (
                    <a
                      href={item.link}
                      download
                      onClick={() => setIsOpen(false)}
                      className="d-flex align-items-center mb-2 p-2 w-100 shadow-sm rounded nav-link"
                    >
                      <i className={`${item.icon} me-2`}></i> {item.text}
                    </a>
                  ) : (
                    <button
                      className="d-flex align-items-center mb-2 p-2 w-100 shadow-sm rounded nav-link btn btn-link text-start"
                      onClick={() => {
                        scrollToSection(item.link.substring(1)); // scroll to section
                        setIsOpen(false); // close mobile menu
                      }}
                    >
                      <i className={`${item.icon} me-2`}></i> {item.text}
                    </button>
                  )}
                </motion.div>
              ))}
            </Nav>
)}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
