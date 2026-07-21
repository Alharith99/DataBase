import { useEffect, useState } from 'react';
import { api } from '../api/client';

const empty = {
  medicine_name: '', category_id: '', unit: 'Tablet', current_stock: 0, reorder_level: 10, status: 'Active',
};

export default function Medicines() {
  const [rows, setRows] = useState([]);
  const [lookups, setLookups] = useState(null);
  const [lowOnly, setLowOnly] = useState(false);
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');

  async function load(low = lowOnly) {
    const [m, l] = await Promise.all([api.medicines(low), api.lookups()]);
    setRows(m);
    setLookups(l);
  }

  useEffect(() => { load(); }, []);

  async function save(e) {
    e.preventDefault();
    setError('');
    try {
      if (form.medicine_id) await api.updateMedicine(form.medicine_id, form);
      else await api.createMedicine(form);
      setForm(null);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>Medicines</h1>
          <p>Stock management with low-stock highlighting</p>
        </div>
        <button type="button" onClick={() => setForm({
          ...empty,
          category_id: lookups?.medicineCategories[0]?.category_id || '',
        })}>Add Medicine</button>
      </div>

      <div className="toolbar">
        <button
          type="button"
          className={lowOnly ? '' : 'secondary'}
          onClick={() => { setLowOnly(false); load(false); }}
        >All</button>
        <button
          type="button"
          className={lowOnly ? '' : 'secondary'}
          onClick={() => { setLowOnly(true); load(true); }}
        >Low Stock Only</button>
      </div>

      <div className="panel">
        <table>
          <thead>
            <tr><th>Name</th><th>Category</th><th>Unit</th><th>Stock</th><th>Reorder</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.medicine_id} style={m.stock_status === 'Low Stock' ? { background: '#fde8d8' } : undefined}>
                <td>{m.medicine_name}</td>
                <td>{m.category_name}</td>
                <td>{m.unit}</td>
                <td>{m.current_stock}</td>
                <td>{m.reorder_level}</td>
                <td>
                  <span className={`badge ${m.stock_status === 'Low Stock' ? 'low' : 'ok'}`}>
                    {m.stock_status}
                  </span>
                </td>
                <td className="row-actions">
                  <button type="button" className="secondary" onClick={() => setForm({ ...m })}>Edit</button>
                  <button type="button" className="danger" onClick={async () => { await api.deleteMedicine(m.medicine_id); load(); }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {form && (
        <div className="modal-backdrop">
          <form className="modal" onSubmit={save}>
            <h3>{form.medicine_id ? 'Edit Medicine' : 'New Medicine'}</h3>
            {error && <div className="error">{error}</div>}
            <div className="form-grid">
              <label className="full">Name<input required value={form.medicine_name} onChange={(e) => setForm({ ...form, medicine_name: e.target.value })} /></label>
              <label>Category
                <select required value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
                  {lookups?.medicineCategories.map((c) => <option key={c.category_id} value={c.category_id}>{c.category_name}</option>)}
                </select>
              </label>
              <label>Unit
                <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}>
                  {lookups?.units.map((u) => <option key={u}>{u}</option>)}
                </select>
              </label>
              <label>Current Stock<input type="number" min="0" required value={form.current_stock} onChange={(e) => setForm({ ...form, current_stock: e.target.value })} /></label>
              <label>Reorder Level<input type="number" min="0" required value={form.reorder_level} onChange={(e) => setForm({ ...form, reorder_level: e.target.value })} /></label>
              <label>Status
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>Active</option><option>Inactive</option>
                </select>
              </label>
            </div>
            <div className="modal-actions">
              <button type="button" className="secondary" onClick={() => setForm(null)}>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
