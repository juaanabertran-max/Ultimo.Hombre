// Datos de ejemplo y reglas de negocio del prototipo de Último Hombre.
// Todo vive en memoria: al recargar la página se vuelve al estado inicial.

export const DAYS = [
  { d: 0, chip: 'hoy', corto: 'hoy', largo: 'hoy, miércoles 14', dia: 'mié' },
  { d: 1, chip: 'jue 15', corto: 'jue 15', largo: 'jueves 15', dia: 'jue' },
  { d: 2, chip: 'vie 16', corto: 'vie 16', largo: 'viernes 16', dia: 'vie' },
  { d: 3, chip: 'sáb 17', corto: 'sáb 17', largo: 'sábado 17', dia: 'sáb' },
  { d: 4, chip: 'dom 18', corto: 'dom 18', largo: 'domingo 18', dia: 'dom' },
  { d: 5, chip: 'lun 19', corto: 'lun 19', largo: 'lunes 19', dia: 'lun' },
  { d: 6, chip: 'mar 20', corto: 'mar 20', largo: 'martes 20', dia: 'mar' },
];
/** "Ahora" en la historia del prototipo: miércoles 14, 14:22 h. */
export const NOW_H = 14 + 22 / 60;
export const hoursUntil = (d, h) => d * 24 + h - NOW_H;

export const HOURS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
export const FRANJAS = [
  { id: 'manana', label: 'mañana', from: 10, to: 13, rango: '10 a 14 h' },
  { id: 'tarde', label: 'tarde', from: 14, to: 17, rango: '14 a 18 h' },
  { id: 'noche', label: 'noche', from: 18, to: 23, rango: '18 a 24 h' },
];

export const IMG = (n) => `/img/${n}.jpg`;

export const CX = {
  north: { id: 'north', nombre: 'North Champ', km: '1,2 km', canchas: [{ k: 1, tipo: 5 }, { k: 2, tipo: 5 }, { k: 3, tipo: 7 }], foto: IMG('cancha-noche'), galeria: ['cancha-noche', 'cancha-noche-2', 'noche-equipo', 'vestuario'] },
  irlandes: { id: 'irlandes', nombre: 'El Irlandés', km: '2,1 km', canchas: [{ k: 1, tipo: 5 }, { k: 2, tipo: 5 }, { k: 3, tipo: 7 }], foto: IMG('cancha-dia'), galeria: ['cancha-dia', 'arco', 'jugada'] },
  thames: { id: 'thames', nombre: 'Thames', km: '3,4 km', canchas: [{ k: 1, tipo: 5 }, { k: 2, tipo: 7 }], foto: IMG('cancha-luces'), galeria: ['cancha-luces', 'pelota-noche', 'pies-pelota'] },
};
export const CX_ORDER = ['north', 'irlandes', 'thames'];

export const ORGS = ['Martín G.', 'Lucas P.', 'Agus R.', 'Nacho F.', 'Juli M.', 'Sebas T.', 'Pato L.', 'Eze B.', 'Fede C.', 'Rodri A.', 'Tincho V.', 'Dani S.'];
export const POS = ['arquero', 'defensor', 'mediocampista', 'delantero'];
export const NIVELES = ['principiante', 'intermedio', 'avanzado'];
export const CATEGORIAS = ['masculino', 'femenino', 'mixto'];
export const ZONAS = ['San Isidro', 'Vicente López', 'San Fernando', 'Tigre'];
export const PLURAL = { arquero: 'arqueros', defensor: 'defensores', mediocampista: 'mediocampistas', delantero: 'delanteros' };

/** Los amigos de Facu (ya confirmados en sus partidos: se ven foto y teléfono). */
export const AMIGOS = [
  { n: 'Tomi', pos: 'arquero', foto: IMG('av-tomi'), tel: '11 5555-0121' },
  { n: 'Juancho', pos: 'defensor', foto: IMG('av-juancho'), tel: '11 5555-0134' },
  { n: 'Leo', pos: 'defensor', foto: IMG('av-leo'), tel: '11 5555-0147' },
  { n: 'Mati', pos: 'mediocampista', foto: IMG('av-mati'), tel: '11 5555-0150' },
  { n: 'Pipe', pos: 'delantero', foto: IMG('av-pipe'), tel: '11 5555-0163' },
  { n: 'Gonza', pos: 'delantero', foto: IMG('av-gonza'), tel: '11 5555-0176' },
  { n: 'Santi', pos: 'mediocampista', foto: null, tel: '11 5555-0189' },
  { n: 'Bauti', pos: 'defensor', foto: null, tel: '11 5555-0192' },
  { n: 'Chino', pos: 'mediocampista', foto: null, tel: '11 5555-0105' },
  { n: 'Lucho', pos: 'delantero', foto: null, tel: '11 5555-0118' },
  { n: 'Fran', pos: 'defensor', foto: null, tel: '11 5555-0129' },
  { n: 'Joaco', pos: 'mediocampista', foto: null, tel: '11 5555-0136' },
  { n: 'Ramiro', pos: 'delantero', foto: null, tel: '11 5555-0141' },
];

