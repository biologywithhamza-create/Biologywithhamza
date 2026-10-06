import {Header,Footer} from '../components';import {PracticalStudio} from './studio';
export const metadata={title:'Practical & Diagram Studio',description:'Original Cambridge Biology practice: graphs, magnification, experimental planning, diagrams and biological pathways.',alternates:{canonical:'/practical-studio'}};
export default function Page(){return <><Header/><main id="main-content" className="wrap feature-page next-page"><PracticalStudio/></main><Footer/></>;}
