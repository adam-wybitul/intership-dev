import { DataRow } from '../../hooks/useFetchData';
import './DataTable.css';

interface DataTableProps {
  data: DataRow[];
  loading: boolean;
  error: string | null;
}

export function DataTable({ data, loading, error }: DataTableProps) {
  return (
    <div className="data-table-container">
      <h1 className="data-table-title">Business Cases</h1>

      {error && <div className="error">{error}</div>}
      {!error && loading && <div className="status">Loading business cases...</div>}
      {!error && !loading && data.length === 0 && (
        <div className="status">No business cases available.</div>
      )}
      {!error && data.length > 0 && (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Code</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.code}</td>
                <td>{row.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
