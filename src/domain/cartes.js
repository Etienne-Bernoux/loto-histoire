/**
 * Domain - Données des cartes historiques
 * Value objects immuables représentant les événements
 */
export const CARTES_HISTOIRE = Object.freeze([
  { id: 1,  titre: "52 av. J.-C.",  date: -52,   image: "images/avec_date/carte_10.png", imageSansDate: "images/sans_date/carte_10_cleanup.png", description: "Vercingétorix dépose les armes devant César à Alésia" },
  { id: 2,  titre: "451",           date: 451,    image: "images/avec_date/carte_11.png", imageSansDate: "images/sans_date/carte_11_cleanup.png", description: "Attila et les Huns sont repoussés aux Champs Catalauniques" },
  { id: 3,  titre: "496",           date: 496,    image: "images/avec_date/carte_12.png", imageSansDate: "images/sans_date/carte_12_cleanup.png", description: "Baptême de Clovis, roi des Francs" },
  { id: 4,  titre: "732",           date: 732,    image: "images/avec_date/carte_13.png", imageSansDate: "images/sans_date/carte_13_cleanup.png", description: "Charles Martel arrête les Arabes à Poitiers" },
  { id: 5,  titre: "800",           date: 800,    image: "images/avec_date/carte_14.png", imageSansDate: "images/sans_date/carte_14_cleanup.png", description: "Charlemagne couronné empereur d'Occident" },
  { id: 6,  titre: "843",           date: 843,    image: "images/avec_date/carte_15.png", imageSansDate: "images/sans_date/carte_15_cleanup.png", description: "Traité de Verdun : partage de l'Empire carolingien" },
  { id: 7,  titre: "885",           date: 885,    image: "images/avec_date/carte_16.png", imageSansDate: "images/sans_date/carte_16_cleanup.png", description: "Siège de Paris par les Vikings" },
  { id: 8,  titre: "911",           date: 911,    image: "images/avec_date/carte_17.png", imageSansDate: "images/sans_date/carte_17_cleanup.png", description: "Traité de Saint-Clair-sur-Epte : la Normandie aux Vikings" },
  { id: 9,  titre: "1066",          date: 1066,   image: "images/avec_date/carte_18.png", imageSansDate: "images/sans_date/carte_18_cleanup.png", description: "Guillaume le Conquérant envahit l'Angleterre" },
  { id: 10, titre: "1099",          date: 1099,   image: "images/avec_date/carte_01.png", imageSansDate: "images/sans_date/carte_01_cleanup.png", description: "Première croisade : prise de Jérusalem" },
  { id: 11, titre: "1214",          date: 1214,   image: "images/avec_date/carte_02.png", imageSansDate: "images/sans_date/carte_02_cleanup.png", description: "Bataille de Bouvines, victoire de Philippe Auguste" },
  { id: 12, titre: "1226",          date: 1226,   image: "images/avec_date/carte_03.png", imageSansDate: "images/sans_date/carte_03_cleanup.png", description: "Avènement de Saint Louis (Louis IX)" },
  { id: 13, titre: "1302",          date: 1302,   image: "images/avec_date/carte_04.png", imageSansDate: "images/sans_date/carte_04_cleanup.png", description: "Premiers États généraux convoqués par Philippe le Bel" },
  { id: 14, titre: "1346",          date: 1346,   image: "images/avec_date/carte_05.png", imageSansDate: "images/sans_date/carte_05_cleanup.png", description: "Bataille de Crécy, début de la guerre de Cent Ans" },
  { id: 15, titre: "1429",          date: 1429,   image: "images/avec_date/carte_06.png", imageSansDate: "images/sans_date/carte_06_cleanup.png", description: "Jeanne d'Arc délivre Orléans" },
  { id: 16, titre: "1431",          date: 1431,   image: "images/avec_date/carte_07.png", imageSansDate: "images/sans_date/carte_07_cleanup.png", description: "Jeanne d'Arc est brûlée à Rouen" },
  { id: 17, titre: "1515",          date: 1515,   image: "images/avec_date/carte_08.png", imageSansDate: "images/sans_date/carte_08_cleanup.png", description: "François Iᵉʳ victorieux à Marignan" },
  { id: 18, titre: "1559",          date: 1559,   image: "images/avec_date/carte_09.png", imageSansDate: "images/sans_date/carte_09_cleanup.png", description: "Traité du Cateau-Cambrésis, les Trois-Évêchés deviennent français" },
  { id: 19, titre: "1572",          date: 1572,   image: "images/avec_date/carte_19.png", imageSansDate: "images/sans_date/carte_19_cleanup.png", description: "Massacre de la Saint-Barthélemy" },
  { id: 20, titre: "1598",          date: 1598,   image: "images/avec_date/carte_20.png", imageSansDate: "images/sans_date/carte_20_cleanup.png", description: "Édit de Nantes : tolérance et liberté de culte" },
  { id: 21, titre: "1610",          date: 1610,   image: "images/avec_date/carte_21.png", imageSansDate: "images/sans_date/carte_21_cleanup.png", description: "Assassinat d'Henri IV par Ravaillac" },
  { id: 22, titre: "1648",          date: 1648,   image: "images/avec_date/carte_22.png", imageSansDate: "images/sans_date/carte_22_cleanup.png", description: "Traités de Westphalie, fin de la guerre de Trente Ans" },
  { id: 23, titre: "1659",          date: 1659,   image: "images/avec_date/carte_23.png", imageSansDate: "images/sans_date/carte_23_cleanup.png", description: "Traité des Pyrénées entre la France et l'Espagne" },
  { id: 24, titre: "1678",          date: 1678,   image: "images/avec_date/carte_24.png", imageSansDate: "images/sans_date/carte_24_cleanup.png", description: "Traité de Nimègue, apogée du règne de Louis XIV" },
  { id: 25, titre: "1715",          date: 1715,   image: "images/avec_date/carte_25.png", imageSansDate: "images/sans_date/carte_25_cleanup.png", description: "Mort de Louis XIV après 72 ans de règne" },
  { id: 26, titre: "1763",          date: 1763,   image: "images/avec_date/carte_26.png", imageSansDate: "images/sans_date/carte_26_cleanup.png", description: "Traité de Paris : la France perd le Canada et l'Inde" },
  { id: 27, titre: "1789",          date: 1789,   image: "images/avec_date/carte_27.png", imageSansDate: "images/sans_date/carte_27_cleanup.png", description: "Révolution française, prise de la Bastille" },
]);

export function trouverCarte(id) {
  return CARTES_HISTOIRE.find(c => c.id === id);
}
