import { useState, useEffect } from 'react';
import { SITE_TITLE, SITE_SUBTITLE, METALS } from '../metals.config';

export default function Dashboard() {
  return (
    <>
      <div style={{ borderBottom: '1px solid #1E2A3A' }}>
        <div className="header">
          <h1>{SITE_TITLE}</h1>
          <p>{SITE_SUBTITLE}</p>
        </div>
      </div>

      <div className="main">
        <div className="banner">
          ⚠ Les ressources minérales des grands fonds n'étant pas vendues sur des bourses publiques, 
          les cours affichés s'appuient sur les indices et les plus grands producteurs mondiaux (proxies).
        </div>

        <div className="grid">
          {METALS.map((metal) => (
            <MetalCard key={metal.shortName} metal={metal} />
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

function MetalCard({ metal }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/metal?symbol=${encodeURIComponent(metal.shortName)}`);
        if (!res.ok) throw new Error('Erreur de requete');
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [metal.shortName]);

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

      <div className="chart-container" style={{ height: '130px', padding: '0 10px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <div style={{ color: 'var(--muted)', fontSize: '12px' }}>Chargement géologique...</div>
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
  const width = 340;
  const height = 120;
  const padding = 6;

  const prices = points.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;

  const svgPoints = points.map((p, i) => {
    const x = padding + (i / (points.length - 1)) * (width - padding * 2);
    const y = height - padding - ((p.price - minPrice) / priceRange) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={svgPoints}
        style={{ opacity: 0.85 }}
      />
    </svg>
  );
}
