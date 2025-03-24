import Hero from '@/pages/Hero'
import Events from '@/pages/Events'
import Location from '@/pages/Location';
import Wishes from '@/pages/Wishes';
import Gifts from '@/pages/Gifts';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// Main Invitation Content
export default function MainContent({ queryName }) {
    const firebaseConfig = {
        apiKey: "AIzaSyCsOl6VumRQASa8-JeRuhyl9AnIh2cORCA",
        authDomain: "weeding-invitation-ea6d3.firebaseapp.com",
        projectId: "weeding-invitation-ea6d3",
        storageBucket: "weeding-invitation-ea6d3.firebasestorage.app",
        messagingSenderId: "93125841445",
        appId: "1:93125841445:web:a04083afd1ab62738de5cc",
        measurementId: "G-JB4LPFJTMY"
    };

    const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);
    const db = getFirestore(app);
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