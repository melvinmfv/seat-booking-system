import useBookingInfo from '@/hooks/booking';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BookingDrawer from '../BookingDrawer';
import { Input } from '../ui/input';
import useCredential from '@/hooks/credential';

const SeatGridPage = () => {
  const userInfo = useCredential();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      // redirect to login page
      navigate('/');
    }
  }, [userInfo, navigate]);
  const [searchParams] = useSearchParams();
  const seatNumber = searchParams.get('seatNumber');

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(
    seatNumber || null
  );
  const { handleCellClick } = useBookingInfo();
  const seats = Array.from({ length: 50 }, (_, index) => ({
    seatIndex: index + 1,
  }));

  const handleSeatClick = (seatIndex: string) => {
    setSelectedSeat(seatIndex);
    setIsDrawerOpen(true);
    handleCellClick(seatIndex);
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
            onClick={() => handleSeatClick(seat.seatIndex.toString())}
          >
            Seat {seat.seatIndex}
          </div>
        ))}
      </div>

      <BookingDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <h3 className='text-xl font-bold mb-4'>
          User Dany - Seat {selectedSeat}
        </h3>
        <div className='mb-4'>
          <label className='block mb-2'>Start Time</label>
          <Input type='datetime-local' />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>End Time</label>
          <Input type='datetime-local' />
        </div>
        <div className='text-center space-x-3'>
          <h3>Scan to checkin</h3>
          <QRCode
            value={`http://localhost:5173/booking?userId=${userInfo?.id}&seatNumber=${selectedSeat}`}
          />
        </div>
      </BookingDrawer>
    </div>
  );
};

export default SeatGridPage;
