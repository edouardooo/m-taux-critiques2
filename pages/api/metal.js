export default async function handler(req, res) {
  const { symbol } = req.query;
  if (!symbol) return res.status(400).json({ error: 'symbol requis' });

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=6mo`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
    });
    if (!response.ok) throw new Error(`Yahoo: ${response.status}`);
    const data = await response.json();
    const chart = data?.chart?.result?.[0];
    if (!chart) throw new Error('Pas de données');
    const timestamps = chart.timestamp;
    const closes = chart.indicators.quote[0].close;
    const meta = chart.meta;
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
