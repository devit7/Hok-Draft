import { useState, useEffect } from 'react';

export type Hero = {
  Name: string;
  Role: string;
  "Image URL": string;
  Tier: string;
  "Win Rate": string;
  "Pick Rate": string;
  "Ban Rate": string;
};

export const useHeroes = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await fetch('/heroes.json');
        if (!response.ok) {
          throw new Error('Failed to fetch heroes');
        }
        const data = await response.json();
        setHeroes(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  return { heroes, loading, error };
};
