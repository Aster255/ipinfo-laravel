import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import axios from 'axios';
import { Head, Link, useForm,router } from '@inertiajs/react';
import { useState, useEffect} from 'react';
export default function Login({errors,status, canResetPassword }) {
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");

    const submit = (e) => {
        e.preventDefault();
        router.post(route('login'), {
            email,password
        });
    };

    const generateTestUser = () => {

    axios.post(route('generate-user'), {}, {
    }).then((response) => {
        setEmail(response.data.email);
        setPassword("password");
    });
    };

    useEffect(() => {
        
    }, []);

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )}
                    <PrimaryButton className="ms-4">
                        Log in
                    </PrimaryButton>
                </div>
            </form>

            <PrimaryButton type="submit" onClick={() => generateTestUser()}>Generate Test Credentials</PrimaryButton>
        </GuestLayout>
    );
}
