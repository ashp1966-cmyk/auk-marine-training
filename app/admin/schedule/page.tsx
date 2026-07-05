"use client";
import { useEffect, useState } from "react";

const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function Schedule() {
  const [courses, setCourses] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [courseId, setCourseId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [mode, setMode] = useState("virtual");
  const [capacity, setCapacity] = useState(20);
  const [facilitator, setFacilitator] = useState("");
  const [venue, setVenue] = useState("");
  const [cursor, setCursor] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() }; });
  const [selected, setSelected] = useState<any>(null);

  function load() {
    fetch("/api/courses?all=1").then((r) => r.json()).then((d) => {
      setCourses(d.courses || []);
      if (!courseId && d.courses?.[0]) setCourseId(d.courses[0].id);
    });
    fetch("/api/sessions").then((r) => r.json()).then((d) => setSessions(d.sessions || []));
  }
  useEffect(() => { load(); }, []);

  async function create() {
    await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId, date, mode, capacity, facilitator,
        venue: mode !== "virtual" ? venue : undefined,
        platform: mode === "virtual" ? venue : undefined,
      }),
    });
    setVenue("");
    load();
  }

  const courseTitle = (id: string) => courses.find((c) => c.id === id)?.title || "—";
  const courseCode = (id: string) => courses.find((c) => c.id === id)?.code || "";

  // Build the month grid (Monday-first)
  const { y, m } = cursor;
  const firstDow = (new Date(y, m, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const prevDays = new Date(y, m, 0).getDate();
  const todayStr = new Date().toISOString().slice(0, 10);

  const cells: { dateStr: string; day: number; inMonth: boolean }[] = [];
  for (let i = 0; i < firstDow; i++) cells.push({ dateStr: "", day: prevDays - firstDow + 1 + i, inMonth: false });
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ dateStr: `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`, day: d, inMonth: true });
  }
  while (cells.length % 7 !== 0) cells.push({ dateStr: "", day: cells.length - firstDow - daysInMonth + 1, inMonth: false });

  const sessionsByDate: Record<string, any[]> = {};
  sessions.forEach((s) => {
    const key = new Date(s.date).toISOString().slice(0, 10);
    (sessionsByDate[key] ||= []).push(s);
  });

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold">Schedule</h1>

      <div className="card mt-5 p-5">
        <h2 className="font-semibold">Schedule a session</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="field"><label>Course</label>
            <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
              {courses.map((c) => <option key={c.id} value={c.id}>{c.code} — {c.title}</option>)}
            </select>
          </div>
          <div className="field"><label>Date</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
          <div className="field"><label>Mode</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="virtual">Virtual</option><option value="classroom">Classroom</option><option value="onsite">On-site</option>
            </select>
          </div>
          <div className="field"><label>Capacity</label><input type="number" value={capacity} onChange={(e) => setCapacity(+e.target.value)} /></div>
          <div className="field"><label>Facilitator</label><input value={facilitator} onChange={(e) => setFacilitator(e.target.value)} /></div>
          <div className="field"><label>{mode === "virtual" ? "Platform / link" : "Venue"}</label><input value={venue} onChange={(e) => setVenue(e.target.value)} /></div>
        </div>
        <button className="btn-primary mt-4" onClick={create} disabled={!courseId}>Add to schedule</button>
      </div>

      <div className="card mt-6 p-5">
        <div className="flex items-center justify-between">
          <button className="btn-ghost" onClick={() => setCursor((c) => c.m === 0 ? { y: c.y - 1, m: 11 } : { y: c.y, m: c.m - 1 })}>← Prev</button>
          <h2 className="font-serif text-lg font-bold">{MONTHS[m]} {y}</h2>
          <button className="btn-ghost" onClick={() => setCursor((c) => c.m === 11 ? { y: c.y + 1, m: 0 } : { y: c.y, m: c.m + 1 })}>Next →</button>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {DOW.map((d) => <div key={d} className="text-center text-xs font-semibold uppercase text-gray-400">{d}</div>)}
          {cells.map((c, i) => (
            <div key={i} className={`min-h-[80px] rounded-md border p-1.5 text-xs ${c.inMonth ? "border-gray-200 bg-white" : "border-gray-100 bg-gray-50 text-gray-300"} ${c.dateStr === todayStr ? "ring-2 ring-brass" : ""}`}>
              <div className="font-semibold">{c.day}</div>
              {c.inMonth && (sessionsByDate[c.dateStr] || []).map((s) => (
                <button key={s.id} onClick={() => setSelected(s)}
                  className={`mt-1 block w-full truncate rounded px-1 py-0.5 text-left text-[10px] font-semibold ${s.mode === "virtual" ? "bg-amber-100 text-amber-800" : "bg-teal/15 text-teal"}`}>
                  {courseCode(s.courseId)}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-4 text-xs text-gray-500">
          <span><span className="mr-1 inline-block h-2.5 w-2.5 rounded bg-amber-200" />Virtual</span>
          <span><span className="mr-1 inline-block h-2.5 w-2.5 rounded bg-teal/30" />Classroom / on-site</span>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5" onClick={() => setSelected(null)}>
          <div className="card max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
            <div className="text-xs font-mono text-teal">{courseCode(selected.courseId)}</div>
            <h3 className="font-serif text-lg font-bold">{courseTitle(selected.courseId)}</h3>
            <p className="mt-2 text-sm text-gray-500">{new Date(selected.date).toLocaleDateString()} · {selected.mode}</p>
            <p className="mt-1 text-sm text-gray-500">Facilitator: {selected.facilitator || "—"}</p>
            <p className="mt-1 text-sm text-gray-500">{selected.booked}/{selected.capacity} booked</p>
            <button className="btn-ghost mt-4" onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
