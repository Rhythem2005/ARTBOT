import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Appcontext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    const [state, setstate] = useState('Login')
    const { setshowLogin, backendUrl, setToken, setUser } = useContext(Appcontext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false) 

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            if (state === 'Login') {
                const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setshowLogin(false)
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setshowLogin(false)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-xl bg-gradient-to-br from-gray-900/98 via-slate-900/98 to-black/98 flex justify-center items-center p-4'>
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-spin" style={{animationDuration: '20s'}}></div>
            </div>

            {/* Glassmorphism Container */}
            <div className='relative w-full max-w-md transform transition-all duration-700 ease-out'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-75 animate-pulse'></div>
                
                <form onSubmit={onSubmitHandler} className='relative bg-gray-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden'>
                    
                    {/* Floating Particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-4 left-4 w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
                        <div className="absolute top-8 right-8 w-1 h-1 bg-purple-300/60 rounded-full animate-ping delay-500"></div>
                        <div className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-blue-300/50 rounded-full animate-ping delay-1000"></div>
                    </div>

                    {/* Premium Header */}
                    <div className='relative px-8 py-8 bg-gray-800/50 text-white border-b border-gray-700/50'>
                        <div className='text-center space-y-4'>
                            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg'>
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h1 className='text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                                {state}
                            </h1>
                            <p className='text-gray-300 text-sm leading-relaxed'>
                                {state === 'Login' ? 'Welcome back to the premium experience' : 'Join our exclusive community today'}
                            </p>
                        </div>
                    </div>

                    {/* Premium Form Section */}
                    <div className='px-8 py-6 space-y-6 bg-gray-900/50'>
                        
                        {/* Name Field - Only for Sign Up */}
                        {state !== 'Login' && (
                            <div className='space-y-2 group'>
                                <label className='block text-sm font-semibold text-gray-300 group-focus-within:text-blue-400 transition-colors duration-300'>
                                    Full Name
                                </label>
                                <div className='relative'>
                                    <div className='absolute left-4 top-1/2 transform -translate-y-1/2 z-10'>
                                        <img src={assets.html} alt="" className='w-5 h-5 opacity-60' />
                                    </div>
                                    <input 
                                        onChange={e => setName(e.target.value)} 
                                        value={name} 
                                        className='w-full pl-12 pr-4 py-4 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:bg-gray-800/90 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all duration-300 hover:bg-gray-800/90 hover:border-gray-500/70' 
                                        type="text" 
                                        placeholder='Enter your full name' 
                                        required 
                                    />
                                    <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                                </div>
                            </div>
                        )}

                        {/* Email Field */}
                        <div className='space-y-2 group'>
                            <label className='block text-sm font-semibold text-gray-300 group-focus-within:text-blue-400 transition-colors duration-300'>
                                Email Address
                            </label>
                            <div className='relative'>
                                <div className='absolute left-4 top-1/2 transform -translate-y-1/2 z-10'>
                                    <img src={assets.email_icon} alt="" className='w-5 h-5 opacity-60' />
                                </div>
                                <input 
                                    onChange={e => setEmail(e.target.value)} 
                                    value={email} 
                                    className='w-full pl-12 pr-4 py-4 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:bg-gray-800/90 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all duration-300 hover:bg-gray-800/90 hover:border-gray-500/70' 
                                    type="email" 
                                    placeholder='Enter your email address' 
                                    required 
                                />
                                <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className='space-y-2 group'>
                            <label className='block text-sm font-semibold text-gray-300 group-focus-within:text-blue-400 transition-colors duration-300'>
                                Password
                            </label>
                            <div className='relative'>
                                <div className='absolute left-4 top-1/2 transform -translate-y-1/2 z-10'>
                                    <img src={assets.lock_icon} alt="" className='w-5 h-5 opacity-60' />
                                </div>
                                <input 
                                    onChange={e => setPassword(e.target.value)} 
                                    value={password} 
                                    className='w-full pl-12 pr-4 py-4 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:bg-gray-800/90 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all duration-300 hover:bg-gray-800/90 hover:border-gray-500/70' 
                                    type="password" 
                                    placeholder='Enter your password' 
                                    required 
                                />
                                <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                            </div>
                        </div>

                        {/* Forgot Password - Only for Login */}
                        {state === 'Login' && (
                            <div className='text-right'>
                                <p className='text-sm text-blue-400 hover:text-blue-300 cursor-pointer transition-colors duration-200 font-medium'>
                                    Forgot Password?
                                </p>
                            </div>
                        )}

                        {/* Premium Submit Button */}
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className={`relative w-full py-4 px-6 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 overflow-hidden group ${
                                isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-blue-500/25 hover:-translate-y-1'
                            }`}
                        >
                            <div className='absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-200 animate-gradient'></div>
                            <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                            <span className='relative z-10 flex items-center justify-center text-white'>
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        {state === 'Login' ? 'Sign In' : 'Create Account'}
                                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </>
                                )}
                            </span>
                        </button>

                        {/* Premium Toggle State */}
                        <div className='text-center pt-4'>
                            <div className='w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4'></div>
                            {state === 'Login' ? (
                                <p className='text-gray-300'>
                                    Don't have an account?{' '}
                                    <span 
                                        onClick={() => setstate('Sign Up')} 
                                        className='text-blue-400 hover:text-blue-300 font-semibold cursor-pointer transition-colors duration-200 hover:underline'
                                    >
                                        Join Now
                                    </span>
                                </p>
                            ) : (
                                <p className='text-gray-300'>
                                    Already have an account?{' '}
                                    <span 
                                        onClick={() => setstate('Login')} 
                                        className='text-blue-400 hover:text-blue-300 font-semibold cursor-pointer transition-colors duration-200 hover:underline'
                                    >
                                        Sign In
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Premium Close Button */}
                        <button
                        type="button"
                        onClick={() => setshowLogin(false)}
                        className='absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-700/50 hover:bg-gray-600/70 backdrop-blur-sm transition-all duration-300 hover:rotate-90 border border-gray-600/50 hover:border-gray-500/70'
                    >
                        <img src={assets.cross_icon} alt="Close" className='w-5 h-5 filter invert opacity-80' />
                    </button>
                </form>
            </div>

            <style jsx>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
                .bg-size-200 {
                    background-size: 200% 200%;
                }
            `}</style>
        </div>
    )
}

export default Login