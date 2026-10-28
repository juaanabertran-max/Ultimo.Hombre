import React from 'react';
import { initialState } from './logic/data.js';
import { buildView } from './logic/view.js';
import { buildAuthView } from './logic/viewAuth.js';
import { actionsJugador } from './logic/actionsJugador.js';
import { actionsAuth } from './logic/actionsAuth.js';
import { actionsComplejo } from './logic/actionsComplejo.js';
import { Grain, NavIcon } from './components/ui.jsx';
import { PaySheet, CeldaSheet, Notif, Toast } from './components/Overlays.jsx';
import Sheets from './components/Sheets.jsx';
import DemoPanel from './components/DemoPanel.jsx';
import { Splash, Bienvenida, Ingresar, Elegir } from './screens/auth/Inicio.jsx';
import { RegistroJugador, RegistroJugadorOk } from './screens/auth/RegistroJugador.jsx';
import { RegistroComplejo, Revision, Verificado } from './screens/auth/RegistroComplejo.jsx';
import Home from './screens/jugador/Home.jsx';
import { Complejos, ComplejoDetalle } from './screens/jugador/Reservar.jsx';
import { Checkout, Confirmado } from './screens/jugador/Checkout.jsx';
import Publicar from './screens/jugador/Publicar.jsx';
import { Feed, Sumarme, Aviso } from './screens/jugador/Feed.jsx';
import { MisPartidos, Partido } from './screens/jugador/Partidos.jsx';
import { Perfil, EditarPerfil, Privacidad } from './screens/jugador/Perfil.jsx';
import Calificar from './screens/jugador/Calificar.jsx';
import Dashboard from './screens/complejo/Dashboard.jsx';
import Agenda from './screens/complejo/Agenda.jsx';
import Reservas from './screens/complejo/Reservas.jsx';
import Cobros from './screens/complejo/Cobros.jsx';
import PerfilComplejo from './screens/complejo/PerfilComplejo.jsx';

const NAV_J = [
  { id: 'home', label: 'inicio', icon: 'home', g: ['home', 'complejos', 'complejo', 'checkout', 'confirmado', 'calificar'] },
  { id: 'feed', label: 'buscar', icon: 'search', g: ['feed', 'sumarme', 'aviso'] },
  { id: 'misPartidos', label: 'mis partidos', icon: 'calendar', g: ['misPartidos', 'partido', 'publicar'] },
  { id: 'perfil', label: 'perfil', icon: 'user', g: ['perfil', 'editarPerfil', 'privacidad'] },
];
const NAV_C = [
  { id: 'dash', label: 'panel', icon: 'bars' },
  { id: 'agenda', label: 'agenda', icon: 'grid' },
  { id: 'reservas', label: 'reservas', icon: 'list' },
  { id: 'cobros', label: 'cobros', icon: 'card' },
  { id: 'perfilC', label: 'complejo', icon: 'building' },
];
const SCREENS_J = {
  home: Home, complejos: Complejos, complejo: ComplejoDetalle, checkout: Checkout, confirmado: Confirmado,
  publicar: Publicar, feed: Feed, sumarme: Sumarme, aviso: Aviso, misPartidos: MisPartidos, partido: Partido,
  perfil: Perfil, editarPerfil: EditarPerfil, privacidad: Privacidad, calificar: Calificar,
};
const SCREENS_C = { dash: Dashboard, agenda: Agenda, reservas: Reservas, cobros: Cobros, perfilC: PerfilComplejo };
const SCREENS_AUTH = { ingresar: Ingresar, elegir: Elegir, regJ: RegistroJugador, regJok: RegistroJugadorOk, regC: RegistroComplejo, revision: Revision, verificado: Verificado };

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState();
    this.scrollRef = React.createRef();
  }
  componentDidMount() { this.startSplash(); }
  componentWillUnmount() { this.clearTimers(); }
  componentDidUpdate(_, ps) {
    const s = this.state;
    if (ps.screen !== s.screen || ps.cScreen !== s.cScreen || ps.phase !== s.phase || ps.auth !== s.auth || ps.rj.step !== s.rj.step || ps.rc.step !== s.rc.step || ps.user !== s.user) {
      if (this.scrollRef.current) this.scrollRef.current.scrollTop = 0;
    }
  }

  renderContent(vm, av) {
    const S = this.state;
    if (S.phase === 'auth') {
      const Screen = SCREENS_AUTH[S.auth];
      return Screen ? <Screen av={av} app={this} /> : null;
    }
    const Screen = vm.J ? SCREENS_J[S.screen] : SCREENS_C[S.cScreen];
    return Screen ? <Screen vm={vm} app={this} /> : null;
  }

  render() {
    const S = this.state;
    const inApp = S.phase === 'app';
    const vm = inApp ? buildView(this) : null;
    const av = S.phase === 'auth' ? buildAuthView(this) : null;
    const J = inApp && vm.J;
    const full = S.phase === 'splash' || (S.phase === 'auth' && S.auth === 'bienvenida');
    const formDemo = S.phase === 'auth' && ['ingresar', 'regJ', 'regC'].includes(S.auth);

    return (
      <div className="stage">
        <DemoPanel app={this} formDemo={formDemo} />
        <div className="device">
          <div className="screen">
            <Grain />
            {full ? (
              S.phase === 'splash' ? <Splash /> : <Bienvenida app={this} />
            ) : (
              <div className="app-col">
                <main className="scroll" ref={this.scrollRef}>{this.renderContent(vm, av)}</main>
                {J && (
                  <nav className="nav" aria-label="navegación">
                    {NAV_J.map((n) => (
                      <button key={n.id} className={'nv' + (n.g.includes(S.screen) ? ' on' : '')} aria-current={n.g.includes(S.screen) ? 'page' : undefined} onClick={() => this.tab(n.id)}>
                        <NavIcon name={n.icon} /><span>{n.label}</span>
                      </button>
                    ))}
                  </nav>
                )}
                {inApp && !J && (
                  <nav className="nav" aria-label="navegación del complejo">
                    {NAV_C.map((n) => (
                      <button key={n.id} className={'nv' + (S.cScreen === n.id ? ' on' : '')} aria-current={S.cScreen === n.id ? 'page' : undefined} onClick={() => this.setState({ cScreen: n.id, cCell: null })}>
                        <NavIcon name={n.icon} /><span>{n.label}</span>
                      </button>
                    ))}
                  </nav>
                )}
                <div className="franja" aria-hidden="true" />
              </div>
            )}
            {vm && vm.pay && <PaySheet p={vm.pay} />}
            {vm && vm.ce && <CeldaSheet c={vm.ce} />}
            {S.sheet && <Sheets app={this} vm={vm} />}
            {vm && vm.notif && <Notif n={vm.notif} />}
            {S.toast && <Toast txt={S.toast} />}
          </div>
        </div>
      </div>
    );
  }
}

Object.assign(App.prototype, actionsJugador, actionsAuth, actionsComplejo);
