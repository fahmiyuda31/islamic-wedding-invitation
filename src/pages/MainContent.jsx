import Hero from '@/pages/Hero'
import Events from '@/pages/Events'
import Location from '@/pages/Location';
import Wishes from '@/pages/Wishes';
import Gifts from '@/pages/Gifts';

// Main Invitation Content
export default function MainContent({queryName}) {
    return (
        <>
            <Hero queryName={queryName} />
            <Events />
            <Location />
            <Gifts />
            <Wishes />
        </>
    )
}