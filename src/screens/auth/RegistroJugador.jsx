import { Icon, Progress, Field, CodeField, PassField, Chips, Check, Avatar, Photo, Micro } from '../../components/ui.jsx';
import { IMG } from '../../logic/data.js';

export function RegistroJugador({ av, app }) {
  const r = av.rj;
  return (
    <div className="col g20 pad">
      <div className="hdr back">
        <button className="ib" aria-label="volver" onClick={r.back}><Icon name="back" /></button>
        <span className="idx">// crear cuenta de jugador</span>
      </div>
      <Progress step={r.step} total={5} label={r.titulos[r.step - 1]} />

      {r.step === 1 && (
        <>
          <div className="col g8"><h1 className="dk" style={{ fontSize: 46 }}>ARRANQUEMOS</h1><p className="ley">dos datos y listo. nada de DNI ni de género: no los necesitamos.</p></div>
          <Field id="rj-alias" label="nombre o alias" help="es lo que ven los demás jugadores.">
            <input id="rj-alias" className="inp" value={r.alias} onChange={r.set('alias')} autoComplete="nickname" placeholder="ej: Facu" />
          </Field>
          <Field id="rj-nac" label="fecha de nacimiento" help="solo para confirmar que sos mayor de 18. no se muestra en tu perfil.">
            <input id="rj-nac" className="inp" type="date" value={r.nac} onChange={r.set('nac')} max="2026-12-31" />
          </Field>
          {r.menor && (
            <div className="cd hi col g8" role="alert" style={{ padding: 16 }}>
              <span className="sec">todavía no</span>
              <p className="ley ink">último hombre es para mayores de 18 porque hay pagos y partidos con gente que no conocés. te esperamos cuando cumplas. mientras tanto, ¡a seguir jugando!</p>
            </div>
          )}
        </>
      )}

      {r.step === 2 && (
        <>
          <div className="col g8"><h1 className="dk" style={{ fontSize: 46 }}>¿CÓMO TE AVISAMOS?</h1><p className="ley">usamos tu mail y tu celular para tu cuenta y tus reservas. verificamos los dos con un código.</p></div>
          <CodeField id="rj-mail" label="mail" type="email" value={r.mail} onChange={r.set('mail')} valido={r.mailValido}
            sent={r.mailSent} code={r.mailCode} onCode={(e) => r.setV({ mailCode: e.target.value.replace(/\D/g, '') })} ok={r.mailOk}
            enviar={() => app.enviarCodigo('rj', 'mail')} verificar={() => app.verificarCodigo('rj', 'mail')} placeholder="tu@mail.com" />
          <CodeField id="rj-cel" label="celular" type="tel" value={r.cel} onChange={r.set('cel')} valido={r.celValido}
            sent={r.celSent} code={r.celCode} onCode={(e) => r.setV({ celCode: e.target.value.replace(/\D/g, '') })} ok={r.celOk}
            enviar={() => app.enviarCodigo('rj', 'cel')} verificar={() => app.verificarCodigo('rj', 'cel')} placeholder="11 1234-5678"
            help="los otros jugadores lo ven recién cuando el partido está confirmado. en tu perfil aparece el badge «teléfono verificado»." />
        </>
      )}

      {r.step === 3 && (
        <>
          <div className="col g8"><h1 className="dk" style={{ fontSize: 46 }}>UNA CONTRASEÑA</h1><p className="ley">que no sea «boca123». te vamos marcando qué falta.</p></div>
          <PassField id="rj-pass" value={r.passVal} onChange={r.set('pass')} ver={r.verPass} toggle={() => r.setV({ verPass: !r.verPass })} rules={r.pass} />
          <div className="cd" style={{ padding: '4px 14px' }}>
            <Check id="rj-bio" checked={r.bio} onChange={() => r.setV({ bio: !r.bio })} sub="opcional. lo podés activar o sacar después.">usar Face ID o huella para entrar y confirmar pagos</Check>
          </div>
        </>
      )}

      {r.step === 4 && (
        <>
          <div className="col g8"><h1 className="dk" style={{ fontSize: 46 }}>TU PERFIL FUTBOLERO</h1><p className="ley">todo opcional. ayuda a que te encuentren los partidos justos.</p></div>
          <div className="wrap g16" style={{ alignItems: 'center', flexWrap: 'nowrap' }}>
            <Avatar foto={r.foto} ini={(r.alias || '?').charAt(0).toUpperCase()} size={84} ring={!!r.foto} />
            <label className="upload" style={{ flex: 1, minHeight: 84 }}>
              <input type="file" accept="image/*" onChange={r.setFoto} aria-label="subir foto de perfil" />
              <span className="bx" style={{ fontSize: 14 }}>{r.foto ? 'cambiar foto' : 'subir foto'}</span>
              <span className="idx">la ven tus compañeros cuando estás confirmado en un partido.</span>
            </label>
          </div>
          <div><span className="lbl">posición preferida</span><div className="wrap"><Chips items={r.pos} /></div></div>
          <div><span className="lbl">nivel</span><div className="wrap"><Chips items={r.nivel} /></div></div>
          <button className="lnk ink" style={{ alignSelf: 'flex-start' }} onClick={r.despues}>completar después</button>
        </>
      )}

      {r.step === 5 && (
        <>
          <div className="col g8"><h1 className="dk" style={{ fontSize: 46 }}>TUS DATOS, CLARITOS</h1></div>
          <div className="cd hi col g8" style={{ padding: 16 }}>
            <span className="sec">en pocas palabras</span>
            <p className="ley ink">usamos tu mail y teléfono para tu cuenta y tus reservas. los pagos los procesa Mercado Pago: nunca guardamos tu tarjeta. no vendemos tus datos.</p>
          </div>
          <div className="col">
            <span className="lbl" style={{ margin: '4px 0 0' }}>obligatorio</span>
            <Check id="rj-tyc" checked={r.tyc} onChange={() => r.setV({ tyc: !r.tyc })}>
              acepto los <button className="lnk" onClick={(e) => { e.preventDefault(); app.setState({ sheet: { type: 'terminos' } }); }}>términos y condiciones</button>
            </Check>
            <Check id="rj-pp" checked={r.pp} onChange={() => r.setV({ pp: !r.pp })}>
              acepto la <button className="lnk" onClick={(e) => { e.preventDefault(); app.setState({ sheet: { type: 'politica' } }); }}>política de privacidad</button>
            </Check>
          </div>
          <div className="col">
            <span className="lbl" style={{ margin: '4px 0 0' }}>opcional</span>
            <Check id="rj-ubic" checked={r.ubic} onChange={() => r.setV({ ubic: !r.ubic })} sub="para ver canchas y partidos cerca. si no, elegís tu zona a mano.">ubicación aproximada</Check>
            {!r.ubic && (
              <div className="col g8" style={{ padding: '2px 0 10px 36px' }}>
                <span className="idx">tu zona</span>
                <div className="wrap"><Chips items={r.zona} /></div>
              </div>
            )}
            <Check id="rj-notif" checked={r.notif} onChange={() => r.setV({ notif: !r.notif })} sub="avisos de tus partidos y de quién se suma. con límite diario.">notificaciones</Check>
            <Check id="rj-publi" checked={r.publi} onChange={() => r.setV({ publi: !r.publi })} sub="ofertas de marcas deportivas, siempre marcadas como «publicidad».">publicidad de marcas deportivas</Check>
          </div>
          <p className="ley" style={{ fontSize: 13 }}>podés cambiar esto cuando quieras desde configuración &gt; privacidad.</p>
        </>
      )}

      <button className="btn" disabled={!r.can} onClick={r.next}>{r.step < 5 ? 'siguiente' : 'crear mi cuenta'}</button>
    </div>
  );
}

