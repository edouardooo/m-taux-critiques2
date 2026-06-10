/**
 * ============================================================
 *  FICHIER DE CONFIGURATION — modifie uniquement ce fichier
 * ============================================================
 *
 *  Pour ajouter un métal : copie un bloc et change les valeurs
 *  Pour retirer un métal : supprime son bloc
 *
 *  symbol : code TradingView  (ex: "COMEX:HG1!", "LME:NI1!")
 *  Pour trouver un symbole : va sur tradingview.com, recherche
 *  le métal, copie le code affiché en haut à gauche du graphe
 * ============================================================
 */

const SITE_TITLE = "Métaux des fonds marins";
const SITE_SUBTITLE = "Nodules polymétalliques · Encroûtements cobaltifères · Sulfures hydrothermaux";

const METALS = [
  {
    name: "Cobalt",
    symbol: "LME:CO1!",
    unit: "USD / tonne",
    note: "Nodules polymétalliques & encroûtements cobaltifères",
    color: "#5B8FF9",
  },
  {
    name: "Nickel",
    symbol: "LME:NI1!",
    unit: "USD / tonne",
    note: "Nodules polymétalliques",
    color: "#7EB8D4",
  },
  {
    name: "Cuivre",
    symbol: "COMEX:HG1!",
    unit: "USD / livre",
    note: "Sulfures hydrothermaux & nodules",
    color: "#E07B3A",
  },
  {
    name: "Manganèse",
    symbol: "TVC:MANGANESE",
    unit: "USD / tonne",
    note: "Nodules polymétalliques & encroûtements",
    color: "#A87FC0",
  },
  {
    name: "Zinc",
    symbol: "LME:ZN1!",
    unit: "USD / tonne",
    note: "Sulfures hydrothermaux",
    color: "#9BA8B5",
  },
  {
    name: "Or",
    symbol: "COMEX:GC1!",
    unit: "USD / once",
    note: "Sulfures hydrothermaux",
    color: "#D4A843",
  },
  {
    name: "Lithium",
    symbol: "TVC:LITHIUM",
    unit: "CNY / tonne",
    note: "Sédiments marins profonds",
    color: "#5EC47A",
  },
];

module.exports = { SITE_TITLE, SITE_SUBTITLE, METALS };
