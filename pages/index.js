import { useState, useEffect } from 'react';
import { SITE_TITLE, SITE_SUBTITLE, METALS } from '../metals.config';

export default function Dashboard() {
  // Période globale sélectionnée : '3mo', '6mo', '5y', '10y'
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

          {/* Sélecteur temporel horizontal persistant */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            {rangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setRange(option.value)}
                style={{
                  background: range === option.value ? '#1E2A3A' : 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: range === option.value ? '#E8EBF0' : 'var(--muted)',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  transition: 'all 0.15s ease'
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="main">
        <div className="banner">
          ⚠ Les ressources minérales des grands fonds n'étant pas vendues sur des bourses publiques, 
          les cours affichés s'appuient sur les indices et les plus grands producteurs mondiaux (proxies).
        </div>

        <div className="grid">
          {METALS.map((metal) => (
            <MetalCard key={metal.shortName} metal={metal} range={range} />
          ))}
        </div>
      </div>

      <div className="footer">
        <span>Données synchronisées en temps réel via l'API Edge de Yahoo Finance</span>
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
      setLoading(true); // Relance l'état de chargement lors du changement de période
      try {
        const res = await fetch(`/api/metal?symbol=${encodeURIComponent(metal.shortName)}&range=${range}`);
        if (!res.ok) throw new Error('Erreur de requête');
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

  const getVariation = () => {
    if (!data || !data.previousClose) return { percent: "0.00", isPositive: true };
    const change = data.currentPrice - data.previousClose;
    const percent = (change / data.previousClose) * 100;
    return {
      percent: percent.toFixed(2),
      isPositive: change >= 0
    };
  };

  const variation = getVariation();

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title" style={{ color: metal.color }}>
            {metal.name}
          </div>
          <div className="card-unit">{metal.unit}</div>
        </div>
        <span className="badge" style={{ background: `${metal.color}15`, color: metal.color }}>
          {metal.proxyName}
        </span>
      </div>
      <div className="accent-line" style={{ backgroundColor: metal.color }} />
      <div className="card-note">{metal.note}</div>

      <div style={{ padding: '4px 16px 12px', display: 'flex', alignItems: 'baseline', gap: '10px' }}>
        {loading ? (
          <span style={{ fontSize: '16px', color: 'var(--muted)' }}>Analyse minière...</span>
        ) : error ? (
          <span style={{ fontSize: '13px', color: '#EF4444' }}>Indice non disponible</span>
        ) : (
          <>
            <span style={{ fontSize: '22px', fontWeight: 'bold' }}>
              {data.currentPrice?.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} {data.currency === 'ILA' ? 'GBp' : data.currency}
            </span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: variation.isPositive ? '#10B981' : '#EF4444' }}>
              {variation.isPositive ? '▲ +' : '▼ '}{variation.percent}%
            </span>
          </>
        )}
      </div>

      <div className="chart-container" style={{ height: '170px', padding: '0 12px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <div style={{ color: 'var(--muted)', fontSize: '12px' }}>Sondage des strates...</div>
        ) : error ? (
          <div style={{ color: 'var(--muted)', fontSize: '12px' }}>Graphique indisponible</div>
        ) : data?.points && data.points.length > 0 ? (
          <MarineChart points={data.points} color={metal.color} />
        ) : (
          <div style={{ color: 'var(--muted)', fontSize: '12px' }}>Aucun historique disponible</div>
        )}
      </div>
    </div>
  );
}

function MarineChart({ points, color }) {
  const width = 380;
  const height = 150;
  
  // Marges intérieures pour laisser de l'espace aux textes des axes
  const paddingLeft = 55;
  const paddingRight = 10;
  const paddingTop = 10;
  const paddingBottom = 22;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const prices = points.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;

  // Conversion pixel-responsive des coordonnées de prix
  const svgPoints = points.map((p, i) => {
    const x = paddingLeft + (points.length > 1 ? (i / (points.length - 1)) * chartWidth : 0);
    const y = paddingTop + chartHeight - ((p.price - minPrice) / priceRange) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  // Formate les dates proprement selon la langue
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const d = new Date(timestamp);
    return d.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });
  };

  const firstDate = points[0] ? formatDate(points[0].date) : '';
  const lastDate = points[points.length - 1] ? formatDate(points[points.length - 1].date) : '';
  const midDate = points[Math.floor(points.length / 2)] ? formatDate(points[Math.floor(points.length / 2)].date) : '';

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
      {/* Grille de repères horizontaux */}
      <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft + chartWidth} y2={paddingTop} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1={paddingLeft} y1={paddingTop + chartHeight / 2} x2={paddingLeft + chartWidth} y2={paddingTop + chartHeight / 2} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1={paddingLeft} y1={paddingTop + chartHeight} x2={paddingLeft + chartWidth} y2={paddingTop + chartHeight} stroke="var(--border)" strokeWidth="1" />
      
      {/* Axe vertical Y */}
      <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={paddingTop + chartHeight} stroke="var(--border)" strokeWidth="1" />

      {/* Graduations Axe Y (Prix Extrêmes) */}
      <text x={paddingLeft - 8} y={paddingTop + 4} fill="var(--muted)" fontSize="10" fontWeight="500" textAnchor="end">
        {maxPrice.toLocaleString('fr-FR', { maximumFractionDigits: 1 })}
      </text>
      <text x={paddingLeft - 8} y={paddingTop + chartHeight + 4} fill="var(--muted)" fontSize="10" fontWeight="500" textAnchor="end">
        {minPrice.toLocaleString('fr-FR', { maximumFractionDigits: 1 })}
      </text>

      {/* Graduations Axe X (Dates Repères) */}
      <text x={paddingLeft} y={paddingTop + chartHeight + 16} fill="var(--muted)" fontSize="10" textAnchor="start">
        {firstDate}
      </text>
      <text x={paddingLeft + chartWidth / 2} y={paddingTop + chartHeight + 16} fill="var(--muted)" fontSize="10" textAnchor="middle">
        {midDate}
      </text>
      <text x={paddingLeft + chartWidth} y={paddingTop + chartHeight + 16} fill="var(--muted)" fontSize="10" textAnchor="end">
        {lastDate}
      </text>

      {/* Tracé de la courbe vectorielle */}
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={svgPoints}
        style={{ opacity: 0.9 }}
      />
    </svg>
  );
}
