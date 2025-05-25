import React, { useState, useEffect, useRef } from "react";
import "./styles/coverpage.css";
import { Link, useLocation } from "react-router-dom";

const CoverPage = () => {
  const [rocketPosition, setRocketPosition] = useState({ x: 0, y: 0 });
  const [isDocked, setIsDocked] = useState(false);
  const [dockedSection, setDockedSection] = useState(null);
  const location = useLocation();
  const rocketRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {

      // Check if mouse is near any navigation link
      const navLinks = document.querySelectorAll('.cover-nav-links a');
      let nearestLink = null;
      let minDistance = Infinity;

      navLinks.forEach((link) => {
        const rect = link.getBoundingClientRect();
        const linkCenterX = rect.left + rect.width / 2;
        const linkCenterY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - linkCenterX, 2) + Math.pow(e.clientY - linkCenterY, 2)
        );

        if (distance < 100 && distance < minDistance) {
          minDistance = distance;
          nearestLink = { element: link, x: linkCenterX, y: linkCenterY, section: link.textContent };
        }
      });

      if (nearestLink) {
        setRocketPosition({ x: nearestLink.x, y: nearestLink.y });
        setIsDocked(true);
        setDockedSection(nearestLink.section);
      } else {
        setRocketPosition({ x: e.clientX, y: e.clientY });
        setIsDocked(false);
        setDockedSection(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="cover-page-container">
      {/* Space background elements */}
      <div className="space-stars"></div>
      <div className="space-planets"></div>
      <div className="space-nebula"></div>

      {/* Rocket follower */}
      <div
        ref={rocketRef}
        className={`space-rocket ${isDocked ? 'docked' : ''}`}
        style={{
          left: rocketPosition.x - 15,
          top: rocketPosition.y - 15,
        }}
      >
        🚀
        {isDocked && dockedSection && (
          <div className="rocket-dock-label">
            Docked at {dockedSection}
          </div>
        )}
      </div>

      <div className="cover-navigation">
        <div className="cover-nav-links">
          <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
          <Link to="/about" className={isActive("/about") ? "active" : ""}>About</Link>
          <Link to="/projects" className={isActive("/projects") ? "active" : ""}>Projects</Link>
          <Link to="/articles" className={isActive("/articles") ? "active" : ""}>Articles</Link>
          <Link to="/contact" className={isActive("/contact") ? "active" : ""}>Contact</Link>
        </div>
      </div>



      <div className="cover-divider"></div>
    </div>
  );
};

export default CoverPage;
