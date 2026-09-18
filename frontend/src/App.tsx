import { useState } from 'react'

const cities = ['Cairo','Alexandria','Giza','Port Said','Suez','Luxor','Mansoura','Tanta','Asyut','Aswan','Damietta','Minya','Beni Suef','Hurghada','Sharm El Sheikh']

function App() {
  const [form, setForm] = useState({ location: 'Cairo', carpet_area: '', bathroom: '', balcony: '', car_parking: 'Yes' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }) }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('http://127.0.0.1:8000/predict', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: form.location, carpet_area: parseFloat(form.carpet_area), bathroom: parseFloat(form.bathroom), balcony: parseFloat(form.balcony), car_parking: form.car_parking }) })
    const data = await res.json()
    setResult(data.predicted_price)
    setLoading(false)
  }

  const sel = { width: '100%', padding: '10px 14px', border: '2px solid #eee', borderRadius: 10, fontSize: 14, boxSizing: 'border-box' }
  const inp = { ...sel, outline: 'none' }
  const lbl = { display: 'block', fontSize: 13, color: '#555', marginBottom: 6, fontWeight: 'bold' }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial' }}>
      <div style={{ background: 'white', borderRadius: 20, padding: 40, width: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ fontSize: 50 }}>🏠</div>
          <h1 style={{ fontSize: 24, color: '#333', margin: '10px 0 5px' }}>House Price Predictor</h1>
          <p style={{ color: '#888', fontSize: 14, margin: 0 }}>Enter details to get price estimate</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={lbl}>Location</label>
            <select name="location" value={form.location} onChange={handleChange} style={sel}>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={lbl}>Area (m2)</label>
            <input name="carpet_area" type="number" placeholder="e.g. 100" value={form.carpet_area} onChange={handleChange} required style={inp} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={lbl}>Bathrooms</label>
            <input name="bathroom" type="number" placeholder="e.g. 2" value={form.bathroom} onChange={handleChange} required style={inp} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={lbl}>Balconies</label>
            <input name="balcony" type="number" placeholder="e.g. 1" value={form.balcony} onChange={handleChange} required style={inp} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={lbl}>Car Parking</label>
            <select name="car_parking" value={form.car_parking} onChange={handleChange} style={sel}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <button type="submit" style={{ width: '100%', padding: 14, background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 'bold', cursor: 'pointer' }}>
            {loading ? 'Calculating...' : 'Predict Price'}
          </button>
        </form>
        {result !== null && (
          <div style={{ marginTop: 24, padding: 20, background: 'linear-gradient(135deg, #f093fb, #f5576c)', borderRadius: 12, textAlign: 'center', color: 'white' }}>
            <p style={{ margin: 0, fontSize: 14, opacity: 0.9 }}>Estimated Price</p>
            <h2 style={{ margin: '8px 0 0', fontSize: 28 }}>EGP {result.toLocaleString()}</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
