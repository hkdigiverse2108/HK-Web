import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

/**
 * Hook to fetch dynamic service subpage content from MongoDB with fallback to static defaultData
 */
export function useServiceSubpage(identifier, defaultData) {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!identifier) return;
    let isMounted = true;

    async function fetchDynamic() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/public/services-subpages/${identifier}`);
        if (res.ok) {
          const json = await res.json();
          if (json && isMounted) {
            setData(prev => ({ ...prev, ...json }));
          }
        }
      } catch (e) {
        // Fallback silently to defaultData
        console.warn(`Using fallback static data for service ${identifier}`);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDynamic();
    return () => { isMounted = false; };
  }, [identifier]);

  return { data, loading };
}

/**
 * Hook to fetch dynamic portfolio subpage content from MongoDB with fallback to static defaultData
 */
export function usePortfolioSubpage(identifier, defaultData) {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!identifier) return;
    let isMounted = true;

    async function fetchDynamic() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/public/portfolio-subpages/${identifier}`);
        if (res.ok) {
          const json = await res.json();
          if (json && isMounted) {
            setData(prev => ({ ...prev, ...json }));
          }
        }
      } catch (e) {
        console.warn(`Using fallback static data for portfolio ${identifier}`);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDynamic();
    return () => { isMounted = false; };
  }, [identifier]);

  return { data, loading };
}

/**
 * Hook to fetch dynamic client roster from MongoDB with fallback to static defaultList
 */
export function useClientsRoster(defaultList) {
  const [clients, setClients] = useState(defaultList);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchDynamic() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/public/clients`);
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json) && json.length > 0 && isMounted) {
            setClients(json);
          }
        }
      } catch (e) {
        console.warn('Using fallback static clients roster');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDynamic();
    return () => { isMounted = false; };
  }, []);

  return { clients, loading };
}
