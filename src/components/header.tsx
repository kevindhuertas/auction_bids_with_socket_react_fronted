import React from 'react';

interface HeaderProps {
  participantCode: string| undefined;
}

const Header: React.FC<HeaderProps> = ({ participantCode }) => {
  return (
    <header className="flex justify-between items-center border-b pb-4 mb-2">
      {/* <div></div> */}
      <div className="text-2xl font-bold text-slate-800">Subasta de pinturas</div>
      <div className=" opacity-50">Cliente:{participantCode}</div>
    </header>
  );
}

export default Header;