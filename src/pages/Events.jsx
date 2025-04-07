import EventCards from '@/components/EventsCard'
import config from '@/config/config'
import { formatEventDate } from '@/lib/formatEventDate'
import { motion } from 'framer-motion'
import { Calendar, Clock, Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Events() {

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
            <section id="event" className="min-h-screen relative overflow-hidden">
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
                            style={{ marginTop:-50 }}
                            className="text-4xl md:text-5xl font-serif text-gray-800 leading-tight"
                        >
                            Rangkaian Acara Pernikahan
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-500 max-w-md mx-auto"
                        >
                            Kami Mengundang Anda untuk Merayakan Hari Istimewa Sebagai Awal Perjalanan Cinta Kami
                        </motion.p>

                        {/* Decorative Line */}
                        {/* <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center justify-center gap-4 mt-6"
                        >
                            <div className="h-[1px] w-12 bg-rose-200" />
                            <div className="text-rose-400">
                                <Heart className="w-4 h-4" fill="currentColor" />
                            </div>
                            <div className="h-[1px] w-12 bg-rose-200" />
                        </motion.div> */}
                    </motion.div>

                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100%", marginTop: -45 }}>
                        <div
                            onClick={() => {
                                // Membuka Google Kalender dengan tanggal tertentu
                                const tanggal = new Date(config?.data?.date);
                                const url = `https://calendar.google.com/calendar/u/0/r/day/${tanggal.getFullYear()}/${tanggal.getMonth() + 1}/${tanggal.getDate()}`;
                                window.open(url, '_blank');
                            }}
                            style={{ cursor: 'pointer' }}
                            className="px-4 py-1 text-sm font-bold bg-amber-600 text-white rounded-full border "
                        >Catat Tanggal
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="flex items-center justify-center space-x-2"
                        style={{ marginTop: 10 }}
                    >

                        <Calendar className="w-4 h-4 text-[#C58745]" />
                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                            {formatEventDate(config.data.date, "full")}
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        style={{ marginTop: 3 }}

                        className="flex items-center justify-center space-x-2"
                    >
                        <Clock className="w-4 h-4 text-[#C58745]" />
                        <span className="text-gray-700 font-medium text-sm sm:text-base">
                            {config.data.time}
                        </span>
                    </motion.div>

                    <CountdownTimer targetDate={config.data.date} />

                    <div
                        className="pt-6 relative"
                    >
                        <FloatingHearts />
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Heart className="w-10 sm:w-12 h-10 sm:h-12 text-rose-500 mx-auto" fill="currentColor" />
                        </motion.div>
                    </div>

                    {/* Events Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="max-w-2xl mx-auto"
                    >
                        <EventCards events={config.data.agenda} />
                    </motion.div>
                </motion.div>
            </section>
        </>
    )
}