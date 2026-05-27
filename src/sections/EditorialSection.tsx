import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    image: '/images/editorial-avocado.jpg',
    title: 'Healthy Fats',
    subtitle: 'Monounsaturated and polyunsaturated fats support cardiovascular health, reduce inflammation, and improve cholesterol profiles.',
  },
  {
    image: '/images/editorial-greens.jpg',
    title: 'Essential Minerals',
    subtitle: 'Leafy greens provide vitamins A, C, and K, folate, iron, and calcium — the foundation of cellular health and immune function.',
  },
  {
    image: '/images/editorial-water.jpg',
    title: 'Optimal Hydration',
    subtitle: 'Water serves as the medium for virtually every biochemical reaction, comprising approximately 60% of adult body weight.',
  },
];

export default function EditorialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIndex = Math.min(
            Math.floor(progress * slides.length),
            slides.length - 1
          );
          setActiveIndex(newIndex);
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !imageRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      imageRef.current,
      { opacity: 0.3, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
    );

    tl.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );

    tl.fromTo(
      subtitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    return () => { tl.kill(); };
  }, [activeIndex]);

  return (
    <section ref={sectionRef} style={{ height: `${slides.length * 150}vh` }} className="relative">
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100vh' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            ref={imageRef}
            src={slides[activeIndex].image}
            alt={slides[activeIndex].title}
            className="w-full h-full object-cover transition-all duration-700"
          />
        </div>

        {/* Dark overlay — gradient from center (lighter) to edges (darker) for vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.7) 100%)',
          }}
        />

        {/* Additional bottom gradient for scroll indicators */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col items-center justify-center h-full text-center px-6">
          <div className="max-w-3xl">
            <div ref={titleRef}>
              <h2
                className="text-display text-white mb-6"
                style={{
                  textShadow: '0 4px 30px rgba(0,0,0,0.7), 0 2px 10px rgba(0,0,0,0.5), 0 0 60px rgba(0,0,0,0.4)',
                  fontSize: 'clamp(3.5rem, 10vw, 9rem)',
                }}
              >
                {slides[activeIndex].title}
              </h2>
            </div>
            <div ref={subtitleRef}>
              <div
                className="inline-block px-8 py-5 rounded-2xl"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.45)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <p
                  className="text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed"
                  style={{
                    textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.4)',
                    opacity: 0.95,
                  }}
                >
                  {slides[activeIndex].subtitle}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-12 flex gap-3">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === activeIndex ? 'w-12 bg-terracotta' : 'w-6 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
