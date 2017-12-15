import app from "./app";

export default function createExpressServer() {
  const port = process.env.PORT || 8085;
  app.listen(port, () =>
    console.log(`Express REST App listening on port ${port}!`)
  );
}
