

import React, { useState } from 'react'
import {Link, Navigate, useLocation, useParams} from 'react-router-dom'
import Perks from '../Perks'
import PhotosUploader from '../PhotosUploader'
import AccountNav from '../AccountNav'
import axios from "axios";
import { response } from 'express'

export default function PlacesFormPage (){

const {id} = useParams()

const [title,setTitle] = useState('')
const [address,setAddress] = useState('')
const [addedPhotos,setAddedPhotos] = useState([])

const [description,setDescription] = useState('')
const [perks,setPerks] = useState([])
const [extraInfo,setExtraInfo] = useState('')
const [checkIn,setCheckIn] = useState('')
const [checkOut,setCheckOut] = useState('')
const [maxguests,setMaxGuests] = useState('')
const [redirect,setRedirect] = useState(false);

useEffect(() => {
if(!id) { 
    return;
}
    axios.get(`/places/${id}`).then(response => {
        const{data} = response;
        setTitle(data.title)
        setAddress(data.address)
        setAddedPhotos(data.addedPhotos)
        setDescription(data.description)
        setPerks(data.perks)
        setExtraInfo(data.extraInfo)
        setCheckIn(data.checkIn)
        setCheckOut(data.checkOut)
        setMaxGuests(data.maxguests)

    })
    
}, [id] )


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


async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price,
    };
    if (id) {
      // update
      await axios.put('/places', {
        id, ...placeData
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post('/places', placeData);
      setRedirect(true);
    }

  }

if (redirect) {
    return <Navigate to={'/account/places'} />
  }

    return (
        <>
        
         <div className="">
         <AccountNav/>
        <form onSubmit={savePlace}>
            {preInput('Title','Title for your place')}
            
            <input type="text" value={title} onChange={ev => setTitle(ev.target.value) } placeholder='title' />
            {preInput('Address','The address of your place')}
            
            <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder='address' />
            {preInput('Photos','Add photos of your place')}
            
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

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
        </>
    )


}