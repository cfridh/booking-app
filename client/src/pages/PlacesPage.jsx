
import axios from 'axios'
// import { response } from 'express'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Perks from '../Perks'


function PlacesPage() {
const {action} = useParams()
const [title,setTitle] = useState('')
const [address,setAddress] = useState('')
const [addedphotos,setAddedPhotos] = useState([])
const [photoLink,setPhotoLink] = useState('')

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


async function addPhotoByLink (ev) {
    ev.preventDefault()
    const {data:filename} = await axios.post('/upload-by-link', {link: photoLink})
    setAddedPhotos(prev => {
        return [...prev, filename]
    })
    setPhotoLink('')
 }

    function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
        data.append('photos', files[i])   
    }
    axios.post('/upload', data, {
        headers: {'Content-Type': 'multipart/form-data'}
    }).then(response => {
        const {data:filenames} = response
        setAddedPhotos(prev => {
            return [...prev, ...filenames]
        })

    })
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
            
            <input type="text" value={title} onChange={ev => setTitle(ev.target.value) } placeholder='title' />
            {preInput('Address','The address of your place')}
            
            <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder='address' />
            {preInput('Photos','Add photos of your place')}
            
            <div className="flex  gap-2">
                <div className="w-3/4">
                   
                
                <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder='photo link' />
                </div>
                <div className="w-1/4">
                <button onClick={addPhotoByLink} className=' primary ' >Upplod photo</button>
                </div>
            </div>
            <div className="mt-2 grid fap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6  ">
                
                    {addedphotos.length > 0 && addedphotos.map(link => (
                        <div>
                        <img className="rounded-2xl" src={'http://localhost:3000/uploads/' + link} alt="" />
                        </div>
                    ))}
                <label className='flex items-center cursor-pointer justify-center gap-2 border bg-ransparent rounded-2xl p-2 text-2xl text-gray-600' >
                <input type="file" multiple className='hidden'onChange={uploadPhoto} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                            </svg>
                Upload
                </label>

            </div>

           {preInput('Description','Describe your place')}
            
            <textarea value={description} onChange={ev => setDescription(ev.target.value)} className=''/>
            {preInput('Perks','Add perks for your place')}
           
            <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 ls:grid-cols-4' >
               <Perks selected={perks} onChange={setPerks} /> 
            </div>

                {preInput('Extra info', 'Extra info')}
            
            <textarea 
            value={extraInfo} 
            onChange={ev => setExtraInfo(ev.target.value)} className='' 
            />
            {preInput('Check in & out times', 'What time can guests check in and check out?')}
            
            <div className="grid sm:grid-cols-3 gap-2">
                <div className="">
                    <h3 className='mt-2 -mb-1' >Check in time</h3>
                    <input type="text" value={checkIn} 
                    onChange={ev => setCheckIn(ev.target.value)} 
                    placeholder='13:00'
                    />
                </div>
                <div className="">
                    <h3 className='mt-2 -mb-1'>Check out time</h3>
                    <input type="text" value={checkOut} 
                    onChange={ev => setCheckOut(ev.target.value)} 
                    placeholder='11:00' 
                    />
                </div>
                <div className="">
                    <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                    <input type="number" value={maxguests} 
                    onChange={ev => setMaxGuests(ev.target.value)}  
                    />
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