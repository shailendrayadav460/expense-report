import { useState } from "react";

const fmt = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

const Bars = () => (
  <div style={{ display:"flex", gap:"2px", alignItems:"flex-end", height:"20px" }}>
    <div style={{ width:4, height:12, borderRadius:2, background:"#f5576c" }} />
    <div style={{ width:4, height:17, borderRadius:2, background:"#667eea" }} />
    <div style={{ width:4, height:20, borderRadius:2, background:"#f6a85c" }} />
  </div>
);

const DownloadIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

function buildReportHTML(report) {
  const itemsHTML = report.items.map(item => `
    <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #ede8f8;font-size:12px;">
      <span style="color:#444;">${item.name}</span>
      <span style="font-weight:700;color:#1a1a2e;">${fmt(item.amount)}</span>
    </div>`).join("");
  const reductionsHTML = report.reductions.map(r => `
    <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px;">
      <span style="color:#555;">Less: ${r.name}</span>
      <span style="font-weight:700;color:#e05878;">−${fmt(r.amount)}</span>
    </div>`).join("");
  return `<div style="background:#fff;border-radius:16px;padding:20px 18px;width:340px;font-family:'Segoe UI',sans-serif;border:1px solid #e0dcf8;">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
      <div style="display:flex;gap:2px;align-items:flex-end;height:20px;">
        <div style="width:4px;height:12px;border-radius:2px;background:#f5576c;"></div>
        <div style="width:4px;height:17px;border-radius:2px;background:#667eea;"></div>
        <div style="width:4px;height:20px;border-radius:2px;background:#f6a85c;"></div>
      </div>
      <span style="font-size:17px;font-weight:800;color:#1a1a2e;">${report.title}</span>
    </div>
    <div style="display:flex;align-items:center;gap:5px;font-size:11px;font-weight:700;color:#e05878;margin-bottom:9px;padding-bottom:9px;border-bottom:2px solid #f0eef8;">
      <div style="width:8px;height:8px;border-radius:50%;background:#f5576c;flex-shrink:0;"></div>${report.catName}
    </div>
    ${itemsHTML}
    <div style="display:flex;justify-content:space-between;padding:10px 0 0;font-weight:700;font-size:12px;color:#1a1a2e;">
      <span>Subtotal (${report.catName})</span><span>${fmt(report.subtotal)}</span>
    </div>
    <div style="background:#e8f8f0;border:1.5px solid #a8e6cf;border-radius:11px;padding:11px 13px;margin-top:11px;">
      <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px;">
        <span style="color:#555;">Subtotal:</span><span style="font-weight:700;color:#1a1a2e;">${fmt(report.subtotal)}</span>
      </div>
      ${reductionsHTML}
      <div style="display:flex;justify-content:space-between;align-items:center;border-top:1.5px solid #a8e6cf;margin-top:8px;padding-top:8px;">
        <span style="font-size:14px;font-weight:800;color:#0e9e70;">Final Total:</span>
        <span style="font-size:18px;font-weight:800;color:#0e9e70;">${fmt(report.final)}</span>
      </div>
    </div>
  </div>`;
}

