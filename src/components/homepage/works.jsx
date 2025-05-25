import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Activities & Leadership"
				body={
					<div className="works-body">
						<div className="work">
							<img
								src="./wicys.png"
								alt="WiCyS"
								className="work-image"
							/>
							<div className="work-title">WiCyS Coimbatore</div>
							<div className="work-subtitle">
								Executive Member
							</div>
							<div className="work-duration">Sept 2023 - Present</div>
						</div>

						<div className="work">
							<img
								src="./cybereach.png"
								alt="CybeReach"
								className="work-image"
							/>
							<div className="work-title">CybeReach</div>
							<div className="work-subtitle">
								Content Curator
							</div>
							<div className="work-duration">Sept 2023 - Present</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Works;
