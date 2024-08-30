import { useState } from 'react';

type BookingInfo = {
  timesheet: string;
  isAvailable: boolean;
};

type UserInfo = {
  name: string;
  email: string;
};

const useBookingInfo = () => {
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const handleCellClick = async (cellIndex: string) => {
    // Fetch booking info based on cell index
    const fetchedInfo = await fetchBookingInfo(cellIndex);
    // Set booking info state
    setUserInfo(fetchedInfo.userInfo);
    setBookingInfo({
      timesheet: fetchedInfo.timesheet,
      isAvailable: !!fetchedInfo.timesheet,
    });
  };

  const fetchBookingInfo = async (
    cellIndex: string
  ): Promise<{ userInfo: UserInfo; timesheet: string }> => {
    return {
      userInfo: { name: 'Melvin', email: 'nguyen.tuan.dat@moneyforward.co.jp' },
      timesheet: `Timesheet for cell ${cellIndex}`,
    };
  };

  return {
    userInfo,
    bookingInfo,
    handleCellClick,
  };
};

export default useBookingInfo;
