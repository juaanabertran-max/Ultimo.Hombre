// Piezas chicas reutilizables: íconos de línea, isologo, marcas de microdesign y controles.

const NAV_PATHS = {
  home: 'M4 11l8-7 8 7v9h-5v-6h-6v6H4z',
  search: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5L20 20',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c1-4 4-6 8-6s7 2 8 6',
  bars: 'M5 20v-9M12 20V4M19 20v-6',
  grid: 'M4 4h16v16H4zM4 9.3h16M4 14.6h16M9.3 4v16M14.6 4v16',
  list: 'M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01',
  card: 'M3 7h18v12H3zM3 11h18M15 15h3',
  building: 'M4 21V9l8-5 8 5v12M9 21v-6h6v6',
};

export function NavIcon({ name }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={NAV_PATHS[name]} />
    </svg>
  );
}

export function Icon({ name, size = 24, color = 'currentColor', width = 1.8 }) {
  const p = {
    back: <path d="M15 5l-7 7 7 7" />,
    next: <path d="M9 5l7 7-7 7" />,
    close: <path d="M6 6l12 12M18 6L6 18" />,
    minus: <path d="M5 12h14" />,
    plus: <path d="M5 12h14M12 5v14" />,
    field: <><path d="M3 5h18v14H3zM12 5v14M3 9.5h3v5H3M21 9.5h-3v5h3" /><circle cx="12" cy="12" r="2.2" /></>,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.5" /><path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4" /></>,
    calendar: <path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" />,
  }[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p}</svg>
  );
}

/** Microdesign: triángulo, anillos, mira, barras diagonales, vacío. */
export function Micro({ name, size = 16, color = '#e9f0ff', width = 1.4, style }) {
  const p = {
    triangulo: <path d="M9 2l7 13H2z" />,
    alerta: <><path d="M9 2l7 13H2z" /><path d="M9 7v3.5M9 12.5v.5" /></>,
    anillos: <><circle cx="9" cy="9" r="7" /><circle cx="9" cy="9" r="3.5" /></>,
    mira: <><circle cx="9" cy="9" r="5.5" /><path d="M9 1v5M9 12v5M1 9h5M12 9h5" /></>,
    vacio: <><circle cx="9" cy="9" r="7" /><path d="M4 14L14 4" /></>,
    ciclo: <circle cx="9" cy="9" r="7" strokeDasharray="4 3" />,
  }[name];
  return <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke={color} strokeWidth={width} style={style} aria-hidden="true">{p}</svg>;
}

export function Marks() {
  return (
    <div className="wrap g10" aria-hidden="true" style={{ flexWrap: 'nowrap' }}>
      <Micro name="triangulo" /><Micro name="anillos" /><Micro name="mira" />
    </div>
  );
}

export function Barras() {
  return (
    <svg width="62" height="14" viewBox="0 0 62 14" fill="none" stroke="#e9f0ff" strokeWidth="1" aria-hidden="true">
      <path d="M0 14L5 0M7 14L12 0M14 14L19 0M21 14L26 0M28 14L33 0M35 14L40 0M42 14L47 0M49 14L54 0M56 14L61 0" />
    </svg>
  );
}

const ISO = [[20, 14], [50, 10], [80, 14], [26, 44], [50, 48], [74, 44], [12, 76], [37, 80], [63, 80], [88, 76], [50, 108]];

/** Isologo: once puntos en 4-3-3, el último hombre rodeado por el anillo lima. */
export function Isologo({ width = 210, mini = false }) {
  const r = mini ? 6 : 3.4;
  return (
    <svg width={width} height={width * 1.2} viewBox="0 0 100 120" role={mini ? undefined : 'img'} aria-hidden={mini ? 'true' : undefined} aria-label={mini ? undefined : 'formación 4-3-3 con el último hombre resaltado'}>
      <g fill="#e9f0ff">{ISO.map(([x, y]) => <circle key={x + '-' + y} cx={x} cy={y} r={r} />)}</g>
      <circle cx="63" cy="80" r={mini ? 14 : 8.5} fill="none" stroke="#bce04b" strokeWidth={mini ? 5 : 1.8} />
    </svg>
  );
}

export function Grain() {
  return (
    <svg className="grain" aria-hidden="true">
      <filter id="uh-grano">
        <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#uh-grano)" />
    </svg>
  );
}

export function BackHeader({ app, label }) {
  return (
    <div className="hdr back">
      <button className="ib" aria-label="volver" onClick={() => app.back()}><Icon name="back" /></button>
      <span className="idx">{label}</span>
    </div>
  );
}

export function Dots({ dots, thin }) {
  return (
    <div className={'dots' + (thin ? ' thin' : '')} aria-hidden="true" style={{ gridTemplateColumns: `repeat(${dots.length}, minmax(0, 1fr))` }}>
      {dots.map((c, i) => <span key={i} className={'dot ' + c} />)}
    </div>
  );
}

export function Chips({ items, grow }) {
  return items.map((c) => (
    <button key={c.label} className={'ch' + (c.on ? ' on' : '') + (grow ? ' grow' : '')} aria-pressed={c.on} onClick={c.pick}>{c.label}</button>
  ));
}

export function Stepper({ value, onMinus, onPlus, big }) {
  return (
    <div className="stepper">
      <button className="ib" aria-label="uno menos" onClick={onMinus}><Icon name="minus" size={18} width={2} /></button>
      <span className={big ? 'dk' : 'bx'} style={{ minWidth: big ? 48 : 56, textAlign: 'center', fontSize: big ? 28 : 17 }} aria-live="polite">{value}</span>
      <button className="ib" aria-label="uno más" onClick={onPlus}><Icon name="plus" size={18} width={2} /></button>
    </div>
  );
}

export function Seg({ options, value, onChange, label }) {
  return (
    <div className="sg" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.id} className={value === o.id ? 'on' : ''} aria-pressed={value === o.id} onClick={() => onChange(o.id)}>{o.label}</button>
      ))}
    </div>
  );
}
