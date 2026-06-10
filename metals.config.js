// metals.config.js
export const SITE_TITLE = "Observatoire des Ressources Minérales Sous-Marines";
export const SITE_SUBTITLE = "Suivi des cours des métaux critiques présents dans les gisements océaniques profonds";

export const METALS = [
  {
    name: "Nodules Polymétalliques",
    proxyName: "Cuivre (COMEX)",
    shortName: "HG=F",
    unit: "USD / Livre (lb)",
    color: "#3B82F6",
    note: "Gisements des plaines abyssales (4000-6000m). Riches en Manganèse, Nickel, Cuivre et Cobalt."
  },
  {
    name: "Encroûtements Cobaltifères",
    proxyName: "Platine (NYMEX)",
    shortName: "PL=F",
    unit: "USD / Once troy",
    color: "#A855F7",
    note: "Formés sur les flancs des monts sous-marins (800-2500m). Fortes concentrations en Cobalt et Platine."
  },
  {
    name: "Amas Sulfurés Hydrothermaux",
    proxyName: "Or (COMEX)",
    shortName: "GC=F",
    unit: "USD / Once troy",
    color: "#EAB308",
    note: "Situés au niveau des dorsales océaniques. Riches en Cuivre, Zinc, Or et Argent."
  },
  {
    name: "Terres Rares Océaniques",
    proxyName: "Proxy ETF (REMX)",
    shortName: "REMX",
    unit: "Cours de l'indice (USD)",
    color: "#10B981",
    note: "Boues métallifères de grande profondeur. Composées de Terres Rares lourdes et d'Yttrium (REY)."
  }
];
