"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(0);

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  
  const projects = [
    {
      name: "Devon Rest",
      location: "Sangaraja Mawatha",
      image: "/Devon_rest.jpg",
      category: "Restaurant",
      hasImage: true
    },
    {
      name: "Thilanka Hotel New Wing (42 rooms)",
      location: "Sangamiththa Mawatha, Kandy",
      image: "/thilanka-hotel-new-wing.jpg",
      category: "Hotel",
      hasImage: true
    },
    {
      name: "Devon Hotel",
      location: "Ampitiya Road, Kandy",
      image: "/devon-hotel ampitiya.jpg",
      category: "Hotel",
      hasImage: true
    },
    {
      name: "Devon Hotel",
      location: "Dalada Veediya, Kandy",
      image: "/devon-hotel-dalada-veediya.jpg",
      category: "Hotel",
      hasImage: true
    },
    {
      name: "Grand Kandyan Hotel",
      location: "Lady Gorden Road, Kandy (100 rooms / 280,000 Sqft)",
      image: "/grand-kandyan-hotel.jpg",
      category: "Hotel",
      hasImage: true
    },
    {
      name: "Ravon Bakers",
      location: "Kaduwela",
      image: "/Ravon-bakers.jpg",
      category: "Commercial",
      hasImage: true
    },
    {
      name: "Aruppola Housing Project",
      location: "Dutugamunu Mawatha",
      image: "/aruppolahousingproject.jpeg",
      category: "Residential",
      hasImage: true
    },
    {
      name: "Grand Kandyan Hotel",
      location: "Kandy",
      image: "/grand%204.jpg",
      category: "Hotel",
      hasImage: true
    },
    {
      name: "Y.M.B.A Building",
      location: "Rajapihilla Mawatha, Kandy",
      category: "Commercial",
      hasImage: false
    },
    {
      name: "Sri Pushpadana Society Building",
      location: "D.S Senanayake Veediya, Kandy",
      category: "Commercial",
      hasImage: false
    },
    {
      name: "Prinston Tuition Academy",
      location: "Lake Road, Katukale, Kandy",
      category: "Educational",
      hasImage: false
    },
    {
      name: "Devon Hotel",
      location: "Yatinuwara Veediya, Kandy",
      category: "Hotel",
      hasImage: false
    },
    {
      name: "Riverdale Hotel",
      location: "Aniwatta, Kandy",
      category: "Hotel",
      hasImage: false
    },
    {
      name: "NO ZERO Building",
      location: "Bahirawakanda Patumaga, Kandy",
      category: "Commercial",
      hasImage: false
    },
    {
      name: "Previous ACBT Building",
      location: "Rajapihilla Mawatha, Kandy",
      category: "Educational",
      hasImage: false
    },
    {
      name: "Goonathilake Bathiks Building",
      location: "Rajapihilla Mawatha, Kandy",
      category: "Commercial",
      hasImage: false
    },
    {
      name: "Prof. Nimal Senanayake House",
      location: "Rajapihilla Mawatha, Kandy",
      category: "Residential",
      hasImage: false
    },
    {
      name: "Mr. Roshan Dinapala House",
      location: "Rajapihilla Mawatha, Kandy (24,000 Sqft)",
      category: "Residential",
      hasImage: false
    },
    {
      name: "Dr. Saman Nanayakkara House",
      location: "Rajapihilla Mawatha, Kandy",
      category: "Residential",
      hasImage: false
    },
    {
      name: "Hewage Mandiraya",
      location: "Menikkubura Road, Katugastota",
      category: "Commercial",
      hasImage: false
    },
    {
      name: "Hewage Supermarket",
      location: "Kurunegala Road",
      category: "Commercial",
      hasImage: false
    },
    {
      name: "Kandyan Arts & Craft Building",
      location: "Peradeniya Road, Kandy",
      category: "Cultural",
      hasImage: false
    },
    {
      name: "ENZ Lab Filling Station",
      location: "Katugastota Road, Kandy",
      category: "Commercial",
      hasImage: false
    }
  ];

  // Filter projects that have images
  const projectsWithImages = projects.filter(project => project.hasImage);
  
  const nextProject = () => {
    setSelectedProject((prev) => (prev + 1) % projectsWithImages.length);
  };

  const prevProject = () => {
    setSelectedProject((prev) => (prev - 1 + projectsWithImages.length) % projectsWithImages.length);
  };

  // Auto-play slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedProject((prev) => (prev + 1) % projectsWithImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [projectsWithImages.length]);

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
              <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3 -ml-4 sm:-ml-8 lg:-ml-16 xl:-ml-20">
                <a href="/" className="block">
                  <img 
                    src="/pnalogo.png" 
                    alt="PNA Construction" 
                    className="h-12 sm:h-16 md:h-20 w-auto object-contain"
                  />
                </a>
                <a href="/" className="text-sm sm:text-lg md:text-xl font-bold text-gray-700 tracking-wider hover:text-yellow-600 transition-colors duration-300 uppercase">
                  PNA CONSTRUCTIONS
                </a>
              </div>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/" className="text-gray-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                <a href="/about" className="text-gray-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
                <a href="/projects" className="text-gray-900 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Projects</a>
                <a href="#contact" className="text-gray-700 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
              </div>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-yellow-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500 transition-colors"
                aria-expanded="false"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              <a
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50 transition-colors"
              >
                Home
              </a>
              <a
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50 transition-colors"
              >
                About
              </a>
              <a
                href="/projects"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-yellow-500 hover:bg-gray-50 transition-colors"
              >
                Projects
              </a>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-yellow-500 hover:bg-gray-50 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>


       {/* Projects Section */}
       <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
         {/* Background Image */}
         <div 
           className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
           style={{
             backgroundImage: 'url("/bgimage.jpeg")',
           }}
         ></div>
         
         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16 fade-in-up-on-scroll">
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Some of Our Projects</h2>
             <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
               Welcome to PNA Construction, your premier destination for quality construction and exceptional service.
               With over four decades of experience in the construction industry, we specialize in providing 
               a wide range of projects to meet every need and budget.
             </p>
           </div>
           
           {/* Two Column Layout */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 min-h-[600px]">
             {/* Left Column - Project List */}
             <div className="space-y-6 fade-in-left-on-scroll">
               <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-gray-800 hover:scrollbar-thumb-yellow-400">
                 {projects.map((project, index) => (
                   <div 
                     key={index} 
                     className="group p-4 rounded-lg transition-all duration-300 hover:bg-white/20"
                   >
                     <div className="flex items-start justify-between">
                       <div className="flex-1">
                         <div className="flex items-center mb-2">
                           <span className="text-2xl font-bold text-yellow-400 mr-4 w-8">{index + 1}.</span>
                           <h3 className="text-lg font-semibold text-white group-hover:text-yellow-300 transition-colors">
                             {project.name}
                           </h3>
                         </div>
                         <p className="text-gray-300 text-sm ml-12 flex items-start">
                           <svg className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                           </svg>
                           {project.location}
                         </p>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             {/* Right Column - Slideshow */}
             <div className="relative fade-in-right-on-scroll">
               <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl hover-lift">
                 <img 
                   src={projectsWithImages[selectedProject].image} 
                   alt={projectsWithImages[selectedProject].name}
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                 <div className="absolute bottom-6 left-6 right-6">
                   <div className="flex items-center justify-end mb-3">
                     <div className="text-white/80 text-sm">
                       {selectedProject + 1} / {projectsWithImages.length}
                     </div>
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-2">
                     {projectsWithImages[selectedProject].name}
                   </h3>
                 </div>

                 {/* Navigation Arrows */}
                 <button
                   onClick={prevProject}
                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                   aria-label="Previous project"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                   </svg>
                 </button>
                 <button
                   onClick={nextProject}
                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                   aria-label="Next project"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                 </button>
               </div>

               {/* Project Counter Dots */}
               <div className="mt-6 text-center">
                 <div className="flex justify-center space-x-2">
                   {projectsWithImages.map((_, index) => (
                     <button
                       key={index}
                       onClick={() => setSelectedProject(index)}
                       className={`w-3 h-3 rounded-full transition-all duration-200 ${
                         selectedProject === index
                           ? 'bg-yellow-500'
                           : 'bg-gray-400 hover:bg-gray-300'
                       }`}
                     ></button>
                   ))}
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
