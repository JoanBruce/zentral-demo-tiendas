const s={VIEWER:1,COMMENTER:1,EDITOR:2,OWNER:3};function n(e){return s[e]}function t(e,E){return n(e)>=n(E)}const R=e=>t(e,"EDITOR"),c=e=>t(e,"OWNER");export{R as c,c as i};
