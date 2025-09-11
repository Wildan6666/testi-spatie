// resources/js/Pages/Auth/Login.jsx
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';


export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" 
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url('/assets/gerbang.jpg')`
            }}>
            
            <Head title="Login - JDIH Universitas Jambi" />
            
            {/* Header */}
            <div className="text-center pt-8 pb-6">
                <h1 className="text-3xl font-bold text-white drop-shadow-lg stroke-current">
                    Selamat Datang di
                </h1>
                <h2 className="text-3xl font-bold text-orange-400 drop-shadow-lg mt-1">
                    Jaringan Dokumentasi dan Informasi Hukum Universitas Jambi
                </h2>
            </div>

            {/* Login Form Container */}
            <div className="flex items-center justify-center px-4">
                <div className="bg-white bg-opacity-65 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md">
                    
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 text-center bg-green-50 p-3 rounded-lg">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        {/* Username Field */}
                        <div>
                            <InputLabel htmlFor="email" value="Masukkan Username" />
                            <TextInput
                                id="email"
                                type="text"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="User name"
                            />
                            <InputError message={errors.email} className="mt-1" />
                        </div>

<div className="mt-4">
<InputLabel htmlFor="password" value="Masukkan Password" />

<div className="relative">
    <TextInput
    id="password"
    type={showPassword ? 'text' : 'password'}
    name="password"
    value={data.password}
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10" 
    autoComplete="current-password"
    onChange={(e) => setData('password', e.target.value)}
    placeholder="Password"
    />

    {/* Icon Mata */}
    <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
    >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
</div>

<InputError message={errors.password} className="mt-1" />
</div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-gray-300 text-orange-600 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                                />
                                <span className="ml-2 text-gray-600">Remember me</span>
                            </label>
                            
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-orange-500 hover:text-orange-600 hover:underline transition-colors"
                                >
                                    Forgot Password?
                                </Link>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <PrimaryButton 
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition-colors justify-center" 
                                disabled={processing}
                            >
                                {processing ? 'Memproses...' : 'Masuk'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer spacing */}
            <div className="h-20"></div>
        </div>
    );
}