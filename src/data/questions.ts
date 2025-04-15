export interface Question {
  id: number;
  title: string;
  question: string;
  solution?: string;
}

export const questions: Question[] = [
  {
    id: 1,
    title: "Basis Query Structuur",
    question: "Schrijf een SQL-query die de kolommen naam en leeftijd selecteert uit de tabel klanten.",
    solution: "SELECT naam, leeftijd\nFROM klanten;"
  },
  {
    id: 2,
    title: "Filteren van Data met WHERE",
    question: "Schrijf een SQL-query die alle rijen ophaalt uit de tabel producten waarvan de prijs tussen 50 en 100 ligt.",
    solution: "SELECT *\nFROM producten\nWHERE prijs BETWEEN 50 AND 100;"
  },
  {
    id: 3,
    title: "Aggregatiefuncties en Groeperen",
    question: "In de tabel bestellingen staan de kolommen klant_id en order_bedrag.\nSchrijf een SQL-query die per klant het totaal aantal bestellingen en het gemiddelde orderbedrag berekent.",
    solution: "SELECT klant_id,\n       COUNT(*) AS aantal_bestellingen,\n       AVG(order_bedrag) AS gemiddeld_bedrag\nFROM bestellingen\nGROUP BY klant_id;"
  },
  {
    id: 4,
    title: "Gebruik van HAVING",
    question: "Schrijf een SQL-query die, per klant in de tabel bestellingen, het aantal bestellingen berekent en alleen de klanten toont die meer dan 3 bestellingen hebben geplaatst.",
    solution: "SELECT klant_id,\n       COUNT(*) AS aantal_bestellingen\nFROM bestellingen\nGROUP BY klant_id\nHAVING COUNT(*) > 3;"
  },
  {
    id: 5,
    title: "Gebruik van DISTINCT",
    question: "Schrijf een SQL-query die alle unieke landen ophaalt uit de tabel klanten.",
    solution: "SELECT DISTINCT land\nFROM klanten;"
  },
  {
    id: 6,
    title: "INNER JOIN",
    question: "Gegeven de tabellen orders (met kolom klant_id) en klanten (met kolom id), schrijf een SQL-query die alle orders ophaalt die horen bij een bestaande klant. Gebruik hiervoor een INNER JOIN.",
    solution: "SELECT o.*, k.naam\nFROM orders AS o\nINNER JOIN klanten AS k ON o.klant_id = k.id;"
  },
  {
    id: 7,
    title: "LEFT JOIN",
    question: "Schrijf een SQL-query die alle klanten toont, ongeacht of ze een order hebben in de tabel orders. Zorg ervoor dat de kolommen van orders NULL tonen wanneer er geen overeenkomst is.",
    solution: "SELECT k.*, o.order_id, o.order_bedrag\nFROM klanten AS k\nLEFT JOIN orders AS o ON k.id = o.klant_id;"
  },
  {
    id: 8,
    title: "Set Operaties (UNION vs. UNION ALL)",
    question: "Je hebt twee afzonderlijke queries op de tabel producten:\n\n    De eerste query haalt alle producten op met een prijs boven 100.\n    De tweede query haalt alle producten op met een prijs onder 50.\n\nSchrijf een SQL-query die de resultaten van deze twee queries combineert, waarbij duplicaten worden verwijderd. Geef ook aan welke set-operator je gebruikt en licht kort toe waarom.",
    solution: "SELECT product_id, product_naam, prijs\nFROM producten\nWHERE prijs > 100\nUNION\nSELECT product_id, product_naam, prijs\nFROM producten\nWHERE prijs < 50;"
  },
  {
    id: 9,
    title: "Subqueries in SELECT (Scalar Subquery)",
    question: "Gegeven de tabel klanten (met kolommen id en naam) en de tabel orders (met kolommen klant_id en order_bedrag), schrijf een SQL-query die per klant de naam en het maximale orderbedrag (uit orders) weergeeft. Gebruik hierbij een scalar subquery binnen je SELECT-lijst.",
    solution: "SELECT k.naam,\n       (SELECT MAX(order_bedrag)\n        FROM orders AS o\n        WHERE o.klant_id = k.id) AS max_orderbedrag\nFROM klanten AS k;"
  },
  {
    id: 10,
    title: "ORDER BY en LIMIT",
    question: "Schrijf een SQL-query die de vijf duurste producten ophaalt uit de tabel producten. Sorteer hierbij op aflopende volgorde van prijs en beperk het resultaat tot 5 rijen.",
    solution: "SELECT *\nFROM producten\nORDER BY prijs DESC\nLIMIT 5;"
  },
  {
    id: 11,
    title: "SELF JOIN",
    question: "In de tabel medewerkers staan de kolommen id, naam en manager_id.\nSchrijf een SQL-query die per medewerker de naam van hun manager toont. Zorg ervoor dat ook medewerkers zonder toegewezen manager (waar manager_id NULL is) worden weergegeven. Tip: Gebruik hiervoor een LEFT JOIN.",
    solution: "SELECT m.naam AS medewerker,\n       manager.naam AS manager\nFROM medewerkers AS m\nLEFT JOIN medewerkers AS manager ON m.manager_id = manager.id;"
  }
];
