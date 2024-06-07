function Clock({ time }) {
  let hh = time.getHours() * 30,
    mm = time.getMinutes() * 6,
    ss = time.getSeconds() * 6;

  return (
    <div className="clock__container grid">
      <div className="clock__content grid">
        <div className="clock__circle">
          <span className="clock__twelve"></span>
          <span className="clock__three"></span>
          <span className="clock__six"></span>
          <span className="clock__nine"></span>

          <div className="clock__rounder"></div>
          <div
            className="clock__hour"
            style={{ transform: `rotateZ(${hh + mm / 12}deg)` }}
          ></div>
          <div
            className="clock__minutes"
            style={{ transform: `rotateZ(${mm}deg)` }}
          ></div>
          <div
            className="clock__seconds"
            style={{ transform: `rotateZ(${ss}deg)` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Clock;
