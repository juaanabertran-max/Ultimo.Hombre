// Validaciones y datos de las pantallas de sesión y registro.
import { POS, NIVELES, ZONAS } from './data.js';

export const mailOk = (m) => /^\S+@\S+\.\S+$/.test(m.trim());
export const celOk = (c) => c.replace(/\D/g, '').length >= 8;
export const cuitOk = (c) => /^\d{2}-?\d{8}-?\d$/.test(c.trim());

export function edad(nac) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(nac)) return null;
  const [y, m, d] = nac.split('-').map(Number);
  const hoy = new Date();
  let e = hoy.getFullYear() - y;
  if (hoy.getMonth() + 1 < m || (hoy.getMonth() + 1 === m && hoy.getDate() < d)) e--;
  return e;
}

export function passRules(p) {
  return [
    { label: '8 caracteres o más', ok: p.length >= 8 },
    { label: 'una mayúscula', ok: /[A-ZÁÉÍÓÚÑ]/.test(p) },
    { label: 'un número', ok: /\d/.test(p) },
  ];
}

export function buildAuthView(app) {
  const S = app.state;
  const r = S.rj;
  const c = S.rc;
  const chips = (opts, cur, fn) => opts.map((o) => ({ label: o, on: cur === o, pick: () => fn(o) }));

  const e = edad(r.nac);
  const rjPass = passRules(r.pass);
  const rjCan = {
    1: r.alias.trim().length >= 2 && e != null && e >= 18 && e < 110,
    2: r.mailOk && r.celOk,
    3: rjPass.every((x) => x.ok),
    4: true,
    5: r.tyc && r.pp && (r.ubic || !!r.zona),
  }[r.step];
  const rj = {
    ...r, menor: e != null && e < 18, pass: rjPass, passVal: r.pass, can: rjCan,
    titulos: ['tus datos', 'contacto', 'contraseña', 'perfil futbolero', 'privacidad'],
    set: (k) => (ev) => app.setRJ({ [k]: ev.target.value }),
    setV: (p) => app.setRJ(p),
    mailValido: mailOk(r.mail), celValido: celOk(r.cel),
    pos: chips(POS, r.pos, (o) => app.setRJ({ pos: app.state.rj.pos === o ? null : o })),
    nivel: chips(NIVELES, r.nivel, (o) => app.setRJ({ nivel: app.state.rj.nivel === o ? null : o })),
    zona: chips(ZONAS, r.zona, (o) => app.setRJ({ zona: o })),
    setFoto: (ev) => app.fotoFile(ev, (url) => app.setRJ({ foto: url })),
    next: () => app.rjNext(), back: () => app.rjBack(),
    despues: () => app.setRJ({ step: 5 }),
  };

  const rcPass = passRules(c.pass);
  const rcCan = {
    1: c.nombre.trim().length >= 2 && c.razon.trim().length >= 2 && cuitOk(c.cuit) && c.dir.trim().length >= 5 && mailOk(c.mail) && celOk(c.tel),
    2: c.resp.trim().length >= 2 && !!c.cargo && c.celOk,
    3: rcPass.every((x) => x.ok),
    4: c.cuitEstado === 'ok' && !!c.doc && c.mp,
    5: c.canchas.length > 0 && Number(c.dia) > 0 && Number(c.noche) > 0,
    6: c.terms,
  }[c.step];
  const rc = {
    ...c, pass: rcPass, passVal: c.pass, can: rcCan,
    titulos: ['datos del complejo', 'responsable', 'contraseña', 'verificación', 'canchas', 'términos'],
    set: (k) => (ev) => app.setRC({ [k]: ev.target.value }),
    setV: (p) => app.setRC(p),
    cuitValido: cuitOk(c.cuit), celValido: celOk(c.cel),
    cargo: chips(['dueño', 'encargado'], c.cargo, (o) => app.setRC({ cargo: o })),
    setDoc: (ev) => app.fotoFile(ev, (url, f) => app.setRC({ doc: { name: f.name, url, img: f.type.startsWith('image/'), kb: Math.round(f.size / 1024) } })),
    addFotos: (ev) => {
      const fs = Array.from(ev.target.files || []).map((f) => URL.createObjectURL(f));
      app.setRC({ fotos: app.state.rc.fotos.concat(fs).slice(0, 8) });
    },
    addCancha: () => app.setRC({ canchas: app.state.rc.canchas.concat([{ tipo: 5, sup: 'césped sintético' }]) }),
    delCancha: (i) => app.setRC({ canchas: app.state.rc.canchas.filter((_, x) => x !== i) }),
    setCancha: (i, p) => app.setRC({ canchas: app.state.rc.canchas.map((k, x) => (x === i ? { ...k, ...p } : k)) }),
    validarCuit: () => app.validarCuit(),
    vincularMP: () => app.setState({ sheet: { type: 'mp' } }),
    next: () => app.rcNext(), back: () => app.rcBack(),
  };

  return { rj, rc, login: S.login };
}
