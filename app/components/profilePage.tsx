import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
 
 export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.slice(1); // убираем #
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    scrollToHash();
  }, [pathname]); 

  return null;
}