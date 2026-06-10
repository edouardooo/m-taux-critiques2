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

        {/* Warning: REY not listed */}
        <div className="banner">
          ⚠ Les <strong style={{ color: '#D4A843' }}>terres rares (REY)</strong> ne sont pas cotées
          sur des marchés organisés. Consulter{' '}
          <a href="https://www.asianmetal.com" target="_blank" rel="noopener noreferrer">Asian Metal</a>
          {' '}ou{' '}
          <a href="https://www.usgs.gov/centers/national-minerals-information-center" target="_blank" rel="noopener noreferrer">USGS</a>
          {' '}pour leurs prix.
        </div>

        {/* Cards grid */}
        <div className="grid">
          {METALS.map((metal) => (
            <MetalCard key={metal.symbol} metal={metal} />
          ))}
        </div>
      </div>

      <div className="footer">
        <span>Graphiques fournis par TradingView</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </>
  );
}

function MetalCard({ metal }) {
  // Build TradingView iframe URL
  const chartUrl =
    `https://s.tradingview.com/widgetembed/?frameElementId=tv_chart` +
    `&symbol=${encodeURIComponent(metal.symbol)}` +
    `&interval=D` +
    `&hidesidetoolbar=1` +
    `&hidetoptoolbar=0` +
    `&saveimage=0` +
    `&toolbarbg=0F1520` +
    `&theme=dark` +
    `&locale=fr` +
    `&style=1`;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title" style={{ color: metal.color }}>
            {metal.name}
          </div>
          <div className="card-unit">{metal.unit}</div>
        </div>
        <span
          className="badge"
          style={{
            background: `${metal.color}18`,
            color: metal.color,
          }}
        >
          {metal.symbol.split(':')[1] || metal.symbol}
        </span>
      </div>

      <div
        className="accent-line"
        style={{ backgroundColor: metal.color }}
      />

      <div className="card-note">{metal.note}</div>

      <div className="chart-container">
        <iframe
          src={chartUrl}
          title={`Graphique ${metal.name}`}
          allowTransparency={true}
          scrolling="no"
          allowFullScreen={true}
        />
      </div>
    </div>
  );
}
