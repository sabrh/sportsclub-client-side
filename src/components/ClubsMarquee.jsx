import React from 'react';
import Marquee from 'react-fast-marquee';

import football from '../assets/clubs/football.jpg';
import basketball from '../assets/clubs/basketball.jpg';
import volleyball from '../assets/clubs/volleyball.png';
import badminton from '../assets/clubs/badminton.jpg';
import tennis from '../assets/clubs/tennis.jpg';
import tabletennis from '../assets/clubs/table tennis.webp';
import swimming from '../assets/clubs/swimming.jpg';

const clubs = [football, basketball, volleyball, badminton, tennis, tabletennis, swimming];

const ClubsMarquee = () => {
    return (
        <section className='py-10'>
            <div className='mx-auto px-4'>
                <h2 className='font-bold text-xl text-center'>Our Clubs</h2>
                <Marquee pauseOnHover speed={50} gradient={false}>
                    {clubs.map((club, idx) => (
                        <div key={idx} className='mx-8 flex items-center'>
                            <img src={club} alt='available clubs logos' className='h-30 object-cover' />
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default ClubsMarquee;