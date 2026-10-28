// Sesión, registro de jugador, registro y verificación de complejo, y accesos de la demo.
import { initialState, facuData, newPlayerData, emptyRJ, emptyRC, PFIELDS, IMG } from './data.js';

const pick = (s, fields) => fields.reduce((o, f) => ({ ...o, [f]: s[f] }), {});

export const actionsAuth = {
  clearTimers() { [this.tt, this.jt, this.nt, this.pt, this.dt, this.ct, this.st, this.vt].forEach(clearTimeout); },
  reiniciar() { this.clearTimers(); this.setState(initialState()); this.startSplash(); },
  startSplash() { clearTimeout(this.st); this.st = setTimeout(() => { if (this.state.phase === 'splash') this.setState({ phase: 'auth', auth: 'bienvenida' }); }, 2300); },
  goAuth(a, extra) { this.setState({ auth: a, sheet: null, ...(extra || {}) }); },

  /** Guarda los datos de la cuenta de jugador activa antes de cambiar de cuenta. */
  savedWithCurrent() {
    const S = this.state;
    if (S.user && S.user.tipo === 'jugador') return { ...S.saved, [S.user.id]: pick(S, PFIELDS) };
    return S.saved;
  },
  entrar(acc) {
    this.clearTimers();
    const saved = this.savedWithCurrent();
    const base = { saved, sheet: null, notif: null, pay: null, toast: null, login: { mail: '', pass: '', ver: false, err: '' } };
    if (acc.tipo === 'jugador') {
      const data = saved[acc.id] || (acc.id === 'facu' ? facuData() : null);
      const first = data.matches[0];
      this.setState({ ...base, ...data, phase: 'app', user: { tipo: 'jugador', id: acc.id }, screen: 'home', hist: [], selMatch: first ? first.id : null, lastMatch: null, aviso: null });
    } else if (acc.estado === 'revision') {
      this.setState({ ...base, phase: 'auth', auth: 'revision', user: null, rcMail: acc.mail || this.state.rcMail });
    } else {
      this.setState({ ...base, phase: 'app', user: { tipo: 'complejo', id: acc.id }, cScreen: 'dash', cCell: null, cx: acc.cx || this.state.cx });
    }
  },
  logout(msg) {
    this.clearTimers();
    this.setState({ saved: this.savedWithCurrent(), phase: 'auth', auth: 'bienvenida', user: null, sheet: null, notif: null, pay: null, toast: null });
    if (msg) setTimeout(() => this.toast(msg), 50);
  },
  demoJugador() { this.entrar({ tipo: 'jugador', id: 'facu' }); },
  demoComplejo() { this.entrar({ tipo: 'complejo', id: 'north', cx: { nombre: 'North Champ', verificado: true } }); },

  // ---------- ingresar
  setLogin(p) { this.setState({ login: { ...this.state.login, err: '', ...p } }); },
  ingresar() {
    const { mail, pass } = this.state.login;
    const acc = this.state.accounts[mail.trim().toLowerCase()];
    if (!acc) return this.setLogin({ err: 'no encontramos una cuenta con ese mail. ¿la creamos?' });
    if (acc.pass !== pass) return this.setState({ login: { ...this.state.login, err: 'la contraseña no coincide. probá de nuevo o recuperala.' } });
    this.entrar({ ...acc, mail: mail.trim().toLowerCase() });
  },
  entrarCon(proveedor) { this.entrar({ tipo: 'jugador', id: 'facu' }); setTimeout(() => this.toast(`entraste con ${proveedor}.`), 50); },

  // ---------- registro de jugador
  setRJ(p) { this.setState({ rj: { ...this.state.rj, ...p } }); },
  rjBack() { const r = this.state.rj; if (r.step > 1) this.setRJ({ step: r.step - 1 }); else this.goAuth('elegir'); },
  rjNext() {
    const r = this.state.rj;
    if (r.step < 5) return this.setRJ({ step: r.step + 1 });
    const mail = r.mail.trim().toLowerCase();
    const id = 'u' + Date.now();
    this.setState({
      accounts: { ...this.state.accounts, [mail]: { tipo: 'jugador', id, pass: r.pass } },
      saved: { ...this.savedWithCurrent(), [id]: newPlayerData(r) },
      auth: 'regJok', nuevoId: id,
    });
  },
  rjEntrar() { this.entrar({ tipo: 'jugador', id: this.state.nuevoId }); this.setState({ rj: emptyRJ() }); },
  enviarCodigo(which, campo) {
    const set = which === 'rc' ? (p) => this.setRC(p) : (p) => this.setRJ(p);
    set({ [campo + 'Sent']: true, [campo + 'Code']: '', [campo + 'Ok']: false });
    this.toast(campo === 'mail' ? 'te mandamos un código de 6 números al mail.' : 'te mandamos un código de 6 números por SMS.');
  },
  verificarCodigo(which, campo) {
    const r = which === 'rc' ? this.state.rc : this.state.rj;
    const set = which === 'rc' ? (p) => this.setRC(p) : (p) => this.setRJ(p);
    if (/^\d{6}$/.test(r[campo + 'Code'])) set({ [campo + 'Ok']: true });
    else this.toast('el código tiene 6 números. revisalo y probá de nuevo.');
  },

  // ---------- registro de complejo
  setRC(p) { this.setState({ rc: { ...this.state.rc, ...p } }); },
  rcBack() { const r = this.state.rc; if (r.step > 1) this.setRC({ step: r.step - 1 }); else this.goAuth('elegir'); },
  rcNext() {
    const r = this.state.rc;
    if (r.step < 6) return this.setRC({ step: r.step + 1 });
    const mail = r.mail.trim().toLowerCase();
    this.setState({
      accounts: { ...this.state.accounts, [mail]: { tipo: 'complejo', id: 'c' + Date.now(), pass: r.pass, estado: 'revision', cx: { nombre: r.nombre.trim(), verificado: false } } },
      auth: 'revision', rcMail: mail,
    });
  },
  validarCuit() {
    this.setRC({ cuitEstado: 'validando' });
    clearTimeout(this.vt);
    this.vt = setTimeout(() => this.setRC({ cuitEstado: 'ok' }), 1600);
  },
  aprobar() {
    const mail = this.state.rcMail;
    const acc = this.state.accounts[mail];
    const cx = { nombre: (acc && acc.cx.nombre) || 'North Champ', verificado: true };
    this.setState({ accounts: { ...this.state.accounts, [mail]: { ...acc, estado: 'ok', cx } }, auth: 'verificado', cx });
  },
  irPanel() {
    const acc = this.state.accounts[this.state.rcMail];
    this.entrar({ ...acc, estado: 'ok' });
    this.setState({ rc: emptyRC() });
  },

  /** Sólo demo: completa la pantalla de registro actual con datos de ejemplo. */
  demoFill() {
    const S = this.state;
    if (S.phase !== 'auth') return;
    if (S.auth === 'ingresar') return this.setLogin({ mail: 'facu@mail.com', pass: 'Futbol123' });
    if (S.auth === 'regJ') {
      const fill = {
        1: { alias: 'Simón', nac: '2003-03-21' },
        2: { mail: 'simon@mail.com', mailSent: true, mailCode: '482915', mailOk: true, cel: '11 5555-0199', celSent: true, celCode: '730264', celOk: true },
        3: { pass: 'Picado2026' },
        4: { pos: 'delantero', nivel: 'intermedio', foto: IMG('av-pipe') },
        5: { tyc: true, pp: true, zona: 'San Isidro' },
      }[S.rj.step];
      return this.setRJ(fill);
    }
    if (S.auth === 'regC') {
      const fill = {
        1: { nombre: 'North Champ', razon: 'North Champ S.R.L.', cuit: '30-71234567-8', dir: 'Av. del Libertador 1500, San Isidro', mail: 'hola@northchamp.com.ar', tel: '11 5555-0300' },
        2: { resp: 'Martín Gómez', cargo: 'dueño', cel: '11 5555-0301', celSent: true, celCode: '552018', celOk: true },
        3: { pass: 'Cancha2026' },
        4: { cuitEstado: 'ok', doc: { name: 'habilitacion-municipal.jpg', url: IMG('vestuario'), img: true }, mp: true },
        5: { canchas: [{ tipo: 5, sup: 'césped sintético' }, { tipo: 5, sup: 'césped sintético' }, { tipo: 7, sup: 'césped sintético' }], fotos: [IMG('cancha-noche'), IMG('cancha-noche-2'), IMG('vestuario')] },
        6: { terms: true },
      }[S.rc.step];
      return this.setRC(fill);
    }
  },
};
