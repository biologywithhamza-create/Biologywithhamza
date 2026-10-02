import {ContinueLearning} from "../recent-learning";
import {Header,Footer} from '../components';import {LearningDashboard} from './workspace';
export const metadata={title:'Your Biology Learning Workspace',description:'Chapter routes, saved guides, study notes and a revision planner.',alternates:{canonical:'/learn'}};
export default function Page(){return <><Header/><main id="main-content" className="wrap"><ContinueLearning/><LearningDashboard/></main><Footer/></>;}