/** Quien se suma cuando publicás lugares: perfil mínimo (alias, posición, nivel, reputación). */
export const JOINERS = {
  mediocampista: [
    { n: 'Nico', nivel: 'intermedio', asis: 94, conducta: 4.7, jugados: 23, foto: IMG('av-nico'), tel: '11 5555-0210' },
    { n: 'Tobi', nivel: 'intermedio', asis: 97, conducta: 4.9, jugados: 41, foto: null, tel: '11 5555-0223' },
  ],
  defensor: [
    { n: 'Lucas', nivel: 'intermedio', asis: 92, conducta: 4.6, jugados: 30, foto: null, tel: '11 5555-0236' },
    { n: 'Bruno', nivel: 'avanzado', asis: 98, conducta: 4.8, jugados: 57, foto: null, tel: '11 5555-0249' },
  ],
  arquero: [
    { n: 'Fede', nivel: 'intermedio', asis: 95, conducta: 4.8, jugados: 19, foto: null, tel: '11 5555-0252' },
    { n: 'Gus', nivel: 'principiante', asis: 100, conducta: null, jugados: 3, foto: null, tel: '11 5555-0265' },
  ],
  delantero: [
    { n: 'Rama', nivel: 'intermedio', asis: 91, conducta: 4.5, jugados: 26, foto: null, tel: '11 5555-0278' },
    { n: 'Kevin', nivel: 'avanzado', asis: 96, conducta: 4.7, jugados: 38, foto: null, tel: '11 5555-0281' },
  ],
};

/** Partidos cerca que necesitan gente. decision: qué hace el organizador cuando te sumás. */
export const FEED0 = [
  { id: 'f1', cx: 'north', k: 1, d: 0, h: 21, tipo: 5, pos: 'mediocampista', lugares: 1, org: 'Martín G.', nivel: 'intermedio', cat: 'masculino', foto: IMG('cancha-noche-2'), auto: true, decision: 'ok', torneo: null, msg: 'se nos cayó uno a último momento. un clásico.' },
  { id: 'f2', cx: 'irlandes', k: 1, d: 3, h: 19, tipo: 5, pos: 'arquero', lugares: 1, org: 'Juli M.', nivel: 'intermedio', cat: 'mixto', foto: IMG('arco'), auto: false, decision: 'ok', torneo: null, msg: 'buscamos alguien que ataje algo. milagros no pedimos.' },
  { id: 'f6', cx: 'thames', k: 1, d: 3, h: 18, tipo: 5, pos: 'delantero', lugares: 2, org: 'Cami R.', nivel: 'intermedio', cat: 'femenino', foto: IMG('jugadora'), auto: false, decision: 'ok', torneo: null, msg: 'nos faltan dos para el sábado. buena onda asegurada.' },
  { id: 'f3', cx: 'north', k: 3, d: 4, h: 11, tipo: 7, pos: 'delantero', lugares: 1, org: 'Pato L.', nivel: 'avanzado', cat: 'masculino', foto: IMG('jugada'), auto: false, decision: 'ok', torneo: { nombre: 'liga zona norte', fecha: 'fecha 6' }, msg: 'reemplazo por una fecha. el 9 se fue de viaje.' },
  { id: 'f4', cx: 'thames', k: 2, d: 2, h: 22, tipo: 7, pos: 'defensor', lugares: 2, org: 'Sebas T.', nivel: 'principiante', cat: 'masculino', foto: IMG('noche-equipo'), auto: false, decision: 'quitar', torneo: null, msg: '' },
  { id: 'f5', cx: 'irlandes', k: 2, d: 5, h: 20, tipo: 5, pos: 'defensor', lugares: 1, org: 'Tincho V.', nivel: 'avanzado', cat: 'masculino', foto: IMG('pelota-noche'), auto: false, decision: 'ok', torneo: { nombre: 'copa de los lunes', fecha: 'fecha 3' }, msg: 'necesitamos uno que marque. adelante somos todos de ir.' },
];

