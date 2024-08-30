import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const formSchema = z.object({
  seats: z.array(
    z.object({
      username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
      }),
      seatIndex: z.number().min(1).max(50),
    })
  ),
});

const SeatBookingPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      seats: Array.from({ length: 50 }, (_, index) => ({
        username: '',
        seatIndex: index + 1,
      })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: 'seats',
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className='m-auto w-full'>
      <h2 className='text-2xl font-bold'>Book Seats</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`seats.${index}.username`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default SeatBookingPage;