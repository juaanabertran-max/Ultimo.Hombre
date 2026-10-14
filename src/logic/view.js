// Arma, a partir del estado de la app, todo lo que necesita cada pantalla:
// textos calculados, listas y acciones. Las pantallas sólo dibujan.
import {
  DAYS, HOURS, FRANJAS, CX, CX_ORDER, POS, PLURAL, NIVELES,
  money, key, cancha, basePrice, promoOn, price, fee, cupo, share, joinY,
} from './data.js';

export function matchView(app, m) {
  const cp = cupo(m.tipo);
  const n = m.jug.length;
  const faltan = Math.max(0, cp - n);
  const pubOn = !!(m.pub && m.pub.faltan > 0);
  const dots = [];
  for (let i = 0; i < cp; i++) dots.push(i < n ? (m.jug[i].nuevo && !m.jug[i].yo ? 'nw' : 'on') : '');
  const pos = m.pub ? m.pub.pos : [];
  const cuando = app.cuando(m);
  return {
    id: m.id, cuando, cuandoUp: cuando.toUpperCase(),
    donde: `${CX[m.cx].nombre} · cancha ${m.k} · fútbol ${m.tipo}`,
    cupo: cp, n, conf: `${n}/${cp}`, faltan, dots,
    faltaGente: faltan > 0, completo: faltan === 0,
    faltanUp: faltan === 1 ? 'FALTA 1' : `FALTAN ${faltan}`,
    faltanTxt: faltan === 1 ? 'falta 1' : `faltan ${faltan}`,
    pregunta: faltan === 1 ? '¿te falta 1? tranqui, lo conseguimos.' : `¿te faltan ${faltan}? tranqui, los conseguimos.`,
    cta: faltan === 1 ? 'publicar el lugar' : `publicar los ${faltan} lugares`,
    showPublicar: m.rol === 'org' && faltan > 0 && !pubOn,
    publicado: pubOn,
    pubTxt: pubOn ? `publicado · ${m.pub.faltan === 1 ? 'buscando 1: ' : `buscando ${m.pub.faltan}: `}${pos.join(' o ')} · nivel ${m.pub.nivel}` : '',
    rol: m.rol === 'org' ? 'organizás' : m.torneo ? 'refuerzo' : 'jugás',
    rolCls: m.rol === 'org' ? 'f' : 'l',
    esTorneo: !!m.torneo,
    torneoTxt: m.torneo ? `torneo · ${m.torneo.nombre}${m.torneo.fecha ? ' · ' + m.torneo.fecha : ''}` : '',
    hi: m.rol === 'org' && faltan > 0,
    publicar: () => app.openPublicar(m.id),
    ver: () => app.openMatch(m.id),
  };
}

