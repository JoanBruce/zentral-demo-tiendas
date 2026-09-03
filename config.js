// Dev placeholder: in development (vite) there is no container to generate the
// runtime config, so we leave the global empty and env.constants falls back to
// import.meta.env. In production the container OVERWRITES this file with the
// /config.js resolved by envsubst (see docker-entrypoint.sh).
window.__RUNTIME_CONFIG__ = {};
