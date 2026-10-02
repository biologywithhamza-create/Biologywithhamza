import Link from "next/link";
import {ContinueLearning} from "../recent-learning";
import {Header,Footer} from '../components';import {LearningDashboard} from './workspace';
export const metadata={title:'Your Biology Learning Workspace',description:'Chapter routes, saved guides, study notes and a revision planner.',alternates:{canonical:'/learn'}};
export default function Page(){return <><Header/><main id="main-content" className="wrap"><ContinueLearning/><div className="revision-workspace-link"><div><strong>Turn practice into a revision plan.</strong><p>Your missed questions, chapter feedback and scheduled reviews.</p></div><Link className="button button-dark" href="/revision">Open revision dashboard ↗</Link></div><LearningDashboard/></main><Footer/></>;}
