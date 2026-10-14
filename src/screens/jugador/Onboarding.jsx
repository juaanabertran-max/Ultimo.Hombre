import { Isologo, Chips } from '../../components/ui.jsx';

const PASOS = [
  {
    titulo: 'RESERVÁ LA CANCHA',
    texto: 'elegís complejo, día y hora y listo. sin llamar, sin audios, sin “te confirmo en un rato”.',
  },
  {
    titulo: 'COMPLETÁ EL EQUIPO',
    texto: '¿se bajó uno? publicás cuántos faltan y en qué puesto, y se suma gente de la zona. que no te falte uno.',
  },
  {
    titulo: 'PAGÁ SIN JUNTAR EFECTIVO',
    texto: 'cada uno paga su parte con mercado pago desde la app. vos ves quién pagó y quién se hace el distraído.',
  },
];

function Ilustracion({ paso }) {
  if (paso === 0) {
    const slots = [['18 h', 'oc'], ['19 h', ''], ['20 h', 'oc'], ['21 h', 'on'], ['22 h', ''], ['23 h', '']];
    return (
      <div className="col g10" aria-hidden="true" style={{ width: 260 }}>
        <div className="rb"><span className="idx">jue 15 · noche</span><span className="idx">north champ</span></div>
        <div className="grid3">
          {slots.map(([h, c]) => <span key={h} className={'sl ' + c} style={{ minHeight: 64 }}><span className={c === 'on' ? 'bx' : ''}>{h}</span></span>)}
        </div>
        <span className="sec" style={{ textAlign: 'right' }}>reservado.</span>
      </div>
    );
  }
  if (paso === 1) return <Isologo width={210} />;
  return (
    <div className="col g12" aria-hidden="true" style={{ width: 260 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 8 }}>
        {Array.from({ length: 10 }, (_, i) => <span key={i} className={'dot' + (i < 7 ? ' on' : '')} style={{ height: 44 }} />)}
      </div>
      <div className="rb"><span className="sec">7/10 pagaron</span><span className="idx">$6.360 c/u</span></div>
    </div>
  );
}

export function Onboarding({ app }) {
  const paso = app.state.onb;
  const p = PASOS[paso];
  return (
    <div className="col g22 pad" style={{ minHeight: '100%', paddingBottom: 26 }}>
      <div className="hdr rb">
        <span className="idx">// 00{paso + 1} · último hombre</span>
        <button className="ib" onClick={() => app.skipOnb()}><span className="ley">saltar</span></button>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 260 }}>
        <Ilustracion paso={paso} />
      </div>
      <div className="col g14">
        <h1 className="dk" style={{ fontSize: 54 }}>{p.titulo}</h1>
        <p className="ley" style={{ fontSize: 16, lineHeight: '23px' }}>{p.texto}</p>
      </div>
      <div className="grid3" style={{ gap: 6 }} aria-hidden="true">
        {[0, 1, 2].map((i) => <span key={i} className={'dot' + (i <= paso ? ' on' : '')} style={{ height: 4 }} />)}
      </div>
      <button className="btn" onClick={() => app.nextOnb()}>{paso < 2 ? 'siguiente' : 'armar mi ficha'}</button>
    </div>
  );
}

export function Ficha({ vm }) {
  const f = vm.ficha;
  return (
    <div className="col g22 pad">
      <div className="hdr"><span className="idx">// 004 · tu ficha</span></div>
      <div className="col g12">
        <h1 className="dk" style={{ fontSize: 50 }}>ARMÁ TU FICHA</h1>
        <p className="ley">así los organizadores saben a quién suman. tarda menos que un lateral.</p>
      </div>
      <div>
        <label className="lbl" htmlFor="uh-nombre">¿cómo te dicen?</label>
        <input id="uh-nombre" className="inp" value={f.nombre} onChange={f.setNombre} placeholder="tu nombre o apodo" autoComplete="nickname" />
      </div>
      <div><span className="lbl">posición preferida</span><div className="wrap"><Chips items={f.pos} /></div></div>
      <div><span className="lbl">nivel</span><div className="wrap"><Chips items={f.nivel} /></div></div>
      <div><span className="lbl">zona</span><div className="wrap"><Chips items={f.zona} /></div></div>
      <button className="btn" onClick={f.listo}>listo, a jugar</button>
    </div>
  );
}
