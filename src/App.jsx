import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import MainContent from '@/pages/MainContent';
import LandingPage from '@/pages/LandingPage';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import config from '@/config/config';
import LoginPage from './pages/login';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Dashboard from './pages/admin/dashboard';
import MainLayout from './pages/admin/layout';
import Guest from './pages/admin/guest';


function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  const queryName = queryParams.get('name');

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
  const auth = getAuth(app);

  useEffect(() => {
    const accessToken = localStorage.getItem('user');

    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{config.data.title}</title>
        <meta name="title" content={config.data.title} />
        <meta name="description" content={config.data.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={config.data.title} />
        <meta property="og:description" content={config.data.description} />
        <meta property="og:image" content={config.data.ogImage} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content={config.data.title} />
        <meta property="twitter:description" content={config.data.description} />
        <meta property="twitter:image" content={config.data.ogImage} />

        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href={config.data.favicon} />

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FDA4AF" /> Rose-300 color
      </Helmet>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AnimatePresence mode='wait'>
              {!isInvitationOpen ? (
                <LandingPage onOpenInvitation={() => setIsInvitationOpen(true)} />
              ) : (
                <Layout>
                  <MainContent queryName={queryName} db={db} />
                </Layout>
              )}
            </AnimatePresence>
          } />

          <Route path="/login" element={
            <LoginPage
              auth={auth}
              signInWithEmailAndPassword={signInWithEmailAndPassword}
            />
          } />

          <Route
            path="/guest"
            element={
              isAuthenticated ? (
                <>
                  {/* <Dashboard /> */}
                  <MainLayout db={db} />
                </>
              ) : (
                <LoginPage
                  auth={auth}
                  signInWithEmailAndPassword={signInWithEmailAndPassword}
                />
              )
            }
          />


          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <>
                  {/* <Dashboard /> */}
                  <MainLayout />
                </>
              ) : (
                <LoginPage
                  auth={auth}
                  signInWithEmailAndPassword={signInWithEmailAndPassword}
                />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;