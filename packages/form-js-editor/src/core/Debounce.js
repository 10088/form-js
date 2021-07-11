import { debounce } from 'min-dash';

/**
 * A factory to create a configurable debouncer.
 *
 * @param {number|boolean} config
 */
export default function DebounceFactory(config) {

  const timeout = typeof config === 'number' ? config : !config ? 0 : 300;

  if (timeout) {
    return fn => debounce(fn, timeout);
  } else {
    return fn => fn;
  }
}

DebounceFactory.$inject = [ 'config.debounce' ];