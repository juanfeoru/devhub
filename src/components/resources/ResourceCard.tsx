import {
  Ellipsis,
  Pencil,
  SquareArrowOutUpRight,
  Star,
  Trash2,
} from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { getResourceIcon } from '../../utils/resourceIcon';
import type { Resource } from '../../types/resource';
import {
  resourceIcons,
  type ResourceIconName,
} from '../../constants/resource-icons';

interface ResourceCardProps {
  resource: Resource;
  onToggleFavorite?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

interface ResourceIconProps {
  name: ResourceIconName;
}

export default function ResourceCard({
  resource,
  onToggleFavorite,
  onEdit,
  onDelete,
}: ResourceCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const iconName = getResourceIcon(resource);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleClickOutside(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener('pointerdown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <article className='group relative flex flex-col rounded-[10px] border border-border-strong bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-[#3a3a3a] hover:bg-[#1f1f1f]/70'>
      <div className='flex items-center justify-between gap-3'>
        <div className='flex min-w-0 items-center gap-2.5'>
          <div className='flex size-9 shrink-0 items-center justify-center rounded-md border border-border-strong bg-surface-active text-text-muted'>
            <ResourceIcon name={iconName} />
          </div>

          <p className='truncate font-mono text-[13px] font-medium text-[#e0e0e0] tracking-wide'>
            {resource.title}
          </p>
        </div>

        <div className='flex shrink-0 items-center gap-1'>
          <button
            type='button'
            aria-label={
              resource.favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'
            }
            title={
              resource.favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'
            }
            onClick={onToggleFavorite}
            className={`flex size-8 items-center justify-center rounded-md transition-colors hover:bg-surface-active ${
              resource.favorite
                ? 'text-[#d4a843]'
                : 'text-text-muted hover:text-[#d4a843]'
            }`}
          >
            <Star
              size={15}
              aria-hidden='true'
              fill={resource.favorite ? 'currentColor' : 'none'}
            />
          </button>

          <div ref={menuRef} className='relative'>
            <button
              ref={menuButtonRef}
              type='button'
              aria-label='Más opciones'
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
              title='Más opciones'
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={`flex size-8 items-center justify-center rounded-md text-text-muted transition-all hover:bg-surface-active hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-interactive ${
                isMenuOpen
                  ? 'bg-surface-active text-text-primary'
                  : 'opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100'
              }`}
            >
              <Ellipsis size={19} aria-hidden='true' />
            </button>

            {isMenuOpen && (
              <div
                id={menuId}
                className='absolute right-0 top-full z-20 mt-2 w-44 rounded-lg border border-border-strong bg-[#202020] p-1.5 shadow-xl'
              >
                <button
                  type='button'
                  onClick={() => {
                    setIsMenuOpen(false);
                    onEdit?.();
                  }}
                  className='flex w-full items-center gap-2.5 px-3 py-2 rounded-md text-left text-[13px] text-text-secondary transition-colors hover:bg-surface-active hover:text-text-primary focus-visible:bg-surface-active focus-visible:outline-none'
                >
                  <Pencil size={15} aria-hidden='true' />
                  Editar recurso
                </button>

                <button
                  type='button'
                  onClick={() => {
                    setIsMenuOpen(false);
                    onDelete?.();
                  }}
                  className='flex w-full items-center gap-2.5 px-3 py-2 rounded-md text-left text-[13px] text-red-400 transition-colors hover:bg-red-500/10 focus-visible:bg-red-500/10 focus-visible:outline-none'
                >
                  <Trash2 size={15} aria-hidden='true' />
                  Eliminar recurso
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='my-3 flex flex-1 flex-col gap-3'>
        <p className='line-clamp-2 text-xs leading-relaxed text-text-muted'>
          {resource.description}
        </p>

        <div className='flex flex-wrap gap-1.5'>
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className='rounded-sm border border-border-strong bg-surface-active px-2 py-0.5 font-mono text-[10px] font-medium text-text-muted'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className='mt-auto border-t border-surface-elevated pt-3'>
        <a
          href={resource.link}
          target='_blank'
          rel='noopener noreferrer'
          className='flex w-full items-center justify-center gap-1.5 rounded-[7px] border border-[#3a3a3a] bg-[#2a2a2a] px-3.5 py-1.75 text-xs font-medium text-interactive transition-colors hover:border-[#444] hover:bg-[#303030]'
        >
          <SquareArrowOutUpRight size={11} aria-hidden='true' />
          Visitar recurso
        </a>
      </div>
    </article>
  );
}

function ResourceIcon({ name }: ResourceIconProps) {
  const Icon = resourceIcons[name];

  return <Icon size={17} aria-hidden='true' />;
}
