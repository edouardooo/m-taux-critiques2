const SITE_TITLE = "Métaux des fonds marins";
const SITE_SUBTITLE = "Nodules polymétalliques · Encroûtements cobaltifères · Sulfures hydrothermaux";

const METALS = [
  {
    name: "Cobalt", shortName: "Cobalt", unit: "USD / tonne",
    note: "Nodules polymétalliques & encroûtements cobaltifères", color: "#5B8FF9",
    chartUrl: "https://sslcharts.investing.com/index.php?force_lang=5&pair_id=961983&theme=dark",
  },
  {
    name: "Nickel", shortName: "Nickel", unit: "USD / tonne",
    note: "Nodules polymétalliques", color: "#7EB8D4",
    chartUrl: "https://sslcharts.investing.com/index.php?force_lang=5&pair_id=959629&theme=dark",
  },
  {
    name: "Cuivre", shortName: "Cuivre", unit: "USD / tonne",
    note: "Sulfures hydrothermaux & nodules", color: "#E07B3A",
    chartUrl: "https://sslcharts.investing.com/index.php?force_lang=5&pair_id=959630&theme=dark",
  },
  {
    name: "Manganèse", shortName: "Manganèse", unit: "USD / tonne",
    note: "Nodules polymétalliques & encroûtements", color: "#A87FC0",
    chartUrl: "https://sslcharts.investing.com/index.php?force_lang=5&pair_id=961985&theme=dark",
  },
  {
    name: "Zinc", shortName: "Zinc", unit: "USD / tonne",
    note: "Sulfures hydrothermaux", color: "#9BA8B5",
    chartUrl: "https://sslcharts.investing.com/index.php?force_lang=5&pair_id=959635&theme=dark",
  },
  {
    name: "Or", shortName: "Or", unit: "USD / once",
    note: "Sulfures hydrothermaux", color: "#D4A843",
    chartUrl: "https://sslcharts.investing.com/index.php?force_lang=5&pair_id=68&theme=dark",
  },
  {
    name: "Lithium", shortName: "Lithium", unit: "USD / tonne",
    note: "Sédiments marins profonds", color: "#5EC47A",
    chartUrl: "https://sslcharts.investing.com/index.php?force_lang=5&pair_id=1060519&theme=dark",
  },
];

module.exports = { SITE_TITLE, SITE_SUBTITLE, METALS };
