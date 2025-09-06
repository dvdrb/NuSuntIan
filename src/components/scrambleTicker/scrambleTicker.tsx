// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import dayjs from "dayjs";
import { useEffect, useState, type ReactHTML } from "react";

import ScrambleText from "../scrambleText/scrambleText";

type ScrambleTickerProps<Tag extends keyof ReactHTML> = {
  tag?: Tag;
  duration?: number;
  intervalMs?: number;
  formats?: string[]; // used when values not provided
  values?: string[]; // cycle through these exact strings
};

export default function ScrambleTicker<Tag extends keyof ReactHTML>({
  tag,
  duration = 0.6,
  intervalMs = 1500,
  formats = ["HH:mm:ss", "YYYY-MM-DD HH:mm", "DD MMM HH:mm"],
  values,
}: ScrambleTickerProps<Tag>) {
  const [, setIdx] = useState(0);
  const [text, setText] = useState<string>(
    values && values.length > 0 ? values[0] : dayjs().format(formats[0])
  );

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((prev) => {
        if (values && values.length > 0) {
          const next = (prev + 1) % values.length;
          setText(values[next]);
          return next;
        }
        const next = (prev + 1) % formats.length;
        setText(dayjs().format(formats[next]));
        return next;
      });
    }, intervalMs);

    return () => clearInterval(id);
  }, [formats, intervalMs, values]);

  return <ScrambleText tag={tag} text={text} duration={duration} />;
}
