import { Icon, Progress, Field, CodeField, PassField, Chips, Check, Micro, Photo } from '../../components/ui.jsx';
import { IMG } from '../../logic/data.js';

const TIPOS = [5, 7, 8, 11];
const SUPS = ['césped sintético', 'césped natural', 'cemento'];
const HORAS = ['8', '9', '10', '11', '12'];
const CIERRES = ['22', '23', '24', '1'];

function MiniMapa({ dir }) {
  return (
    <div className="map" aria-label={dir ? `mapa de ${dir}` : 'mapa'} role="img">
      <svg width="100%" height="100%" viewBox="0 0 350 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g stroke="rgba(233,240,255,.16)" strokeWidth="1">
          {[20, 50, 80, 110].map((y) => <path key={y} d={`M0 ${y}H350`} />)}
          {[40, 100, 160, 220, 280, 340].map((x) => <path key={x} d={`M${x} 0V120`} />)}
        </g>
        <path d="M0 95 L350 30" stroke="#6161b5" strokeWidth="6" />
        <rect x="186" y="44" width="38" height="24" fill="none" stroke="rgba(233,240,255,.4)" />
        {dir && <g><circle cx="205" cy="56" r="14" fill="none" stroke="#bce04b" strokeWidth="2" /><circle cx="205" cy="56" r="4" fill="#bce04b" /></g>}
      </svg>
      <span className="idx" style={{ position: 'absolute', left: 10, bottom: 8 }}>{dir || 'escribí la dirección y la ubicamos'}</span>
    </div>
  );
}