export const HIST0 = [
  { fecha: 'jue 8 oct', lugar: 'North Champ · fútbol 5', res: 'jugaste', cls: 'l' },
  { fecha: 'sáb 3 oct', lugar: 'Thames · fútbol 7', res: 'refuerzo', cls: 'l' },
  { fecha: 'jue 1 oct', lugar: 'North Champ · fútbol 5', res: 'jugaste', cls: 'l' },
  { fecha: 'jue 24 sep', lugar: 'North Champ · fútbol 5', res: 'te bajaste', cls: 'm' },
  { fecha: 'jue 17 sep', lugar: 'North Champ · fútbol 5', res: 'jugaste', cls: 'l' },
];

// ---------- reglas de precio y formato
export const money = (n) => '$' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
export const key = (cx, k, d, h) => `${cx}|${k}|${d}|${h}`;
export const cancha = (cx, k) => CX[cx].canchas.find((c) => c.k === k) || CX[cx].canchas[0];
/** Turno nocturno (desde las 18 h) de fútbol 5: $60.000. De día es más barato. */
export const basePrice = (tipo, h) => (tipo === 5 ? (h >= 18 ? 60000 : 45000) : (h >= 18 ? 90000 : 70000));
/** Promo de horas muertas: -20% de día, de lunes a viernes, sólo en North Champ. */
export const promoOn = (promo, cx, d, h) => !!promo && cx === 'north' && h < 18 && d !== 3 && d !== 4;
export const price = (promo, cx, tipo, d, h) => {
  const p = basePrice(tipo, h);
  return promoOn(promo, cx, d, h) ? Math.round(p * 0.8) : p;
};
/** Cargo por servicio al jugador: 6%, IVA incluido. Siempre visible antes de pagar. */
export const fee = (p) => Math.round(p * 0.06);
export const cupo = (tipo) => (tipo === 5 ? 10 : 14);
export const share = (total, tipo) => Math.ceil(total / cupo(tipo) / 10) * 10;
export const joinY = (list) => (list.length < 2 ? list.join('') : list.slice(0, -1).join(', ') + ' y ' + list[list.length - 1]);
export const conductaTxt = (c) => (c == null ? 'neutra' : c.toFixed(1).replace('.', ',') + '/5');

// ---------- agenda de ejemplo (determinística, igual en cada carga)
export function buildBook() {
  const b = {};
  const ci = { north: 1, irlandes: 2, thames: 3 };
  CX_ORDER.forEach((cx) => {
    CX[cx].canchas.forEach((c) => {
      for (let d = 0; d < 7; d++) {
        HOURS.forEach((h) => {
          const v = (ci[cx] * 7 + c.k * 13 + d * 31 + h * 17 + ci[cx] * c.k * h) % 10;
          const wk = d === 3 || d === 4;
          const thr = h >= 19 ? 7 : h === 18 ? 5 : wk ? 6 : h >= 14 ? 2 : 1;
          if (v < thr) {
            const app = v % 3 !== 0;
            const o = (v * 5 + d * 3 + h + c.k) % ORGS.length;
            b[key(cx, c.k, d, h)] = {
              estado: app ? 'app' : 'manual',
              org: ORGS[o],
              tel: '11 5555-' + String(1000 + ((o * 373 + h * 41 + d * 7) % 8999)).slice(-4),
              jug: cupo(c.tipo),
              pago: app
                ? (v + h) % 2 === 0 ? 'pagado por app' : 'dividido · ' + (6 + (h % 4)) + '/' + cupo(c.tipo) + ' pagaron'
                : 'a cobrar en el complejo',
            };
          }
        });
      }
    });
  });
  ['north|1|2|21', 'north|1|2|22', 'north|2|2|20', 'north|1|1|21', 'north|1|1|20', 'irlandes|1|2|21', 'irlandes|2|2|19', 'thames|1|2|20', 'thames|1|2|21', 'north|1|0|20'].forEach((k) => delete b[k]);
  b['north|3|0|10'] = { estado: 'bloqueado', motivo: 'mantenimiento del césped' };
  b['north|3|0|11'] = { estado: 'bloqueado', motivo: 'mantenimiento del césped' };
  b['north|2|1|21'] = { estado: 'app', org: 'Facu', tel: '11 5555-0100', jug: 10, pago: 'dividido · 5/8 pagaron' };
  FEED0.forEach((f) => {
    b[key(f.cx, f.k, f.d, f.h)] = { estado: 'app', org: f.org, tel: '11 5555-' + (2000 + f.h * 37), jug: cupo(f.tipo), pago: 'dividido · buscando gente' };
  });
  return b;
}

