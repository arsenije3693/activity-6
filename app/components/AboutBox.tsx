// app/components/AboutBox.tsx

export default function AboutBox() {
  return (
    <div className="card">
      <h2>About This App</h2>
      <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
        This AboutBox is an SSR component. It renders entirely on the server
        before being sent to the browser.
      </p>
    </div>
  );
}
