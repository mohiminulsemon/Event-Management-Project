

const ContactUs = () => {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto">
                <h2 className="text-3xl font-semibold mb-6 text-center">Contact Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p className="text-gray-600">
                            Have questions or need assistance? Feel free to contact us.
                        </p>
                        <p className="text-gray-600 mt-2">
                            Phone: +123-456-7890
                        </p>
                        <p className="text-gray-600">
                            Email: contact@example.com
                        </p>

                    </div>
                    <div>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                            />
                            <textarea
                                placeholder="Your Message"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                                rows="4"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full btn btn-primary"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
