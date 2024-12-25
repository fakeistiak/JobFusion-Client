const Blog = () => {
    return (
        <div className="bg-gray-50 min-h-screen">

            <main className="max-w-6xl mx-auto px-4 py-10">
                <section id="blog" className="py-10">
                    <h1 className="text-5xl font-bold text-gray-800 text-center mb-10">
                        Explore Our Latest Insights
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <article className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src="https://i.ibb.co.com/sV77rTh/headhunters-interviewing-female-job-candidate.jpg" alt="Blog 1" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">Job Search Tips</h2>
                                <p className="text-gray-600 mb-4">Master the art of job searching with these tips.</p>
                                <a href="#" className="text-blue-500 font-bold hover:underline">Read More</a>
                            </div>
                        </article>
                        <article className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src="https://i.ibb.co.com/Lx9SCBG/resume-apply-work-form-concept.jpg" alt="Blog 2" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">Resume Writing Guide</h2>
                                <p className="text-gray-600 mb-4">Craft a resume that stands out in 2024.</p>
                                <a href="#" className="text-blue-500 font-bold hover:underline">Read More</a>
                            </div>
                        </article>
                        <article className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src="https://i.ibb.co.com/3WZ7Czy/we-are-hiring-digital-collage.jpg" alt="Blog 3" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">Interview Preparation</h2>
                                <p className="text-gray-600 mb-4">Ace your interviews with confidence.</p>
                                <a href="#" className="text-blue-500 font-bold hover:underline">Read More</a>
                            </div>
                        </article>
                    </div>
                </section>

                <section id="newsletter" className="bg-blue-100 py-12 text-center rounded-lg my-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Subscribe to Our Newsletter</h2>
                    <p className="text-gray-600 mb-6">Get the latest updates directly to your inbox.</p>
                    <form className="flex justify-center space-x-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-2 rounded-lg border border-gray-300 w-2/3 md:w-1/3"
                        />
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                            Subscribe
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Blog;
