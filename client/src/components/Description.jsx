import React from 'react'
import { assets } from '../assets/assets'

const Description = () => {
    return (
        <div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
            <h1 className='text-3xl sm:text-4xl font-semibold'>Create AI Images</h1>
            <p className='text-gray-500 mb-8'>Turn your imagination into visuals</p>

            <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center '>
                <img src={assets.sample_img_1} alt="" className='w-80 sx:x-96 rounded-lg ' />
                <div>
                    <h2 className='text-3xl font-medium max-w-lg mb-4 '>Unleash Creativity with Our AI-Powered Text-to-Image Generator</h2>
                    <p className='text-gray-600 mb-4 '>Turn your ideas into stunning visuals with our free AI image generator. Whether you need eye-catching designs or unique concepts, our tool converts your words into compelling images in seconds. Just describe it—and see it come to life instantly.
                    </p>
                    <p className='text-gray-600'> Enter a simple text prompt, and our advanced AI will generate high-quality visuals in moments. From product prototypes to character illustrations and creative concepts that haven’t even been imagined yet—everything is possible. With cutting-edge AI technology at your fingertips, your creativity has no limits.

                    </p>

                </div>
            </div>
        </div>
    )
}

export default Description