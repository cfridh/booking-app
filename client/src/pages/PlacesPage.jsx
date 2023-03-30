import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Perks from '../Perks'

function PlacesPage() {
const {action} = useParams()
const [title,setTitle] = useState('')
const [address,setAddress] = useState('')
const [addedphotos,setAddedPhotos] = useState([])
const [photoLink,setPhotoLink] = useState()
const [description,setDescription] = useState('')
const [perks,setPerks] = useState([])
const [extraInfo,setExtraInfo] = useState('')
const [checkIn,setCheckIn] = useState('')
const [checkOut,setCheckOut] = useState('')
const [maxguests,setMaxGuests] = useState('')

function inputHeader(text) {
    return (
        <h2 className='text-2xl mt-4' >{text}</h2>
    )
}

function inputDescription(text) {
    return (
        <p className='text-gray-500 text-sm' >{text}</p>
    )
}

function preInput(header, description) {
    return (
        <>
        {inputHeader(header)}
        {inputDescription(description)}
        </>
    )
}







  return (
    <div>
        {action !== 'new' && ( 
        <div className="text-center">
            <Link to={'/account/places/new'} className=" inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
</svg>


                Add new place
                </Link>
        </div>

)}

{action === 'new' && (
    <div className="">
        <form>
            {preInput('Title','Title for your place')}
            
            <input type="text" placeholder='title' />
            {preInput('Address','The address of your place')}
            
            <input type="text" placeholder='address' />
            {preInput('Photos','Add photos of your place')}
            
            <div className="flex  gap-2">
                <div className="w-3/4">
                <input className=" text-sm " type="text" placeholder={'add link .jpg'} />
                </div>
                <div className="w-1/4">
                <button className=' primary ' >Upplod photo</button>
                </div>
            </div>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                <button className='flex justify-center gap-2 border bg-ransparent rounded-2xl p-6 text-2xl text-gray-600' >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
</svg>
                Upload
                </button>

            </div>

           {preInput('Description','Describe your place')}
            
            <textarea className=''/>
            {preInput('Perks','Add perks for your place')}
           
            <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 ls:grid-cols-4' >
               <Perks selected={perks} onChange={setPerks} /> 
            </div>

                {preInput('Extra info', 'Extra info')}
            
            <textarea className='' />
            {preInput('Check in & out times', 'What time can guests check in and check out?')}
            
            <div className="grid sm:grid-cols-3 gap-2">
                <div className="">
                    <h3 className='mt-2 -mb-1' >Check in time</h3>
                    <input type="text"  placeholder='13:00'/>
                </div>
                <div className="">
                    <h3 className='mt-2 -mb-1'>Check out time</h3>
                    <input type="text" />
                </div>
                <div className="">
                    <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                    <input type="text" />
                </div>
            </div>
            <div className="">
                <button className='primary my-4' >Save</button>
            </div>

        </form>
    </div>
)}
    </div>
  )
}

export default PlacesPage