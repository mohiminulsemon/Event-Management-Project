

const FeaturedEvents = () => {
    return (
        <section className="py-8">
            <div className="max-w-screen-xl mx-auto px-4">
                <h2 className="text-3xl font-semibold mb-6 text-center">Featured Events</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Food Events */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src="https://i.ibb.co/QXMRKmv/chocolate.jpg" alt="Food Event" className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">Food Lovers Fest</h3>
                            <p className="text-gray-600 mb-4">
                                Indulge in a culinary journey with our Food Lovers Fest. Explore a variety of flavors and cuisines that will satisfy your taste buds.
                            </p>
                            <a href="#" className="text-blue-600 hover:underline">Learn More</a>
                        </div>
                    </div>

                    {/* Birthday Event */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src="https://i.ibb.co/T8QcLS2/margereta.jpg" alt="Birthday Event" className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">Celebrate Birthdays</h3>
                            <p className="text-gray-600 mb-4">
                                Make your special day unforgettable with our personalized birthday celebration services. Create beautiful memories with your loved ones.
                            </p>
                            <a href="#" className="text-blue-600 hover:underline">Learn More</a>
                        </div>
                    </div>

                    {/* Wedding Event */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src="https://i.ibb.co/HxTSzyY/bookhall.png" alt="Wedding Event" className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">Dream Wedding</h3>
                            <p className="text-gray-600 mb-4">
                                Turn your dream wedding into a reality with our expert event planning services. Create an enchanting atmosphere that reflects your love story.
                            </p>
                            <a href="#" className="text-blue-600 hover:underline">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedEvents;
