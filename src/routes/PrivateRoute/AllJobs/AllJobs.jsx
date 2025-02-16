
import Job from '@/Pages/Home/FeaturedJobs/Job';
import { useLoaderData } from 'react-router-dom';

const AllJobs = () => {
    const job =useLoaderData()
    return (
        <div className='lg:py-12 py-8 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12'>
            <h1 className='text-4xl font-bold font-poppins text-center py-8 text-sky-600 dark:text-white'>Our all Available jobs</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 max-w-7xl mx-auto'>
            {job.map((job) => (
            <Job key={job._id} job={job} />
          ))}
            </div>
        </div>
    );
};

export default AllJobs;