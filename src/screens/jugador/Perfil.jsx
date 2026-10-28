import { BackHeader, Avatar, Chips, Micro, SwitchRow, Stepper, Field, Icon } from '../../components/ui.jsx';

const fs = (v) => (String(v).length > 4 ? 21 : 30);

export function Perfil({ vm }) {
  const p = vm.pp;
  return (
    <div className="col g22 pad">
      <div className="hdr rb">
        <span className="idx">// perfil</span>
        <button className="ib" aria-label="configuración y privacidad" onClick={p.privacidad}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg>
        </button>
      </div>
      <div className="wrap g16" style={{ alignItems: 'center', flexWrap: 'nowrap' }}>
        <Avatar foto={p.foto} ini={p.ini} size={88} ring />
        <div className="col g6 min0">
          <h1 className="dk" style={{ fontSize: 42 }}>{p.aliasUp}</h1>
          <p className="ley" style={{ fontSize: 13 }}>{p.sub}</p>
          <span className="badge"><Micro name="anillos" size={14} color="#bce04b" /> teléfono verificado</span>
        </div>
      </div>
      <div className="grid3">
        <div className="cd hi col g6" style={{ padding: '14px 12px' }}><span className="dk" style={{ fontSize: fs(p.asis), color: 'var(--accent)' }}>{p.asis}</span><span className="idx">asistencia</span></div>
        <div className="cd col g6" style={{ padding: '14px 12px' }}><span className="dk" style={{ fontSize: fs(p.conducta) }}>{p.conducta}</span><span className="idx">conducta</span></div>
        <div className="cd col g6" style={{ padding: '14px 12px' }}><span className="dk" style={{ fontSize: 30 }}>{p.jugados}</span><span className="idx">partidos</span></div>
      </div>
      {p.nuevo && <p className="ley" style={{ fontSize: 13 }}>recién llegás: tu reputación arranca en neutro y se arma partido a partido.</p>}
      {p.calif && <p className="cd ley ink" style={{ fontSize: 13, padding: '12px 14px' }}>{p.calif.txt}</p>}
      <section className="cd col g14" style={{ padding: 18 }} aria-label="cómo funciona la reputación">
        <h2 className="sec">cómo funciona la reputación</h2>
        {[
          'se arma con tu asistencia y con cómo te califican tus compañeros: puntualidad y actitud, nunca habilidad.',
          'las calificaciones pierden peso a los 12 meses. nadie carga con un mal día para siempre.',
          'si sos nuevo, arrancás en neutro. y si te sancionan, podés apelar.',
        ].map((txt, i) => (
          <div key={i} className="wrap g12" style={{ flexWrap: 'nowrap' }}>
            <span className="idx" style={{ flex: 'none' }}>// 0{i + 1}</span>
            <p className="ley ink" style={{ fontSize: 13 }}>{txt}</p>
          </div>
        ))}
        <button className="lnk" style={{ alignSelf: 'flex-start' }} onClick={p.reportarCalif}>reportar una calificación injusta</button>
      </section>
      <section className="col" aria-label="historial">
        <h2 className="sec" style={{ paddingBottom: 8 }}>historial</h2>
        {p.historial.map((h, i) => (
          <div key={i} className="ln rb" style={{ minHeight: 56, padding: '8px 0' }}>
            <div className="col g2 min0"><span className="bx" style={{ fontSize: 14 }}>{h.fecha}</span><span className="idx">{h.lugar}</span></div>
            <span className={'pl ' + h.cls} style={{ alignSelf: 'center' }}>{h.res}</span>
          </div>
        ))}
        {p.historial.length === 0 && <p className="ley">tu historial está más limpio que botín nuevo. el primer partido lo estrena.</p>}
      </section>
      <div className="col g10">
        <button className="btn s" onClick={p.editar}>editar perfil</button>
        <button className="btn s" onClick={p.privacidad}>configuración y privacidad</button>
      </div>
    </div>
  );
}

