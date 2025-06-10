import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const AllDesignLink = () => {
  return (
    <div className="flex justify-center my-2">
      <Link
        to="/all-gallery"
        className="group relative inline-flex items-center gap-3 px-8 py-3 text-lg font-semibold rounded-full border-2 border-yellow-500 text-yellow-500 transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-white shadow-lg"
      >
        All Designs
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-12" />
        <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-yellow-500 group-hover:w-full transition-all duration-300 ease-out"></span>
      </Link>
    </div>
  );
};

export default AllDesignLink;
