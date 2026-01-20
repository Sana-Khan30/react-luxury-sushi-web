import React, { useState, useMemo, useRef, useEffect } from "react";
import logo from "../public/logo 1.png";
import divider from "../public/Image Divider.png";
import divider1 from "../public/Image Divider (1).png";
import Swal from "sweetalert2";
import {
  Search,
  ShoppingCart,
  Star,
  Phone,
  MapPin,
  X,
  Plus,
  Minus,
  Trash2
} from "lucide-react";
import "./App.css";

// --- DATA DEFINITIONS ---
const MENU_DATA = [
  {
    id: 1,
    name: "Tuna Sushi",
    price: 50,
    category: "Specialties",
    image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=400",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    name: "Salmon Sushi",
    price: 50,
    category: "Specialties",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    name: "Just Sushi",
    price: 50,
    category: "Specialties",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 4,
    name: "Dragon Sushi",
    price: 50,
    category: "Specialties",
    image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?auto=format&fit=crop&w=400",
    desc: "Ingredients: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const SectionHeader = ({ title, subtitle, light = false }) => (
  <div className="text-center mb-12">
    <p className={`${light ? "text-white" : "text-[#F3D382]"} text-[clamp(1.5rem,5vh,1.4rem)] md:mb-4`} style={{ fontFamily: "'Great Vibes', cursive" }}>
      {subtitle}
    </p>
    <h2 className="text-[#F3D382] text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
      {title}
    </h2>
  </div>
);

const App = () => {

  const diningRef = useRef(null);

  const [activeSection, setActiveSection] = useState("hero");
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Specialties");
  const [isCartOpen, setIsCartOpen] = useState(false); // New: Logic to toggle cart view
const heroRef = useRef(null);
const menuRef = useRef(null);
const specialtiesRef = useRef(null);
const aboutRef = useRef(null);
const contactRef = useRef(null);
  const itemRefs = useRef({});

  // --- LOGIC: NAVIGATION ---
  const scrollToSection = (elementRef) => {
  elementRef.current?.scrollIntoView({ behavior: "smooth" });
};

  const scrollToItem = (name) => {
    itemRefs.current[name]?.scrollIntoView({ behavior: "smooth", block: "center" });
    setSearchTerm("");
  };
  // Is function ko App component ke andar baki functions ke saath add karein
const handleFinalCheckout = async () => {
  if (cart.length === 0) return;

  const { value: confirmed } = await Swal.fire({
    title: '<span style="font-family: \'Cinzel\', serif; color: #F3D382;">ORDER SUMMARY</span>',
    background: "#1E1E1E",
    color: "#D9D9D9",
    html: `
      <div style="text-align: left; font-family: 'DM Sans', sans-serif; padding: 10px;">
        <div style="border-bottom: 1px solid #F3D38233; padding-bottom: 10px; margin-bottom: 10px;">
          ${cart.map(item => `
            <div style="display: flex; justify-between: space-between; margin-bottom: 5px;">
              <span style="flex-grow: 1;">${item.name} (x${item.qty})</span>
              <span style="color: #F3D382;">$${(item.price * item.qty).toFixed(2)}</span>
            </div>
          `).join('')}
        </div>
        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2rem; color: #F5BE32;">
          <span>GRAND TOTAL:</span>
          <span>$${cartTotals.total.toFixed(2)}</span>
        </div>
        <p style="font-size: 0.8rem; margin-top: 15px; opacity: 0.6; text-align: center;">By clicking 'Confirm', your order will be sent to our kitchen.</p>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'CONFIRM & PAY',
    cancelButtonText: 'CANCEL',
    confirmButtonColor: "#F5BE32",
    cancelButtonColor: "#444",
    reverseButtons: true
  });

  if (confirmed) {
    Swal.fire({
      title: "Success!",
      text: "Your sushi is being prepared. It will arrive in 30 minutes!",
      icon: "success",
      background: "#1E1E1E",
      color: "#F3D382",
      confirmButtonColor: "#F5BE32"
    });
    setCart([]); // Checkout ke baad cart clear karein
    setIsCartOpen(false); // Drawer close karein
  }
};

const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    // 1. Sticky Navbar Logic
    setIsScrolled(window.scrollY > 50);

    // 2. Active Section Logic
    const sections = [
      { id: "hero", ref: heroRef },
      { id: "menu", ref: menuRef },
      { id: "specialties", ref: specialtiesRef },
      { id: "about", ref: aboutRef },
      { id: "contact", ref: contactRef },
    ];

    const scrollPosition = window.scrollY + 150; // Offset taaki highlighting thora pehle ho jaye

    sections.forEach(({ id, ref }) => {
      if (ref.current) {
        const top = ref.current.offsetTop;
        const height = ref.current.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
        }
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
useEffect(() => {
  const handleReveal = () => {
    const reveals = document.querySelectorAll(".reveal-on-scroll");
    reveals.forEach((reveal) => {
      const windowHeight = window.innerHeight;
      const revealTop = reveal.getBoundingClientRect().top;
      if (revealTop < windowHeight - 100) {
        reveal.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", handleReveal);
  return () => window.removeEventListener("scroll", handleReveal);
}, []);
  // --- LOGIC: CART CORE ---
const count = cart.reduce((acc, item) => acc + item.qty, 0);
const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
const cartTotals = { count, total };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

    Swal.fire({
      title: "Added to Order!",
      text: `${product.name} added to your selection.`,
      icon: "success",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      background: "#2E2E2E",
      color: "#F5BE32",
    });
  };

  // New: Logic for Quantity Controls
  const updateQuantity = (id, delta) => {
    setCart((prev) => 
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // --- LOGIC: SEARCH ---
  const filteredSearch = useMemo(() => {
    if (!searchTerm) return [];
    return MENU_DATA.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="bg-dark text-white min-h-screen font-sans scroll-smooth">
      
      {/* 1. NAVBAR */}
     <nav className={`fixed top-0 w-full z-50 px-9 flex justify-between items-center transition-all duration-500 ease-in-out ${
  isScrolled 
    ? "bg-black/90 backdrop-blur-md shadow-lg py-3" 
    : "bg-transparent py-6"
}`}>
        <div className="w-15 pl-1.5 cursor-pointer" onClick={() => scrollToSection(heroRef)}>
          <img src={logo} alt="Logo" className="w-full object-contain m-auto" />
        </div>
{/* 
        <div className="hidden lg:flex gap-10 items-center uppercase text-[11px] tracking-[0.3em] text-[#D9D9D9]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          */}
         

<div className="hidden lg:flex gap-10 items-center uppercase text-[11px] tracking-[0.3em] text-[#D9D9D9]">
  <button 
    onClick={() => scrollToSection(menuRef)} 
    className={` hover:scale-105 transition-colors duration-300 ${activeSection === "menu" ? "text-[#F5BE32]" : "hover:text-[#F3D382]"}`}
  >
    Menu
  </button>
  
  <button 
    onClick={() => scrollToSection(diningRef)} 
    className={` transition-colors duration-300 ${activeSection === "specialties" ? "text-[#F5BE32]" : "hover:text-[#F3D382]"}`}
  >
    Fine Dining
  </button>

  <button 
    onClick={() => scrollToSection(aboutRef)} 
    className={`transition-colors duration-300 ${activeSection === "about" ? "text-[#F5BE32]" : "hover:text-[#F3D382]"}`}
  >
    About
  </button>

  <button 
    onClick={() => scrollToSection(contactRef)} 
    className={`transition-colors duration-300 ${activeSection === "contact" ? "text-[#F5BE32]" : "hover:text-[#F3D382]"}`}
  >
    Contact
  </button>
</div>


        <div className="flex items-center gap-8">
          <div className="relative flex items-center border-b border-[#F3D382]/30 py-1">
            <Search size={16} className="text-[#F3D382] mr-2" />
            <input
              type="text"
              placeholder="SEARCH"
              className="bg-transparent text-[#D9D9D9] text-[10px] tracking-widest focus:outline-none w-24 md:w-40 placeholder:text-[#D9D9D9]/40"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && filteredSearch.length > 0 && (
              <div className="absolute top-full right-0 mt-4 w-64 bg-[#2E2E2E] border border-[#F3D382]/20 shadow-2xl z-60">
                {filteredSearch.map((item) => (
                  <div key={item.id} className="p-3 text-[12px] hover:bg-[#F3D382]/10 cursor-pointer border-b border-white/5" onClick={() => scrollToItem(item.name)}>
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => setIsCartOpen(true)} // Logic: Open Cart
            className="relative p-2 text-[#F3D382] hover:scale-110 transition-transform"
          >
            <ShoppingCart size={20} />
            {cartTotals.count > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#F5BE32] text-[#1E1E1E] text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                {cartTotals.count}
              </span>
            )}
          </button>

          <button onClick={() => scrollToSection(diningRef)} className="hidden md:flex items-center gap-3 border border-[#F5BE32] text-[#F5BE32] px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-bold group hover:bg-[#F5BE32] hover:text-[#1E1E1E] transition-all">
            Reservation <span className="w-6 h-px bg-[#F5BE32] group-hover:bg-[#1E1E1E]"></span>
          </button>
        </div>
      </nav>

      {/* NEW LOGIC: CART DRAWER (UI kept subtle to match your theme) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-100 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-[#1E1E1E] h-full shadow-2xl p-8 flex flex-col border-l border-[#F3D382]/20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[#F3D382] text-2xl font-bold uppercase tracking-widest" style={{ fontFamily: "'Cinzel', serif" }}>Your Cart</h2>
              <X className="text-[#F3D382] cursor-pointer" onClick={() => setIsCartOpen(false)} />
            </div>

            <div className="grow overflow-y-auto space-y-6">
              {cart.length === 0 ? (
                <p className="text-[#D9D9D9] opacity-40 text-center mt-20 uppercase tracking-widest text-xs">Cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-white/5 pb-4 items-center">
                    <img src={item.image} className="food-card-img w-16 h-16 object-cover" alt={item.name} />
                    <div className="grow">
                      <h4 className="text-[#F3D382] text-xs font-bold uppercase tracking-widest">{item.name}</h4>
                      <p className="text-white text-xs mb-2">${item.price}</p>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 border border-[#F3D382]/30 text-[#F3D382] hover:bg-[#F5BE32] hover:text-black"><Minus size={10}/></button>
                        <span className="text-xs">{item.qty}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 border border-[#F3D382]/30 text-[#F3D382] hover:bg-[#F5BE32] hover:text-black"><Plus size={10}/></button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-white/20 hover:text-red-500"><Trash2 size={16}/></button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[#F3D382]/20">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[#D9D9D9] uppercase tracking-widest text-xs">Grand Total</span>
                  <span className="text-[#F3D382] text-2xl font-bold" style={{ fontFamily: "'Cinzel', serif" }}>${cartTotals.total.toFixed(2)}</span>
                </div>
                {/* Cart Drawer ke andar ye button aise update karein */}
<button 
  onClick={handleFinalCheckout}
  className="w-full bg-[#F5BE32] text-black py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all"
>
  Proceed to Checkout
</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. HERO SECTION */}
      <section ref={heroRef} className="relative min-h-153.75 h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden" style={{ background: `radial-gradient(circle, #000000 0%, #2C2B2D 60%, #1D1D1D 80%)` }}>
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&q=80&w=2000')` }}></div>
        <div className="relative z-10 w-full max-w-350 flex flex-col items-center text-center">
          <p className="text-white text-[clamp(1.7rem,6vh,2.7rem)] mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>Best sushi in town</p>
          <h1 className="hero-text-animate text-[#F3D382] font-bold leading-[1.1] tracking-[0.05em] text-[clamp(1.35rem,4vw,2.5rem)] max-w-[20ch] mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
            TASTE THE RICH <span className="text-[#F5BE32]">FLAVOR</span> OF <br className="hidden sm:block" /> HIGH QUALITY SUSHI
          </h1>
          <p className="text-[#D9D9D9] opacity-90 text-[clamp(0.75rem,2vw,1.1rem)] max-w-162.5 mb-12 leading-relaxed">
            We only use the five star quality for our menu, come and get the richness in every food we serve.
          </p>
          <button onClick={() => scrollToSection(menuRef)} className="group flex items-center gap-4 px-10 py-4 border-2 border-[#F5BE32] text-[#F5BE32] uppercase tracking-[0.3em] text-xs font-bold transition-all hover:bg-[#F5BE32] hover:text-[#1E1E1E]">
            GO TO MENU <span className="w-10 h-px bg-[#F5BE32] group-hover:bg-[#1E1E1E]"></span>
          </button>
        </div>
      </section>

      {/* 3. TODAY'S SPECIAL */}
      <section ref={menuRef} className="py-20 px-6 max-w-7xl mx-auto">
        <SectionHeader title="Today's Special" subtitle="Special Menu" light={true} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {MENU_DATA.slice(0, 3).map((item) => (
            <div key={item.id} ref={(el) => (itemRefs.current[item.name] = el)} className="bg-darkCard group hover:translate-y-2.5 transition-transform duration-300">
              <img src={item.image} alt={item.name} className="food-card-img w-full h-64 object-cover" />
              <div className="p-8">
                <h3 className="text-xl font-luxury text-gold mb-2">{item.name}</h3>
                <p className="text-white text-sm mb-4">{item.desc}</p>
                <div className="flex text-gold mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <button onClick={() => addToCart(item)} className="border-b border-gold text-gold py-1 text-xs uppercase tracking-widest hover:text-goldSoft">Order Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <img src={divider} alt="divider" className="w-full" />

      {/* 4. OUR SPECIALITIES */}
      <section className="bg-dark py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Our Specialities" subtitle="Quality Food For You" light={true} />
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {["Specialties", "Homestyle Sushi", "Steak", "With Rice", "Cocktails", "Wine", "Appetizer"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 text-sm transition-all border ${activeCategory === cat ? "bg-[#F5BE32] text-black border-black" : "text-[#D9D9D9] border-transparent hover:text-white"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-0">
            {MENU_DATA
              .filter(item => activeCategory === "Specialties" || item.category === activeCategory)
              .map((item, idx) => (
                <div key={item.id} ref={(el) => (itemRefs.current[item.name] = el)} className={`flex flex-col md:flex-row items-center ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                  <div className="w-full md:w-1/2">
                    <img src={item.image} alt={item.name} className="food-card-img w-full h-auto object-cover" />
                  </div>
                  <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center">
                    <h3 className="text-[#F3D382] text-3xl font-bold mb-4 uppercase" style={{ fontFamily: "'Cinzel', serif" }}>{item.name}</h3>
                    <p className="text-[#D9D9D9] text-sm leading-relaxed mb-8">{item.desc}</p>
                    <span className="text-[#F3D382] text-5xl font-bold mb-6" style={{ fontFamily: "'Cinzel', serif" }}>${item.price}</span>
                    <button onClick={() => addToCart(item)} className="w-fit border border-[#F5BE32] text-[#F5BE32] px-8 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#F5BE32] hover:text-white transition-all">Add to Cart</button>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DINING EVENTS */}
<section  ref={diningRef}
       className="relative py-32 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1920')] bg-fixed bg-cover">
        <div className="absolute inset-0 bg-black/80"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
  <h2 className="text-5xl font-luxury text-gold mb-20">Dining Events</h2>
  <div className="grid md:grid-cols-3 gap-12 text-left mb-16">
    {/* ... aapka existing event cards code ... */}
{[
              { price: 500, title: "FINE DINING", desc: "Bottle of Champagne\nFine Sushi Tower for 2+\nDessert" },
              { price: 1000, title: "GOLD DINING", desc: "Bottle of Champagne\nSecret Menu Sushi For 2+\nDessert" },
              { price: 1500, title: "ROYALTY DINING", desc: "Bottle of Luxury Champagne\nSpecial Menu Sushi For 2+\nRoyal Dessert" },
            ].map((event, i) => (
              <div key={i} className="border-l border-gold/30 pl-8">
                <h4 className="text-gold text-4xl font-luxury mb-4">${event.price}</h4>
                <h5 className="text-xl text-gold mb-2">{event.title}</h5>
                <p className="text-white text-sm whitespace-pre-line">{event.desc}</p>
              </div>
            ))}
  </div>

  {/* Naya Action Button */}
  <button 
    onClick={() => {
      Swal.fire({
        title: 'Book Your Event',
        text: 'Please call us at +0721 471 285 to confirm your reservation.',
        icon: 'info',
        background: '#1E1E1E',
        color: '#F3D382',
        confirmButtonColor: '#F5BE32'
      });
    }}
    className="btn-gold-pulse mt-8 border-2 border-[#F5BE32] text-[#F5BE32] px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#F5BE32] hover:text-black transition-all"
  >
    Confirm Reservation Now
  </button>
</div>
        
      </section>

      <img src={divider1} alt="divider" />

      {/* 6. OUR STORY */}
      <section ref={aboutRef} className="bg-[#1E1E1E] py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 grid grid-cols-12 grid-rows-6 gap-4 h-125 md:h-175">
            <div className="col-span-8 row-span-6 overflow-hidden relative group">
              <img src="https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&q=80&w=1000" alt="Chef" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="col-span-4 row-span-3 overflow-hidden border-l-4 border-[#F5BE32]">
              <img src="https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=600" alt="Interior" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="col-span-4 row-span-3 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=600" alt="Ingredients" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-8 relative">
            <div className="absolute -right-4 top-0 hidden xl:block text-[80px] font-bold text-white/3 rotate-90 origin-top-right whitespace-nowrap" style={{ fontFamily: "'Cinzel', serif" }}>SINCE 1998</div>
            <div className="space-y-4">
              <p className="text-[#F3D382] text-2xl" style={{ fontFamily: "'Great Vibes', cursive" }}>The Art of Sushi</p>
              <h2 className="text-[#F3D382] text-4xl md:text-5xl font-bold tracking-widest uppercase" style={{ fontFamily: "'Cinzel', serif" }}>Our Story & Philosophy</h2>
            </div>
            <p className="text-[#D9D9D9] opacity-80 leading-relaxed font-light">
              Founded in the heart of the city, DMR Sushi began with a simple vision: to honor the centuries-old traditions of Japanese culinary arts while embracing modern flavor profiles.
            </p>
            <div className="flex items-center gap-8 pt-6">
              <div className="text-center">
                <p className="text-[#F5BE32] text-3xl font-bold" style={{ fontFamily: "'Cinzel', serif" }}>25</p>
                <p className="text-[10px] uppercase tracking-widest opacity-50">Years Exp</p>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <button className="group flex items-center gap-3 border border-[#F5BE32] text-[#F5BE32] px-8 py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-[#F5BE32] hover:text-[#1E1E1E] transition-all">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer ref={contactRef} className="relative py-32 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1920')] bg-cover bg-center text-white">
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <h2 className="text-[#F3D382] text-4xl md:text-6xl font-bold mb-12 uppercase tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>
            We Ready to Have You <br /> The Best Dining Experiences
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-12 mb-16 text-sm">
            <div className="flex items-center gap-4">
              <MapPin className="text-[#F5BE32]" size={28} />
              <span className="text-left">Jendral Sudirman Street Pahoman <br /> Bandar Lampung, 35222</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-[#F5BE32]" size={28} />
              <span className="text-left">Call us: <br /> +0721 471 285</span>
            </div>
          </div>
          <button onClick={() => scrollToSection(diningRef)} className="btn-gold-pulse bg-[#F5BE32] text-black px-12 py-4 font-bold uppercase tracking-widest hover:bg-[#e0ad2b] transition-all mb-20 shadow-lg">Reserve A Table</button>
          <img src={logo} alt="Logo" className="w-20 mb-10" />
          <div className="flex gap-10 text-[10px] uppercase tracking-[0.3em] font-bold border-t border-white/20 pt-8 w-full justify-center">
            <a href="#" className="hover:text-[#F3D382]">Instagram</a>
            <a href="#" className="hover:text-[#F3D382]">Twitter</a>
            <a href="#" className="hover:text-[#F3D382]">Facebook</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;