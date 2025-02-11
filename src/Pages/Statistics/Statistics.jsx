import ContactUs from "../Home/ContactUs/ContactUs";

const Statistics = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-10 px-5">
            <main className="max-w-6xl mx-auto">
                <section id="statistics" className="text-center py-16">
                    <h1 className="text-4xl font-extrabold mb-6">
                        Job Application Statistics
                    </h1>
                    <p className="text-lg  mb-10">
                        Gain insights into how applicants interact with our platform, 
                        including application completion rates, average time spent, and more.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-sky-600 text-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-3">1,250+</h2>
                            <p className="">Applications Submitted</p>
                        </div>
                        <div className="bg-sky-600 text-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-3">85%</h2>
                            <p className="">Completion Rate</p>
                        </div>
                        <div className="bg-sky-600 text-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-3">12 mins</h2>
                            <p className="">Average Time Spent</p>
                        </div>
                    </div>
                </section>

                <section id="about" className="bg-gray-600 text-white py-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">About Our Platform</h2>
                        <p className="text-lg ">
                            Our platform simplifies the job application process for applicants and recruiters alike. 
                            With intuitive design and data-driven insights, we aim to create a seamless experience 
                            that connects talent with opportunity.
                        </p>
                    </div>
                </section>
                <ContactUs/>
            </main>
        </div>
    );
};

export default Statistics;