export function EditarPerfil({ vm, app }) {
  const e = vm.ed;
  return (
    <div className="col g22 pad">
      <BackHeader app={app} label="// editar perfil" />
      <h1 className="dk" style={{ fontSize: 46 }}>TU PERFIL</h1>
      <div className="wrap g16" style={{ alignItems: 'center', flexWrap: 'nowrap' }}>
        <Avatar foto={e.foto} ini={e.ini} size={84} ring={!!e.foto} />
        <div className="col g8" style={{ flex: 1 }}>
          <label className="upload" style={{ minHeight: 60 }}>
            <input type="file" accept="image/*" onChange={e.setFoto} aria-label="subir foto de perfil" />
            <span className="bx" style={{ fontSize: 14 }}>{e.foto ? 'cambiar foto' : 'subir foto'}</span>
          </label>
          {e.foto && <button className="lnk ink" style={{ alignSelf: 'flex-start' }} onClick={e.quitarFoto}>sacar foto</button>}
        </div>
      </div>
      <Field id="ed-alias" label="alias"><input id="ed-alias" className="inp" value={e.alias} onChange={e.setAlias} /></Field>
      <div><span className="lbl">posición preferida <span className="ley" style={{ fontSize: 12 }}>(opcional)</span></span><div className="wrap"><Chips items={e.pos} /></div></div>
      <div><span className="lbl">nivel <span className="ley" style={{ fontSize: 12 }}>(opcional)</span></span><div className="wrap"><Chips items={e.nivel} /></div></div>
      <div><span className="lbl">zona</span><div className="wrap"><Chips items={e.zona} /></div></div>
      <button className="btn" disabled={e.alias.trim().length < 2} onClick={e.listo}>guardar</button>
    </div>
  );
}

function Accion({ label, sub, onClick }) {
  return (
    <button className="ln rb" style={{ appearance: 'none', background: 'none', border: 0, borderTop: '1px solid var(--line)', color: 'var(--ink)', padding: '14px 0', textAlign: 'left', cursor: 'pointer', width: '100%' }} onClick={onClick}>
      <span className="col g2"><span className="bx" style={{ fontSize: 15 }}>{label}</span>{sub && <span className="ley" style={{ fontSize: 12 }}>{sub}</span>}</span>
      <Icon name="next" size={18} />
    </button>
  );
}

export function Privacidad({ vm, app }) {
  const v = vm.pv;
  return (
    <div className="col g20 pad">
      <BackHeader app={app} label="// configuración > privacidad" />
      <h1 className="dk" style={{ fontSize: 46 }}>PRIVACIDAD</h1>
      <p className="ley">vos decidís. todo lo que está acá se puede cambiar cuando quieras.</p>
      <section className="col" aria-label="permisos">
        <SwitchRow id="pv-ubic" label="ubicación aproximada" sub="para ver canchas y partidos cerca. sin esto, usamos tu zona." on={v.ubic} onClick={() => v.toggle('ubic')} />
        {!v.ubic && <div className="col g8" style={{ paddingBottom: 12 }}><span className="idx">tu zona</span><div className="wrap"><Chips items={v.zona} /></div></div>}
        <div className="ln" />
        <SwitchRow id="pv-notif" label="notificaciones" sub="avisos de tus partidos y de quién se suma." on={v.notif} onClick={() => v.toggle('notif')} />
        {v.notif && (
          <div className="rb" style={{ paddingBottom: 12 }}>
            <span className="ley ink" style={{ fontSize: 13 }}>máximo por día</span>
            <Stepper value={v.notifMax} onMinus={v.menos} onPlus={v.mas} />
          </div>
        )}
        <div className="ln" />
        <SwitchRow id="pv-publi" label="publicidad de marcas deportivas" sub="siempre marcada como «publicidad». nunca usamos tus datos para venderlos." on={v.publi} onClick={() => v.toggle('publi')} />
      </section>
      <section className="col" aria-label="tus datos">
        <h2 className="sec" style={{ paddingBottom: 6 }}>tus datos</h2>
        <Accion label="ver mis datos" sub="todo lo que guardamos de vos" onClick={v.verDatos} />
        <Accion label="descargar mis datos" sub="te mandamos un archivo a tu mail" onClick={v.descargar} />
        <Accion label="corregir mis datos" onClick={v.corregir} />
        <Accion label="eliminar mi cuenta" sub="se elimina a los 30 días" onClick={v.eliminar} />
      </section>
      <div className="cd col g8" style={{ padding: 16 }}>
        <button className="lnk" style={{ alignSelf: 'flex-start' }} onClick={v.politica}>política de privacidad</button>
        <span className="ley" style={{ fontSize: 13 }}>responsable de privacidad: privacidad@ultimohombre.com.ar</span>
      </div>
      <button className="btn s" onClick={v.cerrar}>cerrar sesión</button>
    </div>
  );
}
