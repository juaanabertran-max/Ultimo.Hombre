// Acciones del panel del complejo.
import { key } from './data.js';

export const actionsComplejo = {
  cellSet(val, msg) {
    const c = this.state.cCell, k = key('north', c.k, c.d, c.h), book = { ...this.state.book };
    if (val) book[k] = val; else delete book[k];
    this.setState({ book, cCell: null });
    this.toast(msg);
  },
  noShow(k) {
    const book = { ...this.state.book }, e = { ...book[k] };
    e.noshow = true;
    book[k] = e;
    this.setState({ book });
    this.toast(`no-show marcado. a ${e.org.split(' ')[0]} le baja la asistencia y la próxima vez se ve.`);
  },
};
