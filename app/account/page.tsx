import {Header,Footer} from '../components';
import {AccountWorkspace} from './workspace';
export const metadata={title:'Your Learning Account',description:'Optional email sign-in and complete learning-progress backup for Biology with Hamza.',alternates:{canonical:'/account'},robots:{index:false,follow:true}};
export default function Page(){return <><Header/><main id="main-content" className="wrap feature-page account-page"><header className="learning-heading"><p className="eyebrow">YOUR LEARNING, WITH YOU</p><h1>Pick up where you left off.</h1><p>Keep a complete backup, or use an optional online account to carry your progress between devices.</p></header><AccountWorkspace/></main><Footer/></>;}