export function RegistroJugadorOk({ app }) {
  const r = app.state.rj;
  return (
    <div className="col" style={{ minHeight: '100%' }}>
      <Photo src={IMG('festejo')} h={300} veil="bottom" style={{ marginTop: 'calc(-1 * var(--top))' }} alt="jugadores abrazados festejando un gol">
        <span className="idx" style={{ color: 'var(--ink)' }}>// cuenta creada</span>
      </Photo>
      <div className="col g16 pad" style={{ paddingTop: 22, flex: 1 }}>
        <h1 className="dk" style={{ fontSize: 56 }}>ADENTRO, {r.alias.trim().toUpperCase()}.</h1>
        <p className="ley ink" style={{ fontSize: 16, lineHeight: '23px' }}>tu cuenta está lista. ya podés reservar cancha, armar tu partido o sumarte a uno cerca.</p>
        <div className="wrap g8" style={{ alignItems: 'center' }}><Micro name="anillos" size={16} color="#bce04b" /><span className="badge">teléfono verificado</span></div>
        <p className="ley" style={{ fontSize: 13 }}>tu reputación arranca en neutro: se arma partido a partido.</p>
        <div style={{ flex: 1 }} />
        <button className="btn" onClick={() => app.rjEntrar()}>ir al inicio</button>
      </div>
    </div>
  );
}
