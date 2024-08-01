import { useEffect, useState } from 'react';
import { GRADIENT_CARDS } from '@/const'
import { getContrastColor } from '@/utils';

const getRandomGradient = () => {
    const randomIndex = Math.floor(Math.random() * GRADIENT_CARDS.length);
    return GRADIENT_CARDS[randomIndex];
  };

const useBackground = () => {

    //const [background, setBackground] = useState<string>('');
    //const [contrastColor, setContrastColor] = useState<string>('');

    const bg =  getRandomGradient();
    const contrast = getContrastColor(bg.start);
    // useEffect(() => {
    //   const gradient = 
    //   const contrastColor = getContrastColor(gradient.start);
  
    //   setBackground(gradient.name);
    //   setContrastColor(contrastColor);
    // }, []);
  
    return { background: bg.name, contrastColor: contrast };
  };
  
  export default useBackground;