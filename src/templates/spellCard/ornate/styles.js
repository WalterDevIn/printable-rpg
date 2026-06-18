export const ornateSpellCardStyles = `
.spell {
  --w: 90mm;
  --h: 140mm;
  --sidebar-w: 18mm;
  --border: 3mm;
  --radius: 18px;
  width: var(--w);
  height: var(--h);
  display: flex;
  position: relative;
  overflow: hidden;
  border-radius: 0 var(--radius) var(--radius) 0;
  background: #fff;
  color: var(--secondary);
  font-family: Georgia, "Times New Roman", serif;
}

.spell__sidebar {
  position: relative;
  width: var(--sidebar-w);
  height: 100%;
  flex: 0 0 var(--sidebar-w);
  background: var(--primary);
}

.spell__sidebar-cutout {
  position: absolute;
  top: 3mm;
  right: 0;
  width: 5mm;
  height: calc(100% - 6mm);
  border-radius: 6px 0 0 6px;
  background: #fff;
}

.spell__school {
  position: absolute;
  top: 50mm;
  left: 0;
  width: 10mm;
  height: 40mm;
  display: grid;
  place-items: center;
}

.spell__school-text {
  color: #fff;
  font-family: Arial, sans-serif;
  font-size: 4mm;
  font-weight: 800;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.spell__card {
  width: calc(var(--w) - var(--sidebar-w));
  height: 100%;
  border: var(--border) solid var(--primary);
  border-left: none;
  border-radius: 0 var(--radius) var(--radius) 0;
}

.spell__content {
  width: 70mm;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2mm;
  padding: 5mm 2mm 5mm 0;
}

.spell__title {
  width: 58mm;
  margin: 0 0 1.5mm;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 5mm;
  line-height: 1;
}

.spell__stats {
  display: flex;
  flex-direction: column;
  gap: 2mm;
  font-family: Arial, sans-serif;
  font-size: 3mm;
}

.spell__stats-row {
  display: flex;
  min-height: 6.5mm;
  gap: 2mm;
}

.spell__stat {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1.2mm;
  min-width: 0;
  padding: 1.2mm;
  border-radius: 6px;
  background: var(--primary);
  color: var(--secondary);
}

.spell__stat span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.spell__icon {
  flex: 0 0 auto;
  color: var(--secondary);
  font-size: 3.6mm;
  line-height: 1;
}

.spell__details {
  font-family: Arial, sans-serif;
  font-size: 3mm;
}

.spell__detail {
  display: flex;
  gap: 1.2mm;
  padding: 1.2mm;
  border-radius: 6px;
}

.spell__material-text {
  margin: 0;
  line-height: 1.2;
}

.spell__caption {
  min-height: 0;
  overflow: hidden;
  font-size: 3.15mm;
  line-height: 1.22;
}

.spell__p {
  margin: 0;
}

.spell__tab {
  display: inline-block;
  width: 1em;
  height: 1ch;
}

.spell__floating {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.spell__level,
.spell__pages {
  position: absolute;
  width: 10mm;
  height: 10mm;
  display: grid;
  place-items: center;
  border-radius: 6px;
  background: var(--primary);
  color: var(--secondary);
  font-family: Arial, sans-serif;
}

.spell__level {
  top: 0;
  right: 0;
  font-size: 4.8mm;
  font-weight: 700;
}

.spell__pages {
  right: 0;
  bottom: 0;
  font-size: 3.2mm;
}

.spell__corner {
  position: absolute;
  width: 5mm;
  height: 5mm;
  background: var(--primary);
}

.spell__corner::after {
  position: absolute;
  width: 7mm;
  height: 7mm;
  background: #fff;
  content: "";
}

.spell__corner--a {
  top: 3mm;
  right: 10mm;
}

.spell__corner--a::after {
  top: 0;
  right: 0;
  border-radius: 0 6px 0 0;
}

.spell__corner--b {
  top: 10mm;
  right: 3mm;
}

.spell__corner--b::after {
  top: 0;
  right: 0;
  border-radius: 0 6px 0 0;
}

.spell__corner--c {
  right: 3mm;
  bottom: 10mm;
}

.spell__corner--c::after {
  right: 0;
  bottom: 0;
  border-radius: 0 0 6px 0;
}

.spell__corner--d {
  right: 10mm;
  bottom: 3mm;
}

.spell__corner--d::after {
  right: 0;
  bottom: 0;
  border-radius: 0 0 6px 0;
}
`;
