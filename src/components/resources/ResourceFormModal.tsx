import { useEffect, useState } from 'react';
import { Check, Star, X } from 'lucide-react';

import type { Resource } from '../../types/resource';
import { useResources } from '../../hooks/useResources';

interface ResourceFormModalProps {
  resource?: Resource;
  onClose: () => void;
}

interface FormData {
  title: string;
  description: string;
  link: string;
  tags: string;
  favorite: boolean;
}

interface FormErrors {
  title: string;
  description: string;
  link: string;
  tags: string;
}

const initialErrors: FormErrors = {
  title: '',
  description: '',
  link: '',
  tags: '',
};

export default function ResourceFormModal({
  resource,
  onClose,
}: ResourceFormModalProps) {
  const { dispatch } = useResources();
  const isEditing = Boolean(resource);

  const [formData, setFormData] = useState<FormData>(() => ({
    title: resource?.title ?? '',
    description: resource?.description ?? '',
    link: resource?.link ?? '',
    tags: resource?.tags.join(', ') ?? '',
    favorite: resource?.favorite ?? false,
  }));

  const [errors, setErrors] = useState<FormErrors>(initialErrors);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = formData.title.trim();
    const trimmedDescription = formData.description.trim();
    const trimmedLink = formData.link.trim();

    const tags = [
      ...new Set(
        formData.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      ),
    ];

    function isValidHttpUrl(value: string): boolean {
      try {
        const url = new URL(value);
        return ['http:', 'https:'].includes(url.protocol);
      } catch {
        return false;
      }
    }

    const validUrl = isValidHttpUrl(trimmedLink);

    const newErrors: FormErrors = {
      title: trimmedTitle ? '' : 'Escribe un título para el recurso.',
      description: trimmedDescription
        ? ''
        : 'Escribe una descripción para el recurso.',
      link: validUrl ? '' : 'Escribe un enlace válido.',
      tags: tags.length > 0 ? '' : 'Agrega al menos una etiqueta.',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    const newResource: Resource = {
      id: resource?.id ?? crypto.randomUUID(),
      title: trimmedTitle,
      description: trimmedDescription,
      link: trimmedLink,
      favorite: formData.favorite,
      tags,
      createdAt: resource?.createdAt ?? new Date().toISOString(),
    };

    dispatch({
      type: isEditing ? 'UPDATE_RESOURCE' : 'ADD_RESOURCE',
      payload: newResource,
    });

    onClose();
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const inputStyles =
    'w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-text-primary outline-none transition-colors placeholder:text-sm placeholder:text-text-subtle focus:border-[#3d3d3d] focus:bg-[#1d1d1d]';

  const labelStyles = 'mb-1.5 block text-sm font-medium text-text-secondary';

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/65 p-4 backdrop-blur-sm'
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='resource-form-title'
        className='flex max-h-[calc(100dvh-1.5rem)] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-border-strong bg-surface shadow-2xl sm:max-h-[calc(100dvh-2rem)]'
      >
        <div className='flex shrink-0 items-start justify-between border-b border-border mx-5 px-1 py-4 sm:mx-6 sm:px-0'>
          <div>
            <h2
              id='resource-form-title'
              className='text-sm font-semibold text-text-primary sm:text-base'
            >
              {isEditing ? 'Editar recurso' : 'Agregar recurso'}
            </h2>

            <p className='mt-1 text-[13px] text-text-muted sm:text-sm'>
              {isEditing
                ? 'Modifica la información de tu recurso.'
                : 'Completa la información para guardar un nuevo recurso.'}
            </p>
          </div>

          <button
            type='button'
            onClick={onClose}
            aria-label='Cerrar formulario'
            title='Cerrar formulario'
            className='rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary'
          >
            <X size={18} aria-hidden='true' />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className='min-h-0 space-y-4 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6'
        >
          <div>
            <label htmlFor='title' className={labelStyles}>
              Nombre
            </label>

            <input
              id='title'
              name='title'
              type='text'
              aria-invalid={Boolean(errors.title)}
              value={formData.title}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
                setErrors((prev) => ({
                  ...prev,
                  title: '',
                }));
              }}
              placeholder='Ej. Tailwind CSS'
              className={inputStyles}
              maxLength={80}
            />

            {errors.title && (
              <p className='mt-1.5 text-xs text-red-400' role='alert'>
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label htmlFor='description' className={labelStyles}>
              Descripción
            </label>

            <input
              id='description'
              name='description'
              autoComplete='off'
              aria-invalid={Boolean(errors.description)}
              value={formData.description}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
                setErrors((prev) => ({
                  ...prev,
                  description: '',
                }));
              }}
              placeholder='Describe brevemente el recurso...'
              className={inputStyles}
              maxLength={200}
            />

            {errors.description && (
              <p className='mt-1.5 text-xs text-red-400' role='alert'>
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <label htmlFor='link' className={labelStyles}>
              Enlace
            </label>

            <input
              id='link'
              name='link'
              type='url'
              autoComplete='off'
              aria-invalid={Boolean(errors.link)}
              value={formData.link}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  link: e.target.value,
                }));
                setErrors((prev) => ({
                  ...prev,
                  link: '',
                }));
              }}
              placeholder='https://ejemplo.com'
              className={inputStyles}
            />

            {errors.link && (
              <p className='mt-1.5 text-xs text-red-400' role='alert'>
                {errors.link}
              </p>
            )}
          </div>

          <div>
            <label htmlFor='tags' className={labelStyles}>
              Etiquetas
            </label>

            <input
              id='tags'
              name='tags'
              type='text'
              autoComplete='off'
              aria-invalid={Boolean(errors.tags)}
              value={formData.tags}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  tags: e.target.value,
                }));
                setErrors((prev) => ({
                  ...prev,
                  tags: '',
                }));
              }}
              placeholder='Diseño, CSS, Frontend'
              className={inputStyles}
            />

            <p className='mt-1.5 text-xs text-text-muted'>
              Separa las etiquetas con comas.
            </p>

            {errors.tags && (
              <p className='mt-1.5 text-xs text-red-400' role='alert'>
                {errors.tags}
              </p>
            )}
          </div>

          <label className='flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-2 transition-colors hover:bg-surface-hover'>
            <div className='flex items-center gap-3'>
              <div className='flex size-7 shrink-0 items-center justify-center rounded-lg bg-surface-active'>
                <Star
                  size={15}
                  aria-hidden='true'
                  className={
                    formData.favorite
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-text-muted'
                  }
                />
              </div>

              <div>
                <span className='block text-sm font-medium text-text-primary'>
                  Marcar como favorito
                </span>
                <span className='mt-0.5 block text-xs text-text-muted'>
                  Guarda este recurso en tus favoritos.
                </span>
              </div>
            </div>

            <div className='relative flex size-5 shrink-0 items-center justify-center'>
              <input
                type='checkbox'
                name='favorite'
                checked={formData.favorite}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    favorite: e.target.checked,
                  }));
                }}
                className='peer absolute inset-0 z-10 size-full cursor-pointer opacity-0'
              />

              <span
                className='flex size-5 items-center justify-center rounded border border-border-strong bg-surface-active text-transparent transition-all peer-checked:border-interactive peer-checked:bg-interactive peer-checked:text-bg peer-focus-visible:ring-2 peer-focus-visible:ring-text-muted peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface'
                aria-hidden='true'
              >
                <Check size={14} strokeWidth={3} aria-hidden='true' />
              </span>
            </div>
          </label>

          <div className='flex justify-end gap-2 border-t border-border pt-5'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-lg border border-border-strong px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover'
            >
              Cancelar
            </button>

            <button
              type='submit'
              className='rounded-lg flex whitespace-nowrap bg-interactive px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-interactive/90'
            >
              {isEditing ? (
                <>
                  <span className='sm:hidden'>Guardar</span>
                  <span className='hidden sm:inline'>Guardar cambios</span>
                </>
              ) : (
                <>
                  <span className='sm:hidden'>Crear</span>
                  <span className='hidden sm:inline'>Crear recurso</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
