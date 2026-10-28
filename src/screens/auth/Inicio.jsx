import { Photo, Field, Icon } from '../../components/ui.jsx';
import { IMG } from '../../logic/data.js';

const ISO = [[50, 108], [12, 76], [37, 80], [63, 80], [88, 76], [26, 44], [50, 48], [74, 44], [20, 14], [50, 10], [80, 14]];

export function Splash() {
  return (
    <div className="full splash" role="img" aria-label="Último Hombre">
      <svg className="iso" width="120" height="144" viewBox="0 0 100 120" aria-hidden="true">
        <g fill="#e9f0ff">{ISO.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.6" style={{ animationDelay: `${0.08 * i}s` }} />)}</g>
        <circle className="ring" cx="63" cy="80" r="9" fill="none" stroke="#bce04b" strokeWidth="2" />
      </svg>
      <div className="wm col g8" style={{ alignItems: 'center' }}>
        <span className="dk" style={{ fontSize: 40 }}>ÚLTIMO HOMBRE</span>
        <span className="ley">nunca te quedes sin jugar</span>
      </div>
    </div>
  );
}

function MiniLogo() {
  return (
    <div className="wrap g10" style={{ alignItems: 'center', flexWrap: 'nowrap' }}>
      <svg width="22" height="26" viewBox="0 0 100 120" aria-hidden="true"><g fill="#e9f0ff">{ISO.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" />)}</g><circle cx="63" cy="80" r="14" fill="none" stroke="#bce04b" strokeWidth="5" /></svg>
      <span className="dk" style={{ fontSize: 22 }}>ÚLTIMO HOMBRE</span>
    </div>
  );
}

export function Bienvenida({ app }) {
  return (
    <div className="full">
      <Photo src={IMG('bienvenida')} veil="full" style={{ position: 'absolute', inset: 0, height: '100%' }} alt="amigos sentados en una cancha de fútbol 5 de noche, con las luces prendidas" />
      <div className="col" style={{ position: 'relative', flex: 1, padding: 'calc(var(--top) + 10px) 20px 34px', justifyContent: 'space-between' }}>
        <MiniLogo />
        <div className="col g20">
          <h1 className="dk" style={{ fontSize: 62 }}>NUNCA TE QUEDES SIN JUGAR</h1>
          <p className="ley ink" style={{ fontSize: 16, lineHeight: '23px' }}>reservá la cancha, completá el equipo y pagá. todo en un mismo lugar.</p>
          <div className="col g10">
            <button className="btn" onClick={() => app.goAuth('ingresar')}>ingresar</button>
            <button className="btn s" style={{ background: 'rgba(28,28,75,.55)' }} onClick={() => app.goAuth('elegir')}>crear cuenta</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Ingresar({ av, app }) {
  const l = av.login;
  return (
    <div className="col g20 pad">
      <div className="hdr back">
        <button className="ib" aria-label="volver" onClick={() => app.goAuth('bienvenida')}><Icon name="back" /></button>
        <span className="idx">// ingresar</span>
      </div>
      <div className="col g8">
        <h1 className="dk" style={{ fontSize: 52 }}>QUÉ BUENO VERTE.</h1>
        <p className="ley">entrá con tu cuenta. la app sabe si sos jugador o complejo y te lleva a tu parte.</p>
      </div>
      <form className="col g16" onSubmit={(e) => { e.preventDefault(); app.ingresar(); }}>
        <Field id="li-mail" label="mail">
          <input id="li-mail" className="inp" type="email" value={l.mail} onChange={(e) => app.setLogin({ mail: e.target.value })} autoComplete="email" />
        </Field>
        <Field id="li-pass" label="contraseña">
          <div className="wrap" style={{ flexWrap: 'nowrap', gap: 0 }}>
            <input id="li-pass" className="inp" type={l.ver ? 'text' : 'password'} value={l.pass} onChange={(e) => app.setLogin({ pass: e.target.value })} autoComplete="current-password" style={{ borderRight: 0 }} />
            <button type="button" className="ib" style={{ border: '1px solid var(--line-2)', minHeight: 50, padding: '0 14px' }} onClick={() => app.setLogin({ ver: !l.ver })} aria-label={l.ver ? 'ocultar contraseña' : 'mostrar contraseña'}><span className="idx">{l.ver ? 'ocultar' : 'ver'}</span></button>
          </div>
        </Field>
        {l.err && <p className="cd ley ink" role="alert" style={{ padding: '10px 12px', borderColor: 'var(--accent)' }}>{l.err}</p>}
        <button type="button" className="lnk" style={{ alignSelf: 'flex-start' }} onClick={() => app.setState({ sheet: { type: 'olvide', mail: l.mail } })}>¿olvidaste tu contraseña?</button>
        <button type="submit" className="btn" disabled={!l.mail || !l.pass}>ingresar</button>
      </form>
      <div className="rb g10" aria-hidden="true"><span className="ln" style={{ flex: 1 }} /><span className="idx">o</span><span className="ln" style={{ flex: 1 }} /></div>
      <div className="col g10">
        <button className="btn s" onClick={() => app.entrarCon('Google')}>continuar con Google</button>
        <button className="btn s" onClick={() => app.entrarCon('Apple')}>continuar con Apple</button>
      </div>
      <p className="ley center">¿no tenés cuenta? <button className="lnk" onClick={() => app.goAuth('elegir')}>creala acá</button></p>
    </div>
  );
}

export function Elegir({ app }) {
  const card = (img, alt, titulo, sub, fn) => (
    <button className="tile" style={{ padding: 0 }} onClick={fn}>
      <Photo src={IMG(img)} h={150} alt={alt}>
        <span className="dk" style={{ fontSize: 30 }}>{titulo}</span>
      </Photo>
      <span className="rb" style={{ padding: '12px 14px' }}><span className="ley ink" style={{ fontSize: 13 }}>{sub}</span><Icon name="next" size={20} /></span>
    </button>
  );
  return (
    <div className="col g18 pad">
      <div className="hdr back">
        <button className="ib" aria-label="volver" onClick={() => app.goAuth('bienvenida')}><Icon name="back" /></button>
        <span className="idx">// crear cuenta</span>
      </div>
      <h1 className="dk" style={{ fontSize: 40 }}>¿CÓMO VAS A USAR ÚLTIMO HOMBRE?</h1>
      {card('equipo', 'equipo de amigos posando frente al arco', 'SOY JUGADOR', 'reservá, armá tu partido y sumate a otros.', () => app.goAuth('regJ'))}
      {card('cancha-luces', 'cancha de fútbol de noche con las luces prendidas', 'TENGO UN COMPLEJO', 'recibí reservas, cobrá y llená las horas muertas.', () => app.goAuth('regC'))}
      <p className="ley" style={{ fontSize: 13 }}>elegís una sola vez: define a qué parte de la app entrás.</p>
      <p className="cd ley ink" style={{ fontSize: 13, padding: '10px 12px' }}>¿tenés un complejo y también jugás? vas a necesitar una cuenta para cada cosa.</p>
      <p className="ley center">¿ya tenés cuenta? <button className="lnk" onClick={() => app.goAuth('ingresar')}>ingresá</button></p>
    </div>
  );
}
