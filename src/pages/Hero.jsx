import { Calendar, Clock, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import config from '@/config/config';
import { formatEventDate } from '@/lib/formatEventDate';
import { safeBase64 } from '@/lib/base64';
import { Button } from 'antd';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';
import moment from 'moment';

export default function Hero(
    { queryName }
) {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const guestParam = urlParams.get('guest');

        if (guestParam) {
            try {
                const decodedName = safeBase64.decode(guestParam);
                setGuestName(decodedName);
            } catch (error) {
                console.error('Error decoding guest name:', error);
                setGuestName('');
            }
        }
    }, []);

    const downloadElement = (dataGuest) => {
        const element = document.getElementById('element-to-download');
        html2canvas(element).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = `invitation ${dataGuest}.png`;
            link.click();
        });
    };

    return (
        <>
            <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:py-10 text-center relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 relative z-10"
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="relative max-w-md mx-auto"
                    >

                        <div className="absolute inset-0 bg-gradient-to-b from-[#C58745]-50/50 to-white/50 backdrop-blur-md rounded-2xl" />

                        <div className="relative px-4 sm:px-8 py-8 sm:py-10 rounded-2xl border border-[#C58745]-100/50">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px">
                                <div className="w-20 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-[#C58745]-200 to-transparent" />
                            </div>

                            <div className="space-y-0 text-center">
                                <div className="space-y-3">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="inline-block mx-auto"

                                    >
                                        <div className="space-y-2" style={{ marginTop: -25 }}>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                                className="text-gray-600 font-light italic text-base sm:text-md"
                                            >
                                                InsyaAllah Kami Akan Menikah
                                            </motion.p>
                                            <motion.h2
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.6 }}
                                                style={{marginTop:-3,}}
                                                className="text-3xl sm:text-4xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-[#C58745] to-orange-600"
                                            >
                                                {config.data.brideName} & {config.data.groomName}
                                            </motion.h2>

                                            <div className="space-y-2 text-center">
                                                <div className="space-y-3">
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 1 }}
                                                        className="flex items-center justify-center space-x-2"
                                                    >
                                                        <img
                                                            src={config.data.groomBridgeImage}
                                                            alt={config.data.groomName + " & " + config.data.brideName}
                                                            className="rounded-full"
                                                            style={{ height: 300 }}
                                                        />
                                                    </motion.div>
                                                </div>

                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 1.1 }}
                                                    className="space-y-1"
                                                >
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.1 }}
                                    className="space-y-1"
                                >
                                    <p className="text-gray-500 font-serif italic text-sm">
                                        Kepada Yth.
                                    </p>
                                    <p className="text-gray-600 font-medium text-sm">
                                        Bapak/Ibu/Saudara/i
                                    </p>
                                    <div style={{ height: 10 }}></div>
                                    {
                                        queryName ?
                                            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "100%" }} id="element-to-download">
                                                <div style={{ textAlign: "center", width: '100%', padding: 20, borderRadius: 10, boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                                                    <p className="text-orange-500 font-semibold text-lg" style={{ marginTop: -15 }}>
                                                        {queryName ? queryName : "Tamu"}
                                                    </p>
                                                    <div style={{ height: 10 }}></div>
                                                    <QRCode
                                                        value={queryName}
                                                        style={{ maxWidth: '100%', width: '100%' }}
                                                    />
                                                    <div style={{ height: 10 }}></div>
                                                    <p>Tunjukan QR ini pada petugas, untuk ditukar dengan souvenir</p>
                                                </div>

                                            </div>
                                            : null
                                    }
                                    <Button type="primary" style={{ width: '100%', fontSize: 20, padding: 20 }} onClick={() => downloadElement(queryName)}>Download QR</Button>
                                </motion.div>
                            </div>

                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-px">
                                <div className="w-20 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
                            </div>
                        </div>

                        <div className="absolute -top-2 -right-2 w-16 sm:w-24 h-16 sm:h-24 bg-amber-100/20 rounded-full blur-xl" />
                        <div className="absolute -bottom-2 -left-2 w-16 sm:w-24 h-16 sm:h-24 bg-amber-100/20 rounded-full blur-xl" />
                    </motion.div>
                   
                </motion.div>
            </section>
        </>
    )
}
