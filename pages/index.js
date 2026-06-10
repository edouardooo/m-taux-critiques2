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
        <div className="banner" style={{ background: 'rgba(239, 68, 68, 0.08)', borderColor: '#EF4444' }}>
          <strong>Méthodologie Scientifique :</strong> La majorité des métaux sous-marins n'ont pas de marché boursier public ouvert (contrats de gré à gré privés). Les badges indiquent le niveau de fiabilité de l'instrument financier utilisé.
        </div>

        <div className="grid">
          {METALS.map((metal) => (
            <MetalCard key={metal.shortName} metal={metal} range={range} />
          ))}
        </div>
      </div>

      <div className="footer">
        <span>Structure de transparence des données de marchés — Observatoire des Grands Fonds</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </>
  );
}

function MetalCard({ metal, range }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // État pour suivre le point survolé par l'utilisateur
  const [hoveredPoint, setHoveredPoint] = useState(null);

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
      } finaly {
        setLoading(false);
      }
    }
    fetchData();
    setHoveredPoint(null); // Reset le survol lors d'un changement de période
  }, [metal.shortName, range]);

  const prices = data?.points?.map(p => p.price) || [];
  const minPeriod = prices.length ? Math.min(...prices) : 0;
  const maxPeriod = prices.length ? Math.max(...prices) : 0;

  const changePercent = data && data.previousClose
    ? (((data.currentPrice - data.previousClose) / data.previousClose) * 100).toFixed(2)
    : "0.00";

  const getProxyColor = (type) => {
    if (!type) return '#EF4444';
    if (type.includes('Physique')) return '#10B981';
    if (type.includes('Acceptable') || type.includes('Panier')) return '#F59E0B';
    return '#EF4444';
  };

  const badgeColor = getProxyColor(metal.proxyType);

  // Valeurs affichées : switch automatique entre la valeur actuelle et la valeur survolée au curseur
  const displayPrice = hoveredPoint ? hoveredPoint.price : data?.currentPrice;
  const isHovering = hoveredPoint !== null;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div className="card-header" style={{ paddingBottom: '4px' }}>
          <div>
            <div className="card-title" style={{ color: metal.color, fontSize: '16px', fontWeight: '700' }}>
              {metal.name}
            </div>
            <div className="card-unit">{metal.unit}</div>
          </div>
          <span className="badge" style={{ background: `${badgeColor}15`, color: badgeColor, border: `1px solid ${badgeColor}40`, fontSize: '10px' }}>
            {metal.proxyType || "Proxy Action"}
          </span>
        </div>

        <div style={{ padding: '0 16px 8px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--muted)' }}>
          <span>Source : <span style={{ fontFamily: 'monospace', color: '#E8EBF0' }}>{metal.proxyName}</span></span>
          {/* Affiche la date précise du point survolé */}
          {isHovering && (
            <span style={{ color: metal.color, fontWeight: '600', background: `${metal.color}15`, padding: '0 4px', borderRadius: '3px' }}>
              {new Date(hoveredPoint.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
            </span>
          )}
        </div>

        <div className="accent-line" style={{ backgroundColor: metal.color, opacity: 0.3 }} />
        <div className="card-note" style={{ minHeight: '44px', marginTop: '8px', fontSize: '12px', lineHeight: '1.4' }}>
          {metal.note}
        </div>
      </div>

      <div>
        <div style={{ padding: '0 16px 8px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          {loading ? (
            <span style={{ fontSize: '20px', color: '#4A5568' }}>Analyse des données...</span>
          ) : error ? (
            <span style={{ fontSize: '13px', color: '#EF4444' }}>Indice non coté</span>
          ) : (
            <>
              <span style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px', color: isHovering ? '#FFF' : 'inherit' }}>
                {displayPrice?.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 'normal' }}>{data.currency}</span>
              </span>
              {!isHovering ? (
                <span style={{ fontSize: '13px', fontWeight: '700', color: parseFloat(changePercent) >= 0 ? '#10B981' : '#EF4444' }}>
                  {parseFloat(changePercent) >= 0 ? '▲ +' : '▼ '}{changePercent}%
                </span>
              ) : (
                <span style={{ fontSize: '11px', color: 'var(--muted)', fontStyle: 'italic' }}>[Historique]</span>
              )}
            </>
          )}
        </div>

        <div style={{ height: '140px', padding: '0 16px 12px' }}>
          {!loading && !error && data?.points?.length > 0 ? (
            <InteractiveChart 
              points={data.points} 
              color={metal.color} 
              minPrice={minPeriod} 
              maxPrice={maxPeriod}
              onHoverPoint={(p) => setHoveredPoint(p)}
            />
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A5568', fontSize: '12px' }}>
              {loading ? 'Sondage des flux financiers...' : 'Graphique indisponible'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InteractiveChart({ points, color, minPrice, maxPrice, onHoverPoint }) {
  const width = 400;
  const height = 130;
  
  const paddingLeft = 52;
  const paddingRight = 10;
  const paddingTop = 15;
  const paddingBottom = 20;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const priceRange = maxPrice - minPrice || 1;

  const [activeIndex, setActiveIndex] = useState(null);

  // Conversion mathématique des coordonnées
  const coords = points.map((p, i) => {
    const x = paddingLeft + (i / (points.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - ((p.price - minPrice) / priceRange) * chartHeight;
    return { x, y };
  });

  const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
  const areaPath = coords.length 
    ? `${linePath} L ${coords[coords.length - 1].x} ${paddingTop + chartHeight} L ${coords[0].x} ${paddingTop + chartHeight} Z`
    : '';

  const formatDate = (ts) => new Date(ts).toLocaleDateString('fr-FR', { month: '2-digit', year: '2-digit' });
  const gradientId = `grad-${color.replace('#', '')}`;

  // Gestionnaire de calcul de collision du curseur souris
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - paddingLeft;
    
    // Calcul du ratio X converti en index de tableau
    const pct = Math.max(0, Math.min(1, mouseX / chartWidth));
    const index = Math.round(pct * (points.length - 1));
    
    setActiveIndex(index);
    if (onHoverPoint) onHoverPoint(points[index]);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
    if (onHoverPoint) onHoverPoint(null); // Restaure le prix actuel du marché
  };

  const activeCoord = activeIndex !== null ? coords[activeIndex] : null;

  return (
    <svg 
      viewBox={`0 0 ${width} ${height}`} 
      width="100%" 
      height="100%" 
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.30" />
          <stop offset="100%" stopColor={color} stopOpacity="0.00" />
        </linearGradient>
      </defs>

      {/* Grille statique de fond */}
      <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft + chartWidth} y2={paddingTop} stroke="#1E2A3A" strokeWidth="0.5" strokeDasharray="3 3" pointerEvents="none" />
      <line x1={paddingLeft} y1={paddingTop + chartHeight} x2={paddingLeft + chartWidth} y2={paddingTop + chartHeight} stroke="#1E2A3A" strokeWidth="1" pointerEvents="none" />
      <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={paddingTop + chartHeight} stroke="#1E2A3A" strokeWidth="1" pointerEvents="none" />

      {/* Rendu des tracés vectoriels */}
      {areaPath && <path d={areaPath} fill={`url(#${gradientId})`} pointerEvents="none" />}
      {linePath && <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pointerEvents="none" />}

      {/* Bornes financières (Y Axis) */}
      <text x={paddingLeft - 8} y={paddingTop + 4} fill="#6272a4" fontSize="10" pointerEvents="none" fontWeight="600" textAnchor="end">
        {maxPrice.toLocaleString('fr-FR', { maximumFractionDigits: 1 })}
      </text>
      <text x={paddingLeft - 8} y={paddingTop + chartHeight + 4} fill="#6272a4" fontSize="10" pointerEvents="none" fontWeight="600" textAnchor="end">
        {minPrice.toLocaleString('fr-FR', { maximumFractionDigits: 1 })}
      </text>

      {/* Bornes temporelles (X Axis) */}
      <text x={paddingLeft} y={paddingTop + chartHeight + 15} fill="#4A5568" fontSize="10" pointerEvents="none" textAnchor="start">
        {formatDate(points[0].date)}
      </text>
      <text x={paddingLeft + chartWidth} y={paddingTop + chartHeight + 15} fill="#4A5568" fontSize="10" pointerEvents="none" textAnchor="end">
        {formatDate(points[points.length - 1].date)}
      </text>

      {/* RÉTICULE DYNAMIQUE (Affiche la position si survolé) */}
      {activeCoord && (
        <g pointerEvents="none">
          {/* Ligne verticale témoin */}
          <line 
            x1={activeCoord.x} 
            y1={paddingTop} 
            x2={activeCoord.x} 
            y2={paddingTop + chartHeight} 
            stroke="#6272a4" 
            strokeWidth="1" 
            strokeDasharray="2 2" 
          />
          {/* Point d'ancrage magnétique rétroéclairé */}
          <circle cx={activeCoord.x} cy={activeCoord.y} r="6" fill={color} opacity="0.4" />
          <circle cx={activeCoord.x} cy={activeCoord.y} r="3.5" fill={color} stroke="#0B131F" strokeWidth="1.5" />
        </g>
      )}

      {/* ZONE INTERACTIVE INVISIBLE OBLIGATOIRE (Reçoit tous les événements souris) */}
      <rect
        x={paddingLeft}
        y={paddingTop}
        width={chartWidth}
        height={chartHeight}
        fill="transparent"
        style={{ cursor: 'crosshair', pointerEvents: 'all' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </svg>
  );
}
