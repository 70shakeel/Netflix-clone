const Hero = ({ movie }) => {
  return (
    <div
      className="relative h-[500px] md:h-[700px] bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
      <div className="absolute bottom-20 left-10 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold">{movie.title}</h1>
        <p className="max-w-lg text-sm md:text-lg">{movie.overview}</p>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md">
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
