import config from '@/config/config';
import { motion } from 'framer-motion'
import {
    Copy,
    Gift,
    CheckCircle,
    Wallet,
    Building2,
    BookImage
} from 'lucide-react'
import { useState, useEffect } from 'react';

export default function OurGallery() {
    const [copiedAccount, setCopiedAccount] = useState(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    // Set animation to run once on component mount
    useEffect(() => {
        setHasAnimated(true);
    }, []);

    const copyToClipboard = (text, bank) => {
        navigator.clipboard.writeText(text);
        setCopiedAccount(bank);
        setTimeout(() => setCopiedAccount(null), 2000);
    };

    return (<>
        <section id="gallery" className="min-h-screen relative overflow-hidden">
            <div className="container mx-auto px-4 py-20 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-4 mb-16"
                    style={{ marginTop: -50 }}

                >
                    {/* <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="inline-block text-amber-500 font-medium"
                    >
                        Hadiah Pernikahan
                    </motion.span> */}

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-serif text-gray-800"
                    >
                        Our Gallery
                    </motion.h2>

                    {/* Decorative Divider */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={hasAnimated ? { scale: 1 } : {}}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <div className="h-[1px] w-12 bg-amber-200" />
                        <BookImage className="w-5 h-5 text-amber-400" />
                        <div className="h-[1px] w-12 bg-amber-200" />
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={hasAnimated ? { scale: 1 } : {}}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <video src="/fix_video.MOV" className="w-4/5" controls onClick={() => {
                            const video = document.querySelector('video[src="/fix_video.MOV"]');
                            video.muted = true;
                            video.requestFullscreen();
                        }} />
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={hasAnimated ? { scale: 1 } : {}}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <img style={{ cursor: 'pointer' }} src="/photo_1.jpg" alt="Our Gallery" className="w-4/5" onClick={() => {
                            const img = document.querySelector('img[src="/photo_1.jpg"]');
                            img.requestFullscreen();
                        }} />
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={hasAnimated ? { scale: 1 } : {}}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <img style={{ cursor: 'pointer' }} src="/photo3.jpg" alt="Our Gallery2" className="w-4/5" onClick={() => {
                            const img = document.querySelector('img[src="/photo3.jpg"]');
                            img.requestFullscreen();
                        }} />
                    </motion.div>

                </motion.div>
            </div>
        </section>
    </>)
}