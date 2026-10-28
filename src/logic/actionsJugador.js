// Acciones del lado jugador. Se mezclan en el componente App (this = App).
import {
  DAYS, CX, AMIGOS, JOINERS, IMG, key, price, fee, cupo, share, basePrice, joinY, hoursUntil,
} from './data.js';

export const actionsJugador = {
  // ---------- navegación
  go(s, extra) { this.setState({ screen: s, hist: this.state.hist.concat([this.state.screen]), sheet: null, ...(extra || {}) }); },
  back() { const h = this.state.hist.slice(); const s = h.length ? h.pop() : 'home'; this.setState({ screen: s, hist: h, sheet: null }); },
  tab(s) { this.setState({ screen: s, hist: [], sheet: null }); },

  // ---------- helpers
  toast(msg) { clearTimeout(this.tt); this.setState({ toast: msg }); this.tt = setTimeout(() => this.setState({ toast: null }), 3800); },
  notify(n, ms = 7000) { clearTimeout(this.nt); this.setState({ notif: n }); this.nt = setTimeout(() => this.setState({ notif: null }), ms); },
  match(id) { return this.state.matches.find((m) => m.id === id); },
  updMatch(id, fn) { return this.state.matches.map((m) => { if (m.id !== id) return m; const c = JSON.parse(JSON.stringify(m)); fn(c); return c; }); },
  setPerfil(p) { this.setState({ perfil: { ...this.state.perfil, ...p } }); },
  setPf(p) { this.setState({ pf: { ...this.state.pf, ...p } }); },
  setPriv(p) { this.setState({ priv: { ...this.state.priv, ...p } }); },
  asis(extra) {
    const s = this.state;
    const tot = s.jugados + s.bajas + (extra || 0);
    return tot ? Math.round((s.jugados / tot) * 100) : null;
  },
  cuando(m) { return `${DAYS[m.d].largo} · ${m.h} h`; },
  fotoFile(e, cb) { const f = e.target.files && e.target.files[0]; if (f) cb(URL.createObjectURL(f), f); },

  openCx(id) { this.go('complejo', { selCx: id, sel: null, gal: 0 }); },
  openMatch(id) { this.go('partido', { selMatch: id }); },
  openSumarme(id) { this.go('sumarme', { sumFeed: id }); },
  openPublicar(id) {
    const m = this.match(id); if (!m) return;
    const f = Math.max(1, cupo(m.tipo) - m.jug.length);
    this.go('publicar', { pubFor: id, pf: { faltan: f, pos: { mediocampista: true }, nivel: 'intermedio', cat: m.cat || 'masculino', tipo: 'propio', torneo: '', fecha: '', msg: '', revisar: true } });
  },
  togglePos(p) {
    let cur = { ...this.state.pf.pos };
    if (p === 'da igual') cur = { 'da igual': true };
    else {
      delete cur['da igual'];
      cur[p] = !cur[p];
      if (!Object.keys(cur).some((k) => cur[k])) cur[p] = true;
    }
    this.setPf({ pos: cur });
  },

  // ---------- pagos (simulados)
  openPay(kind) {
    const S = this.state;
    let monto, concepto, nota;
    if (kind === 'reserva') {
      const t = S.fTipo, d = S.fDia;
      const p = price(S.promo, S.selCx, t, d, S.sel.h);
      const tot = p + fee(p);
      monto = S.split ? share(tot, t) : tot;
      concepto = `reserva · ${CX[S.selCx].nombre} · ${DAYS[d].corto} ${S.sel.h} h${S.split ? ' · tu parte' : ' · turno completo'}`;
    } else {
      const f = S.feed.find((x) => x.id === S.sumFeed);
      monto = share(basePrice(f.tipo, f.h) * 1.06, f.tipo);
      concepto = `tu parte · ${CX[f.cx].nombre} · ${DAYS[f.d].corto} ${f.h} h`;
      nota = f.auto ? '' : 'si el organizador no confirma tu lugar, te devolvemos todo automáticamente.';
    }
    this.setState({ pay: { kind, monto, concepto, nota, step: 'idle' } });
  },
  payGo() {
    const k = this.state.pay.kind;
    this.setState({ pay: { ...this.state.pay, step: 'proc' } });
    clearTimeout(this.pt);
    this.pt = setTimeout(() => (k === 'reserva' ? this.finishReserva() : this.finishSumarme()), 1400);
  },
  finishReserva() {
    const S = this.state, t = S.fTipo, d = S.fDia, cx = S.selCx, k = S.sel.k, h = S.sel.h;
    const p = price(S.promo, cx, t, d, h), total = p + fee(p), cp = cupo(t);
    const n = Math.min(S.nYa, cp);
    const yo = { n: S.perfil.alias, pos: S.perfil.pos || 'sin posición', est: 'pagó', yo: true, foto: S.perfil.foto, tel: S.perfil.tel };
    const jug = [yo];
    for (let i = 0; i < n - 1; i++) jug.push({ ...AMIGOS[i % AMIGOS.length], est: S.split ? 'pendiente' : 'confirmado' });
    const id = 'm' + Date.now();
    const m = { id, cx, k, d, h, tipo: t, rol: 'org', cat: null, total, pagado: S.split ? share(total, t) : total, split: S.split, torneo: null, pub: null, jug };
    const book = { ...S.book };
    book[key(cx, k, d, h)] = { estado: 'app', org: S.perfil.alias, tel: S.perfil.tel, jug: cp, pago: S.split ? `dividido · 1/${n} pagaron` : 'pagado por app', nueva: true };
    this.setState({ matches: S.matches.concat([m]), book, pay: null, lastMatch: id, selMatch: id, screen: 'confirmado', hist: [], sel: null });
  },
  finishSumarme() {
    const S = this.state;
    const f = S.feed.find((x) => x.id === S.sumFeed); if (!f) return;
    const cp = cupo(f.tipo), ya = cp - f.lugares;
    const jug = [{ n: f.org.split(' ')[0], pos: 'organiza', est: 'pagó', foto: null, tel: '11 5555-03' + String(10 + f.h) }];
    for (let i = 1; i < ya; i++) jug.push({ ...AMIGOS[(i + 6) % AMIGOS.length], foto: null, est: i % 3 === 0 ? 'pendiente' : 'pagó' });
    jug.push({ n: S.perfil.alias, pos: S.perfil.pos || 'sin posición', est: f.auto ? 'pagó' : 'por confirmar', yo: true, nuevo: true, foto: S.perfil.foto, tel: S.perfil.tel });
    const mid = 'j' + f.id + Date.now();
    const total = basePrice(f.tipo, f.h) * 1.06;
    const m = { id: mid, cx: f.cx, k: f.k, d: f.d, h: f.h, tipo: f.tipo, rol: 'jugador', cat: f.cat, total, pagado: share(total, f.tipo), split: true, torneo: f.torneo, pub: null, jug, feedId: f.id, org: f.org };
    const feed = S.feed.map((x) => (x.id === f.id ? { ...x, lugares: x.lugares - 1, joined: true } : x));
    this.setState({ matches: S.matches.concat([m]), feed, pay: null, selMatch: mid, screen: 'partido', hist: ['misPartidos'] });
    if (f.auto) {
      this.toast(`adentro. ${f.org.split(' ')[0]} acepta automáticamente: ya estás confirmado.`);
    } else {
      this.toast(`listo. ${f.org.split(' ')[0]} tiene que confirmar tu lugar. te avisamos.`);
      clearTimeout(this.dt);
      this.dt = setTimeout(() => this.orgDecide(mid), 4500);
    }
  },
  /** Simula la decisión del organizador sobre tu lugar. */
  orgDecide(mid) {
    const S = this.state, m = this.match(mid); if (!m) return;
    const f = S.feed.find((x) => x.id === m.feedId);
    const org = m.org.split(' ')[0];
    if (f && f.decision === 'quitar') {
      const feed = S.feed.map((x) => (x.id === f.id ? { ...x, lugares: x.lugares + 1, joined: false, quitado: true } : x));
      const viendo = S.screen === 'partido' && S.selMatch === mid;
      this.setState({
        matches: S.matches.filter((x) => x.id !== mid), feed,
        aviso: { monto: m.pagado, cuando: this.cuando(m), donde: CX[m.cx].nombre },
        ...(viendo ? { screen: 'aviso', hist: [], selMatch: null } : {}),
        ...(S.selMatch === mid && !viendo ? { selMatch: null } : {}),
      });
      this.notify({ titulo: 'el organizador completó el equipo de otra forma', sub: 'ya te devolvimos tu pago completo', ini: '//', go: 'aviso' }, 9000);
    } else {
      const ms = this.updMatch(mid, (c) => { c.jug.forEach((j) => { if (j.yo) { j.est = 'pagó'; j.nuevo = false; } }); });
      this.setState({ matches: ms });
      this.notify({ titulo: `${org} confirmó tu lugar`, sub: `${this.cuando(m)} · ${CX[m.cx].nombre} · ya se ven los teléfonos`, ini: org.charAt(0), id: mid });
    }
  },

  // ---------- la función estrella: publicar lugares, alguien se suma y el organizador decide
  publicar() {
    const S = this.state, id = S.pubFor, pf = S.pf;
    const posList = Object.keys(pf.pos).filter((p) => pf.pos[p]);
    const ms = this.updMatch(id, (m) => {
      m.cat = pf.cat;
      m.pub = { faltan: pf.faltan, pos: posList, nivel: pf.nivel, tipo: pf.tipo, msg: pf.msg.trim(), revisar: pf.revisar, usados: [] };
      if (pf.tipo === 'torneo') m.torneo = { nombre: pf.torneo.trim(), fecha: pf.fecha.trim() };
    });
    this.setState({ matches: ms, selMatch: id, screen: 'partido', hist: ['misPartidos'], pubFor: null });
    this.toast('publicado. ya lo ven los jugadores de la zona.');
    clearTimeout(this.jt);
    this.jt = setTimeout(() => this.llegaRefuerzo(id), 3500);
  },
  llegaRefuerzo(id) {
    const m = this.match(id);
    if (!m || !m.pub || m.pub.faltan <= 0) return;
    const p = m.pub.pos.filter((x) => x !== 'da igual')[0] || 'mediocampista';
    const cand = JOINERS[p].find((j) => !m.pub.usados.includes(j.n) && !m.jug.some((x) => x.n === j.n));
    if (!cand) return;
    const rev = m.pub.revisar;
    const ms = this.updMatch(id, (c) => {
      c.jug.push({ ...cand, pos: p, est: rev ? 'por confirmar' : 'pagó', nuevo: true, sumado: true });
      c.pub.faltan -= 1;
      c.pub.usados.push(cand.n);
    });
    this.setState({ matches: ms });
    this.notify({
      titulo: `${cand.n} (${p}) se sumó a tu partido`,
      sub: rev ? 'revisá su perfil y confirmalo o quitalo' : 'quedó confirmado automáticamente',
      ini: cand.n.charAt(0), id,
    });
  },
  confirmarJugador(id, n) {
    const ms = this.updMatch(id, (c) => { c.jug.forEach((j) => { if (j.n === n) j.est = 'pagó'; }); });
    this.setState({ matches: ms });
    this.toast(`${n} quedó confirmado. ya se ven sus teléfonos y fotos.`);
  },
  confirmarQuitar() {
    const { id, n } = this.state.sheet;
    const ms = this.updMatch(id, (c) => {
      c.jug = c.jug.filter((j) => j.n !== n);
      if (c.pub) c.pub.faltan += 1;
    });
    this.setState({ matches: ms, sheet: null });
    this.toast(`listo. le devolvimos todo a ${n} y el lugar volvió a publicarse.`);
    clearTimeout(this.jt);
    this.jt = setTimeout(() => this.llegaRefuerzo(id), 6000);
  },
  recordar(names) { this.toast(`le mandamos un recordatorio a ${joinY(names)}. cobrar ya no es tu problema.`); },
  bloquear(n) {
    this.setState({ bloqueados: this.state.bloqueados.concat([n]), sheet: null });
    this.toast(`bloqueaste a ${n}. no van a coincidir en partidos que publiquen.`);
  },
  enviarReporte() {
    this.setState({ sheet: null });
    this.toast('gracias por avisar. lo revisa una persona del equipo y te contamos qué pasó.');
  },
  confirmBaja() {
    const S = this.state, m = this.match(S.selMatch); if (!m) return;
    const afecta = hoursUntil(m.d, m.h) <= 6;
    let feed = S.feed;
    if (m.feedId) feed = feed.map((x) => (x.id === m.feedId ? { ...x, lugares: x.lugares + 1, joined: false } : x));
    const entry = { fecha: `${DAYS[m.d].dia} ${14 + m.d} oct`, lugar: `${CX[m.cx].nombre} · fútbol ${m.tipo}`, res: afecta ? 'te bajaste tarde' : 'avisaste a tiempo', cls: 'm' };
    const post = afecta ? this.asis(1) : this.asis();
    this.setState({ matches: S.matches.filter((x) => x.id !== m.id), feed, bajas: S.bajas + (afecta ? 1 : 0), historial: [entry].concat(S.historial), sheet: null, screen: 'misPartidos', hist: [] });
    this.toast(afecta ? `listo, avisamos al grupo. tu asistencia quedó en ${post}%.` : 'listo, avisamos al grupo. como avisaste con tiempo, tu reputación no cambia.');
  },

  // ---------- calificación ciega de conducta
  votar(n, dim, val) {
    const c = this.state.calif;
    const v = { ...(c.votos[n] || {}), [dim]: val };
    this.setState({ calif: { ...c, votos: { ...c.votos, [n]: v } } });
  },
  enviarCalif() {
    this.setState({ calif: { ...this.state.calif, enviado: true } });
    clearTimeout(this.ct);
    this.ct = setTimeout(() => {
      this.setState({ calif: { ...this.state.calif, todos: true }, calificaciones: this.state.calificaciones + 8, conducta: 4.8 });
      this.notify({ titulo: 'ya calificaron todos el partido del jueves 8', sub: 'mirá cómo te fue en tu perfil', ini: '//', go: 'perfil' });
    }, 5000);
  },

  // ---------- privacidad
  eliminarCuenta() {
    this.logout('tu cuenta se elimina en 30 días. si entrás antes, se cancela.');
  },
  descargarDatos() { this.toast('te mandamos un archivo con tus datos a tu mail. puede tardar unos minutos.'); },
};
