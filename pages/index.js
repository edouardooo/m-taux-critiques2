import { useState, useEffect } from 'react';
import { SITE_TITLE, SITE_SUBTITLE, METALS } from '../metals.config';

export default function Dashboard() {
  const [range, setRange] = useState('6mo');

  const rangeOptions = [
    { label: '3 Mois', value: '3mo' },
    { label: '6 Mois', value: '6mo' },
    { label: '5 Ans', value: '5y' },
    { label: '10 Ans', value: '10y' },
  ];

  return (
    <>
      <div style={{ borderBottom: '1px solid #1E2A3A' }}>
        <div className="header" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h1>{SITE_TITLE}</h1>
            <p>{SITE_SUBTITLE}</p>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {rangeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setRange(opt.value)}
                style={{
                  background: range === opt.value ? '#223249' : 'var(--surface)',
                  border: `1px solid ${range === opt.value ? '#3b82f6' : 'var(--border)'}`,
                  color: range === opt.value ? '#FFF' : 'var(--muted)',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="main">
        <div className="grid">
          {METALS.map((metal) => (
            <MetalCard key={metal.shortName} metal={metal} range={range} />
          ))}
        </div>
      </div>

      <div className="footer">
        <span>Flux hybride (Indices Spots pur, ETCs physiques & Pure-Plays stratégiques)</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </>
  );
}

function MetalCard({ metal, range }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/metal?symbol=${encodeURIComponent(metal.shortName)}&range=${range}`);
        if (!res.ok) throw new Error('Erreur réseau');
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setData(json);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [metal.shortName, range]);

  const prices = data?.points?.map(p => p.price) || [];
  const minPeriod = prices.length ? Math.min(...prices) : 0;
  const maxPeriod = prices.length ? Math.max(...prices) : 0;

  const changePercent = data && data.previousClose
    ? (((data.currentPrice - data.previousClose) / data.previousClose) * 100).toFixed(2)
    : "0.00";

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div className="card-header">
          <div>
            <div className="card-title" style={{ color: metal.color, fontSize: '16px', fontWeight: '700' }}>
              {metal.name}
            </div>
            <div className="card-unit">{metal.unit}</div>
          </div>
          <span className="badge" style={{ background: `${metal.color}15`, color: metal.color, border: `1px solid ${metal.color}30` }}>
            {metal.proxyName.split(' ')[0]}
          </span>
        </div>
        <div className="accent-line" style={{ backgroundColor: metal.color, opacity: 0.4 }} />
        <div className="card-note" style={{ minHeight: '36px', marginTop: '8px' }}>{metal.note}</div>
      </div>

      <div>
        <div style={{ padding: '0 16px 8px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          {loading ? (
            <span style={{ fontSize: '20px', color: '#4A5568' }}>Chargement...</span>
          ) : error ? (
            <span style={{ fontSize: '14px', color: '#EF4444' }}>Indice indisponible</span>
          ) : (
            <>
              <span style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px' }}>
                {data.currentPrice?.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} <span style={{ fontSize: '14px', color: 'var(--muted)' }}>{data.currency}</span>
              </span>
              <span style={{ fontSize: '13px', fontWeight: '700', color: parseFloat(changePercent) >= 0 ? '#10B981' : '#EF4444' }}>
                {parseFloat(changePercent) >= 0 ? '▲ +' : '▼ '}{changePercent}%
              </span>
            </>
          )}
        </div>

        {/* Conteneur Graphique Avancé */}
        <div style={{ height: '140px', padding: '0 16px 12px position relative' }}>
          {!loading && !error && data?.points?.length > 0 ? (
            <EnhancedChart points={data.points} color={metal.color} minPrice={minPeriod} maxPrice={maxPeriod} />
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A5568', fontSize: '12px' }}>
              {loading ? 'Extraction des strates temporelles...' : 'Pas de graphique'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EnhancedChart({ points, color, minPrice, maxPrice }) {
  const width = 400;
  const height = 130;
  
  const paddingLeft = 50;
  const paddingRight = 10;
  const paddingTop = 15;
  const paddingBottom = 20;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const priceRange = maxPrice - minPrice || 1;

  // Génération des coordonnées de la courbe boursière
  const coords = points.map((p, i) => {
    const x = paddingLeft + (i / (points.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - ((p.price - minPrice) / priceRange) * chartHeight;
    return { x, y };
  });

  const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
  
  // Chemin fermé pour le dégradé de couleur sous la courbe (Area Fill)
  const areaPath = coords.length 
    ? `${linePath} L ${coords[coords.length - 1].x} ${paddingTop + chartHeight} L ${coords[0].x} ${paddingTop + chartHeight} Z`
    : '';

  const formatDate = (ts) => new Date(ts).toLocaleDateString('fr-FR', { month: '2-digit', year: '2-digit' });

  // Identifiant unique pour éviter les collisions de dégradés SVG
  const gradientId = `grad-${color.replace('#', '')}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.00" />
        </linearGradient>
      </defs>

      {/* Lignes de repères en arrière-plan */}
      <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft + chartWidth} y2={paddingTop} stroke="#1E2A3A" strokeWidth="0.5" strokeDasharray="3 3" />
      <line x1={paddingLeft} y1={paddingTop + chartHeight} x2={paddingLeft + chartWidth} y2={paddingTop + chartHeight} stroke="#1E2A3A" strokeWidth="1" />
      <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={paddingTop + chartHeight} stroke="#1E2A3A" strokeWidth="1" />

      {/* Remplissage de l'aire (Gradient) */}
      {areaPath && <path d={areaPath} fill={`url(#${gradientId})`} />}

      {/* Ligne principale du cours */}
      {linePath && <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}

      {/* Bornes financières (Y-Axis Labels) */}
      <text x={paddingLeft - 8} y={paddingTop + 4} fill="#6272a4" fontSize="10" fontWeight="600" textAnchor="end">
        {maxPrice.toLocaleString('fr-FR', { maximumFractionDigits: 1 })}
      </text>
      <text x={paddingLeft - 8} y={paddingTop + chartHeight + 4} fill="#6272a4" fontSize="10" fontWeight="600" textAnchor="end">
        {minPrice.toLocaleString('fr-FR', { maximumFractionDigits: 1 })}
      </text>

      {/* Bornes temporelles (X-Axis Labels) */}
      <text x={paddingLeft} y={paddingTop + chartHeight + 15} fill="#4A5568" fontSize="10" textAnchor="start">
        {formatDate(points[0].date)}
      </text>
      <text x={paddingLeft + chartWidth} y={paddingTop + chartHeight + 15} fill="#4A5568" fontSize="10" textAnchor="end">
        {formatDate(points[points.length - 1].date)}
      </text>
    </svg>
  );
}
