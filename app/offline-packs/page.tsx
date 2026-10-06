import {Header,Footer} from '../components';import {OfflinePacks} from './packs';
export const metadata={title:'Download Offline Biology Study Packs',description:'Download standalone chapter notes and interactive MCQs to study without internet.',alternates:{canonical:'/offline-packs'}};
export default function Page(){return <><Header/><main className="wrap feature-page next-page" id="main-content"><OfflinePacks/></main><Footer/></>;}
