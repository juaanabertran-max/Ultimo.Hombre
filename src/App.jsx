import React from 'react';
import {
  DAYS, CX, POS, JOINERS, JOINERS2, AMIGOS, AMIGOS_POS, ORGS,
  initialState, key, price, fee, cupo, share, basePrice, joinY,
} from './logic/data.js';
import { buildView } from './logic/view.js';
import { Grain, NavIcon } from './components/ui.jsx';
import { PaySheet, BajaSheet, CeldaSheet, Notif, Toast } from './components/Overlays.jsx';
import { Onboarding, Ficha } from './screens/jugador/Onboarding.jsx';
import Home from './screens/jugador/Home.jsx';
import { Complejos, ComplejoDetalle } from './screens/jugador/Reservar.jsx';
import { Checkout, Confirmado } from './screens/jugador/Checkout.jsx';
import Publicar from './screens/jugador/Publicar.jsx';
import { Feed, Sumarme } from './screens/jugador/Feed.jsx';
import { MisPartidos, Partido } from './screens/jugador/Partidos.jsx';
import Perfil from './screens/jugador/Perfil.jsx';
import Dashboard from './screens/complejo/Dashboard.jsx';
import Agenda from './screens/complejo/Agenda.jsx';
import Reservas from './screens/complejo/Reservas.jsx';
import Cobros from './screens/complejo/Cobros.jsx';
import PerfilComplejo from './screens/complejo/PerfilComplejo.jsx';

const NAV_J = [
  { id: 'home', label: 'inicio', icon: 'home', g: ['home', 'complejos', 'complejo', 'checkout', 'confirmado'] },
  { id: 'feed', label: 'buscar', icon: 'search', g: ['feed', 'sumarme'] },
  { id: 'misPartidos', label: 'mis partidos', icon: 'calendar', g: ['misPartidos', 'partido', 'publicar'] },
  { id: 'perfil', label: 'perfil', icon: 'user', g: ['perfil', 'perfilRapido'] },
];
const NAV_C = [
  { id: 'dash', label: 'panel', icon: 'bars' },
  { id: 'agenda', label: 'agenda', icon: 'grid' },
  { id: 'reservas', label: 'reservas', icon: 'list' },
  { id: 'cobros', label: 'cobros', icon: 'card' },
  { id: 'perfilC', label: 'complejo', icon: 'building' },
];