export default function ExpenseReport() {
  const [reportTitle, setReportTitle] = useState("Expense Report");
  const [catName, setCatName] = useState("Category A (Fixed / House Related)");
  const [items, setItems] = useState([
    { id: 1, name: "Room Rent", amount: "12000" },
    { id: 2, name: "Maintenance", amount: "1200" },
    { id: 3, name: "Wi-Fi", amount: "300" },
    { id: 4, name: "Washing Machine & Fridge", amount: "400" },
    { id: 5, name: "Gas", amount: "573" },
  ]);
  const [reductions, setReductions] = useState([{ id: 1, name: "Reduction", amount: "2572" }]);
  const [report, setReport] = useState(null);
  const [nextId, setNextId] = useState(10);
  const [downloading, setDownloading] = useState(false);

  const subtotal = items.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);
  const addItem = () => { setItems(p => [...p, { id: nextId, name: "", amount: "" }]); setNextId(n => n + 1); };
  const updateItem = (id, f, v) => setItems(p => p.map(i => i.id === id ? { ...i, [f]: v } : i));
  const removeItem = (id) => setItems(p => p.filter(i => i.id !== id));
  const addReduction = () => { setReductions(p => [...p, { id: nextId, name: "", amount: "" }]); setNextId(n => n + 1); };
  const updateReduction = (id, f, v) => setReductions(p => p.map(r => r.id === id ? { ...r, [f]: v } : r));
  const removeReduction = (id) => setReductions(p => p.filter(r => r.id !== id));

  const generate = () => {
    const sub = items.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0);
    const totalRed = reductions.reduce((s, r) => s + (parseFloat(r.amount) || 0), 0);
    setReport({
      title: reportTitle, catName,
      items: items.map(i => ({ name: i.name || "Item", amount: parseFloat(i.amount) || 0 })),
      subtotal: sub,
      reductions: reductions.map(r => ({ name: r.name || "Reduction", amount: parseFloat(r.amount) || 0 })),
      final: sub - totalRed,
    });
    setTimeout(() => document.getElementById("rout")?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  };

  const downloadImage = async () => {
    if (!report) return;
    setDownloading(true);
    try {
      const container = document.createElement("div");
      container.style.cssText = "position:fixed;left:-9999px;top:0;padding:20px;background:#f0eeff;";
      container.innerHTML = buildReportHTML(report);
      document.body.appendChild(container);
      if (!window.html2canvas) {
        await new Promise((res, rej) => {
          const s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
          s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
      }
      const canvas = await window.html2canvas(container, { scale: 3, backgroundColor: "#f0eeff", useCORS: true, logging: false });
      document.body.removeChild(container);
      const link = document.createElement("a");
      link.download = `${(report.title || "Expense_Report").replace(/\s+/g, "_")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) { alert("Download failed: " + e.message); }
    setDownloading(false);
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* CRITICAL: make html/body full viewport */
        html {
          width: 100%;
          height: 100%;
        }
        body {
          width: 100%;
          min-height: 100%;
          margin: 0;
          padding: 0;
        }

        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin   { to{transform:rotate(360deg)} }
        input { font-family: inherit; }
        input:focus { outline: none; border-color: #667eea !important; box-shadow: 0 0 0 2px rgba(102,126,234,0.15) !important; }

        /* FULL SCREEN PAGE */
        .er-page {
          position: fixed;
          inset: 0;
          overflow-y: auto;
          background: linear-gradient(145deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 16px 48px;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        .er-h {
          font-weight: 800;
          background: linear-gradient(90deg,#667eea,#a78bfa,#f093fb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          margin-bottom: 20px;
          letter-spacing: -0.3px;
          font-size: clamp(1.1rem, 2.5vw, 1.6rem);
          flex-shrink: 0;
        }

        /* TWO-COL GRID */
        .er-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          width: 100%;
          max-width: 860px;
          justify-content: center;
          align-items: flex-start;
        }

        /* EDITOR */
        .er-editor {
          flex: 1 1 300px;
          max-width: 420px;
          background: linear-gradient(145deg,#ffffff,#f8f7ff);
          border-radius: 18px;
          box-shadow: 0 12px 40px rgba(102,126,234,0.2);
          padding: 18px 16px;
          border: 1px solid rgba(255,255,255,0.85);
        }

        /* REPORT COL */
        .er-report-col {
          flex: 1 1 280px;
          max-width: 400px;
          animation: fadeUp 0.3s ease;
        }

        .er-sec {
          font-size: 0.86rem;
          font-weight: 700;
          background: linear-gradient(90deg,#667eea,#f093fb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 13px;
          padding-bottom: 8px;
          border-bottom: 1.5px solid;
          border-image: linear-gradient(90deg,#667eea,#f093fb) 1;
        }

        .er-fl {
          font-size: 0.62rem;
          font-weight: 700;
          color: #aaa;
          text-transform: uppercase;
          letter-spacing: 0.7px;
          display: block;
          margin-bottom: 3px;
        }

        .er-in {
          border: 1.5px solid #e0dcff;
          border-radius: 8px;
          padding: 7px 10px;
          font-size: 0.82rem;
          color: #1a1a2e;
          background: #fafafe;
          width: 100%;
        }

        .er-row {
          display: grid;
          grid-template-columns: 1fr 85px 22px;
          gap: 5px;
          align-items: center;
          margin-bottom: 5px;
        }

        .er-del {
          background: none; border: none; cursor: pointer;
          color: #ccc; font-size: 0.8rem; padding: 2px;
          border-radius: 4px; line-height: 1; transition: color 0.15s;
          font-family: inherit;
        }
        .er-del:hover { color: #e05878; }

        .er-add {
          background: none; border: 1.5px dashed #667eea; color: #667eea;
          border-radius: 8px; padding: 5px 12px; font-size: 0.73rem;
          cursor: pointer; font-weight: 600; transition: all 0.18s; font-family: inherit;
        }
        .er-add:hover { background: #667eea; color: #fff; border-style: solid; }

        .er-radd {
          background: none; border: 1.5px dashed #a78bfa; color: #764ba2;
          border-radius: 8px; padding: 5px 12px; font-size: 0.73rem;
          cursor: pointer; font-weight: 600; transition: all 0.18s; font-family: inherit;
        }
        .er-radd:hover { background: #764ba2; color: #fff; border-style: solid; }

        .er-redbox {
          background: linear-gradient(135deg,#f0eeff,#ffe8f5);
          border-radius: 11px; padding: 11px 12px; margin-top: 11px;
          border: 1.5px solid #ddd4ff;
        }

        .er-gen {
          width: 100%;
          background: linear-gradient(135deg,#667eea,#764ba2);
          color: #fff; border: none; border-radius: 11px;
          padding: 11px; font-size: 0.9rem; font-weight: 700;
          cursor: pointer; margin-top: 13px;
          box-shadow: 0 4px 16px rgba(102,126,234,0.38);
          transition: opacity 0.15s, transform 0.15s; font-family: inherit;
        }
        .er-gen:hover { opacity: 0.9; transform: translateY(-1px); }

        .er-dl {
          background: linear-gradient(135deg,#667eea,#764ba2);
          color: #fff; border: none; border-radius: 16px;
          padding: 6px 13px 6px 9px; font-size: 0.71rem; font-weight: 700;
          cursor: pointer; display: inline-flex; align-items: center; gap: 4px;
          box-shadow: 0 3px 12px rgba(102,126,234,0.4);
          transition: opacity 0.15s, transform 0.15s; font-family: inherit;
        }
        .er-dl:hover { opacity: 0.88; transform: translateY(-1px); }

        .er-card {
          background: linear-gradient(145deg,#fff,#f8f7ff);
          border-radius: 18px;
          box-shadow: 0 12px 36px rgba(102,126,234,0.18);
          padding: 18px 16px 16px;
          border: 1px solid rgba(255,255,255,0.9);
        }

        .er-item {
          display: flex; justify-content: space-between;
          padding: 7px 0; border-bottom: 1px solid #f0eef8; font-size: 0.83rem;
        }

        .er-final {
          background: linear-gradient(135deg,#d4f7e7,#e8f5ff);
          border: 1.5px solid #a8e6cf; border-radius: 12px;
          padding: 11px 12px; margin-top: 10px;
        }

        .er-live {
          text-align: right; font-size: 0.72rem; font-weight: 700;
          color: #667eea; padding: 2px 0 6px;
        }

        /* MOBILE */
        @media (max-width: 600px) {
          .er-page { padding: 14px 10px 40px; }
          .er-grid  { gap: 14px; }
          .er-editor { padding: 14px 12px; }
          .er-row { grid-template-columns: 1fr 72px 20px; gap: 4px; }
        }
      `}</style>

      <div className="er-page">
        <div className="er-h">✦ Expense Report Generator</div>

        <div className="er-grid">

          {/* EDITOR */}
          <div className="er-editor">
            <div className="er-sec">⚙ Build Your Report</div>

            <label className="er-fl">Report Title</label>
            <input className="er-in" style={{ marginBottom:11, fontWeight:600 }}
              value={reportTitle} onChange={e => setReportTitle(e.target.value)} placeholder="Monthly Expense Report" />

            <label className="er-fl">Category Name</label>
            <input className="er-in" style={{ marginBottom:10, border:"1.5px solid #ffd4e0", background:"#fff8fa", color:"#e05878", fontWeight:700 }}
              value={catName} onChange={e => setCatName(e.target.value)} placeholder="Category Name" />

            {items.map(item => (
              <div key={item.id} className="er-row">
                <input className="er-in" type="text" placeholder="Item name" value={item.name} onChange={e => updateItem(item.id,"name",e.target.value)} />
                <input className="er-in" style={{ textAlign:"right" }} type="number" placeholder="₹ 0" value={item.amount} min="0" onChange={e => updateItem(item.id,"amount",e.target.value)} />
                <button className="er-del" onClick={() => removeItem(item.id)}>✕</button>
              </div>
            ))}

            <div className="er-live">Subtotal: {fmt(subtotal)}</div>
            <button className="er-add" onClick={addItem}>+ Add Item</button>

            <div className="er-redbox">
              <div style={{ fontSize:"0.74rem", fontWeight:700, color:"#764ba2", marginBottom:8 }}>📉 Reductions / Deductions</div>
              {reductions.map(r => (
                <div key={r.id} className="er-row">
                  <input className="er-in" style={{ background:"#fff", border:"1.5px solid #ddd4ff" }} type="text" placeholder="e.g. Advance" value={r.name} onChange={e => updateReduction(r.id,"name",e.target.value)} />
                  <input className="er-in" style={{ background:"#fff", border:"1.5px solid #ddd4ff", textAlign:"right" }} type="number" placeholder="₹ 0" value={r.amount} min="0" onChange={e => updateReduction(r.id,"amount",e.target.value)} />
                  <button className="er-del" onClick={() => removeReduction(r.id)}>✕</button>
                </div>
              ))}
              <button className="er-radd" onClick={addReduction}>+ Add Reduction</button>
            </div>

            <button className="er-gen" onClick={generate}>✦ Generate Report</button>
          </div>

          {/* REPORT */}
          {report && (
            <div className="er-report-col" id="rout">
              <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:8 }}>
                <button className="er-dl" disabled={downloading} onClick={downloadImage}>
                  {downloading
                    ? <><span style={{ display:"inline-block", width:10, height:10, border:"1.5px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} /> Saving...</>
                    : <><DownloadIcon /> Download PNG</>}
                </button>
              </div>

              <div className="er-card">
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                  <Bars />
                  <div style={{ fontSize:"1.05rem", fontWeight:800, color:"#1a1a2e" }}>{report.title}</div>
                </div>

                <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:"0.75rem", fontWeight:700, color:"#e05878", marginBottom:9, paddingBottom:9, borderBottom:"1.5px solid #f0eef8" }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:"linear-gradient(135deg,#f5576c,#f093fb)", flexShrink:0 }} />
                  {report.catName}
                </div>

                {report.items.map((item, i) => (
                  <div key={i} className="er-item">
                    <span style={{ color:"#555" }}>{item.name}</span>
                    <span style={{ fontWeight:700, color:"#1a1a2e" }}>{fmt(item.amount)}</span>
                  </div>
                ))}

                <div style={{ display:"flex", justifyContent:"space-between", padding:"9px 0 0", fontWeight:700, fontSize:"0.83rem", color:"#1a1a2e" }}>
                  <span>Subtotal ({report.catName})</span>
                  <span>{fmt(report.subtotal)}</span>
                </div>

                <div className="er-final">
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.76rem", marginBottom:3 }}>
                    <span style={{ color:"#444" }}>Subtotal:</span>
                    <span style={{ fontWeight:700, color:"#1a1a2e" }}>{fmt(report.subtotal)}</span>
                  </div>
                  {report.reductions.map((r, i) => (
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.76rem", marginBottom:3 }}>
                      <span style={{ color:"#444" }}>Less: {r.name}</span>
                      <span style={{ fontWeight:700, color:"#e05878" }}>−{fmt(r.amount)}</span>
                    </div>
                  ))}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1.5px solid #a8e6cf", marginTop:8, paddingTop:8 }}>
                    <span style={{ fontSize:"0.92rem", fontWeight:800, color:"#0e9e70" }}>Final Total:</span>
                    <span style={{ fontSize:"1.1rem", fontWeight:800, color:"#0e9e70" }}>{fmt(report.final)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}