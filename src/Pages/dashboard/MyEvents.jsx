import React from 'react';
import { useForm } from 'react-hook-form';
import { Outlet } from 'react-router-dom';

const MyEvents = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        data.additionalImages = data.additionalImages ? data.additionalImages.split(',') : [];

        if (data.speakers) {
            data.speakers = data.speakers.split(',').map(speaker => {
                const parts = speaker.split(':');
                const name = parts[0]?.trim() || '';
                const topic = parts[1]?.trim() || '';
                return { name, topic };
            });
        } else {
            data.speakers = [];
        }

        data.benefits = data.benefits ? data.benefits.split(',') : [];

        const currentDate = new Date();
        const postingDate = new Date(data.date);
        data.type = postingDate > currentDate ? 'upcoming' : 'past';

        if (data.schedule) {
            data.schedule = data.schedule.split(',').map(item => {
                const parts = item.split(':');
                const time = parts[0]?.trim() || '';
                const activity = parts[1]?.trim() || '';
                return { time, activity };
            });
        } else {
            data.schedule = [];
        }
        fetch("http://localhost:3000/MyEvents", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.acknowledged === true) {
                    alert("Event Posted Successfully!!!");
                }
                reset();
            })
            .catch(error => console.error('Error posting event:', error));
    };

    return (
        <div className=" mx-auto xl:px-24 px-4 mb-20 mt-10">
            <h2 className="text-2xl mb-4 font-bold">My Events</h2>
            <div className="bg-gray-100 py-10 px-4 lg:px-16">
                <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
                    <div className="lg:w-1/2 w-full mb-3">
                        <label className="block mb-1">Event Title</label>
                        <input
                            type="text"
                            {...register("title", { required: true })}
                            className="create-job-input"
                        />
                        {errors.title && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="flex justify-between mb-3">
                        <div className="w-1/2">
                            <label className="block mb-1">Event Date</label>
                            <input
                                type="date"
                                {...register("date", { required: true })}
                                className="create-job-input"
                            />
                            {errors.date && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="w-1/2 ml-10">
                            <label className="block mb-1">Event Location</label>
                            <input
                                type="text"
                                {...register("location", { required: true })}
                                className="create-job-input"
                            />
                            {errors.location && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="block mb-1">Event Description</label>
                        <textarea
                            rows={6}
                            {...register("description", { required: true })}
                            className="create-job-input"
                        />
                        {errors.description && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="mb-3">
                        <label className="block mb-1">Event Image URL</label>
                        <input
                            type="url"
                            {...register("image", { required: true })}
                            className="create-job-input"
                        />
                        {errors.image && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="mb-3">
                        <label className="block mb-1">Additional Images URLs (comma-separated)</label>
                        <input
                            type="text"
                            {...register("additionalImages")}
                            className="create-job-input"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-1">Speakers (name:topic, comma-separated)</label>
                        <input
                            type="text"
                            {...register("speakers")}
                            className="create-job-input"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-1">Registration Link</label>
                        <input
                            type="url"
                            {...register("registrationLink", { required: true })}
                            className="create-job-input"
                        />
                        {errors.registrationLink && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="mb-3">
                        <label className="block mb-1">Event Benefits (comma-separated)</label>
                        <input
                            type="text"
                            {...register("benefits")}
                            className="create-job-input"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-1">Schedule (time:activity, comma-separated)</label>
                        <input
                            type="text"
                            {...register("schedule")}
                            className="create-job-input"
                        />
                    </div>
                    <button type="submit" className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-600">Add Event</button>
                </form>
                <Outlet />
            </div>
        </div>
    );
}

export default MyEvents;