const SCREENS_J = {
  onb: Onboarding, perfilRapido: Ficha, home: Home, complejos: Complejos, complejo: ComplejoDetalle,
  checkout: Checkout, confirmado: Confirmado, publicar: Publicar, feed: Feed, sumarme: Sumarme,
  misPartidos: MisPartidos, partido: Partido, perfil: Perfil,
};
const SCREENS_C = { dash: Dashboard, agenda: Agenda, reservas: Reservas, cobros: Cobros, perfilC: PerfilComplejo };

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState();
    this.scrollRef = React.createRef();
  }

  componentDidUpdate(_, ps) {
    const s = this.state;
    if (ps.screen !== s.screen || ps.cScreen !== s.cScreen || ps.side !== s.side) {
      if (this.scrollRef.current) this.scrollRef.current.scrollTop = 0;
    }
  }

  componentWillUnmount() { this.clearTimers(); }
  clearTimers() { [this.tt, this.jt, this.nt, this.pt].forEach(clearTimeout); }

  // ---------- navegación
  go(s, extra) { this.setState({ screen: s, hist: this.state.hist.concat([this.state.screen]), ...(extra || {}) }); }
  back() { const h = this.state.hist.slice(); const s = h.length ? h.pop() : 'home'; this.setState({ screen: s, hist: h }); }
  tab(s) { this.setState({ screen: s, hist: [], side: 'jugador' }); }
  reiniciar() { this.clearTimers(); this.setState(initialState()); }
  nextOnb() { if (this.state.onb < 2) this.setState({ onb: this.state.onb + 1 }); else this.setState({ screen: 'perfilRapido' }); }
  skipOnb() { this.setState({ screen: 'perfilRapido' }); }

  // ---------- helpers
  toast(msg) { clearTimeout(this.tt); this.setState({ toast: msg }); this.tt = setTimeout(() => this.setState({ toast: null }), 3600); }
  match(id) { return this.state.matches.find((m) => m.id === id); }
  updMatch(id, fn) { return this.state.matches.map((m) => { if (m.id !== id) return m; const c = JSON.parse(JSON.stringify(m)); fn(c); return c; }); }
  setPerfil(p) { this.setState({ perfil: { ...this.state.perfil, ...p } }); }
  setPf(p) { this.setState({ pf: { ...this.state.pf, ...p } }); }
  asis(extra) { const s = this.state; return Math.round((s.jugados / (s.jugados + s.bajas + (extra || 0))) * 100); }
  cuando(m) { return `${DAYS[m.d].largo} · ${m.h} h`; }

  openCx(id) { this.go('complejo', { selCx: id, sel: null }); }
  openMatch(id) { this.go('partido', { selMatch: id }); }
  openSumarme(id) { this.go('sumarme', { sumFeed: id }); }
  openPublicar(id) {
    const m = this.match(id); if (!m) return;
    const f = Math.max(1, cupo(m.tipo) - m.jug.length);
    this.go('publicar', { pubFor: id, pf: { faltan: f, pos: { mediocampista: true }, nivel: 'intermedio', tipo: 'propio', torneo: '', fecha: '', msg: '' } });
  }
  togglePos(p) {
    let cur = { ...this.state.pf.pos };
    if (p === 'da igual') cur = { 'da igual': true };
    else {
      delete cur['da igual'];
      cur[p] = !cur[p];
      if (!Object.keys(cur).some((k) => cur[k])) cur[p] = true;
    }
    this.setPf({ pos: cur });
  }

  // ---------- pagos (simulados)
  openPay(kind) {
    const S = this.state;
    let monto, concepto;
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
    }
    this.setState({ pay: { kind, monto, concepto, step: 'idle' } });
  }
  payGo() {
    const k = this.state.pay.kind;
    this.setState({ pay: { ...this.state.pay, step: 'proc' } });
    clearTimeout(this.pt);
    this.pt = setTimeout(() => (k === 'reserva' ? this.finishReserva() : this.finishSumarme()), 1400);
  }
  finishReserva() {
    const S = this.state, t = S.fTipo, d = S.fDia, cx = S.selCx, k = S.sel.k, h = S.sel.h;
    const p = price(S.promo, cx, t, d, h), total = p + fee(p), cp = cupo(t);
    const n = Math.min(S.nYa, cp), yo = S.perfil.nombre || 'Facu';
    const jug = [{ n: yo, pos: S.perfil.pos, est: 'pagó', yo: true }];
    for (let i = 0; i < n - 1; i++) jug.push({ n: AMIGOS[i % AMIGOS.length], pos: AMIGOS_POS[i % AMIGOS_POS.length], est: S.split ? 'pendiente' : 'confirmado' });
    const id = 'm' + Date.now();
    const m = { id, cx, k, d, h, tipo: t, rol: 'org', total, pagado: S.split ? share(total, t) : total, split: S.split, torneo: null, pub: null, jug };
    const book = { ...S.book };
    book[key(cx, k, d, h)] = { estado: 'app', org: `${yo} (organizador)`, asis: this.asis(), tel: '11 ••••-4821', jug: cp, pago: S.split ? `dividido · 1/${n} pagaron` : 'pagado por app', nueva: true };
    this.setState({ matches: S.matches.concat([m]), book, pay: null, lastMatch: id, selMatch: id, screen: 'confirmado', hist: [], sel: null });
  }
  finishSumarme() {
    const S = this.state;
    const f = S.feed.find((x) => x.id === S.sumFeed); if (!f) return;
    const cp = cupo(f.tipo), ya = cp - f.lugares;
    const jug = [{ n: f.org.split(' ')[0], pos: 'organiza', est: 'pagó' }];
    for (let i = 1; i < ya; i++) jug.push({ n: ORGS[(i * 5 + f.h) % ORGS.length].split(' ')[0], pos: POS[i % 4], est: i % 3 === 0 ? 'pendiente' : 'pagó' });
    jug.push({ n: S.perfil.nombre || 'Facu', pos: S.perfil.pos, est: 'pagó', yo: true, nuevo: true });
    const mid = 'j' + f.id + Date.now();
    const total = basePrice(f.tipo, f.h) * 1.06;
    const m = { id: mid, cx: f.cx, k: f.k, d: f.d, h: f.h, tipo: f.tipo, rol: 'jugador', total, pagado: share(total, f.tipo), split: true, torneo: f.torneo, pub: null, jug, feedId: f.id };
    const feed = S.feed.map((x) => (x.id === f.id ? { ...x, lugares: x.lugares - 1, joined: true } : x));
    this.setState({ matches: S.matches.concat([m]), feed, pay: null, selMatch: mid, screen: 'partido', hist: ['misPartidos'] });
    this.toast(`adentro. te esperan ${f.d === 0 ? 'hoy' : 'el ' + DAYS[f.d].corto} a las ${f.h} h.`);
  }

  // ---------- la función estrella: publicar lugares y que alguien se sume
  publicar() {
    const S = this.state, id = S.pubFor, pf = S.pf;
    const posList = Object.keys(pf.pos).filter((p) => pf.pos[p]);
    const ms = this.updMatch(id, (m) => {
      m.pub = { faltan: pf.faltan, pos: posList, nivel: pf.nivel, tipo: pf.tipo, msg: pf.msg.trim() };
      if (pf.tipo === 'torneo') m.torneo = { nombre: pf.torneo.trim(), fecha: pf.fecha.trim() };
    });
    this.setState({ matches: ms, selMatch: id, screen: 'partido', hist: ['misPartidos'], pubFor: null });
    this.toast('publicado. ya lo ven los jugadores de la zona.');
    clearTimeout(this.jt);
    this.jt = setTimeout(() => this.llegaRefuerzo(id), 3500);
  }
  llegaRefuerzo(id) {
    const m = this.match(id);
    if (!m || !m.pub || m.pub.faltan <= 0) return;
    const p = m.pub.pos.filter((x) => x !== 'da igual')[0] || 'mediocampista';
    let nombre = JOINERS[p];
    if (m.jug.some((j) => j.n === nombre)) nombre = JOINERS2[p];
    const ms = this.updMatch(id, (c) => { c.jug.push({ n: nombre, pos: p, est: 'pagó', nuevo: true }); c.pub.faltan -= 1; });
    this.setState({
      matches: ms,
      notif: { titulo: `${nombre} (${p}) se sumó a tu partido`, sub: `${DAYS[m.d].largo} · ${m.h} h · ${CX[m.cx].nombre} · ya pagó su parte`, ini: nombre.charAt(0), id },
    });
    clearTimeout(this.nt);
    this.nt = setTimeout(() => this.setState({ notif: null }), 7000);
  }
  recordar(names) { this.toast(`le mandamos un recordatorio a ${joinY(names)}. cobrar ya no es tu problema.`); }
  confirmBaja() {
    const S = this.state, m = this.match(S.selMatch); if (!m) return;
    let feed = S.feed;
    if (m.feedId) feed = feed.map((x) => (x.id === m.feedId ? { ...x, lugares: x.lugares + 1, joined: false } : x));
    const entry = { fecha: `${DAYS[m.d].dia} ${14 + m.d} oct`, lugar: `${CX[m.cx].nombre} · fútbol ${m.tipo}`, res: 'te bajaste', cls: 'm' };
    const post = this.asis(1);
    this.setState({ matches: S.matches.filter((x) => x.id !== m.id), feed, bajas: S.bajas + 1, historial: [entry].concat(S.historial), modal: null, screen: 'misPartidos', hist: [] });
    this.toast(`listo, avisamos al grupo. tu asistencia quedó en ${post}%.`);
  }

  // ---------- lado complejo
  cellSet(val, msg) {
    const c = this.state.cCell, k = key('north', c.k, c.d, c.h), book = { ...this.state.book };
    if (val) book[k] = val; else delete book[k];
    this.setState({ book, cCell: null });
    this.toast(msg);
  }
  noShow(k) {
    const book = { ...this.state.book }, e = { ...book[k] };
    e.noshow = true;
    if (e.asis) e.asis = Math.max(0, e.asis - 4);
    book[k] = e;
    this.setState({ book });
    this.toast(`no-show marcado. a ${e.org.split(' ')[0]} le baja la asistencia y la próxima vez se ve.`);
  }

  render() {
    const S = this.state;
    const vm = buildView(this);
    const J = vm.J;
    const Screen = J ? SCREENS_J[S.screen] : SCREENS_C[S.cScreen];
    const showNavJ = J && S.screen !== 'onb' && S.screen !== 'perfilRapido';

    return (
      <div className="stage">
        <div className="topbar">
          <span className="idx">ver como</span>
          <div className="sg" role="group" aria-label="ver como">
            <button className={J ? 'on' : ''} onClick={() => this.setState({ side: 'jugador' })}>jugador</button>
            <button className={J ? '' : 'on'} onClick={() => this.setState({ side: 'complejo', cCell: null, modal: null, pay: null })}>complejo</button>
          </div>
          <button className="ib" onClick={() => this.reiniciar()}><span className="idx">reiniciar</span></button>
        </div>

        <div className="device">
          <div className="screen">
            <Grain />
            <div className="app-col">
              <main className="scroll" ref={this.scrollRef}>
                {Screen ? <Screen vm={vm} app={this} /> : null}
              </main>
              {showNavJ && (
                <nav className="nav" aria-label="navegación del jugador">
                  {NAV_J.map((n) => (
                    <button key={n.id} className={'nv' + (n.g.includes(S.screen) ? ' on' : '')} onClick={() => this.tab(n.id)}>
                      <NavIcon name={n.icon} /><span>{n.label}</span>
                    </button>
                  ))}
                </nav>
              )}
              {!J && (
                <nav className="nav" aria-label="navegación del complejo">
                  {NAV_C.map((n) => (
                    <button key={n.id} className={'nv' + (S.cScreen === n.id ? ' on' : '')} onClick={() => this.setState({ cScreen: n.id, cCell: null })}>
                      <NavIcon name={n.icon} /><span>{n.label}</span>
                    </button>
                  ))}
                </nav>
              )}
              <div className="franja" aria-hidden="true" />
            </div>
            {vm.pay && <PaySheet p={vm.pay} />}
            {vm.mb && <BajaSheet m={vm.mb} />}
            {vm.ce && <CeldaSheet c={vm.ce} />}
            {vm.notif && <Notif n={vm.notif} />}
            {S.toast && <Toast txt={S.toast} />}
          </div>
        </div>
      </div>
    );
  }
}