export function RegistroComplejo({ av, app }) {
  const r = av.rc;
  return (
    <div className="col g20 pad">
      <div className="hdr back">
        <button className="ib" aria-label="volver" onClick={r.back}><Icon name="back" /></button>
        <span className="idx">// crear cuenta de complejo</span>
      </div>
      <Progress step={r.step} total={6} label={r.titulos[r.step - 1]} />

      {r.step === 1 && (
        <>
          <h1 className="dk" style={{ fontSize: 44 }}>TU COMPLEJO</h1>
          <Field id="rc-nombre" label="nombre del complejo"><input id="rc-nombre" className="inp" value={r.nombre} onChange={r.set('nombre')} placeholder="ej: North Champ" /></Field>
          <Field id="rc-razon" label="razón social"><input id="rc-razon" className="inp" value={r.razon} onChange={r.set('razon')} /></Field>
          <Field id="rc-cuit" label="CUIT" help="lo validamos en el paso 4."><input id="rc-cuit" className="inp" inputMode="numeric" value={r.cuit} onChange={r.set('cuit')} placeholder="30-12345678-9" /></Field>
          <Field id="rc-dir" label="dirección"><input id="rc-dir" className="inp" value={r.dir} onChange={r.set('dir')} autoComplete="street-address" /></Field>
          <MiniMapa dir={r.dir.trim().length >= 5 ? r.dir.trim() : ''} />
          <Field id="rc-mail" label="mail del complejo"><input id="rc-mail" className="inp" type="email" value={r.mail} onChange={r.set('mail')} autoComplete="email" /></Field>
          <Field id="rc-tel" label="teléfono del complejo"><input id="rc-tel" className="inp" type="tel" value={r.tel} onChange={r.set('tel')} /></Field>
        </>
      )}

      {r.step === 2 && (
        <>
          <h1 className="dk" style={{ fontSize: 44 }}>QUIÉN SE ENCARGA</h1>
          <p className="ley">la persona responsable de la cuenta.</p>
          <Field id="rc-resp" label="nombre"><input id="rc-resp" className="inp" value={r.resp} onChange={r.set('resp')} autoComplete="name" /></Field>
          <div><span className="lbl">cargo</span><div className="wrap"><Chips items={r.cargo} /></div></div>
          <CodeField id="rc-cel" label="celular" type="tel" value={r.cel} onChange={r.set('cel')} valido={r.celValido}
            sent={r.celSent} code={r.celCode} onCode={(e) => r.setV({ celCode: e.target.value.replace(/\D/g, '') })} ok={r.celOk}
            enviar={() => app.enviarCodigo('rc', 'cel')} verificar={() => app.verificarCodigo('rc', 'cel')} placeholder="11 1234-5678" />
        </>
      )}

      {r.step === 3 && (
        <>
          <h1 className="dk" style={{ fontSize: 44 }}>UNA CONTRASEÑA</h1>
          <PassField id="rc-pass" value={r.passVal} onChange={r.set('pass')} ver={r.verPass} toggle={() => r.setV({ verPass: !r.verPass })} rules={r.pass} />
        </>
      )}

      {r.step === 4 && (
        <>
          <div className="col g8"><h1 className="dk" style={{ fontSize: 44 }}>QUE SE VEA QUE ES REAL</h1><p className="ley">así los jugadores reservan tranquilos.</p></div>
          <div className="cd col g10" style={{ padding: 16 }}>
            <span className="bx">1 · validación del CUIT</span>
            {r.cuitEstado === 'idle' && <button className="btn s sm" onClick={r.validarCuit}>validar {r.cuit || 'CUIT'}</button>}
            {r.cuitEstado === 'validando' && <span className="wrap g8" role="status" style={{ alignItems: 'center' }}><Micro name="ciclo" size={16} color="#bce04b" style={{ animation: 'uhSpin .9s linear infinite' }} /><span className="ley">validando…</span></span>}
            {r.cuitEstado === 'ok' && <span className="pl l">CUIT activo · coincide con la razón social</span>}
          </div>
          <div className="cd col g10" style={{ padding: 16 }}>
            <span className="bx">2 · habilitación municipal o constancia de inscripción</span>
            {r.doc ? (
              <div className="wrap g12" style={{ alignItems: 'center', flexWrap: 'nowrap' }}>
                {r.doc.img ? <img src={r.doc.url} alt="vista previa del documento" style={{ width: 64, height: 64, objectFit: 'cover', border: '1px solid var(--line-2)' }} /> : <span className="avatar" style={{ width: 64, height: 64 }}><span className="idx">PDF</span></span>}
                <div className="col g2 min0" style={{ flex: 1 }}><span className="bx" style={{ fontSize: 13, wordBreak: 'break-all' }}>{r.doc.name}</span><span className="idx">{r.doc.kb ? r.doc.kb + ' KB · ' : ''}cargado</span></div>
                <button className="lnk ink" onClick={() => r.setV({ doc: null })}>cambiar</button>
              </div>
            ) : (
              <label className="upload">
                <input type="file" accept="image/*,application/pdf" onChange={r.setDoc} aria-label="subir documento" />
                <span className="bx" style={{ fontSize: 14 }}>subir archivo</span>
                <span className="idx">foto o PDF, que se lea bien</span>
              </label>
            )}
          </div>
          <div className="cd col g10" style={{ padding: 16 }}>
            <span className="bx">3 · cuenta de cobro</span>
            <span className="ley" style={{ fontSize: 13 }}>vinculá una cuenta de Mercado Pago a nombre de ese CUIT: ahí cobrás las reservas.</span>
            {r.mp ? <span className="pl l">Mercado Pago vinculado</span> : <button className="btn s sm" onClick={r.vincularMP}>vincular Mercado Pago</button>}
          </div>
        </>
      )}

      {r.step === 5 && (
        <>
          <div className="col g8"><h1 className="dk" style={{ fontSize: 44 }}>TUS CANCHAS</h1><p className="ley">después lo podés cambiar cuando quieras.</p></div>
          {r.canchas.map((k, i) => (
            <div key={i} className="cd col g10" style={{ padding: 14 }}>
              <div className="rb"><span className="bx">cancha {i + 1}</span>{r.canchas.length > 1 && <button className="lnk ink" onClick={() => r.delCancha(i)}>sacar</button>}</div>
              <div className="wrap g6">{TIPOS.map((t) => <button key={t} className={'ch' + (k.tipo === t ? ' on' : '')} aria-pressed={k.tipo === t} onClick={() => r.setCancha(i, { tipo: t })}>fútbol {t}</button>)}</div>
              <div className="wrap g6">{SUPS.map((s) => <button key={s} className={'ch' + (k.sup === s ? ' on' : '')} aria-pressed={k.sup === s} onClick={() => r.setCancha(i, { sup: s })}>{s}</button>)}</div>
            </div>
          ))}
          <button className="btn s" onClick={r.addCancha}>sumar otra cancha</button>
          <div className="grid2">
            <Field id="rc-abre" label="abre a las"><select id="rc-abre" className="inp" value={r.abre} onChange={r.set('abre')}>{HORAS.map((h) => <option key={h} value={h}>{h} h</option>)}</select></Field>
            <Field id="rc-cierra" label="cierra a las"><select id="rc-cierra" className="inp" value={r.cierra} onChange={r.set('cierra')}>{CIERRES.map((h) => <option key={h} value={h}>{h} h</option>)}</select></Field>
          </div>
          <div className="grid2">
            <Field id="rc-dia" label="precio de día ($)"><input id="rc-dia" className="inp" inputMode="numeric" value={r.dia} onChange={(e) => r.setV({ dia: e.target.value.replace(/\D/g, '') })} /></Field>
            <Field id="rc-noche" label="precio de noche ($)"><input id="rc-noche" className="inp" inputMode="numeric" value={r.noche} onChange={(e) => r.setV({ noche: e.target.value.replace(/\D/g, '') })} /></Field>
          </div>
          <div className="col g8">
            <span className="lbl" style={{ margin: 0 }}>fotos</span>
            {r.fotos.length > 0 && <div className="grid3" style={{ gap: 4 }}>{r.fotos.map((f, i) => <img key={i} src={f} alt={`foto ${i + 1} del complejo`} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />)}</div>}
            <label className="upload"><input type="file" accept="image/*" multiple onChange={r.addFotos} aria-label="subir fotos del complejo" /><span className="bx" style={{ fontSize: 14 }}>subir fotos</span><span className="idx">canchas de día y de noche, vestuarios, entrada</span></label>
          </div>
        </>
      )}

      {r.step === 6 && (
        <>
          <h1 className="dk" style={{ fontSize: 44 }}>ÚLTIMO PASO</h1>
          <div className="cd hi col g8" style={{ padding: 16 }}>
            <span className="sec">importante</span>
            <p className="ley ink" style={{ fontSize: 15, lineHeight: '22px' }}>los datos de los jugadores solo se usan para gestionar sus reservas, no para publicidad propia.</p>
          </div>
          <Check id="rc-terms" checked={r.terms} onChange={() => r.setV({ terms: !r.terms })}>
            acepto los <button className="lnk" onClick={(e) => { e.preventDefault(); app.setState({ sheet: { type: 'terminosC' } }); }}>términos para complejos</button>
          </Check>
        </>
      )}

      <button className="btn" disabled={!r.can} onClick={r.next}>{r.step < 6 ? 'siguiente' : 'enviar para revisión'}</button>
    </div>
  );
}

