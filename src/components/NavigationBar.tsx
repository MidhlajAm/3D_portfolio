import React, { KeyboardEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const NAV_ITEMS = ['Home', 'About', 'Stack', 'Services', 'Projects', 'Contact'] as const;

type NavItem = (typeof NAV_ITEMS)[number];
type PillStyle = { width: number; x: number };

const EMPTY_PILL: PillStyle = { width: 0, x: 0 };

export default function NavigationBar() {
  const [activeItem, setActiveItem] = useState<NavItem>('Home');
  const [hoveredItem, setHoveredItem] = useState<NavItem | null>(null);
  const [pillStyle, setPillStyle] = useState<PillStyle>(EMPTY_PILL);
  const navRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef(new Map<NavItem, HTMLButtonElement>());
  const visibleItem = hoveredItem ?? activeItem;

  const updatePill = useCallback((item: NavItem) => {
    const nav = navRef.current;
    const button = itemRefs.current.get(item);

    if (!nav || !button) return;

    const navRect = nav.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    setPillStyle({
      width: buttonRect.width,
      x: buttonRect.left - navRect.left + nav.scrollLeft,
    });
  }, []);

  useLayoutEffect(() => {
    updatePill(visibleItem);
  }, [updatePill, visibleItem]);

  useEffect(() => {
    const handleResize = () => updatePill(visibleItem);
    const observer = new ResizeObserver(handleResize);

    if (navRef.current) observer.observe(navRef.current);
    itemRefs.current.forEach((button) => observer.observe(button));
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [updatePill, visibleItem]);

  // Automatically highlight the active nav item as the user scrolls the page
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const matchedItem = NAV_ITEMS.find(
              (item) => item.toLowerCase() === sectionId
            );
            if (matchedItem) {
              setActiveItem(matchedItem);
            }
          }
        });
      },
      { threshold: 0.5 } // Triggers when section is 50% visible in view
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.toLowerCase());
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to section when clicking a nav item
  const handleItemClick = (item: NavItem) => {
    setActiveItem(item);
    const element = document.getElementById(item.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const moveFocus = (currentItem: NavItem, direction: number) => {
    const currentIndex = NAV_ITEMS.indexOf(currentItem);
    const nextIndex = (currentIndex + direction + NAV_ITEMS.length) % NAV_ITEMS.length;
    const nextItem = NAV_ITEMS[nextIndex];

    setHoveredItem(nextItem);
    itemRefs.current.get(nextItem)?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, item: NavItem) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveFocus(item, 1);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveFocus(item, -1);
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleItemClick(item);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      setHoveredItem(NAV_ITEMS[0]);
      itemRefs.current.get(NAV_ITEMS[0])?.focus();
    }

    if (event.key === 'End') {
      event.preventDefault();
      const lastItem = NAV_ITEMS[NAV_ITEMS.length - 1];
      setHoveredItem(lastItem);
      itemRefs.current.get(lastItem)?.focus();
    }
  };

  return (
    <header className="portfolio-nav-wrap">
      <nav
        ref={navRef}
        aria-label="Primary navigation"
        className="portfolio-nav"
        onMouseLeave={() => setHoveredItem(null)}
        onScroll={() => updatePill(visibleItem)}
      >
        <span
          aria-hidden="true"
          className="portfolio-nav-pill"
          style={{
            width: pillStyle.width,
            transform: `translateX(${pillStyle.x}px)`,
          }}
        />

        {NAV_ITEMS.map((item) => {
          const isSelected = visibleItem === item;

          return (
            <button
              key={item}
              ref={(node) => {
                if (node) itemRefs.current.set(item, node);
                else itemRefs.current.delete(item);
              }}
              type="button"
              aria-current={activeItem === item ? 'page' : undefined}
              onClick={() => handleItemClick(item)}
              onFocus={() => setHoveredItem(item)}
              onBlur={() => setHoveredItem(null)}
              onMouseEnter={() => setHoveredItem(item)}
              onKeyDown={(event) => handleKeyDown(event, item)}
              className={`portfolio-nav-link ${isSelected ? 'is-selected' : ''}`}
            >
              {item}
            </button>
          );
        })}
      </nav>
    </header>
  );
}