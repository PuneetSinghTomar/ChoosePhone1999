import { useEffect, useState } from "react";

export default function useTypewriterPlaceholder(texts, speed = 150, pause = 1500) {
  const [placeholder, setPlaceholder] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];

    if (!deleting && subIndex === current.length) {
      setTimeout(() => setDeleting(true), pause);
      return;
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
      setPlaceholder(current.substring(0, subIndex));
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, texts, speed, pause]);

  return placeholder;
}
