import { useRouter } from 'next/router';
import React, { createContext, useState } from 'react';

interface LanguageDirectionContextProps {
  isRTL: boolean;
  setIsRTL: React.Dispatch<React.SetStateAction<boolean>>;
}

const LanguageDirectionContext = createContext<LanguageDirectionContextProps>({
  isRTL: false,
  setIsRTL: () => {},
});

const LanguageDirectionProvider: React.FC = ({ children }:any) => {
  const router = useRouter();
  const { locale } = router;
  const [selectedLocale, setSelectedLocale] = useState(locale);
  const [isRTL, setIsRTL] = useState(selectedLocale === 'ar');

  return (
    <LanguageDirectionContext.Provider value={{ isRTL, setIsRTL }}>
      {children}
    </LanguageDirectionContext.Provider>
  );
};

export { LanguageDirectionContext, LanguageDirectionProvider };