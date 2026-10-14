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

export const HOURS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

export const FRANJAS = [
  { id: 'manana', label: 'mañana', from: 10, to: 13, rango: '10 a 14 h' },
  { id: 'tarde', label: 'tarde', from: 14, to: 17, rango: '14 a 18 h' },
  { id: 'noche', label: 'noche', from: 18, to: 23, rango: '18 a 24 h' },
];

export const CX = {
  north: { id: 'north', nombre: 'North Champ', km: '1,2 km', canchas: [{ k: 1, tipo: 5 }, { k: 2, tipo: 5 }, { k: 3, tipo: 7 }] },
  irlandes: { id: 'irlandes', nombre: 'El Irlandés', km: '2,1 km', canchas: [{ k: 1, tipo: 5 }, { k: 2, tipo: 5 }, { k: 3, tipo: 7 }] },
  thames: { id: 'thames', nombre: 'Thames', km: '3,4 km', canchas: [{ k: 1, tipo: 5 }, { k: 2, tipo: 7 }] },
};
export const CX_ORDER = ['north', 'irlandes', 'thames'];

export const ORGS = ['Martín G.', 'Lucas P.', 'Agus R.', 'Nacho F.', 'Juli M.', 'Sebas T.', 'Pato L.', 'Eze B.', 'Fede C.', 'Rodri A.', 'Tincho V.', 'Dani S.'];
export const POS = ['arquero', 'defensor', 'mediocampista', 'delantero'];
export const NIVELES = ['tranqui', 'intermedio', 'competitivo'];
export const PLURAL = { arquero: 'arqueros', defensor: 'defensores', mediocampista: 'mediocampistas', delantero: 'delanteros' };
export const JOINERS = { arquero: 'Fede', defensor: 'Lucas', mediocampista: 'Nico', delantero: 'Rama' };
export const JOINERS2 = { arquero: 'Gus', defensor: 'Bruno', mediocampista: 'Tobi', delantero: 'Kevin' };
export const AMIGOS = ['Tomi', 'Juancho', 'Leo', 'Mati', 'Pipe', 'Gonza', 'Santi', 'Bauti', 'Chino', 'Lucho', 'Fran', 'Joaco', 'Ramiro'];
export const AMIGOS_POS = ['arquero', 'defensor', 'defensor', 'mediocampista', 'delantero', 'delantero', 'mediocampista', 'defensor', 'mediocampista', 'delantero', 'defensor', 'mediocampista', 'delantero'];

export const FEED0 = [
  { id: 'f1', cx: 'north', k: 1, d: 0, h: 21, tipo: 5, pos: 'mediocampista', lugares: 1, org: 'Martín G.', nivel: 'intermedio', torneo: null, msg: 'se nos cayó uno a último momento. un clásico.' },
  { id: 'f2', cx: 'irlandes', k: 1, d: 3, h: 19, tipo: 5, pos: 'arquero', lugares: 1, org: 'Juli M.', nivel: 'intermedio', torneo: null, msg: 'buscamos uno que ataje algo. milagros no pedimos.' },
  { id: 'f3', cx: 'north', k: 3, d: 4, h: 11, tipo: 7, pos: 'delantero', lugares: 1, org: 'Pato L.', nivel: 'competitivo', torneo: { nombre: 'liga zona norte', fecha: 'fecha 6' }, msg: 'reemplazo por una fecha. el 9 se fue de viaje.' },
  { id: 'f4', cx: 'thames', k: 2, d: 2, h: 22, tipo: 7, pos: 'defensor', lugares: 2, org: 'Sebas T.', nivel: 'tranqui', torneo: null, msg: '' },
  { id: 'f5', cx: 'irlandes', k: 2, d: 5, h: 20, tipo: 5, pos: 'defensor', lugares: 1, org: 'Tincho V.', nivel: 'competitivo', torneo: { nombre: 'copa de los lunes', fecha: 'fecha 3' }, msg: 'necesitamos uno que marque. adelante somos todos de ir.' },
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
/** Cargo por servicio al jugador: 6%, IVA incluido. */
export const fee = (p) => Math.round(p * 0.06);
export const cupo = (tipo) => (tipo === 5 ? 10 : 14);
export const share = (total, tipo) => Math.ceil(total / cupo(tipo) / 10) * 10;
export const joinY = (list) => (list.length < 2 ? list.join('') : list.slice(0, -1).join(', ') + ' y ' + list[list.length - 1]);

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
              asis: app ? 82 + ((v * 7 + h) % 17) : 0,
              tel: app ? '11 ••••-' + (1000 + ((o * 373 + h * 41 + d * 7) % 8999)) : '',
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
  b['north|2|1|21'] = { estado: 'app', org: 'Facu (organizador)', asis: 96, tel: '11 ••••-4821', jug: 10, pago: 'dividido · 5/8 pagaron' };
  FEED0.forEach((f) => {
    b[key(f.cx, f.k, f.d, f.h)] = { estado: 'app', org: f.org, asis: 91, tel: '11 ••••-' + (2000 + f.h * 37), jug: cupo(f.tipo), pago: 'dividido · buscando gente' };
  });
  return b;
}

function initMatches() {
  const n = ['Facu', 'Tomi', 'Juancho', 'Leo', 'Mati', 'Pipe', 'Gonza', 'Santi'];
  const p = ['mediocampista', 'arquero', 'defensor', 'defensor', 'mediocampista', 'delantero', 'delantero', 'mediocampista'];
  const e = ['pagó', 'pagó', 'pagó', 'pagó', 'pendiente', 'pagó', 'pendiente', 'pendiente'];
  const jug = n.map((x, i) => ({ n: x, pos: p[i], est: e[i], yo: i === 0 }));
  return [{ id: 'm1', cx: 'north', k: 2, d: 1, h: 21, tipo: 5, rol: 'org', total: 63600, pagado: 6360, split: true, torneo: null, pub: null, jug }];
}

export function initialState() {
  return {
    side: 'jugador', screen: 'onb', onb: 0, hist: [],
    perfil: { nombre: 'Facu', pos: 'mediocampista', nivel: 'intermedio', zona: 'San Isidro' },
    fTipo: 5, fDia: 2, fFranja: 'noche', selCx: null, sel: null, nYa: 8, split: true,
    pay: null, lastMatch: null, matches: initMatches(), feed: FEED0.map((f) => ({ ...f })),
    soloTorneos: false, selMatch: 'm1', sumFeed: null,
    pubFor: null, pf: { faltan: 2, pos: { mediocampista: true }, nivel: 'intermedio', tipo: 'propio', torneo: '', fecha: '', msg: '' },
    toast: null, notif: null, modal: null,
    jugados: 48, bajas: 2, historial: HIST0.slice(),
    book: buildBook(), promo: false,
    cScreen: 'dash', cDay: 0, cCell: null, mNombre: '', cResDay: 0, mes: 2,
  };
}
