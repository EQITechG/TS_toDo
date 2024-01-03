// App.tsx
import React from "react";

import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import Header from "./Header";
import Footer from "./Footer";

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <AddTodo />
      <TodoList />
      <Footer />
    </div>
  );
};

export default App;
