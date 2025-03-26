import Hero from '@/pages/Hero'
import Events from '@/pages/Events'
import Location from '@/pages/Location';
import Wishes from '@/pages/Wishes';
import Gifts from '@/pages/Gifts';
// import { getAnalytics } from "firebase/analytics";
// Main Invitation Content
export default function MainContent({ queryName, db }) {
    // const analytics = getAnalytics(app);
    const nameGuest = queryName ? queryName?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') : 'Tamu'

    return (
        <>
            <Hero queryName={nameGuest} />
            <Events />
            <Location />
            <Gifts />
            <Wishes db={db} queryName={nameGuest} />
        </>
    )
}