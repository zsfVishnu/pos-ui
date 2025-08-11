'use client';

import { MenuSection } from '@/types/menu';
import { useSectionInView } from '@/hooks/useSectionInView';

interface SectionNavProps {
  sections: MenuSection[];
  isMobile?: boolean;
}

export function SectionNav({ sections, isMobile = false }: SectionNavProps) {
  const sectionIds = sections.map(s => s.id);
  const activeSection = useSectionInView(sectionIds);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isMobile) {
    return (
      <div className="md:hidden bg-white border-b border-gray-200 overflow-x-auto">
        <div className="flex space-x-1 px-4 py-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-current={activeSection === section.id ? 'location' : undefined}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <nav className="hidden md:block w-64 flex-shrink-0">
      <div className="sticky top-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Menu Sections</h2>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeSection === section.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            aria-current={activeSection === section.id ? 'location' : undefined}
          >
            {section.title}
          </button>
        ))}
      </div>
    </nav>
  );
}
