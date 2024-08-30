// src/components/ui/Drawer.tsx
import * as React from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BookingDrawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex'>
      <div className='fixed inset-0 bg-black opacity-50' onClick={onClose} />
      <div className='relative bg-white w-80 p-4'>
        <button onClick={onClose} className='absolute top-2 right-2'>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default BookingDrawer;