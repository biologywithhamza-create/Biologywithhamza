import { Header, Footer } from "../components";
import { LearningDashboard } from "./workspace";
export const metadata={title:"Browse Biology Chapters",description:"Choose MDCAT or Cambridge O Level, find your chapter and open its lessons, activities and practice.",alternates:{canonical:"/learn"}};
export default function Page(){return <><Header/><main id="main-content" className="wrap student-learn"><LearningDashboard/></main><Footer/></>;}
