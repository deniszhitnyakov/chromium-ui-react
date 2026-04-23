import { forwardRef, useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import './Input.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, className, id, ...rest },
  ref,
) {
  const autoId = useId();
  const resolvedId = id ?? autoId;
  const hasError = !!error;
  return (
    <div className={cn('cr-input', hasError && 'cr-input--error', className)}>
      {label && (
        <label htmlFor={resolvedId} className="cr-input__label">
          {label}
        </label>
      )}
      <input ref={ref} id={resolvedId} className="cr-input__field" {...rest} />
      {hasError ? (
        <span className="cr-input__error">{error}</span>
      ) : hint ? (
        <span className="cr-input__hint">{hint}</span>
      ) : null}
    </div>
  );
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, className, id, ...rest },
  ref,
) {
  const autoId = useId();
  const resolvedId = id ?? autoId;
  const hasError = !!error;
  return (
    <div className={cn('cr-input', hasError && 'cr-input--error', className)}>
      {label && (
        <label htmlFor={resolvedId} className="cr-input__label">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={resolvedId}
        className="cr-input__field cr-input__field--textarea"
        {...rest}
      />
      {hasError ? (
        <span className="cr-input__error">{error}</span>
      ) : hint ? (
        <span className="cr-input__hint">{hint}</span>
      ) : null}
    </div>
  );
});

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { className, ...rest },
  ref,
) {
  return (
    <div className={cn('cr-search', className)}>
      <svg className="cr-search__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l4.25 4.25a1 1 0 0 0 1.42-1.42L15.5 14zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
          fill="currentColor"
        />
      </svg>
      <input ref={ref} type="search" className="cr-search__field" {...rest} />
    </div>
  );
});
