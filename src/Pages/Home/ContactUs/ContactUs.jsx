
const ContactUs = () => {
    return (
        <div>
            <section id="contact" className="dark:bg-black lg:py-16 py-12 dark:text-white">
                    <div className="max-w-7xl px-6 sm:px-8 lg:px-12 mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4 font-poppins">Contact Us</h2>
                        <p className="text-lg  mb-8 font-poppins">
                            Have questions or need support? Reach out to our team.
                        </p>
                        <form className="space-y-4">
                            <input 
                                type="text" 
                                placeholder="Your Name" 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                            <input 
                                type="email" 
                                placeholder="Your Email" 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                            <textarea 
                                placeholder="Your Message" 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32"
                            ></textarea>
                            <button 
                                type="submit" 
                                className="bg-sky-600 font-poppins text-white px-6 py-2 rounded-lg hover:bg-sky-700"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </section>
        </div>
    );
};

export default ContactUs;