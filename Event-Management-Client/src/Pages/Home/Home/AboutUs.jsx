const AboutUs = () => {
  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-600">
              At Eventease, we believe that every event is a unique and special
              experience waiting to happen. Our mission is to bring your dreams
              to life by offering expert event planning and management services.
              Whether it&apos;s a wedding, corporate gathering, or a simple
              celebration, we are committed to turning your vision into reality.
              With a dedicated team of professionals and a passion for
              creativity, we strive to make every moment unforgettable.
            </p>
          
          </div>
          <div>
            <img
              src="https://i.ibb.co/HPPFXww/corporate-office.jpg"
              alt="About Us"
              className="w-full rounded-md shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
