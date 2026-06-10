// metals.config.js
export const SITE_TITLE = "Observatoire des Ressources Minérales Sous-Marines";
export const SITE_SUBTITLE = "Indice de transparence des 14 métaux critiques des grands fonds";

export const METALS = [
  {
    name: "Cuivre",
    proxyName: "Futures COMEX (HG=F)",
    shortName: "HG=F",
    unit: "USD / Livre (lb)",
    color: "#E63946",
    proxyType: "Physique Direct",
    note: "Contrat à terme officiel. Reflète à 100% le cours physique mondial."
  },
  {
    name: "Nickel",
    proxyName: "WisdomTree ETC (NICK.L)",
    shortName: "NICK.L",
    unit: "Index de prix (USD)",
    color: "#4EA8DE",
    proxyType: "Physique (ETC)",
    note: "Traqueur adossé directement aux stocks physiques du London Metal Exchange (LME)."
  },
  {
    name: "Cobalt",
    proxyName: "WisdomTree ETC (COBA.L)",
    shortName: "COBA.L",
    unit: "Index de prix (USD)",
    color: "#0077B6",
    proxyType: "Physique (ETC)",
    note: "Adossé au Bloomberg Cobalt Index. Bien meilleur que l'action Glencore."
  },
  {
    name: "Lithium",
    proxyName: "Albemarle (ALB)",
    shortName: "ALB",
    unit: "Action d'entreprise (USD)",
    color: "#3A86FF",
    proxyType: "Proxy Action (Imparfait)",
    note: "Pas de cotation physique directe propre sur Yahoo. Indexé sur le leader mondial du lithium."
  },
  {
    name: "Terres Rares (TREE)",
    proxyName: "ETF VanEck (REMX)",
    shortName: "REMX",
    unit: "Cours de l'indice (USD)",
    color: "#06D6A0",
    proxyType: "Proxy Panier d'Actions",
    note: "Aucun cours physique global existant. Panier des 20 plus gros producteurs de terres rares."
  },
  {
    name: "Vanadium",
    proxyName: "Largo Inc. (LGO)",
    shortName: "LGO",
    unit: "Action Pure-Play (USD)",
    color: "#FB8500",
    proxyType: "Proxy Action (Acceptable)",
    note: "Compagnie minière pure-play. Ses revenus dépendent exclusivement du Vanadium."
  },
  {
    name: "Zirconium",
    proxyName: "Iluka Resources (ILKAY)",
    shortName: "ILKAY",
    unit: "Action Pure-Play (USD)",
    color: "#E07A5F",
    proxyType: "Proxy Action (Imparfait)",
    note: "Pas de marché public pour le Zircon. Iluka est le thermomètre du secteur."
  },
  {
    name: "Tungstène",
    proxyName: "Almonty Ind. (ALMTF)",
    shortName: "ALMTF",
    unit: "Action Pure-Play (USD)",
    color: "#7209B7",
    proxyType: "Proxy Action (Imparfait)",
    note: "Marché de gré à gré. Almonty est l'un des rares exploitants pure-play au monde."
  },
  {
    name: "Tellure (Tellurium)",
    proxyName: "5N Plus (FNPUF)",
    shortName: "FNPUF",
    unit: "Action Spécialisée (USD)",
    color: "#2A9D8F",
    proxyType: "Proxy Action (Mauvais)",
    note: "Métal ultra-opaque, sous-produit du cuivre. 5N Plus est un transformateur, pas un cours physique."
  },
  {
    name: "Yttrium",
    proxyName: "Lynas Rare Earths (LYSCF)",
    shortName: "LYSCF",
    unit: "Action Spécialisée (USD)",
    color: "#FF006E",
    proxyType: "Proxy Action (Mauvais)",
    note: "L'Yttrium pur n'a pas de cours boursier. Lynas l'extrait au milieu d'autres terres rares."
  },
  {
    name: "Manganèse",
    proxyName: "Jupiter Mines (JAOMF)",
    shortName: "JAOMF",
    unit: "Action Spécialisée (USD)",
    color: "#9B5DE5",
    proxyType: "Proxy Action (Mauvais)",
    note: "Le minerai brute se négocie par contrats privés. Jupiter opère une mine pure en Afrique du Sud."
  },
  {
    name: "Titane",
    proxyName: "Kenmare Res. (KMR.L)",
    shortName: "KMR.L",
    unit: "Action Spécialisée (GBP)",
    color: "#8D99AE",
    proxyType: "Proxy Action (Mauvais)",
    note: "Marché opaque. Kenmare produit le sable d'Ilménite brute servant de base au titane."
  },
  {
    name: "Molybdène",
    proxyName: "CMOC Group (CMCLF)",
    shortName: "CMCLF",
    unit: "Action Diversifiée (Mauvais)",
    color: "#FFB703",
    note: "Premier producteur mondial, mais le cours de l'action est pollué par ses mines de cuivre majeures."
  },
  {
    name: "Thallium",
    proxyName: "Teck Resources (TECK)",
    shortName: "TECK",
    unit: "Action Diversifiée (Inadapté)",
    color: "#F4A261",
    proxyType: "Aucun Proxy Fiable",
    note: "Métal confidentiel sans aucune cotation. Teck est un des rares à le raffiner comme sous-produit."
  }
];
