import React, { useState, useEffect, useRef, useContext } from 'react';
import { Accessibility, TextFields, TextFieldsOutlined, BrightnessHigh, BrightnessLow, FormatSize, Contrast } from '@mui/icons-material';
import { Slider, Typography } from '@mui/material';
import { LanguageDirectionContext } from '@/helpers/langDirection';

const AccessibilityToggler: React.FC = () => {
  const [isIncreasedFont, setIsIncreasedFont] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(16);
  const [contrastLevel, setContrastLevel] = useState<number>(100);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const AccesibilityRef = useRef<HTMLDivElement>(null);
  const { isRTL } = useContext(LanguageDirectionContext);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (AccesibilityRef.current && !AccesibilityRef.current.contains(event.target as Node)) {
        toggleDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const savedFontSize = sessionStorage.getItem('fontSize');
    const savedContrastLevel = sessionStorage.getItem('contrastLevel');
    if (savedFontSize && savedContrastLevel) {
      setFontSize(Number(savedFontSize));
      setContrastLevel(Number(savedContrastLevel));
      setIsIncreasedFont(true);
    }
  }, []);

  useEffect(() => {
    if (isIncreasedFont) {
      document.documentElement.style.fontSize = `${fontSize}px`;
    } else {
      document.documentElement.style.fontSize = '16px';
    }
    sessionStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.filter = `contrast(${contrastLevel}%)`;
    sessionStorage.setItem('contrastLevel', contrastLevel.toString());
  }, [contrastLevel]);


  const handleFontSizeChange = (event: any, value: number | number[]) => {
    setIsIncreasedFont(true);
    setFontSize(value as number);
  };

  const handleContrastChange = (event: any, value: number | number[]) => {
    setContrastLevel(value as number);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  return (
    <div className="accessibility">
      <div className='relative'>

      <button
        className={`${isDropdownOpen ? 'text-pyellow hover:text-white' : 'text-white hover:text-pyellow'} ${isRTL? "pt-1.5": ""}`}
        onClick={toggleDropdown}
      >
        <Accessibility>
          {isDropdownOpen ? <TextFieldsOutlined /> : <TextFields />}
        </Accessibility>
      </button>
      {isDropdownOpen && (
        <div  className={` absolute mt-3 right-1 ml-0 mx-auto w-40 px-2 py-5 bg-black shadow-2xl border border-pgrey shadow-pgrey rounded shadow-lg z-10 text-white`}>
          <div className="dropdown-content w-full">
            <div className="font-size-slider flex flex flex-row items-center">
              <FormatSize className='mr-4'/>
              <Slider
                value={fontSize}
                min={12}
                max={24}
                step={1}
                onChange={handleFontSizeChange}
                aria-labelledby="font-size-slider"
                sx={{
                  color: "yellow",
                }}
              />
              <Typography variant="body2" className="font-size-label ml-4">
                {fontSize}px
              </Typography>
            </div>
            <div className="contrast-slider flex flex-row items-center">
              <Contrast className='mr-4'/>
              <Slider
                value={contrastLevel}
                min={75}
                max={125}
                step={5}
                onChange={handleContrastChange}
                aria-labelledby="contrast-slider"
                sx={{
                  color: "yellow",
                }}
              />
              <Typography variant="body2" className="contrast-label ml-4">
                {contrastLevel}%
              </Typography>
            </div>
          </div>
        </div>
      )}
        </div>
    </div>
  );
};

export default AccessibilityToggler;
