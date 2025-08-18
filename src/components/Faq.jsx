import React from 'react';

const Faq = () => {
    return (
        <section id="faq">
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title font-semibold">How do I become a member of the sports club?</div>
            <div className="collapse-content text-sm">You can register your account and book a court online through our portal or visit the front desk for offline registration.</div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">What facilities are included in the membership?</div>
            <div className="collapse-content text-sm">Members enjoy access to all courts, announcements and exclusive events.</div>
            </div>
            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-semibold">Do you offer family memberships?</div>
            <div className="collapse-content text-sm">Yes, we provide individual, group and family membership plans with discounts.</div>
            </div>
        </section>
    );
};

export default Faq;