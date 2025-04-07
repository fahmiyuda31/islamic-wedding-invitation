import EventCards from '@/components/EventsCard'
import config from '@/config/config'
import { formatEventDate } from '@/lib/formatEventDate'
import { motion } from 'framer-motion'
import { Calendar, Clock, Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Sambutan() {

    const CountdownTimer = ({ targetDate }) => {
        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
        function calculateTimeLeft() {
            const difference = +new Date(targetDate) - +new Date();
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    menit: Math.floor((difference / 1000 / 60) % 60),
                    detik: Math.floor((difference / 1000) % 60),
                };
            }
            return timeLeft;
        }
        useEffect(() => {
            const timer = setInterval(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);
            return () => clearInterval(timer);
        }, [targetDate]);

        return (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {Object.keys(timeLeft).map((interval) => (
                    <motion.div
                        key={interval}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center p-3 bg-amber-600 backdrop-blur-sm rounded-xl border border-amber-100"
                    >
                        <span className="text-xl sm:text-2xl font-bold text-white">
                            {timeLeft[interval]}
                        </span>
                        <span className="text-xs text-white capitalize">{interval}</span>
                    </motion.div>
                ))}
            </div>
        );
    };

    const FloatingHearts = () => {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight
                        }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0, 1, 1, 0.5],
                            x: Math.random() * window.innerWidth,
                            y: -100
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "easeOut"
                        }}
                        className="absolute"
                    >
                        <Heart
                            className={`w-${Math.floor(Math.random() * 2) + 8} h-${Math.floor(Math.random() * 2) + 8} ${i % 3 === 0 ? 'text-amber-400' :
                                i % 3 === 1 ? 'text-pink-400' :
                                    'text-red-400'
                                }`}
                            fill="currentColor"
                        />
                    </motion.div>
                ))}
            </div>
        );
    };

    return (
        <>
            {/* Event Section */}
            <section id="bride" className="min-h-screen relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 container mx-auto px-4 py-20"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-4 mb-16"
                    >

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            style={{ marginTop: -50 }}
                            className="text-4xl md:text-5xl font-serif text-gray-800 leading-tight"
                        >
                            Pengantin perempuan
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-700 max-w-md mx-auto"
                        >
                            <p className='font-semibold text-lg'>
                                Anggrie Zulianie Putri
                            </p>
                            <p className='text-md'>
                                Putri Pertama dari Bapak Zaenal Zairi & Ibu Yulia Tahar
                            </p>
                            <div style={{ height: 30 }}></div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="flex items-center justify-center space-x-2"
                            >
                                <img
                                    src={config.data.brideImage}
                                    alt={config.data.brideImage}
                                    className="rounded-full"
                                    style={{ height: 300 }}
                                />
                            </motion.div>
                            <div style={{ height: 30 }}></div>
                        </motion.p>
                        <div style={{ height: 30 }}></div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-5xl font-serif text-gray-800 leading-tight"
                        >

                            Pengantin pria
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-700 max-w-md mx-auto"
                        >
                            <p className='font-semibold text-lg'>
                                Fahmi Yuda Fauzi
                            </p>
                            <p className='text-md'>
                                Putra Pertama dari Bapak Adi Rusyanto & Ibu Dedeh
                            </p>
                            <div style={{ height: 20 }}></div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="flex items-center justify-center space-x-2"
                            >
                                <img
                                    src={config.data.groomImage}
                                    alt={config.data.groomImage}
                                    className="rounded-full"
                                    style={{ height: 300 }}
                                />
                            </motion.div>
                            <div style={{ height: 20 }}></div>
                        </motion.p>

                    </motion.div>

                </motion.div>
            </section>
        </>
    )
}