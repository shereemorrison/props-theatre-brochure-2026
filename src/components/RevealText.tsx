import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export function RevealText({ text }: { text: string }) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="word"
          style={{
            display: 'inline-block',
            marginRight: index < words.length - 1 ? '0.25em' : 0,
          }}
        >
          {word}
        </span>
      ))}
    </>
  );
}

export function usePageReveal(
  containerRef: React.RefObject<HTMLElement | null>,
  titleRef: React.RefObject<HTMLElement | null>
) {
  const triggers = useRef<ScrollTrigger[]>([]);

  useGSAP(() => {
    if (!containerRef.current || !titleRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const title = titleRef.current;
    gsap.fromTo(title,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    const created: ScrollTrigger[] = [];
    containerRef.current.querySelectorAll('.staffing-block').forEach((section) => {
      const items = section.querySelectorAll('h2, .word, img');
      if (items.length === 0) return;

      gsap.set(items, { opacity: 0, y: 20 });
      const tween = gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.012,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          once: true,
        },
      });

      if (tween.scrollTrigger) created.push(tween.scrollTrigger);
    });

    triggers.current = created;
    ScrollTrigger.refresh();

    return () => {
      created.forEach((trigger) => trigger.kill());
    };
  }, { scope: containerRef });
}
