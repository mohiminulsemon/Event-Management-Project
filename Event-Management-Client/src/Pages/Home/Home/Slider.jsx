const Slider = () => {
  return (
    <div className="carousel relative w-full h-screen overflow-hidden">
      <div
        id="slide1"
        className="carousel-item relative w-full h-screen flex items-center "
      >
        <div className="w-full h-full absolute top-0 left-0 bg-black opacity-80"></div>
        <img
          src="https://i.ibb.co/L9xJpg0/adminhotel2.jpg"
          className="w-full h-full object-cover opacity-75"
          alt="Slide 1"
        />
        <div className="absolute flex justify-between items-center transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle text-white">
            ❮
          </a>
          <div className="text-center">
            <h2 className="text-7xl font-semibold text-white p-4">
              Explore Exciting Events
            </h2>
            <p className="text-2xl text-white p-4">
              Discover and book amazing events with us.
            </p>
          </div>
          <a href="#slide2" className="btn btn-circle text-white">
            ❯
          </a>
        </div>
      </div>
      <div
        id="slide2"
        className="carousel-item relative w-full h-screen flex items-center"
      >
        <div className="w-full h-full absolute top-0 left-0 bg-black opacity-80"></div>
        <img
          src="https://i.ibb.co/jW2hm4j/hotel2.webp"
          className="w-full h-full object-cover opacity-75"
          alt="Slide 2"
        />
        <div className="absolute flex justify-between items-center transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle text-white">
            ❮
          </a>
          <div className="text-center">
            <h2 className="text-7xl font-semibold text-white p-4">
              Unforgettable Experiences
            </h2>
            <p className="text-2xl text-white p-4">
              Create memories with the best event choices.
            </p>
          </div>
          <a href="#slide3" className="btn btn-circle text-white">
            ❯
          </a>
        </div>
      </div>
      <div
        id="slide3"
        className="carousel-item relative w-full h-screen flex items-center"
      >
        <div className="w-full h-full absolute top-0 left-0 bg-black opacity-80"></div>
        <img
          src="https://i.ibb.co/yQG43gH/hotel3.jpg"
          className="w-full h-full object-cover opacity-75"
          alt="Slide 3"
        />
        <div className="absolute flex justify-between items-center transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle text-white">
            ❮
          </a>
          <div className="text-center">
            <h2 className="text-7xl font-semibold text-white p-4">
              Easy Booking Process
            </h2>
            <p className="text-2xl text-white p-4">
              Hassle-free event booking at your fingertips.
            </p>
          </div>
          <a href="#slide1" className="btn btn-circle text-white">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Slider;
