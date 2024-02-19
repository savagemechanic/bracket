import app from "./app"

const PORT = 3000;

app.on('error', (err: any) => {
  console.error('Server error: ', err.message);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});