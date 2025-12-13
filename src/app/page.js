"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Contact form handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus({
        type: "error",
        message: "Sorry, there was an error sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      '.fade-in-on-scroll, .fade-in-up-on-scroll, .fade-in-left-on-scroll, .fade-in-right-on-scroll, .scale-in-on-scroll'
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto pl-0 pr-4 sm:pr-6 lg:pr-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-3 -ml-8 sm:-ml-12 lg:-ml-16 xl:-ml-20">
                <a href="/" className="block">
                  <img 
                    src="/pnalogo.png" 
                    alt="PNA Construction" 
                    className="h-16 md:h-20 w-auto object-contain"
                  />
                </a>
                <a href="/" className="text-lg md:text-xl font-bold text-gray-700 tracking-wider hover:text-yellow-600 transition-colors duration-300 uppercase">
                  PNA CONSTRUCTIONS
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="text-gray-900 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                <a href="/about" className="text-gray-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
                <a href="/projects" className="text-gray-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Projects</a>
                <a href="#contact" className="text-gray-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative text-white py-20 min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: 'url("/bgimage.jpeg")',
          }}
        ></div>
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40 z-6"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-down">
              We Build Your Dreams
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-up stagger-1">
              Professional construction services with quality craftsmanship and reliable delivery. 
              From residential to commercial projects, we bring your vision to life.
            </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
                <a href="/about" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 text-center">
                  About Us
                </a>
                <a href="/projects" className="border-2 border-white text-white hover:bg-white hover:text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 text-center">
                  View Our Work
                </a>
              </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-left-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Overview of PNA Construction</h2>
              <p className="text-lg text-gray-600 mb-6">
                With over four decades of experience in the construction industry, PNA Construction has built a reputation 
                for excellence, reliability, and innovation. We specialize in delivering high-quality construction projects 
                that exceed our clients' expectations.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our team of skilled professionals combines traditional craftsmanship with modern techniques and cutting-edge 
                technology to bring your vision to life. From initial planning to final completion, we ensure every detail 
                is executed with precision and care.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center scale-in-on-scroll stagger-1">
                  <div className="text-3xl font-bold text-yellow-500 mb-2 transition-transform duration-300 hover:scale-110">60+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center scale-in-on-scroll stagger-2">
                  <div className="text-3xl font-bold text-yellow-500 mb-2 transition-transform duration-300 hover:scale-110">40+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center scale-in-on-scroll stagger-3">
                  <div className="text-3xl font-bold text-yellow-500 mb-2 transition-transform duration-300 hover:scale-110">100%</div>
                  <div className="text-gray-600">Client Satisfaction</div>
                </div>
                <div className="text-center scale-in-on-scroll stagger-4">
                  <div className="text-3xl font-bold text-yellow-500 mb-2 transition-transform duration-300 hover:scale-110">24/7</div>
                  <div className="text-gray-600">Support Available</div>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg fade-in-right-on-scroll hover-lift">
              <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ 
                  transform: `translateX(-${currentSlide * 100}%)`
                }}
              >
                <div className="w-full flex-shrink-0 h-full">
                  <img 
                    src="/pc1.png" 
                    alt="PNA Construction Project 1" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full flex-shrink-0 h-full">
                  <img 
                    src="/pc2.png" 
                    alt="PNA Construction Project 2" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full flex-shrink-0 h-full">
                  <img 
                    src="/IMG_1657.JPG" 
                    alt="PNA Construction Project 3" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full flex-shrink-0 h-full">
                  <img 
                    src="/pc4.png" 
                    alt="PNA Construction Project 4" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                aria-label="Next image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {[0, 1, 2, 3].map((index) => (
                  <button 
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      currentSlide === index 
                        ? 'bg-white bg-opacity-70' 
                        : 'bg-white bg-opacity-50 hover:bg-opacity-100'
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Work Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Signature Work</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Selected highlights of our completed projects
            </p>
          </div>
          
          <div className="space-y-16 max-w-6xl mx-auto">
            {/* Aruppola Housing Project */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl overflow-hidden fade-in-up-on-scroll stagger-1 hover-lift">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Gallery */}
                <div className="relative">
                  <div className="grid grid-cols-2 gap-2 p-4">
                    <div className="relative rounded-lg overflow-hidden shadow-md aspect-square">
                      <img 
                        src="/aruppolahousingproject.jpeg" 
                        alt="Aruppola Housing Project" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative rounded-lg overflow-hidden shadow-md aspect-square">
                      <img 
                        src="/aruppolahousingproject1.jpeg" 
                        alt="Aruppola Housing Project 1" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative rounded-lg overflow-hidden shadow-md aspect-square">
                      <img 
                        src="/aruppolahousingproject2.jpeg" 
                        alt="Aruppola Housing Project 2" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative rounded-lg overflow-hidden shadow-md aspect-square">
                      <img 
                        src="/aruppolahousingproject3.jpeg" 
                        alt="Aruppola Housing Project 3" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="inline-block bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-full mb-3">RESIDENTIAL</span>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">Aruppola Housing Project</h3>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <span className="text-sm font-semibold text-gray-500">Location</span>
                        <p className="text-gray-800">Dutugamunu Mawatha</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <div>
                        <span className="text-sm font-semibold text-gray-500">Owner</span>
                        <p className="text-gray-800">Mr. Weerarathna</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div>
                        <span className="text-sm font-semibold text-gray-500">Architectural Design</span>
                        <p className="text-gray-800">Sandya Ariyarathne Associates</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <span className="text-sm font-semibold text-gray-500">Structural Engineer</span>
                        <p className="text-gray-800">Dr. Udaya Dissanayake</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed italic">
                      A modern family home that balances elegance, function, and structural rigor, delivered to specification with premium finishes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ravon Restaurant & Bakery */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl overflow-hidden fade-in-up-on-scroll stagger-2 hover-lift">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Gallery */}
                <div className="relative">
                  <div className="grid grid-cols-2 gap-2 p-4">
                    <div className="relative rounded-lg overflow-hidden shadow-md aspect-square">
                      <img 
                        src="/ravonbakers.jpeg" 
                        alt="Ravon Restaurant & Bakery" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative rounded-lg overflow-hidden shadow-md aspect-square">
                      <img 
                        src="/ravonbakers1.jpeg" 
                        alt="Ravon Restaurant & Bakery 1" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative rounded-lg overflow-hidden shadow-md aspect-square">
                      <img 
                        src="/ravonbakers2.jpeg" 
                        alt="Ravon Restaurant & Bakery 2" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative rounded-lg overflow-hidden shadow-md aspect-square">
                      <img 
                        src="/ravonbakers4.jpeg" 
                        alt="Ravon Restaurant & Bakery 4" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="inline-block bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-full mb-3">COMMERCIAL</span>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">Ravon Restaurant & Bakery</h3>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <span className="text-sm font-semibold text-gray-500">Location</span>
                        <p className="text-gray-800">Kaduwela</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div>
                        <span className="text-sm font-semibold text-gray-500">Exterior & Interior</span>
                        <p className="text-gray-800">Int. Architect Githmi Peiris</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <span className="text-sm font-semibold text-gray-500">Build</span>
                        <p className="text-gray-800">PNA Constructions</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed italic">
                      A customer-centric space using beige and pastel tones with geometric motifs for a distinctive brand experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grand Kandyan Hotel */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl overflow-hidden fade-in-up-on-scroll stagger-3 hover-lift">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Gallery */}
                <div className="relative">
                  <div className="grid grid-cols-2 gap-2 p-4">
                    <div className="relative rounded-lg overflow-hidden shadow-md aspect-square">
                      <img 
                        src="/grand1.jpg" 
                        alt="Grand Kandyan Hotel" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative rounded-lg overflow-hidden shadow-md aspect-square">
                      <img 
                        src="/grand2.jpg" 
                        alt="Grand Kandyan Hotel 2" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative rounded-lg overflow-hidden shadow-md aspect-square">
                      <img 
                        src="/grand3.jpg" 
                        alt="Grand Kandyan Hotel 3" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative rounded-lg overflow-hidden shadow-md aspect-square">
                      <img 
                        src="/grand%204.jpg" 
                        alt="Grand Kandyan Hotel 4" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="inline-block bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-full mb-3">HOSPITALITY</span>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">Grand Kandyan Hotel</h3>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <span className="text-sm font-semibold text-gray-500">Location</span>
                        <p className="text-gray-800">Kandy</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <div>
                        <span className="text-sm font-semibold text-gray-500">Rating</span>
                        <p className="text-gray-800">5-Star Hotel</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <span className="text-sm font-semibold text-gray-500">Build</span>
                        <p className="text-gray-800">PNA Constructions</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed italic">
                      A prestigious 5-star hotel project in the heart of Kandy, showcasing luxury hospitality construction with attention to detail and premium finishes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to start your next construction project? Contact us today for a free consultation and quote.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-yellow-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>(077) 345 44 00</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-yellow-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>pnaconstructionspvtltd@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-yellow-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Mon - Fri: 7:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
            
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus.message && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitStatus.type === "success"
                        ? "bg-green-500/20 text-green-300 border border-green-500/50"
                        : "bg-red-500/20 text-red-300 border border-red-500/50"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter your mobile phone number"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Project Details</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-600/50 disabled:cursor-not-allowed text-black font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img 
                src="/logowhite.png" 
                alt="PNA Construction" 
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 mb-4">Your trusted constructer</p>
            <div className="flex justify-center space-x-6 mb-4">
              <a href="https://web.facebook.com/profile.php?id=61583882222772" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
              <a href="https://www.tiktok.com/@pna.constructions?lang=en" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">TikTok</a>
              <a href="https://www.instagram.com/pna_construction?igsh=MWRzNmFjZW4zZHk0MQ==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 PNA Construction. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
