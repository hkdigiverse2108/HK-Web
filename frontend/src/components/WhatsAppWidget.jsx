import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

export default function WhatsAppWidget() {
  const { content } = useContent();

  // Helper to extract clean WhatsApp number from admin settings or fallback
  const getWhatsAppNumber = () => {
    // 1. Try first number inside whatsapp_numbers array
    const waList = content?.contact_settings?.whatsapp_numbers;
    if (waList && waList.length > 0 && waList[0].number) {
      return waList[0].number.replace(/\+/g, '').replace(/\s/g, '');
    }
    // 2. Try contact_settings phone
    const contactPhone = content?.contact_settings?.phone;
    if (contactPhone) {
      return contactPhone.replace(/\+/g, '').replace(/\s/g, '');
    }
    // 3. Try site_settings footer phone
    const footerPhone = content?.site_settings?.footer?.phone;
    if (footerPhone) {
      return footerPhone.replace(/\+/g, '').replace(/\s/g, '');
    }
    // 4. Default fallback admin number
    return "919876543210";
  };

  const number = getWhatsAppNumber();
  const waLink = `https://wa.me/${number}?text=Hi%20HariKrushn%20Team%2C%20I%20am%20interested%20in%20your%20services.`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
      className="fixed bottom-4 right-4 z-[999] flex items-center gap-2 select-none group"
    >
      {/* Speech Bubble Tooltip */}
      <div className="opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out flex items-center">
        <div className="bg-black/90 backdrop-blur-md border border-neutral-800 px-3.5 py-1.5 rounded-xl shadow-xl flex flex-col items-start min-w-[130px]">
          <span className="font-sans text-[9px] text-[#25D366] font-bold tracking-widest uppercase">Online</span>
          <span className="font-sans text-[10px] text-neutral-300 font-light mt-0.5 leading-snug">Chat on WhatsApp</span>
        </div>
        {/* Triangle arrow pointing right */}
        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-black/90 -ml-[1px]" />
      </div>

      {/* Floating 3D Button wrapper */}
      <motion.a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        animate={{
          y: [0, -6, 0]
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer relative transition-all duration-300"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(37, 211, 102, 0.3) 0%, rgba(10, 10, 12, 0.95) 75%)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(37, 211, 102, 0.25)',
          border: '1px solid rgba(37, 211, 102, 0.2)'
        }}
      >
        {/* Glow Effects */}
        <div className="absolute inset-0 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-[6px]"
          style={{
            boxShadow: '0 0 16px rgba(37, 211, 102, 0.5)'
          }}
        />
        <div className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-[#25D366]/40" />

        {/* 3D Mascot Image - overlapping the top boundary of the circle for a realistic 3D pop-out effect */}
        <img
          src="/media/images/mascot_whatsapp.png"
          alt="Chat Mascot"
          className="w-[56px] h-[56px] object-contain absolute bottom-1 transform group-hover:scale-115 group-hover:-translate-y-2 group-hover:rotate-3 transition-all duration-300 ease-out z-10"
        />

        {/* Small Green Online Badge */}
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#25D366] rounded-full border-2 border-[#0c0c0c] z-20 flex items-center justify-center">
          <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
        </div>
      </motion.a>
    </motion.div>
  );
}
