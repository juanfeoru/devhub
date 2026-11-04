import { NavLink } from 'react-router';
import { useEffect } from 'react';
import {
  BookOpen,
  Heart,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Tags,
  X,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onCollapsed: () => void;
}

const navigationItems = [
  {
    id: 'dashboard',
    to: '/',
    label: 'Panel general',
    icon: LayoutDashboard,
  },
  {
    id: 'resources',
    to: '/resources',
    label: 'Todos los recursos',
    icon: BookOpen,
  },
  {
    id: 'favorites',
    to: '/favorites',
    label: 'Favoritos',
    icon: Heart,
  },
  {
    id: 'categories',
    to: '/categories',
    label: 'Categorías',
    icon: Tags,
  },
] as const;

export default function Sidebar({
  mobileOpen,
  onClose,
  collapsed,
  onCollapsed,
}: SidebarProps) {
  useEffect(() => {
    if (!mobileOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileOpen, onClose]);

  return (
    <>
      <button
        type='button'
        aria-label='Cerrar menú'
        aria-hidden='true'
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-bg/40 backdrop-blur-[2px] transition-opacity duration-300 md:hidden 
        ${
          mobileOpen
            ? 'visible opacity-100'
            : 'invisible opacity-0 pointer-events-none'
        }`}
      />

      <aside
        id='app-sidebar'
        className={`w-55 bg-surface border-r border-border flex flex-col h-full fixed z-50 top-0 py-4 px-3 transition-[width,translate] duration-300 ease-in-out md:sticky md:z-auto md:translate-x-0 ${
          collapsed ? 'md:w-18' : 'md:w-55'
        }
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className='flex items-center gap-2.5 pt-1 px-2.5 pb-5 border-b border-border mb-2 min-w-0'>
          <div className='size-7 min-w-7 shrink-0 grid place-items-center bg-surface-active border border-border-strong rounded-[7px]'>
            <svg
              width='14'
              height='14'
              viewBox='0 0 16 16'
              fill='none'
              aria-hidden='true'
            >
              <rect
                x='1'
                y='1'
                width='6'
                height='6'
                rx='1.5'
                fill='#666'
              ></rect>
              <rect
                x='9'
                y='1'
                width='6'
                height='6'
                rx='1.5'
                fill='#666'
              ></rect>
              <rect
                x='1'
                y='9'
                width='6'
                height='6'
                rx='1.5'
                fill='#444'
              ></rect>
              <rect
                x='9'
                y='9'
                width='6'
                height='6'
                rx='1.5'
                fill='#666'
              ></rect>
            </svg>
          </div>

          <span
            className={`font-mono text-sm font-semibold text-text-secondary whitespace-nowrap overflow-hidden transition-[max-width,opacity,transform] duration-200 ease-in-out
              ${
                collapsed
                  ? 'max-w-40 opacity-100 md:max-w-0 md:opacity-0 md:-translate-x-1'
                  : 'max-w-40 opacity-100 translate-x-0'
              }
            `}
          >
            DevHub
          </span>

          <button
            type='button'
            onClick={onClose}
            className='size-7 grid place-items-center text-text-muted ml-auto md:hidden'
            aria-label='Cerrar menú'
          >
            <X size={18} aria-hidden='true' />
          </button>
        </div>

        <nav className='space-y-1' aria-label='Navegación principal'>
          {navigationItems.map((nav) => {
            const Icon = nav.icon;

            return (
              <NavLink
                key={nav.id}
                to={nav.to}
                onClick={onClose}
                title={collapsed ? nav.label : undefined}
                className={({ isActive }) => ` 
                  flex items-center gap-2.5 py-1.5 px-2.5 rounded-md text-[13px] transition-colors duration-150 ${
                    isActive
                      ? 'bg-white/8 text-text-primary'
                      : 'text-text-muted hover:bg-white/5 hover:text-interactive'
                  }
                  ${collapsed ? 'md:justify-center md:gap-0 md:px-0' : ''}
                `}
              >
                <Icon size={14} aria-hidden='true' className='shrink-0' />
                <span
                  className={`max-w-40 opacity-100 overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-200
                    ${collapsed ? 'md:max-w-0 md:opacity-0' : ''}
                  `}
                >
                  {nav.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        <div className='hidden mt-auto md:flex'>
          <button
            type='button'
            onClick={onCollapsed}
            aria-label={collapsed ? 'Expandir menú' : 'Contraer menú'}
            aria-expanded={!collapsed}
            title={collapsed ? 'Expandir menú' : undefined}
            className={`w-full flex items-center text-text-muted py-1.5 rounded-md text-[13px] transition-colors hover:bg-white/5 hover:text-interactive
            ${collapsed ? 'justify-center px-0' : 'justify-start gap-2.5 px-2.5'}`}
          >
            {collapsed ? (
              <PanelLeftOpen
                size={14}
                aria-hidden='true'
                className='shrink-0'
              />
            ) : (
              <PanelLeftClose
                size={14}
                aria-hidden='true'
                className='shrink-0'
              />
            )}

            <span
              className={`
                overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-200
                  ${collapsed ? 'max-w-0 opacity-0' : 'max-w-40 opacity-100'}
              `}
            >
              Contraer menú
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
