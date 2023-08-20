import React, { useState, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { Language } from '@mui/icons-material';
import classNames from 'classnames';

const LanguageSwitcher: React.FC = () => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { locale }:any = router;
  const [selectedLocale, setSelectedLocale] = useState<string>(locale);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (event:any) => {
    const newLocale = event.target.value;
    setSelectedLocale(newLocale);

    router.replace(router.pathname, router.asPath, { locale: newLocale });
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const isRTL = selectedLocale === 'ar';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);

  return (
    <div className={classNames({ 'text-right': isRTL, 'english': selectedLocale === 'en', 'arabic': selectedLocale === 'ar' })}>
      <div className="relative">
        <button
          
          onClick={toggleOptions}
          className={`${showOptions ? "text-pyellow" : "text-white"}   py-5 px-2 pl-8 hover:text-pyellow`}
        >
          <Language className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none " />
        </button>
        {showOptions && (
          <div ref={optionsRef} className="absolute mt-2 right-1 py-2 w-32 bg-primary text-white border border-pgrey rounded shadow shadow-pyellow z-10">
            <button
              onClick={() => handleLanguageChange({ target: { value: 'en' } })}
              className="block w-full px-4 py-2 text-sm text-left hover:bg-pyellow hover:text-primary focus:outline-none"
            >
              {formatMessage({ id: 'language.english' })}
            </button>
            <button
              onClick={() => handleLanguageChange({ target: { value: 'ar' } })}
              className="block w-full px-4 py-2 text-sm text-left hover:bg-pyellow hover:text-primary focus:outline-none"
            >
              {formatMessage({ id: 'language.arabic' })}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSwitcher;