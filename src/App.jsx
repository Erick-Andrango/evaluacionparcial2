import { useMemo, useState } from "react";

const PROYECTOS = [
  { id: 1, nombre: "Asistente de Tutorías con IA", area: "IA", descripcion: "Chatbot para guiar a estudiantes.", estado: "En Desarrollo", impacto: "Alto" },
  { id: 2, nombre: "Sistema IoT para Control de Aula", area: "IoT", descripcion: "Sensores para asistencia y ambiente.", estado: "Finalizado", impacto: "Medio" },
  { id: 3, nombre: "Portal Web de Proyectos Tecnológicos", area: "Web", descripcion: "Catálogo interactivo para consultar proyectos.", estado: "En Desarrollo", impacto: "Alto" },
  { id: 4, nombre: "Analítica de Seguridad de Red", area: "Seguridad", descripcion: "Dashboard de alertas de ciberseguridad.", estado: "Propuesto", impacto: "Alto" },
  { id: 5, nombre: "Gestor de Incidencias TI", area: "Software", descripcion: "Tickets y priorización para soporte.", estado: "Finalizado", impacto: "Medio" },
  { id: 6, nombre: "Monitoreo de Conectividad", area: "Redes", descripcion: "Disponibilidad y latencia por sedes.", estado: "Propuesto", impacto: "Bajo" },
];

const AREAS = ["Todas", "Software", "IA", "IoT", "Web", "Redes", "Seguridad"];
const ESTADOS = ["Todos", "Propuesto", "En Desarrollo", "Finalizado"];
const IMPACTOS = ["Todos", "Alto", "Medio", "Bajo"];

