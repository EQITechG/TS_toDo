import app from "./app";
//Server Port
const PORT = parseInt(process.env.PORT!) || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
