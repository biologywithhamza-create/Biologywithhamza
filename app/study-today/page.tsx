import {Header,Footer} from '../components';import {StudyToday} from './planner';
export const metadata={title:'Your Personal Biology Study Plan',description:'Plan daily Biology revision using due mistakes, chapter evidence and your available time.',alternates:{canonical:'/study-today'}};
export default function Page(){return <><Header/><main className="wrap feature-page next-page" id="main-content"><StudyToday/></main><Footer/></>;}
