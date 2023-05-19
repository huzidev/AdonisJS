export default function App(): JSX.Element {
  async function test() {
    const response = await fetch("http://127.0.0.1:3333")
    console.log("Response", response);
  }
  return (
    <div>
      <button onClick={test}>
        Check
      </button>
    </div>
  )
}
