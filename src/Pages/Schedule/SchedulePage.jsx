import "./SchedulePage.css";

function SchedulePage() {
  return (
    <section className="page schedule-page">
      <div className="page-header">
        <div>
          <h1>Schema</h1>
          <p>Här kan schemafunktionen byggas senare.</p>
        </div>
      </div>

      <div className="card empty-state">
        <i className="fa-solid fa-calendar-days"></i>
        <h2>Schema kommer senare</h2>
        <p>Den här sidan är förberedd för nästa steg i projektet.</p>
      </div>
    </section>
  );
}

export default SchedulePage;