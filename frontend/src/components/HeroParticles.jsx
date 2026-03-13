import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function HeroParticles() {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);
  const wrapperRef = useRef(null);

  const [hasMounted, setHasMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    // Use initial offset position so they aren't visible
    let mouseX = -1000;
    let mouseY = -1000;
    
    const handleMouseMove = (e) => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the hero section (wrapperRef parent)
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Attach to parent element to detect hover on the whole hero sectoin
    if (wrapperRef.current) {
      const parent = wrapperRef.current.parentElement;
      if (parent) {
        parent.addEventListener('mousemove', handleMouseMove);
        parent.addEventListener('mouseenter', handleMouseEnter);
        parent.addEventListener('mouseleave', handleMouseLeave);
      }
    }

    let animationFrameId;
    const animate = () => {
      elementsRef.current.forEach((el) => {
        if (!el) return;
        
        const currentX = el.dataset.x !== undefined ? parseFloat(el.dataset.x) : -1000;
        const currentY = el.dataset.y !== undefined ? parseFloat(el.dataset.y) : -1000;
        
        const offsetX = parseFloat(el.dataset.offsetX);
        const offsetY = parseFloat(el.dataset.offsetY);
        const speed = parseFloat(el.dataset.speed);

        const targetX = mouseX + offsetX;
        const targetY = mouseY + offsetY;

        // Smooth interpolation (lerp)
        const nextX = currentX + (targetX - currentX) * speed;
        const nextY = currentY + (targetY - currentY) * speed;

        el.dataset.x = nextX;
        el.dataset.y = nextY;

        // Using translate3d for GPU acceleration
        el.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (wrapperRef.current) {
        const parent = wrapperRef.current.parentElement;
        if (parent) {
          parent.removeEventListener('mousemove', handleMouseMove);
          parent.removeEventListener('mouseenter', handleMouseEnter);
          parent.removeEventListener('mouseleave', handleMouseLeave);
        }
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasMounted]);

  // Scatter like sand in a circle: small sizes, large count
  const particles = Array.from({ length: 150 }).map((_, i) => {
    const isBlue = i % 2 === 0;
    // VERY tiny pixels
    const size = Math.random() * 2.5 + 1; // 1px to 3.5px
    
    // Spread them dynamically around the cursor in a circle
    const angle = Math.random() * Math.PI * 2;
    // Fill the circle using square root to get an even distribution
    // Max radius of 80px
    const radius = Math.sqrt(Math.random()) * 80;
    
    const offsetX = Math.cos(angle) * radius;
    const offsetY = Math.sin(angle) * radius;
    
    // Varying speeds so they shift a little independently
    const speed = Math.random() * 0.1 + 0.05;

    return (
      <div
        key={i}
        ref={el => elementsRef.current[i] = el}
        data-offset-x={offsetX}
        data-offset-y={offsetY}
        data-speed={speed}
        className={cn(
          "absolute top-0 left-0 rounded-full",
          isBlue ? "bg-sky-400" : "bg-orange-400"
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          opacity: Math.random() * 0.5 + 0.3, // 0.3 to 0.8 opacity
          transform: `translate3d(-1000px, -1000px, 0)` // hide off-screen initially
        }}
      />
    );
  });

  if (!hasMounted) return null;

  return (
    <div 
      ref={wrapperRef} 
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none z-0 transition-opacity duration-500",
        isHovering ? "opacity-100" : "opacity-0"
      )}
    >
      {particles}
    </div>
  );
}
