'use client';

import FileInput from '@/components/FileInput'
import FormFeild from '@/components/FormFeild'
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from '@/constants';
import { useFileInput } from '@/lib/hooks/useFileInput';
import React, { ChangeEvent, FormEvent, useState } from 'react'

const page = () => {

    const [isSubmitting, setisSubmitting] = useState(false)

    const [formData, setformData] = useState({
        title: '',
        description: '',
        visibility: '',
    });

    const video = useFileInput(MAX_VIDEO_SIZE);
    const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

    const [error, seterror] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setformData((prevState) => ({ ...prevState, [name]: value}))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();

        setisSubmitting(true);

        try {
            if(!video.file || !thumbnail.file) {
                seterror('Please upload video and thumbnail');
                return;
            }
            if(!formData.title || !formData.description)
            {
                seterror('Please fill in all the details');
                return;
            }
        } catch (error) {
            console.log('Error submitting form: ', error);
        } finally {
            setisSubmitting(false);
        }
    }

  return (
    <div className="wrapper-md upload-page">
        <h1>Uplaod a video</h1>

        {error && <div className='error-field'>{error}</div>}

        <form className='rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5' onSubmit={handleSubmit}>

            <FormFeild 
                id="title"
                label="Title"
                placeholder="Enter a clear and conscise video title"
                value={formData.title}
                onChange={handleInputChange}
            />

            <FormFeild 
                id="description"
                label="Description"
                placeholder="Describe what this video is about"
                value={formData.description}
                as='textarea'
                onChange={handleInputChange}
            />


            <FileInput
                id="video"
                label="Video"
                accept="video/*"
                file={video.file}
                previewUrl={video.previewUrl}
                inputRef={video.inputRef}
                onChange={video.handleFileChange}
                onReset={video.resetFile}
                type="video"
            />

            <FileInput
                id="thumbnail"
                label="Thumbnail"
                accept="image/*"
                file={thumbnail.file}
                previewUrl={thumbnail.previewUrl}
                inputRef={thumbnail.inputRef}
                onChange={thumbnail.handleFileChange}
                onReset={thumbnail.resetFile}
                type="image"
            />


            <FormFeild 
                id="visibility"
                label="Visibility"
                value={formData.visibility}
                as='select'
                options={[
                    {value: 'public', label:'Public'},
                    {value: 'private', label:'Private'},
                ]}
                onChange={handleInputChange}
            />

            <button type='submit' disabled={isSubmitting} className='submit-button'>
                {isSubmitting ? 'Uploading...' : 'Uplaod video'}
            </button>

        </form>

    </div>
  )
}

export default page