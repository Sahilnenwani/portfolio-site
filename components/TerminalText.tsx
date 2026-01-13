'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export default function TerminalText({
  text,
  delay = 0,
  speed = 50,
  className = '',
  showCursor = true,
  onComplete,
}: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setStartTyping(true);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!startTyping) return;

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayedText, text, speed, startTyping, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="text-terminal-green"
        >
          ▋
        </motion.span>
      )}
      {showCursor && isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="text-terminal-green"
        >
          ▋
        </motion.span>
      )}
    </span>
  );
}

// Multi-line terminal output component
interface TerminalOutputProps {
  lines: { prefix?: string; text: string; color?: string }[];
  speed?: number;
  lineDelay?: number;
}

export function TerminalOutput({ lines, speed = 30, lineDelay = 500 }: TerminalOutputProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [completedLines, setCompletedLines] = useState<number[]>([]);

  const handleLineComplete = (index: number) => {
    setCompletedLines((prev) => [...prev, index]);
    if (index < lines.length - 1) {
      setTimeout(() => setCurrentLine(index + 1), lineDelay);
    }
  };

  return (
    <div className="font-mono text-sm space-y-1">
      {lines.map((line, index) => (
        <div key={index} className={index > currentLine ? 'opacity-0' : 'opacity-100'}>
          {line.prefix && (
            <span className="text-terminal-green">{line.prefix} </span>
          )}
          {index <= currentLine && (
            <TerminalText
              text={line.text}
              speed={speed}
              delay={index === currentLine ? 0 : 0}
              showCursor={index === currentLine && !completedLines.includes(index)}
              onComplete={() => handleLineComplete(index)}
              className={line.color || 'text-zinc-300'}
            />
          )}
        </div>
      ))}
    </div>
  );
}

