import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
    const testimonials = [
        {
            text: "I had an amazing experience with Eventease! Their team helped me organize a flawless event that exceeded all my expectations.",
            author: "Jessica Johnson",
        },
        {
            text: "Eventease made event planning so easy and stress-free. Their attention to detail and creative ideas made our event truly special.",
            author: "Michael Smith",
        },
        {
            text: "I can't thank Eventease enough for making my dream wedding a reality. From venue selection to decorations, everything was perfect.",
            author: "Emily Davis",
        },
    ];

    return (
        <section className="py-12 bg-gray-100 text-center">
            <div className="container mx-auto">
                <h2 className="text-3xl font-semibold mb-6">What Our Clients Says..</h2>
                <div className="flex justify-center items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                                <div className="flex items-center justify-center mb-4">
                                    <FaStar className="text-yellow-400 text-3xl" />
                                    <FaStar className="text-yellow-400 text-3xl" />
                                    <FaStar className="text-yellow-400 text-3xl" />
                                    <FaStar className="text-yellow-400 text-3xl" />
                                    <FaStar className="text-yellow-400 text-3xl" />
                                </div>
                                <p className="text-gray-600">{testimonial.text}</p>
                                <p className="text-gray-500 mt-2">- {testimonial.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