export function Revision({ app }) {
  const acc = app.state.accounts[app.state.rcMail];
  const nombre = acc ? acc.cx.nombre : 'tu complejo';
  const pasos = [
    ['datos y documentación recibidos', true],
    ['CUIT validado', true],
    ['onboarding con nuestro equipo · te contactamos en hasta 48 h', false],
    ['tu complejo aparece en las búsquedas', false],
  ];
  return (
    <div className="col g20 pad">
      <div className="hdr"><span className="idx">// {nombre.toLowerCase()}</span></div>
      <h1 className="dk" style={{ fontSize: 44 }}>TU COMPLEJO ESTÁ EN REVISIÓN</h1>
      <p className="ley ink">te contactamos para el onboarding en hasta 48 h. mientras tanto podés cargar canchas y precios, pero todavía no aparecés en las búsquedas.</p>
      <ol className="col" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {pasos.map(([t, ok], i) => (
          <li key={t} className="ln wrap g12" style={{ padding: '12px 0', alignItems: 'center', flexWrap: 'nowrap' }}>
            <span style={{ width: 26, height: 26, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid ' + (ok ? 'var(--accent)' : 'var(--line-2)'), background: ok ? 'var(--accent)' : 'transparent' }} aria-hidden="true">
              {ok ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1c1c4b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg> : <span className="idx">{i + 1}</span>}
            </span>
            <span className={ok ? 'bx' : 'ley'} style={{ fontSize: 14 }}>{t}<span className="sr">{ok ? ' (listo)' : ' (pendiente)'}</span></span>
          </li>
        ))}
      </ol>
      <button className="btn s" onClick={() => app.toast('podés seguir cargando canchas y precios. se publican cuando estés verificado.')}>cargar canchas y precios</button>
      <div className="col g8 ln" style={{ paddingTop: 16 }}>
        <span className="idx">// solo para la demo</span>
        <button className="btn" onClick={() => app.aprobar()}>simular aprobación</button>
      </div>
      <button className="lnk ink" style={{ alignSelf: 'flex-start' }} onClick={() => app.logout()}>cerrar sesión</button>
    </div>
  );
}

export function Verificado({ app }) {
  return (
    <div className="col" style={{ minHeight: '100%' }}>
      <Photo src={IMG('cancha-noche')} h={280} veil="bottom" style={{ marginTop: 'calc(-1 * var(--top))' }} alt="cancha de fútbol iluminada de noche">
        <span className="pl f">complejo verificado</span>
      </Photo>
      <div className="col g16 pad" style={{ paddingTop: 22, flex: 1 }}>
        <h1 className="dk" style={{ fontSize: 54 }}>{app.state.cx.nombre.toUpperCase()} YA ESTÁ EN LA CANCHA.</h1>
        <p className="ley ink" style={{ fontSize: 16, lineHeight: '23px' }}>tu complejo está verificado y ya aparece en las búsquedas de jugadores de la zona.</p>
        <div style={{ flex: 1 }} />
        <button className="btn" onClick={() => app.irPanel()}>ir al panel</button>
      </div>
    </div>
  );
}
