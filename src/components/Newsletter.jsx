import React from 'react';

const Newsletter = () => {
    return (
        <section
        className="relative overflow-hidden bg-cover bg-center py-16 -mx-8 md:-mx-16"
        style={{ backgroundImage: "url('https://img.freepik.com/free-photo/soccer-into-goal-success-concept_1150-5273.jpg')" }}
        >
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-md mx-auto text-center text-white px-4">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className='mb-4'>Get news and updates from the field and never miss a match.</p>
            <form className="flex flex-col gap-4 items-center">
            <label htmlFor="newsletter-email" className="sr-only">
                Enter your email address
            </label>
            <div className="flex w-full">
                <input
                id="newsletter-email"
                type="email"
                placeholder="username@site.com"
                className="input input-bordered w-full rounded-l-md placeholder-gray-500 text-black"
                />
                <button className="btn btn-soft rounded-r-md ml-1 text-orange-600">
                SUBSCRIBE
                </button>
            </div>
            </form>
        </div>
        </section>

    );
};

export default Newsletter;