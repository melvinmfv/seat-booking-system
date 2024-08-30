// src/components/LoginPage/index.tsx
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
// import useCredential from '@/hooks/credential';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserInfo } from '../../lib/session';
import { useUser } from '../../context/UserContent';

const formSchema = z.object({
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});
const LogInPage = () => {
  const { setUserInfo, userInfo } = useUser();
  // const userInfo = useCredential();
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
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/v1/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: values})
      });

      const userInfo = await response.json();
      if (userInfo.status === 'success') {
        saveUserInfo(userInfo);
        setUserInfo(userInfo);
        console.log('User info saved:', userInfo);
      } else {
        console.error('Login failed:', userInfo.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
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
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Password' {...field} />
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