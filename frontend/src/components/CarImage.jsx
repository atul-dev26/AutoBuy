import { useMemo, useState, useEffect } from 'react';
import { getCarImageCandidates } from '../utils/carImage';

export default function CarImage({ car, apiBase, className, alt }) {
  const candidates = useMemo(() => getCarImageCandidates(car, apiBase), [car, apiBase]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [candidates]);

  const onError = () => {
    setIndex((prev) => (prev < candidates.length - 1 ? prev + 1 : prev));
  };

  return (
    <img
      className={className}
      src={candidates[index]}
      alt={alt}
      onError={onError}
      loading="lazy"
    />
  );
}
