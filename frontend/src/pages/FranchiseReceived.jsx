import React, { useEffect } from 'react';

export default function FranchiseReceived() {
  useEffect(() => {
    document.title = "Franchise Enquiry Received — HK DigiVerse LLP";
    if (typeof window !== 'undefined' && window.location.pathname.endsWith('.html')) {
      window.history.replaceState(null, '', window.location.pathname.replace(/\.html$/, '') + window.location.search + window.location.hash);
    }
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', overflow: 'hidden', backgroundColor: '#030405', zIndex: 99999 }}>
      <iframe
        src="/franchise-received.html"
        title="Franchise Enquiry Received — HK DigiVerse LLP"
        style={{ border: 'none', width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
}