// ---------- datos de cada cuenta de jugador
function facuMatches() {
  const est = ['pagó', 'pagó', 'pagó', 'pendiente', 'pagó', 'pendiente', 'pendiente'];
  const jug = [{ n: 'Facu', pos: 'mediocampista', est: 'pagó', yo: true, foto: IMG('av-facu'), tel: '11 5555-0100' }]
    .concat(AMIGOS.slice(0, 7).map((a, i) => ({ ...a, est: est[i] })));
  return [{ id: 'm1', cx: 'north', k: 2, d: 1, h: 21, tipo: 5, rol: 'org', cat: 'masculino', total: 63600, pagado: 6360, split: true, torneo: null, pub: null, jug }];
}

export function facuData() {
  return {
    perfil: { alias: 'Facu', pos: 'mediocampista', nivel: 'intermedio', zona: 'San Isidro', foto: IMG('av-facu'), tel: '11 5555-0100', mail: 'facu@mail.com', nac: '2003-05-12' },
    matches: facuMatches(),
    feed: FEED0.map((f) => ({ ...f })),
    historial: HIST0.slice(),
    jugados: 48, bajas: 2, conducta: 4.8, calificaciones: 31,
    calif: {
      partido: 'jueves 8 · North Champ · fútbol 5',
      comp: AMIGOS.slice(0, 8).map((a) => ({ n: a.n, foto: a.foto, pos: a.pos })),
      votos: {}, enviado: false, todos: false,
    },
    priv: { ubic: true, notif: true, notifMax: 5, publi: false },
    bloqueados: [],
  };
}

export function newPlayerData(rj) {
  return {
    perfil: { alias: rj.alias.trim(), pos: rj.pos, nivel: rj.nivel, zona: rj.zona || 'San Isidro', foto: rj.foto, tel: rj.cel, mail: rj.mail, nac: rj.nac },
    matches: [],
    feed: FEED0.map((f) => ({ ...f })),
    historial: [],
    jugados: 0, bajas: 0, conducta: null, calificaciones: 0,
    calif: null,
    priv: { ubic: !!rj.ubic, notif: !!rj.notif, notifMax: 5, publi: !!rj.publi },
    bloqueados: [],
  };
}

export const PFIELDS = ['perfil', 'matches', 'feed', 'historial', 'jugados', 'bajas', 'conducta', 'calificaciones', 'calif', 'priv', 'bloqueados'];

export const emptyRJ = () => ({
  step: 1, alias: '', nac: '', mail: '', mailSent: false, mailCode: '', mailOk: false,
  cel: '', celSent: false, celCode: '', celOk: false, pass: '', verPass: false, bio: false,
  foto: null, pos: null, nivel: null, tyc: false, pp: false, ubic: false, notif: false, publi: false, zona: '',
});

export const emptyRC = () => ({
  step: 1, nombre: '', razon: '', cuit: '', dir: '', mail: '', tel: '',
  resp: '', cargo: '', cel: '', celSent: false, celCode: '', celOk: false, pass: '', verPass: false,
  cuitEstado: 'idle', doc: null, mp: false,
  canchas: [{ tipo: 5, sup: 'césped sintético' }], abre: '10', cierra: '24', dia: '45000', noche: '60000', fotos: [], terms: false,
});

export const ACCOUNTS0 = {
  'facu@mail.com': { tipo: 'jugador', id: 'facu', pass: 'Futbol123' },
  'hola@northchamp.com.ar': { tipo: 'complejo', id: 'north', pass: 'Cancha2026' },
};

export function initialState() {
  return {
    phase: 'splash', auth: 'bienvenida', user: null, accounts: { ...ACCOUNTS0 }, saved: {},
    login: { mail: '', pass: '', ver: false, err: '' },
    rj: emptyRJ(), rc: emptyRC(),
    // jugador (cuenta activa)
    screen: 'home', hist: [], ...facuData(),
    fTipo: 5, fDia: 2, fFranja: 'noche', selCx: null, sel: null, gal: 0, nYa: 8, split: true,
    pay: null, lastMatch: null, soloTorneos: false, selMatch: 'm1', sumFeed: null,
    pubFor: null, pf: null, aviso: null,
    // capas
    toast: null, notif: null, sheet: null,
    // complejo
    cx: { nombre: 'North Champ', verificado: true },
    book: buildBook(), promo: false,
    cScreen: 'dash', cDay: 0, cCell: null, mNombre: '', cResDay: 0, mes: 2,
  };
}
