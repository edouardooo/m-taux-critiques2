// metals.config.js
export const SITE_TITLE = "Observatoire des Ressources Minérales Sous-Marines";
export const SITE_SUBTITLE = "Suivi des 14 métaux critiques des nodules, encroûtements et amas sulfurés profonds";

export const METALS = [
  {
    name: "Manganèse",
    proxyName: "Eramet (ERA.PA)",
    shortName: "ERA.PA",
    unit: "Cours de l'action (EUR)",
    color: "#9B5DE5",
    note: "Composant ultra-majoritaire des nodules polymétalliques des plaines abyssales."
  },
  {
    name: "Nickel",
    proxyName: "Vale S.A. (VALE)",
    shortName: "VALE",
    unit: "Cours de l'action (USD)",
    color: "#4EA8DE",
    note: "Métal critique des nodules, indispensable pour les batteries de nouvelle génération."
  },
  {
    name: "Cuivre",
    proxyName: "Futures COMEX (HG=F)",
    shortName: "HG=F",
    unit: "USD / Livre (lb)",
    color: "#E63946",
    note: "Abondant dans les amas sulfurés hydrothermaux et les nodules."
  },
  {
    name: "Titane",
    proxyName: "ATI Inc. (ATI)",
    shortName: "ATI",
    unit: "Cours de l'action (USD)",
    color: "#8D99AE",
    note: "Présent dans les encroûtements et sédiments profonds, crucial pour l'aérospatial."
  },
  {
    name: "Cobalt",
    proxyName: "Glencore (GLNCY)",
    shortName: "GLNCY",
    unit: "Cours de l'action (USD)",
    color: "#0077B6",
    note: "Concentration record dans les encroûtements cobaltifères des monts sous-marins."
  },
  {
    name: "Terres Rares (TREE)",
    proxyName: "ETF Strategic Metals (REMX)",
    shortName: "REMX",
    unit: "Cours de l'indice (USD)",
    color: "#06D6A0",
    note: "Proxy global pour le groupe des Terres Rares (Total Rare Earth Elements)."
  },
  {
    name: "Molybdène",
    proxyName: "CMOC Group (CMCLF)",
    shortName: "CMCLF",
    unit: "Cours de l'action (USD)",
    color: "#FFB703",
    note: "Alliage de haute performance, présent comme sous-produit des nodules."
  },
  {
    name: "Vanadium",
    proxyName: "Largo Inc. (LGO)",
    shortName: "LGO",
    unit: "Cours de l'action (USD)",
    color: "#FB8500",
    note: "Métal stratégique pour le stockage d'énergie stationnaire à grande échelle."
  },
  {
    name: "Zirconium",
    proxyName: "Iluka Resources (ILKAY)",
    shortName: "ILKAY",
    unit: "Cours de l'action (USD)",
    color: "#E07A5F",
    note: "Issu des minéraux lourds des placers marins et encroûtements."
  },
  {
    name: "Thallium",
    proxyName: "Teck Resources (TECK)",
    shortName: "TECK",
    unit: "Cours de l'action (USD)",
    color: "#F4A261",
    note: "Métal ultra-rare, sous-produit des sulfures massifs de plomb et zinc."
  },
  {
    name: "Lithium",
    proxyName: "Global X ETF (LIT)",
    shortName: "LIT",
    unit: "Cours de l'indice (USD)",
    color: "#3A86FF",
    note: "Traces d'intérêt technologique majeur au sein des boues pélagiques."
  },
  {
    name: "Yttrium",
    proxyName: "Lynas Rare Earths (LYSCF)",
    shortName: "LYSCF",
    unit: "Cours de l'action (USD)",
    color: "#FF006E",
    note: "Terre rare lourde fortement enrichie dans les boues métallifères océaniques."
  },
  {
    name: "Tungstène",
    proxyName: "Almonty Ind. (ALMTF)",
    shortName: "ALMTF",
    unit: "Cours de l'action (USD)",
    color: "#7209B7",
    note: "Métal à point de fusion extrême, critique pour les outils de forage et de défense."
  },
  {
    name: "Tellure (Tellurium)",
    proxyName: "5N Plus (FNPUF)",
    shortName: "FNPUF",
    unit: "Cours de l'action (USD)",
    color: "#2A9D8F",
    note: "Semi-conducteur d'une rareté extrême, lié aux dépôts de cuivre sous-marins."
  }
];
