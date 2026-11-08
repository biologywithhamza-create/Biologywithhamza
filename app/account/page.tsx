import Link from "next/link";
import {Header,Footer} from '../components';
import {AccountWorkspace} from './workspace';
export const metadata={title:'Back Up Saved Progress',description:'Download and restore your Biology learning progress, notes and quiz records.',alternates:{canonical:'/account'},robots:{index:false,follow:true}};
export default function Page(){return <><Header/><main id="main-content" className="wrap feature-page account-page"><Link className="student-back" href="/progress">← My Progress</Link><header className="learning-heading"><p className="eyebrow">SAVED PROGRESS</p><h1>Back up your learning.</h1><p>Download your progress before changing devices or clearing browser data. Restore a backup here to continue.</p></header><AccountWorkspace/></main><Footer/></>;}
