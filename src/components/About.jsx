import React from 'react';

const About = () => {
    return (
        <section id="about" className="bg-gray-100 md:px-20 lg:px-32">
        <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">About Our Club</h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
            Welcome to <span className="font-semibold text-blue-600">Sports Club</span> — a vibrant and inclusive community built for fitness enthusiasts, athletes, and casual players alike. Located at the heart of the city, our club offers world-class facilities for tennis, badminton, squash, and more.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            <div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">🏛️ Our History</h3>
                <p className="text-gray-600">
                Founded in 2005, our club has grown from a small neighborhood facility to a fully-equipped sports complex. Over the past two decades, we've proudly served thousands of members by fostering a healthy, competitive, and fun environment.
                </p>
            </div>

            <div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">🎯 Our Mission</h3>
                <p className="text-gray-600">
                To promote a culture of active living, community engagement, and sportsmanship. We aim to provide a safe and enjoyable space where people of all ages and skill levels can train, play, and grow together.
                </p>
            </div>

            <div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">🤝 Our Values</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Inclusivity and respect for all members</li>
                <li>Commitment to health, wellness, and safety</li>
                <li>Encouraging personal growth through sports</li>
                <li>Community-driven events and initiatives</li>
                </ul>
            </div>

            <div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">📈 Our Vision</h3>
                <p className="text-gray-600">
                To become the leading local hub for sports and recreation, continuously expanding our offerings and embracing innovation through technology like our new online club management system.
                </p>
            </div>
            </div>
        </div>
        </section>

    );
};

export default About;