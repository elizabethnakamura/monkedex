import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseKeyboardNavigationProps {
  previousId?: string;
  nextId?: string;
  enabled?: boolean;
}

export const useKeyboardNavigation = ({ 
  previousId, 
  nextId, 
  enabled = true 
}: UseKeyboardNavigationProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          if (previousId) {
            navigate(`/entry/${previousId}`);
          }
          break;
        case 'ArrowRight':
          if (nextId) {
            navigate(`/entry/${nextId}`);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [previousId, nextId, navigate, enabled]);
};
