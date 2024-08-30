// src/components/SeatGridPage/index.tsx
import * as React from 'react';
import BookingDrawer from '../BookingDrawer';
import { Input } from '../ui/input';

const SeatGridPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedSeat, setSelectedSeat] = React.useState<number | null>(null);

  const seats = Array.from({ length: 50 }, (_, index) => ({
    seatIndex: index + 1,
  }));

  const handleSeatClick = (seatIndex: number) => {
    setSelectedSeat(seatIndex);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedSeat(null);
  };

  return (
    <div className='m-auto w-full'>
      <h2 className='text-2xl font-bold mb-4'>Seat Grid</h2>
      <div className='grid grid-cols-5 gap-4'>
        {seats.map((seat) => (
          <div
            key={seat.seatIndex}
            className='border p-4 flex items-center justify-center cursor-pointer'
            onClick={() => handleSeatClick(seat.seatIndex)}
          >
            Seat {seat.seatIndex}
          </div>
        ))}
      </div>

      <BookingDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <h3 className='text-xl font-bold mb-4'>User Dany - Seat {selectedSeat}</h3>
        <div className='mb-4'>
          <label className='block mb-2'>Start Time</label>
          <Input type='datetime-local' />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>End Time</label>
          <Input type='datetime-local' />
        </div>
      </BookingDrawer>
    </div>
  );
};

export default SeatGridPage;