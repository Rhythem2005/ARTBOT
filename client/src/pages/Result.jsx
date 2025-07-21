import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Appcontext } from '../context/AppContext'

const Result = () => {
    const [image, setimage] = useState(assets.sample_img_1)
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const [loading, setloading] = useState(false)
    const [input, setinput] = useState('')
    
    const {generateImage} = useContext(Appcontext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setloading(true)
        setIsImageLoaded(false) //  Reset image state

        if(input){
            const generatedImage = await generateImage(input) //  Store result
            if(generatedImage){ //  Check if image was generated
                setIsImageLoaded(true)
                setimage(generatedImage) // Use generated image
            }
        }
        setloading(false)
    }

    return (
        <div className='pb-16 px-4 max-w-4xl mx-auto'>
            <div className='text-center py-8'>
                <h1 className='text-3xl font-semibold mb-4'>AI Image Generator</h1>
                <p className='text-gray-600'>Generate stunning images from text</p>
            </div>
            
            <div className='flex flex-col items-center'>
                <div className='w-80 h-80 mb-6 bg-gray-100 rounded-lg overflow-hidden'>
                    {loading ? (
                        <div className='w-full h-full flex items-center justify-center'>
                            <div className='text-center'>
                                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
                                <p>Loading.....</p>
                            </div>
                        </div>
                    ) : (
                        <img src={image} alt="Generated" className='w-full h-full object-cover' />
                    )}
                </div>
                
                {!isImageLoaded && (
                    <form onSubmit={onSubmitHandler} className='flex w-full max-w-md gap-2 mb-4'>
                        <input 
                            onChange={(e) => setinput(e.target.value)} 
                            value={input} 
                            type="text" 
                            placeholder='Describe what you want to generate' 
                            className='flex-1 bg-transparent border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500'
                        />
                        <button 
                            type="submit" 
                            disabled={loading}
                            className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50'
                        >
                            Generate
                        </button>
                    </form>
                )}
                
                {isImageLoaded && (
                    <div className='flex gap-4'>
                        <button 
                            onClick={() => {
                                setIsImageLoaded(false)
                                setimage(assets.sample_img_1)
                                setinput('')
                            }} 
                            className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer hover:bg-gray-100'
                        >
                            Generate Another
                        </button>
                        <a 
                            href={image} 
                            download="generated_image.png" 
                            className='px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700'
                        >
                            Download
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Result