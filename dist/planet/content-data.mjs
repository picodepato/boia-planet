// Names and genres supplied by BOIA. Portraits and personal answers await the artists.
export const ARTISTS = [
 ['Alba Fitz','Melodic Techno, Downtempo'],['Amenaza Verde','Cumbia'],['Casta Diva','Hip Hop'],['DJ Alpina','Electro, Techno'],['DJ Sacred','Techno'],['EGFNK','House'],['Franco Maltratto','Reggaeton, House'],['Koko Moreno','Reggaeton, House, Hard Dance'],['Las Precarias de Torrevieja','Techno, Hard Dance'],['Latin Master X','House'],['Manija','Melodic Techno, Techno, Psytrance'],['Marabina','Ambient, Experimental'],['Moglia (Live)','Hip Hop, Jazz Fusion'],['Nacho Age','House'],['Nat','House'],['Pollo Can Fly','Hard Dance, Hard Trance'],['Rancho Cashmere','Country'],['RBS','Techno'],['RKVX','Techno'],['Soviet Gym','House'],['Spowy','House'],['Stonzze','Hard Bounce, Hard Trance'],['Tere Ling','Hard Bounce, Hard Groove, Hard Trance'],['Tonitto','Reggaeton, Hip Hop'],['Torvik','Tech House'],['Wet Kisses','Trance']
].map(([name,genre])=>({name,genre,letter:name[0],avatar:'../assets/mascot.jpeg'}));
export const CARD_QUESTIONS = [
 ['¿Cuál ha sido la cosa más rara que has visto pasar en una fiesta o festival?','What is the strangest thing you have seen at a party or festival?'],
 ['¿Cuál es el mejor descubrimiento musical que hiciste por casualidad?','What is your best accidental musical discovery?'],
 ['¿Qué obra, fotografía, película, disco o pieza artística te cambió un poco la cabeza?','Which work, photograph, film, record or artwork changed the way you think?'],
 ['¿Cuál es tu mejor recuerdo relacionado con la música?','What is your favourite memory connected with music?'],
 ['Completa la frase: una buena fiesta necesita siempre…','Complete the sentence: a good party always needs…']
];
export const PHILOSOPHY = [
 ['BOIA nace en Alicante para dar espacio a lo que merece ser descubierto. Un punto de encuentro entre artistas que empiezan, nombres consolidados y personas con ganas de escuchar más allá de su escena.','Born in Alicante, BOIA makes room for what deserves to be discovered. A meeting place for emerging artists, established names and people ready to listen beyond their own scene.'],
 ['Nuestra curiosidad no tiene un solo género. Electrónica, reggaetón, música en directo, country o rock comparten espacio con fotografía, fanzines, comida, pequeñas marcas y otras formas de cultura.','Our curiosity has no single genre. Electronic music, reggaeton, live music, country and rock share space with photography, zines, food, small brands and other forms of culture.'],
 ['Queremos crecer de forma sostenible y justa: cerca de los artistas, del público y de quienes lo hacen posible. Cuidar el encuentro va antes que maximizar el beneficio a costa de quienes participan.','We want to grow sustainably and fairly, staying close to artists, audiences and everyone making it happen. Caring for the gathering comes before maximising profit at participants’ expense.'],
 ['All Day BOIA es nuestro encuentro principal. Las house parties, colaboraciones con clubs, cafés, running y prefiestas también abren puertas a este universo.','All Day BOIA is our main gathering. House parties, club collaborations, coffee, running and warm-up parties also open doors to this universe.']
];
export function artistTrio(cursor){return Array.from({length:3},(_,i)=>(cursor+i)%ARTISTS.length);}
export function avatarStyle(value){return ['coral','ocean','sand'].includes(value)?value:'coral';}
