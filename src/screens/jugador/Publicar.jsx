import { BackHeader, Stepper, Chips, Seg } from '../../components/ui.jsx';

export default function Publicar({ vm, app }) {
  const p = vm.pb;
  if (!p) return null;
  return (
    <div className="col g22 pad">
      <BackHeader app={app} label="// publicar lugares" />
      <div className="col g10">
        <h1 className="dk" style={{ fontSize: 50 }}>COMPLETÁ EL EQUIPO</h1>
        <p className="ley">{p.ref}</p>
      </div>
      <div className="rb">
        <span className="bx" style={{ fontSize: 15 }}>¿cuántos faltan?</span>
        <Stepper value={p.faltan} onMinus={p.menos} onPlus={p.mas} big />
      </div>
      <div><span className="lbl">¿en qué puesto?</span><div className="wrap"><Chips items={p.pos} /></div></div>
      <div><span className="lbl">nivel que buscás</span><div className="wrap"><Chips items={p.nivel} /></div></div>
      <div>
        <span className="lbl">categoría del partido</span>
        <div className="wrap"><Chips items={p.cat} /></div>
        <p className="ley" style={{ fontSize: 12, marginTop: 8 }}>es una categoría del partido, no un dato de quien se suma.</p>
      </div>
      <div>
        <span className="lbl">tipo de partido</span>
        <Seg label="tipo de partido" value={p.tipo} onChange={p.setTipo} options={[{ id: 'propio', label: 'partido propio' }, { id: 'torneo', label: 'refuerzo torneo' }]} />
      </div>
      {p.esTorneo && (
        <div className="cd hi col g14" style={{ padding: 16 }}>
          <p className="ley" style={{ fontSize: 13 }}>buscás un reemplazo puntual para una fecha. el refuerzo juega esa fecha y listo.</p>
          <div>
            <label className="lbl" htmlFor="uh-torneo">nombre del torneo</label>
            <input id="uh-torneo" className="inp" value={p.tNombre} onChange={p.setTNombre} placeholder="ej: liga zona norte" />
          </div>
          <div>
            <label className="lbl" htmlFor="uh-fecha">fecha</label>
            <input id="uh-fecha" className="inp" value={p.tFecha} onChange={p.setTFecha} placeholder="ej: fecha 6" />
          </div>
        </div>
      )}
      <div>
        <label className="lbl" htmlFor="uh-msg">mensaje <span className="ley" style={{ fontSize: 12 }}>(opcional)</span></label>
        <textarea id="uh-msg" className="inp" rows={3} value={p.msg} onChange={p.setMsg} placeholder="ej: somos de toque. no vengas a gambetear a los once." />
      </div>
      <div>
        <span className="lbl">cuando alguien se suma</span>
        <Seg label="cuando alguien se suma" value={p.revisar} onChange={p.setRevisar} options={[{ id: true, label: 'revisar a cada uno' }, { id: false, label: 'aceptar automático' }]} />
        <p className="ley" style={{ fontSize: 12, marginTop: 8 }}>{p.revisar ? 'ves alias, posición, nivel y reputación, y decidís. la foto y el teléfono aparecen cuando lo confirmás.' : 'quien se suma queda confirmado al toque.'}</p>
      </div>
      <div className="cd rb" style={{ padding: '14px 16px' }}>
        <span className="ley" style={{ fontSize: 13 }}>cada uno que se sume paga su parte desde la app</span>
        <span className="ds n" style={{ fontSize: 20, flex: 'none' }}>{p.share}</span>
      </div>
      <button className="btn" disabled={p.bloq} onClick={p.publicar}>{p.cta}</button>
      {p.bloq && <p className="idx center">poné el nombre del torneo para publicar.</p>}
    </div>
  );
}
