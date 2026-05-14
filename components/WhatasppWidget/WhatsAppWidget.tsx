'use client'
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image'; 
import { X, Send, Smile } from 'lucide-react'; 

interface WhatsAppWidgetProps {
  phoneNumber?: string; // Format: country code + number (e.g., "919876543210")
}

const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ 
  phoneNumber = "919217369035", // Replace with DIMTECH's actual WhatsApp number
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Check scroll position to toggle visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        if (isOpen) setIsOpen(false); 
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [isOpen]);

  // Handle sending a message (either typed or via quick action button)
  const handleSend = (e?: React.FormEvent, customMessage?: string) => {
    e?.preventDefault();
    const textToSend = customMessage || message;
    if (!textToSend.trim()) return;

    // Clean phone number and encode message
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
    const encodedMessage = encodeURIComponent(textToSend.trim());
    
    // Open WhatsApp in a new tab
    window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage}`, '_blank');
    
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div 
      className={`fixed bottom-24 right-8 z-50 flex flex-col items-end transition-all duration-300 ${
        isVisible 
          ? 'translate-y-0 opacity-100 pointer-events-auto' 
          : 'translate-y-10 opacity-0 pointer-events-none'
      }`}
    >
      
      {/* --- Chat Window --- */}
      <div 
        className={`mb-4 w-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-[#E5DDD5] shadow-2xl origin-bottom-right transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d0c9c0' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {/* Header - Custom DIMTech styling (Dark Teal) */}
        <div className="flex items-center justify-between bg-[#075E54] px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            
            {/* --- ACTUAL PNG LOGO --- */}
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
              <Image 
                src="/images/chatLogo.png" 
                alt="DIMTech Logo"
                width={100}
                height={100}
                // scale-[1.2] zooms in by 20% to hide the built-in white padding from the PNG!
                // If it's still slightly too small, change it to scale-[1.3] or scale-125
                className="h-10 w-10 object-cover pt-2.5 scale-[2.5]" 
              />
            </div>
            {/* ----------------------- */}

            <div className="flex flex-col">
              <h3 className="text-[17px] font-semibold leading-tight tracking-wide">DIMTech</h3>
              <p className="text-[13px] text-slate-200">Best MBA Institute in Greater Noida</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1.5 transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close chat"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>

        {/* Chat Body Area */}
        <div className="flex flex-col gap-3 p-4 pb-2">
          
          {/* Message 1 */}
          <div className="relative ml-2 max-w-[90%] self-start rounded-lg rounded-tl-none bg-white p-3 text-[15px] text-slate-800 shadow-sm before:absolute before:-left-2 before:top-0 before:h-0 before:w-0 before:border-b-[12px] before:border-r-[12px] before:border-b-transparent before:border-r-white">
            Welcome to Divine Institute of Management & Technology | MBA MCA BCA BBA Course Mentorship, Enroll in Top B-School
          </div>

          {/* Message 2 with Action Button */}
          <div className="relative ml-2 max-w-[85%] self-start rounded-lg rounded-tl-none bg-white p-3 text-[15px] text-slate-800 shadow-sm before:absolute before:-left-2 before:top-0 before:h-0 before:w-0 before:border-b-[12px] before:border-r-[12px] before:border-b-transparent before:border-r-white">
            <p className="mb-3">Get an Expert Guidance Now</p>
            <button
              onClick={(e) => handleSend(e, "Yes, I would like expert guidance.")}
              className="w-full rounded-md border border-[#3b82f6] bg-white py-1.5 text-[15px] font-medium text-[#3b82f6] transition-colors hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Yes
            </button>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-3 pt-0">
          <form 
            onSubmit={(e) => handleSend(e)} 
            className="flex items-center gap-2"
          >
            {/* Pill-shaped input container */}
            <div className="flex h-12 flex-1 items-center rounded-full bg-white px-4 shadow-sm">
              <Smile className="mr-3 h-6 w-6 text-slate-400" strokeWidth={1.5} />
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Send a message"
                className="w-full flex-1 bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
            
            {/* Send Button */}
            <button
              type="submit"
              disabled={!message.trim()}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#075E54] text-white shadow-sm transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#075E54] focus:ring-offset-2 focus:ring-offset-[#E5DDD5] disabled:opacity-70 disabled:hover:scale-100"
              aria-label="Send message"
            >
              <Send className="ml-0.5 h-5 w-5" /> 
            </button>
          </form>
        </div>
      </div>

      {/* --- Floating Toggle Button --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close WhatsApp Chat" : "Open WhatsApp Chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:-translate-y-1 hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      >
        {isOpen ? (
          <X className="h-7 w-7" strokeWidth={2.5} />
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        )}
      </button>

    </div>
  );
};

export default WhatsAppWidget;