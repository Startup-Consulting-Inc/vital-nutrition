import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const row1Images = [
  '/images/gallery-salad.jpg',
  '/images/editorial-avocado.jpg',
  '/images/editorial-greens.jpg',
  '/images/nutrient-fruits.jpg',
  '/images/nutrient-salmon.jpg',
];

const row2Images = [
  '/images/gallery-running.jpg',
  '/images/gallery-yoga.jpg',
  '/images/gallery-swimming.jpg',
  '/images/gallery-meditation.jpg',
  '/images/gallery-salad.jpg',
];

const row3Images = [
  '/images/gallery-sleep.jpg',
  '/images/editorial-water.jpg',
  '/images/gallery-meditation.jpg',
  '/images/editorial-greens.jpg',
  '/images/gallery-running.jpg',
];

function ImageRow({
  images,
  direction,
  speed,
}: {
  images: string[];
  direction: number;
  speed: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    const inner = innerRef.current;
    if (!row || !inner) return;

    const totalWidth = inner.scrollWidth / 2;
    let currentX = 0;

    const ctx = gsap.context(() => {
      gsap.ticker.add(() => {
        currentX += speed * direction;
        if (direction > 0 && currentX <= -totalWidth) currentX += totalWidth;
        if (direction < 0 && currentX >= 0) currentX -= totalWidth;
        gsap.set(inner, { x: currentX });
      });

      ScrollTrigger.create({
        trigger: row,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const skew = Math.min(Math.max(velocity * 0.0005 * direction, -8), 8);
          gsap.to(inner, { skewX: skew, duration: 0.5, ease: 'power2.out' });
        },
      });
    }, row);

    return () => ctx.revert();
  }, [direction, speed]);

  const doubledImages = [...images, ...images];

  return (
    <div ref={rowRef} className="overflow-hidden py-2">
      <div ref={innerRef} className="flex gap-4 w-max">
        {doubledImages.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 rounded-xl overflow-hidden"
            style={{ width: '320px', height: '200px' }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HabitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        title,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 overflow-hidden"
      style={{ backgroundColor: '#202a26' }}
    >
      <div ref={titleRef} className="text-center mb-12 px-6">
        <p className="text-caption text-inverse/40 mb-4">Habits & Lifestyle</p>
        <h2
          className="text-display text-inverse"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          Momentum
        </h2>
        <p className="text-lg text-inverse/60 max-w-2xl mx-auto mt-4">
          Physical activity, mindful eating, quality sleep, and consistent hydration form the pillars of sustained wellness.
        </p>
      </div>

      <div className="space-y-4 opacity-60">
        <ImageRow images={row1Images} direction={-1} speed={0.3} />
        <ImageRow images={row2Images} direction={1} speed={0.5} />
        <ImageRow images={row3Images} direction={-1} speed={0.4} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-4xl font-bold text-terracotta mb-2">150+</div>
            <p className="text-inverse/80 text-sm">Minutes of moderate aerobic activity per week recommended by Physical Activity Guidelines</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-4xl font-bold text-terracotta mb-2">2.7-3.7L</div>
            <p className="text-inverse/80 text-sm">Daily water intake recommendation from the National Academies of Sciences</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-4xl font-bold text-terracotta mb-2">400g</div>
            <p className="text-inverse/80 text-sm">Minimum daily fruit and vegetable intake recommended by WHO</p>
          </div>
        </div>
      </div>
    </section>
  );
}
