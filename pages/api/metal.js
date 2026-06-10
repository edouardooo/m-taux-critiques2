// pages/api/metal.js
export default async function handler(req, res) {
  const { symbol, range = '6mo' } = req.query;
  if (!symbol) return res.status(400).json({ error: 'symbol requis' });

  // Optimisation de l'intervalle selon la longueur de la période demandée
  let interval = '1d';
  if (range === '5y') interval = '1wk';
  if (range === '10y') interval = '1mo';

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
    });

    if (!response.ok) throw new Error(`Yahoo Finance: ${response.status}`);

    const data = await response.json();
    const chart = data?.chart?.result?.[0];
    if (!chart) throw new Error('Aucune donnée renvoyée par le fournisseur');

    const timestamps = chart.timestamp || [];
    const closes = chart.indicators.quote[0].close || [];
    const meta = chart.meta;

    // Filtrage des valeurs invalides/nulles
    const points = timestamps
      .map((t, i) => ({ date: t * 1000, price: closes[i] }))
      .filter(p => p.price !== null && p.price !== undefined);

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    res.status(200).json({
      symbol: meta.symbol,
      currency: meta.currency,
      currentPrice: meta.regularMarketPrice,
      previousClose: meta.previousClose || meta.chartPreviousClose,
      points,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