export default function App() {
  const [seccion, setSeccion] = useState("inicio");
  const [fArea, setFArea] = useState("Todas");
  const [fEstado, setFEstado] = useState("Todos");
  const [fImpacto, setFImpacto] = useState("Todos");
  const [orden, setOrden] = useState("nombre-asc");

  const proyectos = useMemo(() => {
    let data = [...PROYECTOS];
    if (fArea !== "Todas") data = data.filter((p) => p.area === fArea);
    if (fEstado !== "Todos") data = data.filter((p) => p.estado === fEstado);
    if (fImpacto !== "Todos") data = data.filter((p) => p.impacto === fImpacto);

    const impactoPeso = { Alto: 3, Medio: 2, Bajo: 1 };
    const estadoPeso = { Propuesto: 1, "En Desarrollo": 2, Finalizado: 3 };

    data.sort((a, b) => {
      switch (orden) {
        case "nombre-asc": return a.nombre.localeCompare(b.nombre);
        case "nombre-desc": return b.nombre.localeCompare(a.nombre);
        case "impacto": return (impactoPeso[b.impacto] ?? 0) - (impactoPeso[a.impacto] ?? 0);
        case "estado": return (estadoPeso[b.estado] ?? 0) - (estadoPeso[a.estado] ?? 0);
        case "area": return a.area.localeCompare(b.area);
        default: return 0;
      }
    });

    return data;
  }, [fArea, fEstado, fImpacto, orden]);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.title}>Sistema de Información Web sobre Proyectos Tecnológicos</div>
          <div style={styles.subtitle}>React • Firebase Hosting • IA • Catálogo interactivo</div>
        </div>
        <div style={styles.nav}>
          <button style={seccion === "inicio" ? styles.btnActive : styles.btn} onClick={() => setSeccion("inicio")}>Inicio</button>
          <button style={seccion === "catalogo" ? styles.btnActive : styles.btn} onClick={() => setSeccion("catalogo")}>Catálogo</button>
        </div>
      </header>

      {seccion === "inicio" ? (
        <main style={styles.card}>
          <h2 style={styles.h2}>Propósito del sistema</h2>
          <p style={styles.p}>
            Informar, organizar y permitir la consulta interactiva de proyectos tecnológicos realizados por estudiantes o investigadores.
          </p>

          <h2 style={styles.h2}>¿Qué son los proyectos tecnológicos?</h2>
          <p style={styles.p}>
            Son iniciativas que aplican ciencia y tecnología para resolver problemas reales, construir prototipos, mejorar procesos o crear productos digitales.
          </p>

          <h2 style={styles.h2}>Tecnologías usadas</h2>
          <ul style={styles.ul}>
            <li><b>React</b> para la interfaz y filtros sin recargar.</li>
            <li><b>Firebase Hosting</b> para publicar el sitio.</li>
            <li><b>IA</b> (ChatGPT/Copilot/Gemini, etc.) para generar componentes, lógica y estilos.</li>
          </ul>

          <div style={styles.ctaBox}>
            <div style={{ flex: 1 }}>
              <b>Ir al catálogo interactivo</b>
              <div style={{ opacity: 0.85 }}>Filtra y ordena por área, estado e impacto.</div>
            </div>
            <button style={styles.cta} onClick={() => setSeccion("catalogo")}>Abrir catálogo →</button>
          </div>
        </main>
      ) : (
        <main style={styles.card}>
          <h2 style={styles.h2}>Catálogo interactivo</h2>

          <div style={styles.filters}>
            <div style={styles.field}>
              <label style={styles.label}>Área</label>
              <select style={styles.select} value={fArea} onChange={(e) => setFArea(e.target.value)}>
                {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Estado</label>
              <select style={styles.select} value={fEstado} onChange={(e) => setFEstado(e.target.value)}>
                {ESTADOS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Impacto</label>
              <select style={styles.select} value={fImpacto} onChange={(e) => setFImpacto(e.target.value)}>
                {IMPACTOS.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Orden</label>
              <select style={styles.select} value={orden} onChange={(e) => setOrden(e.target.value)}>
                <option value="nombre-asc">Nombre (A → Z)</option>
                <option value="nombre-desc">Nombre (Z → A)</option>
                <option value="impacto">Impacto (Alto → Bajo)</option>
                <option value="estado">Estado (Finalizado → Propuesto)</option>
                <option value="area">Área (A → Z)</option>
              </select>
            </div>
          </div>

          <div style={styles.meta}>
            Mostrando <b>{proyectos.length}</b> de <b>{PROYECTOS.length}</b> proyectos
          </div>

          <div style={styles.grid}>
            {proyectos.map((p) => (
              <article key={p.id} style={styles.projectCard}>
                <div style={styles.projectTitle}>{p.nombre}</div>
                <div style={styles.badges}>
                  <span style={{ ...styles.badge, borderColor: "#60a5fa" }}>{p.area}</span>
                  <span style={{ ...styles.badge, borderColor: "#f59e0b" }}>{p.estado}</span>
                  <span style={{ ...styles.badge, borderColor: "#ef4444" }}>Impacto: {p.impacto}</span>
                </div>
                <p style={styles.p}>{p.descripcion}</p>
              </article>
            ))}
          </div>
        </main>
      )}

      <footer style={styles.footer}>Sistema de Proyectos Tecnológicos • React + Firebase</footer>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#0b1220", color: "#e5e7eb", padding: 16, fontFamily: "Arial, sans-serif" },
  header: { maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", padding: "14px 16px", border: "1px solid #1f2a44", borderRadius: 14, background: "#0f1a2f" },
  title: { fontSize: 18, fontWeight: 800 },
  subtitle: { opacity: 0.85, marginTop: 4, fontSize: 13 },
  nav: { display: "flex", gap: 8 },
  btn: { padding: "10px 12px", borderRadius: 12, border: "1px solid #223055", background: "transparent", color: "#e5e7eb", cursor: "pointer" },
  btnActive: { padding: "10px 12px", borderRadius: 12, border: "1px solid #223055", background: "#172a52", color: "#e5e7eb", cursor: "pointer" },
  card: { maxWidth: 1100, margin: "14px auto 0", border: "1px solid #1f2a44", borderRadius: 14, background: "#0f1a2f", padding: 18 },
  h2: { margin: "10px 0 8px", fontSize: 16 },
  p: { margin: "6px 0 10px", opacity: 0.92, lineHeight: 1.5 },
  ul: { marginTop: 6, marginBottom: 12, opacity: 0.92, lineHeight: 1.6 },
  ctaBox: { display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between", border: "1px solid #223055", borderRadius: 14, padding: 14, background: "#0b1730", marginTop: 14 },
  cta: { padding: "10px 12px", borderRadius: 12, border: "1px solid #223055", background: "#2b4caa", color: "#fff", cursor: "pointer", whiteSpace: "nowrap" },
  filters: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginTop: 10, padding: 12, border: "1px solid #223055", borderRadius: 14, background: "#0b1730" },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 12, opacity: 0.9 },
  select: { padding: 10, borderRadius: 12, border: "1px solid #223055", background: "#0f1a2f", color: "#e5e7eb", outline: "none" },
  meta: { marginTop: 10, opacity: 0.85, fontSize: 13 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginTop: 12 },
  projectCard: { border: "1px solid #223055", borderRadius: 14, padding: 14, background: "#0b1730" },
  projectTitle: { fontWeight: 800, marginBottom: 8 },
  badges: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 },
  badge: { padding: "6px 10px", borderRadius: 999, border: "1px solid #94a3b8", fontSize: 12, background: "rgba(255,255,255,0.03)" },
  footer: { maxWidth: 1100, margin: "14px auto 0", opacity: 0.8, fontSize: 12, textAlign: "center", padding: 10 },
};
