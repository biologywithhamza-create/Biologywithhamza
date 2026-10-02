import {Header,Footer} from '../components';
import {RevisionDashboard} from './dashboard';
export const metadata={title:'Your Revision Dashboard',description:'Review missed questions, track chapter accuracy and plan spaced practice with Biology with Hamza.',alternates:{canonical:'/revision'}};
export default function Page(){return <><Header/><main className="wrap revision-page" id="main-content"><RevisionDashboard/></main><Footer/></>;}
