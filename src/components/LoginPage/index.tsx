import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import useCredential from '@/hooks/credential';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  passowrd: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

const LogInPage = () => {
  const userInfo = useCredential();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      // redirect to booking page
      navigate('/booking');
    }
  }, [userInfo, navigate]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      passowrd: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className='m-auto w-full'>
      <h2 className='text-2xl font-bold'>Log In</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Username' {...field} />
                </FormControl>
                <FormMessage {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='passowrd'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  );
};
LogInPage.displayName = 'LogInPage';
export default LogInPage;
