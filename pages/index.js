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
          ⚠ Les <strong style={{ color: '#D4A843' }}>terres rares (REY)</strong> ne sont pas cotées
          sur des marchés organisés. Consulter{' '}
          <a href="https://www.asianmetal.com" target="_blank" rel="noopener noreferrer">Asian Metal</a>
          {' '}ou{' '}
          <a href="https://www.usgs.gov/centers/national-minerals-information-center" target="_blank" rel="noopener noreferrer">USGS</a>
          {' '}pour leurs prix.
        </div>

        <div className="grid">
          {METALS.map((metal) => (
            <MetalCard key={metal.shortName} metal={metal} />
          ))}
        </div>
      </div>

      <div className="footer">
        <span>Données propulsées par Yahoo Finance API via Next.js Route</span>
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
        // Appelle votre API interne (/pages/api/metal.js)
        const res = await fetch(`/api/metal?symbol=${encodeURIComponent(metal.shortName)}`);
        if (!res.ok) throw new Error('Erreur réseau');
        const json = await res.body ? await res.json() : null;
        if (json?.error) throw new Error(json.error);
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [metal.shortName]);

  // Calcul de la variation de prix
  const getVariation = () => {
    if (!data || !data.previousClose) return { percent: 0, isPositive: true };
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
        <span className="badge" style={{ background: `${metal.color}18`, color: metal.color }}>
          {metal.shortName}
        </span>
      </div>

      <div className="accent-line" style={{ backgroundColor: metal.color }} />
      <div className="card-note">{metal.note}</div>

      {/* Zone d'affichage du Prix & de la Variation */}
      <div style={{ padding: '0 16px 12px', display: 'flex', alignItems: 'baseline', gap: '10px' }}>
        {loading ? (
          <span style={{ fontSize: '18px', color: 'var(--muted)' }}>Chargement...</span>
        ) : error ? (
          <span style={{ fontSize: '13px', color: '#EF4444' }}>Données indisponibles</span>
        ) : (
          <>
            <span style={{ fontSize: '22px', fontWeight: 'bold' }}>
              {data.currentPrice?.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} {data.currency}
            </span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: variation.isPositive ? '#10B981' : '#EF4444' }}>
              {variation.isPositive ? '+' : ''}{variation.percent}%
            </span>
          </>
        )}
      </div>

      {/* Conteneur Graphique SVG Interactif / Natif */}
      <div className="chart-container" style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <div style={{ color: 'var(--muted)', fontSize: '12px' }}>Génération du graphique...</div>
        ) : error ? (
          <div style={{ color: 'var(--muted)', fontSize: '12px' }}>Graphique non disponible</div>
        ) : data?.points && data.points.length > 0 ? (
          <SvgLineChart points={data.points} color={metal.color} />
        ) : (
          <div style={{ color: 'var(--muted)', fontSize: '12px' }}>Aucun historique disponible</div>
        )}
      </div>
    </div>
  );
}

// Composant interne pour dessiner une courbe SVG pure sans dépendances tierces
function SvgLineChart({ points, color }) {
  const width = 340;
  const height = 120;
  const padding = 10;

  const prices = points.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;

  // Traduction des points en coordonnées pixels pour le SVG
  const svgPoints = points.map((p, i) => {
    const x = padding + (i / (points.length - 1)) * (width - padding * 2);
    // Inverse l'axe Y car en SVG le 0 est en haut
    const y = height - padding - ((p.price - minPrice) / priceRange) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={svgPoints}
        style={{ opacity: 0.85 }}
      />
    </svg>
  );
}
