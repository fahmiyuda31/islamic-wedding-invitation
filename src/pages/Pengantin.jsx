import config from '@/config/config'
import { motion } from 'framer-motion'

export default function Sambutan() {

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
                           The Bride
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
                                Putri Pertama dari Bapak Zaenal Zairi & Ibu Yuliar Tahar
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
                                    style={{ height: 350 }}
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

                            The Groom
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
                                    style={{ height: 350 }}
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