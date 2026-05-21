import { useState, useEffect } from 'react';

export interface DataRow {
  id: number;
  name: string;
  code: string;
  type: string;
}

export interface ApiResponse {
  message: string;
  timestamp: string;
  status: string;
  dataRows: DataRow[];
}

export function useFetchData() {
  const [data, setData] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/hello');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result: ApiResponse = await response.json();
      setData(result.dataRows);
    } catch (err) {
      setError('Unable to load business cases.');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
}
