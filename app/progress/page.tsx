import { Header, Footer } from "../components";
import { ProgressHome } from "./dashboard";
export const metadata={title:"My Progress",description:"Continue learning, find saved Biology guides, review mistakes and back up progress on this device.",alternates:{canonical:"/progress"},robots:{index:false,follow:true}};
export default function Page(){return <><Header/><main id="main-content" className="wrap student-progress"><ProgressHome/></main><Footer/></>;}
