import React from 'react';
import { BiBuilding } from 'react-icons/bi';
import { CiLocationArrow1 } from 'react-icons/ci';

const Location = () => {
    return (
        <section className="bg-white py-16 px-4 rounded-2xl md:mr-4">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 flex"><CiLocationArrow1 /> Our Location</h2>
                <p className="text-lg text-gray-600 mb-8">
                You can find us at the heart of the city — easily accessible by public transport, just 10 minutes from the central bus station.
                </p>

            <div className="bg-gray-100 rounded-lg p-6 mb-6 text-left shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-2 flex"><BiBuilding /> Address</h3>
                <p className="text-gray-600 leading-relaxed">Sports Club<br />
                123 Athletic Avenue, Gulshan, Dhaka 1212, Bangladesh</p>
            </div>

    {/* Embedded Google Map */}
            <div className="w-full h-[300px] md:h-[450px] shadow-lg rounded-lg overflow-hidden">
                <iframe
                title="club-location-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.960764024892!2d90.40651081538512!3d23.75090319474126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b91f3f4c40b1%3A0xf4a7350be8a4bb3c!2sGulshan%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1615123163779!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                className="border-0">
            </iframe>
            </div>
        </div>
        </section>

    );
};

export default Location;