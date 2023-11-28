export const App = () => {
  return (
    <main style={{ display: 'grid', placeItems: 'center', fontFamily: 'helvetica' }}>
      <header>
        <h1>Hey there &#x1F44B;</h1>
      </header>

      <p style={{ maxWidth: 400 }}>
        In this coding task, you are expected to fetch some data from an already prepared backend, display it, and
        create different pages that shows more details about each piece of data retrieved, as well as navigation points
        that go to each of these pages.
      </p>

      <p style={{ maxWidth: 400 }}>
        Please go to the folder called "backend" and follow its README to get it up and running.
      </p>

      <p style={{ maxWidth: 400 }}>
        After setting it up, go to the folder called "frontend" and check out its README for how to get it up and
        running, as well as a detailed description of the tasks to be done in this challenge.
      </p>
    </main>
  );
};
