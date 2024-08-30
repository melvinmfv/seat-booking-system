import useBookingInfo from "@/hooks/booking";
import { memo, useState } from "react";
import QRCode from "react-qr-code";
import { useSearchParams } from "react-router-dom";
import BookingDrawer from "../BookingDrawer";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useUser } from "@/context/UserContent";

const formSchema = z.object({
  startDate: z.string().min(2, {
    message: "Start date is required.",
  }),
  endDate: z.string().min(2, {
    message: "End date is required.",
  }),
});

const SeatGridPage = memo(() => {
  const {userInfo} = useUser();

  const [searchParams] = useSearchParams();
  const seatNumber = searchParams.get("seatNumber");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(
    seatNumber || null
  );
  const { handleCellClick } = useBookingInfo();
  const seats = Array.from({ length: 50 }, (_, index) => ({
    seatIndex: index + 1,
  }));
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
    },
  });

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
    <div className="m-auto w-full">
      <h2 className="text-2xl font-bold mb-4">Seat Grid</h2>
      <div className="grid grid-cols-5 gap-4">
        {seats.map((seat) => (
          <div
            key={seat.seatIndex}
            className="border p-4 flex items-center justify-center cursor-pointer"
            onClick={() => handleSeatClick(seat.seatIndex.toString())}
          >
            Seat {seat.seatIndex}
          </div>
        ))}
      </div>

      <BookingDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <div className="space-y-6">
          <h3 className="text-xl font-bold mb-4">
            {userInfo?.user.email} <br />
            Seat {selectedSeat}
          </h3>
          <Form {...form}>
            <form
              // onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <div className="text-center space-x-3">
            <h3>Scan to checkin</h3>
            <QRCode
              value={`https://seat-booking-system-suee.vercel.app/checkin/${selectedSeat}`}
            />
          </div>
        </div>
      </BookingDrawer>
    </div>
  );
});

export default SeatGridPage;
