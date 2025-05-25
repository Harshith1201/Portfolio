import React from "react";

function article_1() {
	return {
		date: "15 May 2024",
		title: "Understanding Modern Cybersecurity Threats",
		description:
			"An in-depth look at the evolving landscape of cybersecurity threats in 2024, including ransomware, phishing attacks, and zero-day vulnerabilities. Learn about the latest attack vectors and how organizations can protect themselves.",
		keywords: [
			"Cybersecurity",
			"Ransomware",
			"Phishing",
			"Zero-day vulnerabilities",
			"Harshith Gangisetty",
		],
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.article-image {
					align-self: center;
					max-width: 100%;
					height: auto;
					margin: 20px 0;
					border-radius: 8px;
				}

				.paragraph {
					text-align: justify;
					margin-bottom: 15px;
					line-height: 1.6;
				}

				.article-heading {
					font-size: 24px;
					font-weight: bold;
					margin: 25px 0 15px 0;
					width: 100%;
				}
				`,
		body: (
			<React.Fragment>
				<div className="article-content">
					<div className="paragraph">
						In today's interconnected digital landscape, cybersecurity threats are evolving at an unprecedented pace. Organizations and individuals alike must stay vigilant and informed about the latest attack vectors and protection strategies.
					</div>
					<div className="article-heading">The Rise of Sophisticated Ransomware</div>
					<div className="paragraph">
						Ransomware attacks have become more targeted and devastating, with attackers focusing on critical infrastructure and large organizations. The emergence of Ransomware-as-a-Service (RaaS) has lowered the barrier to entry for cybercriminals, leading to more frequent and sophisticated attacks.
					</div>
					<img
						src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
						alt="Cybersecurity concept"
						className="article-image"
					/>
					<div className="article-heading">Advanced Phishing Techniques</div>
					<div className="paragraph">
						Phishing attacks continue to be one of the most common entry points for attackers. Modern phishing campaigns are increasingly sophisticated, using AI to craft personalized messages and leveraging social engineering tactics to bypass traditional security measures.
					</div>
				</div>
			</React.Fragment>
		),
	};
}

function article_2() {
	return {
		date: "10 April 2024",
		title: "The Role of AI in Modern Cybersecurity",
		description:
			"Exploring how artificial intelligence and machine learning are revolutionizing cybersecurity defenses and threat detection. Learn about the benefits and challenges of implementing AI-powered security solutions.",
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.article-image {
					align-self: center;
					max-width: 100%;
					height: auto;
					margin: 20px 0;
					border-radius: 8px;
				}

				.paragraph {
					text-align: justify;
					margin-bottom: 15px;
					line-height: 1.6;
				}

				.article-heading {
					font-size: 24px;
					font-weight: bold;
					margin: 25px 0 15px 0;
					width: 100%;
				}
				`,
		keywords: [
			"Artificial Intelligence",
			"Cybersecurity",
			"Machine Learning",
			"Threat Detection",
			"Harshith Gangisetty",
		],
		body: (
			<React.Fragment>
				<div className="article-content">
					<div className="paragraph">
						As cyber threats become more sophisticated, traditional security measures are often insufficient. Artificial intelligence and machine learning technologies are emerging as powerful tools in the cybersecurity arsenal, enabling more proactive and adaptive defense mechanisms.
					</div>
					<div className="article-heading">AI-Powered Threat Detection</div>
					<div className="paragraph">
						Machine learning algorithms can analyze vast amounts of data to identify patterns and anomalies that might indicate a security breach. Unlike rule-based systems, AI can adapt to new threats and detect previously unknown attack vectors, significantly reducing the time to detect and respond to incidents.
					</div>
					<img
						src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
						alt="AI and Cybersecurity"
						className="article-image"
					/>
				</div>
			</React.Fragment>
		),
	};
}

const myArticles = [article_1, article_2];

export default myArticles;
