import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import Socials from "../components/about/socials";
import RocketGame from "../components/game/RocketGame";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/contact.css";

const Contact = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "contact");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Contact | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="contact" />
				<div className="content-wrapper">
					<div className="contact-logo-container">
						<div className="contact-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="contact-main-wrapper">
						<div className="contact-left-column">
							<div className="contact-container">
								<div className="title contact-title">
									Let's Connect
								</div>

								<div className="subtitle contact-subtitle">
									Thanks for stopping by! I'd love to hear from you about collaboration opportunities,
									project ideas, or just to say hello. The quickest way to reach me is via email at{" "}
									<a href={`mailto:${INFO.main.email}`}>
										{INFO.main.email}
									</a>.
									You can also connect with me on social media using the links below.
								</div>
							</div>

							<div className="socials-container">
								<div className="contact-socials">
									<Socials />
								</div>
							</div>
						</div>

						<div className="contact-right-column">
							<div className="game-wrapper">
								<RocketGame />
							</div>
						</div>
					</div>

					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Contact;
