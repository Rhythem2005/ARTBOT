import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Appcontext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const { user, setshowLogin } = useContext(Appcontext)
    const navigate = useNavigate()
    const onClickHandler = () => {
        if (user) {
            navigate('/result')
        } else {
            setshowLogin(true)
        }

    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'>
                <p className=''>Your Imagination, Our AI — The Ultimate Text-to-Image Tool</p>
                <img src={assets.star_icon} alt="" />
            </div>

            <h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>Turn text to <span className='text-blue-600'>Image</span>, in seconds </h1>

            <p className='text-center max-w-xl mx-auto mt-5'>Let your imagination run wild. With AI, your words become stunning visuals in just seconds.</p>
            <button onClick={onClickHandler} className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full m-auto hover:scale-105 transition-all duration-500'>Generate Images
                <img className='h-6' src={assets.star_group} alt="" /></button>
            <div className='flex flex-wrap justify-center mt-16 gap-3 '>
                {Array(6).fill('').map((item, index) => ( // isme array(6) use kiya gaya hai taaki 6 space ka array ban sake 
                    // aur usse fill kiya hai khali strings sai // map function use kiya gaya hai jissey khali strings ke andar iamges aa jaaye
                    <img className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1} alt="" key={index} width={70} />
                    //index % 2 = 0 use kiya hai even or odd ke liye taaki jo images hai alternate aaye
                ))}
            </div>

            <p className='mt-2 text-neutral-600'>Generated images from imagify</p>

        </div>
    )
}

export default Header