export function buildView(app) {
  const S = app.state;
  const J = S.side === 'jugador';
  const yo = S.perfil.nombre || 'Facu';
  const chips = (opts, cur, fn) => opts.map((o) => ({ label: o, on: cur === o, pick: () => fn(o) }));
  const sorted = S.matches.slice().sort((a, b) => a.d - b.d || a.h - b.h);
  const t = S.fTipo;
  const d = S.fDia;
  const fr = FRANJAS.find((f) => f.id === S.fFranja);

  // ---------- ficha
  const ficha = {
    nombre: S.perfil.nombre,
    setNombre: (e) => app.setPerfil({ nombre: e.target.value }),
    pos: chips(POS, S.perfil.pos, (o) => app.setPerfil({ pos: o })),
    nivel: chips(NIVELES, S.perfil.nivel, (o) => app.setPerfil({ nivel: o })),
    zona: chips(['San Isidro', 'Vicente López', 'San Fernando', 'Tigre'], S.perfil.zona, (o) => app.setPerfil({ zona: o })),
    listo: () => { app.setState({ screen: 'home', hist: [] }); app.toast('ficha lista. a jugar.'); },
  };

  // ---------- feed (se usa en home, buscar y sumarme)
  const feedView = (f) => {
    const cx = CX[f.cx];
    const sh = share(basePrice(f.tipo, f.h) * 1.06, f.tipo);
    const cuando = `${DAYS[f.d].largo} · ${f.h} h`;
    return {
      id: f.id,
      busca: f.lugares > 0 ? `busca ${f.lugares} ${f.lugares === 1 ? f.pos : PLURAL[f.pos]}` : 'equipo completo',
      cuando, cuandoUp: cuando.toUpperCase(),
      donde: `${cx.nombre} · ${cx.km} · fútbol ${f.tipo}`,
      share: money(sh), org: f.org, nivel: f.nivel,
      esTorneo: !!f.torneo, torneoTxt: f.torneo ? `torneo · ${f.torneo.nombre} · ${f.torneo.fecha}` : '',
      msg: f.msg, hasMsg: !!f.msg, hi: !!f.torneo,
      can: f.lugares > 0 && !f.joined, joined: !!f.joined, lleno: f.lugares === 0 && !f.joined,
      sumarme: () => app.openSumarme(f.id),
    };
  };

  // ---------- home
  const pm = sorted[0];
  const home = {
    nombreUp: yo.toUpperCase(),
    prox: pm ? matchView(app, pm) : null,
    cerca: S.feed.filter((f) => f.lugares > 0 && !f.joined).slice(0, 2).map(feedView),
    reservar: () => app.go('complejos'),
    buscar: () => app.tab('feed'),
    mis: () => app.tab('misPartidos'),
  };

  // ---------- reservar
  const setF = (p) => app.setState({ sel: null, ...p });
  const libresDe = (id) => {
    let n = 0;
    CX[id].canchas.forEach((c) => {
      if (c.tipo !== t) return;
      for (let h = fr.from; h <= fr.to; h++) if (!S.book[key(id, c.k, d, h)] && !(d === 0 && h <= 14)) n++;
    });
    return n;
  };
  const lista = CX_ORDER.map((id) => {
    const cx = CX[id];
    const lib = libresDe(id);
    return {
      id, nombre: cx.nombre, km: cx.km, libres: lib,
      libresTxt: lib === 0 ? 'sin turnos libres' : `${lib} ${lib === 1 ? 'turno libre' : 'turnos libres'}`,
      libresCls: lib ? 'l' : 'm',
      promo: promoOn(S.promo, id, d, 10),
      precioTxt: `de día ${money(price(S.promo, id, t, d, 10))} · de noche ${money(basePrice(t, 20))}`,
      open: () => app.openCx(id),
    };
  });
  const res = {
    t, setTipo: (x) => setF({ fTipo: x }),
    dias: DAYS.map((x) => ({ label: x.chip, on: x.d === d, pick: () => setF({ fDia: x.d }) })),
    franjas: FRANJAS.map((f) => ({ label: f.label, on: f.id === S.fFranja, pick: () => setF({ fFranja: f.id }) })),
    titulo: `cerca tuyo · ${DAYS[d].corto} · ${fr.label} · fútbol ${t}`,
    lista, vacio: lista.every((x) => x.libres === 0),
  };

  // ---------- detalle de complejo
  let cxd = null;
  if (S.selCx) {
    const cxo = CX[S.selCx];
    cxd = {
      nombre: cxo.nombre, nombreUp: cxo.nombre.toUpperCase(), km: cxo.km,
      dia: money(price(S.promo, S.selCx, t, d, 10)), noche: money(basePrice(t, 20)),
      promo: promoOn(S.promo, S.selCx, d, 10),
      canchas: cxo.canchas.filter((c) => c.tipo === t).map((c) => {
        const slots = [];
        for (let h = fr.from; h <= fr.to; h++) {
          const oc = !!S.book[key(S.selCx, c.k, d, h)] || (d === 0 && h <= 14);
          const on = !!(S.sel && S.sel.k === c.k && S.sel.h === h);
          slots.push({
            h, oc, on,
            sub: oc ? 'ocupado' : money(price(S.promo, S.selCx, t, d, h)),
            aria: `cancha ${c.k}, ${h} h, ${oc ? 'ocupado' : 'libre'}`,
            pick: () => { if (!oc) app.setState({ sel: { k: c.k, h } }); },
          });
        }
        return { k: c.k, titulo: `cancha ${c.k} · fútbol ${c.tipo}`, slots };
      }),
      sel: S.sel ? {
        txt: `${DAYS[d].corto} · ${S.sel.h} h · cancha ${S.sel.k}`,
        precio: money(price(S.promo, S.selCx, t, d, S.sel.h)),
        reservar: () => app.go('checkout'),
      } : null,
    };
  }

  // ---------- checkout
  let co = null;
  if (S.selCx && S.sel) {
    const p = price(S.promo, S.selCx, t, d, S.sel.h);
    const f = fee(p);
    const total = p + f;
    const cp = cupo(t);
    const sh = share(total, t);
    co = {
      cuando: `${DAYS[d].largo} · ${S.sel.h} h`,
      donde: `${CX[S.selCx].nombre} · cancha ${S.sel.k} · fútbol ${t}`,
      precio: money(p), fee: money(f), total: money(total),
      nYa: Math.min(S.nYa, cp), cupo: cp, split: S.split,
      splitTxt: S.split
        ? `cada uno paga ${money(sh)} desde la app. vos pagás tu parte ahora y ves quién pagó y quién no.`
        : 'pagás el turno completo y después arreglás con los chicos. o activalo y no perseguís a nadie.',
      ahora: money(S.split ? sh : total),
      menos: () => app.setState({ nYa: Math.max(1, Math.min(app.state.nYa, cp) - 1) }),
      mas: () => app.setState({ nYa: Math.min(cp, app.state.nYa + 1) }),
      toggleSplit: () => app.setState({ split: !app.state.split }),
      pagar: () => app.openPay('reserva'),
    };
  }

  // ---------- confirmación
  const cm0 = S.lastMatch ? app.match(S.lastMatch) : null;
  const cf = cm0 ? {
    ...matchView(app, cm0),
    agenda: `ya figura en la agenda de ${CX[cm0.cx].nombre}.`,
    pagado: cm0.split
      ? `pagaste tu parte: ${money(cm0.pagado)}. el resto paga desde la app.`
      : `pagaste el turno completo: ${money(cm0.pagado)}.`,
    mis: () => app.tab('misPartidos'),
  } : null;

  // ---------- publicar lugares
  let pb = null;
  const pbm = S.pubFor ? app.match(S.pubFor) : null;
  if (pbm) {
    const pc = cupo(pbm.tipo);
    const maxF = Math.max(1, pc - pbm.jug.length);
    pb = {
      ref: `${app.cuando(pbm)} · ${CX[pbm.cx].nombre} · ${pbm.jug.length}/${pc} confirmados`,
      faltan: S.pf.faltan,
      menos: () => app.setPf({ faltan: Math.max(1, app.state.pf.faltan - 1) }),
      mas: () => app.setPf({ faltan: Math.min(maxF, app.state.pf.faltan + 1) }),
      pos: POS.concat(['da igual']).map((p) => ({ label: p, on: !!S.pf.pos[p], pick: () => app.togglePos(p) })),
      nivel: chips(NIVELES, S.pf.nivel, (o) => app.setPf({ nivel: o })),
      tipo: S.pf.tipo, setTipo: (x) => app.setPf({ tipo: x }),
      esTorneo: S.pf.tipo === 'torneo', tNombre: S.pf.torneo, tFecha: S.pf.fecha, msg: S.pf.msg,
      setTNombre: (e) => app.setPf({ torneo: e.target.value }),
      setTFecha: (e) => app.setPf({ fecha: e.target.value }),
      setMsg: (e) => app.setPf({ msg: e.target.value }),
      share: money(share(pbm.total, pbm.tipo)),
      cta: S.pf.faltan === 1 ? 'publicar el lugar' : `publicar los ${S.pf.faltan} lugares`,
      bloq: S.pf.tipo === 'torneo' && !S.pf.torneo.trim(),
      publicar: () => app.publicar(),
    };
  }

  // ---------- buscar / sumarme
  const fd = {
    soloTorneos: S.soloTorneos,
    setSolo: (x) => app.setState({ soloTorneos: x }),
    items: S.feed.filter((f) => !S.soloTorneos || f.torneo).map(feedView),
  };
  const sf = S.feed.find((x) => x.id === S.sumFeed);
  const sm = sf ? {
    ...feedView(sf),
    vasComo: S.perfil.pos, otraPos: sf.pos !== S.perfil.pos,
    otraTxt: `buscan ${sf.pos}. si te la bancás en ese puesto, adelante.`,
    asis: app.asis() + '%', pagar: () => app.openPay('sumarme'),
  } : null;

  // ---------- mis partidos / detalle
  const mp = {
    items: sorted.map((m) => matchView(app, m)),
    reservar: () => app.go('complejos'),
    buscar: () => app.tab('feed'),
  };
  const pdm = app.match(S.selMatch);
  let pd = null;
  if (pdm) {
    const deben = pdm.jug.filter((j) => j.est === 'pendiente').map((j) => j.n);
    const pagaron = pdm.jug.filter((j) => j.est === 'pagó').length;
    pd = {
      ...matchView(app, pdm),
      esOrg: pdm.rol === 'org',
      pagosTxt: `pagaron ${pagaron} de ${pdm.jug.length}`,
      hayDeben: pdm.rol === 'org' && deben.length > 0,
      debenTxt: `deben su parte: ${joinY(deben)}.`,
      recordar: () => app.recordar(deben),
      jug: pdm.jug.map((j, i) => ({
        id: i,
        nombre: j.yo ? `${j.n} (vos)` : j.n,
        pos: j.pos + (j.nuevo && !j.yo ? ' · se sumó recién' : ''),
        ini: j.n.charAt(0).toUpperCase(),
        est: j.est === 'pendiente' ? 'pago pendiente' : j.est,
        estCls: j.est === 'pagó' ? 'f' : j.est === 'confirmado' ? 'l' : 'm',
        nuevo: !!j.nuevo,
      })),
      noPuedo: () => app.setState({ modal: 'baja' }),
    };
  }
  const mb = J && S.modal === 'baja' && pdm ? {
    asis: app.asis() + '%', post: app.asis(1) + '%', esOrg: pdm.rol === 'org',
    quedo: () => app.setState({ modal: null }), bajo: () => app.confirmBaja(),
  } : null;

  // ---------- perfil
  const pp = {
    ini: yo.charAt(0).toUpperCase(), nombreUp: yo.toUpperCase(),
    sub: `${S.perfil.pos} · ${S.perfil.zona.toLowerCase()} · nivel ${S.perfil.nivel}`,
    asis: app.asis() + '%', jugados: String(S.jugados), pos: S.perfil.pos,
    historial: S.historial, editar: () => app.go('perfilRapido'),
  };

  // ---------- lado complejo (North Champ)
  const N = 'north';
  const nc = CX.north.canchas;
  let tot = 0, occ = 0, hoyApp = 0, hoyMan = 0, muertas = 0;
  const bars = [];
  const heat = FRANJAS.map((f) => ({ label: f.label, cells: [] }));
  for (let dd = 0; dd < 7; dd++) {
    let dT = 0, dO = 0;
    FRANJAS.forEach((f, fi) => {
      let fT = 0, fO = 0;
      for (let h = f.from; h <= f.to; h++) {
        nc.forEach((c) => {
          const e = S.book[key(N, c.k, dd, h)];
          if (e && e.estado === 'bloqueado') return;
          fT++; dT++;
          if (e) {
            fO++; dO++;
            if (dd === 0) { if (e.estado === 'app') hoyApp++; else hoyMan++; }
          }
        });
      }
      const pct = fT ? Math.round((fO / fT) * 100) : 0;
      const muerta = f.id !== 'noche' && dd !== 3 && dd !== 4 && pct < 40;
      if (muerta) muertas++;
      heat[fi].cells.push({ pct, muerta });
    });
    tot += dT; occ += dO;
    bars.push({ dia: DAYS[dd].dia, pct: dT ? Math.round((dO / dT) * 100) : 0, hoy: dd === 0 });
  }
  let extraN = 0, extra = 0;
  const nuevas = [];
  Object.keys(S.book).forEach((k) => {
    const e = S.book[k];
    const p = k.split('|');
    if (!e.nueva || p[0] !== N) return;
    const c = cancha(N, +p[1]);
    nuevas.push({ k, txt: `${DAYS[+p[2]].corto} · ${p[3]} h · cancha ${p[1]}`, org: e.org || 'bloqueo', est: e.estado, estCls: e.estado === 'app' ? 'f' : 'm' });
    if (e.estado === 'app') { extraN++; extra += price(S.promo, N, c.tipo, +p[2], +p[3]); }
  });
  const turnos = 186 + extraN;
  const bruto = 10380000 + extra;
  const dash = {
    ocup: Math.round((occ / tot) * 100) + '%',
    hoy: String(hoyApp + hoyMan), hoyTxt: `${hoyApp} por app · ${hoyMan} manuales`,
    cobros: money(bruto), cobrosTxt: `${turnos} turnos cobrados por app`,
    bars, heat, dias: DAYS.map((x) => x.dia),
    muertasTxt: `${muertas} franjas por debajo del 40%`, promo: S.promo,
    promocionar: () => { app.setState({ promo: true }); app.toast('listo: -20% de lunes a viernes, de 10 a 18 h. ya lo ven los jugadores.'); },
    pausar: () => { app.setState({ promo: false }); app.toast('promo pausada.'); },
    nuevas,
  };

  const ag = {
    dias: DAYS.map((x) => ({ label: x.chip, on: x.d === S.cDay, pick: () => app.setState({ cDay: x.d }) })),
    canchas: nc.map((c) => ({ t: `cancha ${c.k}`, s: `fútbol ${c.tipo}` })),
    rows: HOURS.map((h) => ({
      h,
      cells: nc.map((c) => {
        const e = S.book[key(N, c.k, S.cDay, h)];
        const est = e ? e.estado : 'libre';
        const txt = est === 'libre' ? 'libre' : est === 'bloqueado' ? 'bloq.' : e.org.split(' ')[0];
        const lab = est === 'app' ? 'reservado por app' : est === 'manual' ? 'reservado manual' : est;
        return {
          k: c.k, cls: est + (e && e.nueva ? ' nueva' : ''), txt,
          aria: `cancha ${c.k}, ${h} h: ${lab}`,
          pick: () => app.setState({ cCell: { k: c.k, h, d: S.cDay }, mNombre: '' }),
        };
      }),
    })),
  };

  let ce = null;
  if (!J && S.cCell) {
    const cc = S.cCell;
    const e0 = S.book[key(N, cc.k, cc.d, cc.h)];
    const cca = cancha(N, cc.k);
    const est0 = e0 ? e0.estado : 'libre';
    ce = {
      titulo: `cancha ${cc.k} · fútbol ${cca.tipo} · ${DAYS[cc.d].corto} · ${cc.h} h`,
      est: est0,
      org: e0 ? e0.org : '', asis: e0 && e0.asis ? e0.asis + '%' : 'sin datos', tel: e0 && e0.tel ? e0.tel : '',
      jug: e0 && e0.jug ? `${e0.jug} jugadores` : '', pago: e0 ? e0.pago : '', motivo: e0 ? e0.motivo : '',
      precio: money(price(S.promo, N, cca.tipo, cc.d, cc.h)),
      mNombre: S.mNombre, setMNombre: (ev) => app.setState({ mNombre: ev.target.value }),
      cerrar: () => app.setState({ cCell: null }),
      cargar: () => app.cellSet({ estado: 'manual', org: app.state.mNombre.trim() || 'reserva manual', asis: 0, tel: '', jug: cupo(cca.tipo), pago: 'a cobrar en el complejo', nueva: true }, 'reserva cargada. ya no aparece libre en la app.'),
      bloquear: () => app.cellSet({ estado: 'bloqueado', motivo: 'bloqueado por el complejo', nueva: true }, 'horario bloqueado. no aparece en la app.'),
      liberar: () => app.cellSet(null, 'horario liberado. ya aparece en la app.'),
    };
  }

  const rsItems = [];
  HOURS.forEach((h) => {
    nc.forEach((c) => {
      const k = key(N, c.k, S.cResDay, h);
      const e = S.book[k];
      if (!e || e.estado === 'bloqueado') return;
      const past = S.cResDay === 0 && h <= 13;
      rsItems.push({
        k, hora: `${h} h · cancha ${c.k} · fútbol ${c.tipo}`,
        est: e.estado === 'app' ? 'app' : 'manual', estCls: e.estado === 'app' ? 'f' : 'm',
        org: e.org, det: `${e.jug} jugadores${e.tel ? ' · ' + e.tel : ''}`,
        asis: e.asis ? e.asis + '%' : 'sin datos', pago: e.pago,
        canNoShow: past && !e.noshow, noshow: !!e.noshow, noShow: () => app.noShow(k),
      });
    });
  });
  const rs = {
    dias: DAYS.map((x) => ({ label: x.chip, on: x.d === S.cResDay, pick: () => app.setState({ cResDay: x.d }) })),
    items: rsItems, count: `${rsItems.length} reservas · ${DAYS[S.cResDay].largo}`,
  };

  // Comisión: 4% + IVA. Complejo pionero: 0% meses 1-3, 2% meses 4-6, 4% desde el mes 7.
  const rate = S.mes <= 3 ? 0 : S.mes <= 6 ? 0.02 : 0.04;
  const comStd = Math.round(bruto * 0.04);
  const comAct = Math.round(bruto * rate);
  const bonif = comStd - comAct;
  const iva = Math.round(comAct * 0.21);
  const lineas = [
    { l: `turnos cobrados por la app (${turnos})`, v: money(bruto) },
    { l: 'comisión último hombre 4%', v: '−' + money(comStd) },
  ];
  if (bonif > 0) lineas.push({ l: `bonificación complejo pionero (${rate * 100}% este mes)`, v: '+' + money(bonif), lime: true });
  lineas.push({ l: 'iva 21% sobre la comisión', v: iva ? '−' + money(iva) : money(0) });
  const cob = {
    mes: S.mes, lineas, neto: money(bruto - comAct - iva),
    tramos: [
      { l: 'meses 1 a 3', r: '0%', on: S.mes <= 3 },
      { l: 'meses 4 a 6', r: '2%', on: S.mes > 3 && S.mes <= 6 },
      { l: 'desde el mes 7', r: '4%', on: S.mes > 6 },
    ],
    meses: [2, 5, 7].map((m) => ({ label: m === 2 ? 'mes 2 · hoy' : `mes ${m}`, on: S.mes === m, pick: () => app.setState({ mes: m }) })),
  };

  const cp = {
    precios: [5, 7].map((tp) => ({ t: `fútbol ${tp}`, dia: money(basePrice(tp, 10)), noche: money(basePrice(tp, 20)) })),
    promo: S.promo, promoDia5: money(basePrice(5, 10) * 0.8), promoDia7: money(basePrice(7, 10) * 0.8),
  };

  // ---------- avisos
  const pay = J && S.pay ? {
    concepto: S.pay.concepto, monto: money(S.pay.monto), proc: S.pay.step === 'proc',
    go: () => app.payGo(),
    close: () => { if (app.state.pay && app.state.pay.step === 'idle') app.setState({ pay: null }); },
  } : null;
  const notif = J && S.notif ? {
    ...S.notif,
    ver: () => app.setState({ notif: null, selMatch: S.notif.id, screen: 'partido', hist: ['misPartidos'] }),
  } : null;

  return { J, ficha, home, res, cxd, co, cf, pb, fd, sm, mp, pd, mb, pp, dash, ag, ce, rs, cob, cp, pay, notif };
}
