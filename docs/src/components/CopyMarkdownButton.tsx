import React, { useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './CopyMarkdownButton.module.css';

export interface CopyMarkdownButtonProps {
  /** Permalink of the current doc (starts with '/'). */
  permalink: string;
  /** Optional label override. */
  label?: string;
}

type Status = 'idle' | 'copying' | 'copied' | 'error';

function permalinkToRawPath(permalink: string): string {
  const trimmed = permalink.replace(/\/$/, '');
  const withoutLeadingSlash = trimmed.replace(/^\//, '');
  const path = withoutLeadingSlash.length === 0 ? 'intro' : withoutLeadingSlash;
  return `/llm/${path}.md`;
}

export default function CopyMarkdownButton({
  permalink,
  label = 'Copy Markdown',
}: CopyMarkdownButtonProps): React.JSX.Element {
  const [status, setStatus] = useState<Status>('idle');
  const rawPath = useBaseUrl(permalinkToRawPath(permalink));

  const handleClick = async () => {
    try {
      setStatus('copying');
      const response = await fetch(rawPath);
      if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      setStatus('copied');
      window.setTimeout(() => setStatus('idle'), 1800);
    } catch (err) {
      console.error('CopyMarkdownButton:', err);
      setStatus('error');
      window.setTimeout(() => setStatus('idle'), 2200);
    }
  };

  const display =
    status === 'copied' ? 'Copied!' :
    status === 'copying' ? 'Copying…' :
    status === 'error'   ? 'Copy failed' :
    label;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.button}
      data-status={status}
      aria-label={display}
    >
      <svg className={styles.icon} viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        {status === 'copied' ? (
          <path
            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
            fill="currentColor"
          />
        ) : (
          <path
            d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"
            fill="currentColor"
          />
        )}
      </svg>
      <span>{display}</span>
    </button>
  );
}
