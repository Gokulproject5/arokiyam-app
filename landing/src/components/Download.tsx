import { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';
import { FaWindows, FaApple, FaMicrosoft } from 'react-icons/fa';

import { useGitHubRelease } from '@/hooks/useGitHubRelease';
import Image from 'next/image';

export default function Download() {
  const { version } = useGitHubRelease();
  const [userOS, setUserOS] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('mac')) setUserOS('macos');
    else if (ua.includes('linux')) setUserOS('linux');
    else if (ua.includes('win')) setUserOS('windows');
  }, []);

  const cleanVersion = version.replace(/^v/, '');

  const platforms = [
    {
      id: 'linux',
      name: 'Linux',
      desc: 'Ubuntu, Debian, Fedora',
      icon: <Image src="https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg" alt="Linux" width={128} height={128} className="w-24 h-24 md:w-32 md:h-32" unoptimized />,
      buttons: [
        { label: '.AppImage', sub: 'Universal Linux', url: `https://github.com/anburocky3/arokiyam-app/releases/download/${version}/arokiyam-${cleanVersion}.AppImage`, primary: true },
      ]
    },
    {
      id: 'windows',
      name: 'Windows',
      desc: 'Windows 10, 11',
      icon: <FaWindows className="w-24 h-24 md:w-32 md:h-32 text-[#0078d4]" />,
      buttons: [
        { label: 'Windows', sub: 'Direct Download (.exe)', url: `https://github.com/anburocky3/arokiyam-app/releases/download/${version}/arokiyam-${cleanVersion}-setup.exe`, primary: true },
        { label: 'Microsoft Store', sub: 'Get it from Microsoft', url: 'https://apps.microsoft.com/detail/9PMHGHJ75CWG?hl=en-us&gl=IN&ocid=pdpshare', primary: false, btnIcon: <FaMicrosoft size={22} /> }
      ]
    },

    {
      id: 'macos',
      name: 'Mac',
      desc: 'macOS 11.0+',
      icon: <FaApple className="w-24 h-24 md:w-32 md:h-32 text-white" />,
      buttons: [
        { label: 'Mac', sub: 'macOS 11.0+', url: `https://github.com/anburocky3/arokiyam-app/releases/download/${version}/arokiyam-${cleanVersion}.dmg`, primary: true }
      ]
    }
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-linear-to-r from-blue-900/80 via-indigo-800 to-violet-950/80 text-white" id="download" style={{ scrollMarginTop: '60px' }}>
      {/* Ambient background glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-250 h-100 rounded-full blur-[120px] opacity-[0.2] pointer-events-none"
        style={{ background: 'var(--accent-primary)' }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">Download Arokiyam</h2>
          <p className="text-lg opacity-80 text-blue-100">Free and open source. Available on all major platforms.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {platforms.map((platform) => {
            const isDetected = mounted && userOS === platform.id;
            return (
              <div
                key={platform.id}
                className={`flex flex-col items-center transition-all duration-300 ${isDetected ? 'scale-105' : 'opacity-80'}`}
              >
                {/* Platform Icon */}
                <div className="mb-10 flex items-center justify-center p-4">
                  {platform.icon}
                </div>

                {/* Download Buttons Area */}
                <div className="flex flex-col justify-center gap-4 w-full max-w-[320px] px-2">
                  {platform.buttons.map((btn, idx) => {
                    const highlight = isDetected && btn.primary;
                    
                    return (
                    <a
                      key={idx}
                      href={btn.url}
                      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group/btn border ${highlight
                          ? 'bg-linear-to-r from-cyan-500 to-blue-600 border-transparent shadow-[0_15px_30px_-10px_rgba(6,182,212,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(6,182,212,0.6)] hover:-translate-y-1'
                          : 'bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/25 hover:-translate-y-0.5'
                        }`}
                    >
                      <div className={`p-3 rounded-xl transition-colors shrink-0 ${highlight ? 'bg-white/20' : 'bg-white/10 text-white/80'}`}>
                        {btn.btnIcon ? btn.btnIcon : <FiDownload size={22} strokeWidth={2.5} className="group-hover/btn:translate-y-0.5 transition-transform" />}
                      </div>
                      <div className="text-left flex-1">
                        <div className={`text-lg font-bold leading-tight mb-0.5 ${highlight ? 'text-white' : 'text-white/90'}`}>{btn.label}</div>
                        <div className={`text-[0.7rem] font-semibold uppercase tracking-wider ${highlight ? 'text-cyan-100' : 'text-white/50'}`}>
                          {btn.sub}
                        </div>
                      </div>
                    </a>
                    )
                  })}
                </div>

                {isDetected && (
                  <div className="mt-4 text-[0.75rem] font-bold text-cyan-300 uppercase tracking-widest animate-pulse">
                    Recommended for your system
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-24 text-center">
          <p className="text-sm text-blue-200/60">
            Latest Version: <span className="font-mono text-white">{version}</span> •
            <a href="https://github.com/anburocky3/arokiyam-app/releases" target="_blank" className="ml-2 text-cyan-300 hover:text-white transition-colors hover:underline">Release Notes</a>
          </p>
        </div>
      </div>
    </section>
  );
}
