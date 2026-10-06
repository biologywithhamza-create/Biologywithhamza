import {Header,Footer} from '../components';
import {MockCentre} from './player';
export const metadata={title:'Biology Mock Centre',description:'81-question Biology practice mocks, chapter feedback and personalised daily retrieval sessions.',alternates:{canonical:'/mocks'}};
export default function Page(){return <><Header/><main id="main-content" className="wrap feature-page next-page"><MockCentre/></main><Footer/></>;}
