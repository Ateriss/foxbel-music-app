const PerfectSquare = ({ children }) => {
  return (
    <div className='rounded-3xl relative w-full after:content-[""] after:block after:pb-[100%] overflow-hidden'>
      <div className="absolute w-full h-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default PerfectSquare;
