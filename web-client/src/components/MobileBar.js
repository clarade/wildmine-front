import React, { useState } from 'react';

import burgerLogo from '../assets/images/burger-icon.svg';
import MenuBurger from './MenuBurger';
import close from '../assets/images/icon-close.svg'

const MobileBar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return <div>
    <div
      className='fixed z-50 left-4 top-4 cursor-pointer bg-grey_light rounded-full h-[30px] w-[30px] flex justify-center'
      onClick={() => setOpenMenu(!openMenu)}
    >
      <img
        src={openMenu ? close : burgerLogo}
        alt="Ouvrir le menu"
        className='w-[20px]'
      />
    </div>

    {openMenu &&
      <MenuBurger setOpenMenu={setOpenMenu}/>
    }
  </div>;
};

export default MobileBar;